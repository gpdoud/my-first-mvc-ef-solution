angular.module("PrsApp")
	.controller("PurchaseRequestCtrl", PurchaseRequestCtrl);

PurchaseRequestCtrl.$inject = ["$http", "$routeParams", "$location", "SystemSvc", "AuthenticationSvc"];

function PurchaseRequestCtrl($http, $routeParams, $location, SystemSvc, AuthenticationSvc) {
	var self = this;
	AuthenticationSvc.VerifyUserLogin();
	self.IsUserAdmin = AuthenticationSvc.IsUserAdmin();
	
	self.SelectedPurchaseRequestId = $routeParams.id;
	self.PrStatus = {
		New : "NEW",
		Review: "REVIEW",
		Approved: "APPROVED",
		Rejected: "REJECTED"
	};
	self.NewPurchaseRequest = {
		Status: self.PrStatus.New,
		DateNeeded: SystemSvc.ConvertToJsonDate(new Date()),
		DocsAttached: false,
		Total: 0.00,
		DeliveryMode: 'USPS'
	};


	self.PageTitle = "PurchaseRequest";

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
						// pr.DateNeeded = Number(pr.DateNeeded.replace('/Date(','').replace(')/',''))
						// pr.DateNeeded = new Date(pr.DateNeeded);
						// pr.DateNeeded = $filter('date')(pr.DateNeeded, "MM/dd/yyyy");
						pr.DateNeeded = SystemSvc.ConvertToJsonDate(pr.DateNeeded);
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
					var pr = self.SelectedPurchaseRequest;
						// = Number(self.SelectedPurchaseRequest.DateNeeded.replace('/Date(','').replace(')/',''))
						// pr.DateNeeded = new Date(pr.DateNeeded);
						// pr.DateNeeded = $filter('date')(pr.DateNeeded, "MM/dd/yyyy");				},
					pr.DateNeeded = SystemSvc.ConvertToJsonDate(pr.DateNeeded);
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
		PurchaseRequest.Status = self.PrStatus.New;
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