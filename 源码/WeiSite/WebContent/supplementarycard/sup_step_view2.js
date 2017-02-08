define([ 'text!../supplementarycard/sup_step2.html', "iscroll" ,'common' ],
    function(tpl, iscroll ,common) {
        var scroll;

        var indexView = Backbone.View.extend({
            el : '#container',

            events : {
            	"tap  #secIdType_div" : "secIdType_div_tap",
                "tap  #nextstep" : "stepClick",
                "change #faAddressType" : "selectClick",
                "tap .mui-action-back" : "backClick"

            },

            initialize : function(param) {
                

            },
            template : _.template(tpl),
            render : function() {
                var $tpl = $(this.template());
                this.$el.html($tpl);
                // animInfinite
                // q启动滚动条
                scroll = new IScroll('#sup_step2', {
                    fadeScrollbars : false,
                    click : true
                    // 允许点击
                });
                $(window).trigger('resize');
                document.addEventListener('touchmove', function(e) {
                    e.preventDefault();
                }, false);
                var $this = this;
                var o = this.model;
                $("#secChiName").val(o.get("secChiName"));
                $("#secEngName").val(o.get("secEngName"));
                $("#secIdType").val(o.get("secIdType"));
                $("#secIdNbr").val(o.get("secIdNbr"));

                $("#secFaMobile").val(o.get("secFaMobile"));
                $("#secRelation").val(o.get("secRelation"));
                if(!common.isEmpty(o.get("faAddressType"))) {
                    $("#faAddressType").val(o.get("faAddressType"));
                }
                if(!common.isEmpty(o.get("faAddressAll"))) {
                    $("#faAddressAll").val(o.get("faAddressAll"));
                }
               
            },stepClick: function() {
                    var $this = this;
                    var o = this.model;
                    o.set("secChiName", $.trim($("#secChiName").val()));
                    o.set("secEngName", $.trim($("#secEngName").val()));
                    o.set("secIdType", $.trim($("#secIdType").val()));
                    o.set("secIdNbr", $.trim($("#secIdNbr").val()));

                    o.set("secFaMobile", $.trim($("#secFaMobile").val()));
                    o.set("secRelation", $.trim($("#secRelation").val()));
                    o.set("faAddressType", $.trim($("#faAddressType").val()));
                    o.set("faAddressAll", $.trim($("#faAddressAll").val()));
                    if (this.model.pag2Vail()){
                        // this && this.undelegateEvents();// 销毁所有监听
                    this.model.jumpToView3(this);
                }
            },
            selectClick : function(e) {
                var val = $(e.currentTarget).val();
                if (val == "") {
                    $("#faAddressAll").html("");
                }
                if (val == "C") {
                    $("#faAddressAll").html("浙江省杭州市滨江区江南大道3888号");
                }
                if (val == "H") {
                    $("#faAddressAll").html("浙江省杭州市江干区下沙经济开发区七号路九号大街456号")
                }
            },
            secIdType_div_tap : function(e) {
//            	$(e.currentTarget).find("#secIdType").click();
//            	 $("#secIdType").trigger("change");
//            	open($(e.currentTarget).find("#secIdType"));           	
//            	function open(elem) {
//            	    if (document.createEvent) {
//            	        var e = document.createEvent("MouseEvents");
//            	        e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
//            	        elem[0].dispatchEvent(e);
//            	    } else if (element.fireEvent) {
//            	        elem[0].fireEvent("onmousedown");
//            	    }
//            	}
//            	$("#secIdType").attr("size",2);
            },
            backClick : function() {
                
                // this && this.undelegateEvents();// 销毁所有监听
                this.model.jumpToView1(this);
                


            }
        });

        return indexView;
    });