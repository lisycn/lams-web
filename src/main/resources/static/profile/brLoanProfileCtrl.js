angular.module("lams").controller("brLoanProfileCtrl", [ "$scope", "$http", "$rootScope", "Constant", "userService", "Notification", "masterService", "$filter", "$stateParams", "applicationService","documentService",
	function($scope, $http, $rootScope, Constant, userService, Notification, masterService, $filter, $stateParams, applicationService,documentService) {


		$scope.brId = $stateParams.brId;


		var appId = $stateParams.appId;
		var appTypeId = $stateParams.appTypeId;

		function getUserDetailsById(brId) {
			userService.getUserDetailsById(brId).then(
				function(success) {
					if (success.data.status == 200) {
						$scope.userData = success.data.data;
						console.log("$scope.userData-------------------------->",$scope.userData)
						
                                                $scope.applicationList = $scope.userData.applications;
                                                $scope.totalExistingLoanAmount = 0;
                                                $scope.totalExistingLoanEMI = 0;
                                                $scope.existingLoanList = $filter('filter')($scope.applicationList,{loanTypeId : Constant.LoanType.EXISTING_LOAN});
						for(var i = 0; i < $scope.existingLoanList.length; i++){
							if(!$rootScope.isEmpty($scope.existingLoanList[i].loanAmount)){
								$scope.totalExistingLoanAmount = $scope.totalExistingLoanAmount + parseFloat($scope.existingLoanList[i].loanAmount);
								$scope.totalExistingLoanEMI = $scope.totalExistingLoanEMI + parseFloat($scope.existingLoanList[i].emi);
							}
						}
                                                
						$scope.userData.applications = $filter('filter')($scope.userData.applications, {
							id : appId
						});
						
						if ($scope.userData.employmentType == Constant.EmploymentType.SALARIED) {
							$scope.getDocumentList([ Constant.documentType.PHOTO_GRAPH, Constant.documentType.PAN_CARD, Constant.documentType.AADHAR_CARD, Constant.documentType.LAST_3_MONTH_SALARY_SLIP,
								Constant.documentType.LAST_6_MONTHS_BANK_ACCOUNT_STATEMENT, Constant.documentType.FORM_16_OR_APPOIMENT_LETTER,
								Constant.documentType.INVESTMENT_PROOFS, Constant.documentType.EXISTING_LOAN_DOCUMENT, Constant.documentType.OTHER_DOCUMENT ]);
						} else if ($scope.userData.employmentType == Constant.EmploymentType.SELF_EMPLOYED) {
							$scope.getDocumentList([ Constant.documentType.PHOTO_GRAPH, Constant.documentType.PAN_CARD, Constant.documentType.AADHAR_CARD,
								Constant.documentType.CORPORATE_ITR_SET_YEAR1, Constant.documentType.CORPORATE_ITR_SET_YEAR2,
								Constant.documentType.CORPORATE_ITR_SET_YEAR3,
								Constant.documentType.CORPORATE_BANK_ACCOUNT_STATEMENT, Constant.documentType.INDIVIDUAL_ITR_SET_YEAR1,
								Constant.documentType.INDIVIDUAL_ITR_SET_YEAR2, Constant.documentType.INDIVIDUAL_ITR_SET_YEAR3,
								Constant.documentType.INDIVIDUAL_BANK_ACCOUNT_STATEMENT ]);
						}
					} else {
						Notification.error(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		}
		getUserDetailsById($scope.brId);

    $scope.documentList = [];
		$scope.getDocumentList = function(listOfDocumentMstId) {
			
			documentService.getDocumentList(appId, listOfDocumentMstId).then(
				function(success) {
					if (success.data.status == 200) {
						$scope.documentList = success.data.data;
					} else {
						Notification.warning(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		};
		
		$scope.setApplicationData = function(app) {
			$scope.respond = {
				application : {},
				applicationMappingBO : {
					id : appTypeId
				}
			};
			$scope.respond.application = app;
			$scope.respond.canEdit = true;
		};

		$scope.submitApproval = function (){
		if (!$scope.responseForm.$valid) {
			Notification.warning("Please fill all mandatory fields");
			return false;
		}
		
		console.log($scope.respond)
		return false;
		applicationService.saveApprovalRequest($scope.respond).then(
	            function(success) {
	            	if(success.data.status == 200){
	            		Notification.success("Request has been sent");
//	            		$scope.userData = success.data.data;
	            		getUserDetailsById($scope.brId);
	                }else{
	                	Notification.error(success.data.message);
	                }
	            }, function(error) {
	            	$rootScope.validateErrorResponse(error);
	     });
	};
	
	$scope.setNotInterestedStatus = function (app){
		
		$scope.respond = {
				application : {},
				applicationMappingBO : {
					id : appTypeId
				}
			};
			$scope.respond.application = app;
		
		applicationService.setNotInterestedStatus($scope.respond).then(
	            function(success) {
	            	if(success.data.status == 200){
	            		Notification.success("Request has been sent");
//	            		$scope.userData = success.data.data;
	            		getUserDetailsById($scope.brId);
	                }else{
	                	Notification.error(success.data.message);
	                }
	            }, function(error) {
	            	$rootScope.validateErrorResponse(error);
	     });
	};
	
		$scope.getRespondedApplications = function(application) {

			applicationService.getRespondedApplications($scope.brId, application.id).then(
				function(success) {
					if (success.data.status == 200) {
						console.log(success.data.data);
						application.respondedApplications = success.data.data;
					} else {
						Notification.error(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		};

		$scope.viewRespondedData = function(respondedData) {
			if (respondedData && respondedData.length > 0) {
				$scope.respond = respondedData[0];
				$scope.respond.canEdit = false;
			}
		};


	} ]);