app.controller("applicationCtrl",["$scope",function($scope){
	$scope.selectedTab = 0;
	$scope.changeTab = function(tab) {
		$scope.selectedTab = parseInt(tab) - 1;
	}
}]);