define([ "common" ], function(common) {
	var scheduleModel = Backbone.Model.extend({

		
		initialize : function() {

			this.bind("error", function(model, error) {
				$.toast(error);
			});
		},
		defaults : function() {// 定义的数据模型，将查询到的数据添加到数据模型中
			return {
				emscode : "",//寄件编码
				searchMsgCode : "",//寄件验证码
				cardid : "",//省份证
				icmscode:"",//退件编码
			};
		},
		emsVaild : function() {//寄卡查询验证

			var emscode = this.get("emscode");
			var searchMsgCode = this.get("searchMsgCode");
			if (common.isEmpty(emscode)) {
				$.toast("请输入快递单号");
				return false;
			}
			var $this = this;
			$.ajax({
				url : "./hf/getValiCode",
				type : "get",
				data : {},
				success : function(res) {
					if (searchMsgCode != res) {
						$.toast("请输入正确的验证码");
					} else {
						$this.trigger("emsVaildEvent");
					}
				},
				error : function() {
					$.toast("验证码异常，请稍候再试");
					$.loadclose();

				}
			});

		},
		icmsVaild : function() {//退卡查询验证

			var emscode = this.get("icmscode");
			var searchMsgCode = this.get("searchMsgCode");
			if (common.isEmpty(emscode)) {
				$.toast("请输入快递单号");
				return false;
			}
			var $this = this;
			$.ajax({
				url : "./hf/getValiCode",
				type : "get",
				data : {},
				success : function(res) {
					if (searchMsgCode != res) {
						$.toast("请输入正确的验证码");
					} else {
						$this.trigger("icmsVaildEvent");
					}
				},
				error : function() {
					$.toast("验证码异常，请稍候再试");
					$.loadclose();

				}
			});

		},
		CardVaild : function() {//卡片进度验证
			var cardid = this.get("cardid");
			var searchMsgCode = this.get("searchMsgCode");
			if (!common.isCardID(cardid)) {
				$.toast("请输入正确的身份证号");
				return false;
			}
			var $this = this;
			$.ajax({
				url : "./hf/getValiCode",
				type : "get",
				data : {},
				success : function(res) {
					if (searchMsgCode != res) {
						$.toast("请输入正确的验证码");
					} else {
						$this.trigger("CardVaildEvent");
					}
				},
				error : function() {
					$.toast("验证码异常，请稍候再试");
					$.loadclose();

				}
			});

		},

		querycardList : function() {//获取卡片列表
			var data = this.attributes;
			var o = this;
			$.ajax({
				url : "./hf/getspeed",
				type : "post",
				dataType : "json",
				data : {
					"cardid" : data.cardid+""
				},
				success : function(res) {
					
					o.set("cardlist", res);
					o.trigger("cardListEvent");
					if (!o.get("loadbool")) {
						o.set("loadbool", true);
					} else {
						$.loadclose();
					}

				},
				error : function() {
					$.toast("办卡进度查询异常，请稍候再试");
					$.loadclose();
				}
			});
		},
		queryEmsList : function() {//获取ems列表
			var data = this.attributes;
			var o = this;
			$.ajax({
				url : "./hf/getEMS",
				type : "post",
				dataType : "json",
				data : {
					"emailId" : data.emscode+""
				},
				success : function(res) {
					
					o.set("emslist", res);
					o.trigger("emsNext");
					if (!o.get("loadbool")) {
						o.set("loadbool", true);
					} else {
						$.loadclose();
					}

				},
				error : function() {
					$.toast("EMS查询异常，请稍候再试");
					$.loadclose();
				}
			});
		},
		queryIcmsList : function() {//获取icms列表
			var data = this.attributes;
			var o = this;
			$.ajax({
				url : "./hf/getICMS ",
				type : "post",
				dataType : "json",
				data : {
					"emailId" : data.icmscode
				},
				success : function(res) {
					
					o.set("icmslist", res);
					o.trigger("icmsNext");
					if (!o.get("loadbool")) {
						o.set("loadbool", true);
					} else {
						$.loadclose();
					}

				},
				error : function() {
					$.toast("ICMS查询异常，请稍候再试");
					$.loadclose();
				}
			});
		},
	});
	return scheduleModel;
});