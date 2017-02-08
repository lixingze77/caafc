package com.sunyard.util;

import java.net.URLDecoder;
import java.net.URLEncoder;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import net.sf.json.JSONObject;

import org.bouncycastle.util.encoders.Base64;

import com.google.gson.JsonObject;

/*******************************************************************************
 * AES加解密算法
 * 
 * @author jueyue
 * 
 * 
 *         加密用的Key 可以用26个字母和数字组成，最好不要用保留字符，虽然不会错，至于怎么裁决，个人看情况而定
 *         此处使用AES-128-CBC加密模式，key需要为16位。 也是使用<span
 *         style="font-size: 1em; line-height: 1.5;">0102030405060708</span>
 */
public class AESUtil {
	// 加密
	public static String Encrypt(String sSrc, String sKey) throws Exception {
		if (sKey == null) {
			return null;
		}
		// 判断Key是否为16位
		if (sKey.length() != 16) {
			return null;
		}
		byte[] raw = sKey.getBytes();
		SecretKeySpec skeySpec = new SecretKeySpec(raw, "AES");
		Cipher cipher = Cipher.getInstance("AES/CBC/ISO10126Padding");// "算法/模式/补码方式"
		IvParameterSpec iv = new IvParameterSpec(sKey.getBytes());// 使用CBC模式，需要一个向量iv，可增加加密算法的强度
		cipher.init(Cipher.ENCRYPT_MODE, skeySpec, iv);
		byte[] encrypted = cipher.doFinal(sSrc.getBytes());

		return new String(Base64.encode(encrypted));// 此处使用BAES64做转码功能，同时能起到2次加密的作用。
	}

	// 解密
	public static String Decrypt(String sSrc, String sKey) throws Exception {
		try {
			// 判断Key是否正确
			if (sKey == null) {
				return null;
			}
			// 判断Key是否为16位
			if (sKey.length() != 16) {
				return null;
			}
			byte[] raw = sKey.getBytes("UTF-8");
			SecretKeySpec skeySpec = new SecretKeySpec(raw, "AES");
			Cipher cipher = Cipher.getInstance("AES/CBC/ISO10126Padding");
			IvParameterSpec iv = new IvParameterSpec(sKey.getBytes());
			cipher.init(Cipher.DECRYPT_MODE, skeySpec, iv);
			byte[] encrypted1 = Base64.decode(sSrc);// 先用bAES64解密
			try {
				byte[] original = cipher.doFinal(encrypted1);
				String originalString = new String(original, "utf-8");
				return originalString;
			} catch (Exception e) {
				return null;
			}
		} catch (Exception ex) {
			return null;
		}
	}

	public static void main(String[] args) {
		try {
			String s1 = AESUtil.Encrypt("{C:1}", "24OOV9OZSUODOHBO");
			System.out.println(URLEncoder.encode(s1, "utf-8"));
			String s2 = "uO5KZplk4YfjR05fcc6q63q0FGpqzbBraxmU+Qa6ioPb9YAC+y+jbUrSv34aCANLDeT2Hh9SwldCPqXEejVong==";
			System.out.println(AESUtil.Decrypt(s1, "24OOV9OZSUODOHBO"));

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
