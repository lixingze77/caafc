define(['../../recommend/model', '../../recommend/recommend_main_view'], function (Model, View) {

	var controller = function(param) {
		$.loading();
		
		var model = new Model();
		
		 
		var view = new View({
			model : model,
		});
		 view.render(); 
		controller.onRouteChange = function() {
			view.undelegateEvents();
		};
	};

	return controller;
});