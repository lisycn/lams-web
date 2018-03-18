angular.module("lams").controller("changePasswordCtrl", [ "$scope", "$http", "$rootScope", "userService", "Constant", "$state", "Notification", "$cookieStore",
	function($scope, $http, $rootScope, userService, Constant, $state, Notification, $cookieStore) {
		$scope.user = {};
		$scope.isDisable = false;
		$scope.changePassword = function() {
			if ($scope.cpForm.$invalid) {
				$scope.cpForm.$submitted = true;
				Notification.warning("Please Enter Requried Or Valid Information !");
				return false;
			}

			if($scope.user.cnfPassword.trim() != $scope.user.password.trim()){
				Notification.warning("Password and Confirm Password Does not Match !");
				return false;
			}
			
			if($scope.user.tempPassword.trim() == $scope.user.password.trim()){
				Notification.warning("Current Password And New Password Must not be Same!");
				return false;
			}
			$scope.isDisable = true;
			$scope.user.password = $scope.user.password.trim();
			$scope.user.tempPassword = $scope.user.tempPassword.trim();
			userService.changePassword($scope.user).then(
				function(success) {
					$scope.isDisable = false;
					if (success.data.status == 200) {
						$scope.user = {};
						$scope.cpForm.$setPristine();
						$scope.cpForm.$setUntouched();
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