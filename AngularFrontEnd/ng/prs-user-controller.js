angular.module("PrsApp")
	.controller("UserCtrl", UserCtrl);

UserCtrl.$inject = ["$http", "$routeParams", "$location", "UserSvc"];

function UserCtrl($http, $routeParams, $location, UserSvc) {
	var self = this;
	UserSvc.GetUsers()
		.then(
			function(resp) {
				self.Users = resp.data;
				console.log("SVC Success!");
			},
			function(err) {
				self.Users = [];
				console.log("SVC Failure.");
			}
		);
	self.SelectedUserId = $routeParams.id;

	self.PageTitle = "User";

	self.ShowPassword = function(tf) {
		self.DisplayPassword = tf;
	}
	self.ShowPassword(false);

	self.ToggleDisplayPassword = function() {
		self.ShowPassword(!self.DisplayPassword);
	}

	UserSvc.GetUser(self.SelectedUserId)
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
		);

	self.Update = function(user) {
		UserSvc.UpdateUser(user)
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
		UserSvc.RemoveUser(id)
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
		UserSvc.AddUser(user)
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