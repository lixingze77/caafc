// var common = require("common");

(function($) {
	/*
	 * 插入字符
	 */
	$.fn.insertAtCaret = function(myValue) {
		var $t = $(this)[0];
		$t.focus();
		var selection = window.getSelection
				? window.getSelection()
				: document.selection, range = selection.createRange ? selection
				.createRange() : selection.getRangeAt(0);
		// console.log(range)
		var browserName = navigator.userAgent.toLowerCase();
		var strBrowser = "";
		if (/msie/i.test(browserName) && !/opera/.test(browserName)) {
			strBrowser = "IE: " + browserName.match(/msie ([\d.]+)/)[1];
		}
		var browser = strBrowser.split(":");
		var IEbrowser = strBrowser.split(":")[0];
		var IEverson = Number(strBrowser.split(":")[1]);
		if (IEbrowser == "IE" && IEverson < 9) {

			range.pasteHTML(html);

		} else {
			var node = document.createElement('span');

			node.innerHTML = myValue;

			range.insertNode(node);
			selection.addRange(range);
		}
	}

	// // 事件兼容pc，做测试用的
	// (function() {
	// var pcDebug = true; //
	// if (common.isPc && pcDebug) {
	// var $onFn = $.fn.on, $offFn = $.fn.off, transEvent = {
	// touchstart : 'mousedown',
	// touchend : 'mouseup',
	// touchmove : 'mousemove',
	// tap : 'click',
	// swipeLeft : 'mousemove',
	// swipeRight : 'mousemove'
	//
	// }, transFn = function(e) {
	// // alert(e)
	// var events, org, event;
	// // if ($.isObject(e)) {
	// // org = e;
	// // $.each(e, function(key) {
	// // event = parse(key);
	// // !$.support.touch
	// // && transEvent[event.e]
	// // && (org[transEvent[event.e] + event.ns] = this);
	// // });
	// // return org;
	// // } else {
	// events = [];
	// $.each((e || '').split(' '), function(i, type) {
	// event = parse(type);
	// events.push(!$.support.touch && transEvent[event.e]
	// ? transEvent[event.e] + event.ns
	// : type);
	// });
	// return events.join(' ');
	// // }
	// }, parse = function(event) {
	// var idx = event.indexOf('.'), e, ns;
	// if (idx > -1) {
	// e = event.substr(0, idx);
	// ns = event.substr(idx);
	// } else {
	// e = event;
	// ns = '';
	// }
	// return {
	// e : e,
	// ns : ns
	// };
	// };
	//
	// $.extend($.fn, {
	// on : function(event, selector, callback) {
	// return $onFn.call(this, transFn(event), selector, callback);
	// },
	// off : function(event, selector, callback) {
	// return $offFn
	// .call(this, transFn(event), selector, callback);
	// }
	// });
	// }
	// })();

})(jQuery);

/**
 * 弹出框组件
 * 
 */

