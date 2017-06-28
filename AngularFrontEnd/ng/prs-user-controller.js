angular.module("PrsApp")
	.controller("UserCtrl", UserCtrl);

UserCtrl.$inject = ["$http", "$routeParams", "$location", "UserSvc", "SystemSvc", "AuthenticationSvc"];

function UserCtrl($http, $routeParams, $location, UserSvc, SystemSvc, AuthenticationSvc) {
	var self = this;

	AuthenticationSvc.VerifyUserLogin();
	self.IsUserAdmin = AuthenticationSvc.IsUserAdmin();

	UserSvc.List()
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

	UserSvc.Get(self.SelectedUserId)
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
		UserSvc.Change(user)
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
		UserSvc.Remove(id)
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
		UserSvc.Add(user)
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