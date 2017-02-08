define(['text!../switches/tpl.html', "iscroll"], function (tpl, iscroll) {
    var scroll;
    var view = Backbone.View.extend({
        el: '#container',

        events: {
            "swipeLeft .mui-switch": "swipeLeft",
            "swipeRight .mui-switch": "swipeRight",
            "tap .mui-switch": "tapEvent"
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
            scroll = new IScroll('#tpl_switch', {
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
        },
        tapEvent: function (e) {
            var switchEl = $(e.target);
            if (switchEl.hasClass("mui-active")) {

                switchEl.removeClass("mui-active");
            } else
                switchEl.addClass("mui-active");
            // e.preventDefault();
            e.stopPropagation();
        }, swipeLeft: function (e) {

            var switchEl = $(e.target);
            switchEl.removeClass("mui-active");
            e.stopPropagation();
        }, swipeRight: function (e) {
            var switchEl = $(e.target);
            switchEl.addClass("mui-active");
            e.stopPropagation();
        }
    });

    return view;
});