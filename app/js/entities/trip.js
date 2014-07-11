MileageApp.module('Entities', function(Entities, MileageApp, Backbone,
		Marionette, $, _) {
	Entities.Trip = Backbone.Model.extend({
		urlRoot: 'trips',
		
		defaults: {
			description: '',
			startMileage : 0,
			endMileage : 0
		},
		
		validate : function(attrs, options) {
			var errors = {}
			
			if (attrs.description === null || attrs.description === "null" || attrs.description.length < 1) {
				errors.description = "can't be blank";
			}
			
			var regex = '/^\d+$/';
			if ( !(attrs.startMileage.match(regex))){
				errors.startMileage = "must be integer";
			}
			
			if ( !(attrs.endMileage.match(regex))){
				errors.endMileage = "must be integer";
			} else {
				if (parseInt(attrs.startMileage, 10) >= parseInt(attrs.endMileage, 10)) {
					errors.endMileage = "end must greater than start";
				}
			}
			
			if (!_.isEmpty(errors)) {
				return errors;
			}
		}
	});
	
	Entities.configureStorage(Entities.Trip);
	
	Entities.TripCollection = Backbone.Collection.extend({
		url: 'trips',
		model : Entities.Trip
	});

	Entities.configureStorage(Entities.TripCollection);
	
	var initializeTrips = function() {
		var trips = new Entities.TripCollection([ {
			description : 'Home to Toronto',
			startMileage : 189553,
			endMileage : 189664,
		}, {
			description : 'Toronto to home',
			startMileage : 189664,
			endMileage : 189775
		}, {
			description : 'Toronto to nthome',
			startMileage : 189775,
			endMileage : 189790
		} ]);
		
		trips.forEach(function(trip){
			trip.save();
		});
		
		return trips.models;
	}

	var API = {
		getTripEntities : function() {
			var trips = new Entities.TripCollection();
			trips.fetch();
			
			if(trips.length === 0){
				return initializeTrips();
			}
			
			return trips;
		},
		getTripEntity: function(tripId){
			var trip = new Entities.Trip({id: tripId});
			trip.fetch();
			return trip;
		}
	};

	MileageApp.reqres.setHandler('trip:entities', function() {
		return API.getTripEntities();
	});
	
	MileageApp.reqres.setHandler("trip:entity", function(id) {
		return API.getTripEntity(id);
	});
});
