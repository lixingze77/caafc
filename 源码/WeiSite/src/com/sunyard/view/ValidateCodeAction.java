package com.sunyard.view;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.sunyard.util.CreateImageCode;
import com.sunyard.util.ValidateCode;

@RequestMapping("/hf")
@Controller
public class ValidateCodeAction extends BaseAction {
	// 2.4 产品信息查询
	@RequestMapping(value = "/valiCode", method = RequestMethod.GET)
	public void valiCode(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");

		CreateImageCode vCode = new CreateImageCode(100, 30, 4, 20);
		request.getSession().setAttribute("ValidateCode", vCode.getCode());
		vCode.write(response.getOutputStream());
		System.out.println(request.getSession().getAttribute("ValidateCode"));
	}

	@RequestMapping(value = "/getValiCode", method = RequestMethod.GET)
	public void getValiCode(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");

		response.getWriter().write(
				(request.getSession().getAttribute("ValidateCode").toString()));
	}
}
