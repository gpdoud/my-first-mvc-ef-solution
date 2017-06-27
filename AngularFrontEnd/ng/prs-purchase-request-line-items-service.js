angular.module("PrsApp")
	.service("PurchaseRequestLineItemSvc", Svc);

Svc.$inject = ["$http", "SystemSvc"];

function Svc($http, SystemSvc) {
	var self = this;
	var url = SystemSvc.AjaxUrl;
	var ctrlr = "PurchaseRequestLineItems"; // <<< THIS MUST CHANGE FOR NEW SERVICES
	self.List = function() {
		return $http.get(url + "/" + ctrlr + "/List");
	}
	self.Get = function(id) {
		return $http.get(url + "/" + ctrlr + "/Get/"+id);
	}
	self.Change = function(inst) {
		return $http.post(url + "/" + ctrlr + "/Change", inst);
	}
	self.Remove = function(id) {
		return $http.delete(url + "/" + ctrlr + "/Remove/" + id);
	}
	self.Add = function(inst) {
		return $http.post(url + "/" + ctrlr + "/Add", inst);
	}
};