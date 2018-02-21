app.controller("signupCtrl",["$scope", "$http","$rootScope","Constant","userService","Notification","$state",
		function($scope, $http,$rootScope,Constant, userService, Notification, $state) {
	$scope.user = {};
	$scope.userTypes = [Constant.UserType.LENDER,Constant.UserType.BORROWER];
	
	$scope.doRegister = function(){
		if($scope.userForm.$invalid){
			$scope.userForm.$submitted = true;
			console.warn("Invalid Form Details");
			return false;
		}
		if($scope.cnfrmPassword !== $scope.user.password){
			$scope.userForm.$submitted = true;
			console.warn("Password and Confirm Password did not match");
			return false;
		}
		
		userService.register($scope.user).then(
	            function(success) {
	            	if(success.data.status == 200){
	            		Notification.success(success.data.message);
	            		$state.go("login");
	                }else if(success.data.status == 400){
	                	Notification.error(success.data.message);
	                }else{
	                	msg = Constant.ErrorMessage.SOMETHING_WENT_WRONG;
	                }
	            }, function(error) {
	                if(error.status == 401){
	                    $rootScope.logout();
	                }
	                else{
	                	msg = Constant.ErrorMessage.SOMETHING_WENT_WRONG;
	                }
	     });		
		
	}
	
}]);
