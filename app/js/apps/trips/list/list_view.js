MileageApp.module('TripsSys.List', function(List, MileageApp, Backbone, Marionette, $, _) {
	
	List.Layout = Marionette.Layout.extend({
		template: "#trip-list-layout",
		
		regions: {
			panelRegion: "#panel-region",
			tripsRegion: "#trips-region"
		}
	});
	
	List.Panel = Marionette.ItemView.extend({
		template: "#trip-list-panel"
	});
	
	List.Trip = Marionette.ItemView.extend({
		tagName: 'tr',
		template : '#trip-list-item',
		
		events : {
//			'click' : 'highlightName',
			'click td a.js-show': 'showClicked',
			'click td a.js-edit' : 'editClicked',
			'click button.js-delete': 'deleteClicked'
		},

//		highlightName : function(e) {
//			e.preventDefault();
//			this.$el.toggleClass('warning');
//		},
		
		showClicked: function(e){
			e.preventDefault();
			e.stopPropagation();
			this.trigger('trip:show', this.model);
		},
		
		editClicked : function(e) {
			e.preventDefault();
			e.stopPropagation();
			this.trigger("trip:edit", this.model);
		},
		
		deleteClicked: function(e){
			e.stopPropagation();
			this.trigger('trip:delete', this.model);
		},
		

		flash : function(cssClass) {
			var $view = this.$el;
			$view.hide().toggleClass(cssClass).fadeIn(800, function() {
				setTimeout(function() {
					$view.toggleClass(cssClass)
				}, 500);
			});
		}
	});

	List.Trips = Marionette.CompositeView.extend({
		tagName: 'table',
		className: 'table table-hover',
		template: '#trip-list',
		itemView: List.Trip,
		itemViewContainer: 'tbody'
	});
	

});