define([ 'common' ], function(common) {
	var homeModel = Backbone.Model.extend({

		urlRoot : "../save/0",
		initialize : function() {

			this.bind("error", function(model, error) {
				$.toast(error);
			});
		},
		arrfaNature : {
			A : "经济适用住房",
			B : "廉租房",
			C : "房改房",
			D : "安居房",
			E : "集资房",
			F : "商品房",
			G : "限价房",
			H : "别墅",
			I : "商铺",
			Z : "其他"
		},
		arrapMarriage : {
			C : "已婚有子女",
			M : "已婚无子女",
			S : "未婚",
			W : "丧偶",
			D : "离异",
			O : "其他"
		},
		arrcoJob : {
			A : "高层管理人员",
			B : "中层管理人员",
			C : "基层管理人员",
			D : "一般员工",
			E : "内勤",
			F : "后勤",
			G : "工人",
			H : "销售/中介/业务代表",
			I : "营业员/服务员",
			J : "正部级",
			K : "副部级",
			L : "正厅级",
			M : "副厅级",
			N : "正处级",
			O : "副处级",
			P : "正科级",
			Q : "副科级",
			R : "正股级",
			S : "副股级",
			Z : "其他"
		},
		arrcoNatureClass : {
			S : "政府/社团",
			Q : "医疗",
			P : "教育",
			T : "军事/公检法",
			D : "公共事业",
			J : "金融",
			L : "商贸",
			G : "高科技",
			C : "制造",
			F : "运输",
			O : "服务/咨询",
			M : "专业事务所",
			R : "传媒/体育/娱乐",
			I : "酒店/旅游/餐饮",
			K : "建筑/地产",
			Z : "其他"
		},
		arrapEducation : {
			A : "博士及以上",
			B : "硕士",
			C : "本科",
			D : "大专",
			E : "中专及技校",
			F : "高中",
			G : "初中及以下"
		},
		arrkiRelation : {
			C : "配偶",
			D : "父母",
			H : "子女",
			X : "兄弟姐妹"
		},
		arrboRelation : {
			C : "配偶",
			D : "父母",
			H : "子女",
			X : "兄弟姐妹"
		},
		arrcardAge : {
			M : "全额",
			F : "最低"
		},
		arrhasCar : {
			Y : "是",
			N : "否"
		},
		arrdebitcard : {
			Y : "是",
			N : "否"
		},
		defaults : function() {// 定义的数据模型，将查询到的数据添加到数据模型中
			return {

				cityName : "北京",// 城市名称
				productGrade : "",// 卡等级（种类）
				baAporigin : "02",// 申请来源 微信进件
				isIndependent : "B",// 申请类型
				apName : "",// 申请人姓名
				city : "",// 本人所在城市
				apIdNbr : "",// 证件号码
				apIdType : "I",// 证件类型
				apMobile : "",// 手机号
				msgCode : "",// 验证码
				checkbox : false,// 协议

				apSpell : "",// 汉语拼音
				listSpell : "",// 所有的拼音字符串
				apSex : "",// 性别
				productCode : "",// 产品代码
				cardNbrUpload : "",// 上传产品代码
				apNationality : "CN",// 国籍
				submmitType : 1,// 提交类型
				apEmail : "",// 邮箱
				recomId : "",// 推荐码
				actiCode:"",//特邀活动码
				productType : "",// 卡片类型
				productImgUrl : "",// 卡片地址
				productFunction : "",// 卡片介绍

				faAddress : "",// 住宅地址 住宅省
				faAddress2 : "",// 住宅市
				faAddress3 : "",// 住宅区
				faAddress4 : "",// 住宅详细地址
				faAddress1 : "",// 住宅的详细地址
				faNature : "",// 住宅性质
				faPhone : "",// 住宅电话
				faPostalcode : "",// 邮政编码
				faGohouse:"",//现住宅居住时间
				apMarriage : "",// 婚姻状态
				coName : "",// 公司姓名
				coDepartment:"",//部门
				coJob : "",// 职务
				coBeginY : "",// 工作年限

				coAddress : "",// 单位地址 单位省
				coAddress1 : "",// 单位详细地址
				coAddress2 : "",// 单位市
				coAddress3 : "",// 单位区
				coAddress4 : "",// 单位详细地址
				coPhone : "",// 单位电话
				coPostalcode : "",// 单位邮编
				coNatureClass : "",// 行业类别
				coNature : "L",// 单位类别
				coSalary : "",// 个人年收入

				apEducation : "",// 教育程度
				hasCar : "",// 是否拥有汽车
				carMark : "",// 车牌号
				kiName : "",// 亲属姓名
				kiRelation : "",// 亲属关系
				kiFaMobile : "",// 亲属手机
				boName : "",// 联系人姓名
				boRelation : "",// 联系人关系
				boFaMobile : "",// 联系人手机
				baCardRec : "",// 账单以及卡片寄送地址
				debitcard : "",// 是否关联借记卡
				cardId : "",// 借记卡id
				cardAge : "",// 借记卡还款方式
				partner:"",//合作方会员号

				baRec : "U",// 卡片递送地址
				baCardRec : "",// 邮寄地址
				baPost : "C",// 账单寄送方式
				basuppsign : "aa",// 推广补充注记
				fhMobile : "13260513991",// 复核人手机号码
				secBranch : "10111",// 支行结构号
				paOriginType : "K",// 进件类别
				baWay : 001,// 推广方式
				apMuname : "李",// 母亲姓氏
				hasHouse : "N",// 是否有房产
				accDet : "Y",// 接受降级
				imgid : "",// home传过来的cardid
				scardlist:"",//新办卡页面中的卡片
				mcardlist:"",//默认办理的新卡
				field:"",//配置的字段-特邀活动码
			};
		},
		basicVail : function() {
			var apName = this.get("apName");
			var apIdNbr = this.get("apIdNbr");
			var city = this.get("city");
			var apMobile = this.get("apMobile");
			var msgCode = this.get("msgCode");
			var checkbox = this.get("checkbox");
			if (common.isEmpty(apName)) {
				$.toast("请输入姓名");
				return false;
			}
			if(!common.isChinese(apName)){
				$.toast("请输入中文姓名");
				return false;
			}
			if (common.isEmpty(apIdNbr)) {
				$.toast("请输入身份证号码");
				return false;
			}
			if (!common.isCardID(apIdNbr)) {
				$.toast("身份证号码不正确");
				return false;
			}
			if (city == "请选择") {
				$.toast("请选择本人所在城市");
				return false;
			}
			if (common.isEmpty(apMobile)) {
				$.toast("请输入手机号码");
				return false;
			}
			if (!common.isPhone(apMobile)) {
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
			if (checkbox == "false") {
				$.toast("请仔细阅读协议后并勾选");
				return false;
			}
			return true;
		},
		peopleQuery : function() {//身份核查
			var $this = this;
			var id = this.get("apIdNbr");
			var name = this.get("apName");
			var cardid = "";
			$.ajax({
				url : "./hf/police",
				data : {
					"id" : id,
					"name" : name,
					"cardid" : cardid
				},
				type : "post",
				dataType : "json",
				success : function(res) {
					$.loadclose();
					if (res.code == "0000" && res.queryresult == "1") {
						$this.trigger("psuccess");
					} else {
						if (res.queryresult == "2") {
							/* $.toast("您已经办理我行信用卡，无法在申请新卡"); */
							$this.set("queryresult", res.queryresult);
							$this.trigger("perror");
						} else {
							$this.set("queryresult", res.queryresult);
							$this.trigger("perror");
						}
					}
				},
				error : function() {
					$.toast("查询异常，请稍候再试");
					$.loadclose();
				}
			})
		},
		validate : function(attributes) {
			var apEmail = this.get("apEmail");
			var apSpell = this.get("apSpell");
			var apSex = this.get("apSex");
			var recomId = this.get("recomId");
			if (common.isEmpty(apSpell)) {
				$.toast("请选择中文拼音");
				return false;
			}
			if (common.isEmpty(apSex)) {
				$.toast("请选择性别");
				return false;
			}
			if (common.isEmpty(apEmail)) {
				$.toast("请填写邮箱地址");
				return false;
			}
			if (!common.isEmail(apEmail)) {
				$.toast("请输入正确的邮箱地址");
				return false;
			}
			if (!common.isEmpty(recomId)) {
				if (!common.isPhone(recomId)) {
					$.toast("推荐码格式不正确");
					return false;
				}
			}
			return true;
		},
		pinyinList : function() {
			var o = this;
			var name = this.get("apName");
			$.ajax({// 汉语转拼音
				type : "post",
				url : "./pinying/getMsg",
				dataType : "Json",
				data : {
					"name" : name
				},
				success : function(data) {
					// 获取当前拼音
					var pinyinVal = o.get("apSpell");
					// 存储拼音字符
					o.set("listSpell", data.result);
					// 获取列表
					var arry = data.result.split(',');
					for (var i = 0; i < arry.length; i++) {
						$("#pinyin").append(
								"<option value='" + arry[i] + "'>" + arry[i]
										+ "</option>");
					}
				}

			});
		},
		setCard : function(id) {
			// query card list by id
			var cardDiv = $("div[data-productCode='" + id + "']");
			var productImgUrl = cardDiv.children().find("img").attr("src");
			var productFunction = cardDiv.children(".img_text").html();
			var productGrade = cardDiv.attr("data-grade");
			var o = this;
			o.set({
				"productImgUrl" : productImgUrl,
				"productFunction" : productFunction,
				"productCode" : id,
				"cardNbrUpload" : id,
				"productGrade" : productGrade,
			});
			this.trigger("finishSet");
	    },
		home1Vail : function() {
			var faAddress = this.get("faAddress");
			var faAddress1 = this.get("faAddress1");
			var faNature = this.get("faNature");
			var faPostalcode = this.get("faPostalcode");
			var apMarriage = this.get("apMarriage");
			var coName = this.get("coName");
			var coDepartment=this.get("coDepartment");
			var coJob = this.get("coJob");
			var coBeginY = this.get("coBeginY");
			var faPhone = this.get("faPhone");
			var faGohouse=this.get("faGohouse");
			if (common.isEmpty(faAddress)) {
				$.toast("请选择住宅地址");
				return false;
			}
			if (common.isEmpty(faAddress1)) {
				$.toast("请输入住宅详细地址");
				return false;
			}
			if (common.isEmpty(faNature)) {
				$.toast("请选择住宅性质");
				return false;
			}
			if (common.isEmpty(faGohouse)) {
				$.toast("请填写住宅期限");
				return false;
			}
			if (common.isEmpty(faPhone)) {
				$.toast("请输入住宅电话");
				return false;
			}
			if (!common.isTell(faPhone)) {
				$.toast("住宅电话格式不对");
				return false;
			}
			if (!common.isEmpty(faPostalcode)) {
				if (!common.isPostCode(faPostalcode)) {
					$.toast("邮政编码不正确");
					return false;
				}
			}
			if (common.isEmpty(apMarriage)) {
				$.toast("请选择婚姻状况");
				return false;
			}
			if (common.isEmpty(coName)) {
				$.toast("请输入单位名称");
				return false;
			}
			if (common.isEmpty(coDepartment)) {
				$.toast("请输入所在单位部门");
				return false;
			}
			if (common.isEmpty(coJob)) {
				$.toast("请选择您的职务");
				return false;
			}
			if (common.isEmpty(coBeginY)) {
				$.toast("请输入工作年限");
				return false;
			}
			return true;
		},
		home2Vail : function() {
			var coAddress = this.get("coAddress");
			var coAddress1 = this.get("coAddress1");
			var coPhone = this.get("coPhone");
			var coNatureClass = this.get("coNatureClass");
			var coSalary = this.get("coSalary");
			var coPostalcode = this.get("coPostalcode");
			if (common.isEmpty(coAddress1)) {
				$.toast("请选择单位详细地址");
				return false;
			}
			if (common.isEmpty(coPhone)) {
				$.toast("请输入单位电话");
				return false;
			}
			if (!common.isTell(coPhone)) {
				$.toast("单位电话格式不对");
				return false;
			}
			if (!common.isEmpty(coPostalcode)) {
				if (!common.isPostCode(coPostalcode)) {
					$.toast("邮政编码不正确");
					return false;
				}
			}
			if (common.isEmpty(coNatureClass)) {
				$.toast("请选择行业类别");
				return false;
			}
			if (common.isEmpty(coSalary)) {
				$.toast("请输入年收入");
				return false;
			}
			if (!common.isMoney(coSalary)) {
				$.toast("年收入只能是正整数");
				return false;
			}
			var reg = /^\d{1,4}$/;
			if (!reg.test(coSalary)) {
				$.toast("年收入超过了位数限制");
				return false;
			}
			return true;
		},
		perfectedVail : function() {
			var $this=this;
			var apEducation = this.get("apEducation");
			var hasCar = this.get("hasCar");
			var carMark = this.get("carMark");
			var kiName = this.get("kiName");
			var kiRelation = this.get("kiRelation");
			var kiFaMobile = this.get("kiFaMobile");
			var boName = this.get("boName");
			var boRelation = this.get("boRelation");
			var boFaMobile = this.get("boFaMobile");
			var baCardRec = this.get("baCardRec");
			if (common.isEmpty(apEducation)) {
				$.toast("请选择教育程度");
				return false;
			}
			if (common.isEmpty(hasCar)) {
				$.toast("请选择是否拥有车辆");
				return false;
			}
			if (hasCar == "Y") {
				if (common.isEmpty(carMark)) {
					$.toast("请输入车牌号");
					return false;
				}
				 carMark=carMark.toUpperCase();
				 $this.set("carMark",carMark);
				if(!common.isCarId(carMark)){
					$.toast("请输入正确的车牌号");
					return false;
				}
			}
			if (common.isEmpty(kiName)) {
				$.toast("请输入亲属姓名");
				return false;
			}
			if (common.isEmpty(kiRelation)) {
				$.toast("请选择亲属关系");
				return false;
			}
			if (common.isEmpty(kiFaMobile)) {
				$.toast("请输入亲属手机");
				return false;
			}
			if (!common.isPhone(kiFaMobile)) {
				$.toast("亲属手机格式不对");
				return false;
			}
			if (common.isEmpty(boName)) {
				$.toast("请输入联系人姓名");
				return false;
			}
			if (common.isEmpty(boRelation)) {
				$.toast("请选择联系人关系");
				return false;
			}
			if (common.isEmpty(boFaMobile)) {
				$.toast("请输入联系人手机");
				return false;
			}
			if (!common.isPhone(boFaMobile)) {
				$.toast("联系人手机格式不对");
				return false;
			}
			if (common.isEmpty(baCardRec)) {
				$.toast("请选择寄送地址");
				return false;
			}
			return true;
		},
		queryField : function() {// 查询申请字段			
			var $this = this;
			$.ajax({
				url : "./hf/field",
				type : "post",
				dataType : "json",
				success : function(res) {
					$this.set("field",res);
				},
				error : function() {
					console.log("error");
				}
			});
		},
		queryCity : function() {// 查询城市列表信息
			
			var $this = this;
			$.ajax({
				url : "./hf/city",
				data : {},
				type : "post",
				dataType : "json",
				success : function(res) {

					$this.citys = res;
					$this.trigger("cityLoad");
				},
				error : function() {
					// $.toast("查询异常，请稍候再试");
					$this.citys = [];
					$this.trigger("cityLoad");
				}
			});
		},
		queryCardList : function() {// 查询卡片信息
			var data = this.attributes;
			var o = this;
			if (o.get("productCode") == null || o.get("productCode") == "null")
          		o.set("productCode", "");
			$.ajax({
				url : "./hf/product",
				type : "post",
				dataType : "json",
				success : function(res) {
					$.loadclose();
					o.set("cardlist", res);
				},
				error : function() {
					$.toast("查询异常，请稍候再试");
					$.loadclose();
				}
			});
		},
		submit : function() {
			var $this = this;
			var cardType=$this.get("productGrade");
			$this.set("cardType",cardType);
			var faAddress = this.get("faAddress");
			var listfa = faAddress.split(",");
			this.set("faAddress", listfa[0]);
			if(listfa[1]==null){
				this.set("faAddress2", "空");
			}else{
				this.set("faAddress2", listfa[1]);
			}
			if(listfa[2]==null){
				this.set("faAddress3","空");
			}else{
				this.set("faAddress3", listfa[2]);
			}
			this.set("faAddress4", this.get("faAddress1"));
			var coAddress = this.get("coAddress");
			var listco = coAddress.split(",");
			this.set("coAddress", listco[0]);
			if(listco[1]==null){
				this.set("coAddress2", "空");
			}else{
				this.set("coAddress2", listco[1]);
			}
			if(listco[2]==null){
				this.set("coAddress3","空");
			}else{
				this.set("coAddress3", listco[2]);
			}
			this.set("coAddress4", this.get("coAddress1"));
			var debitcard=$this.get("debitcard");
			var hascard=$this.get("hasCar");
			if(debitcard=="N"){
				$this.set("cardId","");
				$this.set("cardAge","");
			}
			if(hascard=="N"){
				$this.set("carid","");
			}
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
						$this.trigger("finish");// 触发model监听事件
					} else {
						$this.trigger("listerror");
/*						$.toast("新卡申请失败");*/
					}
				},
				error : function() {
					$.loadclose();
					$this.trigger("error");
				}
			})
		}
	});
	return homeModel;
});