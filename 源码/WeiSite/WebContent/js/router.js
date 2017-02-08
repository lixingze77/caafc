define(['backbone'], function () {//第一个参数是指定这个自定义模块依赖的其他模块，一般是一个数组,符合AMD的规范
    var baseUrl = './';
    var routesMap = {
        'index(/:name)': baseUrl + 'index/app.js',
        'button': baseUrl + 'button/app.js',
        'badges': baseUrl + 'badges/app.js',
        "checkbox": baseUrl + 'checkbox/app.js',
        "dialog": baseUrl + 'dialog/app.js',
        "range": baseUrl + 'range/app.js',
        "switches": baseUrl + 'switches/app.js',

        "list": baseUrl + 'list/app.js',
        "forms": baseUrl + 'forms/app.js',

        "login":baseUrl+'login/app.js',
        "area":baseUrl+'area/app.js',
        "plus":baseUrl+'pluscard/app.js',//加办卡
        "sup":baseUrl+'supplementarycard/app.js',//申请附属卡
        "area":baseUrl+'area/app.js',
        "recommend":baseUrl+'recommend/app.js',//推荐办卡
		"home":baseUrl+'home/app.js',//主页
        "process":baseUrl+'process/app.js',//申请过程展示
        "newcard(/:id)":baseUrl+'newcard/app.js',//新办卡
        "newcarderror(/:result)":baseUrl+'newcarderror/app.js',//新申卡错误页面
        "schedule":baseUrl+'schedule/app.js',//申卡进度
        "baseinfo":baseUrl+'baseinfo/app.js',//申请过程展示
        "express":baseUrl+'express/app.js',//快递查询
        "cardschedule":baseUrl+'schedule/card_app.js',//办卡查询
        "emsschedule":baseUrl+'schedule/ems_app.js',//ems查询
        "icmsschedule":baseUrl+'schedule/icms_app.js',//icms查询
        // 'main(/:name)': baseUrl + 'main/app.js',
        '*actions': 'defaultAction'
    };
    // _.templateSettings = {
    //
    // 	interpolate : /\{\{(.+?)\}\}/g
    //
    // };
    var Router = Backbone.Router.extend({

        routes: routesMap,

        defaultAction: function () {
            console.log('404');
            location.hash = 'home';
        }

    });

    var router = new Router();
    // 彻底用on route接管路由的逻辑，这里route是路由对应的value
    router.on('route', function (route, params) {
        require([route], function (controller) {
            if (router.currentController
                && router.currentController !== controller) {
                router.currentController.onRouteChange
                && router.currentController.onRouteChange();
            }
            router.currentController = controller;
            controller.apply(null, params); // 每个模块约定都返回controller
        });
    });

    return router;
});