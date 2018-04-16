angular.module("lams").controller("clientsCtrl",["$scope", "$http","$rootScope","Constant","Notification","userService",
		function($scope, $http,$rootScope,Constant,Notification,userService) {

	$scope.initUserObj = function(){
		$scope.userData = {userType : Constant.UserType.BORROWER.id, applications : [{isFromCP : true}]};		
	}
	$scope.isDisable = false;
	$scope.initUserObj();
	$scope.borrowers = [];
	$scope.addMore = function(){
		$scope.userData.applications.push({isFromCP : true});
	}
	
	$scope.remove = function(index){
		if(!$rootScope.isEmpty($scope.userData.applications) && $scope.userData.applications.length == 1){
			Notification.warning("Minimum One Application Required !");
			return;
		}
		$scope.userData.applications.splice(index,1);
	}
	
	$scope.edit = function(obj){
		$scope.userData = angular.copy(obj);
	}
	
	$scope.submit = function(){
		if($scope.brForm.$invalid){
			Notification.warning("Please Fill Required or Valid Information");
			return;
		}
		console.log("$scope.userData===========>",$scope.userData);
		$scope.isDisable = true;
		userService.saveOrUpdateBorrowerByCP($scope.userData).then(
	            function(success) {
	            	$scope.isDisable = false;
	            	console.log("success.data==============>",success.data);
	            	if(success.data.status == 200){
	            		if($rootScope.isEmpty($scope.userData.id)){
	            			Notification.info("Successfully Updated !");	            			
	            		}else{
	            			Notification.info("Successfully created !");
	            		}
	            		$scope.initUserObj();
//	            		$scope.borrowers.push(success.data.data);
	            		$scope.getClient(Constant.UserType.BORROWER.id);

	            	}else{
	                	Notification.warning(success.data.message);
	                }
	            }, function(error) {
	            	$scope.isDisable = false;
	            	$rootScope.validateErrorResponse(error);
	     });	
	}
	
	
	$scope.getClient = function(userType){
		userService.getCpUsers(userType).then(
	            function(success) {
	            	console.log("success.data==============>",success.data);
	            	if(success.data.status == 200){
	            		$scope.borrowers = success.data.data; 
	                }else{
	                	Notification.warning(success.data.message);
	                }
	            }, function(error) {
	            	$rootScope.validateErrorResponse(error);
	     });	
	}
	
	$scope.getClient(Constant.UserType.BORROWER.id);
	
}]);
