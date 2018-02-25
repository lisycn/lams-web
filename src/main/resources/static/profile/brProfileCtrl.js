app.controller("brProfileCtrl",["$scope", "$http","$rootScope","Constant","userService","Notification","masterService",
		function($scope, $http, $rootScope,Constant,userService,Notification,masterService) {
	
	$scope.initUserObj = function(){
		$scope.userData = { address : {
			country : {},
			state : {},
			city : {}
		}};		
	}
	$scope.initUserObj();
	$scope.updateUserDetail = function(){
		userService.updateUserDetail($scope.userData).then(
	            function(success) {
	            	if(success.data.status == 200){
	            		Notification.info("Successfully Updated !");
	            		$rootScope.user = success.data.data;
	                }else{
	                	Notification.error(success.data.message);
	                }
	            }, function(error) {
	            	$rootScope.validateErrorResponse();
	     });		
	}
	
	$scope.getUserDetail = function(){
		userService.getLoggedInUserDetail().then(
	            function(success) {
	            	if(success.data.status == 200){
	            		$scope.userData = success.data.data;
	            		$scope.separateName($scope.userData);
	            		console.log("$scope.userData==>",$scope.userData);
	                }else{
	                	Notification.error(success.data.message);
	                }
	            }, function(error) {
	            	$rootScope.validateErrorResponse();
	     });		
	}
	
	$scope.separateName = function(data){
		data.userTypName = $rootScope.getUserByType(data.userType).value;
		if($rootScope.isEmpty(data.firstName) && $rootScope.isEmpty(data.lastName)){
			var names = data.name.split(" ");
    		if(names.length == 1){
    			data.firstName = names[0].trim();	
    		}else if(names.length == 2){
    			data.firstName = names[0].trim();
    			data.lastName = names[1].trim();
    		}else if(names.length == 3){
    			data.firstName = names[0].trim();
    			data.middleName = names[1].trim();
    			data.lastName = names[2].trim();
    		}
		}
		$rootScope.user = data;
	}
	
	$scope.states = [];
	$scope.getStates = function(countryId){
		if($rootScope.isEmpty(countryId)){
			console.warn("Country Id must not be null while getting States by Country Id====>",countryId);
			return false;
		}
		masterService.states(countryId).then(
	            function(success) {
	            	if(success.data.status == 200){
	            		$scope.states = success.data.data;	            		
	            	}else{
	            		Notification.warning(success.data.message);
	            	}
	            }, function(error) {
	            	$rootScope.validateErrorResponse();
	     });		
	}
	
	$scope.cities = [];
	$scope.getCities = function(stateId){
		if($rootScope.isEmpty(stateId)){
			console.warn("State Id must not be null while getting States by State Id====>",stateId);
			return false;
		}
		masterService.cities(stateId).then(
	            function(success) {
	            	if(success.data.status == 200){
	            		$scope.cities = success.data.data;	            		
	            	}else{
	            		Notification.warning(success.data.message);
	            	}
	            }, function(error) {
	            	$rootScope.validateErrorResponse();
	     });		
	}
	$scope.getUserDetail();
}]);
