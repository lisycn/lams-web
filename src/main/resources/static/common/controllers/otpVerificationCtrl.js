app.controller("otpVerificationCtrl",["$scope","$rootScope","userService","Constant","$state","Notification","$cookieStore",
		function($scope,$rootScope,userService,Constant,$state,Notification,$cookieStore) {
	$scope.user = {};
	$scope.verifyOTP = function(){
		if($rootScope.isEmpty($scope.user.otp)){
			Notification.error("Please Enter OTP");
			return false;
		}
		userService.verifyOTP($scope.user,Constant.OTPType.Registration).then(
	            function(success) {
	            	if(success.data.status == 200){
	            		Notification.success(success.data.message);
	            		$state.go("login");
	                }else{
	                	Notification.error(success.data.message);
	                }
	            }, function(error) {
	            	$rootScope.validateErrorResponse(error);
	     });		
	}
	
	$scope.resendOTP = function(){
		userService.resendOTP($scope.user,Constant.OTPType.Registration,Constant.Template.SMS).then(
	            function(success) {
	            	if(success.data.status == 200){
	            		Notification.success(success.data.message);
	                }else{
	                	Notification.error(success.data.message);
	                }
	            }, function(error) {
	            	$rootScope.validateErrorResponse(error);
	     });		
	}
}]);
