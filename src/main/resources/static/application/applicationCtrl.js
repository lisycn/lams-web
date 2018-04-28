angular.module("lams").controller("applicationCtrl", [ "$scope", "masterService", "$rootScope", "Notification", "applicationService", "Constant", "$filter", "$stateParams", "documentService",
	function($scope, masterService, $rootScope, Notification, applicationService, Constant, $filter, $stateParams, documentService) {

		$scope.applicationTypeCode = $stateParams.appCode;
		$scope.applicationTypeId = $rootScope.getAppTypeIdByCode($scope.applicationTypeCode);
		$scope.applicationId = $stateParams.appId;
		$scope.editApplicationForm = true;
		$scope.connections = [];
		$scope.statuses = [ Constant.Status.RESPONDED, Constant.Status.ACCEPTED, Constant.Status.REJECTED ];
		$scope.status = Constant.Status.RESPONDED;

		$scope.getApplicationDetails = function() {

			applicationService.getLoanDetails($scope.applicationId, $scope.applicationTypeId).then(
				function(success) {
					if (success.data.status == 200) {
						$scope.applicationDetails = success.data.data;
						
						if(!$rootScope.isEmpty($scope.applicationDetails.bankAccNumber)){
							$scope.applicationDetails.bankAccNumber = parseInt($scope.applicationDetails.bankAccNumber);
						}
						
						if ($scope.applicationDetails.employmentType == Constant.EmploymentType.SALARIED) {
							$scope.getDocumentList([ Constant.documentType.PHOTO_GRAPH, Constant.documentType.PAN_CARD, Constant.documentType.AADHAR_CARD, Constant.documentType.LAST_3_MONTH_SALARY_SLIP,
								Constant.documentType.LAST_6_MONTHS_BANK_ACCOUNT_STATEMENT, Constant.documentType.FORM_16_OR_APPOIMENT_LETTER,
								Constant.documentType.INVESTMENT_PROOFS, Constant.documentType.EXISTING_LOAN_DOCUMENT, Constant.documentType.OTHER_DOCUMENT ]);
						} else if ($scope.applicationDetails.employmentType == Constant.EmploymentType.SELF_EMPLOYED) {
							$scope.getDocumentList([ Constant.documentType.PHOTO_GRAPH, Constant.documentType.PAN_CARD, Constant.documentType.AADHAR_CARD,
								Constant.documentType.CORPORATE_ITR_SET_YEAR1, Constant.documentType.CORPORATE_ITR_SET_YEAR2,
								Constant.documentType.CORPORATE_ITR_SET_YEAR3,
								Constant.documentType.CORPORATE_BANK_ACCOUNT_STATEMENT, Constant.documentType.INDIVIDUAL_ITR_SET_YEAR1,
								Constant.documentType.INDIVIDUAL_ITR_SET_YEAR2, Constant.documentType.INDIVIDUAL_ITR_SET_YEAR3,
								Constant.documentType.INDIVIDUAL_BANK_ACCOUNT_STATEMENT ]);
						}
					} else {
						Notification.warning(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		}
		$scope.getApplicationDetails();

		$scope.saveLoanDetails = function(type) {
			
			if($scope.applicationDetails.isLoanDetailsLock){
				if(type == 1){
					Notification.warning("Your Application is Locked !!");
					return;
				} else if(type == 2){
					Notification.warning("Applicant is locked. Loan inquiry is submitted to lenders. You will receive notification when there is revert from lenders. Thank you.");
					return;
				}
			}
			
			
			var data = {};
			data.applicationTypeId = $scope.applicationTypeId;
			var uploadAll = true;
			for (var i = 0; i < $scope.documentList.length; i++) {
				if($scope.documentList[i].documentMstrId == Constant.documentType.PAN_CARD
						|| $scope.documentList[i].documentMstrId == Constant.documentType.AADHAR_CARD
						|| $scope.documentList[i].documentMstrId == Constant.documentType.LAST_3_MONTH_SALARY_SLIP
						|| $scope.documentList[i].documentMstrId == Constant.documentType.LAST_6_MONTHS_BANK_ACCOUNT_STATEMENT){
					if ($scope.documentList[i].documentResponseList.length == 0) {
						uploadAll = false;
					}
				}
				
			}
			$scope.applicationDetails.isUploadComplete = uploadAll;
			
			if (type == 2) {
				if (!$scope.currentForm.$valid) {
					Notification.warning("Please Fill All Details Before Submit Form");
					return;
				}
				if (!uploadAll) {
					Notification.warning("Please submit all the mandatory documents to proceed with submitting your loan inquiry with multiple lenders.");
					return;
				}
				$scope.applicationDetails.isLoanDetailsComplete = true;
				$scope.applicationDetails.isLoanDetailsLock = true;
			} else {
				$scope.applicationDetails.isLoanDetailsComplete = $scope.currentForm.$valid;
			}
			data.data = JSON.stringify($scope.applicationDetails);
			applicationService.save(data).then(
				function(success) {
					if (success.data.status == 200) {
						Notification.info("Successfully updated application !!");
						if (type == 1) {
							$scope.editApplicationForm = !$scope.editApplicationForm;
						}
					} else {
						Notification.warning(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		}

		$scope.uploadAppFile = function(element) {
			$rootScope.uploadFile(element.files, $scope.applicationId, element.id, $scope,false);
		}

		$scope.documentList = [];
		$scope.getDocumentList = function(listOfDocumentMstId) {
			if ($scope.applicationDetails.loanTypeId == Constant.LoanType.EXISTING_LOAN ||
				$scope.applicationDetails.loanTypeId == Constant.LoanType.CLOSED_LOAN) {
				return;
			}
			documentService.getDocumentList($scope.applicationId, listOfDocumentMstId).then(
				function(success) {
					if (success.data.status == 200) {
						$scope.documentList = success.data.data;
					} else {
						Notification.warning(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		}



		$scope.inActiveDocument = function(documentMappingId, documentMapId, documentResponseList, index) {
			documentService.inActiveDocument(documentMappingId).then(
				function(success) {
					if (success.data.status == 200) {
						Notification.info("Successfully inactive documents !!");
						documentResponseList.splice(index, 1);
					} else {
						Notification.warning(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		}

		$scope.getConnections = function(appId, status) {
			applicationService.getConnections(appId, status).then(
				function(success) {
					if (success.data.status == 200) {
						$scope.connections = success.data.data;
					} else {
						Notification.error(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		};

		$scope.getConnections($scope.applicationId, Constant.Status.RESPONDED);

		$scope.updateStatus = function(con, status) {
			applicationService.updateStatus(con, status).then(
				function(success) {
					if (success.data.status == 200) {
						if (success.data) {
							Notification.success("Successfully Lender Selected!");
							$scope.getConnections($scope.applicationId, Constant.Status.ACCEPTED);
						}
					} else {
						Notification.error(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		};

		$scope.curSelectedLender = {};
		$scope.setLenderInfo = function(con, status) {
			$scope.curSelectedLender.con = con;
			$scope.curSelectedLender.status = status;
		}

	} ]);