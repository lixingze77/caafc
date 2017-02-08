define([ 'text!../newcarderror/tpl.html', "iscroll"], function(tpl, iscroll) {
	var scroll;
	var newcarderrorView = Backbone.View.extend({
		el : '#container',

		events : {
			
		},

        initialize: function () {
        },
		template : _.template(tpl),
		render : function() {// 在这里定义页面的中的属性
 			var $tpl = $(this.template());
			this.$el.html($tpl);// 将模版中的内容替换到页面中的指定DIV中
			// animInfinite
			// q启动滚动条
			scroll = new IScroll('#new_step1', {
				fadeScrollbars : false,
				click : true
			// 允许点击
			});
			$(window).trigger('resize');
			document.addEventListener('touchmove', function(e) {
				e.preventDefault();
			}, false);
			$(".mui-btn").highlight("mui-active");
						
			this.header.showLeft();
			this.header.onback();
			this.showresult();
		},
		showresult:function(){
			var o=this.model;
			var result=o.get("result");
			var word;
			if(result=="2"){
				 word="您已经拥有我行的信用卡，不能再申请新的信用卡，点击下面按钮回到首页。";
			}else{
				 word="审核不通过，您无法申请我行的信用卡，点击下面按钮回到首页";
			}
			$("#result").find("h3").append(word);
		},
	});
	return newcarderrorView;
});