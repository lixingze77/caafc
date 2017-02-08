define(["common"], function(common) {
	var baseinfoModel = Backbone.Model.extend({

		initialize : function() {

			this.bind("error", function(model, error) {
				$.toast(error);
			});
		},
		defaults : function() {// 定义的数据模型，将查询到的数据添加到数据模型中
			return {
				apEmail:"",
				apSpell :"",
				organizatin:"",
				imgUrl:"",
				introduce:"",
				recomId:"",
			};
		},
		validate : function(attributes) {
			var apEmail = this.get("apEmail");
			var apSpell = this.get("apSpell");
			if (!common.isEmail(apEmail)) {
				$.toast("请输入正确的邮件地址");
				return false;
			}
			if (common.isEmpty(apSpell)) {
				$.toast("请选择中文拼音");
				return false;
			}
		
		},
	    pinyinList:function(name){
	    	 var o=this;
			$.ajax({// 汉语转拼音
				type : "post",
				url : "./pinying/getMsg",
				dataType : "Json",
				data : {
					"name" : name
				},
				success : function(data) {
					//获取当前拼音
				 var pinyinVal=o.get("apSpell");
				 //获取列表
					var arry = data.result.split(',');
					for (var i = 0; i < arry.length; i++) {
						$("#pinyin").append("<option value='"+i+"'>"+arry[i]+"</option>");
						if(arry[i]==pinyinVal){
							$("#pinyin").val(i);
						}
					}
				}
				
			});
	    },
		setCard:function(id){
			//  query  card list by id
			
			var cardDiv=$("div[data-id='"+id+"']");
			var ImgUrl=cardDiv.children().find("img").attr("src");
			var Introduce=cardDiv.children(".img_text").html();
			var o=this;
			o.set({
				imgUrl:ImgUrl,
				introduce:Introduce,
			});
			this.trigger("finishSet");
			//cardinfo
			
			//set 
			
			//trigger  view2
			
		}
		
	});
	return baseinfoModel;
});