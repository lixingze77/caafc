define([ 'text!../button/tpl.html', "iscroll" ], function(tpl, iscroll) {
	var scroll;
	var buttonView = Backbone.View.extend({
		el : '#container',

		events : {
			"tap #btn1" : "clickE"
		},

		initialize : function(param) {
			// console.log(param);
			this.model.on('clickEvent', this.clickEvent, this); // 监听事件，当

			// this.header.hideLeft();
		},
		template : _.template(tpl),
		render : function() {
			var $tpl = $(this.template());
			this.$el.html($tpl);
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
		clickE : function() {

			this.model.query();
		},
		clickEvent : function() {
			console.log(this.model)
		}
	});

	return buttonView;
});