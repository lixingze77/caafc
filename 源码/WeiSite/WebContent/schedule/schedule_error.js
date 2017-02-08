define([ 'text!../schedule/schedule_error.html', "iscroll"], function(tpl, iscroll) {
	var scroll;
	var scheduleView = Backbone.View.extend({
		el : '#container',

		events : {

		},

        initialize: function () {

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
			scroll = new IScroll('#schedule_tpl1', {
				fadeScrollbars : false,
				click : true
			// 允许点击
			});
			$(window).trigger('resize');
			document.addEventListener('touchmove', function(e) {
				e.preventDefault();
			}, false);
			$(".mui-btn").highlight("mui-active");
			
		},
		scheduleback:function(){
			this.trigger('back');
			this && this.undelegateEvents();// 销毁所有监听
		},
	});
	return scheduleView;
});