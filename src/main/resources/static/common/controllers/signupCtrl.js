app.controller("signupCtrl",["$scope", "$http","$rootScope","Constant",
		function($scope, $http,$rootScope,Constant) {
	$scope.user = {};
	$scope.userTypes = [Constant.UserType.LENDER,Constant.UserType.BORROWER];
	
	$scope.doRegister = function(){
		if($scope.userForm.$invalid){
			$scope.userForm.$submitted = true;
			console.warn("Invalid Form Details");
			return false;
		}
		userService.register($scope.user).then(
	            function(success) {
	            	if(success.data.status == 200 && !$rootScope.isEmpty(success.data.data)){
	                }else if(success.data.status == 400){
	                	msg = success.data.message;
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
