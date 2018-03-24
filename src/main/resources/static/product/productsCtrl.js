angular.module("lams").controller("productsCtrl", [ "$scope", "masterService", "$rootScope", "Notification", "applicationService", "Constant", "$filter",
	function($scope, masterService, $rootScope, Notification, applicationService, Constant, $filter) {
		$scope.products = [];
		$scope.getProducts = function() {
			applicationService.getAll().then(
				function(success) {
					if (success.data.status == 200) {
						$scope.products = success.data.data;
						// When one product is available then get details automatically
						if($scope.products && $scope.products.length === 1){
							$scope.getBorrowerForLenderByApplicationId($scope.products[0]);
						}
					} else {
						Notification.warning(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		}
		$scope.getProducts();

		$scope.getBorrowerForLenderByApplicationId = function(product) {
			product.isActiveTab = true
			console.log("product : ",product)
			applicationService.getBorrowerForLenderByApplicationId(product.id).then(
				function(success) {
					if (success.data.status == 200) {
						product.borrowers = success.data.data;
					} else {
						Notification.warning(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		};
		
//		$scope.getApplicationDetailsByIdAndUserId = function(appId, borrower) {
//					borrower.isView = true
//					applicationService.getApplicationDetailsByIdAndUserId(appId, borrower.id).then(
//						function(success) {
//							if (success.data.status == 200) {
//								borrower.applications = success.data.data;
//							} else {
//								Notification.warning(success.data.message);
//							}
//						}, function(error) {
//							$rootScope.validateErrorResponse(error);
//						});
//				};
		
		
	} ]);