package com.sunyard.common;

import java.util.Hashtable;
import java.util.Iterator;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionBindingListener;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import net.sf.json.JSONObject;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.sunyard.util.XmlUtil;

/**
 * Session监听器 完成对Seesion会话资源的实时监控
 * 
 * 
 * @see HttpSessionBindingListener
 */
public class SessionListener implements HttpSessionListener {

	public static Logger log = LogManager.getLogger();// log4j日志工具
	private static JSONObject config = XmlUtil.config;

	// 集合对象，保存session对象的引用
	static Hashtable ht = new Hashtable();

	/**
	 * 实现HttpSessionListener接口，完成session创建事件控制 说明：此时的Session状态为无效会话，
	 * 只有用户成功登录系统后才将此Session写入EAHTTPSESSION表作为有效SESSION来管理
	 */
	public void sessionCreated(HttpSessionEvent event) {

		int time = config.getInt("SessionTimeOut");

		HttpSession session = event.getSession();
		session.setMaxInactiveInterval(time * 60);// 设置session超时

		ht.put(session.getId(), session);
		log.info("创建了一个Session连接:" + session.getId());
	}

	/**
	 * 实现HttpSessionListener接口，完成session销毁事件控制
	 */
	public void sessionDestroyed(HttpSessionEvent event) {
		HttpSession httpSession = event.getSession();
		if (httpSession == null)
			return;

	
		ht.remove(httpSession.getId());
		log.info("销毁了一个Session连接:" + httpSession.getId());
	}

	/**
	 * 增加一个有效Session
	 * 
	 * @param session
	 */
	static public void addSession(HttpSession session) {
		ht.put(session.getId(), session);

	}

	/**
	 * 返回全部session对象集合
	 * 
	 * @return
	 */
	static public Iterator getSessions() {
		return ht.values().iterator();
	}

	/**
	 * 依据session id返回指定的session对象
	 * 
	 * @param sessionId
	 * @return
	 */
	static public HttpSession getSessionByID(String sessionId) {
		return (HttpSession) ht.get(sessionId);
	}
}
