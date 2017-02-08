define([ 'text!../schedule/icmslist.html', "iscroll"], function(tpl, iscroll) {
	var scroll;
	var obj;
	var icmslistView = Backbone.View.extend({
		el : '#container',

		events : {
			"tap #icmslist_back" : "backIcmsClick",
		},
        initialize: function () {
        	
        },
		template : _.template(tpl),
		render : function() {// 在这里定义页面的中的属性{}
			var o=this.model;
			obj=o.get("icmslist");
		
 			var $tpl = $(this.template({obj:obj}));
			this.$el.html($tpl);// 将模版中的内容替换到页面中的指定DIV中
			// animInfinite
			// q启动滚动条
			$(".mui-btn").highlight("mui-active");
			scroll = new IScroll('#icms_search', {
				fadeScrollbars : false,
				click : true
			// 允许点击
			});
			$.loadclose();
		}
        ,	
  
        
        backIcmsClick : function() {
        	
        	$.loading();
        	this.trigger('icms_back');
        	this && this.undelegateEvents();// 销毁所有监听
		},
	});
	return icmslistView;
});