define([ 'text!../home/tpl.html', "iscroll","swiper"], function(tpl, iscroll,swiper) {
	var scroll;
	var homeView = Backbone.View.extend({
		el : '#container',

		events : {
			"tap #showProcess":'showclick',
			"tap #home-btn6":'showplusclick',
			"tap #home-btn1":'emsclick',
			"tap #home-btn2":'showtoastclick',
			"tap #home-btn3":'scheduleclick',
			"tap #home-btn4":'icmsclick',
			"tap #home-btn7":'recommendclick',
			"tap #home-btn5":'supclick',
			"tap #home-btn8":'newclick',
			"tap .line-card":'lineclick',
		},

        initialize: function () {
            this.model.on('queryEvent', this.addcard, this); // 监听事件，当model中模型被改变时响应
            this.model.on('activityEvent', this.addactivity, this); // 监听事件，当model中模型被改变时响应
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
			
              $(window).resize(function() {//屏幕尺寸变化的时候触发的监听
            	  scroll&&scroll.refresh();
              });
  			  this.model.queryCardList();//获取产品卡的信息
  			  this.model.queryActivity();//获取广告的信息
              this.showcard();//初始化滚动条  
		},
		addcard:function(){
			var o=this.model;
			var list=o.get("cardlist");
			 var scardlist=[];//新办卡
			 var acardlist=[];//加办卡
			 var fcardlist=[];//附属卡
			 if(o.get("hcardlist")==null){
				 for(var i=0;i<list.length;i++){
					 var bool=true;
					 var productApply=list[i]["productApply"];
					 var arr;
					 if(productApply!=""){
						 arr=productApply.split(",");
						 for(var n=0;n<arr.length;n++){//筛选只属于新办卡的卡片
							 if(bool){
							 if(arr[n]=="0"||arr[n]=="1"){
								    bool=false;
								    scardlist.push(list[i]);
							 }
							 }
							 if(arr[n]=="2"){//筛选加办卡
								 acardlist.push(list[i]);
							 }
							 if(arr[n]=="3"){//筛选附属卡
								 fcardlist.push(list[i]);
							 }
						 }
						 o.set("hcardlist",scardlist);
					 }
				 }
				 }	
			 if(scardlist.length!=0){		
			for(var i=0;i<list.length;i++){
				var introduce;
				if(list[i]["productFunction"]!=undefined){
					introduce=list[i]["productFunction"];
				}else{
					introduce="";
				}
				var cdiv='<div class="line-card" productApply="'+list[i]["productApply"]+'" productCode="'+list[i]["productCode"]+'" grade="'+list[i]["productGrade"]+'" productType="'+list[i]["productType"]+'"><label>'+list[i]["productName"]+'</label><img src="'+list[i]["productImgUrl"]+'"/><div>'+introduce+'</div></div>';
			    $(".showcard").append(cdiv);
			}
			}else{//卡配置里面没有新办卡的卡种时显示
				var errorhtml='<div style="margin-top:50px;text-align:center;width:100%;height:30px;"><span>当前没有可以新办的产品信息</span></div>';
				$(".showcard").html(errorhtml);
			}
		},
		addactivity:function(){
			var o=this.model;
			var alist=o.get("activitylist");
			for(var i=0;i<alist.length;i++){
				var cdiv='<div class="swiper-slide"><a><img src="'+alist[i]["activityImg"]+'" style="width: 100%"></a></div>';
			    $(".swiper-wrapper").append(cdiv);
			}
		},
		lineclick:function(e){
			var id=$(e.currentTarget).attr("productCode");
			var productApply=$(e.currentTarget).attr("productApply");
			var arr=productApply.split(",");
			if(arr!=null||arr!=""){
				var bool=false;
				for(var i=0;i<arr.length;i++){
					if(arr[i]=="1"){
						bool=true;	
					}
				}
				if(bool){
					window.location.hash = "#newcard/"+id;
				}else{
					window.location.hash = "#newcard";
				}
			}else{
				$.toast("这张卡暂时无法办理");
			}
		},
		showcard:function(){//初始化滚动条   图片的预加载
			var v=this;
			var box=$("<div></div>");
			var imgarr=$("#simg").find("img");
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
                    	setTimeout(function(){//防止页面没有加载完，就刷新滚动条
        					scroll = new IScroll('#tpl_btn', {
        						fadeScrollbars : false,
        						click : true
        					// 允许点击
        					});
                    	},500);
    					//图片滚轮的初始化		  
    		              v.$el.find(".swiper-container").swiper({
    		                  loop: true,
    		                  pagination: $(".swiper-pagination", v.$el)[0],
    		                  paginationClickable: true,
    		                  lazyLoading: true//如果要延迟加载图片就有问题
    		              });
                    }};
				});
			}
		},
		showclick:function(){
			location.hash = "#process";
		},
		scheduleclick:function(){
			location.hash = "#cardschedule";
		},
		showplusclick:function(){
			window.location.hash = "#plus";
		},
		recommendclick:function(){//推荐办卡
			window.location.hash = "#recommend";
		},
		supclick:function(){//附属卡申请
			window.location.hash = "#sup";
		},
		newclick:function(){//办新卡
			var o=this.model;
			if(o.get("hcardlist")!=null){
				window.location.hash = "#newcard";
			}else{
				$.toast("目前没有相关的卡产品可以新办");
			}
		},
		icmsclick:function(){
			window.location.hash="#icmsschedule";
		},
		showtoastclick:function(){
			$.toast("加紧建设中...");
		},
		emsclick:function(){
			window.location.hash="#emsschedule";
		},

	});
	return homeView;
});