define([ 'text!../baseinfo/baseinfo_tpl1.html',	'../baseinfo/baseinfo_view2' , "iscroll" ],
		function(tpl,View,iscroll) {
			var scroll;
			var baseinfoView = Backbone.View
					.extend({
						el : '#container',

						events : {
							"tap #pinyin" : 'pinyinclick',
							"tap #changecardBtn" : 'openCardListclick',
							"tap #nextstep" : "stepClick",
							"tap #back_mainBtn" : "backClick",

						},

						initialize : function(param) {
							// console.log(param);
							 var o = this.model;
							 o.setCard(1);
							this.cardListView = new View({
								model : this.model

							});
							
							this.cardListView.on('back', this.init, this);
							this.cardListView.on('changeCard', this.changeCardRender, this);
							
						},
						changeCardRender:function(){
							
							//渲染卡面信息
							//修改卡界面，图片，介绍
							var o=this.model;
							$("input[name='organizatin']").each(function(){
								
								if(this.value==o.attributes.organizatin){
									$(this).parent().addClass(" mui-checked");
									$(this).parent().siblings().removeClass("mui-checked");
								}
							});
							
							 $("#pinyin option:contains('"+ o.attributes.apSpell+"')").attr("selected", true);  
						    
							$("#eMail").val(o.attributes.apEmail);
							
							$("#recommendCode").val(o.attributes.recomId);
							$("#img_main").attr("src",o.attributes.imgUrl);
							$("#text_main").html(o.attributes.introduce);
							
							//图片与预加载，重新渲染滚动条
							var img=new Image();
							img.src=o.attributes.imgUrl;
							img.onload=function(){
								// 启动滚动条
								scroll = new IScroll('#baseinfo', {
									fadeScrollbars : false,
									click : true
								// 允许点击
								});
							}
						},
						init : function() {
							this.delegateEvents();
							this.render();
						},
						template : _.template(tpl),
						render : function() {// 在这里定义页面的中的属性
							var $tpl = $(this.template());
							this.$el.html($tpl);// 将模版中的内容替换到页面中的指定DIV中
							// animInfinite
							
							$(window).trigger('resize');
							document.addEventListener('touchmove', function(e) {
								e.preventDefault();
							}, false);
							$(".mui-btn").highlight("mui-active");
							
							 $(".mui-radio").on("tap", function() {
					            	if(! $(this).hasClass("mui-checked")){
					            		$(this).addClass("mui-checked");
										 $(this).siblings(".mui-radio").removeClass("mui-checked");
					            	}
					            
					            	});
							 var o = this.model;
							
							 o.pinyinList("俞长");
							 var img=new Image();
								img.src="./img/Card1.jpg";
								img.onload=function(){
									// 启动滚动条
									scroll = new IScroll('#baseinfo', {
										fadeScrollbars : false,
										click : true
									// 允许点击
									});
								}

						},
				
						backClick : function() {
							location.hash = "#home";

						},
						openCardListclick : function() {//打开卡列表
							var o=this.model;
							o.set("apEmail", $.trim($("#eMail").val()));
				 			o.set("apSpell", $.trim($('#pinyin option:selected').text()));
							o.set("organizatin", $(".mui-checked").find("input").val());
							o.set("recomId", $.trim($("#recommendCode").val()));
							this.cardListView.render(); // 跳转至下一步页面
							this.cardListView.delegateEvents();
							
						},
						
						stepClick : function(e) {
							// 数据提交
							var $this = this;
							var o = this.model;
							o.set("apEmail", $.trim($("#eMail").val()));
				 			o.set("apSpell", $.trim($("#pinyin").val()));
							o.set("organizatin", $(".mui-checked").find("input").val());
						
							if (this.model.validate()) {// 数据校验
								this && this.undelegateEvents();// 销毁所有监听
							}
						}
					

					});
			return baseinfoView;
		});