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
		.otherwise({
			redirectTo: '/'
		});
}