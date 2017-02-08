define([ 'text!../newcard/basic_tpl.html', "iscroll", "areamain" ], function(tpl, iscroll, areamain) {
	var scroll;
	var homeView = Backbone.View.extend({
		el : '#container',

		events : {
			"tap  #treaty" : "treatyClick",

			"tap  #view_text" : "agreementClick",
			"tap  #close" : "closeClick",
			"tap  #basicnextstep" : "basicstepClick",

			"tap  #basicback" : "backClick",
			"tap  #btn_code" : "codeClick"

		},

		initialize : function() {
			this.model.on('psuccess', this.psuccess, this);
			this.model.on('perror', this.perror, this);
			this.model.on('cityLoad', this.cityLoad, this);
 		},
		template : _.template(tpl),
		render : function() {// 在这里定义页面的中的属性
			var $tpl = $(this.template());
			this.$el.html($tpl);// 将模版中的内容替换到页面中的指定DIV中
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
			$(".mui-btn").highlight("mui-active");

			this.model.queryField();//获取配置字段
			this.model.queryCity();//获取可配置的城市

		},
		cityLoad : function() {
//			
			// 下拉城市
			var area1 = new LArea();
			area1.init({
				'trigger' : '#city', // 触发选择控件的文本框，同时选择完毕后name属性输出到该位置
				'valueTo' : '#value1', // 选择完毕后id属性输出到该位置
				'keys' : {
					id : 'id',
					name : 'name'
				}, // 绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
				'type' : 1, // 数据源类型
//				'data' : LAreaData

				'data' : this.model.citys
			// 数据源
			});
			area1.value = [ 27, 16, 7 ];// 控制初始位置，注意：该方法并不会影响到input的value
			

			this.originalData();
			$.loadclose();
		},
		originalData : function() {// 后退的时候还原数据
			var o = this.model;
			o.queryCardList();
			if (o.get("apName") != "" && o.get("apName") != null) {
				$("#name").val(o.get("apName"));
				$("#cardid").val(o.get("apIdNbr"));
				$("#city").val(o.get("city"));
				$("#phone").val(o.get("apMobile"));
				$("#msgCode").val(o.get("msgCode"));
				if (o.get("checkbox")) {
					$("#treaty").parent().addClass("mui-checked");
					$("#treaty").attr("checked", "checked");
				}
			}
		},
		treatyClick : function(e) {
			var rowel = $(e.currentTarget).parent();
			var $thisel = $(e.currentTarget);

			if (rowel.hasClass("mui-checked")) {
				rowel.removeClass("mui-checked");
				$thisel.removeAttr("checked");
			} else {
				rowel.addClass("mui-checked");
				$thisel.attr("checked", "checked");
			}
		},
		agreementClick : function() {
			$(".hf-text-mask").show();
			$(".hf-text-box").show();
			$("#plus_step1").hide();
			$("header").hide();
			// q启动滚动条
			scroll = new IScroll('#hf-text', {
				fadeScrollbars : false,
				click : true
			// 允许点击
			});
		},
		closeClick : function() {
			$(".hf-text-mask").hide();
			$(".hf-text-box").hide();
			$("#plus_step1").show();
			$("header").show();
		},
		psuccess : function() {
			var $this=this;
			$this.timeCount = 20;
			$this.msgCodeFlag=true;
			clearTimeout($this.timer);
			setTimeout(function(){
				$this.trigger('next');
			},500);
		},
		perror : function() {
			var o = this.model;
			location.hash = "#newcarderror/" + o.get("queryresult");
		},
		backClick : function() {
			var $this = this;
			$this.timeCount=20;
			$this.msgCodeFlag=true;
			clearTimeout($this.timer);
			location.hash = "#home";
		},

		basicstepClick : function(e) {// 下一步
			// 数据提交
			var $this = this;
			var o = this.model;
			o.set("apName", $.trim($("#name").val()));
			o.set("apIdNbr", $.trim($("#cardid").val()));
			o.set("city", $.trim($("#city").val()));
			o.set("apMobile", $.trim($("#phone").val()));
			o.set("msgCode", $.trim($("#msgCode").val()));
			o.set("checkbox", $.trim($("#treaty").parent().hasClass("mui-checked")));
			// // dosome
			if (this.model.basicVail()) {// 数据校验
				$.loading();
				o.peopleQuery();
			}
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
	return homeView;
});