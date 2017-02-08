define([ 'text!../pluscard/plus_step2.html', "iscroll",
		'../pluscard/plus_result_view' ], function(tpl, iscroll, View) {
	var scroll;

	var indexView = Backbone.View.extend({
		el : '#container',

		events : {
			"change #mailselect" : "selectClick",
			"tap .mui-action-back" : "backClick",
			"tap #finishStep" : "submitClick"
		},

		initialize : function(param) {
			
			this.finishView = new View({

			});
			this.model.on('finish', this.finish, this); // 监听事件，当

		},
		template : _.template(tpl),
		render : function() {
			var $tpl = $(this.template({
				"baCardRec" : this.model.baCardRec
			}));
			this.$el.html($tpl);
			// animInfinite
			// q启动滚动条
			scroll = new IScroll('#plus_step2', {
				fadeScrollbars : false,
				click : true
			// 允许点击
			});
			$(window).trigger('resize');
			document.addEventListener('touchmove', function(e) {
				e.preventDefault();
			}, false);

		},

		selectClick : function(e) {
			var val = $(e.currentTarget).val();
			if (val == "") {
				$("#mail").html("");
			}
			if (val == "C") {
				$("#mail").html("浙江省杭州市滨江区江南大道3888号");
			}
			if (val == "H") {
				$("#mail").html("浙江省杭州市江干区下沙")
			}
		},
		backClick : function() {
			this.trigger('back');

			this && this.undelegateEvents();// 销毁所有监听

		},
		submitClick : function() {
			var o = this.model;

			o.set("baCardRec", $.trim($("#mailselect").val()));
			// o.set("address", $.trim($("#mail").val()));

			if (o.finishVail()) {
				o.submit();
			}
		},
		finish : function() {
			this && this.undelegateEvents();// 销毁所有监听

			this.finishView.render(); // 跳转至下一步页面
			this.finishView.delegateEvents();
		}

	});

	return indexView;
});