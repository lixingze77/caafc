/**
 * Copyright 2003 (C) PANLAB ，All Rights Reserved.
 * 日期         作者 			动作
 * 2003-10-20   青蛙                     创建
 */
package com.sunyard.util;

import java.sql.Timestamp;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

import net.sf.json.JSONObject;

/**
 * <p>
 * Title: 基础类
 * </p>
 * <p>
 * Description: 日期转换
 * </p>

 * <p>
 * Company:
 * </p>
 * 
 * @author hbq
 * @version 1.0
 */
public class DateUtils {

	// static long now = System.currentTimeMillis();
	// public static Date CurrTime = new Date(now);

	public DateUtils() {
	}

	// 取系统时间时一定要用这个方法，否则日期可能不动
	public static Date getCurrDateTime() {
		return new Date(System.currentTimeMillis());
	}

	/**
	 * 根据指定时间，得到months天数之后的日期
	 * 
	 * @param d
	 * @param days
	 * @return
	 */
	public static Date getIncDateTimeMonth(java.util.Date d, int months) {
		java.util.Calendar c = java.util.Calendar.getInstance();
		c.setTime(d);
		c.add(Calendar.MONTH, months);
		return c.getTime();
	}

	/**
	 * 取得当前系统时间(时间格式：yyyy-MM-dd HH:mm:ss)
	 * 
	 * @return yyyy-MM-dd HH:mm:ss
	 */
	public static String getCurrTime() {
		Date date_time = new Date();
		return FormatDate(date_time, "yyyy-MM-dd HH:mm:ss");
	}

	/**
	 * @Title: getCurrDateTime
	 * @Description: TODO(获取当前时间)
	 * @param @param fmt
	 * @param @return 设定文件
	 * @version V2.0
	 * @return String 返回类型
	 * @throws
	 */
	public static String getCurrDateTime(String fmt) {
		SimpleDateFormat dateTimeFormatter = new SimpleDateFormat(fmt);
		return dateTimeFormatter.format(Calendar.getInstance().getTime());
	}

	/**
	 * 取得日期的年份
	 * 
	 * @param date
	 *            日期
	 * @return yyyy 年份字符串
	 */
	public static String getYear(Date date) {
		return FormatDate(date, "yyyy");
	}

	/**
	 * 取得日期的月份
	 * 
	 * @param date
	 *            日期
	 * @return mm 月份字符串
	 */
	public static String getMonth(Date date) {
		return FormatDate(date, "MM");
	}

	/**
	 * 取得日期的天份
	 * 
	 * @param date
	 *            日期
	 * @return dd 天字符串
	 */
	public static String getDay(Date date) {
		return FormatDate(date, "dd");
	}

	/**
	 * 取得日期的小时
	 * 
	 * @param date
	 *            日期
	 * @return hh 小时字符串
	 */
	public static String getHour(Date date) {
		return FormatDate(date, "HH");
	}

	/**
	 * 取得日期的分钟
	 * 
	 * @param date
	 *            时间
	 * @return mm 分钟字符串
	 */
	public static String getMinute(Date date) {
		return FormatDate(date, "mm");
	}

	/**
	 * 取得时间的秒
	 * 
	 * @param date
	 *            时间
	 * @return ss 秒字符串
	 */
	public static String getSecond(Date date) {
		return FormatDate(date, "ss");
	}

	/**
	 * 日期转化为字符串
	 * 
	 * @param date
	 *            时间
	 * @return yyyy-MM-dd HH:mm:ss 格式化的时间字符串
	 */
	public static String dateToString(Date date) {
		return FormatDate(date, "yyyy-MM-dd HH:mm:ss");
	}

	/**
	 * 日期转化为字符串
	 * 
	 * @param date
	 *            时间
	 * @return yyyy-MM-dd 格式化的时间字符串
	 */
	public static String dateToStringShort(Date date) {
		return FormatDate(date, "yyyy-MM-dd");
	}

