angular.module("PrsApp")
	.service("SystemSvc", SystemSvc);

SystemSvc.$inject = ["$filter"];

function SystemSvc($filter) {
	var self = this;

	self.AjaxUrl = "http://localhost:62008";

	self.ConvertToJsonDate = function(value) {
		return $filter('date')(new Date(value), "MM/dd/yyyy");	
	}
};