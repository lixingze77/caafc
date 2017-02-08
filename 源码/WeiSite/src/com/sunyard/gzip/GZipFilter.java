/**************************************************************************
 * Copyright (c) 2013-2015 信雅达信息系统工程有限公司.
 * All rights reserved.
 * 
 * 项目名称：微客平台2.0项目
 * 版权说明：本软件属信雅达信息系统工程有限公司所有。                            
 ***************************************************************************/
package com.sunyard.gzip;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Enumeration;
import java.util.zip.GZIPOutputStream;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @ClassName: GZipFilter
 * @Description:
 * @author 王兴钢 xingg.wang@sunyard.com
 * @date 2016年1月29日 上午9:21:09
 * 
 */
public class GZipFilter implements Filter {

	/*
	 * (非 Javadoc) <p>Title: destroy</p> <p>Description: </p>
	 * 
	 * @see javax.servlet.Filter#destroy()
	 */

	public void destroy() {
		// TODO Auto-generated method stub
	}

	/**
	 * 判断浏览器是否支持GZIP
	 * 
	 * @param request
	 * @return
	 */
	private static boolean isGZipEncoding(HttpServletRequest request) {
		boolean flag = false;
		// Enumeration headerNames = request.getHeaderNames();
		// while (headerNames.hasMoreElements()) {
		// String key = (String) headerNames.nextElement();
		// String value = request.getHeader(key);
		// System.out.println(key + ":" + value);
		// }
		String encoding = request.getHeader("Accept-Encoding");
		if (encoding == null) {//由于代理服务器原因暂时处理
			flag = true;
		}

		else if (encoding.indexOf("gzip") != -1) {
			flag = true;
		}
		return flag;
	}

	/*
	 * (非 Javadoc) <p>Title: doFilter</p> <p>Description: </p>
	 * 
	 * @param arg0
	 * 
	 * @param arg1
	 * 
	 * @param arg2
	 * 
	 * @throws IOException
	 * 
	 * @throws ServletException
	 * 
	 * @see javax.servlet.Filter#doFilter(javax.servlet.ServletRequest,
	 * javax.servlet.ServletResponse, javax.servlet.FilterChain)
	 */

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		// TODO Auto-generated method stub
		HttpServletResponse resp = (HttpServletResponse) response;
		HttpServletRequest req = (HttpServletRequest) request;
		if (isGZipEncoding(req)) {
			Wrapper wrapper = new Wrapper(resp);
			chain.doFilter(request, wrapper);
			byte[] gzipData = gzip(wrapper.getResponseData());
			resp.addHeader("Content-Encoding", "gzip");
			resp.setContentLength(gzipData.length);
			ServletOutputStream output = response.getOutputStream();
			output.write(gzipData);
			output.flush();
		} else {
			chain.doFilter(request, response);
		}

	}

	private byte[] gzip(byte[] data) {
		ByteArrayOutputStream byteOutput = new ByteArrayOutputStream(10240);
		GZIPOutputStream output = null;
		try {
			output = new GZIPOutputStream(byteOutput);
			output.write(data);
		} catch (IOException e) {
		} finally {
			try {
				output.close();
			} catch (IOException e) {
			}
		}
		return byteOutput.toByteArray();
	}

	/*
	 * (非 Javadoc) <p>Title: init</p> <p>Description: </p>
	 * 
	 * @param arg0
	 * 
	 * @throws ServletException
	 * 
	 * @see javax.servlet.Filter#init(javax.servlet.FilterConfig)
	 */

	public void init(FilterConfig arg0) throws ServletException {
		// TODO Auto-generated method stub

	}

}
