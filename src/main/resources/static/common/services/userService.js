app.service("userService", [ 'httpService', 'URLS', "$rootScope","$http",
		function(httpService, URLS, $rootScope, $http) {

			this.pingRequest = function() {
				return httpService.get(URLS.user + "/ping");
			};

			this.register = function(data) {
				return httpService.post('http://localhost:8181/lams/registration', data);
			};

			this.login = function(data) {
				return httpService.post('http://localhost:8181/lams/login', data);
			};
		} ]);