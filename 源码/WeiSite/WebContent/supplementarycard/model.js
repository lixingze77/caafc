define([ '../supplementarycard/sup_step_view1', '../supplementarycard/sup_step_view2','../supplementarycard/sup_step_view3','../supplementarycard/sup_result_view','common'], function(view1,view2,view3,view4,common) {
	var loginModel = Backbone.Model.extend({

		initialize : function() {

		},
		defaults : function() {// 定义的数据模型，将查询到的数据添加到数据模型中
			return {
				apName:"",         //主卡中文姓名
				primaryNbr:"",    //主卡卡号
				apIdNbr:"",       //主卡证件号
				faPhone:"",       //住宅电话
				submmitType:"9",// 提交类型
				baAporigin : "02",// 申请来源 微信进件
				secChiName:"",         //附属卡姓名
				secEngName:"",    //附属卡英文名
				secIdType:"",       //附属卡证件类型
				secIdNbr:"",       //附属卡证件号码
				secFaMobile:"",         //附属卡手机号码
				secRelation:"",    //与主持卡人关系
				faAddressAll:"",       //主卡邮寄地址
				isIndependent : "B",
//				isIndependent:"9"   //申请类型 56行
				apIdType : "I",// 证件类型,身份证
				msgCode : "",// 验证码

			};
		},jumpToView2:function(myThis){
			clearTimeout(myThis.timer);
			myThis && myThis.undelegateEvents();// 销毁所有监听
			var view = new view2({
				model : myThis.model

			});
			// view.model.defaults = model.defaults;
			view.render(); // 跳转至下一步页面
			// view.initialize();

			
		},
		jumpToView3:function(myThis){
			myThis && myThis.undelegateEvents();// 销毁所有监听
			var view = new view3({
				model : myThis.model
			});
			view.render(); // 跳转至下一步页面
		},
		jumpToView4:function(myThis){
			myThis && myThis.undelegateEvents();// 销毁所有监听
			var view = new view4({
				model : myThis.model
			});
			view.render(); // 跳转至下一步页面
		},
		jumpToView1:function(myThis){
			myThis && myThis.undelegateEvents();// 销毁所有监听
			//第二页跳回第一页清空当前页面数据
			this.set("secChiName","");
			this.set("secEngName","");
			this.set("secIdType","");
			this.set("secIdNbr","");
			this.set("secFaMobile","");
			this.set("secRelation","");
			this.set("faAddressType","");
			this.set("faAddressAll","");
			var view = new view1({
				model : myThis.model
			});

			view.render(); // 跳转至下一步页面


		},// 提交数据验证
		pag1Vail : function() {

			var apName = this.get("apName");
		var primaryNbr = this.get("primaryNbr");
		var apIdNbr = this.get("apIdNbr");
		var faPhone = this.get("faPhone");
		var checkbox = this.get("checkbox");
			var msgCode = this.get("msgCode");

		// var addressType = this.get("addressType");
		// var address = this.get("address");
		if (common.isEmpty(apName)) {
			$.toast("请输入姓名");
			return false;
		};
		if(!common.isChinese(apName)){
			$.toast("请输入中文姓名");
			return false;
		}
			if (common.isEmpty(primaryNbr)) {
				$.toast("请输入主卡卡号");
				return false;
			};

		if (!common.isCardID(apIdNbr)) {
			$.toast("身份证号码不正确");
			return false;
		};
		if (!common.isPhone(faPhone)) {
			$.toast("手机号码不正确");
			return false;
		};
		if (common.isEmpty(msgCode)) {
			$.toast("请输入短信验证码");
			return false;
		};
		if (msgCode != "123456") {
			$.toast("验证码不正确");
			return false;
		};
		// if (common.isEmpty(addressType)) {
		// $.toast("请选择递送地址");
		// return false;
		// }
		if (checkbox=="false") {
			$.toast("请仔细阅读协议后并勾选");
			return false;
		};
		return true;
	},
		pag2Vail : function() {
			var secChiName = this.get("secChiName");
			var secEngName = this.get("secEngName");
			var secIdType = this.get("secIdType");
			var secIdNbr = this.get("secIdNbr");
			var secFaMobile = this.get("secFaMobile");
			var secRelation = this.get("secRelation");
			var faAddressType = this.get("faAddressType");
			var faAddressAll = this.get("faAddressAll");

			// var addressType = this.get("addressType");
			// var address = this.get("address");
			if (common.isEmpty(secChiName)) {
				$.toast("请输入姓名");
				return false;
			};
			if (common.isEmpty(secEngName)) {
				$.toast("请输入英文名");
				return false;
			};
			if (common.isEmpty(secIdType)) {
				$.toast("请选择证件类型");
				return false;
			};

			if (common.isEmpty(secIdNbr)) {
				$.toast("请输入证件号");
				return false;
			};
			if (!common.isPhone(secFaMobile)) {
				$.toast("手机号码不正确");
				return false;
			};
			if (common.isEmpty(secRelation)) {
				$.toast("请选择与主卡人关系");
				return false;
			};
			if (common.isEmpty(faAddressAll)) {
				$.toast("请选择邮寄地址");
				return false;
			};
			return true;
		},
		cardQuery : function(myThis) {
			var $this = this;
			$.loading("数据查询中...");
			var data = {};
			data.id = this.get("apIdNbr");
			data.name = this.get("apName");
			data.cardid = this.get("primaryNbr");

			$.ajax({
				url : "./hf/police",
				data : data,
				type : "post",
				dataType : "json",
				success : function(res) {
					$.loadclose();
					if (res.code == "0000" && (res.queryresult == "3"||res.queryresult == "2")) {
						$this.jumpToView2(myThis);
					} else {
						if (res.queryresult == "1")
							$.toast("您尚未办理我行信用卡，无法申请附属卡");
						else
							$.toast("您无法加办卡");
					}
//					
				},
				error : function() {
					$.toast("查询异常，请稍候再试");
					$.loadclose();
				}
			})
		},
		submit : function(myThis) {
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
						$this.jumpToView4(myThis);
					} else {
						$.toast("附属卡申请失败");

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