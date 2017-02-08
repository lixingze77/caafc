define([ 'text!../schedule/emslist.html', "iscroll"], function(tpl, iscroll) {
	var scroll;
	var obj;
	var emslistView = Backbone.View.extend({
		el : '#container',

		events : {
			"tap #emslist_back" : "backEmsClick",
		},
        initialize: function () {
        	
        },
		template : _.template(tpl),
		render : function() {// 在这里定义页面的中的属性{}
			var o=this.model;
			obj=o.get("emslist");
		
 			var $tpl = $(this.template({obj:obj}));
			this.$el.html($tpl);// 将模版中的内容替换到页面中的指定DIV中
			// animInfinite
			// q启动滚动条
			scroll = new IScroll('#ems_search', {
				fadeScrollbars : false,
				click : true
			// 允许点击
			});
			$(".mui-btn").highlight("mui-active");
	
			$.loadclose();
		}
        ,	
  
        
        backEmsClick : function() {
        	
        	$.loading();
        	this.trigger('ems_back');
        	this && this.undelegateEvents();// 销毁所有监听
		},
	});
	return emslistView;
});