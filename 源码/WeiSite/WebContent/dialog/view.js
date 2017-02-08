define(['text!../dialog/tpl.html', "iscroll"], function (tpl, iscroll) {
    var scroll;
    var view = Backbone.View.extend({
        el: '#container',

        events: {
            'tap #alertBtn': 'alertDialog',
            'tap #confirmBtn': 'confirmDialog',
            'tap #toastBtn': 'toastDialog',
            'tap #loadingBtn': 'loadingDialog'
        },

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
            scroll = new IScroll('#tpl_dialog', {
                fadeScrollbars: false,
                click: true//允许点击
            });
            $(window).trigger('resize');
            document.addEventListener('touchmove', function (e) {
                e.preventDefault();
            }, false);
            $(".mui-btn").highlight("mui-active");
            this.header.showLeft();
            this.header.onback();
        }, alertDialog: function () {
            $.Dialog({
                title: "提示", content: "提示提示提示", submit: function () {
                    console.log("点击确定");
                    this.close();
                }, cancel: function () {
                    console.log("点击取消");

                }
            })
        }, confirmDialog: function () {
            $.Dialog({
                title: "提示", content: "提示提示提示", type: "confirm", submit: function () {
                    console.log("点击确定");
                    this.close();
                }, cancel: function () {
                    console.log("点击取消");
                    this.close();

                }
            })
        }, toastDialog: function () {
            $.toast("提示消息",2000);
        }, loadingDialog: function () {
            $.loading("正在加载中",3000);
        }
    });

    return view;
});