var MileageApp = new Marionette.Application();

MileageApp.addRegions({
	mainRegion : '#main-region'
});

MileageApp.navigate = function(route, options) {
	options || (options = {});
	Backbone.history.navigate(route, options);
};

MileageApp.getCurrentRoute = function() {
	return Backbone.history.fragment
};

MileageApp.on('initialize:after', function() {
	if(Backbone.history){
		//Backbone.history.start({pushState: true});
		Backbone.history.start();
	}
	
	if(this.getCurrentRoute() === ''){
		MileageApp.trigger('trips:list');
	}
});
