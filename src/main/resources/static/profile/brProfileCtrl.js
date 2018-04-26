angular.module("lams").controller("brProfileCtrl",["$scope", "$http","$rootScope","Constant","userService","Notification","masterService","$filter",
		function($scope, $http, $rootScope,Constant,userService,Notification,masterService,$filter) {
	
	
	$scope.documentResponse = {};
	
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
		if (!$scope.userForm.$valid) {
			$scope.userForm.$submitted = true;
			Notification.warning("Please fill all mandatory fields");
			return false;
		}
		$scope.isDisable = true;
		
		if(!$rootScope.isEmpty($scope.userData.employmentType)){
			$scope.userData.isProfileFilled = true;	
		}
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
	            		$rootScope.getUserDocument(9,$scope);
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
	            		
	            		if(!$rootScope.isEmpty($scope.userData.employmentAddress)){
	            			if(!$rootScope.isEmpty($scope.userData.employmentAddress.country)){
	            				$scope.getStates($scope.userData.employmentAddress.country.id,Constant.AddressType.EMPLOYMENT_ADD);	
	            			}
	            			if(!$rootScope.isEmpty($scope.userData.employmentAddress.state)){
	            				$scope.getCities($scope.userData.employmentAddress.state.id,Constant.AddressType.EMPLOYMENT_ADD);	
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
	$scope.empStates = [];
	$scope.getStates = function(countryId,type){
		if($rootScope.isEmpty(countryId)){
			console.warn("Country Id must not be null while getting States by Country Id====>",countryId);
			if(type == Constant.AddressType.PERMANENT){
    			$scope.permStates = [];	
    			$scope.permCities = [];
    		} else if(type == Constant.AddressType.COMMUNICATION){
    			$scope.commStates = [];	
    			$scope.commCities = [];
    		} else if(type == Constant.AddressType.EMPLOYMENT_ADD){
    			$scope.empStates = [];	
    			$scope.empCities = [];
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
	            		}  else if(type == Constant.AddressType.EMPLOYMENT_ADD){
	            			$scope.empStates = [];
	            			$scope.empStates = success.data.data;
	            		} 
	            	} else{
	            		Notification.warning(success.data.message);
	            	}
	            }, function(error) {
	            	$rootScope.validateErrorResponse(error);
	     });		
	}
	
	$scope.uploadAppFile = function(element) {
		$rootScope.uploadFile(element.files, null, element.id, $scope,true);
	}
	
	$scope.permCities = [];
	$scope.commCities = [];
	$scope.empCities = [];
	$scope.getCities = function(stateId,type){
		if($rootScope.isEmpty(stateId)){
			console.warn("State Id must not be null while getting States by State Id====>",stateId);
			if(type == Constant.AddressType.PERMANENT){
    			$scope.permCities = [];	
    		} else if(type == Constant.AddressType.COMMUNICATION){
    			$scope.commCities = [];	
    		} else if(type == Constant.AddressType.EMPLOYMENT_ADD){
    			$scope.empCities = [];
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
	            		}  else if(type == Constant.AddressType.EMPLOYMENT_ADD){
	            			$scope.empCities = [];
	            			$scope.empCities = success.data.data;
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
			if(!$rootScope.isEmpty($scope.userData.communicationAdd)){
    			if(!$rootScope.isEmpty($scope.userData.communicationAdd.country)){
    				if($rootScope.isEmpty($scope.userData.permanentAdd)){
    					$scope.userData.permanentAdd = {};
    				}
    				if($rootScope.isEmpty($scope.userData.permanentAdd.country)){
						$scope.userData.permanentAdd.country = {};	
					}
    				$scope.userData.permanentAdd.country.id = $scope.userData.communicationAdd.country.id;
    				$scope.getStates($scope.userData.communicationAdd.country.id,Constant.AddressType.PERMANENT);
    			}
    			if(!$rootScope.isEmpty($scope.userData.communicationAdd.state)){
    				if($rootScope.isEmpty($scope.userData.permanentAdd.state)){
    					$scope.userData.permanentAdd.state = {};	
					}
    				$scope.userData.permanentAdd.state.id = $scope.userData.communicationAdd.state.id;
    				$scope.getCities($scope.userData.communicationAdd.state.id,Constant.AddressType.PERMANENT);	
    			}
    			if($rootScope.isEmpty($scope.userData.permanentAdd.city)){
    				$scope.userData.permanentAdd.city = {};	
				}
    			$scope.userData.permanentAdd.city.id = $scope.userData.communicationAdd.city.id;
    			$scope.userData.permanentAdd.pincode = $scope.userData.communicationAdd.pincode;
    			$scope.userData.permanentAdd.landMark = $scope.userData.communicationAdd.landMark;
    			$scope.userData.permanentAdd.streetName = $scope.userData.communicationAdd.streetName;
    			$scope.userData.permanentAdd.premisesAndBuildingName = $scope.userData.communicationAdd.premisesAndBuildingName;
    		}
		} else {
			$scope.userData.permanentAdd = {};	
		}
	}
}]);
