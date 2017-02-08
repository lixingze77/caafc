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
public class HttpClientTools {

	public static Logger logger = LogManager.getLogger();

	private static int conTimeOutMs = 30000;
	private static int timeOut = 50000;
	private static int proxyPort = 0;
	private static String proxyIp = "";

	private String urlStr;
	private String param;
	private String format;
	private String charset;
	private static Map<String, String> header;
	private int reSendNum;

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
	public HttpClientTools(String urlStr, String param, String format,
			String charset, Map<String, String> header) {

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
						"<PWD>******<\\\\/PWD>").concat("]"));

		logger.info("【返回状态编码】:" + post.getStatusCode());
		logger.info("【响应结果】：");
		logger.info(respStr);

		return respStr;
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

	public static void main(String[] args) {
		Map<String, String> header = new HashMap<String, String>();
		HttpClientTools http = new HttpClientTools("http://196.168.123.197:8060/Every360/webchatHttpService", "", "json", "utf-8",
				header);
		
		http.sendPostOnce();

	}
}
