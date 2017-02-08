define([ 'text!../login/tpl.html', "iscroll" ], function(tpl, iscroll) {
	var scroll;
	var loginView = Backbone.View.extend({
		el : '#container',

		events : {
			"tap #loginbtn" : 'click'
		},

        initialize: function () {
            this.model.on('clickEvent', this.render, this); // 监听事件，当model中模型被改变时响应
        },
		template : _.template(tpl),
		render : function() {// 在这里定义页面的中的属性
 			var $tpl = $(this.template());
			this.$el.html($tpl);// 将模版中的内容替换到页面中的指定DIV中
			// animInfinite
			// q启动滚动条
			scroll = new IScroll('#tpl_btn', {
				fadeScrollbars : false,
				click : true
			// 允许点击
			});
			$(window).trigger('resize');
			document.addEventListener('touchmove', function(e) {
				e.preventDefault();
			}, false);
			$(".mui-btn").highlight("mui-active");
			this.header.showLeft();
			this.header.onback();
		},
		click : function(e) {
			var id = $("#Uid").val();
			var paw = $("#Paw").val();
			this.model.set({
				uid : id,
				paw : paw
			});
			this.model.login();

		}
	});
	return loginView;
});