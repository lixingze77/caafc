define([ 'text!../newcard/baseinfo_tpl1.html' , "iscroll" ],
		function(tpl,iscroll) {
			var scroll;
			var baseinfoView = Backbone.View
					.extend({
						el : '#container',

						events : {
							"tap #pinyin" : 'pinyinclick',
							"tap #changecardBtn" : 'openCardListclick',
							"tap #basenextstep" : "basestepClick",
							"tap #back_mainBtn" : "backClick",
						},

						initialize : function(param) {
							
							 																					
						},
						changeCardRender:function(){
							//渲染卡面信息
							//修改卡界面，图片，介绍
							var o=this.model;
							 //获取列表
							var arry = o.get("listSpell").split(',');
							var pinyinVal=o.get("apSpell");
							$("#pinyin").find("option").remove();
							for (var i = 0; i < arry.length; i++) {
								$("#pinyin").append("<option value='"+arry[i]+"'>"+arry[i]+"</option>");
								if(arry[i]==pinyinVal){
									$("#pinyin").val(arry[i]);
								}
							}
							$("input[name='organizatin']").each(function(){
								
								if(this.value==o.attributes.organizatin){
									$(this).parent().addClass(" mui-checked");
									$(this).parent().siblings().removeClass("mui-checked");
								}
							});					    
							$("#eMail").val(o.attributes.apEmail);
							if(o.get("field")==""){
								$("#actiCode").val(o.get("actiCode"));
							}
							$("#recommendCode").val(o.attributes.recomId);
							$("#img_main").attr("src",o.attributes.productImgUrl);
							$("#text_main").html(o.attributes.productFunction);
							$("#apSex").val(o.attributes.apSex);
							//图片与预加载，重新渲染滚动条
							 this.imgonload();
						},
						init : function() {
							this.delegateEvents();
							this.render();
						},
						template : _.template(tpl),
						render : function() {// 在这里定义页面的中的属性
							var field=this.model.get("field");
							console.log("field=",field)
							var fieldbool=false;
							
							for (var i = 0; i < field.length; i++) {
								if(field[i].code=="actiCode"){
									fieldbool=true;
								}
							}
							 
							var $tpl = $(this.template({"bool":fieldbool}));
							this.$el.html($tpl);// 将模版中的内容替换到页面中的指定DIV中
							// animInfinite
							
							$(window).trigger('resize');
							document.addEventListener('touchmove', function(e) {
								e.preventDefault();
							}, false);
							$(".mui-btn").highlight("mui-active");
							this.loadbase();
						},
						loadbase:function(){
							 $(".mui-radio").on("tap", function() {
					            	if(! $(this).hasClass("mui-checked")){
					            		$(this).addClass("mui-checked");
										 $(this).siblings(".mui-radio").removeClass("mui-checked");
					            	}					            
					            	});			
							 var o=this.model;
							 var v=this;
							 var bool=true;
							 if(o.get("apSpell")==""){
								 o.pinyinList(); 
								 var productCode=o.get("productCode");
								 var list=o.get("cardlist");
								 if(o.get("scardlist")==""){
								 var scardlist=[];
								 var mcardlist=[];
								 for(var i=0;i<list.length;i++){
									 var probool=0;
									 var productApply=list[i]["productApply"];
									 var arr;
									 if(productApply!=""){
										 arr=productApply.split(",");
										 for(var n=0;n<arr.length;n++){//筛选只属于新办卡的卡片
											 if(arr[n]=="0"){
												 probool=1;
												    mcardlist.push(list[i]);
												    scardlist.push(list[i]);
											 }else if(probool!=1){
												 if(arr[n]=="1"){
													 scardlist.push(list[i]); 
												 }
											 }
										 }
										 o.set("mcardlist",mcardlist);
										 o.set("scardlist",scardlist);
									 }
								 }
								 }
								 if(productCode!=""){
									 for(var i=0;i<list.length;i++){
										 if(list[i]["productCode"]==productCode){
											 $("#img_main").attr("src",list[i]["productImgUrl"]);
											 $("#text_main").html(list[i]["productFunction"]);
										     o.set("productImgUrl",list[i]["productImgUrl"]);
											 o.set("productGrade",list[i]["productGrade"]); 
											 o.set("imgid",productCode);
											 o.set("cardNbrUpload",productCode);
										 }
									 }
								 }else{
									 var scard=o.get("scardlist");
									 var mcard=o.get("mcardlist");
									 if(scard.length!=0){
										 if(mcard.length!=0){
											o.set("productImgUrl",mcard[0]["productImgUrl"]);
										    o.set("productGrade",mcard[0]["productGrade"]); 
										    o.set("imgid",mcard[0]["productCode"]);
										    o.set("productCode",mcard[0]["productCode"]);
										    o.set("cardNbrUpload",mcard[0]["productCode"]);
										    $("#img_main").attr("src",mcard[0]["productImgUrl"]);
											$("#text_main").html(mcard[0]["productFunction"]);
											}else{
												o.set("productImgUrl",scard[0]["productImgUrl"]);
											    o.set("productGrade",scard[0]["productGrade"]); 
											    o.set("imgid",scard[0]["productCode"]);
											    o.set("productCode",scard[0]["productCode"]);
											    o.set("cardNbrUpload",scard[0]["productCode"]);
											    $("#img_main").attr("src",scard[0]["productImgUrl"]);
												$("#text_main").html(scard[0]["productFunction"]);
											}
									 }
								 }
								 this.imgonload();
							 }else{
								 v.changeCardRender();
								 }
						},
						imgonload:function(){//图片的预加载
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
				    					$.loadclose();
				                    }};
								});
							}
						},
						backClick : function() {
							$.loading();
							this.trigger('back');
						},
						openCardListclick : function() {//打开卡列表
							$.loading();
							var o=this.model;
							o.set("apEmail", $.trim($("#eMail").val()));
				 			o.set("apSpell", $.trim($('#pinyin option:selected').text()));
							o.set("organizatin", $(".mui-checked").find("input").val());
							o.set("recomId", $.trim($("#recommendCode").val()));
							o.set("apSex",$.trim($("#apSex").val()));
							if(o.get("field")==""){
								o.set("actiCode",$.trim($("#actiCode").val()));
							}
							this.trigger('basenext');						
						},						
						basestepClick : function(e) {
							// 数据提交
							var $this = this;
							var o = this.model;
							o.set("apEmail", $.trim($("#eMail").val()));
				 			o.set("apSpell", $.trim($("#pinyin").val()));
							o.set("organizatin", $(".mui-checked").find("input").val());
							o.set("productFunction",$.trim($("#text_main").html()));
							o.set("recomId", $.trim($("#recommendCode").val()));
							o.set("apSex",$.trim($("#apSex").val()));
							if(o.get("field")==""){
								o.set("actiCode",$.trim($("#actiCode").val()));
							}
							if ($this.model.validate()) {// 数据校验
								setTimeout(function(){ 
									$.loading();
									$this.trigger('base1next');
								},500);
							}
						}
					});
			return baseinfoView;
		});