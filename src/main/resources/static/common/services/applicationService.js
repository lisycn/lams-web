app.service("applicationService", [ 'httpService', 'URLS', "$rootScope","$http",
		function(httpService, URLS, $rootScope, $http) {
	
	this.getAll = function() {
		return httpService.get(URLS.user + "/application/getAll");
	};
	
	this.get = function(id) {
		return httpService.get(URLS.user + "/application/get/"+id);
	};
	
	this.getLoanDetails = function(id,appTypeId) {
		return httpService.get(URLS.user + "/application/getLoanDetails/" + id + "/" + appTypeId);
	};
	
	this.save = function(data) {
		return httpService.post(URLS.user + "/application/save",data);
	};
	
	this.getBorrowerForLender = function() {
		return httpService.get(URLS.user + "/application/get_borrowers_for_lender");
	};
	
}]);
