define([ 'text!../recommend/recommend_search.html', "iscroll"], function(tpl, iscroll) {
	var scroll;
	var recommendView = Backbone.View.extend({
		el : '#container',

		events : {
			"tap #search_back" : "backSearchClick",
		},
        initialize: function () {
          
        },
		template : _.template(tpl),
		render : function() {// 在这里定义页面的中的属性
 			var $tpl = $(this.template());
			this.$el.html($tpl);// 将模版中的内容替换到页面中的指定DIV中
			// animInfinite
			// q启动滚动条
			$(".mui-btn").highlight("mui-active");
	
			$.loadclose();
		}
        ,	
        backSearchClick : function() {
        	$.loading();
        	this.trigger('searchback');
        	this && this.undelegateEvents();// 销毁所有监听
		},
	});
	return recommendView;
});