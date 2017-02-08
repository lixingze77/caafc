define([ 'text!../schedule/tpl.html', "iscroll",'../schedule/cardlist_view'], function(tpl, iscroll,View) {
	var scroll;
	var scheduleView = Backbone.View.extend({
		el : '#container',

		events : {
			"tap  #btn_code" : "codeClick",
			"tap  #selectstep":"selectClick",
			"tap  #scheduleback":"scheduleback",
			"tap #codeimg_card":"codeimgClick",
		},

        initialize: function () {
        
        	this.nextView=new View({
        		model:this.model
        	});
        	this.model.on('cardListEvent', this.cardListClick, this);
        	this.nextView.on("scheduleback",this.init,this);
        	this.model.on("CardVaildEvent",this.CardVaildClick,this);
        },
        init:function(){
        	this.delegateEvents();//清除events中的事件
        	this.render();
        },
		template : _.template(tpl),
		render : function() {// 在这里定义页面的中的属性
 			var $tpl = $(this.template());
			this.$el.html($tpl);// 将模版中的内容替换到页面中的指定DIV中
			// animInfinite
			// q启动滚动条
			scroll = new IScroll('#schedule_tpl', {
				fadeScrollbars : false,
				click : true
			// 允许点击
			});
			$(window).trigger('resize');
			document.addEventListener('touchmove', function(e) {
				e.preventDefault();
			}, false);
			$(".mui-btn").highlight("mui-active");
			this.codeimgClick();
			$.loadclose();
		},
		selectClick:function(){
			
			var $this = this;
			var o = this.model;
			
			o.set("cardid", $.trim($("#cardid").val()));
			o.set("searchMsgCode", $.trim($("#msgcode").val()));	
			this.model.CardVaild();
		},
		CardVaildClick:function(){
			this.model.querycardList();
			
		},
		cardListClick:function(){
			this && this.undelegateEvents();// 销毁所有监听
			this.nextView.render(); // 跳转至下一步页面
			this.nextView.delegateEvents();
		},
		scheduleback:function(){
			var $this = this;
			clearTimeout($this.timer);
			location.hash = "#home";
		},codeimgClick:function(){
			
			var url="./hf/valiCode";
			var MyDate=new Date();
			url+='?t='+MyDate.getTime();
			$("#codeimg_card").attr("src",url);
		},
	});
	return scheduleView;
});