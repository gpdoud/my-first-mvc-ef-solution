angular.module("PrsApp")
	.controller("PurchaseRequestLineItemCtrl", PurchaseRequestLineItemCtrl);

PurchaseRequestLineItemCtrl.$inject = ["$http", "$routeParams", "$location", "$route", "PurchaseRequestSvc"];

function PurchaseRequestLineItemCtrl($http, $routeParams, $location, $route, PurchaseRequestSvc) {
	var self = this;
	self.SelectedPurchaseRequestLineItemId = $routeParams.id;
	self.SelectedPurchaseRequestId = $routeParams.prId;
	if(typeof $routeParams.prId != 'undefined') {
		PurchaseRequestSvc.SetPurchaseRequestId(self.SelectedPurchaseRequestId);
	}

	self.PageTitle = "PurchaseRequestLineItems";

	self.PurchaseRequests = [];

	self.GetProducts = function() {
		$http.get("http://localhost:62008/Products/List")
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
		$http.get("http://localhost:62008/PurchaseRequests/Get/"+id.toString())	
		// $http.get("http://localhost:62008/api/PurchaseRequests/"+id.toString())	
			.then(
				// if successful
				function(resp) {
					console.log("[GET] SUCCESS!", resp);
					self.SelectedPurchaseRequest = resp.data;
					self.SelectedPurchaseRequest.DateNeeded 
						= Number(self.SelectedPurchaseRequest.DateNeeded.replace('/Date(','').replace(')/',''))
				},
				// if error
				function(err) {
					console.log("[GET] ERROR:", err);

				}
			)
	}
	self.GetPurchaseRequest(self.SelectedPurchaseRequestId);	

	self.GetPurchaseRequestLineItems = function(prId) {
		var action = (prId == undefined) ? "List" : "ListByPurchaseRequest/" + prId.toString();
		$http.get("http://localhost:62008/PurchaseRequestLineItems/" + action)
		// $http.get("http://localhost:62008/api/PurchaseRequests")
			.then(
				// if successful
				function(resp) {
					console.log("[LIST] SUCCESS!", resp);
					self.PurchaseRequestLineItems = resp.data;
					// if(prId == undefined) {
					// self.PurchaseRequestLineItems = resp.data;
					// } else {
					// 	self.PurchaseRequestLineItems = [];
					// 	for(var idx in resp.data) {
					// 		var prItem = resp.data[idx];
					// 		if(prItem.PurchaseRequestId == prId) {
					// 			self.PurchaseRequestLineItems.push(prItem);
					// 		}
					// 	}
					// }
				},
				// if error
				function(err) {
					console.log("[LIST] ERROR:", err);

				}
			)
	}
	self.GetPurchaseRequestLineItems(self.SelectedPurchaseRequestId);

	self.GetPurchaseRequestLineItem = function(id) {
		if(id == undefined)
			return;
		$http.get("http://localhost:62008/PurchaseRequestLineItems/Get/"+id.toString())	
		// $http.get("http://localhost:62008/api/PurchaseRequests/"+id.toString())	
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
		$http.post("http://localhost:62008/PurchaseRequestLineItems/Change", PurchaseRequestLineItem)
		// $http.post("http://localhost:62008/api/PurchaseRequests", PurchaseRequest)
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
		$http.delete("http://localhost:62008/PurchaseRequestLineItems/Remove/" + id.toString())
		// $http.delete("http://localhost:62008/api/PurchaseRequests/" + id.toString())
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
		$http.post("http://localhost:62008/PurchaseRequestLineItems/add", PurchaseRequestLineItem)
		// $http.delete("http://localhost:62008/api/PurchaseRequests/" + id.toString())
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

}