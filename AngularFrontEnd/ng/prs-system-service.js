angular.module("PrsApp")
	.service("SystemSvc", SystemSvc);

SystemSvc.$inject = ["$filter", "$location"];

function SystemSvc($filter, $location) {
	var self = this;
	self.about = "System Service";

	// self.AjaxUrl = "http://localhost:62008";
	self.AjaxUrl = "http://prs.gregorydoud.net";
	self.RemoteService = !self.AjaxUrl.includes('localhost');

	self.ConvertToJsonDate = function(value) {
		return $filter('date')(new Date(value), "MM/dd/yyyy");	
	}

};