package com.sunyard.common;

import java.util.Hashtable;

import javax.servlet.http.HttpSession;

/**
 * 
 * 
 * 系统参数处理类
 * 
 * 
 */
public class ServerContext {

	private static ServerContext ser = null;

	private static Hashtable ht = new Hashtable();

	public static ServerContext getInstance() {
		if (ser == null) {
			ser = new ServerContext();
		}
		return ser;
	}

	@SuppressWarnings("static-access")
	public synchronized void setHttpSession(String cjid, HttpSession httpSession) {

		ht.put(cjid, httpSession);
	}

	/**
	 * 
	 * 初始化系统参数
	 * 
	 */
	@SuppressWarnings("static-access")
	public synchronized void initserver() {

	}

	public static HttpSession getHttpSession(String cjid) {
		return (HttpSession) ht.get(cjid);
	}

	public static void removeSession(String cjid) {
		ht.remove(cjid);

	}

}
