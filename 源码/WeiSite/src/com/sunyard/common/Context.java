/**************************************************************************
 * Copyright (c) 2013-2015 信雅达信息系统工程有限公司.
 * All rights reserved.
 * 
 * 项目名称：微客平台2.0项目
 * 版权说明：本软件属信雅达信息系统工程有限公司所有。                            
 ***************************************************************************/
package com.sunyard.common;

/**
 * @ClassName: Context
 * @Description:
 * @author wxg xingg.wang@sunyard.com
 * @date 2015年9月6日 上午11:14:45
 * 
 */
public class Context {
	/********* 客户默认名称 ********/

	public final static String DEFAULT_CUSTOMERNAME = "游客";

	/********* 渠道 ********/
	public final static String channelEmpty = "";
	public final static String channelEmpty_Name = "网站";
	public final static String channelEmpty_PhoneName = "手机微网站";

	public final static String channelCyBerBank = "21";
	public final static String channelCyBerBank_Name = "网银";

	/********** 网银客户类型 **********/
	public final static String U_Personal = "1";// 个人
	public final static String U_Company = "2";// 企业

	/*********** 接入openfire时给客服的提示 **********************/
	public final static String FIRST_MESSAGE = "***客户已经接入人工服务，可以进行对话了！***";
	/********** pushlet监听事件 **********/

	public static final String SUBJECT = "agentim";// pushlet DataEvent
	/********** 会话链接失败 **********/

	public static final String NO_SESSION = "服务连接失败，请刷新页面，重新连接！";//

	/********** 消息发送返回类型 **********/
	public static final String MESSAGE_STATUS_FAIL = "failure";// 失败
	public static final String MESSAGE_STATUS_OVERSTEP = "overstep";// 超出时间段
	public static final String MESSAGE_STATUS_DISTRIBUTE = "distribute";// 坐席分发
	public static final String MESSAGE_STATUS_WAIT = "wait";// 坐席忙等待
	public static final String MESSAGE_STATUS_NOAGENT = "noAgent";// 无坐席
	public static final String MESSAGE_STATUS_BLACKLIST = "blackList";// // 黑名单
	public static final String MESSAGE_STATUS_EXCEPTION = "exception";// 系统异常
	public static final String MESSAGE_STATUS_SUCCESS = "0";// 注册登录成功
	/********** 向坐席发出的命令 **********/
	public static final String CHAT_START = "@startconversation";// 向坐席发起开始命令

	public static final String CHAT_END = "@endconversation";// 向坐席发起结束命令
	public static final String CHAT_AGENT_EXIT = "@agentsystemexist";// 坐席退出
	public static final String CHAT_AGENT_END = "@agentendconversation";// 坐席退出

	
	public static final String CHAT_TRANSFER_END = "@transferend";// 向坐席发起转接命令，结束坐席

	public static final String CHAT_TRANSFER_ADD = "@transferstart";// 向坐席发起转接命令，新坐席进线

	/********** 满意度评价 **********/
	public static final String EVAL_STATUS_FAIL = "您的评价失败，请重新评价";// 失败
	public static final String EVAL_STATUS_SUCCESS = "您的评价成功，欢迎您再次使用在线咨询服务，祝您工作顺利、生活愉快！";// 成功

	/************** 消息通知命令 ********************/
	public static final String NOTIFY_WAIT_ADD = "QueueAdded";// 进线
	public static final String NOTIFY_WAIT_ING = "Inline";// 排队中
	public static final String NOTIFY_TRANSFER = "Transfer";// 转接
	public static final String NOTIFY_TRANSFERADDED = "TransferAdded";// 转接进线
	public static final String NOTIFY_SCREENIMG = "screenimg";//截屏消息

	public static final String formatJson = "json";
	public static final String formatXml = "xml";
	public static final String charsetUtf8 = "utf-8";
	public static final String charsetGBK = "gbk";

	public static final String InfaceException = "接口发送异常";

}
