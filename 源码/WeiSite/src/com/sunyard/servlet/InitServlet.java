package com.sunyard.servlet;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import net.sf.json.JSONObject;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.sunyard.common.ServerContext;
import com.sunyard.util.XmlUtil;

public class InitServlet implements ServletContextListener {

	private static final long serialVersionUID = 2899753354613364452L;
	private static JSONObject config = XmlUtil.config;
	public static Logger log = LogManager.getLogger();// log4j日志工具

	public void contextDestroyed(ServletContextEvent sce) {

	}

	public void contextInitialized(ServletContextEvent sce) {
		long start = System.currentTimeMillis();
		boolean success = true;

		log.info("*******************************************************");
		log.info("在线客服客户端V2.0开始启动...");
		log.info("*******************************************************");
		try {
			init(sce.getServletContext());
		} catch (Exception e) {
			success = false;
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		log.info("********************************************");
		long timeSec = (System.currentTimeMillis() - start) / 1000;

		if (success)
			log.info("客户端启动成功");
		else
			log.info("客户端启动失败");

		log.info("启动总耗时: " + timeSec / 60 + "分 " + timeSec % 60 + "秒 ");

		log.info("********************************************");
	}

	public void init(ServletContext servletContext) {
		log.info("****************加载config.xml配置***************************");
		log.info(config);
		JSONObject openfire = (JSONObject) config.get("Openfire");
		String webInterface = config.getString("WebServiceUrl");

		JSONObject system = (JSONObject) config.get("System");

		ServerContext.getInstance().initserver();
	}
}
