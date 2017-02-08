package com.sunyard.view;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@RequestMapping("/login")
@Controller
public class LoginRest extends BaseAction {

	@RequestMapping(value = "/validation", method = RequestMethod.POST)
	public void ValLogin(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		//
		// Cookie[] cookies = request.getCookies();
		// Map<String, String> map = new HashMap<String, String>();
		//
		// for (int i = 0; i < cookies.length; i++) {
		// Cookie cookie = cookies[i];
		// map.put(cookie.getName(), cookie.getValue());
		//
		// }
		// String key = "BSFIT_DEVICEID";
		// String keyVal = "";
		//
		// if(map.containsKey(key)){
		// keyVal = map.get(key);
		// }
		StringBuffer sb = new StringBuffer();
		InputStream is = request.getInputStream();
		InputStreamReader isr = new InputStreamReader(is,"utf-8");
		BufferedReader br = new BufferedReader(isr);
		String s = "";
		while ((s = br.readLine()) != null) {
			sb.append(s);
		}
		String str = sb.toString();

System.out.println(str);
		response.getWriter().write("");
	}

	@RequestMapping(value = "/0", method = RequestMethod.POST)
	public void Login(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		JSONObject result = new JSONObject();
		result.put("code", "1");
		result.put("codemsg", "22");
		responseObject(response, result);
	}
}
