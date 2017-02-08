define([ 'text!../supplementarycard/sup_step3.html', "iscroll" ],
    function(tpl, iscroll) {
        var scroll;

        var indexView = Backbone.View.extend({
            el : '#container',

            events : {
                "tap  #nextstep" : "stepClick",
                "change  #input_front" : "upload_front",
                "change  #input_back" : "upload_back",
                "tap .mui-action-back" : "backClick"

            },

            initialize : function(param) {
               

            },
            template : _.template(tpl),
            render : function() {
                var $tpl = $(this.template());
                this.$el.html($tpl);
                // animInfinite
                // q启动滚动条
                // scroll = new IScroll('#sup_step3', {
                //     fadeScrollbars : false,
                //     click : true
                //     // 允许点击
                // });
                $(window).trigger('resize');
                document.addEventListener('touchmove', function(e) {
                    e.preventDefault();
                }, false);
            },
            backClick : function(param) {
               
                // this && this.undelegateEvents();// 销毁所有监听
                this.model.jumpToView2(this);

            },
            stepClick : function(param) {
                
                // this && this.undelegateEvents();// 销毁所有监听	
                this.model.submit(this);

            },
            upload_front: function(e) {
                //alert(this.files[0]);
                var file = e.currentTarget.files[0];
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (e) {
                    //获取图片
                    img = document.getElementById('img_front');
                    //设置图片路径
                    img.setAttribute('src', this.result);
                    img.onload = function () {
                        //alert(this.result);
                        //获取图片宽度
                        width = img.width;
                        //获取图片高度
                        height = img.height;
                        //计算比例
                        scale = width / height;
                        //重新设置宽度
                        width = parseInt(400);
                        //重新设置高度
                        height = parseInt(width / scale);
                        //设置画图板
                        canvas = document.getElementById('canvas_front');
                        //设置画图板
                        ctx = canvas.getContext('2d');
                        //设置画图板宽度
                        canvas.width = width;
                        //设置画图板高度
                        canvas.height = height;
                        //设置图画
                        ctx.drawImage(img, 0, 0, width, height);
                        //读取图像
                        base64 = canvas.toDataURL('image/jpeg', 0.5);// 图片通过base64转码
                        h = '<img src="' + base64 + '" width="100%" height="100%">';
                        $("#idcardfrontares").html(h);

                    }

                }
            },upload_back: function(e) {
                //alert(this.files[0]);
                var file = e.currentTarget.files[0];
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (e) {
                    //获取图片
                    img = document.getElementById('img_back');
                    //设置图片路径
                    img.setAttribute('src', this.result);
                    img.onload = function () {
                        //alert(this.result);
                        //获取图片宽度
                        width = img.width;
                        //获取图片高度
                        height = img.height;
                        //计算比例
                        scale = width / height;
                        //重新设置宽度
                        width = parseInt(400);
                        //重新设置高度
                        height = parseInt(width / scale);
                        //设置画图板
                        canvas = document.getElementById('canvas_front');
                        //设置画图板
                        ctx = canvas.getContext('2d');
                        //设置画图板宽度
                        canvas.width = width;
                        //设置画图板高度
                        canvas.height = height;
                        //设置图画
                        ctx.drawImage(img, 0, 0, width, height);
                        //读取图像
                        base64 = canvas.toDataURL('image/jpeg', 0.5);// 图片通过base64转码
                        h = '<img src="' + base64 + '" width="100%" height="100%">';
                        $("#idcardbackares").html(h);

                    }

                }
            }
        });

        return indexView;
    });