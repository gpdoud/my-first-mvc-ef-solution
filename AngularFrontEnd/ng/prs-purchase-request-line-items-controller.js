angular.module("PrsApp")
	.controller("PurchaseRequestLineItemCtrl", PurchaseRequestLineItemCtrl);

PurchaseRequestLineItemCtrl.$inject = ["$http", "$routeParams", "$location", "$route", 
				"PurchaseRequestSvc", "SystemSvc", "AuthenticationSvc", 'ProductSvc', 'PurchaseRequestLineItemSvc'];

function PurchaseRequestLineItemCtrl($http, $routeParams, $location, $route, 
				PurchaseRequestSvc, SystemSvc, AuthenticationSvc, ProductSvc, PurchaseRequestLineItemSvc) {
	var self = this;
	AuthenticationSvc.VerifyUserLogin();
	self.IsUserAdmin = AuthenticationSvc.IsUserAdmin();
	
	self.SelectedPurchaseRequestLineItemId = $routeParams.id;
	self.SelectedPurchaseRequestId = $routeParams.prId;
	if(typeof $routeParams.prId != 'undefined') {
		PurchaseRequestSvc.SetPurchaseRequestId(self.SelectedPurchaseRequestId);
	}

	self.PageTitle = "PurchaseRequestLineItems";

	self.PurchaseRequests = [];

	self.GetProducts = function() {
		ProductSvc.List()
			.then(
				// if successful
				function(resp) {
					console.log("[GETPRODUCTS] SUCCESS!", resp);
					self.Products = resp.data;
				},
				// if error
				function(err) {
					console.log("[GETPRODUCTS] ERROR:", err);

				}
			)
	}
	self.GetProducts();

	self.GetPurchaseRequest = function(id) {
		if(typeof id == 'undefined')
			return;
		PurchaseRequestSvc.Get(id)	
			.then(
				// if successful
				function(resp) {
					console.log("[GET] SUCCESS!", resp);
					self.SelectedPurchaseRequest = resp.data;
					if(self.SelectedPurchaseRequest != "") {
						self.SelectedPurchaseRequest.DateNeeded 
							= Number(self.SelectedPurchaseRequest.DateNeeded.replace('/Date(','').replace(')/',''))
					}
				},
				// if error
				function(err) {
					console.log("[GET] ERROR:", err);

				}
			)
	}
	self.GetPurchaseRequest(self.SelectedPurchaseRequestId);	

	self.GetPurchaseRequestLineItems = function() {
		PurchaseRequestLineItemSvc.List()
			.then(
				function(resp) {
					console.log("[LIST] SUCCESS!", resp);
					self.PurchaseRequestLineItems = resp.data;
				},
				function(err) {
					console.log("[LIST] ERROR:", err);

				}
			)
	}
	self.GetPurchaseRequestLineItems = function(prId) {
		PurchaseRequestLineItemSvc.GetByPurchaseRequestId(prId)
			.then(
				function(resp) {
					console.log("[GetByPurchaseRequestId] SUCCESS!", resp);
					self.PurchaseRequestLineItems = resp.data;
				},
				function(err) {
					console.log("[GetByPurchaseRequestId] ERROR:", err);

				}
			)
	}
	self.GetPurchaseRequestLineItems(self.SelectedPurchaseRequestId);

	self.GetPurchaseRequestLineItem = function(id) {
		if(id == undefined)
			return;
		PurchaseRequestLineItemSvc.Get(id)	
			.then(
				// if successful
				function(resp) {
					console.log("[GET] SUCCESS!", resp);
					self.SelectedPurchaseRequestLineItem = resp.data;
				},
				// if error
				function(err) {
					console.log("[GET] ERROR:", err);

				}
			)
	}
	self.GetPurchaseRequestLineItem(self.SelectedPurchaseRequestLineItemId);

	self.Update = function(PurchaseRequestLineItem) {
		PurchaseRequestLineItemSvc.Change(PurchaseRequestLineItem)
			.then(
				// if successful
				function(resp) {
					console.log("POST SUCCESS!", resp);
					$location.path("/purchaseRequestLineItems/view/" + PurchaseRequestSvc.GetPurchaseRequestId());
				},
				// if error
				function(err) {
					console.log("ERROR:", err);

				}
			)
	}

	self.Remove = function(id) {
		PurchaseRequestLineItemSvc.Remove(id)
		.then(
			// if successful
			function(resp) {
				console.log("REMOVE SUCCESS!", resp);
				$location.path("/purchaseRequestLineItems/view/" + self.SelectedPurchaseRequestId);
				// location.reload();
				$route.reload();
			},
			// if error
			function(err) {
				console.log("REMOVE ERROR:", err);

			}
		)
	}

	self.Add = function(PurchaseRequestLineItem) {
		PurchaseRequestLineItem.PurchaseRequestId = self.SelectedPurchaseRequestId;
		PurchaseRequestLineItemSvc.Add(PurchaseRequestLineItem)
		.then(
			// if successful
			function(resp) {
				console.log("ADD SUCCESS!", resp);
				$location.path("/purchaseRequestLineItems/view/" + self.SelectedPurchaseRequestId);
			},
			// if error
			function(err) {
				console.log("ADD ERROR:", err);

			}
		)
	}

	self.Approve = function(purchaseRequestId) {
		SetPurchaseRequestStatus(purchaseRequestId, "APPROVED");
	}

	self.Reject = function(purchaseRequestId) {
		SetPurchaseRequestStatus(purchaseRequestId, "REJECTED");
	}

	var SetPurchaseRequestStatus = function(purchaseRequestId, status) {
		var PurchaseRequestToApprove = void 0;
		PurchaseRequestSvc.Get(purchaseRequestId)
			.then(
				function(resp) {
					PurchaseRequestToApprove = resp.data;
					PurchaseRequestToApprove.Status = status;
					ChangePurchaseRequest(PurchaseRequestToApprove);
				},
				function(err) {
					console.log(err);
				}
			)
	}
	var ChangePurchaseRequest = function(PurchaseRequest) {
		PurchaseRequestSvc.Change(PurchaseRequest)
			.then(
				function(resp) {
					console.log(status, resp);
					$location.path("/purchaseRequests/review");
				},
				function(err) {
					console.log(err);
				}
			)	
	}
}