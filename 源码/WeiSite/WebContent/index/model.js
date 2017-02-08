define([], function() {
	var indexModel = Backbone.Model.extend({
		url : "../save/0",
		initialize : function() {

			this.bind("error", function(model, error) {
				$.toast(error);
			});
		},
		// 模型默认的数据
		defaults : function() {
			return {
				id : "0",
				test : "",
				list : []
			};
		},
		validate : function(attributes) {
			console.log(attributes)
			if (attributes.id == '0') {
				console.log("0000000000000")
				return "name不能为空！";
			}
		},
		// 定义一些方法
		query : function() {
			var o = this;
			// 可以做一些http请求
			$.ajax({
				url : "login/0",
				type : "post",
				dataType : "json",
				data : {
					p : "22222"
				},
				success : function(data) {
					console.log(data)
					var array = [];
					var obj1 = {
						code : "1",
						codemsg : "错误"
					}
					array.push(obj1);
					var obj2 = {
						code : "2",
						codemsg : "成功"
					}

					array.push(obj2);

					var obj3 = {
						code : "3",
						codemsg : "位置"
					}

					array.push(obj3);
					o.set({
						test : "22222",
						list : array
					});
					o.trigger('clickEvent'); // 向view触发事件
				}
			})

		}

	});

	return indexModel;
});