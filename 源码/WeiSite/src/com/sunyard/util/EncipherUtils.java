package com.sunyard.util;

import java.io.File;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import net.sf.json.JSONObject;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import secapipackage.SecApi;

/**
 * <b> 加密工具类 </b>
 * 
 * @author huang.zh@sunyard.com
 */
public class EncipherUtils {
	private static Logger logger = LogManager.getLogger();
	private static JSONObject config = XmlUtil.config;
	private static JSONObject hsmapi;
	private SecApi secApi;

	/**
	 * 单例延迟加载实例
	 * */
	private static class SingletonHoder {
		static EncipherUtils instance = new EncipherUtils();
	}

	public static EncipherUtils getInstance() {
		return SingletonHoder.instance;
	}

	private EncipherUtils() {
		initSecApi();
	}

	/**
	 * 初始化加密客户端
	 */
	private void initSecApi() {
		String path = XmlUtil.class.getResource("").getPath();
		path = path.substring(0, path.length() - 9) + "hsmapi.conf";
		hsmapi = (JSONObject) config.get("hsmapi");
		File sFile = new File(path);
		if (sFile.exists()) {
			this.secApi = new SecApi(sFile.getPath());
		} else {
			logger.error("=============can't find hsmapi.conf");
		}
	}

	/**
	 * 移动银行个人网银密码加密
	 * 
	 * @param pwd
	 * @return
	 */
	public String encipherMBandEB(String pwd) {
		logger.info("encipherMBandEB(),start to convert password");
		String outputValue = null;
		byte[] pinBlock = new byte[48];

		if (pwd == null) {
			return null;
		}
		byte[] pin = pwd.getBytes();
		try {
			if (pin.length > 20 || pin.length < 6) {
				// 密码长度要在6位到20位之间
				throw new Exception("密码长度要在6位到20位之间");
			}
			String nodeApp = hsmapi.getString("nodeApp");
			String nodId = hsmapi.getString("nodeId");
			logger.info(">>nodeApp:" + nodeApp);
			logger.info(">>nodeId:" + nodId);

			int ret = secApi.cryptLongPin(nodeApp.getBytes(), nodId.getBytes(), "0".getBytes(), pin, pinBlock);
			outputValue = new String(pinBlock);
			if (ret != 0) {
				logger.info(new StringBuffer("cryptLongPin return[").append(ret).append("],加密失败!"));
			} else {
				logger.info("加密成功");
			}

		} catch (Exception e) {
			logger.error(e, e);
		}
		return outputValue;
	}

	/**
	 * 电话银行加密
	 * 
	 * @param pwd
	 * @return
	 */
	public String encipherPb(String pwd) {
		logger.info("encipherPb(),start to convert password");
		byte[] pinBlock = new byte[17];

		if (pwd == null) {
			return null;
		}
		String accNo = "0000000000000000";
		// 使用固定的16个0做加密因子,无需转化
		// String convertedAcc = this.convertAccNo(accNo);
		try {
			if (pwd.length() != 6) {
				// 电话银行密码应为6位
				throw new Exception("电话银行密码应为6位");
			}
			String nodeApp = hsmapi.getString("nodeApp");
			String nodId = hsmapi.getString("nodeId");
			logger.info(">>nodeApp:" + nodeApp);
			logger.info(">>nodeId:" + nodId);
			int ret = secApi.encryptPIN(nodeApp.getBytes(), nodId.getBytes(), pwd.getBytes(), "06".getBytes(),
					accNo.getBytes(), "01".getBytes(), pinBlock);
			logger.info(new StringBuffer().append("convert password return ").append(ret));

			byte[] pinBlock16 = new byte[16];
			System.arraycopy(pinBlock, 0, pinBlock16, 0, 16);
			String npwd = new String(pinBlock16);
			return npwd;
		} catch (Exception e) {
			logger.error(e, e);
		}
		return null;
	}

	/**
	 * 转换账号
	 * 
	 * @param accNo
	 * @return
	 */
	@SuppressWarnings("unused")
	private String convertAccNo(String accNo) {
		String convertedAcc = accNo;
		/**
		 * 当13≤X≤19，去掉账号ACCNO的最右边一位后，从右向左取12位，头前补4个‘0’
		 * X=12，去掉账号ACCNO最右边一位后，从右向左取11位，头前补5个‘0’ X<12, 取账号ACCNO的x位，其后补12-x位
		 * ‘0’，再在头前补4个‘0’
		 */

		int len = accNo.length();

		if (len >= 13 && len <= 19) {
			convertedAcc = "0000" + accNo.substring(len - 13, len - 1);
		} else if (len == 12) {
			convertedAcc = "00000" + accNo.substring(0, 11);
		} else {
			convertedAcc = "0000" + accNo + "0000000000000000000000000";
			convertedAcc = convertedAcc.substring(0, 16);
		}
		/**
		 * 把账号中的英文字母转换成数字 a/A-0,b/B-1,...k/K-0,...z/Z-5 非a-z,A-Z的字符转换成0
		 */
		convertedAcc = convertedAcc.toUpperCase();
		Pattern p = Pattern.compile("[A-Z]");
		Matcher m = p.matcher(convertedAcc);
		while (m.find()) {
			String group = m.group();
			convertedAcc = convertedAcc.replaceAll(group, (group.charAt(0) - 'A') % 10 + "");
		}
		convertedAcc = convertedAcc.replaceAll("[\\D]", "0");
		return convertedAcc;
	}
	public static void main(String[] args) {
		EncipherUtils s = EncipherUtils.getInstance();
		System.out.println(s.encipherPb("112233"));
		System.out.println(s.encipherPb("332211"));
		System.out.println(s.encipherMBandEB("112233"));
		System.out.println(s.encipherMBandEB("332211"));
	}
}
