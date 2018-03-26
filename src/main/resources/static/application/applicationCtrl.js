angular.module("lams").controller("applicationCtrl", [ "$scope", "masterService", "$rootScope", "Notification", "applicationService", "Constant", "$filter", "$stateParams", "documentService",
	function($scope, masterService, $rootScope, Notification, applicationService, Constant, $filter, $stateParams, documentService) {

		$scope.applicationTypeCode = $stateParams.appCode;
		$scope.applicationTypeId = $rootScope.getAppTypeIdByCode($scope.applicationTypeCode);
		$scope.applicationId = $stateParams.appId;
		$scope.editApplicationForm = true;

		$scope.getApplicationDetails = function() {

			applicationService.getLoanDetails($scope.applicationId, $scope.applicationTypeId).then(
				function(success) {
					if (success.data.status == 200) {
						$scope.applicationDetails = success.data.data;
						if($scope.applicationDetails.employmentType == Constant.EmploymentType.SALARIED){
							$scope.getDocumentList([Constant.documentType.PHOTO_GRAPH,Constant.documentType.PAN_CARD,Constant.documentType.AADHAR_CARD,Constant.documentType.LAST_3_MONTH_SALARY_SLIP,
								Constant.documentType.LAST_6_MONTHS_BANK_ACCOUNT_STATEMENT,Constant.documentType.FORM_16_OR_APPOIMENT_LETTER,
								Constant.documentType.INVESTMENT_PROOFS,Constant.documentType.EXISTING_LOAN_DOCUMENT,Constant.documentType.OTHER_DOCUMENT]);
						} else if($scope.applicationDetails.employmentType == Constant.EmploymentType.SELF_EMPLOYED){
							$scope.getDocumentList(Constant.documentType.PHOTO_GRAPH,Constant.documentType.PAN_CARD,Constant.documentType.AADHAR_CARD,
									Constant.documentType.CORPORATE_ITR_SET_YEAR1,Constant.documentType.CORPORATE_ITR_SET_YEAR2,
									Constant.documentType.CORPORATE_ITR_SET_YEAR3,
									Constant.documentType.CORPORATE_BANK_ACCOUNT_STATEMENT,Constant.documentType.INDIVIDUAL_ITR_SET_YEAR1,
									Constant.documentType.INDIVIDUAL_ITR_SET_YEAR2,Constant.documentType.INDIVIDUAL_ITR_SET_YEAR3,
									Constant.documentType.INDIVIDUAL_BANK_ACCOUNT_STATEMENT);
						}
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
						$scope.editApplicationForm = !$scope.editApplicationForm;
					} else {
						Notification.warning(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		}

		$scope.uploadAppFile = function(element) {
			$rootScope.uploadFile(element.files, $scope.applicationId, element.id,$scope);
		}

		$scope.documentList = [];
		$scope.getDocumentList = function(listOfDocumentMstId) {
			documentService.getDocumentList($scope.applicationId,listOfDocumentMstId).then(
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
		

		
		$scope.inActiveDocument = function(documentMappingId,documentMapId,documentResponseList,index) {
			documentService.inActiveDocument(documentMappingId).then(
				function(success) {
					if (success.data.status == 200) {
						Notification.info("Successfully inactive documents !!");
						documentResponseList.splice(index,1);
					} else {
						Notification.warning(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		}



	} ]);