angular.module("lams").controller("brLoanProfileCtrl",["$scope", "$http","$rootScope","Constant","userService","Notification","masterService","$filter","$stateParams","applicationService",
		function($scope, $http, $rootScope,Constant,userService,Notification,masterService,$filter,$stateParams, applicationService) {

	
	$scope.brId = $stateParams.brId;

	
	var appId = $stateParams.appId;
	var appTypeId = $stateParams.appTypeId;
	console.log("-------- : "+appTypeId)
	
	function getUserDetailsById (brId) {
		userService.getUserDetailsById(brId).then(
	            function(success) {
	            	if(success.data.status == 200){
	            		$scope.userData = success.data.data;
	            		console.log("appId : "+appId);
	            		console.log("$scope.userData.applications : ", $scope.userData.applications);
	            		$scope.userData.applications =  $filter('filter')($scope.userData.applications, {id: appId});
	                }else{
	                	Notification.error(success.data.message);
	                }
	            }, function(error) {
	            	$rootScope.validateErrorResponse(error);
	     });		
	}
	getUserDetailsById($scope.brId);
	
	$scope.setApplicationData = function (app){
		console.log(app);
		$scope.respond = {application : {}, applicationMappingBO : {id:appTypeId}};
		$scope.respond.application = app;
		$scope.respond.canEdit = true;
	};
	
	$scope.submitApproval = function (){
		if (!$scope.responseForm.$valid) {
			Notification.warning("Please fill all mandatory fields");
			return false;
		}
		applicationService.saveApprovalRequest($scope.respond).then(
	            function(success) {
	            	if(success.data.status == 200){
	            		Notification.success("Request has been sent");
//	            		$scope.userData = success.data.data;
	            		getUserDetailsById($scope.brId);
	                }else{
	                	Notification.error(success.data.message);
	                }
	            }, function(error) {
	            	$rootScope.validateErrorResponse(error);
	     });
	};
	
	$scope.getRespondedApplications = function (application){
		
		applicationService.getRespondedApplications($scope.brId, application.id).then(
	            function(success) {
	            	if(success.data.status == 200){
	            		application.respondedApplications = success.data.data;
	                }else{
	                	Notification.error(success.data.message);
	                }
	            }, function(error) {
	            	$rootScope.validateErrorResponse(error);
	     });
	};
	
	$scope.viewRespondedData = function (respondedData){
		if(respondedData && respondedData.length > 0){
		$scope.respond = respondedData[0];
		$scope.respond.canEdit = false;
		}
	};	
	
	
}]);