	/**
	 * 字符串转换为日期
	 * 
	 * @param dateString
	 *            yyyy-MM-dd HH:mm:ss
	 * @return 日期
	 */
	public static Date stringToDate(String dateString) {
		String sf = "yyyy-MM-dd HH:mm:ss";
		Date dt = stringToDate(dateString, sf);
		return dt;
	}

	/**
	 * 字符串转换为日期
	 * 
	 * @param dateString
	 *            yyyy-MM-dd
	 * @return 日期
	 */
	public static Date stringToDateShort(String dateString) {
		String sf = "yyyy-MM-dd";
		Date dt = stringToDate(dateString, sf);
		return dt;
	}

	/**
	 * 对日期进行格式化
	 * 
	 * @param date
	 *            日期
	 * @param sf
	 *            日期格式
	 * @return 字符串
	 */
	public static String FormatDate(Date date, String sf) {
		SimpleDateFormat dateformat = new SimpleDateFormat(sf);
		return dateformat.format(date);
	}

	/**
	 * 字符串转换为日期
	 * 
	 * @param dateString
	 *            日期格式字符串
	 * @param sf
	 *            日期格式化定义
	 * @return 转换后的日期
	 */
	public static Date stringToDate(String dateString, String sf) {
		ParsePosition pos = new ParsePosition(0);
		SimpleDateFormat sdf = new SimpleDateFormat(sf);
		Date dt = sdf.parse(dateString, pos);
		return dt;
	}

	/**
	 * 计算两个日期差（毫秒）
	 * 
	 * @param date1
	 *            时间1
	 * @param date2
	 *            时间2
	 * @return 相差毫秒数
	 */
	public static long diffTwoDate(Date date1, Date date2) {
		long l1 = date1.getTime();
		long l2 = date2.getTime();
		return l1 - l2;
	}

	/**
	 * 计算两个时间差(毫秒)
	 * 
	 * @param timestamp1
	 * @param timestamp2
	 * @return 相差毫秒数
	 */
	public static long diffTwoTimestamp(Timestamp timestamp1,
			Timestamp timestamp2) {
		long l1 = timestamp1.getTime();
		long l2 = timestamp2.getTime();
		;
		return l1 - l2;

	}

	/**
	 * 计算两个日期差（天）
	 * 
	 * @param date1
	 *            时间1
	 * @param date2
	 *            时间2
	 * @return 相差天数
	 */
	public static int diffTwoDateDay(Date date1, Date date2) {
		long l1 = date1.getTime();
		long l2 = date2.getTime();
		StringBuffer sb = new StringBuffer();
		sb.append("");
		sb.append((l1 - l2) / 3600 / 24 / 1000);

		int diff = Integer.parseInt(sb.toString());
		return diff;
	}

	/**
	 * 
	 * @param currentTime
	 *            计算的日期
	 * @param type
	 *            偏移的类别
	 * @param iQuantity
	 *            偏移数量
	 * @return 偏移后的时间串 edit by qiu
	 */
	public String getDateChangeTime2(String currentTime, String type,
			int iQuantity) {

		Date curr = stringToSqlDateShort(currentTime);
		String a = "";
		Date curr2 = this.getDateChangeTime(curr, type, iQuantity);
		a = dateToStringShort(curr2);

		// dateToStringShort(curr3);
		return a;

	}

	/**
	 * 
	 * @param currentTime
	 *            计算的日期
	 * @param type
	 *            偏移的类别
	 * @param iQuantity
	 *            偏移数量
	 * @return 偏移后的时间串
	 */
	public String getDateChangeTime(String currentTime, String type,
			int iQuantity) {
		Date curr = stringToDate(currentTime);
		curr = this.getDateChangeTime(curr, type, iQuantity);
		return dateToString(curr);
	}

