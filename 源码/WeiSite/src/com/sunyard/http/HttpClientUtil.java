package com.sunyard.http;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringReader;
import java.util.HashMap;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.HttpMethod;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.multipart.FilePart;
import org.apache.commons.httpclient.methods.multipart.MultipartRequestEntity;
import org.apache.commons.httpclient.methods.multipart.Part;
import org.apache.commons.httpclient.params.HttpMethodParams;
import org.apache.http.HttpStatus;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jdom.Document;
import org.jdom.input.SAXBuilder;
import org.xml.sax.InputSource;

import com.sunyard.util.DataUtil;
import com.sunyard.util.XmlUtil;

/**
 * httpclient发送请求
 * 
 */
public class HttpClientUtil {

	public static Logger logger = LogManager.getLogger();

	private static JSONObject config = XmlUtil.config;
	private static JSONObject Http;
	private static int conTimeOutMs;
	private static int timeOut = 50000;
	private static int proxyPort;
	private static String proxyIp;

	private String urlStr;
	private String param;
	private String format;
	private String charset;
	private static Map<String, String> header;
	private int reSendNum;

	static {
		Http = (JSONObject) config.get("Http");
		// 处理数字类型异常
		if (DataUtil.isEmpty(Http.getString("proxyIp"))
				|| Http.getString("proxyIp").equals("[]"))
			proxyIp = "";
		else
			proxyIp = Http.getString("proxyIp");
		String proxyPortStr = Http.getString("proxyPort");

		// 处理数字类型异常
		if (DataUtil.isEmpty(proxyPortStr) || proxyPortStr.equals("[]"))
			proxyPort = 0;
		else
			proxyPort = Integer.parseInt(proxyPortStr);
		if (DataUtil.isEmpty(Http.getString("conTimeOutMs")))
			conTimeOutMs = 0;
		else
			conTimeOutMs = Integer.parseInt(Http.getString("conTimeOutMs"));

	}

	/**
	 * 初始化发送任务
	 * 
	 * @param urlStr
	 *            发送地址
	 * @param param
	 *            发送参数
	 * @param type
	 *            请求类型
	 * @param format
	 *            发送报文格式
	 */
	public HttpClientUtil(String urlStr, String param, String format,
			String charset, Map<String, String> header) {
		if (DataUtil.isEmpty(Http.getString("reSendNum"))) {
			reSendNum = 0;
		} else {
			reSendNum = Integer.parseInt(Http.getString("reSendNum"));
		}
		this.urlStr = urlStr;
		this.param = param;
		this.format = format;
		this.charset = charset;
		this.header = new HashMap<String, String>();

		this.header = header;
	}

	/**
	 * 以get方式发送HTTP请求
	 * 
	 * @param url
	 *            请求url
	 * @return String
	 */
	@SuppressWarnings("deprecation")
	public String sendGetOnce() throws IOException {
		HttpClient client = new HttpClient();

		client.setConnectionTimeout(conTimeOutMs);
		client.setTimeout(timeOut);
		if (!"".equals(proxyIp)) {
			client.getHostConfiguration().setProxy(proxyIp, proxyPort);
		}
		// 使用 GET 方法 ，如果服务器需要通过 HTTPS 连接，那只需要将下面 URL 中的 http 换成 https

		HttpMethod method = new GetMethod(urlStr);
		if (header != null) {
			for (Map.Entry<String, String> entry : header.entrySet()) {
				method.setRequestHeader(entry.getKey(), entry.getValue());
			}
		}
		// 中文转码
		method.getParams().setContentCharset(charset);
		try {
			client.executeMethod(method);
		} catch (HttpException e) {

			logger.error(new StringBuffer("发送HTTP GET给\r\n").append(urlStr)
					.append("\r\nHTTP异常\r\n"), e);
		} catch (IOException e) {

			logger.error(new StringBuffer("发送HTTP GET给\r\n").append(urlStr)
					.append("\r\nIO异常\r\n"), e);
		}
		logger.info(new StringBuffer("发送HTTP GET给\r\n").append(urlStr)
				.append("，\r\n返回状态码为:").append(method.getStatusCode())
				.append(";\r\n处理结果:\r\n")
				.append(method.getResponseBodyAsString()));
		// 释放连接
		method.releaseConnection();

		return method.getResponseBodyAsString();
	}

