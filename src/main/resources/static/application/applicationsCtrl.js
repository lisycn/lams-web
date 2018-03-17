app.controller("applicationCtrl", [ "$scope", "masterService", "$rootScope", "Notification", "applicationService", "Constant", "$filter", "$stateParams",
	function($scope, masterService, $rootScope, Notification, applicationService, Constant, $filter, $stateParams) {

		$scope.applicationTypeCode = $stateParams.appCode;
		$scope.applicationTypeId = $rootScope.getAppTypeIdByCode($scope.applicationTypeCode);
		$scope.applicationId = $stateParams.appId;
		$scope.editApplicationForm = true;

		$scope.getApplicationDetails = function() {

			applicationService.getLoanDetails($scope.applicationId, $scope.applicationTypeId).then(
				function(success) {
					if (success.data.status == 200) {
						$scope.applicationDetails = success.data.data;
					} else {
						Notification.warning(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		}
		$scope.getApplicationDetails();

		$scope.saveLoanDetails = function() {
			var data = {};
			data.applicationTypeId = $scope.applicationTypeId;
			data.data = JSON.stringify($scope.applicationDetails);
			applicationService.save(data).then(
				function(success) {
					if (success.data.status == 200) {
						Notification.info("Successfully updated application !!");
						$scope.editApplicationForm =!$scope.editApplicationForm;
					} else {
						Notification.warning(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		}


	} ]);