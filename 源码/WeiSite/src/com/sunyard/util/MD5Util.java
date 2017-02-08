/**************************************************************************
 * Copyright (c) 2013-2015 信雅达信息系统工程有限公司.
 * All rights reserved.
 * 
 * 项目名称：微客平台2.0项目
 * 版权说明：本软件属信雅达信息系统工程有限公司所有。                            
 ***************************************************************************/
package com.sunyard.util;

import java.security.MessageDigest;

/**
 * @ClassName: MD5Util
 * @Description:
 * @author 王兴钢 xingg.wang@sunyard.com
 * @date 2016年3月24日 下午4:35:22
 * 
 */
public class MD5Util {
	public final static String MD5(String s) {
		char hexDigits[] = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
				'A', 'B', 'C', 'D', 'E', 'F' };
		try {
			byte[] btInput = s.getBytes();
			// 获得MD5摘要算法的 MessageDigest 对象
			MessageDigest mdInst = MessageDigest.getInstance("MD5");
			// 使用指定的字节更新摘要
			mdInst.update(btInput);
			// 获得密文
			byte[] md = mdInst.digest();
			// 把密文转换成十六进制的字符串形式
			int j = md.length;
			char str[] = new char[j * 2];
			int k = 0;
			for (int i = 0; i < j; i++) {
				byte byte0 = md[i];
				str[k++] = hexDigits[byte0 >>> 4 & 0xf];
				str[k++] = hexDigits[byte0 & 0xf];
			}
			return new String(str);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public static void main(String[] args) {
		String token = "971E9A732723BF9D1E28C8284AF38732";
		long s1 = System.currentTimeMillis();
		String s = MD5Util.MD5("aggentim+1458808757312");
		if (s.equals(token)) {
			System.out.println("可以进入");
		}

		long s2 = System.currentTimeMillis();

		System.out.println("消耗:" + (s2 - s1));
	}
}
