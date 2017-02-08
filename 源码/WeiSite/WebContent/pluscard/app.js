define([ '../../pluscard/model', '../../pluscard/plus_step_view1' ],
		function(Model, View) {

			var controller = function(name) {
//				$.loadclose();
				$.loading();
				var model = new Model();

				controller.currentView
						&& controller.currentView.undelegateEvents();// 销毁所有监听

 				var view = new View({
					model : model
				});

				view.render(); // 利用Model定义的默认属性初始化界面
				controller.currentView = view;

				controller.onRouteChange = function() {
					// 可以做一些销毁工作，例如view.undelegateEvents()
					controller.currentView
							&& controller.currentView.undelegateEvents();// 销毁所有监听

				};
			};

			return controller;
		});