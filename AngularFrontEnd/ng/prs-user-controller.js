angular.module("PrsApp")
	.controller("UserCtrl", UserCtrl);

UserCtrl.$inject = ["$http", "$routeParams", "$location", "UserSvc"];

function UserCtrl($http, $routeParams, $location, UserSvc) {
	var self = this;
	self.SelectedUserId = $routeParams.id;

	self.PageTitle = "User";

	self.ShowPassword = function(tf) {
		self.DisplayPassword = tf;
	}
	self.ShowPassword(false);

	self.ToggleDisplayPassword = function() {
		self.ShowPassword(!self.DisplayPassword);
	}

	self.Users = [];

	self.GetUsers = function() {
		$http.get("http://localhost:62008/Users/List")
		// $http.get("http://localhost:62008/api/Users")
			.then(
				// if successful
				function(resp) {
					console.log("[LIST] SUCCESS!", resp);
					self.Users = resp.data;
				},
				// if error
				function(err) {
					console.log("[LIST] ERROR:", err);

				}
			)
	}
	self.GetUsers();
	// self.Users = UserSvc.GetUsers();

	self.GetUser = function(id) {
		if(id == undefined)
			return;
		$http.get("http://localhost:62008/Users/Get/"+id.toString())	
		// $http.get("http://localhost:62008/api/Users/"+id.toString())	
			.then(
				// if successful
				function(resp) {
					console.log("[GET] SUCCESS!", resp);
					self.SelectedUser = resp.data;
				},
				// if error
				function(err) {
					console.log("[GET] ERROR:", err);

				}
			)
	}
	self.GetUser(self.SelectedUserId);

	self.Update = function(user) {
		$http.post("http://localhost:62008/Users/Change", user)
		// $http.post("http://localhost:62008/api/Users", user)
			.then(
				// if successful
				function(resp) {
					console.log("POST SUCCESS!", resp);
					$location.path("/users")
				},
				// if error
				function(err) {
					console.log("ERROR:", err);

				}
			)
	}

	self.Remove = function(id) {
		$http.delete("http://localhost:62008/Users/Remove/" + id.toString())
		// $http.delete("http://localhost:62008/api/Users/" + id.toString())
		.then(
			// if successful
			function(resp) {
				console.log("REMOVE SUCCESS!", resp);
				$location.path("/users")
			},
			// if error
			function(err) {
				console.log("REMOVE ERROR:", err);

			}
		)
	}

	self.Add = function(user) {
		$http.post("http://localhost:62008/Users/Add", user)
		// $http.delete("http://localhost:62008/api/Users/" + id.toString())
		.then(
			// if successful
			function(resp) {
				console.log("ADD SUCCESS!", resp);
				$location.path("/users")
			},
			// if error
			function(err) {
				console.log("ADD ERROR:", err);

			}
		)
	}

}