	/**
	 * 以post方式发送HTTP请求,URL中没有AccessToken
	 * 
	 * @param url
	 *            请求url
	 * @param param
	 *            请求数据
	 * @param accessToken
	 *            accessToken
	 * @param originalId
	 *            公众号原始ID
	 */
	public String sendGet() {
		int temp = 1;
		String str = "";
		while (reSendNum > 0) {
			try {
				logger.info(new StringBuffer("第").append(temp).append("次请求")
						.append(urlStr).toString());
				str = sendGetOnce();
				reSendNum = 0;
			} catch (HttpException e) {
				logger.error(e, e);
			} catch (IOException e) {
				logger.error(e, e);
			} finally {
				reSendNum = reSendNum - 1;
				temp = temp + 1;
			}

		}
		return str;
	}

	/**
	 * 以post方式发送HTTP请求
	 * 
	 * @param url
	 *            请求url
	 * @param param
	 *            请求数据
	 * @throws IOException
	 * @throws HttpException
	 */
	@SuppressWarnings("deprecation")
	public String sendPostOnce() {
		String responeJsonStr = param.toString();

		// 构建http
		HttpClient client = new HttpClient();
		client.setConnectionTimeout(conTimeOutMs);
		client.setTimeout(timeOut);
		PostMethod post = new PostMethod(urlStr);
		// 设置代理
		if (!"".equals(proxyIp)) {
			client.getHostConfiguration().setProxy(proxyIp, proxyPort);
		}
		post.setRequestBody(responeJsonStr);
		// 设置格式
		post.getParams().setContentCharset(charset);
		for (Map.Entry<String, String> entry : header.entrySet()) {
			post.setRequestHeader(entry.getKey(), entry.getValue());
		}
		// 发送http请求
		String respStr = "";

		try {
			client.executeMethod(post);
			respStr = post.getResponseBodyAsString();
		} catch (Exception e) {
			// TODO Auto-generated catch block

			logger.error("【http请求异常】", e);
		}

		logger.info("【请求地址】:".concat(urlStr + "\r\n"));
		logger.info("【发送内容】："
				+ param.replaceAll("<PWD>\\w+<\\\\/PWD>",
						"<PWD>******<\\\\/PWD>"));

		logger.info("【返回状态编码】:" + post.getStatusCode());
		logger.info("【响应结果】：");
		logger.info(respStr);

		return respStr;
	}

	/**
	 * 以post方式发送HTTP请求,URL中无AccessToken
	 * 
	 * @param url
	 *            请求url
	 * @param param
	 *            请求数据
	 */
	public String sendPost() {
		Document doc = null;

		int temp = 1;
		String str = "";
		while (reSendNum > 0) {
			try {
				logger.info(new StringBuffer("第").append(temp).append("次请求")
						.append(urlStr).toString());
				str = sendPostOnce();
				reSendNum = 0;
			} catch (Exception e) {
				logger.error(e, e);
			} finally {
				reSendNum = reSendNum - 1;
				temp = temp + 1;
			}

		}
		return str;
	}

	/**
	 * @Title: httpBody
	 * @Description: TODO(xml转换 string to Document)
	 * @param @param xmlDoc
	 * @param @return 设定文件
	 * @version V2.0
	 * @return Document 返回类型
	 * @throws
	 */
	public static Document strToXml(String xmlDoc) {
		Document doc = null;
		if (xmlDoc != null && !xmlDoc.equals("")) {
			StringReader read = new StringReader(xmlDoc);
			InputSource source = new InputSource(read);
			SAXBuilder sb = new SAXBuilder();
			try {
				doc = sb.build(source);
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				if (read != null) {
					read.close();
				}
			}
		}
		return doc;
	}

