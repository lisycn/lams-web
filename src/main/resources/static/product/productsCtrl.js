angular.module("lams").controller("productsCtrl", [ "$scope", "masterService", "$rootScope", "Notification", "applicationService", "Constant", "$filter",
	function($scope, masterService, $rootScope, Notification, applicationService, Constant, $filter) {
		$scope.products = [];
		$scope.getProducts = function() {
			applicationService.getAll().then(
				function(success) {
					if (success.data.status == 200) {
						$scope.products = success.data.data;
					} else {
						Notification.warning(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		}
		$scope.getProducts();

	} ]);