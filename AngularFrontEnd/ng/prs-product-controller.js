angular.module("PrsApp")
	.controller("ProductCtrl", ProductCtrl);

ProductCtrl.$inject = ["$http", "$routeParams", "$location"];

function ProductCtrl($http, $routeParams, $location) {
	var self = this;
	self.SelectedProductId = $routeParams.id;

	self.PageTitle = "Product";

	self.Products = [];

	self.GetVendors = function() {
		$http.get("http://localhost:62008/Vendors/List")
		// $http.get("http://localhost:62008/api/Products")
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
		$http.get("http://localhost:62008/Products/List")
		// $http.get("http://localhost:62008/api/Products")
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
		$http.get("http://localhost:62008/Products/Get/"+id.toString())	
		// $http.get("http://localhost:62008/api/Products/"+id.toString())	
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
		$http.post("http://localhost:62008/Products/Change", Product)
		// $http.post("http://localhost:62008/api/Products", Product)
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
		$http.delete("http://localhost:62008/Products/Remove/" + id.toString())
		// $http.delete("http://localhost:62008/api/Products/" + id.toString())
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
		$http.post("http://localhost:62008/Products/add", Product)
		// $http.delete("http://localhost:62008/api/Products/" + id.toString())
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