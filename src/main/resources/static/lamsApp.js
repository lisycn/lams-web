/**
 * ROUTER CONFIGURATION
 */
var app = angular.module("lams",['ui.router','ngMessages','toastr','ngCookies']);
getUrls().then(bootstrapApplication);
function getUrls() {
    var initInjector = angular.injector(["ng"]);
    var $http = initInjector.get("$http");
    return $http.get("web/get_urls").then(function(response) {
    	console.log(response.data)
        app.constant("URLS", response.data);
    }, function(errorResponse) {
        console.log("Something went wrong")
    });
}
function bootstrapApplication() {
    angular.element(document).ready(function() {
        angular.bootstrap(document, ["lams"]);
    });
}
app.config(["$stateProvider", "$urlRouterProvider" ,"$locationProvider","$sceDelegateProvider",
	function($stateProvider, $urlRouterProvider,$locationProvider,$sceDelegateProvider){
	$stateProvider
	.state("login", {
		url : '/login',
		templateUrl : 'common/htmls/login.html',
		controller: 'loginCtrl',
		data : {pageTitle : "Lams | Login"}
	}).state("signup", {
		url : '/signup',
		templateUrl : 'common/htmls/signup.html',
		controller: 'signupCtrl',
		data : {pageTitle : "Lams | Signup"}
	}).state("web", {
    	url : '',
    	templateUrl : 'web.html',
	})
	.state("web.lams", {
		url : '/lams',
		abstract: true,
        views: {
            'header@web': {
                templateUrl: 'common/htmls/header.html',
            },
            'footer@web': {
                templateUrl: 'common/htmls/footer.html',
            },
            'sidebar@web': {
                templateUrl: 'common/htmls/sidebar.html',
            }
        }
	}).state("web.lams.dashboard", {
        	url : '/dashboard',
        	views :  {
        		'content@web' :  {
        			templateUrl : 'dashboard/dashboard.html',
            		controller: 'dashboardCtrl',
            		data : {pageTitle : "Lams | Dashboard"}        			
        		}
        	}
	});
	$urlRouterProvider.otherwise("login");
}]);

app.run([ '$rootScope', '$state', '$stateParams','$http','$timeout',"$interval","$q","userService","$cookieStore","Constant","Notification",
	function($rootScope, $state, $stateParams,$http,$timeout,$interval,$q,userService,$cookieStore,Constant,Notification) {
    $rootScope.state = $state;
    $rootScope.stateParams = $stateParams;
    $rootScope.isEmpty = function(data) {
		return (data == null || data == undefined || data == ""
				|| data == "null" || data == "undefined"
				|| data == '' || data == [] || data == {});
	}
    
    $rootScope.doLogout = function(){
		userService.logout().then(
	            function(success) {
	            	$cookieStore.remove(Constant.TOKEN);
	            	$state.go("login");
	            }, function(error) {
	            	$cookieStore.remove(Constant.TOKEN);
	            	$state.go("login");
	     });		
		
	}
    if($rootScope.isEmpty($cookieStore.get(Constant.TOKEN))){
    	$rootScope.doLogout();
    }

    $rootScope.validateErrorResponse = function(error){
    	if(error.status == 401){
        	Notification.error(Constant.ErrorMessage.UN_AUTHORIZED);
            $rootScope.doLogout();
        }else if(error.status == 500){
        	if(!$rootScope.isEmpty(error.data)){
        		var errorRes = error.data.message.split(" ")[0];
        		if(errorRes == 401){
        			Notification.error(Constant.ErrorMessage.UN_AUTHORIZED);	
        			$rootScope.doLogout();
        		}
        	}else{
        		Notification.error(Constant.ErrorMessage.SOMETHING_WENT_WRONG);	
        	}
        } else if(error.status == 400){
        	Notification.error(Constant.ErrorMessage.BAD_REQUEST);
        }else{
        	Notification.error(Constant.ErrorMessage.SOMETHING_WENT_WRONG);
        }
    }
}]);

//app.config(['$stateProvider', '$httpProvider', '$locationProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider',
//	function ($stateProvider, $httpProvider, $locationProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider) {
//
//		app.controller = $controllerProvider.register;
//		app.directive = $compileProvider.directive;
//		app.filter = $filterProvider.register;
//		app.factory = $provide.factory;
//		app.service = $provide.service;
//		app.constant = $provide.constant;
//		app.value = $provide.value;
//		
//	}]);