package com.sunyard.util;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.math.BigInteger;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.RSAPrivateKeySpec;
import java.security.spec.RSAPublicKeySpec;

import javax.crypto.Cipher;

import org.apache.commons.codec.binary.Hex;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.bouncycastle.jce.provider.BouncyCastleProvider;

/**
 * RSA 工具类。提供加密，解密，生成密钥对等方法。
 * 需要到http://www.bouncycastle.org下载bcprov-jdk14-123.jar。
 * 
 */
public class RSAUtil {
	private static final Logger logger = LogManager.getLogger();
	private String RSAKeyStore;
	private KeyPair keyPair;
	private static final BouncyCastleProvider PROVIDER_NAME = new BouncyCastleProvider();

	/**
	 * 实例延迟加载实例
	 */
	private static class SingletonHoder {
		static RSAUtil instance = new RSAUtil();
	}

	private RSAUtil() {
		String path = RSAUtil.class.getResource("").getPath();
		path = path.substring(0, path.length() - 17);
		RSAKeyStore = path + "RSA_PAIR.txt";
		keyPair = getKeyPair();
	}

	/**
	 * 获取实例
	 * 
	 * @return
	 */
	public static RSAUtil getInstance() {
		return SingletonHoder.instance;
	}

	/**
	 * 获取密钥对
	 * 
	 * @return
	 */
	private KeyPair getKeyPair() {
		KeyPair kp = null;
		ObjectInputStream ois = null;
		FileInputStream fis = null;
		try {
			fis = new FileInputStream(RSAKeyStore);
			ois = new ObjectInputStream(fis);
			kp = (KeyPair) ois.readObject();
//			logger.info("私钥...\n");
//
//			logger.info(kp.getPublic().toString());
			// logger.info(kp.getPrivate().toString());
		} catch (Exception e) {
			logger.error(e, e);
		} finally {
			if (ois != null) {
				try {
					ois.close();
				} catch (IOException e) {
				}
			}
			if (fis != null) {
				try {
					fis.close();
				} catch (IOException e) {
				}
			}
		}
		return kp;
	}

