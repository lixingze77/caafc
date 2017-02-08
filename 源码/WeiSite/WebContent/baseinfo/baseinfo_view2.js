define([ 'text!../baseinfo/baseinfo_tpl2.html', "iscroll" ],
		function(tpl,iscroll) {
			var scroll;
			var cardlistView = Backbone.View
					.extend({
						el : '#container',

						events : {
							//卡片选择事件
							"tap #return_mainBtn" : "returnClick",
							"tap #list_recommend" : "list_recommendClick",
						},

						initialize : function() {
							/*this.lastView = new View({
								model : this.model

							});*/
							this.model.on('finishSet', this.finishSetClick, this);
						},
						template : _.template(tpl),
						render : function() {
							
							// 在这里定义页面的中的属性
							var $tpl = $(this.template());
							this.$el.html($tpl);// 将模版中的内容替换到页面中的指定DIV中
							// animInfinite
								// 启动滚动条
							var img=new Image();
							img.src="./img/Card1.jpg";
							img.onload=function(){
								scroll = new IScroll('#baseinfo', {
									fadeScrollbars : false,
									click : true
								// 允许点击
								});
								}
							
							$(window).trigger('resize');
							document.addEventListener('touchmove', function(e) {
								e.preventDefault();
							}, false);
							$(".mui-btn").highlight("mui-active");
						
						},
						returnClick : function() {
							this.trigger('back');
							this.trigger('changeCard');
							this && this.undelegateEvents();// 销毁所有监听
						},
						
						list_recommendClick : function(e) {
							var imgUrl=$(e.currentTarget).find("img").attr("src")
							var introduce=$(e.currentTarget).find(".img_text").html();
							var id=$(e.currentTarget).attr("data-id");
							var o = this.model;
							o.setCard(id);
						},
						finishSetClick:function(){
							//销毁view2
							this && this.undelegateEvents();
							//trigger('changeCard')
							this.trigger('back');
							this.trigger('changeCard');
							
						}
						
						

					});
			return cardlistView;
		});