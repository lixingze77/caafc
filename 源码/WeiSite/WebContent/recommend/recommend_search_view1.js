define([ 'text!../recommend/recommend_search1.html','../recommend/recommend_search_view2', "iscroll"], function(tpl,search_view2,iscroll) {
	var scroll;
	var search1View = Backbone.View.extend({
		el : '#container',

		events : {
			"tap #search1_back" : "backSearchClick",
			"tap #searchnextstep":"searchNextstepClick",
			"tap #codeimg":"codeimgClick",
		},
        initialize: function () {
        	
        	this.Search2View = new search_view2({
				model : this.model

			});
        	this.model.on('recomListEvent', this.recomListEventClick, this);
        	this.model.on('searchVaildEvent', this.searchVaild, this);
        	this.Search2View.on('search2back', this.init, this);
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
        backSearchClick : function() {
        	$.loading();
        	this.trigger('searchback');
        	this && this.undelegateEvents();// 销毁所有监听
		},
		searchVaild:function(){
			this.model.queryRecommendList();
		},
		searchNextstepClick:function(){
			var $this = this;
			var o = this.model;
			o.set("phone", $.trim($("#phone").val()));
			o.set("searchMsgCode", $.trim($("#msgcode").val()));	
			this.model.searchVaild();
			
			
		},
		codeimgClick:function(){
			
			var url="./hf/valiCode"
			var MyDate=new Date();
			url+='?t='+MyDate.getTime();
			$("#codeimg").attr("src",url);
		},
		recomListEventClick:function(){
			$.loading();
			this.Search2View.render(); // 利用Model定义的默认属性初始化界面	
			this.Search2View.delegateEvents();
		}
	});
	return search1View;
});