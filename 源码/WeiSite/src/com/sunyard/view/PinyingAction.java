package com.sunyard.view;

import java.io.Writer;
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
import com.sunyard.util.Pinyin4jUtil;

@RequestMapping("/pinying")
@Controller
public class PinyingAction extends BaseAction{
	@RequestMapping(value = "/getMsg", method = RequestMethod.POST)
	public void getMsg(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		String name = request.getParameter("name");
		logger.info("--------------------------------接收到的姓名:"+name);
		String pname=Pinyin4jUtil.converterToSpell(name);
		JSONObject obj=new JSONObject();
		obj.put("result", pname);
		logger.info("--------------------------------返回的拼音字符串："+obj);
		response.getWriter().write(obj.toString());
	}
}
