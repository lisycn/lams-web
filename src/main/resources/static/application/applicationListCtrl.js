angular.module("lams").controller("applicationListCtrl", [ "$scope", "masterService", "$rootScope", "Notification", "applicationService", "Constant","$filter","$state",
	function($scope, masterService, $rootScope, Notification, applicationService, Constant,$filter,$state) {

		$scope.showExistingApplication = false;
		$scope.showCurrentApplication = false;
		$scope.showClosedApplication = false;
		
		$scope.acceptedStatus = Constant.Status.ACCEPTED;
		
		$scope.existingObj = {};
		$scope.currentObj = {};
		$scope.closedObj = {};

		$scope.existingAppCount = 0;
		$scope.curentAppCount = 0;
		$scope.closedAppCount = 0;
		
		$scope.applicationList = [];
		$scope.applicationTypeList = [];
		$scope.loanTypeList = [];
		
		$scope.totalExistingLoanAmount = 0;
		$scope.totalExistingLoanEMI = 0;
		$scope.getApplications = function() {
			$scope.totalExistingLoanAmount = 0;
			applicationService.getAll().then(
				function(success) {
					if (success.data.status == 200) {
						$scope.existingLoanList = [];
						$scope.applicationList = success.data.data;
						$scope.existingLoanList = $filter('filter')($scope.applicationList,{loanTypeId : Constant.LoanType.EXISTING_LOAN});
						for(var i = 0; i < $scope.existingLoanList.length; i++){
							if(!$rootScope.isEmpty($scope.existingLoanList[i].loanAmount)){
								$scope.totalExistingLoanAmount = $scope.totalExistingLoanAmount + parseFloat($scope.existingLoanList[i].loanAmount);
								$scope.totalExistingLoanEMI = $scope.totalExistingLoanEMI + parseFloat($scope.existingLoanList[i].emi);
							}
						}
						$scope.existingAppCount = $scope.existingLoanList.length;
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
			
			if(!$rootScope.isEmpty($rootScope.user)){
				if($rootScope.isEmpty($rootScope.user.isProfileFilled) || !$rootScope.user.isProfileFilled){
					$state.go("web.lams.brProfile");
					Notification.warning("Please Fill First Your Profile");
					return;
				}
			}
			
			
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
						Notification.info("Application Created  Successfully!!");
						if(type == Constant.LoanType.EXISTING_LOAN || type == Constant.LoanType.CLOSED_LOAN){
							$scope.getApplications();
							$scope.hideDiv(type);
						} else {
							$state.go("web.lams.application",{appCode : $rootScope.getAppIdByAppCode(appObj.applicationTypeId) , appId : success.data.data});	
						}
						
					} else {
						Notification.warning(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		}
		
		$scope.deleteApplication = function(applicationId) {
			if($rootScope.isEmpty(applicationId)){
				Notification.warning("Something is Wrong! Please try to Refresh Page or Relogin!");
				return false;
			}
			
			applicationService.inactive(applicationId).then(
				function(success) {
					if (success.data.status == 200) {
						Notification.info("Application Deleted Successfully!");
						$scope.getApplications();
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
			masterService.applicationType(-1).then(
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