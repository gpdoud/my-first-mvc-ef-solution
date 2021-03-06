angular.module("PrsApp")
	.controller("PurchaseRequestCtrl", PurchaseRequestCtrl);

PurchaseRequestCtrl.$inject = ["$http", "$routeParams", "$location"
	, "SystemSvc", "AuthenticationSvc", "PurchaseRequestSvc", "UserSvc"];

function PurchaseRequestCtrl($http, $routeParams, $location
	, SystemSvc, AuthenticationSvc, PurchaseRequestSvc, UserSvc) {
	var self = this;
	AuthenticationSvc.VerifyUserLogin();
	self.AuthenticatedUser = {
		Name: AuthenticationSvc.GetAuthenticatedUserNickname(),
		IsAdmin: AuthenticationSvc.IsUserAdmin(),
		IsReviewer: AuthenticationSvc.IsUserReviewer()
	}
	self.RemoteService = SystemSvc.RemoteService;
	
	self.SelectedPurchaseRequestId = $routeParams.id;
	self.PurchaseRequestStatus = PurchaseRequestSvc.PurchaseRequestStatus;
	self.PurchaseRequestStatuses = PurchaseRequestSvc.PurchaseRequestStatuses;
	self.NewPurchaseRequest = {
		Status: self.PurchaseRequestStatus.New,
		DateNeeded: SystemSvc.ConvertToJsonDate(new Date()),
		DocsAttached: false,
		Total: 0.00,
		DeliveryMode: 'USPS',
		UserId : AuthenticationSvc.GetAuthenticatedUser().ID
	};


	self.PageTitle = "PurchaseRequest";

	self.GetUsers = function() {
		UserSvc.List()
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
		PurchaseRequestSvc.List()
			.then(
				// if successful
				function(resp) {
					console.log("[LIST] SUCCESS!", resp);
					self.PurchaseRequests = [];
					var tempPurchaseRequests = resp.data;
					var loggedInUserId = AuthenticationSvc.GetAuthenticatedUser().ID;
					for(var idx in tempPurchaseRequests) {
						var pr = tempPurchaseRequests[idx];
						pr.DateNeeded = SystemSvc.ConvertToJsonDate(pr.DateNeeded);
						// if not an admin, include only PRs the user owns
						if(self.AuthenticatedUser.IsAdmin) {
							self.PurchaseRequests.push(pr);
						} else { // not an admin
							if(pr.UserId === loggedInUserId) {
								self.PurchaseRequests.push(pr);
							}
						}
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
		PurchaseRequestSvc.Get(id)
			.then(
				// if successful
				function(resp) {
					console.log("[GET] SUCCESS!", resp);
					self.SelectedPurchaseRequest = resp.data;
					var pr = self.SelectedPurchaseRequest;
					pr.DateNeeded = SystemSvc.ConvertToJsonDate(pr.DateNeeded);
				},
				// if error
				function(err) {
					console.log("[GET] ERROR:", err);

				}
			)
	}
	self.GetPurchaseRequest(self.SelectedPurchaseRequestId);

	self.GetPurchaseRequestsToReview = function() {
		PurchaseRequestSvc.List()
			.then(
				function(resp) {
					var purchaseRequests = resp.data;
					self.PurchaseRequestsToReview = [];
					for(var idx in purchaseRequests) {
						purchaseRequest = purchaseRequests[idx];
						if(purchaseRequest.Status === self.PurchaseRequestStatus.Review) {
							self.PurchaseRequestsToReview.push(purchaseRequest);
						}
					}
				},
				function(err) {
					ProcessAjaxError("GetPurchaseRequestsToReview", err);
				}
			);
	}
	self.GetPurchaseRequestsToReview();

	self.Review = function(id) {
		if(typeof id == 'undefined') {
			return;
		}
		self.SelectedPurchaseRequest.Status = self.PurchaseRequestStatus.Review;
		self.Update(self.SelectedPurchaseRequest);
	}

	self.Update = function(PurchaseRequest) {
		PurchaseRequestSvc.Change(PurchaseRequest)
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
		PurchaseRequestSvc.Remove(id)
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
		PurchaseRequest.Status = self.PurchaseRequestStatus.New;
		PurchaseRequestSvc.Add(PurchaseRequest)
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

	var ProcessAjaxError = function(funcname, err) {
		console.log("Ajax funcname %s, err %s", funcname, err);
	}

}