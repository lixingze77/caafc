define(['text!../index/tpl.html', "iscroll"], function (tpl, iscroll) {
    var scroll;


    var indexView = Backbone.View.extend({
        el: '#container',

        events: {
            "tap .mui-table-view>li": 'collapseEvent'
        },

        initialize: function (param) {
            //console.log(param);

        },
        template: _.template(tpl),
        render: function () {
            var $tpl = $(this.template());
            this.$el.html($tpl);
            // animInfinite
            //q启动滚动条
            scroll = new IScroll('#container', {
                fadeScrollbars: false,
                click: true//允许点击
            });
            $(window).trigger('resize');
            document.addEventListener('touchmove', function (e) {
                e.preventDefault();
            }, false);

            $(".mui-collapse-content").on("tap", function (e) {
                // e.preventDefault();// 取消事件的默认动作
                e.stopPropagation(); // 阻止冒泡事件
            })

            this.header.hideLeft();
        }
        ,
        collapseEvent: function (e) {
            e.stopPropagation(); // 阻止冒泡事件
            var row = $(e.target);
            if (!row.hasClass("mui-table-view-cell")) {
                if (row.parent().hasClass("mui-table-view-cell")) {

                    row = row.parent();
                } else
                    return;
            }
            var cls = row.attr("class");
            // $(".mui-collapse-content").hide();
            $(".mui-table-view li").removeClass("mui-active");

            if (cls.indexOf("mui-collapse") > -1) {
                if (cls.indexOf("mui-active") > -1) {

                    row.removeClass("mui-active");
                } else {
                    row.addClass("mui-active");
                }
                scroll.refresh();

            } else {
                var url = row.find(".mui-navigate-right").attr("data-url");
                window.location.hash = url;
            }
        }

    });

    return indexView;
});