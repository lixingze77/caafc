define([ 'text!../supplementarycard/sup_step1.html', "iscroll" ], function(tpl,
		iscroll) {
	var scroll;

	var indexView = Backbone.View.extend({
		el : '#container',

		events : {
			"tap  #treaty" : "treatyClick",
			"tap  #nextstep" : "stepClick",
			"tap .mui-action-back" : "backClick",
			"tap #btn_code" : "codeClick",
			"tap #view_text": "textClick",
			"tap #close": "closeTextClick",
		},

		initialize : function(param) {

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
			scroll = new IScroll('#sup_step1', {
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
			$("#apName").val(o.get("apName"));
			$("#primaryNbr").val(o.get("primaryNbr"));
			$("#apIdNbr").val(o.get("apIdNbr"));
			$("#faPhone").val(o.get("faPhone"));
			$("#msgCode").val(o.get("msgCode"));
			$.loadclose();

		},
		stepClick : function() {

			var $this = this;
			var o = this.model;
			o.set("apName", $.trim($("#apName").val()));
			o.set("primaryNbr", $.trim($("#primaryNbr").val()));
			o.set("apIdNbr", $.trim($("#apIdNbr").val()));
			o.set("faPhone", $.trim($("#faPhone").val()));
			o.set("msgCode", $.trim($("#msgCode").val()));
			o.set("checkbox", $.trim($("#treaty").parent().hasClass(
					"mui-checked")));
			if (this.model.pag1Vail()) {
				this.model.cardQuery(this);
				clearTimeout(this.timer);
			}
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
		backClick : function() {
			clearTimeout(this.timer);
			location.hash = "#home";

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
				$("#msgCode").val("123456");
				this.timeCode();

			}
		},
		textClick : function() {
			$(".hf-text-mask").show();
			$(".hf-text-box").show();
			$("#sup_step1").hide();
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
			$("#sup_step1").show();
			$("header").show();
		},

	});

	return indexView;
});