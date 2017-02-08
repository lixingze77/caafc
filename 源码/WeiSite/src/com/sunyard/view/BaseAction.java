package com.sunyard.view;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;

import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.binary.Hex;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.sunyard.util.AESUtil;
import com.sunyard.util.DataUtil;
import com.sunyard.util.RSAUtil;
import com.sunyard.util.XmlUtil;

public class BaseAction {

	/** session激活时间 */
	public static final String ACTIVE_TIME = "activeTime";
	/** 上次访问的链接时间戳 */
	public static final String LAST_ST = "lastST";
	/** 是否已登陆,暂不使用 */
	public static final String IS_LOGIN = "isLogin";

	public static final Logger logger = LogManager.getLogger();
	public static JSONObject config = XmlUtil.config;
	public static final String ENCODING = "UTF-8";

	/**
	 * 返回对象响应
	 * 
	 * @param response
	 * @param object
	 */
	public void responseObject(HttpServletResponse response, Object object) {
		response.setContentType("text/html;charset=utf-8");
		try {
			PrintWriter write = response.getWriter();
			// JSONObject json = new JSONObject();

			write.println(this.encodeObjectJson(object));
			write.close();
		} catch (IOException e) {
			logger.error(e, e);
		}
	}

	/**
	 * 返回成功
	 * 
	 * @param response
	 * @param object
	 */
	public void setOkMsg(HttpServletResponse response, Object object) {
		response.setContentType("text/html;charset=utf-8");
		JSONObject json = new JSONObject();

		try {
			if (object instanceof ArrayList) {
				JSONArray jsonArray = JSONArray.fromObject(object);
				json.put("msg", jsonArray);
			} else if (object instanceof String) {
				json.put("msg", object);
			} else {
				JSONObject jsonObject = JSONObject.fromObject(object);

				json.put("msg", jsonObject);

			}
			json.put("success", true);

			PrintWriter write = response.getWriter();
			// JSONObject json = new JSONObject();

			write.println(json);
			write.close();
			if (logger.isInfoEnabled()) {
				logger.info(new StringBuffer("序列化后的JSON资料输出:\t").append(json
						.toString()));
			}
		} catch (IOException e) {
			logger.error(e, e);
		}

	}

	/**
	 * 返回失败
	 * 
	 * @param response
	 * @param object
	 */
	public void setFail(HttpServletResponse response, Object object) {
		response.setContentType("text/html;charset=utf-8");
		JSONObject json = new JSONObject();

		try {
			if (object instanceof ArrayList) {
				JSONArray jsonArray = JSONArray.fromObject(object);
				json.put("msg", jsonArray);
			} else if (object instanceof String) {
				json.put("msg", object);
			} else {
				JSONObject jsonObject = JSONObject.fromObject(object);

				json.put("msg", jsonObject);

			}
			json.put("success", false);
			PrintWriter write = response.getWriter();
			// JSONObject json = new JSONObject();

			write.println(json);
			write.close();
			if (logger.isInfoEnabled()) {
				logger.info(new StringBuffer("序列化后的JSON资料输出:\t").append(json
						.toString()));
			}
		} catch (IOException e) {
			logger.error(e, e);
		}

	}

	/**
	 * 将不含日期时间格式的Java对象系列化为Json资料格式
	 * 
	 * @param pObject
	 *            传入的Java对象
	 * @return
	 */
	public final JSONObject encodeObjectJson(Object pObject) {
		JSONObject json = new JSONObject();

		String jsonString = "[]";
		if (DataUtil.isEmpty(pObject)) {
			logger.warn("传入的Java对象为空,不能将其序列化为Json资料格式.请检查!");
		} else {
			if (pObject instanceof ArrayList) {
				JSONArray jsonArray = JSONArray.fromObject(pObject);
				jsonString = jsonArray.toString();
				json.put("msg", jsonString);
			} else {
				JSONObject jsonObject = JSONObject.fromObject(pObject);

				jsonString = jsonObject.toString();
				json.put("msg", jsonString);

			}
			json.put("result", 0);
		}
		if (logger.isInfoEnabled()) {
			logger.info(new StringBuffer("序列化后的JSON资料输出:\t").append(json
					.toString()));
		}
		return json;
	}

	public static JsonConfig jsonConfig(final String format) {
		JsonConfig cfg = new JsonConfig();

		cfg.registerJsonValueProcessor(java.util.Date.class,
				new JsonValueProcessor() {

					public Object processObjectValue(String key, Object value,
							JsonConfig arg2) {
						if (value == null) {
							return "";
						}
						if (value instanceof Date) {
							String str = new SimpleDateFormat(format)
									.format((Date) value);
							return str;
						}
						return value.toString();
					}

					public Object processArrayValue(Object value,
							JsonConfig arg1) {
						return null;
					}
				});

		return cfg;

	}

