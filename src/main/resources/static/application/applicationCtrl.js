app.controller("applicationCtrl",["$scope","masterService","$rootScope","Notification","applicationService",
	function($scope,masterService,$rootScope,Notification,applicationService){
	
	$scope.showApplicationForm = false;
	
	$scope.applicationTypeList = [];
	$scope.getApplications = function(){
		
		applicationService.getAll().then(
	            function(success) {
	            	if(success.data.status == 200){
	            		$scope.applicationList = success.data.data;
	            	} else{
	            		Notification.warning(success.data.message);
	            	}
	            }, function(error) {
	            	$rootScope.validateErrorResponse();
	     });
	}
	$scope.getApplications();
	
	$scope.appObj = {};
	$scope.saveApplication = function(){
		if($rootScope.isEmpty($scope.appObj.applicationTypeId) || $rootScope.isEmpty($scope.appObj.loanTypeId)){
			Notification.warning("Please select all mandatory fields !!");
			return;
		}
		applicationService.save($scope.appObj).then(
	            function(success) {
	            	if(success.data.status == 200){
	            		Notification.info("Successfully created Application !");
	            		$scope.getApplications();
	            		$scope.showApplicationForm =! $scope.showApplicationForm;
	            	} else{
	            		Notification.warning(success.data.message);
	            	}
	            }, function(error) {
	            	$rootScope.validateErrorResponse();
	     });
	}
	
	
	$scope.applicationTypeList = [];
	$scope.getApplicationType = function(){
		if($scope.applicationTypeList.length > 0){
			return;
		}
		masterService.applicationType(0).then(
	            function(success) {
	            	if(success.data.status == 200){
	            		$scope.applicationTypeList = success.data.data;
	            	} else{
	            		Notification.warning(success.data.message);
	            	}
	            }, function(error) {
	            	$rootScope.validateErrorResponse();
	     });
	}
	$scope.getApplicationType();

	$scope.loanTypeList = [];
	$scope.getLoanType = function(){
		if($scope.loanTypeList.length > 0){
			return;
		}
		masterService.loanType(0).then(
	            function(success) {
	            	if(success.data.status == 200){
	            		$scope.loanTypeList = success.data.data;
	            	} else{
	            		Notification.warning(success.data.message);
	            	}
	            }, function(error) {
	            	$rootScope.validateErrorResponse();
	     });
	}
	$scope.getLoanType();
	
}]);