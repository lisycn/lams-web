angular.module("lams").controller("loginCtrl", [ "$scope", "$http", "$rootScope", "userService", "Constant", "$state", "Notification", "$cookieStore",
	function($scope, $http, $rootScope, userService, Constant, $state, Notification, $cookieStore) {
		$scope.login = {};
		$scope.isLoginVisible = true;
		$scope.isDisable = false;
		$scope.doLogin = function() {
			if ($scope.loginForm.$invalid) {
				$scope.loginForm.$submitted = true;
				console.warn("Invalid Form Details");
				return false;
			}
			$scope.isDisable = true;
			userService.login($scope.login).then(
				function(success) {
					$scope.isDisable = false;
					if (success.data.status == 200) {
						var data = success.data.data;
						if (!$rootScope.isEmpty(data)) {
							if ((!data.isOtpVerified) && (!$rootScope.isEmpty(data.isSent) && (data.isSent || data.isSent == "true"))) {
								$state.go("otp", {data : btoa(data.id)});
							} else if ((!data.isEmailVerified) && (!$rootScope.isEmpty(data.isSent) && (data.isSent || data.isSent == "true"))) {
									Notification.success(success.data.message);
							}else{
								$scope.setCookies(success);
							}
						}else{
							$scope.setCookies(success);								
						}
					} else {
						Notification.warning(success.data.message);
					}
				}, function(error) {
					$scope.isDisable = false;
					$rootScope.validateErrorResponse(error);
				});
		}
		
		$scope.setCookies = function(success){
			$cookieStore.put(Constant.TOKEN, success.data.token);
			$cookieStore.put(Constant.USER_TYPE, btoa(success.data.data.userType));
			$rootScope.loadMasters();
			if(success.data.data.userType == Constant.UserType.LENDER.id){
				$state.go("web.lams.products");									
			}else  if(success.data.data.userType == Constant.UserType.BORROWER.id){
				$state.go("web.lams.brDashboard");
			}
		} 
		
		$scope.sendLink = function(){
			if ($scope.sendLinkForm.$invalid) {
				$scope.sendLinkForm.$submitted = true;
				console.warn("Invalid Form Details");
				return false;
			}
			$scope.isDisable = true;
			userService.sendForgotPasswordLink($scope.login).then(
					function(success) {
						$scope.isDisable = false;
						console.log("success.data==>",success.data);
						if (success.data.status == 200) {
							Notification.success(success.data.message);
						} else {
							Notification.warning(success.data.message);
						}
					}, function(error) {
						$scope.isDisable = false;
						$rootScope.validateErrorResponse(error);
					});
			
		}
		
	} ]);