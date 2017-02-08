/**************************************************************************
 * Copyright (c) 2013-2015 信雅达信息系统工程有限公司.
 * All rights reserved.
 * 
 * 项目名称：微客平台2.0项目
 * 版权说明：本软件属信雅达信息系统工程有限公司所有。                            
 ***************************************************************************/
package com.sunyard.http;

import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.sunyard.common.Constants.MsgType;
import com.sunyard.util.XmlUtil;

/**
 * @ClassName: Roto
 * @Description:
 * @author 王兴钢 xingg.wang@sunyard.com
 * @date 2016年4月6日 上午10:50:51
 * 
 */
public class Roto {
	private static final Logger logger = LogManager.getLogger();
	private static JSONObject config = XmlUtil.config;

	private static final String OPERATER_NAME = "【机器人通讯】";

	private static final String MSG_TYPE = "msgType";// 消息类型
	private static final String REPLY_TYPE = "replyType";// 回复类型

	private static final String CONTENT = "content";// 消息内容
	private static final String ROBOT_ID = "robotId";// 机器人id
	private static final String CHANNEL_ID = "channelId";// 渠道id
	private static final String OPEN_ID = "openId";// 用户id

	/**
	 * 向机器人请求
	 * 
	 * @params content 请求内容 robotId 机器人id channelId 渠道 openId 客户ID
	 * @return
	 * @author xinx.wang@sunyard.com
	 */
	public static String http(String content, String openId) {
		logger.info(OPERATER_NAME + "开始...");
		String reply = StringUtils.EMPTY;
		try {
			JSONObject json = new JSONObject();
			String robotId = config.getString("RobotId");
			String channelId = config.getString("ChannelId");

			json.put(CONTENT, content);
			json.put(ROBOT_ID, robotId);
			json.put(CHANNEL_ID, channelId);
			json.put(OPEN_ID, openId);

			Map<String, String> header = new HashMap<String, String>();
			header.put("Content-Type", "text/xml;charset=utf-8");
			HttpClientUtil httpClient = new HttpClientUtil(
					config.getString("aiURL"), json.toString(), "xml", "utf-8",
					header);
			reply = httpClient.sendPostOnce();
		} catch (Exception e) {
			logger.error(OPERATER_NAME, e);
		}
		logger.info(OPERATER_NAME + "结束...");
		return reply;
	}

	/**
	 * 机器人结果分析
	 * 
	 * @params context 上下文 robotResp 机器人返回报文
	 * @return
	 * @author xinx.wang@sunyard.com
	 * @throws ExecutionException
	 */
	public static void analyzerResult(String robotResp) throws Exception {
		JSONObject robotJson = JSONObject.fromObject(robotResp);
		String msgTypeStr = robotJson.getString(MSG_TYPE);
		MsgType msgType = MsgType.getEnum(msgTypeStr);
		String replyType = robotJson.getString(REPLY_TYPE);
		// String receiveTypeIsNavMenu = robotJson
		// .getString(Constants.RECEIVE_TYPE_IS_NAV_MENU);
		// boolean isNavMenu = Boolean.valueOf(receiveTypeIsNavMenu);
		// if (isNavMenu) {
		// logger.info(OPERATER_NAME + "用户的请求信息是导航菜单，将数据修正至导航菜单.");
		// WXRequest req = context.getWxRequest();
		// req.setMsgType(CmdResult.navmenu.name());
		// context.setWxRequest(req);
		// }

		switch (msgType) {
		case COMMAND:

			break;
		case TEXT:

			break;
		case MPNEWS:

			break;
		case VOICE:

			break;
		case ERROR:

			break;
		default:
			break;
		}
	}

}
