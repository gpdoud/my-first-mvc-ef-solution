angular.module("PrsApp")
	.service("UserSvc", UserSvc);

UserSvc.$inject = ["$http"];

function UserSvc($http) {
	var self = this;
	self.GetUsers = function() {
		return $http.get("http://localhost:62008/Users/List");
	}
	self.GetUser = function(id) {
		return $http.get("http://localhost:62008/Users/Get/"+id);
	}
};