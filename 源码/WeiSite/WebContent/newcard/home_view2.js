define([ 'text!../newcard/home_tpl2.html', "iscroll","areamain"], function(tpl, iscroll,areamain) {
	var scroll;
	var homeView = Backbone.View.extend({
		el : '#container',

		events : {
			"tap #nextstepthree":"stepClickThree",
			"tap #home2back" : "backClick",
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
                'trigger': '#coAddress', //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
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
				$("#coPhone").val("");
				$("#coPhone").val(arr[0]["areaCode"]+"-");
				$("#coPostalcode").val("");
				$("#coPostalcode").val(arr[0]["postcode"]);
			};
            $.loadclose();
		},
		originalData:function(){
			var o=this.model;
			if(o.get("coAddress1")!=""&&o.get("coAddress1")!=null){
				$("#coAddress").val(o.get("coAddress"));
				$("#coAddress1").val(o.get("coAddress1"));
				$("#coPhone").val(o.get("coPhone"));
				$("#coPostalcode").val(o.get("coPostalcode"));
				$("#coNatureClass").val(o.get("coNatureClass"));
				$("#coSalary").val(o.get("coSalary"));
			}
		},
		backClick:function(){
			this.trigger('home2back');
		},
		stepClickThree:function(e){
			// 数据提交
			var $this=this;
			var o=$this.model;
			o.set("coAddress",$.trim($("#coAddress").val()));
			o.set("coAddress1",$.trim($("#coAddress1").val()));
			o.set("coPhone",$.trim($("#coPhone").val()));
			o.set("coPostalcode",$.trim($("#coPostalcode").val()));
			o.set("coNatureClass",$.trim($("#coNatureClass").val()));
			o.set("coSalary",$.trim($("#coSalary").val()));
			// // dosome
				if ($this.model.home2Vail()) {// 数据校验
					setTimeout(function() {	
					$.loading();
					$this.trigger("home2next");					
					},500);
				}
		}
	});
	return homeView;
});