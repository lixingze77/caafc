define([], function() {
	var mainModel = Backbone.Model.extend({

		// 模型默认的数据
		defaults : function() {
			return {
				id : "0",
				text : ""
			};
		},

		// 定义一些方法
		fetch : function() {
			var o = this;
			// 可以做一些http请求
			setTimeout(function() {
				o.set({
					id : "111",
					text : "22222"
				});
				o.trigger('clickEvent'); // 向view触发事件
			}, 1000);
		}

	});

	return mainModel;
});