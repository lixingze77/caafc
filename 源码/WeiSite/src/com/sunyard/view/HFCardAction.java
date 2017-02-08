package com.sunyard.view;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.sunyard.domain.ApActivity;
import com.sunyard.domain.ApCard;
import com.sunyard.domain.ApCustom;
import com.sunyard.domain.ApNetPolice;
import com.sunyard.domain.ApProcess;
import com.sunyard.http.HttpClientUtil;
import com.sunyard.util.DataUtil;

@RequestMapping("/hf")
@Controller
public class HFCardAction extends BaseAction {
	// 2.4 产品信息查询
	@RequestMapping(value = "/product", method = RequestMethod.POST)
	public void product(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		String url = config.getString("HFCardProduct");

		// url = URLEncoder.encode(url, "utf-8");
		// ApCardProduct card = new ApCardProduct();

		Map values = getParameterMap(request);
		logger.info("[产品信息查询]>>提交参数：" + values);
		// BeanUtils.populate(card, request.getParameterMap());

		JSONObject obj = new JSONObject();
		// obj = JSONObject.fromObject(card);
		// obj.put("process", JSONObject.fromObject(card));
		logger.info("[产品信息查询]>>接口url：" + url);
		// String result = sendHttp(url, obj.toString());

		long start = System.currentTimeMillis();
		Map<String, String> header = new HashMap<String, String>();

		// header.put("Content-Type", "application/json;charse=UTF-8");

		HttpClientUtil http = new HttpClientUtil(url, null, "json", "utf-8",
				header);
		String respone = "";
		try {
			respone = http.sendGetOnce();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		long end = System.currentTimeMillis();
		logger.info("[http耗时]>>：" + (end - start) + "ms");

		logger.info("[产品信息查询]>>接口返回：" + respone);

		response.getWriter().write(respone.toString());
		;
	}

	// 2.1 新增进件
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public void add(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		ApProcess process = new ApProcess();
		ApCustom custom = new ApCustom();
		ApCard card = new ApCard();

		Map values = getParameterMap(request);
		logger.info("[新增进件]>>提交参数：" + values);

		BeanUtils.populate(custom, request.getParameterMap());
		BeanUtils.populate(card, request.getParameterMap());
		BeanUtils.populate(process, request.getParameterMap());
		String ip = DataUtil.getIpAddr(request);

		custom.setIpaddr(ip);
		JSONObject obj = new JSONObject();
		obj.put("apCustom", JSONObject.fromObject(custom));
		obj.put("apCard", JSONObject.fromObject(card));

		obj.put("process", JSONObject.fromObject(process));

		logger.info("[新增进件]>>接口提交参数：" + obj.toString());
		String url = config.getString("HFAdd");
		logger.info("[新增进件]>>接口url：" + url);
		String result = sendHttp(url, obj.toString());
		// String result = "";
		logger.info("[新增进件]>>接口返回：" + result);

		response.getWriter().write(result.toString());

	}

	// 2.5 身份核查
	@RequestMapping(value = "/police", method = RequestMethod.POST)
	public void police(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");

		ApNetPolice police = new ApNetPolice();

		Map values = getParameterMap(request);
		logger.info("[身份核查]>>提交参数：" + values);

		BeanUtils.populate(police, request.getParameterMap());

		JSONObject obj = new JSONObject();
		obj = JSONObject.fromObject(police);

		logger.info("[身份核查]>>接口提交参数：" + obj.toString());
		String url = config.getString("HFPolice");
		logger.info("[身份核查]>>接口url：" + url);
		String result = sendHttp(url, obj.toString());

		logger.info("[身份核查]>>接口返回：" + result);

		response.getWriter().write(result.toString());
	}

	// http 查询
	private String sendHttp(String url, String params) {

		long start = System.currentTimeMillis();
		Map<String, String> header = new HashMap<String, String>();

		header.put("Content-Type", "application/json;charse=UTF-8");

		HttpClientUtil http = new HttpClientUtil(url, params, "json", "utf-8",
				header);
		String respone = http.sendPostOnce();
		long end = System.currentTimeMillis();
		logger.info("[http耗时]>>：" + (end - start) + "ms");

		return respone;
	}

	// 2.5 按渠道查询活动信息
	@RequestMapping(value = "/activity", method = RequestMethod.POST)
	public void activity(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		String url = config.getString("HFActivity");
		Map<String, String> header = new HashMap<String, String>();

		url = url + "/" + request.getParameter("channelCode");
		// ApActivity activity = new ApActivity();

		Map values = getParameterMap(request);
		logger.info("[查询活动信息]>>提交参数：" + values);
		// BeanUtils.populate(activity, request.getParameterMap());

		JSONObject obj = new JSONObject();
		// obj = JSONObject.fromObject(activity);
		// obj.put("process", JSONObject.fromObject(card));

		logger.info("[查询活动信息]>>接口提交参数：" + obj.toString());
		logger.info("[查询活动信息]>>接口url：" + url);
		// String result = sendHttp(url, obj.toString());
		long start = System.currentTimeMillis();

		HttpClientUtil http = new HttpClientUtil(url, obj.toString(), "json",
				"utf-8", header);
		String respone = "";
		try {
			respone = http.sendGetOnce();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		long end = System.currentTimeMillis();
		logger.info("[http耗时]>>：" + (end - start) + "ms");

		logger.info("[查询活动信息]>>接口返回：" + respone);

		response.getWriter().write(respone.toString());

	}

	// 2.16省市查询
	@RequestMapping(value = "/city", method = RequestMethod.POST)
	public void city(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		String url = config.getString("HFCity");
		Map<String, String> header = new HashMap<String, String>();
		String ip = DataUtil.getIpAddr(request);
		logger.info("[省市查询]>>请求ip：" + ip);

		logger.info("[省市查询]>>接口url：" + url);
		long start = System.currentTimeMillis();

		HttpClientUtil http = new HttpClientUtil(url, null, "json", "utf-8",
				header);
		String respone = "";
		String result = "";
		JSONArray resultArray = new JSONArray();

		try {
			respone = http.sendGetOnce();

			JSONArray array = new JSONArray();

			if (!DataUtil.isEmpty(respone))
				array = JSONArray.fromObject(respone);

			for (int i = 0; i < array.size(); i++) {
				JSONObject obj = array.getJSONObject(i);
				JSONObject newObj = new JSONObject();
				newObj.put("id", obj.getString("cityCode"));
				newObj.put("name", obj.getString("cityName"));
				newObj.put(
						"areaCode",
						obj.containsKey("areaCode") == true ? obj
								.getString("areaCode") : "");
				newObj.put(
						"postcode",
						obj.containsKey("postcode") == true ? obj
								.getString("postcode") : "");
 
				if (obj.containsKey("children") && obj.get("children") != null) {
					Object object = obj.get("children");
					if (object instanceof JSONArray) {
						JSONArray childArray = JSONArray.fromObject(object);
						if (childArray.size() > 0)
							newObj.put("child", getChildCity(childArray));
					}
				}
				resultArray.add(newObj);
			}

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		long end = System.currentTimeMillis();
		logger.info("[http耗时]>>：" + (end - start) + "ms");

		logger.info("[省市查询]>>接口返回：" + respone);

		response.getWriter().write(resultArray.toString());

	}

	// 获取子城市列表
	private JSONArray getChildCity(JSONArray array) {
		JSONArray resultArray = new JSONArray();

		for (int i = 0; i < array.size(); i++) {
			JSONObject obj = array.getJSONObject(i);
			JSONObject newObj = new JSONObject();
			newObj.put("id", obj.getString("cityCode"));
			newObj.put("name", obj.getString("cityName"));
			newObj.put(
					"areaCode",
					obj.containsKey("areaCode") == true ? obj
							.getString("areaCode") : "");
			newObj.put(
					"postcode",
					obj.containsKey("postcode") == true ? obj
							.getString("postcode") : "");
			if (obj.containsKey("children") && obj.get("children") != null) {
				Object object = obj.get("children");
				if (object instanceof JSONArray) {
					JSONArray childArray = JSONArray.fromObject(object);
					if (childArray.size() > 0)
						newObj.put("child", getChildCity(childArray));
				}
			}
			resultArray.add(newObj);
		}

		return resultArray;
	}

	// 2.5申请字段查询
	@RequestMapping(value = "/field", method = RequestMethod.POST)
	public void field(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		String url = config.getString("HFField");
		Map<String, String> header = new HashMap<String, String>();
		url = url + "/002";
		logger.info("[申请字段查询]>>接口url：" + url);
		long start = System.currentTimeMillis();

		HttpClientUtil http = new HttpClientUtil(url, null, "json", "utf-8",
				header);
		String respone = "";
		try {
			respone = http.sendGetOnce();

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		long end = System.currentTimeMillis();
		logger.info("[http耗时]>>：" + (end - start) + "ms");

		logger.info("[申请字段查询]>>接口返回：" + respone);

		response.getWriter().write(respone.toString());
	}

	// 2.52.9 推荐结果查询
	@RequestMapping(value = "/recom", method = RequestMethod.POST)
	public void recom(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		String url = config.getString("HFRecom");
		Map<String, String> header = new HashMap<String, String>();

		url = url + "/" + request.getParameter("phone");
		// ApActivity activity = new ApActivity();

		Map values = getParameterMap(request);
		logger.info("[推荐结果查询]>>提交参数：" + values);
		// BeanUtils.populate(activity, request.getParameterMap());

		JSONObject obj = new JSONObject();
		// obj = JSONObject.fromObject(activity);
		// obj.put("process", JSONObject.fromObject(card));

		logger.info("[推荐结果查询]>>接口提交参数：" + obj.toString());
		logger.info("[推荐结果查询]>>接口url：" + url);
		// String result = sendHttp(url, obj.toString());
		long start = System.currentTimeMillis();
		String result = sendHttp(url, obj.toString());

		 
		long end = System.currentTimeMillis();
		logger.info("[http耗时]>>：" + (end - start) + "ms");

		logger.info("[推荐结果查询]>>接口返回：" + result);

		response.getWriter().write(result.toString());

	}

	// 2.10 申请进度查询
	@RequestMapping(value = "/getspeed", method = RequestMethod.POST)
	public void getspeed(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		String url = config.getString("HFGetspeed");
		Map<String, String> header = new HashMap<String, String>();

		url = url + "/" + request.getParameter("cardid");
		// ApActivity activity = new ApActivity();

		Map values = getParameterMap(request);
		logger.info("[申请进度查询]>>提交参数：" + values);
		// BeanUtils.populate(activity, request.getParameterMap());

		JSONObject obj = new JSONObject();
		// obj = JSONObject.fromObject(activity);
		// obj.put("process", JSONObject.fromObject(card));

		logger.info("[申请进度查询]>>接口提交参数：" + obj.toString());
		logger.info("[申请进度查询]>>接口url：" + url);
		// String result = sendHttp(url, obj.toString());
		long start = System.currentTimeMillis();

//		HttpClientUtil http = new HttpClientUtil(url, obj.toString(), "json",
//				"utf-8", header);
		String result = sendHttp(url, obj.toString());

		String respone = "";
		 
		long end = System.currentTimeMillis();
		logger.info("[http耗时]>>：" + (end - start) + "ms");

		logger.info("[申请进度查询]>>接口返回：" + result);

		response.getWriter().write(result.toString());

	}

	// 2.12 EMS查询
	@RequestMapping(value = "/getEMS", method = RequestMethod.POST)
	public void getEMS(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		String url = config.getString("HFGetEMS");
		Map<String, String> header = new HashMap<String, String>();

		url = url + "/" + request.getParameter("emailId");
		// ApActivity activity = new ApActivity();

		Map values = getParameterMap(request);
		logger.info("[EMS查询]>>提交参数：" + values);
		// BeanUtils.populate(activity, request.getParameterMap());

		JSONObject obj = new JSONObject();
		// obj = JSONObject.fromObject(activity);
		// obj.put("process", JSONObject.fromObject(card));

		logger.info("[EMS查询]>>接口提交参数：" + obj.toString());
		logger.info("[EMS查询]>>接口url：" + url);
		// String result = sendHttp(url, obj.toString());
		long start = System.currentTimeMillis();

		HttpClientUtil http = new HttpClientUtil(url, obj.toString(), "json",
				"utf-8", header);
		String respone = "";
		try {
			respone = http.sendGetOnce();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		long end = System.currentTimeMillis();
		logger.info("[http耗时]>>：" + (end - start) + "ms");

		logger.info("[EMS查询]>>接口返回：" + respone);

		response.getWriter().write(respone.toString());

	}

	// 2.13 ICMS退卡查询
	@RequestMapping(value = "/getICMS", method = RequestMethod.POST)
	public void getICMS(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		String url = config.getString("HFGetICMS");
		Map<String, String> header = new HashMap<String, String>();

		url = url + "/" + request.getParameter("emailId");
		// ApActivity activity = new ApActivity();

		Map values = getParameterMap(request);
		logger.info("[ICMS退卡查询]>>提交参数：" + values);
		// BeanUtils.populate(activity, request.getParameterMap());

		JSONObject obj = new JSONObject();
		// obj = JSONObject.fromObject(activity);
		// obj.put("process", JSONObject.fromObject(card));

		logger.info("[ICMS退卡查询]>>接口提交参数：" + obj.toString());
		logger.info("[ICMS退卡查询]>>接口url：" + url);
		// String result = sendHttp(url, obj.toString());
		long start = System.currentTimeMillis();

		HttpClientUtil http = new HttpClientUtil(url, obj.toString(), "json",
				"utf-8", header);
		String respone = "";
		try {
			respone = http.sendGetOnce();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		long end = System.currentTimeMillis();
		logger.info("[http耗时]>>：" + (end - start) + "ms");

		logger.info("[ICMS退卡查询]>>接口返回：" + respone);

		response.getWriter().write(respone.toString());

	}
}
