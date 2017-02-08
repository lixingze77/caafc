define([], function() {
	var expressModel = Backbone.Model.extend({

		
		initialize : function() {

			this.bind("error", function(model, error) {
				$.toast(error);
			});
		},
		defaults : function() {// 定义的数据模型，将查询到的数据添加到数据模型中
			return {
				
			};
		},
		
		validate : function(attributes) {
			/*
			 * console.log(attributes) if (attributes.id == '0') {
			 * console.log("0000000000000") return "name不能为空！"; }
			 */
		},
	});
	return expressModel;
});