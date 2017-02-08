define([ 'text!../schedule/schedule_main.html', "iscroll"], function(tpl,iscroll) {
	var scroll;
	var scheduleView = Backbone.View.extend({
		el : '#container',

		events : {
			"tap #scheduleback":"scheduleback",
			"tap #card_schedule":"cardscheduleClick",
			"tap #homeback":"homebackClick",
			"tap #ems_schedule":"emsscheduleClick",
			"tap #icms_schedule":"icmsscheduleClick",
		
			
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
		
			$(window).trigger('resize');
			document.addEventListener('touchmove', function(e) {
				e.preventDefault();
			}, false);
			$(".mui-btn").highlight("mui-active");
			
		},
		scheduleback:function(){
			location.hash = "#schedule";
			this && this.undelegateEvents();// 销毁所有监听
		},
		cardscheduleClick:function(){
			$.loading();
			setTimeout(function() {
				location.hash = "#cardschedule";
			}, 300)
			
		},
		emsscheduleClick:function(){
			$.loading();
			setTimeout(function() {
				location.hash = "#emsschedule";
			}, 300)
		
		},
		icmsscheduleClick:function(){
			$.loading();
			setTimeout(function() {
				location.hash = "#icmsschedule";
			}, 300)
			
		},
		homebackClick:function(){
			location.hash = "#home";
		}
	});
	return scheduleView;
});