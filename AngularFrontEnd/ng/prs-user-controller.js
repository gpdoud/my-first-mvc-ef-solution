angular.module("PrsApp")
	.controller("UserCtrl", UserCtrl);

UserCtrl.$inject = ["$http", "$routeParams", "$location"];

function UserCtrl($http, $routeParams, $location) {
	var self = this;
	self.SelectedUserId = $routeParams.id;

	self.PageTitle = "User";

	self.Users = [];

	$http.get("http://localhost:62008/Users/List")
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

	$http.get("http://localhost:62008/Users/Get/"+self.SelectedUserId)	
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

		self.Update = function(user) {
			$http.post("http://localhost:62008/Users/Change", user)
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
			$http.post("http://localhost:62008/Users/Remove/" + id.toString())
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
}