angular.module("PrsApp")
	.controller("VendorCtrl", VendorCtrl);

VendorCtrl.$inject = ["$http", "$routeParams", "$location"
	, "VendorSvc", "SystemSvc", "AuthenticationSvc"];

function VendorCtrl($http, $routeParams, $location
	, VendorSvc, SystemSvc, AuthenticationSvc) {
	var self = this;

	AuthenticationSvc.VerifyUserLogin();
	self.AuthenticatedUser = {
		Name: AuthenticationSvc.GetAuthenticatedUserNickname(),
		IsAdmin: AuthenticationSvc.IsUserAdmin(),
		IsReviewer: AuthenticationSvc.IsUserReviewer()
	}
	self.RemoteService = SystemSvc.RemoteService;
	// self.IsUserAdmin = AuthenticationSvc.IsUserAdmin();

	self.SelectedVendorId = $routeParams.id;

	self.PageTitle = "Vendor";

	self.Vendors = [];

	self.GetVendors = function() {
		VendorSvc.List()
			.then(
				// if successful
				function(resp) {
					console.log("[LIST] SUCCESS!", resp);
					self.Vendors = resp.data;
				},
				// if error
				function(err) {
					console.log("[LIST] ERROR:", err);

				}
			)
	}
	self.GetVendors();

	self.GetVendor = function(id) {
		if(id == undefined)
			return;
		VendorSvc.Get(id)	
			.then(
				// if successful
				function(resp) {
					console.log("[GET] SUCCESS!", resp);
					self.SelectedVendor = resp.data;
				},
				// if error
				function(err) {
					console.log("[GET] ERROR:", err);

				}
			)
	}
	self.GetVendor(self.SelectedVendorId);

	self.Update = function(vendor) {
		VendorSvc.Change(vendor)
			.then(
				// if successful
				function(resp) {
					console.log("POST SUCCESS!", resp);
					$location.path("/vendors")
				},
				// if error
				function(err) {
					console.log("ERROR:", err);

				}
			)
	}

	self.Remove = function(id) {
		VendorSvc.Remove(id)
		.then(
			// if successful
			function(resp) {
				console.log("REMOVE SUCCESS!", resp);
				$location.path("/vendors")
			},
			// if error
			function(err) {
				console.log("REMOVE ERROR:", err);

			}
		)
	}

	self.Add = function(vendor) {
		VendorSvc.Add(vendor)
		.then(
			// if successful
			function(resp) {
				console.log("ADD SUCCESS!", resp);
				$location.path("/vendors")
			},
			// if error
			function(err) {
				console.log("ADD ERROR:", err);

			}
		)
	}

}