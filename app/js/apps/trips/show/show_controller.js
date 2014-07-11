MileageApp.module("TripsSys.Show", function(Show, MileageApp,
		Backbone, Marionette, $, _) {
	Show.Controller = {
		showTrip : function(id) {
			var trip = MileageApp.request("trip:entity", id);
			
			var tripView = new Show.Trip({
				model : trip
			});
			MileageApp.mainRegion.show(tripView);
		}
	}
});