angular.module('PrsApp')
	.controller('PurchaseOrderCtrl', PurchaseOrderCtrl);

PurchaseOrderCtrl.$inject = ["$routeParams", "$location", 'AuthenticationSvc', 'PurchaseRequestLineItemSvc', 'VendorSvc'];

function PurchaseOrderCtrl($routeParams, $location, AuthenticationSvc, PurchaseRequestLineItemSvc, VendorSvc) {
	var self = this;
	self.IsUserAdmin = AuthenticationSvc.IsUserAdmin();
	self.SelectedVendorId = $routeParams.id;
	self.PageTitle = "Purchase Order";

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

};