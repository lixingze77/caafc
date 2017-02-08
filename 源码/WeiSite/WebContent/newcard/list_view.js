define([ 'text!../newcard/list_tpl.html', "iscroll","areamain"], function(tpl, iscroll,areamain) {
	var scroll;
	var homeView = Backbone.View.extend({
		el : '#container',

		events : {
			"tap #savestep":"savestepClick",
			"tap #listback" : "backClick",
			"tap #baseinfobtn":"toBaseinfo",
			"tap #home1btn":"toHome1",
			"tap #home2btn":"toHome2",
			"tap #perfectedbtn":"toPerfected",
		},
        initialize: function () {
			this.model.on('finish', this.finish, this);
			this.model.on('listerror',this.error,this);
        },
		template : _.template(tpl),
		render : function() {// 在这里定义页面的中的属性
			var field=this.model.get("field");
			var fieldbool;
			if(field==""){
				fieldbool=true;
			}else{
				fieldbool=false;
			}
 			var $tpl = $(this.template({"bool":fieldbool}));
			this.$el.html($tpl);// 将模版中的内容替换到页面中的指定DIV中
			// q启动滚动条
			scroll = new IScroll('#plus_step1', {
				fadeScrollbars : false,
				click : true
			// 允许点击
			});
			// animInfinite
			$(window).trigger('resize');
			document.addEventListener('touchmove', function(e) {
				e.preventDefault();
			}, false);
			$(".mui-btn").highlight("mui-active");	
			this.initlist();
			$.loadclose();
		},
		initlist:function(){
			var o=this.model;
			$("#apName").html(o.get("apName"));
			$("#apIdNbr").html(o.get("apIdNbr"));
			$("#apMobile").html(o.get("apMobile"));
			$("#apSpell").html(o.get("apSpell"));
			var sex=o.get("apSex");
			if(sex=="M"){
				$("#apSex").html("男");
			}else if(sex=="F"){
				$("#apSex").html("女");
			}
			$("#apEmail").html(o.get("apEmail"));
			$("#recomId").html(o.get("recomId"));
			$("#actiCode").html(o.get("actiCode"));
			$("#faAddress").html(o.get("faAddress"));
			$("#faAddress1").html(o.get("faAddress1"));
			var faNature=o.arrfaNature[o.get("faNature")];
			$("#faNature").html(faNature);
			$("#faPhone").html(o.get("faPhone"));
			$("#faGohouse").html(o.get("faGohouse"));
			$("#faPostalcode").html(o.get("faPostalcode"));
			var apMarriage=o.arrapMarriage[o.get("apMarriage")];
			$("#apMarriage").html(apMarriage);
			$("#coName").html(o.get("coName"));
			$("#coDepartment").html(o.get("coDepartment"));
			var coJob=o.arrcoJob[o.get("coJob")];
			$("#coJob").html(coJob);
			$("#coyear").html(o.get("coBeginY"));
			$("#coAddress").html(o.get("coAddress"));
			$("#coAddress1").html(o.get("coAddress1"));
			$("#coPhone").html(o.get("coPhone"));
			$("#coPostalcode").html(o.get("coPostalcode"));
			var coNatureClass=o.arrcoNatureClass[o.get("coNatureClass")];
			$("#coNatureClass").html(coNatureClass);
			$("#coSalary ").html(o.get("coSalary"));
			var apEducation=o.arrapEducation[o.get("apEducation")];
			$("#apEducation ").html(apEducation);
			var hasCar=o.arrhasCar[o.get("hasCar")];
			$("#hasCar").html(hasCar);
			if(hasCar=="是"){
				$("#carid ").html(o.get("carMark"));
			}
			$("#kiName ").html(o.get("kiName"));
			var kiRelation=o.arrkiRelation[o.get("kiRelation")];
			$("#kiRelation ").html(kiRelation);
			$("#kiFaMobile ").html(o.get("kiFaMobile"));
			$("#boName ").html(o.get("boName"));
			var boRelation=o.arrboRelation[o.get("boRelation")];
			$("#boRelation ").html(boRelation);
			$("#boFaMobile ").html(o.get("boFaMobile"));
			var method=o.get("baCardRec");
			if(method=="C"){
				$("#baCardRec ").html("单位地址");
			}else if(method=="F"){
				$("#baCardRec ").html("住宅地址");
			}
			$("#method ").html(o.get("method"));
			var debitcard=o.arrdebitcard[o.get("debitcard")];
			$("#debitcard ").html(debitcard);
			if(debitcard=="是"){
				$("#cardId ").html(o.get("cardId"));
				var cardAge=o.arrcardAge[o.get("cardAge")];
				$("#cardAge ").html(cardAge);
			}	
			$("#partner ").html(o.get("partner"));
		},
		backClick:function(){
			$.loading();
			this.trigger("listback");
		},
		savestepClick:function(){
			$.loading();
			this.model.submit();
		},
		error:function(){
			$.loading();
			this.trigger("listerrornext");
		},
		finish : function() {
			$.loading();
			this.trigger("listsuccessnext");
		},
		toBaseinfo:function(){
			$.loading();
			this.trigger("listtobaseinfo");
		},
		toHome1:function(){
			$.loading();
			this.trigger("listtohome1");
		},
		toHome2:function(){
			$.loading();
			this.trigger("listtohome2");
		},
		toPerfected:function(){
			$.loading();
			this.trigger("listtoperfected");
		},
	});
	return homeView;
});