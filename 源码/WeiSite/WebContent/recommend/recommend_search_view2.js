define([ 'text!../recommend/recommend_search2.html', "iscroll"], function(tpl, iscroll) {
	var scroll;
	var list;
	var search2View = Backbone.View.extend({
		el : '#container',

		events : {
			"tap #search_back" : "backSearchClick",
		},
        initialize: function () {
        	
        },
		template : _.template(tpl),
		render : function() {// 在这里定义页面的中的属性{}
			var o=this.model;
			list=o.get("recommdlist");
			
 			var $tpl = $(this.template({list:list}));
			this.$el.html($tpl);// 将模版中的内容替换到页面中的指定DIV中
			// animInfinite
			// q启动滚动条
			scroll = new IScroll('#recommend_search', {
				fadeScrollbars : false,
				click : true
			// 允许点击
			});
			
			$(".mui-btn").highlight("mui-active");
	
			$.loadclose();
		}
        ,	
  
        
        backSearchClick : function() {
        	
        	$.loading();
        	this.trigger('search2back');
        	this && this.undelegateEvents();// 销毁所有监听
		},
	});
	return search2View;
});