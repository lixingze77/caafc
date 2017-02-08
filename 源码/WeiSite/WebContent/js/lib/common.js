define(function() {
	// 公共方法
	// 是否为空
	function isEmpty(b) {
		if (b == null) {
			return true;
		}
		// typeof
		// 返回的是字符串，有六种可能："number"、"string"、"boolean"、"object"、"function"、"undefined"
		if (typeof (b) == "string") {
			if ($.trim(b) == "undefined" || $.trim(b) == "") {
				return true;
			}
		} else if (typeof (b) == "object") {
			for ( var name in b) {
				return false;
			}
			return true;
		}

		// if ($.trim(str) == "null") {
		// return false;
		// }
		// if ($.trim(b) == "") {
		// return true;
		// }

		return false;
	}
	;
	// 是否为null
	function isNull(b) {
		if (isEmpty(b))
			return "";
		else
			return b;

	}
	;
	// 时间戳
	function timeStamp() {
		var c = new Date();
		var d = "";
		d = c.getFullYear() + "";
		d = d + (c.getMonth() + 1) + "";
		d = d + c.getDate() + "";
		d = d + c.getHours() + "";
		d = d + c.getMinutes() + "";
		d = d + c.getSeconds() + "";
		return d;
	}
	;
	// 是否手机号
	function isPhone(tel) {
		var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
		if (reg.test(tel)) {
			return true;
		} else {
			return false;
		}
		;
	}
	/*
	 * 验证邮箱格式是否正确 参数strEmail，需要验证的邮箱
	 */
	function isEmail(strEmail) {
		if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(strEmail)) {
			return false;
		} else {
			return true;
		}
	}
	// 判断是否是中文
	function isChinese(d) {
		var c = /[u00-uff]/;
		return !c.test(d);
	}
	;
	// 判断是否是数字或字母
	function isNumOrEn(d) {
		var c = /^[A-Za-z0-9]+$/;
		return c.test(d);
	}
	;
	// 校验是否为(0-10000)的整数
	function isDigit(d) {
		var result = str.match(/^[0-9]$|^([1-9])([0-9]){0,3}$|^10000$/);
		if (result == null)
			return false;
		return true;

	}

	// 匹配中国邮政编码(6位)
	function isPostCode(str) {
		var result = str.match(/[1-9]\d{5}(?!\d)/);
		if (result == null)
			return false;
		return true;
	}
	// 匹配国内电话号码(0511-4405222 或 021-87888822)
	function isTell(str) {
		var result = str.match(/\d{3}-\d{8}|\d{4}-\d{7}/);
		if (result == null)
			return false;
		return true;
	}

	//判断车牌号
	function isCarId(str){
		var resulr=str.match(/(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/);
		if(resulr==null)
			return false;
		return true;
	}
	// 判断是否是金额
	function isMoney(d) {
		var c = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
		return c.test(d);
	}
	;
	// 判断是否是护照号
	function isHuzhao(c) {
		var d = /^[A-Za-z0-9]+$/;
		return d.test(c);
	}
	;
	// 卡片脱敏
	function cardDeal(card) {

		var len = card.length;
		var startStr = card.substring(0, 3);
		var endStr = card.substring(len - 4, len);

		var str = "";
		for (var i = 0; i < len - 7; i++) {
			str += "*";
		}

		return startStr + str + endStr;

	}
	function isCardID(sId) {
		var aCity = {
			11 : "北京",
			12 : "天津",
			13 : "河北",
			14 : "山西",
			15 : "内蒙古",
			21 : "辽宁",
			22 : "吉林",
			23 : "黑龙江",
			31 : "上海",
			32 : "江苏",
			33 : "浙江",
			34 : "安徽",
			35 : "福建",
			36 : "江西",
			37 : "山东",
			41 : "河南",
			42 : "湖北",
			43 : "湖南",
			44 : "广东",
			45 : "广西",
			46 : "海南",
			50 : "重庆",
			51 : "四川",
			52 : "贵州",
			53 : "云南",
			54 : "西藏",
			61 : "陕西",
			62 : "甘肃",
			63 : "青海",
			64 : "宁夏",
			65 : "新疆",
			71 : "台湾",
			81 : "香港",
			82 : "澳门",
			91 : "国外"
		}
		var iSum = 0;
		var info = "";
		if (!/^\d{17}(\d|x)$/i.test(sId))
			return false;
		sId = sId.replace(/x$/i, "a");
		if (aCity[parseInt(sId.substr(0, 2))] == null)
			return false;
		sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-"
				+ Number(sId.substr(12, 2));
		var d = new Date(sBirthday.replace(/-/g, "/"));
		if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d
				.getDate()))
			return false;
		for (var i = 17; i >= 0; i--)
			iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
		if (iSum % 11 != 1)
			return false;
		// aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
		return true;
	}
	function UUID() { // 生成UUID
		this.id = this.createUUID();
	}
	UUID.prototype.valueOf = function() {
		return this.id;
	};
	UUID.prototype.toString = function() {
		return this.id;
	};
	UUID.prototype.createUUID = function() {
		var c = new Date(1582, 10, 15, 0, 0, 0, 0);
		var f = new Date();
		var h = f.getTime() - c.getTime();
		var i = UUID.getIntegerBits(h, 0, 31);
		var g = UUID.getIntegerBits(h, 32, 47);
		var e = UUID.getIntegerBits(h, 48, 59) + "2";
		var b = UUID.getIntegerBits(UUID.rand(4095), 0, 7);
		var d = UUID.getIntegerBits(UUID.rand(4095), 0, 7);
		var a = UUID.getIntegerBits(UUID.rand(8191), 0, 7)
				+ UUID.getIntegerBits(UUID.rand(8191), 8, 15)
				+ UUID.getIntegerBits(UUID.rand(8191), 0, 7)
				+ UUID.getIntegerBits(UUID.rand(8191), 8, 15)
				+ UUID.getIntegerBits(UUID.rand(8191), 0, 15);
		return i + g + e + b + d + a;
	};
	UUID.getIntegerBits = function(f, g, b) {
		var a = UUID.returnBase(f, 16);
		var d = new Array();
		var e = "";
		var c = 0;
		for (c = 0; c < a.length; c++) {
			d.push(a.substring(c, c + 1));
		}
		for (c = Math.floor(g / 4); c <= Math.floor(b / 4); c++) {
			if (!d[c] || d[c] == "") {
				e += "0";
			} else {
				e += d[c];
			}
		}
		return e;
	};
	UUID.returnBase = function(c, d) {
		var e = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B",
				"C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
				"O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ];
		var b = null;
		if (c < d) {
			b = e[c];
		} else {
			var f = "" + Math.floor(c / d);
			var a = c - f * d;
			if (f >= d) {
				b = this.returnBase(f, d) + e[a];
			} else {
				b = e[f] + e[a];
			}
		}
		return b;
	};
	UUID.rand = function(a) {
		return Math.floor(Math.random() * a);
	};

	/**
	 * 事件兼容pc，做测试用的
	 * 
	 * 
	 */
	function IsPC() {
		var userAgentInfo = navigator.userAgent;
		var Agents = [ "Android", "iPhone", "SymbianOS", "Windows Phone",
				"iPad", "iPod" ];
		var flag = true;
		for (var v = 0; v < Agents.length; v++) {
			if (userAgentInfo.indexOf(Agents[v]) > 0) {
				flag = false;
				break;
			}
		}
		return flag;
	}
	;

	var openId = "";
	/**
	 * 基础加载
	 */
	$(function() {

		if (!$("header").hasClass("mui-bar-nav")) {

			$(".mui-content").css("top", "5px");
		}
		// $("#clear_btn").on("tap", function() {
		// $(this).addClass("mui-icon-clear")
		// });
		// 折叠效果
		$(".mui-table-view li").on("tap", function(e) {

			var cls = $(this).attr("className");
			$(".mui-collapse-content").hide();
			$(".mui-table-view li").removeClass("mui-active");
			var num = $(this).index();
			var conentHeight = $(".mui-content").height();
			if (cls.indexOf("mui-collapse") > -1) {
				$(".mui-collapse-content").each(function(i) {
					if (num == i) {
						$(this).show();

					}
				});
				// console.log("展开后的高度：" +
				// $(".mui-content").offset().height);

				$(this).addClass("mui-active");
				// $(".mui-content").css("height",
				// conentHeight + $(this).height() + "px");
				// console.log($(".scroller").css("padding-bottom"))
				$('.mui-content').iScroll('refresh');
			}

			if (cls.indexOf("mui-active") > -1) {
				$(".mui-collapse-content").each(function(i) {
					if (num == i) {
						$(this).hide();
					}
				});
				$(this).removeClass("mui-active");
				// $(".mui-content").css("height", conentHeight + "px");
				$('.mui-content').iScroll('refresh');

			}

		});

		$(".mui-collapse-content").on("tap", function(e) {
			// e.preventDefault();// 取消事件的默认动作
			e.stopPropagation(); // 阻止冒泡事件
		})
		// input 处理

		// 输入
		$('input')
				.each(
						function() {
							$(this).on("tap", function(e) {
								// e.preventDefault();
								e.stopPropagation();
							});
							var actionClass = $(this).attr("className");
							var actiontype = $(this).attr("type");
							var inputEl = $(this);

							if (actiontype == "range") {

								var tooltip = $('<span class="mui-tooltip mui-hidden"></span>');
								tooltip.appendTo($(this.parentNode))
								$(this)
										.on(
												"change",
												function() {
													var val = $(this).val();
													var offsetLeft = $(this)
															.offset().left;
													var width = $(this)
															.offset().width - 30;
													var tooltipWidth = tooltip
															.offset().width;
													var max = $(this).attr(
															"max");
													var min = $(this).attr(
															"min");

													var distince = Math.abs(max
															- min);
													var scaleWidth = Math
															.abs(val)
															/ distince * width;
													tooltip
															.css(
																	"left",
																	(offsetLeft
																			+ scaleWidth
																			- tooltipWidth
																			/ 2 - 18)
																			+ 'px')
													tooltip.html(val);
													tooltip
															.removeClass("mui-hidden");

													setTimeout(
															function() {
																tooltip
																		.addClass("mui-hidden");

															}, 500)
												})

							}
							if (actionClass == "mui-input-clear") {

								if (actiontype == "text") {
									$(this)
											.bind(
													'input propertychange',
													function() {
														if (actionClass == "mui-input-clear"
																&& actiontype == "text") {
															var actionIcon = "";

															if (inputEl.val() == 0) {
																$(
																		'.mui-icon-clear')
																		.remove();
																return;
															}
															var parentNodeHtml = $(
																	this.parentNode)
																	.html();

															if (!(parentNodeHtml
																	.indexOf('mui-icon mui-icon-clear') > -1))
																actionIcon = '<span class="mui-icon mui-icon-clear"></span>';
															$(this).after(
																	actionIcon);

															$('.mui-icon-clear')
																	.on(
																			'tap',
																			function() {
																				inputEl
																						.val('');
																				$(
																						'.mui-icon-clear')
																						.remove();
																			});
														}
													});

								}

								if (actiontype == "search") {
									var placeholder = $(this).attr(
											"placeholder");
									$(this).attr("placeholder", '');
									var icons = [];
									icons
											.push('<span class="mui-placeholder">');
									icons
											.push('<span class="mui-icon mui-icon-search"></span>');
									icons.push(placeholder);
									icons.push('</span>');
									$(this).after(icons.join(""));

								}
							}
							if (actionClass == "mui-input-speech mui-input-clear") {
								var placeholder = $(this).attr("placeholder");
								$(this).attr("placeholder", '');
								var icons = [];

								icons
										.push('<span class="mui-icon mui-icon-clear mui-hidden"></span>');
								icons
										.push('<span class="mui-icon mui-icon-speech"></span>');
								if (actiontype == "search") { // d带语音查询
									icons
											.push('<span class="mui-placeholder">');
									icons
											.push('<span class="mui-icon mui-icon-search"></span>');
									icons.push(placeholder);
									icons.push('</span>');

								}
								$(this).after(icons.join(""));
							}

						})

		// 设置开关
		$('.mui-content .mui-switch').each(function() { // 循环所有toggle

			$(this).on("tap swipeLeft swipeRight", function(e) {
				if ($(this).attr("auto") == "false") {
					return;
				} else {
					var _cls = $(this).attr("className");
					switch (e.type) {
					case 'swipeLeft':
						$(this).removeClass("mui-active");
						// e.preventDefault();
						e.stopPropagation();
					case 'swipeRight':
						$(this).addClass("mui-active");
						// e.preventDefault();
						e.stopPropagation();
					default:
						if ($(this).hasClass("mui-active")) {

							$(this).removeClass("mui-active");
						} else
							$(this).addClass("mui-active");
						// e.preventDefault();
						e.stopPropagation();

					}
				}
			});

		});
		// 按钮高亮
		$(".mui-btn").highlight("mui-active");
		// $(".mui-table-view li").highlight("mui-active");
		// 工具条
		$(".mui-action-back").on("tap", function() {

			history.back();
		});
		// tab
		$(".mui-tab-item").on("tap", function() {
			$(".mui-tab-item").removeClass("mui-active");
			$(this).addClass("mui-active");
			$(".mui-control-content").removeClass("mui-active");
			var tabid = $(this).attr("data-tab");
			$("#" + tabid).addClass("mui-active");

		});

	});
	var modulus = 'a1ffec4d11fa69d2f3b2f50434f919547b1b89e6b964eef663d8947c489344c7f7593384dd8bbedc45934e9c9ba153fd7ceb329f6ad4325a548d0bc5f25544260157c4b09d7d22610466566a6915064d7f6314f06c9b29e3fc478d2295c361afb2147cb7390985ea66afb7d69a9532a91e8cdebd7beae49ac560a83002f9e7e3', exponent = '10001';
	/**
	 * 统一向服务器发送数据
	 * 
	 * opts提交参数 Object
	 */
	var dataSub = function(opts) {
		var $opts = {
			url : null,
			type : 'post',
			isEncrypt : true,
			timeout : 0,
			data : null,
			dataType : 'json',
			success : null,
			netTimeOut : "网络超时，请检查您的网络连接",
			error : null,
			complete : null
		}, success, error;
		for (i in opts)
			$opts[i] = opts[i];
		success = $opts.success;
		error = $opts.error;
		complete = $opts.complete;

		if ($opts.isEncrypt && $opts.data != null) {
			var aesKey = get24Key();

			var rsa_keypair = new RSAKeyPair(exponent, "", modulus);

			var key = encryptedString(rsa_keypair, encodeURIComponent(aesKey));

			var param = $
					.AESEncrypt(JSON.stringify($opts.data), aesKey, aesKey);
			$opts.data = {};
			$opts.data.param = encodeURIComponent(param);
			$opts.data.key = key;
		} else {
			// var param = JSON.stringify($opts.data);
			// $opts.data = {};
			// $opts.data.param = param;
			// $opts.data.key = "";
		}

		if (!isEmpty($opts.url)) {
			var type = $opts.type;
			var dataType = $opts.dataType;

			if (!isEmpty(dataType))
				dataType = dataType.toLowerCase();
			if (!isEmpty(type))
				type = type.toLowerCase();
			$.ajax({
				url : $opts.url,
				type : type,
				data : $opts.data,
				timeout : $opts.timeout,
				dataType : dataType,
				success : function(data, status, xhr) {
					if ($.isFunction(success)) {
						success(data, status, xhr);
					}

				},
				error : function(xhr, errorType, e) {
					if ($.isFunction(error)) {
						if (xhr.status == 0)
							$.toast($opts.netTimeOut);
						error(xhr, errorType, e);
					}

				},
				complete : function(xhr, status) {
					if ($.isFunction(complete)) {
						complete(xhr, status);
					}

				}
			})
		}

	};

	function get24Key() {
		var toforkey = "";
		var e = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B",
				"C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
				"O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ];
		for (var i = 0; i < 16; i++) {
			var num = Math.ceil(Math.random() * 36);
			toforkey = toforkey + (e[num - 1]);
		}
		return toforkey;
	}
	;

	/**
	 * 加密数据
	 * 
	 * @param {type}
	 *            data 待加密的字符串
	 * @param {type}
	 *            keyStr 秘钥
	 * @param {type}
	 *            ivStr 向量
	 * @returns {unresolved} 加密后的数据
	 */
	$.AESEncrypt = function(data, keyStr, ivStr) {
		var sendData = CryptoJS.enc.Utf8.parse(data);
		var key = CryptoJS.enc.Utf8.parse(keyStr);
		var iv = CryptoJS.enc.Utf8.parse(ivStr);
		var encrypted = CryptoJS.AES.encrypt(sendData, key, {
			iv : iv,
			mode : CryptoJS.mode.CBC,
			padding : CryptoJS.pad.Iso10126
		});
		// return
		// CryptoJS.enc.Base64.stringify(encrypted.toString(CryptoJS.enc.Utf8));
		return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
	};

	/**
	 * 
	 * @param {type}
	 *            data BASE64的数据
	 * @param {type}
	 *            key 解密秘钥
	 * @param {type}
	 *            iv 向量
	 * @returns {undefined}
	 */
	$.AESDecrypt = function(data, keyStr, ivStr) {
		var key = CryptoJS.enc.Utf8.parse(keyStr);
		var iv = CryptoJS.enc.Utf8.parse(ivStr);
		// 解密的是基于BASE64的数据，此处data是BASE64数据
		var decrypted = CryptoJS.AES.decrypt(data, key, {
			iv : iv,
			mode : CryptoJS.mode.CBC,
			padding : CryptoJS.pad.Iso10126
		});
		return decrypted.toString(CryptoJS.enc.Utf8);
	};
	function unhtml(str, reg) {
		return str ? str.replace(
				reg || /[&<">'](?:(amp|lt|quot|gt|#39|nbsp);)?/g,
				function(a, b) {
					if (b) {
						return a;
					} else {
						return {
							'<' : '&lt;',
							'&' : '&amp;',
							'"' : '&quot;',
							'>' : '&gt;',
							"'" : '&#39;'
						}[a]
					}

				}) : '';
	}
	// 将str中的转义字符还原成html字符
	function html(str) {
		return str ? str.replace(/&((g|l|quo)t|amp|#39);/g, function(m) {
			return {
				'&lt;' : '<',
				'&amp;' : '&',
				'&quot;' : '"',
				'&gt;' : '>',
				'&#39;' : "'"
			}[m]
		}) : '';
	} // 扩展Date的format方法
	function dateformat(date, format) {
		var o = {
			"M+" : date.getMonth() + 1,
			"d+" : date.getDate(),
			"h+" : date.getHours(),
			"m+" : date.getMinutes(),
			"s+" : date.getSeconds(),
			"q+" : Math.floor((date.getMonth() + 3) / 3),
			"S" : date.getMilliseconds()
		}
		if (/(y+)/.test(format)) {
			format = format.replace(RegExp.$1, (date.getFullYear() + "")
					.substr(4 - RegExp.$1.length));
		}
		for ( var k in o) {
			if (new RegExp("(" + k + ")").test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
						: ("00" + o[k]).substr(("" + o[k]).length));
			}
		}
		return format;

	}
	/**
	 * 转换日期对象为日期字符串
	 * 
	 * @param date
	 *            日期对象
	 * @param isFull
	 *            是否为完整的日期数据, 为true时, 格式如"2000-03-05 01:05:04" 为false时, 格式如
	 *            "2000-03-05"
	 * @return 符合要求的日期字符串
	 */
	function getSmpFormatDate(date, isFull) {
		var pattern = "";
		if (isFull == true || isFull == undefined) {
			pattern = "yyyy-MM-dd hh:mm:ss";
		} else {
			pattern = "yyyy-MM-dd";
		}
		return getFormatDate(date, pattern);
	}
	/**
	 * 转换当前日期对象为日期字符串
	 * 
	 * @param date
	 *            日期对象
	 * @param isFull
	 *            是否为完整的日期数据, 为true时, 格式如"2000-03-05 01:05:04" 为false时, 格式如
	 *            "2000-03-05"
	 * @return 符合要求的日期字符串
	 */
	function getSmpFormatNowDate(isFull) {
		return getSmpFormatDate(new Date(), isFull);
	}
	/**
	 * 转换long值为日期字符串
	 * 
	 * @param l
	 *            long值
	 * @param isFull
	 *            是否为完整的日期数据, 为true时, 格式如"2000-03-05 01:05:04" 为false时, 格式如
	 *            "2000-03-05"
	 * @return 符合要求的日期字符串
	 */
	function getSmpFormatDateByLong(l, isFull) {
		return getSmpFormatDate(new Date(l), isFull);
	}
	/**
	 * 转换long值为日期字符串
	 * 
	 * @param l
	 *            long值
	 * @param pattern
	 *            格式字符串,例如：yyyy-MM-dd hh:mm:ss
	 * @return 符合要求的日期字符串
	 */
	function getFormatDateByLong(l, pattern) {
		return getFormatDate(new Date(l), pattern);
	}
	/**
	 * 转换日期对象为日期字符串
	 * 
	 * @param l
	 *            long值
	 * @param pattern
	 *            格式字符串,例如：yyyy-MM-dd hh:mm:ss
	 * @return 符合要求的日期字符串
	 */
	function getFormatDate(date, pattern) {
		if (date == undefined) {
			date = new Date();
		}
		if (pattern == undefined) {
			pattern = "yyyy-MM-dd hh:mm:ss";
		}
		return dateformat(date, pattern);
	}
	// 检查网络状态
	function isNetworkAlive() {
		if (navigator.onLine) {
			return true;
		} else {
			return false;
		}
	}
	$(window).on("online", function() {
		console.log("在线")
	});
	$(window).on("offline", function() {
		$.toast("网络已断开，请连接网络");
	});
	return {
		isNetworkAlive : isNetworkAlive,
		isCardID : isCardID,
		isEmpty : isEmpty,
		isNull : isNull,
		timeStamp : timeStamp,
		isChinese : isChinese,
		isPostCode : isPostCode,
		isTell : isTell,
		isNumOrEn : isNumOrEn,
		isDigit : isDigit,
		isMoney : isMoney,
		isHuzhao : isHuzhao,
		isCarId : isCarId,
		cardDeal : cardDeal,
		UUID : UUID,
		isPC : IsPC,
		isPhone : isPhone,
		isEmail : isEmail,
		submit : dataSub,
		unhtml : unhtml,
		html : html,
		getSmpFormatDate : getSmpFormatDate,
		getSmpFormatNowDate : getSmpFormatNowDate,
		getSmpFormatDateByLong : getSmpFormatDateByLong,
		getFormatDateByLong : getFormatDateByLong,
		getFormatDate : getFormatDate
	}
})