	/**
	 * 加密
	 * 
	 * @param data
	 *            待加密的明文数据
	 * @return 加密后的数据
	 * @throws Exception
	 */
	public byte[] encrypt(byte[] data) throws Exception {
		try {
			Cipher cipher = Cipher.getInstance("RSA", PROVIDER_NAME);
			cipher.init(Cipher.ENCRYPT_MODE, keyPair.getPublic());
			// 获得加密块大小，如：加密前数据为128个byte，而key_size=1024
			int blockSize = cipher.getBlockSize();
			// 加密块大小为127
			// byte,加密后为128个byte;因此共有2个加密块，第一个127
			// byte第二个为1个byte
			int outputSize = cipher.getOutputSize(data.length);// 获得加密块加密后块大小
			int leavedSize = data.length % blockSize;
			int blocksSize = leavedSize != 0 ? data.length / blockSize + 1 : data.length / blockSize;
			byte[] raw = new byte[outputSize * blocksSize];
			int i = 0;
			while (data.length - i * blockSize > 0) {
				if (data.length - i * blockSize > blockSize)
					cipher.doFinal(data, i * blockSize, blockSize, raw, i * outputSize);
				else
					cipher.doFinal(data, i * blockSize, data.length - i * blockSize, raw, i * outputSize);
				// 这里面doUpdate方法不可用，查看源代码后发现每次doUpdate后并没有什么实际动作除了把byte[]放到
				// ByteArrayOutputStream中，而最后doFinal的时候才将所有的byte[]进行加密，可是到了此时加密块大小很可能已经超出了
				// OutputSize所以只好用dofinal方法。
				i++;
			}
			return raw;
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
	}

	/**
	 * 解密
	 * 
	 * @param raw
	 *            已经加密的数据
	 * @return 解密后的明文
	 * @throws Exception
	 */
	public byte[] decrypt(byte[] raw) throws Exception {
		try {
			Cipher cipher = Cipher.getInstance("RSA", PROVIDER_NAME);
			cipher.init(Cipher.DECRYPT_MODE, keyPair.getPrivate());
			int blockSize = cipher.getBlockSize();
			ByteArrayOutputStream bout = new ByteArrayOutputStream(64);
			int j = 0;

			while (raw.length - j * blockSize > 0) {
				bout.write(cipher.doFinal(raw, j * blockSize, blockSize));
				j++;
			}
			return bout.toByteArray();
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
	}

	/**
	 * * 生成公钥 *
	 * 
	 * @param modulus
	 *            *
	 * @param publicExponent
	 *            *
	 * @return RSAPublicKey *
	 * @throws Exception
	 */
	public RSAPublicKey generateRSAPublicKey(byte[] modulus, byte[] publicExponent) throws Exception {
		KeyFactory keyFac = null;
		try {
			keyFac = KeyFactory.getInstance("RSA", PROVIDER_NAME);
		} catch (NoSuchAlgorithmException ex) {
			throw new Exception(ex.getMessage());
		}

		RSAPublicKeySpec pubKeySpec = new RSAPublicKeySpec(new BigInteger(modulus), new BigInteger(publicExponent));
		try {
			return (RSAPublicKey) keyFac.generatePublic(pubKeySpec);
		} catch (InvalidKeySpecException ex) {
			throw new Exception(ex.getMessage());
		}
	}

	/**
	 * * 生成私钥 *
	 * 
	 * @param modulus
	 *            *
	 * @param privateExponent
	 *            *
	 * @return RSAPrivateKey *
	 * @throws Exception
	 */
	public RSAPrivateKey generateRSAPrivateKey(byte[] modulus, byte[] privateExponent) throws Exception {
		KeyFactory keyFac = null;
		try {
			keyFac = KeyFactory.getInstance("RSA", PROVIDER_NAME);
		} catch (NoSuchAlgorithmException ex) {
			throw new Exception(ex.getMessage());
		}

		RSAPrivateKeySpec priKeySpec = new RSAPrivateKeySpec(new BigInteger(modulus), new BigInteger(privateExponent));
		try {
			return (RSAPrivateKey) keyFac.generatePrivate(priKeySpec);
		} catch (InvalidKeySpecException ex) {
			throw new Exception(ex.getMessage());
		}
	}

	/**
	 * 密钥对生成类<br>
	 * 
	 * @author <a href="mailto:huang.zh@sunyard.com">huang.zh</a>
	 * @version $Id: RSAUtil.java, v 0.1 2014-10-31 上午11:20:57 rdpc1384 Exp $
	 * @since 2.0
	 */
	class KeyGen {
		/**
		 * 生成密钥对
		 * 
		 * @return KeyPair
		 * @throws EncryptException
		 */
		KeyPair generateKeyPair() throws Exception {

			try {
 				KeyPairGenerator keyPairGen = KeyPairGenerator.getInstance("RSA", PROVIDER_NAME);
				// 没什么好说的了，这个值关系到块加密的大小，可以更改，但是不要太大，否则效率会低
				final int KEY_SIZE = 1024;
				keyPairGen.initialize(KEY_SIZE, new SecureRandom());
				KeyPair keyPair = keyPairGen.generateKeyPair();

				logger.info(""+keyPair.getPrivate());
				logger.info(""+keyPair.getPublic());

  				saveKeyPair(keyPair);
				return keyPair;
			} catch (Exception e) {
				throw new Exception(e.getMessage());
			}
		}

		/**
		 * 保存
		 * 
		 * @param kp
		 * @throws Exception
		 */
		void saveKeyPair(KeyPair kp) throws Exception {
			FileOutputStream fos = null;
			ObjectOutputStream oos = null;
			try {
				fos = new FileOutputStream(RSAKeyStore);
				oos = new ObjectOutputStream(fos);
				// 生成密钥
				oos.writeObject(kp);
				oos.close();
				fos.close();
			} catch (Exception e) {
				throw e;
			} finally {
				if (oos != null) {
					try {
						oos.close();
					} catch (IOException e) {
					}
				}
				if (fos != null) {
					try {
						fos.close();
					} catch (IOException e) {
					}
				}
			}
		}
	}

	public static void main(String[] args) throws Exception {
		// TODO上线前运行生成密钥对,并上传到服务器的system_config.xml配置的RSAKeyStore对应的文件
 		RSAUtil.KeyGen inner = new RSAUtil().new KeyGen(); 
		inner.generateKeyPair();
		
//		long counter = 0;
//		RSAUtil util = RSAUtil.getInstance();
//		//
//		// 测试
//		String test = "MR4RW5Z1WV04ZVY9EHX3NHO8";
//		byte[] en_test;
//		try {
//			en_test = util.encrypt(test.getBytes());
//			System.out.println("en_test:" + new String(Hex.encodeHex(en_test)));
//			byte[] de_test = util.decrypt(en_test);
//			System.out.println("de_test:" + new String(de_test));
//			counter++;
//			System.out.println("crypt counter: " + counter);
//		} catch (Exception e) {
//
//		}
	}
}
