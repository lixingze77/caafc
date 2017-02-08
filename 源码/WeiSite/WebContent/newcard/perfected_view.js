define([ 'text!../newcard/perfected_tpl.html', "iscroll","areamain"], function(tpl, iscroll,areamain) {
	var scroll;
	var homeView = Backbone.View.extend({
		el : '#container',

		events : {
			"tap #stepClickFour":"stepClickFour",
			"tap #perfectedback" : "backClick",
			"change #hasCar":"selectcar",
			"change #debitcard":"selectdebitcard",
		},
        initialize: function () {
        },
		template : _.template(tpl),
		render : function() {// 在这里定义页面的中的属性
 			var $tpl = $(this.template());
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
            this.originalData();
            $.loadclose();
		},
		originalData:function(){
			var o=this.model;
			if(o.get("apEducation")!=""&&o.get("apEducation")!=null){
				$("#apEducation").val(o.get("apEducation"));
				$("#hasCar").val(o.get("hasCar"));
				$("#carMark").val(o.get("carMark"));
				$("#kiName").val(o.get("kiName"));
				$("#kiRelation").val(o.get("kiRelation"));
				$("#kiFaMobile").val(o.get("kiFaMobile"));
				$("#boName").val(o.get("boName"));
				$("#boRelation").val(o.get("boRelation"));
				$("#boFaMobile").val(o.get("boFaMobile"));
				$("#baCardRec").val(o.get("baCardRec"));
				$("#debitcard").val(o.get("debitcard"));
				$("#cardId").val(o.get("cardId"));
				$("#cardAge").val(o.get("cardAge"));
				$("#partner").val(o.get("partner"));
				if(o.get("hasCar")=="Y"){
					$("#carnum").show();
					scroll.refresh();
				}
				if(o.get("debitcard")=="Y"){
					$("#cardnum").show();
					$("#ways").show();
					scroll.refresh();
				}
			}
		},
		stepClickFour:function(e){
			// 数据提交
			var $this=this;
			var o=this.model;
			o.set("apEducation",$.trim($("#apEducation").val()));
			o.set("hasCar",$.trim($("#hasCar").val()));
			o.set("kiName",$.trim($("#kiName").val()));
			o.set("kiRelation",$.trim($("#kiRelation").val()));
			o.set("kiFaMobile",$.trim($("#kiFaMobile").val()));
			o.set("boName",$.trim($("#boName").val()));
			o.set("boRelation",$.trim($("#boRelation").val()));
			o.set("boFaMobile",$.trim($("#boFaMobile").val()));
			o.set("baCardRec",$.trim($("#baCardRec").val()));
			o.set("debitcard",$.trim($("#debitcard").val()));
			o.set("carMark",$.trim($("#carMark").val()));
			o.set("cardId",$.trim($("#cardId").val()));
			o.set("cardAge",$.trim($("#cardAge").val()));
			o.set("partner",$.trim($("#partner").val()));
			// // dosome
			if (this.model.perfectedVail()) {// 数据校验
				setTimeout(function() {	
				$.loading();
				$this.trigger("perfectednext");
				},500);
			}
		},
		backClick:function(){
			this.trigger("perfectedback");
		},
		selectcar:function(){
			var car=$("#hasCar").val();
			if(car=="Y"){
				$("#carnum").show();
				scroll.refresh();
			}else{
				$("#carnum").hide();
				scroll.refresh();
			}
		},
		selectdebitcard:function(){
			var card=$("#debitcard").val();
			if(card=="Y"){
				$("#cardnum").show();
				$("#ways").show();
				scroll.refresh();
			}else{
				$("#cardnum").hide();
				$("#ways").hide();
				scroll.refresh();
			}
		},
	});
	return homeView;
});