	/**
	 * 以post方式上传文件HTTP请求
	 * 
	 * @param url
	 *            请求url
	 * @param param
	 *            请求数据
	 * @throws IOException
	 * @throws HttpException
	 */
	@SuppressWarnings("deprecation")
	public String uploadFilePostOnce(File targetFile, HttpMethodParams params)
			throws Exception {
		JSONObject System = (JSONObject) config.get("System");
		String targetURL = System.getString("urlupload");// 上传文件地址
		// 构建http
		HttpClient client = new HttpClient();
		client.getHttpConnectionManager().getParams()
				.setConnectionTimeout(conTimeOutMs);
		client.setTimeout(timeOut);
		PostMethod post = new PostMethod(targetURL);
		// 设置代理
		if (!"".equals(proxyIp)) {
			client.getHostConfiguration().setProxy(proxyIp, proxyPort);
		}

		if (params != null)
			post.setParams(params);
		Part[] parts = { new FilePart(targetFile.getName(), targetFile) };
		post.setRequestEntity(new MultipartRequestEntity(parts, post
				.getParams()));
		// 设置格式
		post.getParams().setContentCharset(charset);
		if (header != null) {
			for (Map.Entry<String, String> entry : header.entrySet()) {
				post.setRequestHeader(entry.getKey(), entry.getValue());
			}
		}
		// 发送http请求
		String respStr = "";

		try {
			client.executeMethod(post);
			respStr = post.getResponseBodyAsString();
		} catch (Exception e) {
			// TODO Auto-generated catch block

			logger.error("【http请求异常】", e);
		}

		logger.info("【上传文件请求地址】:".concat(targetURL + "\r\n"));

		logger.info("【返回状态编码】:" + post.getStatusCode());
		logger.info("【响应结果】：");
		logger.info(respStr);

		return respStr;
	}

	private final static int BUFFER = 1024;

	/**
	 * @Title: downFileGetOnce
	 * @Description: TODO(下载文件服务器文件)
	 * @param @param path 保存客户端的文件地址
	 * @param @param fileName 要下载的文件名称
	 * @param @throws Exception 设定文件
	 * @version V2.0
	 * @return void 返回类型
	 * @throws
	 */
	public void downFileGetOnce(String path, String fileName) throws Exception {
		HttpClient client = new HttpClient();
		JSONObject System = (JSONObject) config.get("System");
		String targetURL = System.getString("urldownload");// 上传文件地址

		targetURL += "?fileName=" + fileName;
		logger.info("【下载文件地址】targetURL=" + targetURL);

		client.setConnectionTimeout(conTimeOutMs);
		client.setTimeout(timeOut);
		if (!"".equals(proxyIp)) {
			client.getHostConfiguration().setProxy(proxyIp, proxyPort);
		}
		// 使用 GET 方法 ，如果服务器需要通过 HTTPS 连接，那只需要将下面 URL 中的 http 换成 https

		HttpMethod method = new GetMethod(targetURL);
		if (header != null) {
			for (Map.Entry<String, String> entry : header.entrySet()) {
				method.setRequestHeader(entry.getKey(), entry.getValue());
			}
		}
		// 中文转码
		method.getParams().setContentCharset(charset);

		int status = client.executeMethod(method);
		if (status == HttpStatus.SC_OK) {
			InputStream in = method.getResponseBodyAsStream();
			FileOutputStream out = new FileOutputStream(new File(path));

			byte[] b = new byte[BUFFER];
			int len = 0;
			while ((len = in.read(b)) != -1) {
				out.write(b, 0, len);
			}
			in.close();
			out.close();
			logger.info("【下载文件成功】");

		} else {
			logger.error("【下载文件失败】status=" + status);
		}

		method.releaseConnection();
	}

	/**
	 * @return the urlStr
	 */
	public String getUrlStr() {
		return urlStr;
	}

	/**
	 * @param urlStr
	 *            the urlStr to set
	 */
	public void setUrlStr(String urlStr) {
		this.urlStr = urlStr;
	}

	/**
	 * @return the param
	 */
	public String getParam() {
		return param;
	}

	/**
	 * @param param
	 *            the param to set
	 */
	public void setParam(String param) {
		this.param = param;
	}

	/**
	 * @return the format
	 */
	public String getFormat() {
		return format;
	}

	/**
	 * @param format
	 *            the format to set
	 */
	public void setFormat(String format) {
		this.format = format;
	}

	/**
	 * @return the charset
	 */
	public String getCharset() {
		return charset;
	}

	/**
	 * @param charset
	 *            the charset to set
	 */
	public void setCharset(String charset) {
		this.charset = charset;
	}

	public static void main(String args[]) {
		HttpClientUtil client = new HttpClientUtil(null, null, "", "gbk", null);
		File targetFile = new File("C:\\Users\\wxg\\Desktop\\weike.sql");
		try {
			String fileName = JSONObject.fromObject(
					client.uploadFilePostOnce(targetFile, null)).getString(
					"fileName");
			client.downFileGetOnce("C:\\Users\\wxg\\Desktop\\weike123.sql",
					fileName);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
