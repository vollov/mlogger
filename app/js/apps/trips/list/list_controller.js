MileageApp.module('TripsSys.List', function(List, MileageApp, Backbone, Marionette, $, _) {
	List.Controller = {
		listTrips : function() {
			var trips = MileageApp.request('trip:entities');
			
			var tripsListLayout = new List.Layout();
			var tripsListPanel = new List.Panel();
			
			var tripsListView = new List.Trips({
				collection : trips
			});
			
			tripsListLayout.on("show", function(){
				tripsListLayout.panelRegion.show(tripsListPanel);
				tripsListLayout.tripsRegion.show(tripsListView);
			});
			
			//always started from itemview, and trip:delete are defined in list_view
			tripsListView.on("itemview:trip:delete", function(childView,
					model) {
				model.destroy();
			});
			
			tripsListView.on("itemview:trip:show", function(childView, model) {
				MileageApp.trigger("trip:show", model.get("id"));
			});
			
			tripsListView.on("itemview:trip:edit", function(childView, model){
				MileageApp.trigger("trip:edit", model.get("id"));
			});
			
			MileageApp.mainRegion.show(tripsListLayout);
		}
	}
});