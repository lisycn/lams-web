angular.module("lams").controller("applicationListCtrl", [ "$scope", "masterService", "$rootScope", "Notification", "applicationService", "Constant","$filter",
	function($scope, masterService, $rootScope, Notification, applicationService, Constant,$filter) {

		$scope.showExistingApplication = false;
		$scope.showCurrentApplication = false;
		$scope.showClosedApplication = false;
		
		$scope.existingObj = {};
		$scope.currentObj = {};
		$scope.closedObj = {};

		$scope.existingAppCount = 0;
		$scope.curentAppCount = 0;
		$scope.closedAppCount = 0;
		
		$scope.applicationList = [];
		$scope.applicationTypeList = [];
		$scope.loanTypeList = [];
		
		$scope.getApplications = function() {

			applicationService.getAll().then(
				function(success) {
					if (success.data.status == 200) {
						$scope.applicationList = success.data.data;
						$scope.existingAppCount = $filter('filter')($scope.applicationList,{loanTypeId : Constant.LoanType.EXISTING_LOAN}).length;
						$scope.curentAppCount = $filter('filter')($scope.applicationList,{loanTypeId : Constant.LoanType.CURRENT_LOAN}).length;
						$scope.closedAppCount = $filter('filter')($scope.applicationList,{loanTypeId : Constant.LoanType.CLOSED_LOAN}).length;
					} else {
						Notification.warning(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		}
		$scope.getApplications();

		$scope.hideDiv = function(type) {
			$scope.appObj = {};
			if (type == Constant.LoanType.EXISTING_LOAN) {
				$scope.existingObj = {};
				$scope.showExistingApplication = !$scope.showExistingApplication;
			} else if (type == Constant.LoanType.CURRENT_LOAN) {
				$scope.currentObj = {};
				$scope.showCurrentApplication = !$scope.showCurrentApplication;
			} else if (type == Constant.LoanType.CLOSED_LOAN) {
				$scope.closedObj = {};
				$scope.showClosedApplication = !$scope.showClosedApplication;
			}
		}

		$scope.existingLoanSave = function() {
			if ($scope.existingForm.$invalid) {
				$scope.existingForm.$submitted = true;
				Notification.warning("Please fill all mandatory fields !!");
				return;
			}
			$scope.saveApplication($scope.existingObj,Constant.LoanType.EXISTING_LOAN);	
		}
		$scope.currentLoanSave = function() {
			if ($scope.currentForm.$invalid) {
				$scope.currentForm.$submitted = true;
				Notification.warning("Please fill all mandatory fields !!");
				return;
			}
			$scope.saveApplication($scope.currentObj,Constant.LoanType.CURRENT_LOAN);
		}
		$scope.closedLoanSave = function() {
			if ($scope.closedForm.$invalid) {
				$scope.closedForm.$submitted = true;
				Notification.warning("Please fill all mandatory fields !!");
				return;
			}
			$scope.saveApplication($scope.closedObj,Constant.LoanType.CLOSED_LOAN);
		}

		$scope.saveApplication = function(appObj,type) {
			var data = {};
			data.applicationTypeId = appObj.applicationTypeId;
			appObj.loanTypeId = type;
//			data.status = "OPEN";
			data.data = JSON.stringify(appObj);
			applicationService.save(data).then(
				function(success) {
					if (success.data.status == 200) {
						Notification.info("Successfully created Application !!");
						$scope.getApplications();
						$scope.hideDiv(type);
					} else {
						Notification.warning(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		}

		$scope.getApplicationType = function() {
			if ($scope.applicationTypeList.length > 0) {
				return;
			}
			masterService.applicationType(0).then(
				function(success) {
					if (success.data.status == 200) {
						$scope.applicationTypeList = success.data.data;
						
					} else {
						Notification.warning(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		}
		$scope.getApplicationType();

		$scope.getLoanType = function() {
			if ($scope.loanTypeList.length > 0) {
				return;
			}
			masterService.loanType(0).then(
				function(success) {
					if (success.data.status == 200) {
						$scope.loanTypeList = success.data.data;
					} else {
						Notification.warning(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		}
		$scope.getLoanType();

	} ]);