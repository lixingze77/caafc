define([], function() {
	var newcarderrorModel = Backbone.Model.extend({

		urlRoot : "../save/0",
		initialize : function() {

			this.bind("error", function(model, error) {
				$.toast(error);
			});
		},
		defaults : function() {// 定义的数据模型，将查询到的数据添加到数据模型中
			return {
				uid : "",
				paw : "",
			};
		},
		validate : function(attributes) {

		},
	});
	return newcarderrorModel;
});