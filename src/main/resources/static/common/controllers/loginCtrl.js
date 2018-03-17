app.controller("loginCtrl", [ "$scope", "$http", "$rootScope", "userService", "Constant", "$state", "Notification", "$cookieStore",
	function($scope, $http, $rootScope, userService, Constant, $state, Notification, $cookieStore) {
		$scope.login = {};
		$scope.msg = null;
		$scope.doLogin = function() {
			if ($scope.loginForm.$invalid) {
				$scope.loginForm.$submitted = true;
				console.warn("Invalid Form Details");
				return false;
			}
			userService.login($scope.login).then(
				function(success) {
					console.log("success.data==>",success.data);
					if (success.data.status == 200) {
						var data = success.data.data;
						if (!$rootScope.isEmpty(data)) {
							if ((!data.isOtpVerified) && (!$rootScope.isEmpty(data.isSent) && (data.isSent || data.isSent == "true"))) {
								$state.go("otp", {
									data : btoa(data.id)
								});
							} else if ((!data.isEmailVerified)) {
								$cookieStore.put(Constant.TOKEN, success.data.token);
								$rootScope.loadMasters();
								$state.go("web.lams.dashboard");
//								$state.go("email", {
//									data : btoa(data.id)
//								});
							}else{
								$cookieStore.put(Constant.TOKEN, success.data.token);
								$rootScope.loadMasters();
								console.warn("Email Verification is Remain to integrate");
								$state.go("web.lams.dashboard");
							}
						}else{
							$cookieStore.put(Constant.TOKEN, success.data.token);
							$rootScope.loadMasters();
							$state.go("web.lams.dashboard");							
						}
					} else {
						Notification.warning(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		}
	} ]);