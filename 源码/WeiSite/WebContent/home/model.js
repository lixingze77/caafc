define([], function() {
	var homeModel = Backbone.Model.extend({

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
				cityName : "北京市",
				grade : "",
				channelCode:"002",//活动编码
				loadbool:false,
			};
		},
		queryCardList : function() {
			var data = this.attributes;
			var o=this;
			$.ajax({
				url : "./hf/product",
				type : "post",
				dataType : "json",
				success : function(res) {
					o.set("cardlist",res);
					o.trigger("queryEvent");
					if(!o.get("loadbool")){
						o.set("loadbool",true);
					}else{
						$.loadclose();
					}
					
				},
				error : function() {
					var errorhtml='<div style="margin-top:50px;text-align:center;width:100%;height:30px;"><span>当前无卡产品信息</span></div>';
					$(".showcard").html(errorhtml);
					$.toast("卡片查询异常，请稍候再试");
					$.loadclose();
				}
			});
		},
		queryActivity:function(){
			var data = this.attributes;
			var o=this;
			$.ajax({
				url:"./hf/activity",
				data : data,
				type : "post",
				dataType : "json",
				success:function(adata){
					$.loadclose();
					if(adata!=null){
						o.set("activitylist",adata);
						o.trigger("activityEvent");
					}
					if(!o.get("loadbool")){
						o.set("loadbool",true);
					}else{
						$.loadclose();
					}
				},error:function(){
/*					$.toast("广告查询异常，请稍候再试");*/
					$.loadclose();
				}
			});
		},
		validate : function(attributes) {
			/*
			 * console.log(attributes) if (attributes.id == '0') {
			 * console.log("0000000000000") return "name不能为空！"; }
			 */
		},
	});
	return homeModel;
});