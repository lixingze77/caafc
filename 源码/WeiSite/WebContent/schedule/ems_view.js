define([ 'text!../schedule/ems.html', "iscroll",'../schedule/emslist_view'], function(tpl,iscroll,View) {
	var scroll;
	var emsView = Backbone.View.extend({
		el : '#container',
		events : {
			"tap #ems_back" : "emsClick",
			"tap #emsnextstep":"emsNextstepClick",
			"tap #codeimg_ems":"codeimgClick",
		},
		
        initialize: function () {
        	
        	this.emslistView=new View({
        		model:this.model
        	});
        	
        	this.emslistView.on("ems_back",this.init,this);
        	this.model.on('emsVaildEvent', this.emsVaildfinish, this);
        	this.model.on('emsNext', this.emsNextClick, this);
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
        emsClick : function() {
        	$.loading();
        	location.hash="#home";
        	this && this.undelegateEvents();// 销毁所有监听
		},
		emsVaildfinish:function(){
		
			this.model.queryEmsList();
		},
		emsNextstepClick:function(){
			var $this = this;
			var o = this.model;
			o.set("emscode", $.trim($("#emscode").val()));
			o.set("searchMsgCode", $.trim($("#msgcode").val()));	
			this.model.emsVaild();
			
		},
		emsNextClick:function(){
			
			this && this.undelegateEvents();// 销毁所有监听
			this.emslistView.render(); // 跳转至下一步页面
			this.emslistView.delegateEvents();
		},
		codeimgClick:function(){
			
			var url="./hf/valiCode";
			var MyDate=new Date();
			url+='?t='+MyDate.getTime();
			$("#codeimg_ems").attr("src",url);
		},
		
	});
	return emsView;
});