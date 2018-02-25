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
			
			this.countries = function(mode) {
				return httpService.get(URLS.user + '/master/get_country/'  + mode);
			};
			
			this.states = function(countryId) {
				return httpService.get(URLS.user + '/master/get_state_by_country_id/' + countryId);
			};
			
			this.cities = function(stateId) {
				return httpService.get(URLS.user + '/master/get_city_by_state_id/' + stateId);
			};
			
			
			
		} ]);