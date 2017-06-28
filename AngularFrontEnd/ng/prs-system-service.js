angular.module("PrsApp")
	.service("SystemSvc", SystemSvc);

SystemSvc.$inject = ["$filter"];

function SystemSvc($filter) {
	var self = this;
	self.about = "System Service";

	self.AjaxUrl = "http://localhost:62008";

	self.ConvertToJsonDate = function(value) {
		return $filter('date')(new Date(value), "MM/dd/yyyy");	
	}
	// for logged in user
	self.UserLoggedIn = function(user) {
		self.UserAuthenticated = user;
	}
	self.UserLoggedOut = function() {
		self.UserAuthenticated = void 0; // undefined
	}
	self.IsUserLoggedIn = function() {
		return (typeof self.UserAuthenticated != 'undefined');
	}
};