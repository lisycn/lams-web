angular.module("lams").controller("accountVerificationCtrl",["$scope", "$http","$rootScope","userService","Constant","$state","Notification","$cookieStore",'$stateParams',
		function($scope,$http,$rootScope,userService,Constant,$state,Notification,$cookieStore,$stateParams) {
	$scope.response = {msg : "Please Wait...",cssClass : "text-info"};
	$scope.verifyEmail = function(){
		userService.verifyEmail($stateParams.data).then(
	            function(success) {
	            	$scope.response.msg = success.data.message;
	            	if(success.data.status == 200){
	            		Notification.success(success.data.message);
	            		$scope.response.cssClass="text-success";
	                }else{
	                	Notification.warning(success.data.message);
	                	$scope.response.cssClass="text-warning";
	                }
	            }, function(error) {
	            	$rootScope.validateErrorResponse(error);
	     });		
	}
	
	$scope.verifyEmail();
}]);
