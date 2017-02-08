define([ 'text!../schedule/icms.html', "iscroll",'../schedule/icmslist_view'], function(tpl,iscroll,View) {
	var scroll;
	var icmsView = Backbone.View.extend({
		el : '#container',
		events : {
			"tap #icms_back" : "icmsClick",
			"tap #icmsnextstep":"icmsNextstepClick",
			"tap #codeimg_icms":"codeimgClick",
		},
		
        initialize: function () {
        	
        	this.icmslistView=new View({
        		model:this.model
        	});
        	
        	this.icmslistView.on("icms_back",this.init,this);
        	this.model.on('icmsVaildEvent', this.icmsVaildfinish, this);
        	this.model.on('icmsNext', this.icmsNextClick, this);
        },
        init : function() {
			this.delegateEvents();
			this.render();
		},
		template : _.template(tpl),
		render : function() {// 在这里定义页面的中的属性
 			var $tpl = $(this.template());
			this.$el.html($tpl);// 将模版中的内容替换到页面中的指定DIV中
			// animInfinite
			// q启动滚动条
			$(".mui-btn").highlight("mui-active");
			this.codeimgClick();
			$.loadclose();
		}
        ,	
        icmsClick : function() {
        	$.loading();
        	location.hash="#home";
        	this && this.undelegateEvents();// 销毁所有监听
		},
		icmsVaildfinish:function(){
		
			this.model.queryIcmsList();
		},
		icmsNextstepClick:function(){
			var $this = this;
			var o = this.model;
			o.set("icmscode", $.trim($("#icmscode").val()));
			o.set("searchMsgCode", $.trim($("#msgcode").val()));	
			this.model.icmsVaild();
			
		},
		icmsNextClick:function(){
			
			this && this.undelegateEvents();// 销毁所有监听
			this.icmslistView.render(); // 跳转至下一步页面
			this.icmslistView.delegateEvents();
		},
		codeimgClick:function(){
			var url="./hf/valiCode";
			var MyDate=new Date();
			url+='?t='+MyDate.getTime();
			$("#codeimg_icms").attr("src",url);
		},
		
	});
	return icmsView;
});