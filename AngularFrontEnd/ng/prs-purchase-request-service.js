angular.module("PrsApp")
	.service("PurchaseRequestSvc", Svc);

Svc.$inject = ["$http", "SystemSvc"];

function Svc($http, SystemSvc) {
	var self = this;
	var url = SystemSvc.AjaxUrl;
	var ctrlr = "PurchaseRequests"; // <<< THIS MUST CHANGE FOR NEW SERVICES
	self.PurchaseRequestStatus = {
		New : "NEW",
		InProcess: "INPROCESS",
		Review: "REVIEW",
		Approved: "APPROVED",
		Rejected: "REJECTED"
	};
	self.PurchaseRequestStatuses = [
		self.PurchaseRequestStatus.New,
		self.PurchaseRequestStatus.InProcess,
		self.PurchaseRequestStatus.Review,
		self.PurchaseRequestStatus.Approved,
		self.PurchaseRequestStatus.Rejected
	];

	self.GetPurchaseRequestId = function() {
		return self.PurchaseRequestId;
	}
	self.SetPurchaseRequestId = function(id) {
		self.PurchaseRequestId = id;
	}
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