define(['text!../forms/tpl.html', "iscroll","areamain"], function (tpl, iscroll,areamain) {
    var scroll;
    var buttonView = Backbone.View.extend({
        el: '#container',
        events: {},
        initialize: function (param) {
            //console.log(param);
            // this.header.hideLeft();
        },
        template: _.template(tpl),
        render: function () {
        	
            var $tpl = $(this.template());
            this.$el.html($tpl);
            // animInfinite
            //q启动滚动条
            scroll = new IScroll('#tpl_form', {
                fadeScrollbars: false,
                click: true//允许点击
            });
            $(window).trigger('resize');
            document.addEventListener('touchmove', function (e) {
                e.preventDefault();
            }, false);
            $(".mui-btn").highlight("mui-active");
            
            //下拉城市
            var area1 = new LArea();
            area1.init({
                'trigger': '#demo1', //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
                'valueTo': '#value1', //选择完毕后id属性输出到该位置
                'keys': {
                    id: 'id',
                    name: 'name'
                }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
                'type': 1, //数据源类型
                'data': LAreaData //数据源
            });
            area1.value=[27,16,7];//控制初始位置，注意：该方法并不会影响到input的value
         
            this.header.showLeft();
            this.header.onback();
            $(".mui-input-clear").on('input propertychange', function () {
                var that = this;
                var actionClass = $(this).attr("class");
                var actiontype = $(this).attr("type");
                if (actionClass == "mui-input-clear"
                    && actiontype == "text") {
                    var actionIcon = "";

                    if ($(this).val() == 0) {
                        $('.mui-icon-clear').remove();
                        return;
                    }
                    var parentNodeHtml = $(this.parentNode).html();

                    if (!(parentNodeHtml.indexOf('mui-icon icon-guanbi') > -1))
                        actionIcon = '<span class="mui-icon icon-guanbi"></span>';
                    $(that).after(actionIcon);

                    $('.icon-guanbi').on('tap', function () {
                        $(that).val('');
                        $('.icon-guanbi').remove();
                    });
                }
            })
        }
    });

    return buttonView;
});