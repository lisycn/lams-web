angular.module("lams").controller("brLoanProfileCtrl",["$scope", "$http","$rootScope","Constant","userService","Notification","masterService","$filter","$stateParams","applicationService",
		function($scope, $http, $rootScope,Constant,userService,Notification,masterService,$filter,$stateParams, applicationService) {

	
	var brId = $stateParams.brId;
	console.log("BR : "+brId)
	
	var appId = $stateParams.appId;
	console.log("BR : "+appId)
	
	function getUserDetailsById (brId) {
		userService.getUserDetailsById(brId).then(
	            function(success) {
	            	if(success.data.status == 200){
	            		$scope.userData = success.data.data;
	            		$scope.userData.applications =  $filter('filter')($scope.userData.applications, {applicationTypeId: appId});
	                }else{
	                	Notification.error(success.data.message);
	                }
	            }, function(error) {
	            	$rootScope.validateErrorResponse(error);
	     });		
	}
	getUserDetailsById(brId);
	
	$scope.setApplicationData = function (app){
		console.log(app);
		$scope.respond = {application : {}};
		$scope.respond.application = app;
	};
	
	$scope.submitApproval = function (){
		applicationService.saveApprovalRequest($scope.respond).then(
	            function(success) {
	            	if(success.data.status == 200){
	            		Notification.success(success.data.message);
//	            		$scope.userData = success.data.data;
	                }else{
	                	Notification.error(success.data.message);
	                }
	            }, function(error) {
	            	$rootScope.validateErrorResponse(error);
	     });
	};
	
	
}]);
