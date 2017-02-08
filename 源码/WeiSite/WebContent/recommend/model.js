define(["common"], function(common) {
	var recommendModel = Backbone.Model.extend({

		urlRoot : "../save/0",
		initialize : function() {

			this.bind("error", function(model, error) {
				$.toast(error);
			});
		},
		defaults : function() {// 定义的数据模型，将查询到的数据添加到数据模型中
			
			return{
				cardid : "",
				id : "",
				name : "",
				apName : "",// 
				apIdNbr : "",// 证件号码
				baAporigin : "02",// 申请来源 微信进件
				apMobile : "",// 手机号
				msgCode : "",// 验证码
				apIdType : "I",// 证件类型,身份证
				checkbox : false,// 
				
				
				phone:"",//查询手机号
				searchMsgCode:"",//查询验证码
			
				loadbool:false,
				}
		},
		nextVail : function() {
			var name = this.get("apName");
			var phone = this.get("apMobile");
			var msgCode = this.get("msgCode");
			
			var checkbox = this.get("checkbox");
			var cardid = this.get("apIdNbr");
			
			if (common.isEmpty(name)) {
				$.toast("请输入姓名");
				return false;
			}
			if (!common.isCardID(cardid)) {
				$.toast("身份证号码不正确");
				return false;
			}
			if (!common.isPhone(phone)) {
				$.toast("手机号码不正确");
				return false;
			}
			if (common.isEmpty(msgCode)) {
				$.toast("请输入短信验证码");
				return false;
			}
			if (msgCode != "123456") {
				$.toast("验证码不正确");
				return false;
			}
			// if (common.isEmpty(addressType)) {
			// $.toast("请选择递送地址");
			// return false;
			// }
			
			if (checkbox=="false") {
				$.toast("请仔细阅读协议后并勾选");
				return false;
			}
			return true;
		},
		searchVaild:function(){
			
			var searchPhone = this.get("phone");
			var searchMsgCode = this.get("searchMsgCode");
			
			var data = this.attributes;
			if (!common.isPhone(searchPhone)) {
				$.toast("查询手机号不正确");
				return false;
			}
			var $this=this;
			$.ajax({
				url : "./hf/getValiCode",
				type : "get",
				data :{},
				success : function(res) {
					
					if(searchMsgCode!=res){
						$.toast("请输入正确的验证码");
					}
					else{
						$this.trigger("searchVaildEvent");
					}
				},
				error : function() {
					$.toast("验证码异常，请稍候再试");
					$.loadclose();
					
				}
			});
			
			
			
		},
		queryRecommendList:function(){
			var data = this.attributes;
			var o=this;
			$.ajax({
				url : "./hf/recom",
				type : "post",
				dataType : "json",
				data : {"phone":data.phone+""},
				success : function(res) {
				
					o.set("recommdlist",res);
					o.trigger("recomListEvent");
					if(!o.get("loadbool")){
						o.set("loadbool",true);
					}else{
						$.loadclose();
					}
					
				},
				error : function() {
					$.toast("推荐查询异常，请稍候再试");
					$.loadclose();
				}
			});
		},
		cardQuery : function() {
			
			var $this = this;
			
			var data = this.attributes;
			
			$.ajax({
				url : "./hf/police",
				data : data,
				type : "post",
				dataType : "json",
				success : function(res) {
					$.loadclose();
					if (res.code == "0000" && res.queryresult == "2") {
						$this.trigger("next");
					} else {
						if (res.queryresult == "1")
							$.toast("您尚未办理我行信用卡，无法推荐办卡");
						else
							$.toast("您无法推荐办卡");
					}
					
				},
				error : function() {
					$.toast("查询异常，请稍候再试");
					$.loadclose();
				}
			})
		}
		
		
	
	});
	return recommendModel;
});