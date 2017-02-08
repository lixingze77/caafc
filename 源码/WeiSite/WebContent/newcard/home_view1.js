define([ 'text!../newcard/home_tpl1.html', "iscroll","areamain"], function(tpl, iscroll,areamain) {
	var scroll;
	var homeView = Backbone.View.extend({
		el : '#container',

		events : {
			"tap #nextStepTwo":"stepClickTwo",
			"tap #home1back" : "backClick",
		},

        initialize: function () {
        },
		template : _.template(tpl),
		render : function() {// 在这里定义页面的中的属性
 			var $tpl = $(this.template());
			this.$el.html($tpl);// 将模版中的内容替换到页面中的指定DIV中
			// animInfinite
			// q启动滚动条
			scroll = new IScroll('#plus_step1', {
				fadeScrollbars : false,
				click : true
			// 允许点击
			});
			$(window).trigger('resize');
			document.addEventListener('touchmove', function(e) {
				e.preventDefault();
			}, false);
			$(".mui-btn").highlight("mui-active");	
			var o=this.model;
            //下拉城市
            var area1 = new LArea();
            area1.init({
                'trigger': '#faAddress', //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
                'valueTo': '#value1', //选择完毕后id属性输出到该位置
                'keys': {
                    id: 'id',
                    name: 'name'
                }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
                'type': 1, //数据源类型
                'data': this.model.citys//数据源
            });
            area1.value=[27,16,7];//控制初始位置，注意：该方法并不会影响到input的value
            this.originalData();
			area1.change = function(val,text){
				var code=val.split(",");
				var arr=area1.getNodeById(code[code.length-1]);
				$("#faPhone").val("");
				$("#faPhone").val(arr[0]["areaCode"]+"-");
				$("#faPostalcode").val("");
				$("#faPostalcode").val(arr[0]["postcode"]);
			};
            $.loadclose();
		},
		originalData:function(){
			var o=this.model;
			if(o.get("faNature")!=""&&o.get("faNature")!=null){
				$("#faAddress").val(o.get("faAddress"));
				$("#faAddress1").val(o.get("faAddress1"));
				$("#faNature").val(o.get("faNature"));
				$("#faPhone").val(o.get("faPhone"));
				$("#faPostalcode").val(o.get("faPostalcode"));
				$("#faGohouse").val(o.get("faGohouse"));
				$("#apMarriage").val(o.get("apMarriage"));
				$("#coName").val(o.get("coName"));
				$("#coDepartment").val(o.get("coDepartment"));
				$("#coJob").val(o.get("coJob"));
				$("#coBeginY").val(o.get("coBeginY"));
			}
		},
		backClick:function(){
			this.trigger("home1back");
		},
		stepClickTwo:function(e){
			// 数据提交
			var $this=this;
			var o=$this.model;
			o.set("faAddress",$.trim($("#faAddress").val()));
			o.set("faAddress1",$.trim($("#faAddress1").val()));
			o.set("faNature",$.trim($("#faNature").val()));
			o.set("faPhone",$.trim($("#faPhone").val()));
			o.set("faPostalcode",$.trim($("#faPostalcode").val()));
			o.set("faGohouse",$.trim($("#faGohouse").val()));
			o.set("apMarriage",$.trim($("#apMarriage").val()));
			o.set("coName",$.trim($("#coName").val()));
			o.set("coDepartment",$.trim($("#coDepartment").val()));
			o.set("coJob",$.trim($("#coJob").val()));
			o.set("coBeginY",$.trim($("#coBeginY").val()));
			// // dosome
			if (this.model.home1Vail()) {// 数据校验
				setTimeout(function() {				
				$.loading();
				$this.trigger("home1next");
				},500);
			}
		}
	});
	return homeView;
});