define(['../../index/model', '../../range/view', "../../header/header"], function (Model, View, headerView) {


    var controller = function (name) {
        $.loadclose();
        var model = new Model();

        controller.currentView && controller.currentView.undelegateEvents();//销毁所有监听

        var view = new View({
            model: model
        });
        view.header = headerView
        view.render(); // 利用Model定义的默认属性初始化界面
        controller.currentView = view;


        //model.fetch(); // 拉取cgi等等，获取数据，再触发事件，界面收到消息做相应的动作
        controller.onRouteChange = function () {
            // console.log('change'); // 可以做一些销毁工作，例如view.undelegateEvents()
            view.undelegateEvents();//销毁所有监听
        };
    };

    return controller;
});