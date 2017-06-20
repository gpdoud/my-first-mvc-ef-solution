angular.module("PrsApp")
	.config(PrsConfig);

PrsConfig.$inject = ["$routeProvider", "$locationProvider"];

function PrsConfig($routeProvider, $locationProvider) {
	$locationProvider.hashPrefix('');
	$routeProvider
		.when('/', {
			templateUrl: 'views/home-view.html'
		})
		.when('/users', {
			templateUrl: 'views/users-view.html',
			controller: 'UserCtrl',
			controllerAs: 'ctrl'
		})
		.when('/users/detail/:id', {
			templateUrl: 'views/users-detail-view.html',
			controller: 'UserCtrl',
			controllerAs: 'ctrl'
		})
		.when('/users/edit/:id', {
			templateUrl: 'views/users-edit-view.html',
			controller: 'UserCtrl',
			controllerAs: 'ctrl'
		})
		.when('/about', {
			templateUrl: 'views/about-view.html'
		})
		.otherwise({
			redirectTo: '/'
		});
}