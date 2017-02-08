define(['text!../range/tpl.html', "iscroll"], function (tpl, iscroll) {
    var scroll;
    var view = Backbone.View.extend({
        el: '#container',

        events: {"change input[type=range]": "changeRange"},

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
            scroll = new IScroll('#tpl_range', {
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
        }, changeRange: function (e) {
            var tooltip = $('<span class="mui-tooltip mui-hidden"></span>');

            var rangeEl = $(e.target);

            if (!rangeEl.parent().hasClass("mui-tooltip")) {
                rangeEl.parent().append(tooltip);
            } else
                tooltip = rangeEl.parent().find(".mui-tooltip");

            var val = rangeEl.val();
            var id = rangeEl.attr("id");
            if (id == "field-range")
                $("#field-range-input").val(val)
            if (id == "inline-range")
                $("#inline-range-val").html(val)
            if (id == "block-range")
                $("#block-range-val").html(val)

            var offsetLeft = rangeEl.offset().left;
            var width = rangeEl.width() ;
             var tooltipWidth = tooltip.width();
            var max = rangeEl.attr("max");
            var min = rangeEl.attr("min");

            var distince = Math.abs(max - min);
            var scaleWidth = Math.abs(val) / distince * width;
            tooltip.css("left",
                (offsetLeft + scaleWidth - tooltipWidth / 2 - 18)
                + 'px')
            tooltip.html(val);
            tooltip.removeClass("mui-hidden");

            setTimeout(function () {
                tooltip.addClass("mui-hidden");

            }, 500)
        }
    });

    return view;
});