(function($) {

	var $Dialog;
	$.Dialog = function(opt) {
		var setting = {

			title : null,

			content : null,
			align : "left",
			container : null,
			type : "alert"// confirm alert
			,
			submitName : "确定",
			cancelName : "取消",
			submit : undefined,
			cancel : undefined,
			load : undefined
		};
		$Dialog = this;

		var _opts = setting;

		for (var key in _opts) {
			if (typeof opt[key] != "undefined")
				_opts[key] = opt[key];
		}
		$Dialog.options = _opts;

		var dialogDom = [];
		dialog._init();
	};

	var dialog = {
		_init : function(e) {
			var _opt = $Dialog.options;
			this._create();

			var fn = _opt.load;
			if (!fn)
				this.open();
			else
				fn.apply(dialog, arguments);

		},
		_create : function() {
			var i = 0, content, title, _opt = $Dialog.options;

			var container = $(_opt.container || document.body); // 创建容器

			var _wrap = [];
			_wrap.push('<div class="mui_dialog_' + _opt.type
					+ '"  style="display: none;">');

			_wrap.push('<div class="mui_mask"></div>');
			_wrap.push('<div class="mui_dialog">');
			_wrap.push(' <div class="mui_dialog_hd">');
			if (_opt.title) {
				var title = _opt.title !== undefined;
				if (title) {
					_wrap.push('<strong class="mui_dialog_title">');

					_wrap.push(_opt.title);
					_wrap.push('</strong>');

				}
			}
			_wrap.push('</div>');

			if (_opt.content) {
				var val = _opt.content !== undefined;
				if (val) {
					_wrap.push(' <div class="mui_dialog_bd" align="'
							+ _opt.align + '">');

					_wrap.push(_opt.content);
					_wrap.push('</div>');

				}
			}
			_wrap.push('<div class="mui_dialog_ft">');

			if (_opt.type == "alert") {
				_wrap
						.push('<a href="javascript:;" class="mui_btn_dialog primary">'
								+ _opt.submitName + '</a>');
			}
			if (_opt.type == "confirm") {
				_wrap
						.push('<a href="javascript:;" class="mui_btn_dialog default">'
								+ _opt.cancelName + '</a>');
				_wrap
						.push('<a href="javascript:;" class="mui_btn_dialog primary">'
								+ _opt.submitName + '</a>');
			}

			_wrap.push('</div>');

			_wrap.push('</div>');
			_wrap.push('</div>');
			$Dialog.wrap = $(_wrap.join("")).appendTo(container);
			$(".mui_dialog_bd").css("text-align", _opt.align);

		},
		_eventHander : function(e) {
			var opts = $Dialog.options, fn;

			var cls = $(e.target).attr("class");

			if (cls.indexOf("primary") > -1) {

				fn = opts.submit;
			}
			if (cls.indexOf("default") > -1) {
				fn = opts.cancel;
			}
			fn && fn.apply(dialog, arguments);
		},
		open : function(x, y) {
			var opts = $Dialog.options;

			$Dialog.wrap.css('display', 'block');
			// tap触发事件响应时间太短会触发多次事件，改用click 代替。click响应时间比tap长
			$(".mui_btn_dialog").on('click', this._eventHander);
		},
		close : function() {
			var eventData, opts = $Dialog.options;

			$Dialog.wrap.css('display', 'none');

			this.destroy();

		},
		/**
		 * @desc 销毁组件。
		 * @name destroy
		 */
		destroy : function() {
			var opts = $Dialog.options;
			$(".mui_btn_dialog").off('click', this._eventHander);
			$Dialog.wrap.remove();
		}
	};

	/**
	 * 自动消失提示框
	 */
	/*
	 * $.toast = function(message, time) { time = time == null ? 2000 : time;
	 * var toast = $("<div><div>"); toast.addClass('mui-toast-container');
	 * toast.html('<div class="mui-toast-message">' + message + '</div>');
	 * toast.appendTo($("body")); setTimeout(function() { toast.remove(); },
	 * time); };
	 */
	/**
	 * 自动消失提示框
	 */
	$.toast = function(message, time) {

		time = time == null ? 2000 : time;
		var toast_mask = $("<div class='mui_mask_transparent'><div>");
		toast_mask.appendTo($("body"));
		var toast = $('<div class="mui-toast-message">' + message + '</div>');
		toast.appendTo($("body"));
		setTimeout(function() {
					toast_mask.remove();
					toast.remove();
				}, time);
	};

	/*
	 * 判断浏览器
	 */
	function detect(ua) {
		var os = this.os = {}, browser = this.browser = {}, webkit = ua
				.match(/WebKit\/([\d.]+)/), android = ua
				.match(/(Android)\s+([\d.]+)/), ipad = ua
				.match(/(iPad).*OS\s([\d_]+)/), iphone = !ipad
				&& ua.match(/(iPhone\sOS)\s([\d_]+)/), webos = ua
				.match(/(webOS|hpwOS)[\s\/]([\d.]+)/), touchpad = webos
				&& ua.match(/TouchPad/), kindle = ua.match(/Kindle\/([\d.]+)/), silk = ua
				.match(/Silk\/([\d._]+)/), blackberry = ua
				.match(/(BlackBerry).*Version\/([\d.]+)/), bb10 = ua
				.match(/(BB10).*Version\/([\d.]+)/), rimtabletos = ua
				.match(/(RIM\sTablet\sOS)\s([\d.]+)/), playbook = ua
				.match(/PlayBook/), chrome = ua.match(/Chrome\/([\d.]+)/)
				|| ua.match(/CriOS\/([\d.]+)/), firefox = ua
				.match(/Firefox\/([\d.]+)/)

		// Todo: clean this up with a better OS/browser seperation:
		// - discern (more) between multiple browsers on android
		// - decide if kindle fire in silk mode is android or not
		// - Firefox on Android doesn't specify the Android version
		// - possibly devide in os, device and browser hashes

		if (browser.webkit = !!webkit)
			browser.version = webkit[1]

		if (android)
			os.android = true, os.version = android[2]
		if (iphone)
			os.ios = os.iphone = true, os.version = iphone[2]
					.replace(/_/g, '.')
		if (ipad)
			os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.')
		if (webos)
			os.webos = true, os.version = webos[2]
		if (touchpad)
			os.touchpad = true
		if (blackberry)
			os.blackberry = true, os.version = blackberry[2]
		if (bb10)
			os.bb10 = true, os.version = bb10[2]
		if (rimtabletos)
			os.rimtabletos = true, os.version = rimtabletos[2]
		if (playbook)
			browser.playbook = true
		if (kindle)
			os.kindle = true, os.version = kindle[1]
		if (silk)
			browser.silk = true, browser.version = silk[1]
		if (!silk && os.android && ua.match(/Kindle Fire/))
			browser.silk = true
		if (chrome)
			browser.chrome = true, browser.version = chrome[1]
		if (firefox)
			browser.firefox = true, browser.version = firefox[1]

		os.tablet = !!(ipad || playbook || (android && !ua.match(/Mobile/)) || (firefox && ua
				.match(/Tablet/)))
		os.phone = !!(!os.tablet && (android || iphone || webos || blackberry
				|| bb10 || (chrome && ua.match(/Android/))
				|| (chrome && ua.match(/CriOS\/([\d.]+)/)) || (firefox && ua
				.match(/Mobile/))))
	}

	detect.call($, navigator.userAgent)
	// make available to unit tests
	$.__detect = detect
	/**
	 * 等待提示框
	 */
	$.loading = function(messge, time) {
		var container = $(document.body); // 创建容器

		time = time == null ? '' : time;
		messge = messge == null ? '数据加载中' : messge;

		var loadArr = [];
		loadArr.push('<div  class="mui_loading_toast" >');
		loadArr.push(' <div class="mui_mask_transparent"></div>');
		loadArr.push('<div class="mui_toast">');

		loadArr.push(' <div class="mui_loading">');
		loadArr.push('<div class="mui_loading_leaf mui_loading_leaf_0"></div>');
		loadArr.push('<div class="mui_loading_leaf mui_loading_leaf_1"></div>');
		loadArr.push('<div class="mui_loading_leaf mui_loading_leaf_2"></div>');
		loadArr.push('<div class="mui_loading_leaf mui_loading_leaf_3"></div>');
		loadArr.push('<div class="mui_loading_leaf mui_loading_leaf_4"></div>');
		loadArr.push('<div class="mui_loading_leaf mui_loading_leaf_5"></div>');
		loadArr.push('<div class="mui_loading_leaf mui_loading_leaf_6"></div>');
		loadArr.push('<div class="mui_loading_leaf mui_loading_leaf_7"></div>');
		loadArr.push('<div class="mui_loading_leaf mui_loading_leaf_8"></div>');
		loadArr.push('<div class="mui_loading_leaf mui_loading_leaf_9"></div>');
		loadArr
				.push('<div class="mui_loading_leaf mui_loading_leaf_10"></div>');
		loadArr
				.push('<div class="mui_loading_leaf mui_loading_leaf_11"></div>');

		loadArr.push('</div>');

		loadArr.push(' <p class="mui_toast_content">' + messge + '</p>');
		loadArr.push('</div>');
		loadArr.push('</div>');

		container.append(loadArr.join(''));
		var page_height = document.body.scrollHeight; // 页面尺寸，IE下获取结果不正确
		var page_width = document.body.scrollWidth; // 页面尺寸，IE下获取结果不正确
		if (page_height < $(window).height()) {
			page_height = $(window).height(); // 屏幕可见尺寸
		}
		if (page_width < $(window).width()) {
			page_width = $(window).width();
		}

		var root = document.body, round = Math.round, loadContainer = $(".mui_loading_toast");

		var $win = $(window);

		var action = function() {
			// loadContainer.css(mask);
			// loadbox.css(wrap);
		}

		if ($.os.ios
				&& document.activeElement
				&& /input|textarea|select/i
						.test(document.activeElement.tagName)) {

			document.body.scrollLeft = 0;
			setTimeout(action, 200); // do it later in 200ms.

		} else {
			action(); // do it now
		}

		if (time != '') {
			setTimeout(function() {
						loadContainer.remove();
					}, time);
		}
	};

	$.loadclose = function() {
		var loadmask = $(".mui_loading_toast");
		loadmask.remove();
	}

	/**
	 * @file 实现了通用highlight方法。
	 * @name Highlight
	 * @desc 点击高亮效果
	 * @import jQuery.js
	 */

	var $doc = $(document), $el, // 当前按下的元素
	timer; // 考虑到滚动操作时不能高亮，所以用到了100ms延时

	// 负责移除className.
	function dismiss() {
		if ($el != null) {
			var cls = $el.attr('hl-cls');
			clearTimeout(timer);
			$el.removeClass(cls).removeAttr('hl-cls');
			$el = null;
			$doc.off('touchend touchmove touchcancel', dismiss);
		}
	}

	/**
	 * @name highlight
	 * @desc 禁用掉系统的高亮，当手指移动到元素上时添加指定class，手指移开时，移除该class.
	 *       当不传入className是，此操作将解除事件绑定。
	 * @grammar highlight(className ) ⇒ self
	 * @grammar highlight() ⇒ self
	 * 
	 */
	$.fn.highlight = function(className) {

		return this.each(function() {
					var $this = $(this);
					$this.off('tap');
					// $this.css('background',
					// '#ddd').off('touchstart.hl
					// click');

					className && $this.on('touchstart', function(e) {

								$el = $(this);
								// selctor可能找不到元素。

								if ($el) {
									$el.attr('hl-cls', className);

									timer = setTimeout(function() {
												if ($el != null) {
													$el.addClass(className);
												}
											}, 100);
									$doc.on('touchend touchmove touchcancel',
											dismiss);

								}
							});
				});
	};

	/**
	 * @file
	 * @name getQueryString
	 * @desc 实现获取链接参数
	 * @import jQuery.js
	 */

	$.getQueryString = function(name) {
		var now_url = document.location.search.slice(1), q_array = now_url
				.split('&');
		for (var i = 0; i < q_array.length; i++) {
			var v_array = q_array[i].split('=');
			if (v_array[0] == name) {
				return v_array[1];
			}
		}
		return "";
	};

	/**
	 * Cookie plugin
	 * 
	 * Copyright (c) 2006 Klaus Hartl (stilbuero.de) Dual licensed under the MIT
	 * and GPL licenses: http://www.opensource.org/licenses/mit-license.php
	 * http://www.gnu.org/licenses/gpl.html
	 * 
	 */

	/**
	 * Create a cookie with the given name and value and other optional
	 * parameters.
	 * 
	 * @example
	 * $.cookie('the_cookie', 'the_value');
	 * @desc Set the value of a cookie.
	 *       @example
	 *       $.cookie('the_cookie', 'the_value', {expires: 7, path: '/', domain: 'jquery.com', secure: true});
	 * @desc Create a cookie with all available options.
	 *       @example
	 *       $.cookie('the_cookie', 'the_value');
	 * @desc Create a session cookie.
	 *       @example
	 *       $.cookie('the_cookie', null);
	 * @desc Delete a cookie by passing null as value.
	 * 
	 * @param String
	 *            name The name of the cookie.
	 * @param String
	 *            value The value of the cookie.
	 * @param Object
	 *            options An object literal containing key/value pairs to
	 *            provide optional cookie attributes.
	 * @option Number|Date expires Either an integer specifying the expiration
	 *         date from now on in days or a Date object. If a negative value is
	 *         specified (e.g. a date in the past), the cookie will be deleted.
	 *         If set to null or omitted, the cookie will be a session cookie
	 *         and will not be retained when the the browser exits.
	 * @option String path The value of the path atribute of the cookie
	 *         (default: path of page that created the cookie).
	 * @option String domain The value of the domain attribute of the cookie
	 *         (default: domain of page that created the cookie).
	 * @option Boolean secure If true, the secure attribute of the cookie will
	 *         be set and the cookie transmission will require a secure protocol
	 *         (like HTTPS).
	 * @type undefined
	 * 
	 * @name $.cookie
	 * @cat Plugins/Cookie
	 * @author Klaus Hartl/klaus.hartl@stilbuero.de
	 */

	/**
	 * Get the value of a cookie with the given name.
	 * 
	 * @example
	 * $.cookie('the_cookie');
	 * @desc Get the value of a cookie.
	 * 
	 * @param String
	 *            name The name of the cookie.
	 * @return The value of the cookie.
	 * @type String
	 * 
	 * @name $.cookie
	 * @cat Plugins/Cookie
	 * @author Klaus Hartl/klaus.hartl@stilbuero.de
	 */

	$.cookie = function(name, value, options) {
		if (typeof value != 'undefined') { // name and value given, set
			// cookie
			options = options || {};
			if (value === null) {
				value = '';
				options.expires = -1;
			}
			var expires = '';
			if (options.expires
					&& (typeof options.expires == 'number' || options.expires.toUTCString)) {
				var date;
				if (typeof options.expires == 'number') {
					date = new Date();
					date.setTime(date.getTime() + (options.expires * 1000));
				} else {
					date = options.expires;
				}

				expires = '; expires=' + date.toUTCString(); // use
				// expires
				// attribute,
				// max-age is not
				// supported by IE
			}
			var path = options.path ? '; path=' + options.path : '';
			var domain = options.domain ? '; domain=' + options.domain : '';
			var secure = options.secure ? '; secure' : '';
			document.cookie = [name, '=', encodeURIComponent(value), expires,
					path, domain, secure].join('');
		} else { // only name given, get cookie
			var cookieValue = null;
			if (document.cookie && document.cookie != '') {
				var cookies = document.cookie.split(';');
				for (var i = 0; i < cookies.length; i++) {
					var cookie = $.trim(cookies[i]);
					// Does this cookie string begin with the name we want?
					if (cookie.substring(0, name.length + 1) == (name + '=')) {
						cookieValue = decodeURIComponent(cookie
								.substring(name.length + 1));
						break;
					}
				}
			}
			return cookieValue;
		}
	};
})(jQuery);