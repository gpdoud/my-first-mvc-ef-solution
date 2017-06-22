angular.module("PrsApp")
	.controller("VendorCtrl", VendorCtrl);

VendorCtrl.$inject = ["$http", "$routeParams", "$location"];

function VendorCtrl($http, $routeParams, $location) {
	var self = this;
	self.SelectedVendorId = $routeParams.id;

	self.PageTitle = "Vendor";

	self.Vendors = [];

	self.GetVendors = function() {
		$http.get("http://localhost:62008/Vendors/List")
		// $http.get("http://localhost:62008/api/Vendors")
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
		$http.get("http://localhost:62008/Vendors/Get/"+id.toString())	
		// $http.get("http://localhost:62008/api/Vendors/"+id.toString())	
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

	self.Update = function(Vendor) {
		$http.post("http://localhost:62008/Vendors/Change", Vendor)
		// $http.post("http://localhost:62008/api/Vendors", Vendor)
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
		$http.delete("http://localhost:62008/Vendors/Remove/" + id.toString())
		// $http.delete("http://localhost:62008/api/Vendors/" + id.toString())
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

	self.Add = function(Vendor) {
		$http.post("http://localhost:62008/vendors/add", Vendor)
		// $http.delete("http://localhost:62008/api/Vendors/" + id.toString())
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