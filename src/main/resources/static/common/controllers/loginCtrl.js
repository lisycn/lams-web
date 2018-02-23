app.controller("loginCtrl",["$scope", "$http","$rootScope","userService","Constant","$state","Notification",
		function($scope,$http,$rootScope,userService,Constant,$state,Notification) {
	$scope.login = {};
	$scope.msg = null;
	$scope.doLogin = function(){
		if($scope.loginForm.$invalid){
			$scope.loginForm.$submitted = true;
			console.warn("Invalid Form Details");
			return false;
		}
		userService.login($scope.login).then(
	            function(success) {
	            	if(success.data.status == 200){
	            		$state.go("lams.dashboard");
	                }else{
	                	Notification.error(success.data.message);
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