	/**
	 * 
	 * @param currentTime
	 *            计算的日期
	 * @param type
	 *            偏移的类别
	 * @param iQuantity
	 *            偏移数量
	 * @return 偏移后的时间
	 */
	public Date getDateChangeTime(Date currentTime, String type, int iQuantity) {
		int year = Integer.parseInt(FormatDate(currentTime, "yyyy"));
		int month = Integer.parseInt(FormatDate(currentTime, "MM"));
		// 月份修正,必须在日期变更前修改正月份，否则小月份都会产成问题
		month = month - 1;
		int day = Integer.parseInt(FormatDate(currentTime, "dd"));
		int hour = Integer.parseInt(FormatDate(currentTime, "HH"));
		int mi = Integer.parseInt(FormatDate(currentTime, "mm"));
		int ss = Integer.parseInt(FormatDate(currentTime, "ss"));
		GregorianCalendar gc = new GregorianCalendar(year, month, day, hour,
				mi, ss);

		// 月份修正,必须在日期变更前修改正月份，否则小月份都会产成问题
		// gc.add(GregorianCalendar.MONTH, -1);

		if (type.equalsIgnoreCase("y")) {
			gc.add(Calendar.YEAR, iQuantity);
		} else if (type.equalsIgnoreCase("m")) {
			gc.add(Calendar.MONTH, iQuantity);
		} else if (type.equalsIgnoreCase("d")) {
			gc.add(Calendar.DATE, iQuantity);
		} else if (type.equalsIgnoreCase("h")) {
			gc.add(Calendar.HOUR, iQuantity);
		} else if (type.equalsIgnoreCase("mi")) {
			gc.add(Calendar.MINUTE, iQuantity);
		} else if (type.equalsIgnoreCase("s")) {
			gc.add(Calendar.SECOND, iQuantity);
		}

		return gc.getTime();
	}

	/**
	 * 取月末时间
	 * 
	 * @param date
	 *            日期
	 * @return date
	 */
	public Date getMonthEnd(Date date) {
		int year = Integer.parseInt(FormatDate(date, "yyyy"));
		int month = Integer.parseInt(FormatDate(date, "MM"));
		int day = Integer.parseInt(FormatDate(date, "dd"));

		GregorianCalendar calendar = new GregorianCalendar(year, month - 1,
				day, 0, 0, 0);
		int monthLength = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
		StringBuffer newDateStr = new StringBuffer();
		newDateStr.append(FormatDate(date, "yyyy"));
		newDateStr.append("-");
		newDateStr.append(FormatDate(date, "MM"));
		newDateStr.append("-");

		if (monthLength < 10) {
			newDateStr.append("0");
			newDateStr.append(monthLength);
		} else {
			newDateStr.append(monthLength);
		}
		return stringToDateShort(newDateStr.toString());
	}

	/**
	 * 取月初时间
	 * 
	 * @param date
	 * @return
	 */
	public Date getMonthBegin(Date date) {
		StringBuffer newDateStr = new StringBuffer();
		newDateStr.append(FormatDate(date, "yyyy-MM"));
		newDateStr.append("-01");

		// FormatDate(date, "yyyy-MM-dd");
		return stringToDateShort(newDateStr.toString());
	}

	/**
	 * 取季度末时间
	 * 
	 * @param date
	 *            日期
	 * @return date
	 */
	public Date getSeasonEnd(Date date) {
		int month = Integer.parseInt(FormatDate(date, "MM"));
		StringBuffer newDateStr = new StringBuffer();
		newDateStr.append(FormatDate(date, "yyyy"));
		newDateStr.append("-");

		if (month >= 1 && month <= 3) {
			newDateStr.append("03-31");
		} else if (month >= 4 && month <= 6) {
			newDateStr.append("06-30");

		} else if (month >= 7 && month <= 9) {
			newDateStr.append("09-30");

		} else if (month >= 10 && month <= 12) {
			newDateStr.append("12-31");

		}
		return stringToDateShort(newDateStr.toString());
	}

	/**
	 * 取季初时间
	 * 
	 * @param date
	 * @return
	 */
	public Date getSeasonBegin(Date date) {
		int month = Integer.parseInt(FormatDate(date, "MM"));
		StringBuffer newDateStr = new StringBuffer();
		newDateStr.append(FormatDate(date, "yyyy"));
		newDateStr.append("-");
		if (month >= 1 && month <= 3) {
			newDateStr.append("01-01");

		} else if (month >= 4 && month <= 6) {
			newDateStr.append("04-01");

		} else if (month >= 7 && month <= 9) {
			newDateStr.append("07-01");

		} else if (month >= 10 && month <= 12) {
			newDateStr.append("10-01");

		}
		return stringToDateShort(newDateStr.toString());
	}