	/**
	 * 获取session 对象
	 * 
	 * @param request
	 *            请求对象
	 * @param key
	 *            关键值
	 * @return
	 */
	public Object getContainerSession(HttpServletRequest request, String key) {
		HttpSession session = request.getSession();
		return session.getAttribute(key);
	}

	/**
	 * 移除session 对象
	 * 
	 * @param request
	 *            请求对象
	 * @param key
	 *            关键值
	 */
	public void removeContainerSession(HttpServletRequest request, String key) {
		HttpSession session = request.getSession();
		session.removeAttribute(key);
	}

	/**
	 * 获取请求实体<br>
	 * 3DES KEY从请求数据获取<br>
	 * 对KEY进行RSA解密后得到3DES KEY<br>
	 * 然后对密文数据解密
	 * 
	 * @param request
	 *            请求对象
	 * @return
	 * @throws Exception
	 */
	public JSONObject getQueryRequest(HttpServletRequest request)
			throws Exception {
		request.setCharacterEncoding("UTF-8");
		InputStream inStream = null;
		JSONObject json = null;
		String keyStr = request.getParameter("key");
		String param = request.getParameter("param");

		if (!DataUtil.isEmpty(keyStr) && !DataUtil.isEmpty(param)) {// 若不传key则作明文处理
			param = decodeParameter(keyStr, param);
			json = JSONObject.fromObject(param);
		} else {
			json = JSONObject.fromObject(request.getParameterMap());
		}
		logger.info("-  >>  >>参数解析后：" + json);

		// if (isTimeOut(request)) {
		// throw new TimeOutException();
		// }
		return json;
	}

	/**
	 * 获取请求实体<br>
	 * 3DES KEY从请求数据获取<br>
	 * 对KEY进行RSA解密后得到3DES KEY<br>
	 * 然后对密文数据解密
	 * 
	 * @param request
	 *            请求对象
	 * @return
	 * @throws Exception
	 */
	public String getReqParameter(HttpServletRequest request, String keyName)
			throws Exception {
		request.setCharacterEncoding("UTF-8");
		InputStream inStream = null;
		JSONObject json = null;
		String keyStr = request.getParameter("key");
		String param = request.getParameter("param");

		if (!DataUtil.isEmpty(keyStr) && !DataUtil.isEmpty(param)) {// 若不传key则作明文处理
			param = decodeParameter(keyStr, param);
			json = JSONObject.fromObject(param);
		} else {
			json = JSONObject.fromObject(request.getParameterMap());
		}

		logger.info("-  >>  >>参数解析后：" + json);

		// if (isTimeOut(request)) {
		// throw new TimeOutException();
		// }
		if (json.containsKey(keyName)) {
			return json.getString(keyName);
		} else {
			return null;
		}
	}

	/**
	 * 从request中获得参数Map，并返回可读的Map
	 * 
	 * @param request
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static Map getParameterMap(HttpServletRequest request) {
		// 参数Map
		Map properties = request.getParameterMap();
		// 返回值Map
		Map returnMap = new HashMap();
		Iterator entries = properties.entrySet().iterator();
		Map.Entry entry;
		String name = "";
		String value = "";
		while (entries.hasNext()) {
			entry = (Map.Entry) entries.next();
			name = (String) entry.getKey();
			Object valueObj = entry.getValue();
			if (null == valueObj) {
				value = "";
			} else if (valueObj instanceof String[]) {
				String[] values = (String[]) valueObj;
				for (int i = 0; i < values.length; i++) {
					value = values[i] + ",";
				}
				value = value.substring(0, value.length() - 1);
			} else {
				value = valueObj.toString();
			}
			returnMap.put(name, value);
		}
		return returnMap;
	}

	/**
	 * @Title: decodeParameter
	 * @Description: TODO(解析加密请求)
	 * @param @param keyStr 秘钥参数
	 * @param @param param 加密参数
	 * @param @return 设定文件
	 * @version V2.0
	 * @return String 返回类型
	 * @throws
	 */
	private String decodeParameter(String keyStr, String param) {
		try {
			param = URLDecoder.decode(param, ENCODING);
			logger.info("请求参数:key=" + keyStr + "&param=" + param);

			RSAUtil rsa = RSAUtil.getInstance();
			byte[] rsaKey = Hex.decodeHex(keyStr.toCharArray());

			keyStr = new String(rsa.decrypt(rsaKey));
			// 反转
			StringBuffer sb = new StringBuffer(keyStr);
			keyStr = sb.reverse().toString();

			param = AESUtil.Decrypt(param, keyStr);
			return param;
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			logger.error(e.getMessage());
			return null;
		} catch (DecoderException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			logger.error(e.getMessage());
			return null;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			logger.error(e.getMessage());
			return null;
		}

	}
}
