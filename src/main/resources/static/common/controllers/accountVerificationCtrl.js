app.controller("accountVerificationCtrl",["$scope", "$http","$rootScope","userService","Constant","$state","Notification","$cookieStore",
		function($scope,$http,$rootScope,userService,Constant,$state,Notification,$cookieStore) {
	$scope.login = {};
	$scope.msg = null;
	$scope.doLogin = function(){
		userService.login($scope.login).then(
	            function(success) {
	            	if(success.data.status == 200){
	            		$cookieStore.put(Constant.TOKEN,success.data.token);
	            		$rootScope.loadMasters();
	            		$state.go("admin.lams.dashboard");
	                }else{
	                	Notification.error(success.data.message);
	                }
	            }, function(error) {
	            	$rootScope.validateErrorResponse(error);
	     });		
	}
}]);
