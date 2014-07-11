MileageApp.module("TripsSys.Edit", function(Edit,
		MileageApp, Backbone, Marionette, $, _){
		
	Edit.Controller = {
		editTrip: function(id){
			
			var trip = MileageApp.request("trip:entity", id);
			var view = new Edit.Trip({
				model : trip
			});
			
			view.on("form:submit", function(data){
				if(trip.save(data)){
					MileageApp.trigger("trips:list");
					//MileageApp.trigger("trips:flash");
					//childView.flash("success");
				} else {
					view.triggerMethod("form:data:invalid", trip.validationError);
				}
			});
			
			MileageApp.mainRegion.show(view);
		}
	};
});