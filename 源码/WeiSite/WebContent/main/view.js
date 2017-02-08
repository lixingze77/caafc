define(['text!../main/tpl.html', "iscroll"], function (tpl, iscroll) {
    var scroll;
    var indexView = Backbone.View.extend({
        el: '#container',

        events: {
            'tap #button': 'clickSpan' // id=button 的tap事件
        },

        initialize: function () {
            this.model.on('clickEvent', this.render, this); // 监听事件，当
        },
        template: _.template(tpl),

        render: function () {


            //
            this.$el.html(this.template({
                text: this.model.get('text')
            }));
            //q启动滚动条
            scroll = new IScroll('#container', {
                fadeScrollbars: false,
                click: true//允许点击
            });
            $(window).trigger('resize');
            document.addEventListener('touchmove', function (e) {
                e.preventDefault();
            }, false);
        },

        clickSpan: function (e) {//执行tap事件
            alert('you clicked the button');
        }
    });

    return indexView;
});