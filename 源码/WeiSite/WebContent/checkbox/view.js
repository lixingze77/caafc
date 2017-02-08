define(['text!../checkbox/tpl.html', "iscroll"], function (tpl, iscroll) {
    var scroll;
    var checkboxView = Backbone.View.extend({
        el: '#container',

        events: {},

        initialize: function (param) {
            //console.log(param);

        },
        template: _.template(tpl),
        render: function () {
            var $tpl = $(this.template());
            this.$el.html($tpl);
            // animInfinite
            //q启动滚动条
            scroll = new IScroll('#tpl_check', {
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
        }
    });

    return checkboxView;
});