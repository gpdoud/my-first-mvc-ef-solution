angular.module("PrsApp")
	.controller("PurchaseRequestCtrl", PurchaseRequestCtrl);

PurchaseRequestCtrl.$inject = ["$http", "$routeParams", "$location"];

function PurchaseRequestCtrl($http, $routeParams, $location) {
	var self = this;
	self.SelectedPurchaseRequestId = $routeParams.id;

	self.PageTitle = "PurchaseRequest";

	self.PurchaseRequests = [];

	self.GetUsers = function() {
		$http.get("http://localhost:62008/Users/List")
			.then(
				// if successful
				function(resp) {
					console.log("[GETUSERS] SUCCESS!", resp);
					self.Users = resp.data;
				},
				// if error
				function(err) {
					console.log("[GETUSERS] ERROR:", err);

				}
			)
	}
	self.GetUsers();

	self.GetPurchaseRequests = function() {
		$http.get("http://localhost:62008/PurchaseRequests/List")
		// $http.get("http://localhost:62008/api/PurchaseRequests")
			.then(
				// if successful
				function(resp) {
					console.log("[LIST] SUCCESS!", resp);
					self.PurchaseRequests = resp.data;
					for(var idx in self.PurchaseRequests) {
						var pr = self.PurchaseRequests[idx];
						pr.DateNeeded = Number(pr.DateNeeded.replace('/Date(','').replace(')/',''))
					}
				},
				// if error
				function(err) {
					console.log("[LIST] ERROR:", err);

				}
			)
	}
	self.GetPurchaseRequests();

	self.GetPurchaseRequest = function(id) {
		if(id == undefined)
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

	self.Update = function(PurchaseRequest) {
		$http.post("http://localhost:62008/PurchaseRequests/Change", PurchaseRequest)
		// $http.post("http://localhost:62008/api/PurchaseRequests", PurchaseRequest)
			.then(
				// if successful
				function(resp) {
					console.log("POST SUCCESS!", resp);
					$location.path("/purchaseRequests")
				},
				// if error
				function(err) {
					console.log("ERROR:", err);

				}
			)
	}

	self.Remove = function(id) {
		$http.delete("http://localhost:62008/PurchaseRequests/Remove/" + id.toString())
		// $http.delete("http://localhost:62008/api/PurchaseRequests/" + id.toString())
		.then(
			// if successful
			function(resp) {
				console.log("REMOVE SUCCESS!", resp);
				$location.path("/purchaseRequests")
			},
			// if error
			function(err) {
				console.log("REMOVE ERROR:", err);

			}
		)
	}

	self.Add = function(PurchaseRequest) {
		$http.post("http://localhost:62008/PurchaseRequests/add", PurchaseRequest)
		// $http.delete("http://localhost:62008/api/PurchaseRequests/" + id.toString())
		.then(
			// if successful
			function(resp) {
				console.log("ADD SUCCESS!", resp);
				$location.path("/purchaseRequests")
			},
			// if error
			function(err) {
				console.log("ADD ERROR:", err);

			}
		)
	}

}