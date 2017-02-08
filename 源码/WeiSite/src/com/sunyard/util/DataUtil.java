package com.sunyard.util;

import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.io.Writer;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.sql.Clob;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class DataUtil {
	private static final Logger logger = LogManager.getLogger();

	/**
	 * 读取txt数据,将每一行以" "分割成字符串，存放于字符串数组中，再将每一行生成的数组存放于ArrayList集合中
	 * 
	 * @param filePath
	 *            要读取的txt文件完整名称（包含路径）
	 * @return
	 */
	public static List<String[]> getTextData(String filePath) {
		List<String[]> lists = new ArrayList<String[]>();
		List<String> list = readTextByRow(filePath);
		for (String str : list) {
			String[] strs = str.split("\r\n");
			lists.add(strs);
		}
		return lists;
	}

	/**
	 * 读取txt数据,每一行保存为一字符串，并放入ArrayList集合中
	 * 
	 * @param filePath
	 *            要读取的txt文件完整名称（包含路径）
	 * @return
	 */
	public static List<String> readTextByRow(String filePath) {
		List<String> list = new ArrayList<String>();
		String row = null;
		FileReader read = null;
		BufferedReader br = null;
		try {
			read = new FileReader(filePath);
			br = new BufferedReader(read);
			while ((row = br.readLine()) != null) {
				if (!row.trim().equals("")) {
					list.add(row);
				}
			}
		} catch (FileNotFoundException e) {
			logger.error(e, e);
		} catch (IOException e) {
			logger.error(e, e);
		} finally {
			if (br != null) {
				try {
					br.close();
				} catch (IOException e) {
				}
			}
			if (read != null) {
				try {
					read.close();
				} catch (IOException e) {
				}
			}
		}
		return list;
	}

	/**
	 * 删除文件
	 * 
	 * @param fileName
	 *            文件路径
	 */
	public static void deleteFile(String fileName) {
		File file = new File(fileName);
		if (file.isFile() && file.exists()) {
			file.delete();
		}
	}

	/**
	 * txt文件写入
	 * 
	 * @param filePath文件路径
	 * @param txt文本内容
	 * @param flag
	 *            是否续写
	 */
	public static void DOWriteTxt(String filePath, String txt, boolean flag) {
		File file = new File(filePath);

		FileOutputStream os = null;

		try {
			if (!file.exists()) {
				file.createNewFile();
			}
			os = new FileOutputStream(file, flag);
			os.write(txt.getBytes());
		} catch (Exception e) {
			logger.error(e, e);
		} finally {
			try {
				if (os != null) {
					os.close();

				}
			} catch (IOException e) {
				logger.error(e, e);
			}

		}
	}

	/**
	 * txt文件写入
	 * 
	 * @param filePath文件路径
	 * @param txt文本内容
	 * @param flag
	 *            是否续写
	 */
	public static void DOWriteTxt2(File file, String txt, boolean flag) {

		FileOutputStream os = null;

		try {
			if (!file.exists()) {
				file.createNewFile();
			}
			os = new FileOutputStream(file, flag);
			os.write(txt.getBytes());
		} catch (Exception e) {
			logger.error(e, e);
		} finally {
			try {
				if (os != null) {
					os.close();

				}
			} catch (IOException e) {
				logger.error(e, e);
			}

		}
	}

	/**
	 * 针对UTF-8的文件BOM做个处理
	 * 
	 * @param xmla
	 * @return
	 */
	public static String dealUtf8(String xmla) {

		String xml = null;
		try {
			byte[] b = xmla.getBytes("UTF-8");

			xml = new String(b, 3, b.length - 3, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			logger.error(e, e);
		}

		return xml;

	}

	public static String uuid() {
		UUID uuid = UUID.randomUUID();
		String primaryKey = uuid.toString();
		// primaryKey = primaryKey.replaceAll("-", "");

		return primaryKey;
	}

	/**
	 * 时间序列号+随机数
	 * 
	 * @return
	 */
	public static String timeSeq() {

		String primaryKey = String.valueOf(new Date().getTime());
		primaryKey = primaryKey + getRandomInt(3, false);

		return primaryKey;
	}

	/**
	 * 产生强随机数 当isMaxValue=false，value代表需要产生的结果的长度，并且结果长度必须等于这个值，
	 * isMaxValue=true，value代表结果产生的最大值，且长度不大于最大值长度
	 * 
	 * @param length
	 *            产生结果的长度
	 * @param isMaxValue
	 *            参数是否是最大值
	 * @return
	 */
	public static int getRandomInt(int value, boolean isMaxValue) {
		try {

			int max = 0;
			if (isMaxValue) {
				max = value;
			} else {
				if (value >= 10 || value < 1) {
					max = Integer.MAX_VALUE;
				} else {
					max = Integer
							.parseInt(StringUtils.leftPad("9", value, "9"));
				}
			}

			SecureRandom random = DataUtil.getRandom();

			String result = String.valueOf(random.nextInt(max));

			while (!isMaxValue && result.length() < value) {
				// 要求产生的结果位数与value相等
				result = String.valueOf(random.nextInt(max));
			}

			return Integer.parseInt(result);
		} catch (NoSuchAlgorithmException e) {
			return 0;
		}
	}

	public static SecureRandom getRandom() throws NoSuchAlgorithmException {
		// return SecureRandom.getInstance("IBMSecureRandom");
		return SecureRandom.getInstance("SHA1PRNG");
	}

	/**
	 * 判断对象是否Empty(null或元素为0)<br>
	 * 实用于对如下对象做判断:String Collection及其子类 Map及其子类
	 * 
	 * @param pObj
	 *            待检查对象
	 * @return boolean 返回的布尔值
	 */
	public static boolean isEmpty(Object pObj) {
		if (pObj == null) {
			return true;
		}
		if (pObj instanceof String) {
			if (((String) pObj).length() == 0) {
				return true;
			}
		} else if (pObj instanceof Collection) {
			if (((Collection<?>) pObj).size() == 0) {
				return true;
			}
		} else if (pObj instanceof Map) {
			if (((Map<?, ?>) pObj).size() == 0) {
				return true;
			}
		}
		return false;
	}

	public static String getGBKToUTF8(String gbkStr) {

		if (gbkStr != null && !gbkStr.equals("")) {
			try {
				return new String(gbkStr.getBytes("GBK"), "UTF-8");
			} catch (UnsupportedEncodingException e) {
				throw new InternalError();
			}
		} else {
			return "";
		}
	}

	public static String escape(String src) {
		int i;
		char j;
		StringBuffer tmp = new StringBuffer();
		tmp.ensureCapacity(src.length() * 6);
		for (i = 0; i < src.length(); i++) {
			j = src.charAt(i);
			if (Character.isDigit(j) || Character.isLowerCase(j)
					|| Character.isUpperCase(j)) {
				tmp.append(j);
			} else if (j < 256) {
				tmp.append("%");
				if (j < 16) {
					tmp.append("0");
				}
				tmp.append(Integer.toString(j, 16));
			} else {
				tmp.append("%u");
				tmp.append(Integer.toString(j, 16));
			}
		}
		return tmp.toString();
	}

	public static String unescape(String src) {
		if (src == null) {
			return null;
		}
		StringBuffer tmp = new StringBuffer();
		tmp.ensureCapacity(src.length());
		int lastPos = 0, pos = 0;
		char ch;
		while (lastPos < src.length()) {
			pos = src.indexOf("%", lastPos);
			if (pos == lastPos) {
				if (src.charAt(pos + 1) == 'u') {
					ch = (char) Integer.parseInt(
							src.substring(pos + 2, pos + 6), 16);
					tmp.append(ch);
					lastPos = pos + 6;
				} else if (src.charAt(pos + 1) == ' '
						|| src.charAt(pos + 1) == ';') {
					tmp.append(src.substring(pos, pos + 1));
					lastPos = pos + 1;
				} else {
					ch = (char) Integer.parseInt(
							src.substring(pos + 1, pos + 3), 16);
					tmp.append(ch);
					lastPos = pos + 3;
				}
			} else {
				if (pos == -1) {
					tmp.append(src.substring(lastPos));
					lastPos = src.length();
				} else {
					tmp.append(src.substring(lastPos, pos));
					lastPos = pos;
				}
			}
		}
		return tmp.toString();
	}

	/**
	 * 
	 * @param s
	 * @return 去掉标记
	 */
	public static String outTag(final String s) {
		return s.replaceAll("<.*?>", "");
	}

	// public static void main(String[] args) {
	// String html = "<html>\r\n"
	// + "<head><title>test</title><head>\r\n"
	// + "<body>"
	// + "<P><IMG   height=\"100\"       src='abc.png'   weight=\"30\">abcdefg"
	// + "<img   src='http://abc.xyz.com/123/456.jpg'   /><br>"
	// + "<IMG   height=\"100\"       \r\n"
	// + "       src=\"abc.jpg\"   \r\n"
	// + "   weight=\"30\">abcdefg         \r\n"
	// + "   <img   src=ttt.jpg>" + "   <embed   src=123.jpg   />" +
	// // "<img   alt=\"src='abc'\">" + //这种我也无能为力
	// "</body></html>";
	//
	// System.out.println(getHtmlSrcWithName(html, "img"));
	// }

	/**
	 * 获取html 标签中src的文件名
	 * 
	 * 
	 * @param html
	 * @param tag
	 *            //标签 多个标签用逗号分隔
	 * @return
	 */
	public static List<String> getHtmlSrcWithName(String html, String tag) {
		List<String> list = new ArrayList<String>();

		String[] array = tag.split(",");

		if (array != null) {
			for (String tagStr : array) {
				Pattern PATTERN = Pattern.compile("<" + tagStr
						+ "\\s+(?:[^>]*)src\\s*=\\s*([^>]+)",
						Pattern.CASE_INSENSITIVE | Pattern.MULTILINE);
				Matcher matcher = PATTERN.matcher(html);
				while (matcher.find()) {
					String group = matcher.group(1);
					String path = "";
					if (group == null) {
						continue;
					}
					// 转义的情况
					if (group.startsWith("'")) {
						path = group.substring(1, group.indexOf("'", 1));
						if (path.lastIndexOf("/") == -1) {
							list.add(path);
						} else {
							list.add(path.substring(path.lastIndexOf("/") + 1));
						}
					} else if (group.startsWith("\"")) {
						path = group.substring(1, group.indexOf("\"", 1));
						if (path.lastIndexOf("/") == -1) {
							list.add(path);
						} else {
							list.add(path.substring(path.lastIndexOf("/") + 1));
						}
					} else {
						list.add(group.split("\\s")[0]);
					}
				}
			}
		}
		return list;
	}

	// 空字符判断
	public static String emptyCode(String str) {

		if (str == null) {
			str = "";
		}
		return str;

	}

	public static boolean isChineseChar(char c) throws Exception {// 判断是否是一个汉字
		return String.valueOf(c).getBytes("GBK").length > 1;// 汉字的字节数大于1
	}

	public static final boolean isChineseCharacter(String chineseStr) {
		char[] charArray = chineseStr.toCharArray();
		for (char element : charArray) {
			if (element >= 0x4e00 && element <= 0x9fbb) {
				// Java判断一个字符串是否有中文是利用Unicode编码来判断，
				// 因为中文的编码区间为：0x4e00--0x9fbb
				return true;
			}
		}
		return false;
	}

	// 汉字字数
	public static int getChineseCount(String s) throws Exception {// 获得汉字的长度
		char c;
		int chineseCount = 0;
		if (!"".equals("")) {// 判断是否为空
			s = new String(s.getBytes(), "GBK"); // 进行统一编码
		}
		for (int i = 0; i < s.length(); i++) {// for循环
			c = s.charAt(i); // 获得字符串中的每个字符
			if (isChineseChar(c)) {// 调用方法进行判断是否是汉字
				chineseCount++; // 等同于chineseCount=chineseCount+1
			}
		}
		return chineseCount; // 返回汉字个数
	}

	/**
	 * 
	 * Description:创建Clob或者Blob
	 * 
	 * @param conn数据库连接对象
	 * @param lobClassName
	 *            oracle.sql.CLOB或者oracle.sql.BLOB
	 * @return oracle.sql.CLOB或者oracle.sql.BLOB对象
	 * @throws Exception
	 * @blog blog.csdn.ne t/sunyujia/
	 * @mail sunyujia@yahoo.cn
	 * @since：Oct 1, 2008 6:42:08 PM
	 */
	public static Object createOracleLob(Connection conn, String lobClassName)
			throws Exception {
		Class<?> lobClass = conn.getClass().getClassLoader()
				.loadClass(lobClassName);
		final Integer DURATION_SESSION = new Integer(lobClass.getField(
				"DURATION_SESSION").getInt(null));
		final Integer MODE_READWRITE = new Integer(lobClass.getField(
				"MODE_READWRITE").getInt(null));
		Method createTemporary = lobClass.getMethod("createTemporary",
				new Class[] { Connection.class, boolean.class, int.class });
		Object lob = createTemporary.invoke(null, new Object[] { conn, false,
				DURATION_SESSION });
		Method open = lobClass.getMethod("open", new Class[] { int.class });
		open.invoke(lob, new Object[] { MODE_READWRITE });
		return lob;
	}

	/**
	 * 
	 * Description:将string对象转换为Clob对象,Blob处理方式与此相同
	 * 
	 * @param str
	 * @param lob
	 * @return
	 * @throws Exception
	 */
	public static Clob oracleStr2Clob(String str, Clob lob) throws Exception {
		Method methodToInvoke = lob.getClass().getMethod(
				"getCharacterOutputStream", (Class[]) null);
		Writer writer = (Writer) methodToInvoke.invoke(lob, (Object[]) null);
		writer.write(str);
		writer.close();
		return lob;
	}

	public static Map<String, Object> beanToMap(Object bean) {
		Map<String, Object> map = new HashMap<String, Object>();

		Class<? extends Object> type = bean.getClass();

		try {
			BeanInfo beanInfo = Introspector.getBeanInfo(type);

			PropertyDescriptor[] propertyDescriptors = beanInfo
					.getPropertyDescriptors();

			for (PropertyDescriptor propertyDescriptor : propertyDescriptors) {
				String propertyName = propertyDescriptor.getName();

				if (!propertyName.equals("class")) {
					Method method = propertyDescriptor.getReadMethod();
					try {
						Object result = method.invoke(bean, new Object[0]);

						if (result != null) {
							map.put(propertyName, result);
						} else {
							map.put(propertyName, "");
						}
					} catch (IllegalArgumentException e) {
						logger.error(e, e);
					} catch (IllegalAccessException e) {
						logger.error(e, e);
					} catch (InvocationTargetException e) {
						logger.error(e, e);
					}
				}

			}
		} catch (IntrospectionException e) {
			logger.error(e, e);
		}
		return map;
	}

	/**
	 * 替换借记卡 卡片 末8-5位改成*
	 * 
	 * @param accno
	 */
	public static String replaceAccNo(String accno) {

		String str = "";
		char[] array = accno.toCharArray();
		int n = array.length;

		for (int i = 0; i < array.length; i++) {

			if (i == n - 8 || i == n - 5 || i == n - 6 || i == n - 7) {
				array[i] = '*';
			}

			str += array[i];
		}
		return str;
	}

	/**
	 * 获取客户端ip地址
	 * 
	 * @param request
	 * @return
	 */
	public static String getIpAddr(HttpServletRequest request) {
		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		return ip;
	}

	/**
	 * 字符转换 全角转半角
	 * 
	 * @param str
	 * @return
	 */
	public static String fullToHalf(String str) {
		String sTtr = "";

		StringBuffer sb = new StringBuffer();
		byte[] b = null;
		for (int i = 0; i < str.length(); i++) {
			sTtr = str.substring(i, i + 1);
			if (sTtr.equals(" ")) {
				sb.append("");
				continue;
			}
			try {
				b = sTtr.getBytes("unicode");
				if (b == null || b.length < 3) {
					throw new Exception();
				}
				if (b[2] == -1) {
					b[3] = (byte) (b[3] + 32);
					b[2] = 0;
					try {
						sb.append(new String(b, "unicode"));
					} catch (UnsupportedEncodingException e) {
						logger.error(e, e);
					}
				} else {
					sb.append(sTtr);

				}
			} catch (Exception e) {
				logger.error(e, e);
			}

		}

		String reStr = sb.toString();

		reStr = DataUtil.escape(reStr);
		if (reStr != null) {
			reStr = reStr.replaceAll("%u2006", "");
		}
		reStr = DataUtil.unescape(reStr);

		return reStr;

	}

	public static String replaceMobile(String Mobile) {
		String str = "";
		char[] array = Mobile.toCharArray();

		for (int i = 0; i < array.length; i++) {

			if (i == 3 || i == 4 || i == 5 || i == 6) {
				array[i] = '*';
			}

			str += array[i];
		}
		return str;
	}

	/**
	 * @Title: getMACAddress
	 * @Description: TODO(客户端IP地址设置，"c_"+IP)
	 * @param @param request
	 * @param @return 设定文件
	 * @version V2.0
	 * @return String 返回类型
	 * @throws
	 */
	public static String getIPAddress(HttpServletRequest request) {
		String sip = request.getHeader("x-forwarded-for");
		if (sip == null || sip.length() == 0 || "unknown".equalsIgnoreCase(sip)) {
			sip = request.getHeader("Proxy-Client-IP");
		}
		if (sip == null || sip.length() == 0 || "unknown".equalsIgnoreCase(sip)) {
			sip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (sip == null || sip.length() == 0 || "unknown".equalsIgnoreCase(sip)) {
			sip = request.getRemoteAddr();
		}
		return "c_" + sip;
	}

}
