angular.module("lams").controller("signupCtrl",["$scope", "$http","$rootScope","Constant","userService","Notification","$state",
		function($scope, $http,$rootScope,Constant, userService, Notification, $state) {
	$scope.user = {userType : Constant.UserType.BORROWER.id};
	$scope.userTypes = [Constant.UserType.BORROWER/*,Constant.UserType.CHANNEL_PARTNER*/];
	$scope.isDisabled = false;
	$scope.doRegister = function(){
		if($scope.userForm.$invalid){
			$scope.userForm.$submitted = true;
			console.warn("Invalid Form Details");
			return false;
		}
		if($scope.cnfrmPassword !== $scope.user.password){
			$scope.userForm.$submitted = true;
			Notification.warning("Password and Confirm Password did not match");
			return false;
		}
		$scope.isDisabled = true;		
		userService.register($scope.user).then(
	            function(success) {
	            	$scope.isDisabled = false;
	            	if(success.data.status == 200){
	            		Notification.success(success.data.message);
	            		var data = success.data.data;
	            		if(!$rootScope.isEmpty(data)){
	            			if(!$rootScope.isEmpty(data.isSent) && (data.isSent  || data.isSent == "true")){
		            			$state.go("otp",{data : btoa(data.id)});
		            		}	
	            		}
	                }else if(success.data.status == 400){
	                	Notification.warning(success.data.message);
	                }else{
	                	Notification.success(Constant.ErrorMessage.SOMETHING_WENT_WRONG);
	                }
	            }, function(error) {
	            	$scope.isDisabled = false;
	                if(error.status == 401){
	                    $rootScope.logout();
	                }
	                else{
	                	Notification.success(Constant.ErrorMessage.SOMETHING_WENT_WRONG);
	                }
	     });		
		
	}
	
}]);
