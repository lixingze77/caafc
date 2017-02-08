define([ 'text!../recommend/recommend_main.html','../recommend/recommend_card_view','../recommend/recommend_search_view1','iscroll'], function(tpl,View,SearchView,iscroll) {
	var scroll;
	var recommendView = Backbone.View.extend({
		el : '#container',

		events : {
			"tap #recommendBtn" : 'recommendCard',
			"tap #recommend_bibleBtn" : 'recommendBible',
			"tap #recommend_searchBtn" : 'recommendSearch',
			"tap #main_back" : "backmainClick",
			"tap #activity_terms" : "activityTermsClick",
			"tap #close" : "closeTextClick",
		},
		init : function() {
			this.delegateEvents();
			this.render();
		},
        initialize: function () {
        	this.cardView = new View({
				model : this.model

			});
        	 this.searchview = new SearchView({
				model : this.model,
				
			});
        	this.cardView.on('cardback', this.init, this);
        	this.searchview.on('searchback', this.init, this);
        },
		template : _.template(tpl),
		render : function() {// 在这里定义页面的中的属性
 			var $tpl = $(this.template());
			this.$el.html($tpl);// 将模版中的内容替换到页面中的指定DIV中
			// animInfinite
			$(".mui-btn").highlight("mui-active");
			
			$.loadclose();
		},
		activityTermsClick:function(){
			$("#text-inner1").show();
			$("#text-inner2").hide();
			$(".hf-text-mask").show();
			$(".hf-text-box").show();
			$("#content").hide();
			$("header").hide();
			var textScroll = new IScroll('#hf-text', {
				fadeScrollbars : false,
				click : true
			// 允许点击
			});
		},
		closeTextClick : function() {
			$(".hf-text-mask").hide();
			$(".hf-text-box").hide();
			$("#content").show();
			$("header").show();
		},
		backmainClick : function() {
			location.hash = "#home";

		},
		recommendCard : function() {
			$.loading();
			this && this.undelegateEvents();// 销毁所有监听
			var e=this;
			setTimeout(function() {
				e.cardView.render(); // 跳转至下一步页面
				e.cardView.delegateEvents();
			}, 500)
			
		},
		recommendBible:function(){
			$("#text-inner2").show();
			$("#text-inner1").hide();
			$(".hf-text-mask").show();
			$(".hf-text-box").show();
			$("#content").hide();
			$("header").hide();
			var textScroll = new IScroll('#hf-text', {
				fadeScrollbars : false,
				click : true
			// 允许点击
			});
	
		},
		recommendSearch:function(){
			$.loading();
			this.searchview.render(); // 利用Model定义的默认属性初始化界面	
			this.searchview.delegateEvents();
		}
		
	});
	return recommendView;
});