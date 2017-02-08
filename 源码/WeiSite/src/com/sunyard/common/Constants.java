/**************************************************************************
 * Copyright (c) 2013-2015 信雅达信息系统工程有限公司.
 * All rights reserved.
 * 
 * 项目名称：微客平台2.0项目
 * 版权说明：本软件属信雅达信息系统工程有限公司所有。                            
 ***************************************************************************/
package com.sunyard.common;


/**
 * @ClassName: Constants
 * @Description:
 * @author 王兴钢 xingg.wang@sunyard.com
 * @date 2016年4月6日 上午11:31:51
 * 
 */
public class Constants {
	public enum MsgType {

		TEXT("text"), IMAGE("image"), MPNEWS("mpnews"), LOCATION("location"), LINK(
				"link"), SHORTVIDEO("shortvideo"), VOICE("voice"), COMMAND(
				"command"), VIDEO("video"), SCAN("qr"), CLICK("click"), SUBSCRIBE(
				"subscribe"), UNSUBSCRIBE("unsubscribe"), THUMB("thumb"), NEWS(
				"news"), EVENT("event"), ERROR("error"), NAVMENU("navmenu");
		private String value;

		MsgType(String value) {
			this.value = value;
		}

		public String getValue() {
			return this.value;
		}

		public static MsgType getEnum(String name) {
			try {
				return MsgType.valueOf(name.toUpperCase());
			} catch (Exception e) {
				return MsgType.TEXT;
			}
		}
	}
}
