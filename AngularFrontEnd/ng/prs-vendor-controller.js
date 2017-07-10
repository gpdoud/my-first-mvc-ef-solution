angular.module("PrsApp")
	.controller("VendorCtrl", VendorCtrl);

VendorCtrl.$inject = ["$http", "$routeParams", "$location"
	, "VendorSvc", "SystemSvc", "AuthenticationSvc", "PurchaseRequestLineItemSvc"];

function VendorCtrl($http, $routeParams, $location
	, VendorSvc, SystemSvc, AuthenticationSvc, PurchaseRequestLineItemSvc) {
	var self = this;

	AuthenticationSvc.VerifyUserLogin();
	self.IsUserAdmin = AuthenticationSvc.IsUserAdmin();

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

	self.CreatePoForVendor = function(id) {
		self.PO = {};
		self.PO.Customer = AuthenticationSvc.GetAuthenticatedUser();
		VendorSvc.Get(id).then(
			function(resp) {
				self.PO.Vendor = resp.data;
			},
			function(err) {
				console.error(err);
			}
		);
		var purchaseRequestLineItemsForVendor = [];
		PurchaseRequestLineItemSvc.List().then(
			function(resp) {
				for(var idx in resp.data) {
					var purchaseRequestLineItem = resp.data[idx];
					if(purchaseRequestLineItem.Product.VendorId === Number(id)) {
						purchaseRequestLineItemsForVendor.push(purchaseRequestLineItem);
					}
				}
				AccumulateProductQuantityAmounts(purchaseRequestLineItemsForVendor);
			},
			function(err) {
				console.error(err);
			}
		);

	};
	self.CreatePoForVendor(self.SelectedVendorId);
	var AccumulateProductQuantityAmounts = function(purchaseRequestLineItems) {
		var tempPrLines = {}
		for(var idx in purchaseRequestLineItems) {
			var productId = purchaseRequestLineItems[idx].ProductId;
			var productName = purchaseRequestLineItems[idx].Product.Name;
			var quantity = purchaseRequestLineItems[idx].Quantity;
			if(typeof tempPrLines[productName] === 'undefined') {
				tempPrLines[productName] = {};
				tempPrLines[productName]['Quantity'] = quantity;
				tempPrLines[productName]['PurchaseRequestLineItem'] = purchaseRequestLineItems[idx];
			} else {
				tempPrLines[productName]['Quantity'] += quantity;
			}
		}
		// normalize the purchase request line item object
		self.PO.LineItems = [];
		var keys = Object.keys(tempPrLines);
		for(var key of keys) {
			var prln = tempPrLines[key];
			var poLine = {
				Product: prln.PurchaseRequestLineItem.Product.Name,
				Quantity: prln.PurchaseRequestLineItem.Quantity,
				Price: prln.PurchaseRequestLineItem.Product.Price * .7,
				LineTotal: prln.PurchaseRequestLineItem.Quantity * prln.PurchaseRequestLineItem.Product.Price * .7
			};
			self.PO.LineItems.push(poLine);
		}
		// calculate po subtotal
		self.PO.Subtotal = 0;
		for(var idx in self.PO.LineItems) {
			var poLine = self.PO.LineItems[idx];
			self.PO.Subtotal += poLine.LineTotal;
		}
		// calcuate tax and shipping
		self.PO.Tax = self.PO.Subtotal * .1;
		self.PO.Shipping = self.PO.Subtotal * .5;
		// calcualte grand total
		self.PO.Total = self.PO.Subtotal + self.PO.Tax + self.PO.Shipping;
	}
}