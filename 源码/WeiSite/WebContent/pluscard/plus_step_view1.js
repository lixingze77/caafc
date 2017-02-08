define([ 'text!../pluscard/plus_step1.html', "iscroll",
		'../pluscard/plus_step_view2' ], function(tpl, iscroll, View) {
	var scroll;

	var indexView = Backbone.View.extend({
		el : '#container',

		events : {
			"tap  #treaty" : "treatyClick",
			"tap  #nextstep" : "stepClick",
			"tap .mui-action-back" : "backClick",
			"tap #btn_code" : "codeClick",
			"tap #view_text" : "textClick",
			"tap #close" : "closeTextClick"

		},

		initialize : function(param) {
		
			this.nextView = new View({
				model : this.model

			});
			this.nextView.on('back', this.init, this);
			this.model.on('next', this.nextStep, this); // 监听事件，当
		},
		init : function() {
			this.delegateEvents();
			this.render();
		},
		template : _.template(tpl),
		render : function() {
 			var $tpl = $(this.template());
 			 
			this.$el.html($tpl);
			// animInfinite
			// q启动滚动条
			scroll = new IScroll('#plus_step1', {
				fadeScrollbars : false,
				click : true
			// 允许点击
			});
			$(window).trigger('resize');
			document.addEventListener('touchmove', function(e) {
				e.preventDefault();
			}, false);
			var $this = this;
			var o = this.model;
			$("#name").val(o.get("apName"));
			$("#code").val(o.get("recommentCode"));
			$("#msgCode").val(o.get("msgCode"));
			$("#cardid").val(o.get("apIdNbr"));
			$.loadclose();
		},
		treatyClick : function(e) {
			var rowel = $(e.currentTarget).parent();
			var $thisel = $(e.currentTarget);

			if (rowel.hasClass("mui-checked")) {
				rowel.removeClass("mui-checked");
				$thisel.removeAttr("checked")
			} else {
				rowel.addClass("mui-checked");
				$thisel.attr("checked", "checked");
			}
		},
		stepClick : function(e) {
			// 数据提交
			var $this = this;
			var o = this.model;
			o.set("apName", $.trim($("#name").val()));
			o.set("name", $.trim($("#name").val()));

			o.set("apIdNbr", $.trim($("#cardid").val()));
			o.set("id", $.trim($("#cardid").val()));

			o.set("apMobile", $.trim($("#phone").val()));
			o.set("msgCode", $.trim($("#msgCode").val()));
			o.set("recommentCode", $.trim($("#code").val()));
			o.set("checkbox", $.trim($("#treaty").parent().hasClass(
					"mui-checked")));

			// // dosome
			if (this.model.nextVail()) {// 数据校验

				this.model.cardQuery();

			}
		},
		nextStep : function() {
			this.timeCount = 20;
			this.msgCodeFlag = true;
			clearTimeout(this.timer);
			this && this.undelegateEvents();// 销毁所有监听

			this.nextView.render(); // 跳转至下一步页面
			this.nextView.delegateEvents();
		},
		backClick : function() {
			this.timeCount = 20;
			this.msgCodeFlag = true;
			clearTimeout(this.timer);
			location.hash = "#home";

		},
		textClick : function() {
			$(".hf-text-mask").show();
			$(".hf-text-box").show();
			$("#plus_step1").hide();
			$("header").hide();

			var textScroll = new IScroll('#hf-text', {
				fadeScrollbars : false,
				click : true
			// 允许点击
			});
		},
		closeTextClick : function() {
			$(".hf-text-mask").hide();
			$(".hf-text-box").hide();
			$("#plus_step1").show();
			$("header").show();
		},
		timeCount : 20,
		msgCodeFlag : true,
		timeCode : function() {

			var $this = this;
			$this.msgCodeFlag = false;
			if ($this.timeCount > 0) {
				$("#btn_code").html("重新获取" + $this.timeCount);
				$("#btn_code").css("color", "#dddddd");
				$this.msgCodeFlag = false;
				$this.timeCount = $this.timeCount - 1;
				$this.timer = setTimeout(function() {
					$this.timeCode();

				}, 1000);
			} else {
				$this.msgCodeFlag = true;
				$("#btn_code").css("color", "#007aff");
				$("#btn_code").html("获取验证码");
				$this.timeCount = 20;
				clearTimeout($this.timer);
			}

		},
		codeClick : function() {
			if (this.msgCodeFlag) {
				this.timeCode();
				$("#msgCode").val("123456");
			}
		}
	});

	return indexView;
});