MileageApp.module("TripsSys.Show", function(Show, MileageApp,
		Backbone, Marionette, $, _) {
	Show.Trip = Marionette.ItemView.extend({
		template : "#trip-view"
	});
});