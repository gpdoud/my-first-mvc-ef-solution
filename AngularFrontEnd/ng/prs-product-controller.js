angular.module("PrsApp")
	.controller("ProductCtrl", ProductCtrl);

ProductCtrl.$inject = ["$http", "$routeParams", "$location", "SystemSvc", "AuthenticationSvc", 
					'VendorSvc', 'ProductSvc'];

function ProductCtrl($http, $routeParams, $location, SystemSvc, AuthenticationSvc, 
					VendorSvc, ProductSvc) {
	var self = this;
	AuthenticationSvc.VerifyUserLogin();
	self.AuthenticatedUser = {
		Name: AuthenticationSvc.GetAuthenticatedUserNickname(),
		IsAdmin: AuthenticationSvc.IsUserAdmin(),
		IsReviewer: AuthenticationSvc.IsUserReviewer()
	}
	self.RemoteService = SystemSvc.RemoteService;
	// self.IsUserAdmin = AuthenticationSvc.IsUserAdmin();

	self.SelectedProductId = $routeParams.id;

	self.PageTitle = "Product";

	self.Products = [];

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

	self.GetProducts = function() {
		ProductSvc.List()
			.then(
				// if successful
				function(resp) {
					console.log("[LIST] SUCCESS!", resp);
					self.Products = resp.data;
				},
				// if error
				function(err) {
					console.log("[LIST] ERROR:", err);

				}
			)
	}
	self.GetProducts();

	self.GetProduct = function(id) {
		if(id == undefined)
			return;
		ProductSvc.Get(id)	
			.then(
				// if successful
				function(resp) {
					console.log("[GET] SUCCESS!", resp);
					self.SelectedProduct = resp.data;
				},
				// if error
				function(err) {
					console.log("[GET] ERROR:", err);

				}
			)
	}
	self.GetProduct(self.SelectedProductId);

	self.Update = function(Product) {
		ProductSvc.Change(Product)
			.then(
				// if successful
				function(resp) {
					console.log("POST SUCCESS!", resp);
					$location.path("/products")
				},
				// if error
				function(err) {
					console.log("ERROR:", err);

				}
			)
	}

	self.Remove = function(id) {
		ProductSvc.Remove(id)
		.then(
			// if successful
			function(resp) {
				console.log("REMOVE SUCCESS!", resp);
				$location.path("/products")
			},
			// if error
			function(err) {
				console.log("REMOVE ERROR:", err);

			}
		)
	}

	self.Add = function(Product) {
		ProductSvc.Add(Product)
		.then(
			// if successful
			function(resp) {
				console.log("ADD SUCCESS!", resp);
				$location.path("/products")
			},
			// if error
			function(err) {
				console.log("ADD ERROR:", err);

			}
		)
	}

}