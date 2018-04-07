angular.module("lams").controller("productsCtrl", [ "$scope", "masterService", "$rootScope", "Notification", "applicationService", "Constant", "$filter",
	function($scope, masterService, $rootScope, Notification, applicationService, Constant, $filter) {
		$scope.products = [];
		$scope.employmentTypes = [
			{id : 1, name : "Salaried"},
			{id : 2, name : "Self Employed"}
		];
		$scope.statuses = [Constant.Status.RESPONDED,Constant.Status.ACCEPTED,Constant.Status.REJECTED,Constant.Status.OPEN];
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
						product.applications = success.data.data;
					} else {
						Notification.warning(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		};
		
		$scope.appData = {};
		$scope.setApplicationData = function(app){
			console.log("$scope.status==>",$scope.status);
			if($scope.status = Constant.Status.OPEN){
				$scope.appData = {applicationMappingBO : {id : $scope.products[0].id},application:{id : app.id},canEdit : true};
				console.log("appappapp===>",app);
			}else{
				console.log("appappapp===>",app);
				$scope.appData = app;
				$scope.appData.canEdit = false;
			}
			console.log("$scope.appData====>",$scope.appData);
		}
		
		$scope.getEmployementType = function(id){
			return $filter("filter")($scope.employmentTypes,{id : id},true)[0].name;
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
		            		Notification.success(success.data.message);
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