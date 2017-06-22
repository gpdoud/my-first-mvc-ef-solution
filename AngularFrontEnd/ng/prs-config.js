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
		.otherwise({
			redirectTo: '/'
		});
}