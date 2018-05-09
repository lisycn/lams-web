app.run([ '$rootScope', '$state', '$stateParams', '$http', '$timeout', "$interval", "$q", "userService", "$cookieStore", "Constant", "Notification", "masterService", "URLS", "$filter","documentService",
	function($rootScope, $state, $stateParams, $http, $timeout, $interval, $q, userService, $cookieStore, Constant, Notification, masterService, URLS, $filter,documentService) {
		$rootScope.state = $state;
		$rootScope.stateParams = $stateParams;
		$rootScope.Constant = Constant;
		$rootScope.dateFormate = "dd MMM yyyy";
		$rootScope.isEmpty = function(data) {
			return (data == null || data == undefined || data == ""
				|| data == "null" || data == "undefined"
				|| data == '' || data == [] || data == {});
		}

		$rootScope.beforeLoginStates = [ "login", "signup" ];

		$rootScope.doLogout = function() {
			if ($rootScope.isEmpty($cookieStore.get(Constant.TOKEN))) {
				$state.go("login");
				return;
			}

			userService.logout().then(
				function(success) {
					$cookieStore.remove(Constant.TOKEN);
					$cookieStore.remove(Constant.USER_TYPE);
					$state.go("login");
				}, function(error) {
					$cookieStore.remove(Constant.TOKEN);
					$state.go("login");
				});
		}

		if ($rootScope.isEmpty($cookieStore.get(Constant.TOKEN))) {
			//			$rootScope.doLogout();
		}

		$rootScope.validateErrorResponse = function(error) {
			if (error.status == 401) {
				Notification.error(Constant.ErrorMessage.UN_AUTHORIZED);
				$rootScope.doLogout();
			} else if (error.status == 500) {
				if (!$rootScope.isEmpty(error.data)) {
					var errorRes = error.data.message.split(" ")[0];
					if (errorRes == 401) {
						Notification.error(Constant.ErrorMessage.UN_AUTHORIZED);
						$rootScope.doLogout();
					}
				} else {
					Notification.error(Constant.ErrorMessage.SOMETHING_WENT_WRONG);
				}
			} else if (error.status == 400) {
				Notification.error(Constant.ErrorMessage.BAD_REQUEST);
			} else {
				Notification.error(Constant.ErrorMessage.SOMETHING_WENT_WRONG);
			}
		}
		$rootScope.user = {};
		$rootScope.getLoggedInUserDetail = function() {
			userService.getLoggedInUserDetail().then(
				function(success) {
					if (success.data.status == 200) {
						$rootScope.user = success.data.data;
					} else {
						Notification.error(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		}

		$rootScope.getUserByType = function(userType) {
			switch (userType) {
			case Constant.UserType.LENDER.id:
				return Constant.UserType.LENDER;
			case Constant.UserType.BORROWER.id:
				return Constant.UserType.BORROWER;
			case Constant.UserType.ALL.id:
				return Constant.UserType.ALL;
			default:
				return null;
			}
		}

		$rootScope.countries = [];
		$rootScope.getCountries = function(mode) {
			masterService.countries(mode).then(
				function(success) {
					if (success.data.status == 200) {
						$rootScope.countries = success.data.data;
					} else {
						Notification.warning(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		}


		$rootScope.salutations = [];
		$rootScope.getSalutations = function(mode) {
			masterService.salutations(mode).then(
				function(success) {
					if (success.data.status == 200) {
						$rootScope.salutations = success.data.data;
					} else {
						Notification.warning(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		}

		$rootScope.banks = [];
		$rootScope.getBanks = function(mode) {
			masterService.banks(mode).then(
				function(success) {
					if (success.data.status == 200) {
						$rootScope.banks = success.data.data;
					} else {
						Notification.warning(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		}

		$rootScope.applicationTypes = [];
		$rootScope.getApplicationTypes = function(mode) {
			masterService.applicationType(mode).then(
				function(success) {
					if (success.data.status == 200) {
						$rootScope.applicationTypes = success.data.data;
					} else {
						Notification.warning(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		}

		$rootScope.businessTypes = [];
		$rootScope.getBusinessTypes = function(mode) {
			masterService.businessType(mode).then(
				function(success) {
					if (success.data.status == 200) {
						$rootScope.businessTypes = success.data.data;
					} else {
						Notification.warning(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		}

		$rootScope.loadMasters = function() {
			$rootScope.getCountries(Constant.Mode.ACTIVE.id);
			$rootScope.getLoggedInUserDetail();
			$rootScope.getSalutations(Constant.Mode.ACTIVE.id);
			$rootScope.getBanks(Constant.Mode.ACTIVE.id);
			$rootScope.getApplicationTypes(Constant.Mode.BOTH.id);
			$rootScope.getBusinessTypes(Constant.Mode.ACTIVE.id);
		}

		//Getting All Masters
		if (!$rootScope.isEmpty($cookieStore.get(Constant.TOKEN))) {
			$rootScope.loadMasters();
		}

		$rootScope.genders = [ {
			id : 1,
			value : 'Male'
		}, {
			id : 2,
			value : 'Female'
		}, {
			id : 3,
			value : 'Third Gender'
		} ];
		
		$rootScope.getGenderById = function(id){

			for(var i=0;i < $rootScope.genders.length;i++){
				if(id == $rootScope.genders[i].id){
					return $rootScope.genders[i].value;
				}
			}
			return '-';
		}

		$rootScope.getAppTypeIdByCode = function(appTypeCode) {
			switch (appTypeCode) {
			case Constant.ApplicationTypeCode.HOME_LOAN:
				return Constant.ApplicationType.HOME_LOAN;
			case Constant.ApplicationTypeCode.LOAN_AGAINST_PROPERTY:
				return Constant.ApplicationType.LOAN_AGAINST_PROPERTY;
			case Constant.ApplicationTypeCode.SECURED_BUSINESS_LOAN:
				return Constant.ApplicationType.SECURED_BUSINESS_LOAN;
			case Constant.ApplicationTypeCode.WORKING_CAPITAL_LOAN:
				return Constant.ApplicationType.WORKING_CAPITAL_LOAN;
			case Constant.ApplicationTypeCode.EDUCATION_LOAN:
				return Constant.ApplicationType.EDUCATION_LOAN;
			case Constant.ApplicationTypeCode.CAR_LOAN:
				return Constant.ApplicationType.CAR_LOAN;
			case Constant.ApplicationTypeCode.OVERDRAFT_FACILITIES_LOAN:
				return Constant.ApplicationType.OVERDRAFT_FACILITIES_LOAN;
			case Constant.ApplicationTypeCode.DROPLINE_OVERDRAFT_FACILITIES_LOAN:
				return Constant.ApplicationType.DROPLINE_OVERDRAFT_FACILITIES_LOAN;
			case Constant.ApplicationTypeCode.BANK_GUARANTEE_LOAN:
				return Constant.ApplicationType.BANK_GUARANTEE_LOAN;
			case Constant.ApplicationTypeCode.CC_FACILITIES_LOAN:
				return Constant.ApplicationType.CC_FACILITIES_LOAN;
			case Constant.ApplicationTypeCode.TERM_LOAN:
				return Constant.ApplicationType.TERM_LOAN;
			case Constant.ApplicationTypeCode.LOAN_AGAINST_FDS:
				return Constant.ApplicationType.LOAN_AGAINST_FDS;
			case Constant.ApplicationTypeCode.LOAN_AGAINST_SECURITIS:
				return Constant.ApplicationType.LOAN_AGAINST_SECURITIS;
			case Constant.ApplicationTypeCode.PROJECT_FINANCE_LOAN:
				return Constant.ApplicationType.PROJECT_FINANCE_LOAN;
			case Constant.ApplicationTypeCode.PRIVATE_EQUITY_FINANCE_LOAN:
				return Constant.ApplicationType.PRIVATE_EQUITY_FINANCE_LOAN;
			case Constant.ApplicationTypeCode.GOLD_LOAN:
				return Constant.ApplicationType.GOLD_LOAN;
			case Constant.ApplicationTypeCode.OTHER_LOAN:
				return Constant.ApplicationType.OTHER_LOAN;
			case Constant.ApplicationTypeCode.PERSONAL_LOAN:
				return Constant.ApplicationType.PERSONAL_LOAN;
			}
			return null;
		}


		$rootScope.getAppIdByAppCode = function(appId) {
			switch (appId) {
			case Constant.ApplicationType.HOME_LOAN:
				return Constant.ApplicationTypeCode.HOME_LOAN;
			case Constant.ApplicationType.LOAN_AGAINST_PROPERTY:
				return Constant.ApplicationTypeCode.LOAN_AGAINST_PROPERTY;
			case Constant.ApplicationType.SECURED_BUSINESS_LOAN:
				return Constant.ApplicationTypeCode.SECURED_BUSINESS_LOAN;
			case Constant.ApplicationType.WORKING_CAPITAL_LOAN:
				return Constant.ApplicationTypeCode.WORKING_CAPITAL_LOAN;
			case Constant.ApplicationType.EDUCATION_LOAN:
				return Constant.ApplicationTypeCode.EDUCATION_LOAN;
			case Constant.ApplicationType.CAR_LOAN:
				return Constant.ApplicationTypeCode.CAR_LOAN;
			case Constant.ApplicationType.OVERDRAFT_FACILITIES_LOAN:
				return Constant.ApplicationTypeCode.OVERDRAFT_FACILITIES_LOAN;
			case Constant.ApplicationType.DROPLINE_OVERDRAFT_FACILITIES_LOAN:
				return Constant.ApplicationTypeCode.DROPLINE_OVERDRAFT_FACILITIES_LOAN;
			case Constant.ApplicationType.BANK_GUARANTEE_LOAN:
				return Constant.ApplicationTypeCode.BANK_GUARANTEE_LOAN;
			case Constant.ApplicationType.CC_FACILITIES_LOAN:
				return Constant.ApplicationTypeCode.CC_FACILITIES_LOAN;
			case Constant.ApplicationType.TERM_LOAN:
				return Constant.ApplicationTypeCode.TERM_LOAN;
			case Constant.ApplicationType.LOAN_AGAINST_FDS:
				return Constant.ApplicationTypeCode.LOAN_AGAINST_FDS;
			case Constant.ApplicationType.LOAN_AGAINST_SECURITIS:
				return Constant.ApplicationTypeCode.LOAN_AGAINST_SECURITIS;
			case Constant.ApplicationType.PROJECT_FINANCE_LOAN:
				return Constant.ApplicationTypeCode.PROJECT_FINANCE_LOAN;
			case Constant.ApplicationType.PRIVATE_EQUITY_FINANCE_LOAN:
				return Constant.ApplicationTypeCode.PRIVATE_EQUITY_FINANCE_LOAN;
			case Constant.ApplicationType.GOLD_LOAN:
				return Constant.ApplicationTypeCode.GOLD_LOAN;
			case Constant.ApplicationType.OTHER_LOAN:
				return Constant.ApplicationTypeCode.OTHER_LOAN;
			case Constant.ApplicationType.PERSONAL_LOAN:
				return Constant.ApplicationTypeCode.PERSONAL_LOAN;
			}
			return null;
		}

		$rootScope.getUserDocument = function(documentId,scope) {
			documentService.getUserDocument(documentId).then(
				function(success) {
					if (success.data.status == 200) {
						if(!$rootScope.isEmpty(success.data.data) && !$rootScope.isEmpty(success.data.data.filePath)){
							scope.documentResponse = success.data.data;	
						} else {
							scope.documentResponse = {filePath :  null};
						}
						
					} else {
						Notification.warning(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		}
		
		$rootScope.getCurrencySymbol = function(code){
			switch (code) {
			case Constant.CURRENCY.DLR:
				return "$ ";
			default:
				return "₹ ";
			}
			return "₹ ";
		}


		$rootScope.uploadFile = function(files, applicationId, documentId, scope, isUserDoc) {
			if ($rootScope.isEmpty(documentId)) {
				Notification.warning("Document id is null or empty !!");
				return;
			}
			var formData = new FormData();
			formData.append("file", files[0]);
			var data = {};
			data.applicationId = applicationId;
			data.documentId = documentId;
			if(isUserDoc != undefined && isUserDoc != null){
				data.isUserDocument = isUserDoc;	
			}
			formData.append("uploadRequest", JSON.stringify(data));

			$http({
				method : "POST",
				enctype : 'multipart/form-data',
				url : URLS.user + "/upload",
				headers : {
					'Content-Type' : undefined,
					'token' : $cookieStore.get(Constant.TOKEN)
				},
				data : formData,
				processData : false,
				cache : false
			})
				.then(
					function success(response) {
						if (response.data.status == 200) {
							if (response.data.data.isFileUpload) {
								Notification.info("Successfully Uploaded !!");
								
								if(isUserDoc){
									$rootScope.getUserDocument(documentId,scope);
								} else {
									if (!$rootScope.isEmpty(scope.documentList)) {
										for(var i = 0; i < scope.documentList.length;i++){
											if(scope.documentList[i].documentMstrId == documentId){
												scope.documentList[i].documentResponseList.push(response.data.data);		
											}
										}
									}	
								}
								
							} else {
								Notification.warning("File can't uploaded !!");
							}

						} else if (response.data.status == 400) {
							Notification.warning(response.data.message);
						}
					}, function errorCallback(error) {
						$rootScope.validateErrorResponse(error);
					});
		}
	} ]);