	/**
	 * 取半年末时间
	 * 
	 * @param date
	 *            时间
	 * @return
	 */
	public Date getHalfYearEnd(Date date) {

		int month = Integer.parseInt(FormatDate(date, "MM"));

		StringBuffer newDateStr = new StringBuffer();
		newDateStr.append(FormatDate(date, "yyyy"));
		if (month >= 1 && month <= 6) {
			newDateStr.append("-6-30");

		} else if (month >= 7 && month <= 12) {
			newDateStr.append("-12-31");

		}
		return stringToDateShort(newDateStr.toString());
	}

	/**
	 * 取年末时间
	 * 
	 * @param date
	 *            时间
	 * @return
	 */
	public Date getYearEnd(Date date) {
		StringBuffer newDateStr = new StringBuffer();
		newDateStr.append(FormatDate(date, "yyyy"));
		newDateStr.append("-12-31");
		return stringToDateShort(newDateStr.toString());
	}

	/**
	 * 取得年初时间
	 * 
	 * @param date
	 * @return
	 */
	public Date getYearBegin(Date date) {
		StringBuffer newDateStr = new StringBuffer();
		newDateStr.append(FormatDate(date, "yyyy"));
		newDateStr.append("-01-01");

		return stringToDateShort(newDateStr.toString());
	}

	/**
	 * 取得日以上粒度起始时间
	 * 
	 * @param granularity
	 *            粒度
	 * @param statisticDate
	 *            结束时间
	 * @return 起始时间
	 */
	public String getBeginDate(String granularity, String statisticDate) {
		String beginDate = "";
		Date date = stringToDateShort(statisticDate);
		Date beginDateTemp = null;
		if (granularity.equals("2")) { // 月
			beginDateTemp = this.getMonthBegin(date);
		} else if (granularity.equals("3")) { // 季
			beginDateTemp = this.getSeasonBegin(date);
		} else if (granularity.equals("4")) { // 年
			beginDateTemp = this.getYearBegin(date);
		}
		beginDate = dateToStringShort(beginDateTemp);
		return beginDate;
	}

	/**
	 * 字符串转换为数据库时间java.sql.Date格式
	 * 
	 * @param dateStr
	 * @return
	 */
	public static java.sql.Date stringToSqlDateShort(String dateStr) {
		java.util.Date javaDate = DateUtils.stringToDateShort(dateStr);
		java.sql.Date d = new java.sql.Date(javaDate.getTime());
		return d;
	}

	/**
	 * 取得当前系统时间（时间格式：yyyy-MM-dd）
	 * 
	 * @return yyyy-MM-dd
	 */
	public static String getCurrShortDateStr() {
		Date date_time = new Date();
		return FormatDate(date_time, "yyyy-MM-dd");
	}

	/**
	 * 取得当前系统时间（时间格式[8位日期]: yyyyMMdd）
	 * 
	 * @return yyyyMMdd
	 */
	public static String getCurrShortDate8Char() {
		String str = getCurrShortDateStr();
		String[] pieces = new String[3];
		pieces = str.split("-");
		return pieces[0] + pieces[1] + pieces[2];
	}

	/**
	 * java时间格式转换为数据库时间格式
	 * 
	 * @param jDate
	 * @return
	 */
	public static java.sql.Date javaDateTosqlDate(java.util.Date jDate) {
		java.sql.Date sDate = new java.sql.Date(jDate.getTime());
		return sDate;
	}

	/**
	 * 数据库时间格式转换为java时间格式
	 * 
	 * @param sDate
	 * @return
	 */
	public static java.util.Date sqlDateTojavaDate(java.sql.Date sDate) {
		java.util.Date jDate = new java.util.Date(sDate.getTime());
		return jDate;
	}

