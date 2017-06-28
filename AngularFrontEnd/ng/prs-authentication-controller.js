angular.module("PrsApp")
	.controller("AuthenticationCtrl", AuthenticationCtrl);

AuthenticationCtrl.$inject = ["SystemSvc", "AuthenticationSvc","UserSvc", "$location"];

function AuthenticationCtrl(SystemSvc, AuthenticationSvc, UserSvc, $location) {
	var self = this;
	self.IsUserLoggedIn = AuthenticationSvc.IsUserLoggedIn();

	self.ValidateUser = function(username, password) {
		AuthenticationSvc.UserLoggedOut(); // log out
		UserSvc.List()
		.then(
			function(resp) {
				Users = resp.data;
				console.log("SVC Success!");
				return SearchForUserAndPassword(username, password, Users);
			},
			function(err) {
				Users = [];
				console.log("SVC Failure.");
			}
		);
	}

	var SearchForUserAndPassword = function(username, password, users) {
		for(var idx in users) {
			var user = users[idx];
			if(user.UserName.toLowerCase() === username.toLowerCase() 
				&& user.Password === password) {
				self.Login.Message = "Login Successful!";
				AuthenticationSvc.UserLoggedIn(user);
				$location.path('/')
				return true;
			}
		}
		self.Login.Message = "Login failed!";
		AuthenticationSvc.UserLoggedOut();
		return false;
	}

};