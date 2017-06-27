angular.module("PrsApp")
	.service("PurchaseRequestSvc", PurchaseRequestSvc);

PurchaseRequestSvc.$inject = [];

function PurchaseRequestSvc() {
	var self = this;

	self.PurchaseRequestId = 0;

	self.GetPurchaseRequestId = function() {
		return self.PurchaseRequestId;
	}
	
	self.SetPurchaseRequestId = function(id) {
		self.PurchaseRequestId = id;
	}
};