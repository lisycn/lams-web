angular.module("lams").controller("brLoanProfileCtrl",["$scope", "$http","$rootScope","Constant","userService","Notification","masterService","$filter","$stateParams",
		function($scope, $http, $rootScope,Constant,userService,Notification,masterService,$filter,$stateParams) {

	
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
//	            		$scope.separateName($scope.userData);
//	            		if(!$rootScope.isEmpty($scope.userData.birthDate)){
//	            			$scope.userData.birthDate = new Date($scope.userData.birthDate);
//	            		}
	            		
//	            		if(!$rootScope.isEmpty($scope.userData.permanentAdd)){
//	            			if(!$rootScope.isEmpty($scope.userData.permanentAdd.country)){
//	            				$scope.getStates($scope.userData.permanentAdd.country.id,Constant.AddressType.PERMANENT);	
//	            			}
//	            			if(!$rootScope.isEmpty($scope.userData.permanentAdd.state)){
//	            				$scope.getCities($scope.userData.permanentAdd.state.id,Constant.AddressType.PERMANENT);	
//	            			}
//	            		}
//	            		if(!$rootScope.isEmpty($scope.userData.communicationAdd)){
//	            			if(!$rootScope.isEmpty($scope.userData.communicationAdd.country)){
//	            				$scope.getStates($scope.userData.communicationAdd.country.id,Constant.AddressType.COMMUNICATION);	
//	            			}
//	            			if(!$rootScope.isEmpty($scope.userData.communicationAdd.state)){
//	            				$scope.getCities($scope.userData.communicationAdd.state.id,Constant.AddressType.COMMUNICATION);	
//	            			}
//	            		}
	                }else{
	                	Notification.error(success.data.message);
	                }
	            }, function(error) {
	            	$rootScope.validateErrorResponse(error);
	     });		
	}
	getUserDetailsById(brId);
	
}]);
