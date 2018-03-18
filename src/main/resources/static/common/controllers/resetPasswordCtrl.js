angular.module("lams").controller("resetPasswordCtrl", [ "$scope", "$http", "$rootScope", "userService", "Constant", "$state", "Notification", "$cookieStore",'$stateParams',
	function($scope, $http, $rootScope, userService, Constant, $state, Notification, $cookieStore,$stateParams) {
		$scope.user = {};
		$scope.isDisable = false;
		$scope.updatePassword = function() {
			if ($scope.cpForm.$invalid) {
				$scope.cpForm.$submitted = true;
				Notification.warning("Please Enter Requried Or Valid Information !");
				return false;
			}

			if ($scope.user.cnfPassword.trim() != $scope.user.password.trim()) {
				Notification.warning("Password and Confirm Password Does not Match !");
				return false;
			}
			$scope.isDisable = true;
			$scope.user.password = $scope.user.password.trim();
			$scope.user.tempPassword = $scope.user.password;
			userService.resetPassword($scope.user,$stateParams.data).then(
				function(success) {
					$scope.isDisable = false;
					if (success.data.status == 200) {
						Notification.success(success.data.message);
						$state.go("login");
					} else {
						Notification.warning(success.data.message);
					}
				}, function(error) {
					$scope.isDisable = false;
					$rootScope.validateErrorResponse(error);
				});
		}
	} ]);