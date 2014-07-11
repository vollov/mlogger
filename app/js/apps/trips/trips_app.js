MileageApp.module('TripsSys', function(TripsSys, MileageApp,
		Backbone, Marionette, $, _) {
	
	TripsSys.Router = Marionette.AppRouter.extend({
		appRoutes : {
			'trips' : 'listTrips',
			'trips/:id': 'showTrip',
//			'trips/:id/edit': 'editTrip'
		}
	});
 
	var API = {
		listTrips : function() {
			TripsSys.List.Controller.listTrips();
		},
		showTrip : function(id) {
			TripsSys.Show.Controller.showTrip(id);
		},
//		editTrip: function(id){
//			TripsSys.Edit.Controller.editTrip(id);
//		},
//		flashTrip: function(id){
//			console.log("highlight updated trip");
//		}
	};

	MileageApp.on('trips:list', function() {
		MileageApp.navigate('trips');
		API.listTrips();
	});

//	MileageApp.on('trip:flash', function(id) {
//		API.flashTrip(id);
//	});
//	
	MileageApp.on('trip:show', function(id) {
		MileageApp.navigate('trips/' + id);
		API.showTrip(id);
	});
//	
//	MileageApp.on('trip:edit', function(id) {
//		MileageApp.navigate('trips/' + id + '/edit');
//		API.editTrip(id);
//	});
	
	MileageApp.addInitializer(function() {
		new TripsSys.Router({
			controller : API
		});
	});
});