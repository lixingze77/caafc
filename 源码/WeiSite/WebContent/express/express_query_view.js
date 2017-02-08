define([ 'text!../express/express_query.html', "iscroll"], function(tpl, iscroll) {
	var scroll;
	var homeView = Backbone.View.extend({
		el : '#container',

		events : {
			
		},

        initialize: function () {
          
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
			
              $(window).resize(function() {//屏幕尺寸变化的时候触发的监听
            	  scroll&&scroll.refresh();
              });
              $.loadclose();
		},
		

	});
	return homeView;
});