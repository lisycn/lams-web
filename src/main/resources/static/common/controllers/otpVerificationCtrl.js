angular.module("lams").controller("otpVerificationCtrl",["$scope","$rootScope","userService","Constant","$state","Notification","$cookieStore",'$stateParams',
		function($scope,$rootScope,userService,Constant,$state,Notification,$cookieStore,$stateParams) {
	
	$scope.user = {};
	$scope.isDisable = false;
	console.log("$stateParams=====>",$stateParams);
	if($rootScope.isEmpty($stateParams.data)){
		$state.go("login");
	}
	
	$scope.user.id = atob($stateParams.data);
	console.log("$scope.user===============>",$scope.user);
	$scope.verifyOTP = function(){
		if($rootScope.isEmpty($scope.user.otp)){
			Notification.warning("Please Enter OTP");
			return false;
		}
		$scope.isDisable = true;
		userService.verifyOTP($scope.user,Constant.OTPType.Registration.code).then(
	            function(success) {
	            	$scope.isDisable = false;
	            	if(success.data.status == 200){
	            		Notification.success(success.data.message);
	            		$state.go("login");
	                }else{
	                	Notification.warning(success.data.message);
	                }
	            }, function(error) {
	            	$scope.isDisable = false;
	            	$rootScope.validateErrorResponse(error);
	     });		
	}
	
	$scope.resendOTP = function(){
		$scope.user.otp = null;
		$scope.isDisable = true;
		userService.resendOTP($scope.user,Constant.OTPType.Registration.code,Constant.Template.SMS).then(
	            function(success) {
	            	$scope.isDisable = false;
	            	if(success.data.status == 200){
	            		Notification.success(success.data.message);
	                }else{
	                	Notification.warning(success.data.message);
	                }
	            }, function(error) {
	            	$scope.isDisable = false;
	            	$rootScope.validateErrorResponse(error);
	     });		
	}
}]);
