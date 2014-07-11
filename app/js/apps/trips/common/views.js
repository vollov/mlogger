MileageApp.module("ContactsApp.Common.Views", function(Views,
		MileageApp, Backbone, Marionette, $, _) {
	Views.Form = Marionette.ItemView.extend({
		template : "#trip-form",
		
		events : {
			"click button.js-submit" : "submitClicked"
		},

		submitClicked : function(e) {
			e.preventDefault();
			var data = Backbone.Syphon.serialize(this);
			this.trigger("form:submit", data);
			//console.log("edit trip");
		},
		
		onFormDataInvalid: function(errors){
			console.log("invalid form data: ", errors);
			var $view = this.$el;

			var clearFormErrors = function() {
				var $form = $view.find("form");
				$form.find(".help-inline .text-danger").each(function() {
					$(this).remove();
				});
				$form.find(".control-group .text-danger").each(function() {
					$(this).removeClass("text-danger");
				});
			}
			
			var markErrors = function(value, key){
				var $controlGroup = $view.find("#trip-" + key).parent();
				var $errorEl = $("<span>", {class: "help-inline text-danger", text: value});
				$controlGroup.append($errorEl).addClass("text-danger");
			}
			clearFormErrors();
			_.each(errors, markErrors);
		}
	});
});