angular.module("lams").controller("sideBarCtrl",["$scope","$rootScope","Constant","$state","Notification",
		function($scope,$rootScope,Constant,$state,Notification) {
	
	
	$scope.go = function(){
		if($rootScope.isEmpty($rootScope.user) || $rootScope.user.isProfileFilled != true){
			Notification.warning("Please Complete your Profile to add Clients");
			if($state.$current.name != "web.lams.cpProfile"){
				$state.go("web.lams.cpProfile");
			}
			return false;
		}
		$state.go("web.lams.clients");
	}
}]);
