define([ "common" ], function(common) {
	var loginModel = Backbone.Model.extend({

		initialize : function() {

		},
		baCardRec : [ {
			id : "H",
			text : "家庭地址"
		}, {
			id : "C",
			text : "公司地址"

		} ],
		defaults : function() {// 定义的数据模型，将查询到的数据添加到数据模型中
			return {
				cardid : "",
				id : "",
				name : "",
				cardid : "",
				apName : "",// 
				submmitType : "9",// 提交类型
				baAporigin : "02",// 申请来源 微信进件
				apIdNbr : "",// 证件号码
				apMobile : "",// 手机号
				msgCode : "",// 验证码
				apIdType : "I",// 证件类型,身份证
				recomId : "",// 验证码
				checkbox : false,// 证件号码
				baRec : "U"// 卡片递送地址
				,
				baCardRec : ""// 邮寄地址
				,
				isIndependent : "B"
			};
		},// 提交数据验证
		nextVail : function() {
			var name = this.get("apName");

			var cardid = this.get("apIdNbr");
			var phone = this.get("apMobile");
			var msgCode = this.get("msgCode");
			var recommentCode = this.get("recommentCode");
			var checkbox = this.get("checkbox");
			// var addressType = this.get("addressType");
			// var address = this.get("address");
			if (common.isEmpty(name)) {
				$.toast("请输入姓名");
				return false;
			}
			if(!common.isChinese(name)){
				$.toast("请输入中文姓名");
				return false;
			}
			if (!common.isCardID(cardid)) {
				$.toast("身份证号码不正确");
				return false;
			}
			/*
			 * if (!common.isPhone(phone)) { $.toast("手机号码不正确"); return false; }
			 */
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
			if (!checkbox) {
				$.toast("请仔细阅读协议后并勾选");
				return false;
			}
			return true;
		},
		finishVail : function() {
			var addressType = this.get("baCardRec");
			if (common.isEmpty(addressType)) {
				$.toast("请选择递送地址");
				return false;
			}
			return true;

		},
		cardQuery : function() {

			var $this = this;
			$.loading("数据查询中...");
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
							$.toast("您尚未办理我行信用卡，无法加办卡");
						else
							$.toast("您无法加办卡");
					}

			},
				error : function() {
					$.toast("查询异常，请稍候再试");
					$.loadclose();
				}
			})
		},
		submit : function() {
			var $this = this;
			$.loading("数据提交中...");
			var data = this.attributes;
			$.ajax({
				url : "./hf/add",
				data : data,
				type : "post",
				dataType : "json",
				success : function(res) {
					$.loadclose();
					
					if (res.code == "0000") {
						$this.trigger("finish");
					} else {
						$.toast("加办卡申请失败")

					}
				},
				error : function() {
					$.loadclose();
				}
			})
		}

	});
	return loginModel;
});