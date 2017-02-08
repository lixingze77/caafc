define([ 'text!../recommend/recommend_card.html', "iscroll",
		'../recommend/recommend_link_view' ], function(tpl, iscroll, View) {
	var scroll;

	var indexView = Backbone.View.extend({
		el : '#container',

		events : {
			"tap  #treaty" : "treatyClick",
			"tap  #nextlinkstep" : "stepClick",
			"tap #card_back" : "backCardClick",
			"tap #btn_code" : "codeClick",
			"tap #view_text" : "textClick",
			"tap #close" : "closeTextClick",
			"tap #nocard_Way" : "nocard_WayClick",
			
		},

		initialize : function(param) {
			
			this.linkView = new View({
				model : this.model

			});
			this.linkView.on('linkback', this.init, this);
			this.model.on('next', this.linkStep, this); // 监听事件，当
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
			var img=new Image();
			img.src="./img/banner.png";
			img.onload=function(){
				scroll = new IScroll('#recommend_card', {
					fadeScrollbars : false,
					click : true
				// 允许点击
				});
			}
			
			$(window).trigger('resize');
			document.addEventListener('touchmove', function(e) {
				e.preventDefault();
			}, false);
			var $this = this;
			var o = this.model;
			$("#recommendName").val(o.get("apName"));
			$("#recommendTel").val(o.get("apMobile"));
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
		},textClick : function() {
			$(".hf-text-mask").show();
			$(".hf-text-box").show();
			$("#recommend_card").hide();
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
			$("#recommend_card").show();
			$("header").show();
		},
		stepClick : function(e) {
			// 数据提交
			
			var $this = this;
			var o = this.model;
			o.set("apName", $.trim($("#recommendName").val()));
			o.set("apMobile", $.trim($("#recommendTel").val()));		
			o.set("apIdNbr", $.trim($("#cardid").val()));
			o.set("id", $.trim($("#cardid").val()));
			o.set("msgCode", $.trim($("#msgCode").val()));
			
			o.set("checkbox", $.trim($("#treaty").parent().hasClass(
					"mui-checked")));

			// // dosome
		
		
			if (this.model.nextVail()) {// 数据校验
				this.model.cardQuery();
				
			}
		},
		linkStep : function() {
			$.loading();
			this.msgCodeFlag = true;
			this.timeCount = 20;
			clearTimeout(this.timer)
			this && this.undelegateEvents();// 销毁所有监听

			this.linkView.render(); // 跳转至下一步页面
			this.linkView.delegateEvents();
		},
		backCardClick : function() {
			this.msgCodeFlag = true;
			this.timeCount = 20;
			clearTimeout(this.timer);
			this && this.undelegateEvents();// 销毁所有监听
			this.trigger('cardback');
		

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
		},
		nocard_WayClick:function(){
			$.loading();
			this.msgCodeFlag = true;
			this.timeCount = 20;
			clearTimeout(this.timer);
			this && this.undelegateEvents();// 销毁所有监听
			location.hash = "#newcard";
			
		}
	});

	return indexView;
});