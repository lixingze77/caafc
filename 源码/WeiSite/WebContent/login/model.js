define([], function() {
	var loginModel = Backbone.Model.extend({

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
			/*
			 * console.log(attributes) if (attributes.id == '0') {
			 * console.log("0000000000000") return "name不能为空！"; }
			 */
		},
		login : function() {
			var uid=this.get("uid");
			var paw=this.get("paw");
			
			
		}
	});
	return loginModel;
});