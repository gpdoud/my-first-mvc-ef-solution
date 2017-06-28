angular.module("PrsApp")
	.controller("VendorCtrl", VendorCtrl);

VendorCtrl.$inject = ["$http", "$routeParams", "$location", "VendorSvc", "SystemSvc"];

function VendorCtrl($http, $routeParams, $location, VendorSvc, SystemSvc) {
	var self = this;

	if(!SystemSvc.IsUserLoggedIn()) {
		$location.path('/login');
	}

	self.SelectedVendorId = $routeParams.id;

	self.PageTitle = "Vendor";

	self.Vendors = [];

	self.GetVendors = function() {
		// $http.get("http://localhost:62008/Vendors/List")
		// $http.get("http://localhost:62008/api/Vendors")
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
		// $http.get("http://localhost:62008/Vendors/Get/"+id.toString())	
		// $http.get("http://localhost:62008/api/Vendors/"+id.toString())
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
		// $http.post("http://localhost:62008/Vendors/Change", Vendor)
		// $http.post("http://localhost:62008/api/Vendors", Vendor)
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
		// $http.delete("http://localhost:62008/Vendors/Remove/" + id.toString())
		// $http.delete("http://localhost:62008/api/Vendors/" + id.toString())
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
		// $http.post("http://localhost:62008/vendors/add", Vendor)
		// $http.delete("http://localhost:62008/api/Vendors/" + id.toString())
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