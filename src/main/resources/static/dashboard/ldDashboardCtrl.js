angular.module("lams").controller("ldDashboardCtrl",["$scope", "$rootScope","Constant","applicationService",
		function($scope,$rootScope,Constant,applicationService) {

	$scope.borrowers = [];
	$scope.getBorrowers = function() {
		applicationService.getBorrowerForLender().then(
			function(success) {
				if (success.data.status == 200) {
					if(!$rootScope.isEmpty(success.data.data)){
						$scope.borrowers = success.data.data;
						console.log("$scope.users==>", $scope.borrowers);						
					}
				} else if (success.data.status == 400) {
					Notification.error(success.data.message);
				} else {
					Notification.error(Constant.ErrorMessage.SOMETHING_WENT_WRONG);
				}
			}, function(error) {
				$rootScope.validateErrorResponse(error);
			});
	}
	
	$scope.getBorrowers();

}]);
