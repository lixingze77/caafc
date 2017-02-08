package com.sunyard.util;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESedeKeySpec;

import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.binary.Hex;
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

public class Des3Util {

	public static void main(String[] args) {

		Des3Util tripleTest = new Des3Util();
		String key_string = "123456789000000000000000";
		String src_string = "dse_operationName=PY3200SrvOp&markId=1C5&hostFlowNo=15499&merchantID=1234565&merchantName=中国移动121&transferSum=100.11&recAccount=20000000002&recAccountName=2shoukuanren&unionBankNo2=313100000013&chargeFee=0.11    ";
		String des_string = "";
		String information = "DESEDE";// "DESEDE/ECB/PKCS5Padding";
		try {
			SecretKey key = tripleTest.getDESKey(key_string);
			int COUNT = 0;
			// while (!"Brsl0etq4fQ1fVmYgeeVdw==".equals(des_string))
			// {
			System.out.println("**********************key=" + key.toString());

			// 加密
			Cipher cipher1 = Cipher.getInstance(information);
			cipher1.init(Cipher.ENCRYPT_MODE, key);
			byte[] des_byte = cipher1.doFinal(src_string.getBytes());
			System.out.println("des_byte=" + byteArr2HexStr(des_byte));
			System.out.println("src_string.getBytes()"
					+ src_string.getBytes().length + "\n加密后数组长度des_byte："
					+ des_byte.length);
			des_string = tripleTest.encodeBase64(des_byte);
			System.out.println("des_string:" + des_string);

			// des_string="ulrXyPcvhU0ql4TRUeKA2Dlae85DHL399pLUiqyKODLKTOaR/g6Nj05iChfXPHiEdZf/4CnaiMvIYqwGQhqBdMxDBgFSTrOATRjq9/eMIj1leluTDgssgfYHQ4TD/JqQ4vBrq7Bf9q6t2XCu2gLTmGH3kU/h/y95YQGpmUK44A9YMagQJAvX/nBeyOhof2Zg8Xt3rpYunSgLFCjpF5meUpxIm7eVEiQbEkhFDJByGNRTliyiHSmgf18x9y6URPeal2NBN6PtYpbq1juZx8DdRmVFJFE=";
			// 解密
			cipher1.init(Cipher.DECRYPT_MODE, key);
			des_byte = tripleTest.decodeBase64(des_string);
			System.out.println("src_string2:" + new String(des_byte));
			byte[] src_byte = cipher1.doFinal(des_byte);
			String src_string2 = new String(src_byte);
			System.out.println("src_string2:" + src_string2);

			// }

		} catch (InvalidKeyException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvalidKeySpecException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NoSuchPaddingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalStateException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalBlockSizeException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (BadPaddingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (DecoderException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	} // base64转码

	public static String encodeBase64(byte[] src_byte) {
		BASE64Encoder base64Encoder = new BASE64Encoder();

		try {
			// 经过BASE64加密后的密文
			String base64String = base64Encoder.encodeBuffer(src_byte);
			String a = base64Encoder.encodeBuffer(src_byte);
			String b = base64Encoder.encode(src_byte);
			return base64String;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}

	// base64解码
	public byte[] decodeBase64(String base64_string) {
		BASE64Decoder base64Decoder = new BASE64Decoder();
		try {
			// 将BASE64转码过的字符串进行解码,获取明文
			byte[] src_byte = base64Decoder.decodeBuffer(base64_string);
			return src_byte;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}

	// 获取密钥

	public SecretKey getDESKey(String key_string) throws InvalidKeyException,
			NoSuchAlgorithmException, InvalidKeySpecException, DecoderException {
		SecretKey key = null;
		byte[] key_byte = null;
		// 判断密钥的长度,如果不是24位,则以"0"补齐
		String zeros = "000000000000000000000000";
		if (key_string != null) {
			int keylength = key_string.getBytes().length;
			if (keylength < 24) {
				key_string += zeros.substring(keylength);
			}
		} else {
			return null;
		}
		// key_string = encodeBase64(key_string.getBytes());
		key_byte = key_string.getBytes();
		System.out.println("new key_string::" + new String(key_byte));

		DESedeKeySpec dks = new DESedeKeySpec(key_string.getBytes());
		/*
		 * byte[] newbyte = Hex.decodeHex(key_string.toCharArray()); for (int i
		 * = 0; i < newbyte.length; i++) { System.out.println("newbyte[" + i +
		 * "]" + newbyte[i]); }
		 */
		SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DESede");
		key = keyFactory.generateSecret(dks);

		return key;
	}

	public static String byteArr2HexStr(byte[] arrB) throws Exception {
		int iLen = arrB.length;
		// 每个byte用两个字符才能表示，所以字符串的长度是数组长度的两倍
		StringBuffer sb = new StringBuffer(iLen * 2);
		for (int i = 0; i < iLen; i++) {
			int intTmp = arrB[i];
			// 把负数转换为正数
			while (intTmp < 0) {
				intTmp = intTmp + 256;
			}
			// 小于0F的数需要在前面补0
			if (intTmp < 16) {
				sb.append("0");
			}
			sb.append(Integer.toString(intTmp, 16));
		}
		return sb.toString();
	}

}
