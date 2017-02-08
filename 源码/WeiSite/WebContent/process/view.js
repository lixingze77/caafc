define([ 'text!../process/tpl.html', "iscroll"], function(tpl, iscroll) {
	var scroll;
	var loginView = Backbone.View.extend({
		el : '#container',

		events : {
			"tap #close":'click'
		},

        initialize: function () {
        },
		template : _.template(tpl),
		render : function() {// 在这里定义页面的中的属性
 			var $tpl = $(this.template());
			this.$el.html($tpl);// 将模版中的内容替换到页面中的指定DIV中
			// animInfinite
			// q启动滚动条
			scroll = new IScroll('#tpl_btn', {
				fadeScrollbars : false,
				click : true
			// 允许点击
			});
			$(window).trigger('resize');
			document.addEventListener('touchmove', function(e) {
				e.preventDefault();
			}, false);
			$(".mui-btn").highlight("mui-active");
			this.loadimg();
		},
		loadimg:function(){
			var box=$("<div></div>");
			var imgarr=$("#imgdiv").find("img");
			if(imgarr.length>0){
				var src=$(imgarr).attr("src");
				var img=new Image();
				img.src=src;
				img.onload=function(){
					scroll.refresh();
				};
			}
		},
		click : function() {
			location.hash = "#home";
		},
	});
	return loginView;
});