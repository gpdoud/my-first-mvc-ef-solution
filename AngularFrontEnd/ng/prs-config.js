angular.module("PrsApp")
	.config(PrsConfig);

PrsConfig.$inject = ["$routeProvider", "$locationProvider"];

function PrsConfig($routeProvider, $locationProvider) {
	$locationProvider.hashPrefix('');
	$routeProvider
		.when('/', {
			templateUrl: 'views/home-view.html'
		})
		.when('/about', {
			templateUrl: 'views/about-view.html'
		})
		// *** User Views ***
		.when('/users', {
			templateUrl: 'views/users/users-view.html',
			controller: 'UserCtrl',
			controllerAs: 'ctrl'
		})
		.when('/users/detail/:id', {
			templateUrl: 'views/users/users-detail-view.html',
			controller: 'UserCtrl',
			controllerAs: 'ctrl'
		})
		.when('/users/edit/:id', {
			templateUrl: 'views/users/users-edit-view.html',
			controller: 'UserCtrl',
			controllerAs: 'ctrl'
		})
		.when('/users/add', {
			templateUrl: 'views/users/users-create-view.html',
			controller: 'UserCtrl',
			controllerAs: 'ctrl'
		})
		// *** Authentication Views ***
		.when('/login', {
			templateUrl: 'views/authentication-login-view.html',
			controller: 'AuthenticationCtrl',
			controllerAs: 'ctrl'
		})
		// *** Vendor Views ***
		.when('/vendors', {
			templateUrl: 'views/vendors/vendors-view.html',
			controller: 'VendorCtrl',
			controllerAs: 'ctrl'
		})
		.when('/vendors/detail/:id', {
			templateUrl: 'views/vendors/vendors-detail-view.html',
			controller: 'VendorCtrl',
			controllerAs: 'ctrl'
		})
		.when('/vendors/edit/:id', {
			templateUrl: 'views/vendors/vendors-edit-view.html',
			controller: 'VendorCtrl',
			controllerAs: 'ctrl'
		})
		.when('/vendors/add', {
			templateUrl: 'views/vendors/vendors-create-view.html',
			controller: 'VendorCtrl',
			controllerAs: 'ctrl'
		})
		// .when('/vendors/po/:id', {
		// 	templateUrl: 'views/vendors/vendors-po-view.html',
		// 	controller: 'VendorCtrl',
		// 	controllerAs: 'ctrl'
		// })
		// *** Purchase Order ***
		.when('/purchaseOrder/po/:id', {
			templateUrl: 'views/purchaseOrder/purchaseOrder-po-view.html',
			controller: 'PurchaseOrderCtrl',
			controllerAs: 'ctrl'
		})
		// *** Product Views ***
		.when('/products', {
			templateUrl: 'views/products/products-view.html',
			controller: 'ProductCtrl',
			controllerAs: 'ctrl'
		})
		.when('/products/detail/:id', {
			templateUrl: 'views/products/products-detail-view.html',
			controller: 'ProductCtrl',
			controllerAs: 'ctrl'
		})
		.when('/products/edit/:id', {
			templateUrl: 'views/products/products-edit-view.html',
			controller: 'ProductCtrl',
			controllerAs: 'ctrl'
		})
		.when('/products/add', {
			templateUrl: 'views/products/products-create-view.html',
			controller: 'ProductCtrl',
			controllerAs: 'ctrl'
		})
		// *** PurchaseRequest Views ***
		.when('/purchaseRequests', {
			templateUrl: 'views/purchaseRequests/purchaseRequests-view.html',
			controller: 'PurchaseRequestCtrl',
			controllerAs: 'ctrl'
		})
		.when('/purchaseRequests/detail/:id', {
			templateUrl: 'views/purchaseRequests/purchaseRequests-detail-view.html',
			controller: 'PurchaseRequestCtrl',
			controllerAs: 'ctrl'
		})
		.when('/purchaseRequests/edit/:id', {
			templateUrl: 'views/purchaseRequests/purchaseRequests-edit-view.html',
			controller: 'PurchaseRequestCtrl',
			controllerAs: 'ctrl'
		})
		.when('/purchaseRequests/add', {
			templateUrl: 'views/purchaseRequests/purchaseRequests-create-view.html',
			controller: 'PurchaseRequestCtrl',
			controllerAs: 'ctrl'
		})
		.when('/purchaseRequests/review', {
			templateUrl: 'views/purchaseRequests/purchaseRequests-review-view.html',
			controller: 'PurchaseRequestCtrl',
			controllerAs: 'ctrl'
		})
		// *** PurchaseRequestLineItem Views ***
		.when('/purchaseRequestLineItems/view/:prId', 
			{templateUrl: 'views/purchaseRequestLineItems/purchaseRequestLineItems-view.html',
			controller: 'PurchaseRequestLineItemCtrl',
			controllerAs: 'ctrl'
		})
		.when('/purchaseRequestLineItems/detail/:id', 
			{templateUrl: 'views/purchaseRequestLineItems/purchaseRequestLineItems-detail-view.html',
			controller: 'PurchaseRequestLineItemCtrl',
			controllerAs: 'ctrl'
		})
		.when('/purchaseRequestLineItems/edit/:id', 
			{templateUrl: 'views/purchaseRequestLineItems/purchaseRequestLineItems-edit-view.html',
			controller: 'PurchaseRequestLineItemCtrl',
			controllerAs: 'ctrl'
		})
		.when('/purchaseRequestLineItems/add/:prId', 
			{templateUrl: 'views/purchaseRequestLineItems/purchaseRequestLineItems-create-view.html',
			controller: 'PurchaseRequestLineItemCtrl',
			controllerAs: 'ctrl'
		})
		.when('/purchaseRequestLineItems/review/:id', 
			{templateUrl: 'views/purchaseRequestLineItems/purchaseRequestLineItems-approve-reject-view.html',
			controller: 'PurchaseRequestLineItemCtrl',
			controllerAs: 'ctrl'
		})
		.otherwise({
			redirectTo: '/'
		});
}