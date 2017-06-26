angular.module("PrsApp")
	.service("UserSvc", UserSvc);

UserSvc.$inject = ["$http"];

function UserSvc($http) {
	var self = this;
	self.GetUsers = function() {
		$http.get("http://localhost:62008/Users/List")
			.then(
				// if successful
				function(resp) {
					console.log("[LIST] SUCCESS!", resp);
					return resp.data;
				},
				// if error
				function(err) {
					console.log("[LIST] ERROR:", err);
					return null;
				}
			)
		}
};