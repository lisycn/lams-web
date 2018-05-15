angular.module("lams").controller("productsCtrl", [ "$scope", "masterService", "$rootScope", "Notification", "applicationService", "Constant", "$filter",
	function($scope, masterService, $rootScope, Notification, applicationService, Constant, $filter) {
		$scope.products = [];
		
		$scope.employmentTypes = [
			{id : 1, name : "Salaried"},
			{id : 2, name : "Self Employed"}
		];
		$scope.statuses = [Constant.Status.RESPONDED,Constant.Status.ACCEPTED,Constant.Status.REJECTED,Constant.Status.OPEN,Constant.Status.NOTINTERESTED];
		$scope.status = Constant.Status.OPEN;
		$scope.getProducts = function() {
			applicationService.getAll().then(
				function(success) {
					if (success.data.status == 200) {
						$scope.products = success.data.data;
						// When one product is available then get details automatically
						if($scope.products && $scope.products.length === 1){
							$scope.getBorrowerForLenderByApplicationId($scope.products[0],Constant.Status.OPEN);
						}
					} else {
						Notification.warning(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		}
		$scope.getProducts();

		$scope.getBorrowerForLenderByApplicationId = function(product,status) {
			product.isActiveTab = true
			console.log("product : ",product)
			applicationService.getBorrowerForLenderByApplicationId(product.applicationTypeMstrBO.id,status).then(
				function(success) {
					if (success.data.status == 200) {
						if(status === Constant.Status.OPEN){
							product.applications = $filter("filter")(success.data.data,{isLoanDetailsLock : true});
						}else{
							product.applications = success.data.data;
							product.applications = _.uniqBy(product.applications, function (obj) {
								return obj.application.id;
								});
						}
					} else {
						Notification.warning(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		};
		
		$scope.appData = {};
		$scope.setApplicationData = function(app, status){
			console.log("app====>",app);
			console.log("$scope.status==>",status);
			if(status == Constant.Status.OPEN){
				$scope.appData = {applicationMappingBO : {id : $scope.products[0].id},application:app,canEdit : true};
				console.log("appappapp===>",app);
			}else{
				console.log("appappapp===>",app);
				$scope.appData = app;
				$scope.appData.canEdit = false;
			}
			console.log("$scope.appData====>",$scope.appData);
		}
		
		$scope.getEmployementType = function(id){
			var employementType = $filter("filter")($scope.employmentTypes,{id : id},true)[0];
			return employementType ? employementType.name : "N.A";
		}
		$scope.submitApproval = function (){
			if (!$scope.responseForm.$valid) {
				Notification.warning("Please fill all mandatory fields");
				return false;
			}
			console.log("$scope.appData=====>",$scope.appData);
			applicationService.saveApprovalRequest($scope.appData).then(
		            function(success) {
		            	if(success.data.status == 200){
		            		Notification.success("Request has been sent");
		            		$scope.status = Constant.Status.RESPONDED;
		            		$scope.getBorrowerForLenderByApplicationId($scope.products[0],$scope.status);
		                }else{
		                	Notification.error(success.data.message);
		                }
		            }, function(error) {
		            	$rootScope.validateErrorResponse(error);
		     });
		};
		
	} ]);