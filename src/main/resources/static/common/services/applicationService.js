app.service("applicationService", [ 'httpService', 'URLS', "$rootScope","$http",
		function(httpService, URLS, $rootScope, $http) {
	
	this.getAll = function() {
		return httpService.get(URLS.user + "/application/getAll");
	};
	
	this.get = function(id) {
		return httpService.get(URLS.user + "/application/get/"+id);
	};
	
	this.getRespondedApplications = function(brId, appId) {
		return httpService.get(URLS.user + "/application/get_responded_application/" +brId + "/" + appId);
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
	
	this.getBorrowerForLenderByApplicationId = function(appId,status) {
		return httpService.get(URLS.user + "/application/get_borrowers_for_lender_app_id/" + appId + "/" + status);
	};
	this.getConnections = function(appId,status) {
		return httpService.get(URLS.user + "/application/get_connections/" + appId + "/" + status);
	};
	
	this.saveApprovalRequest = function(data) {
		return httpService.post(URLS.user + "/application/save_approval_request",data);
	};
	
	this.updateStatus = function(data,status) {
		return httpService.get(URLS.user + "/application/update_status/" + status, data);
	};

//	this.getApplicationDetailsByIdAndUserId = function(appId, userId) {
//		return httpService.get(URLS.user + "/application/get_application_details_for_lender/" + appId + "/"+ userId);
//	};
	
	this.saveApprovalRequest = function(data) {
		return httpService.post(URLS.user + "/application/save_approval_request",data);
	};
	
}]);
