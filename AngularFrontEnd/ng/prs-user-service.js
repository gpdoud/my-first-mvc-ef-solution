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
	self.UpdateUser = function(user) {
		return $http.post("http://localhost:62008/Users/Change", user);
	}
	self.RemoveUser = function(id) {
		return $http.delete("http://localhost:62008/Users/Remove/" + id);
	}
	self.AddUser = function(user) {
		return $http.post("http://localhost:62008/Users/Add", user);
	}
};