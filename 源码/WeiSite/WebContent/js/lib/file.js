// 聊天消息
define([], function(require, exports, module) {
	function uploadImgBase64(opts) {
		opts = $.extend({
			file : undefined,
			maxFileSize : 2,// 最大支持2M
			success : undefined,
			progress : undefined,
			error : undefined
		}, opts)
		var loaded = 0;
		var img = $("<img>");// 创建图片
		var $img = img[0];

		var file = opts.file;
		var total = file.size;

		if ((file.size / 1024 / 1024) > opts.maxFileSize) {
			if ($.isFunction(opts.error)) {
				opts.error("图片大小不能超过" + opts.maxFileSize + "M");
			}
			return;
		}
		// 读取图片信息
		var reader = new FileReader();
		reader.onload = function() {
			var url = reader.result;
			$img.src = url;

		}
		reader.onprogress = function(a) {
			if ($.isFunction(opts.progress)) {
				opts.progress(a);
			}
		}
		reader.onerror = function() {
			// console.log(reader)
		}

		reader.readAsDataURL(file);

		/*
		 * 生成图片 ----------------------
		 */
		$img.onload = function() {
			// 生成比例
			var width = $img.width, height = $img.height, scale = width
					/ height;
			width = parseInt(400);
			height = parseInt(width / scale);

			// 生成canvas
			var $canvas = $("<canvas></canvas>");
			var ctx = $canvas[0].getContext('2d');
			$canvas.attr({
				width : width,
				height : height
			});
			ctx.drawImage($img, 0, 0, width, height);
			var base64 = $canvas[0].toDataURL('image/jpeg', 0.5);// 图片通过base64转码
 			if ($.isFunction(opts.success)) {
				opts.success(base64, $img);
			}

		}
	}

	function upload(base64, callback) {
		$.ajax({
			url : "../hf/file/base64",
			type : "post",
			data : {
				picdata :encodeURIComponent(base64)
			},
			dataType : "json",
			success : function(response) {
				if ($.isFunction(callback)) {
					callback(response);
				}
			}
		})
	}

	return {
		uploadImgBase64 : uploadImgBase64,
		upload : upload
	}
});