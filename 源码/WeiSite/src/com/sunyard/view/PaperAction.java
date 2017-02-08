package com.sunyard.view;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.sunyard.http.HttpClientUtil;
import com.sunyard.util.DataUtil;

@RequestMapping("/paper")
@Controller
public class PaperAction extends BaseAction {
	private final String logName = "【H5Client】";

	@RequestMapping(value = "/getMsg", method = RequestMethod.POST)
	public void getMsg(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		String activity = request.getParameter("activity");
		String userid = request.getParameter("userid");
		String pagesize = request.getParameter("pagesize");
		String page = request.getParameter("page");
		logger.info(logName + ">>  查询参数    >>  activity=" + activity
				+ ",userid=" + userid + ",pagesize=" + pagesize + ",page="
				+ page);
		// 默认显示一条
		if (DataUtil.isEmpty(pagesize)) {
			pagesize = "1";
		}
		// 默认第一条
		if (DataUtil.isEmpty(page)) {
			page = "1";
		}
		long start = new Date().getTime();

		
		String responeJsonStr = sendGetHttp(activity, userid, pagesize, page);
		long end = new Date().getTime();

		logger.info(logName + ">>  接口参数返回    >>  " + responeJsonStr);
		logger.info(logName + ">>  [耗时]>>  " + (end - start) + "ms");

		response.getWriter().write(responeJsonStr);

	}

	private String sendGetHttp(String activity, String userid, String pagesize,
			String page) {

		JSONObject getparam = new JSONObject();
		getparam.put("activity", activity);
		getparam.put("userid", userid);
		getparam.put("pagesize", pagesize);
		getparam.put("page", page);
		Map<String, String> header = new HashMap<String, String>();
		// String url =
		// "http://localhost:8080//WeikeManager/infgetPaper/getPaperMag?postType=1";
		String url = config.getString("WeikePaperGetUrl");
		HttpClientUtil client = new HttpClientUtil(url, getparam.toString(),
				"json", "utf-8", header);
		String responeJsonStr = client.sendPostOnce();
		return responeJsonStr;
	}

	@RequestMapping(value = "/setMsg", method = RequestMethod.POST)
	public void setMsg(HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		String activity = request.getParameter("activity");
		String name = request.getParameter("name");
		String phone = request.getParameter("phone");
		String age = request.getParameter("age");
		String data = DataUtil.unescape(request.getParameter("data"));
		String recoverid = request.getParameter("recoverid");
		JSONObject setparam = new JSONObject();
		setparam.put("activity", activity);
		setparam.put("name", name);
		setparam.put("phone", phone);
		setparam.put("age", age);
		setparam.put("data", data);
		setparam.put("recoverid", recoverid);
		Map<String, String> header = new HashMap<String, String>();
		// String url =
		// "http://localhost:8080//WeikeManager/infsetPaper/setPaperMag?postType=1";
		String url = config.getString("WeikePaperSetUrl");
		HttpClientUtil client = new HttpClientUtil(url, setparam.toString(),
				"json", "utf-8", header);
		String responeJsonStr = client.sendPostOnce();
		response.getWriter().write(responeJsonStr);

	}
}
