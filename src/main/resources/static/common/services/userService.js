app.service("userService", [ 'httpService', 'URLS', "$rootScope","$http",
		function(httpService, URLS, $rootScope, $http) {

			this.pingRequest = function() {
				return httpService.get(URLS.user + "/ping");
			};

			this.register = function(data) {
				return httpService.post(URLS.user + '/registration', data);
			};

			this.login = function(data) {
				return httpService.post(URLS.user + '/login', data);
			};
			
			this.logout = function() {
				return httpService.get(URLS.user + '/logout');
			};
			
			this.getLoggedInUserDetail = function() {
				return httpService.get(URLS.user + '/get_user_details');
			};
			
			this.updateUserDetail = function(userObj) {
				return httpService.post(URLS.user + '/update_user_details',userObj);
			};
			
//			this.verifyAccount = function(email) {
//				return httpService.get(URLS.user + "/verify_account/" + email);
//			};
			
			
		} ]);