angular.module("PrsApp")
	.service("SystemSvc", SystemSvc);

SystemSvc.$inject = [];

function SystemSvc() {
	var self = this;

	self.AjaxUrl = "http://localhost:62008";
};