	/**
	 * 8位时间转为10时间
	 * 
	 * @param str
	 * @return
	 */
	public static String getDate8to10(String str) {
		String y = str.substring(0, 4);
		String m = str.substring(4, 6);
		String d = str.substring(6, 8);
		StringBuffer sb = new StringBuffer();
		sb.append(y);
		sb.append("-");
		sb.append(m);
		sb.append("-");
		sb.append(d);

		return sb.toString();
	}

	/**
	 * 根据指定时间，得到days天数之后的日期
	 * 
	 * @param d
	 * @param days
	 * @return
	 */
	public static Date getIncDateTime(java.util.Date d, int days) {
		java.util.Calendar c = java.util.Calendar.getInstance();
		c.setTime(d);
		c.add(Calendar.DATE, days);
		return c.getTime();
	}

	/**
	 * 根据指定时间，得到months天数之后的日期
	 * 
	 * @param d
	 * @param days
	 * @return
	 */
	public static Date getIncDateTimeYear(java.util.Date d, int years) {
		java.util.Calendar c = java.util.Calendar.getInstance();
		c.setTime(d);
		c.add(Calendar.YEAR, years);
		return c.getTime();
	}

	/**
	 * 判断当日是否每周第一天（周日为每周第一天）
	 * 
	 * @return
	 */
	public static boolean isFirstDayOfWeekToday() {
		Date date = DateUtils.getCurrDateTime();
		int year = Integer.parseInt(DateUtils.FormatDate(date, "yyyy"));
		int month = Integer.parseInt(DateUtils.FormatDate(date, "MM"));
		int day = Integer.parseInt(DateUtils.FormatDate(date, "dd"));

		GregorianCalendar calendar = new GregorianCalendar(year, month - 1,
				day, 0, 0, 0);

		if (1 == calendar.get(Calendar.DAY_OF_WEEK)) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 判断date是否每周第一天（周日为每周第一天）
	 * 
	 * @param date
	 * @return
	 */
	public static boolean isFirstDayOfWeek(Date date) {
		int year = Integer.parseInt(DateUtils.FormatDate(date, "yyyy"));
		int month = Integer.parseInt(DateUtils.FormatDate(date, "MM"));
		int day = Integer.parseInt(DateUtils.FormatDate(date, "dd"));

		GregorianCalendar calendar = new GregorianCalendar(year, month - 1,
				day, 0, 0, 0);

		if (1 == calendar.get(Calendar.DAY_OF_WEEK)) {
			return true;
		} else {
			return false;
		}
	}

	public static String dateToMonth(Date date) {
		String sf = "yyyy年MM月dd日 HH:mm";
		if (date != null) {
			return FormatDate(date, sf);
		} else {
			return "";
		}

	}

	/**
	 * 判断date是否每周最后一天（周六为每周最后一天）
	 * 
	 * @param date
	 * @return
	 */
	public static boolean isLastDayOfWeek(Date date) {
		int year = Integer.parseInt(DateUtils.FormatDate(date, "yyyy"));
		int month = Integer.parseInt(DateUtils.FormatDate(date, "MM"));
		int day = Integer.parseInt(DateUtils.FormatDate(date, "dd"));

		GregorianCalendar calendar = new GregorianCalendar(year, month - 1,
				day, 0, 0, 0);

		if (7 == calendar.get(Calendar.DAY_OF_WEEK)) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 比较时间戳，结束时间大于当前时间timeOutLink分钟时超时
	 * 
	 * @param timestamp
	 * @return false 未超时 true 超时
	 */
	public static boolean isExpries(long timestamp) {
		// 获取当前时间
		long now = System.currentTimeMillis();
		JSONObject configXml = XmlUtil.config;
		// 获取配置文件配置
		int linkTimeOut = -1;
		try {
			linkTimeOut = Integer.parseInt(String.valueOf(configXml
					.get("LinkTimeOut")));
		} catch (Exception e) {
			linkTimeOut = -1;
		}
		if (linkTimeOut < 0) {
			return false;
		}

		double time = (now - timestamp) * 1.0 / (60 * 1000);

		if (time > linkTimeOut) {
			return true;
		} else {
			return false;
		}
	}
}
