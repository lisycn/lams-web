angular.module("lams").controller("brProfileCtrl",["$scope", "$http","$rootScope","Constant","userService","Notification","masterService","$filter",
		function($scope, $http, $rootScope,Constant,userService,Notification,masterService,$filter) {

	$scope.isDisable = false;
	$scope.initUserObj = function(){
		$scope.userData = { address : {
			country : {},
			state : {},
			city : {}
		}};		
	}
	
	$scope.employmentType = [
		{id : 1, name : "Salaried"},
		{id : 2, name : "Self Employed"}
	];
	
	$scope.selfEmploymentType = [
		{id : 1, name : "Self Employed Business"},
		{id : 2, name : "Self Employed Professional"}
	];
	
	$scope.entityType = [
		{id : 1, name : "Sole Proprietor"},
		{id : 2, name : "Partnership"},
		{id : 3, name : "Private Limited Company"},
		{id : 4, name : "Public Limited Company"},
		{id : 5, name : "Limited Liabiliy Partnership"}
		
	];
	
	$scope.initUserObj();
	$scope.updateUserDetail = function(){
		console.log("-----> ", $scope.userForm);
		if (!$scope.userForm.$valid) {
			$scope.userForm.$submitted = true;
			Notification.warning("Please fill all mandatory fields");
			return false;
		}
		$scope.isDisable = true;
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
	            		$scope.separateName($scope.userData);
	            		if(!$rootScope.isEmpty($scope.userData.birthDate)){
	            			$scope.userData.birthDate = new Date($scope.userData.birthDate);
	            		}
	            		
	            		if(!$rootScope.isEmpty($scope.userData.permanentAdd)){
	            			if(!$rootScope.isEmpty($scope.userData.permanentAdd.country)){
	            				$scope.getStates($scope.userData.permanentAdd.country.id,Constant.AddressType.PERMANENT);	
	            			}
	            			if(!$rootScope.isEmpty($scope.userData.permanentAdd.state)){
	            				$scope.getCities($scope.userData.permanentAdd.state.id,Constant.AddressType.PERMANENT);	
	            			}
	            		}
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
	

	$scope.permStates = [];
	$scope.commStates = [];
	$scope.getStates = function(countryId,type){
		if($rootScope.isEmpty(countryId)){
			console.warn("Country Id must not be null while getting States by Country Id====>",countryId);
			if(type == Constant.AddressType.PERMANENT){
    			$scope.permStates = [];	
    			$scope.permCities = [];
    		} else if(type == Constant.AddressType.COMMUNICATION){
    			$scope.commStates = [];	
    			$scope.commCities = [];
    		}
			return false;
		}
		masterService.states(countryId).then(
	            function(success) {
	            	if(success.data.status == 200){
	            		if(type == Constant.AddressType.PERMANENT){
	            			$scope.permStates = [];
	            			$scope.permStates = success.data.data;	
	            		} else if(type == Constant.AddressType.COMMUNICATION){
	            			$scope.commStates = [];
	            			$scope.commStates = success.data.data;	
	            		} 
	            	} else{
	            		Notification.warning(success.data.message);
	            	}
	            }, function(error) {
	            	$rootScope.validateErrorResponse(error);
	     });		
	}
	
	$scope.permCities = [];
	$scope.commCities = [];
	$scope.getCities = function(stateId,type){
		if($rootScope.isEmpty(stateId)){
			console.warn("State Id must not be null while getting States by State Id====>",stateId);
			if(type == Constant.AddressType.PERMANENT){
    			$scope.permCities = [];	
    		} else if(type == Constant.AddressType.COMMUNICATION){
    			$scope.commCities = [];	
    		}
			return false;
		}
		masterService.cities(stateId).then(
	            function(success) {
	            	if(success.data.status == 200){
	            		if(type == Constant.AddressType.PERMANENT){
	            			$scope.permCities = [];
	            			$scope.permCities = success.data.data;	
	            		} else if(type == Constant.AddressType.COMMUNICATION){
	            			$scope.commCities = [];
	            			$scope.commCities = success.data.data;	
	            		}
	            	}else{
	            		Notification.warning(success.data.message);
	            	}
	            }, function(error) {
	            	$rootScope.validateErrorResponse(error);
	     });		
	}
	$scope.getUserDetail();
	
	$scope.sameAddress = function(isSameUs){
		if(isSameUs){
			if(!$rootScope.isEmpty($scope.userData.permanentAdd)){
    			if(!$rootScope.isEmpty($scope.userData.permanentAdd.country)){
    				if($rootScope.isEmpty($scope.userData.communicationAdd)){
    					$scope.userData.communicationAdd = {};
    				}
    				if($rootScope.isEmpty($scope.userData.communicationAdd.country)){
						$scope.userData.communicationAdd.country = {};	
					}
    				$scope.userData.communicationAdd.country.id = $scope.userData.permanentAdd.country.id;
    				$scope.getStates($scope.userData.permanentAdd.country.id,Constant.AddressType.COMMUNICATION);
    			}
    			if(!$rootScope.isEmpty($scope.userData.permanentAdd.state)){
    				if($rootScope.isEmpty($scope.userData.communicationAdd.state)){
    					$scope.userData.communicationAdd.state = {};	
					}
    				$scope.userData.communicationAdd.state.id = $scope.userData.permanentAdd.state.id;
    				$scope.getCities($scope.userData.permanentAdd.state.id,Constant.AddressType.COMMUNICATION);	
    			}
    			if($rootScope.isEmpty($scope.userData.communicationAdd.city)){
    				$scope.userData.communicationAdd.city = {};	
				}
    			$scope.userData.communicationAdd.city.id = $scope.userData.permanentAdd.city.id;
    			$scope.userData.communicationAdd.pincode = $scope.userData.permanentAdd.pincode;
    			$scope.userData.communicationAdd.landMark = $scope.userData.permanentAdd.landMark;
    			$scope.userData.communicationAdd.streetName = $scope.userData.permanentAdd.streetName;
    		}
		} else {
			$scope.userData.communicationAdd = {};	
		}
	}
}]);
