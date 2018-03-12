app.service("applicationService", [ 'httpService', 'URLS', "$rootScope","$http",
		function(httpService, URLS, $rootScope, $http) {
	
	this.getAll = function() {
		return httpService.get(URLS.user + "/application/getAll");
	};
	
	this.get = function(id) {
		return httpService.get(URLS.user + "/application/get/"+id);
	};
	
	this.save = function(data) {
		return httpService.post(URLS.user + "/application/save",data);
	};
	
}]);
