define([ '../newcard/baseinfo_view1', '../newcard/baseinfo_view2',
		'../newcard/home_view1', '../newcard/home_view2',
		'../newcard/list_view', '../newcard/perfected_view',
		'../newcard/result_view', '../newcard/basic_view',
		'../newcard/error_view' ], function(baseinfo_view1, baseinfo_view2,
		home_view1, home_view2, list_view, perfected_view, result_view,
		basic_view, error_view) {
	var ApplicationView = Backbone.View.extend({

		events : {},
		initialize : function() {
			this.basic_view = new basic_view({
				model : this.model
			});
			this.baseinfo_view1 = new baseinfo_view1({
				model : this.model
			});
			this.baseinfo_view2 = new baseinfo_view2({
				model : this.model
			});
			this.home_view1 = new home_view1({
				model : this.model
			});
			this.home_view2 = new home_view2({
				model : this.model
			});
			this.list_view = new list_view({
				model : this.model
			});
			this.perfected_view = new perfected_view({
				model : this.model
			});
			this.result_view = new result_view({
				model : this.model
			});
			this.error_view = new error_view({
				model : this.model
			});
			this.basic_view.on('next', this.toBaseinfoView1, this);
			this.baseinfo_view1.on('back', this.toBasicView, this);
			this.baseinfo_view1.on('basenext', this.toBaseinfoView2, this);
			this.baseinfo_view1.on('base1next', this.toHome1, this);
			this.baseinfo_view2.on('base2back', this.toBaseinfoView1, this);
			this.home_view1.on('home1next', this.toHome2, this);
			this.home_view1.on('home1back', this.toBaseinfoView1, this);
			this.home_view2.on('home2next', this.toPerfected, this);
			this.home_view2.on('home2back', this.toHome1, this);
			this.perfected_view.on('perfectednext', this.toList, this);
			this.perfected_view.on('perfectedback', this.toHome2, this);
			this.list_view.on('listsuccessnext', this.toResult, this);
			this.list_view.on('listerrornext', this.toError, this);
			this.list_view.on('listback', this.toPerfected, this);
			this.list_view.on('listtobaseinfo', this.toBaseinfoView1, this);
			this.list_view.on('listtohome1', this.toHome1, this);
			this.list_view.on('listtohome2', this.toHome2, this);
			this.list_view.on('listtoperfected', this.toPerfected, this);
		},
		render : function() {// 在这里定义页面的中的属性
			this.undelegateEventsAll();
			this.basic_view.render();
			this.basic_view.delegateEvents();
		},
		toBasicView : function() {
			this.undelegateEventsAll();
			this.basic_view.render();
			this.basic_view.delegateEvents();

		},
		toBaseinfoView1 : function() {
			this.undelegateEventsAll();
			this.baseinfo_view1.render();
			this.baseinfo_view1.delegateEvents();
		},
		toBaseinfoView2 : function() {
			this.undelegateEventsAll();
			this.baseinfo_view2.render();
			this.baseinfo_view2.delegateEvents();
		},
		toHome1 : function() {
			this.undelegateEventsAll();
			this.home_view1.render();
			this.home_view1.delegateEvents();
		},
		toHome2 : function() {
			this.undelegateEventsAll();
			this.home_view2.render();
			this.home_view2.delegateEvents();
		},
		toPerfected : function() {
			this.undelegateEventsAll();
			this.perfected_view.render();
			this.perfected_view.delegateEvents();
		},
		toList : function() {
			this.undelegateEventsAll();
			this.list_view.render();
			this.list_view.delegateEvents();
		},
		toResult : function() {
			this.undelegateEventsAll();
			this.result_view.render();
			this.result_view.delegateEvents();
		},
		toError:function(){
			this.undelegateEventsAll();
			this.error_view.render();
			this.error_view.delegateEvents();
		},
		undelegateEventsAll : function() {// 清除所有的监听
			this.basic_view && this.basic_view.undelegateEvents();
			this.baseinfo_view1 && this.baseinfo_view1.undelegateEvents();
			this.baseinfo_view2 && this.baseinfo_view2.undelegateEvents();
			this.home_view1 && this.home_view1.undelegateEvents();
			this.home_view2 && this.home_view2.undelegateEvents();
			this.list_view && this.list_view.undelegateEvents();
			this.perfected_view && this.perfected_view.undelegateEvents();
			this.result_view && this.result_view.undelegateEvents();
		}

	});

	return ApplicationView;
});