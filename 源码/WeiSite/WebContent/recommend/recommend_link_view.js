define([ 'text!../recommend/recommend_link.html', "iscroll" ], function(tpl, iscroll) {
	var scroll;

	var indexView = Backbone.View.extend({
		el : '#container',

		events : {
			"tap #link_back" : "backLinkClick",
			"tap #returnHomePageBtn" : "returnHomePageClick",
			"tap #smsShare" : "ShareClick",
			"tap #wechatShare" : "ShareClick"
		},

		initialize : function(param) {
			
		},
		template : _.template(tpl),
		render : function() {
			var $tpl = $(this.template());
			this.$el.html($tpl);
			// animInfinite
			// q启动滚动条
			var img=new Image();
			img.src="./img/invitegift.png";
			img.onload=function(){
			scroll = new IScroll('#recommend_link', {
				fadeScrollbars : false,
				click : true
			// 允许点击
			});
			}
			$(window).trigger('resize');
			document.addEventListener('touchmove', function(e) {
				e.preventDefault();
			}, false);
			$.loadclose();
		},
	
		backLinkClick : function() {
		
			this.trigger('linkback');
			this && this.undelegateEvents();// 销毁所有监听
			

		},
		returnHomePageClick : function() {
			this && this.undelegateEvents();// 销毁所有监听
			location.hash = "#home";
		}
		,
		ShareClick:function(){
			$.toast("链接已分享");
		}

	});

	return indexView;
});