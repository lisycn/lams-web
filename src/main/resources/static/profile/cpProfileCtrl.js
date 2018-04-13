angular.module("lams").controller("cpProfileCtrl",["$scope", "$http","$rootScope","Constant","userService","Notification","masterService","$filter",
		function($scope, $http, $rootScope,Constant,userService,Notification,masterService,$filter) {
	
	
	$scope.popup ={"opened" : false};
	$scope.open = function() {
	    $scope.popup.opened = true;
	  };
	
	$scope.isDisable = false;
	$scope.initUserObj = function(){
		$scope.userData = { address : {
			country : {},
			state : {},
			city : {}
		}};		
	}
	$scope.initUserObj();
	$scope.updateUserDetail = function(){
		if (!$scope.userForm.$valid) {
			$scope.userForm.$submitted = true;
			Notification.warning("Please fill all mandatory fields");
			return false;
		}
		$scope.isDisable = true;
		$scope.userData.isProfileFilled = true;
		console.log("$scope.userData=============>{}",$scope.userData);
		
		userService.updateUserDetail($scope.userData).then(
	            function(success) {
	            	$scope.isDisable = false;
	            	if(success.data.status == 200){
	            		Notification.info("Successfully Updated !");
	            		$rootScope.user = success.data.data;
	                }else{
	                	Notification.error(success.data.message);
	                }
	            }, function(error) {
	            	$scope.isDisable = false;
	            	$rootScope.validateErrorResponse(error);
	     });		
	}
	
	$scope.getUserDetail = function(){
		userService.getLoggedInUserDetail().then(
	            function(success) {
	            	if(success.data.status == 200){
	            		$scope.userData = success.data.data;
	            		console.log("$scope.userData===========>",$scope.userData);
	            		if(!$rootScope.isEmpty($scope.userData.communicationAdd)){
	            			if(!$rootScope.isEmpty($scope.userData.communicationAdd.country)){
	            				$scope.getStates($scope.userData.communicationAdd.country.id,Constant.AddressType.COMMUNICATION);	
	            			}
	            			if(!$rootScope.isEmpty($scope.userData.communicationAdd.state)){
	            				$scope.getCities($scope.userData.communicationAdd.state.id,Constant.AddressType.COMMUNICATION);	
	            			}
	            		}
	                }else{
	                	Notification.error(success.data.message);
	                }
	            }, function(error) {
	            	$rootScope.validateErrorResponse(error);
	     });		
	}
	

	$scope.commStates = [];
	$scope.getStates = function(countryId,type){
		if($rootScope.isEmpty(countryId)){
			console.warn("Country Id must not be null while getting States by Country Id====>",countryId);
    			$scope.commCities = [];
    			return false;
		}
		
		masterService.states(countryId).then(
	            function(success) {
	            	if(success.data.status == 200){
	            		 $scope.commStates = success.data.data;	
	            	} else{
	            		Notification.warning(success.data.message);
	            	}
	            }, function(error) {
	            	$rootScope.validateErrorResponse(error);
	     });		
	}
	
	$scope.commCities = [];
	$scope.getCities = function(stateId,type){
		if($rootScope.isEmpty(stateId)){
			console.warn("State Id must not be null while getting States by State Id====>",stateId);
    		$scope.commCities = [];	
			return false;
		}
		masterService.cities(stateId).then(
	            function(success) {
	            	if(success.data.status == 200){
	            			$scope.commCities = [];
	            			$scope.commCities = success.data.data;	
	            	}else{
	            		Notification.warning(success.data.message);
	            	}
	            }, function(error) {
	            	$rootScope.validateErrorResponse(error);
	     });		
	}
	$scope.getUserDetail();
}]);
