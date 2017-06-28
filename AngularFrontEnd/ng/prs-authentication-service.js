angular.module("PrsApp")
	.service("AuthenticationSvc", AuthenticationSvc);

AuthenticationSvc.$inject = ["SystemSvc", "$location"];

function AuthenticationSvc(SystemSvc, $location) {
	var self = this;

	// for logged in user
	self.UserLoggedIn = function(user) {
		self.AuthenticatedUser = user;
	}
	self.UserLoggedOut = function() {
		self.AuthenticatedUser = void 0; // undefined
	}
	self.IsUserLoggedIn = function() {
		return (typeof self.AuthenticatedUser != 'undefined');
	}
	self.VerifyUserLogin = function() {
		if(!self.IsUserLoggedIn())
			$location.path("/login");
	}
	self.GetAuthenticatedUserNickname = function() {
		if(typeof self.AuthenticatedUser == 'undefined') {
			return 'Login';
		} else {
			return self.AuthenticatedUser.FirstName;
		}
	}
	self.IsUserAdmin = function() {
		if(self.IsUserLoggedIn())
			return self.AuthenticatedUser.IsAdmin;
		else
			return false;
	}
};