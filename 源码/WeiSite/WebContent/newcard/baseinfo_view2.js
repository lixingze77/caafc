define([ 'text!../newcard/baseinfo_tpl2.html', "iscroll" ],
		function(tpl,iscroll) {
			var scroll;
			var cardlistView = Backbone.View
					.extend({el : '#container',

						events : {
							//卡片选择事件
							"tap #return_mainBtn" : "returnClick",
							"tap .list_recommend" : "list_recommendClick"
						},

						initialize : function() {
							this.model.on('finishSet', this.finishSetClick, this);
						},
						template : _.template(tpl),
						render : function() {
							
							// 在这里定义页面的中的属性
							var $tpl = $(this.template());
							this.$el.html($tpl);// 将模版中的内容替换到页面中的指定DIV中
							// animInfinite
								// 启动滚动条
							$(window).trigger('resize');
							document.addEventListener('touchmove', function(e) {
								e.preventDefault();
							}, false);
							$(".mui-btn").highlight("mui-active");
							this.loadimg();
							$.loadclose();
						},
						loadimg:function(){
							var o=this.model;
							var list=o.get("scardlist");
							var productFunction="";
							for(var i=0;i<list.length;i++){
								if(list[i]["productFunction"]!=undefined&&list[i]["productFunction"]!=null){
									productFunction="";
									productFunction=list[i]["productFunction"];
								}else{
									productFunction="";
								}
								var div='<div class="list_recommend" data-productCode="'+list[i]["productCode"]+'" data-grade="'+list[i]["productGrade"]+'"><div style="display: inline-block; width: 50%; text-align: center;"><img src="'+list[i]["productImgUrl"]+'" style="width: 150px; padding: 5px"></img></div><div class="img_text" style="font-size:14px;height:80px;">'+productFunction+'</div></div>';
							$(".scroller").append(div);
							};
							var box=$("<div></div>");
							var imgarr=$("#baseinfo").find("img");
							if(imgarr.length>0){
								var count=0;
								imgarr.each(function(){
									var src=$(this).attr("src");
									var img=new Image();
									img.src=src;
									img.onload=function(){
										count++;
				                    if(imgarr.length==count){
				    					// q启动滚动条
				    					scroll = new IScroll('#baseinfo', {
				    						fadeScrollbars : false,
				    						click : true
				    					// 允许点击
				    					});
				                    }};
								});
							}
						},
						returnClick : function() {
							this.trigger('base2back');
						},
						
						list_recommendClick : function(e) {
							var id=$(e.currentTarget).attr("data-productCode");
							var o = this.model;
							o.setCard(id);
						},
						finishSetClick:function(){
							//销毁view2
							this.trigger('base2back');							
						}
						
					});
			return cardlistView;
		});