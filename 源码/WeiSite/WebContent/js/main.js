(function () {
    requirejs.config({
        // By default load any module IDs from js/lib
        urlArgs: "v=" + (new Date).getTime(),
//		urlArgs : "v=1.231",
        baseUrl: './js',

        paths: {
            common: './lib/common.min',
            zhCn: "./lib/zh_cn.min",
            jquery: './lib/jquery-2.1.4.min',
            extend: './lib/jq.extend.min',
            touch: './lib/jquery.touch.min',
            iscroll: "./lib/iscroll-5.1.3.min",
            security: "./lib/security.min",
            underscore: "./lib/underscore.min",
            backbone: "./lib/backbone.min",
            localstorage: "./lib/localStorage.min",
            text: 'lib/text',
            areadata1:'./lib/LAreaData1',
            areamain:'./lib/LArea',
            swiper:"./lib/swiper-3.4.0.jquery.min"
        },
        shim: {
        	"areamain":{
        		deps: ['jquery','areadata1'],
                exports: 'areamain'
        	},
            "underscore": {
                exports: '_'
            },
            "backbone": {
                deps: ['underscore', 'jquery'],
                exports: 'Backbone'
            },
            "localstorage": {
                deps: ['backbone'],
                exports: 'Store'
            },
            "extend": {
                deps: ["jquery", "touch"],
                exports: 'extend'
            },
            "common": {
                deps: ["jquery", "extend", "touch", "security"],
                exports: 'common'
            },
            "touch": {
                deps: ["jquery"],
                exports: 'touch'
            },
            "swiper":{
            	deps: ["jquery"],
            	exports:'swiper'
            }

        },
        waitSeconds: 30

    });
    // Start the main app logic.
    require(['backbone', 'underscore', 'jquery', 'touch', "extend", "router"],
        function () {
            Backbone.history.start({
             })
            ; // 开始监控url变化
            // });
        });

    requirejs.onError = function (err) {
        console.log(err.requireType);
        if (err.requireType === 'timeout') {
            console.log('modules: ' + err.requireModules);
        }
        throw err;
    };

})(this);