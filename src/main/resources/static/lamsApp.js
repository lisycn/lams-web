/**
 * ROUTER CONFIGURATION
 */
var app = angular.module("lams",['ui.router','ngMessages','toastr','ngCookies','ui.bootstrap']);
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
            		controller: 'dashboardCtrl'
        		}
        	},
        	data : {pageTitle : "Lams | Dashboard"}
	}).state("web.lams.brProfile", {
    	url : '/profile',
    	views :  {
    		'content@web' :  {
    			templateUrl : 'profile/brProfile.html',
        		controller: 'brProfileCtrl'
    		}
    	},
    	data : {pageTitle : "Lams | Profile"}
	}).state("web.lams.application", {
    	url : '/application',
    	views :  {
    		'content@web' :  {
    			templateUrl : 'application/application.html',
        		controller: 'applicationCtrl'
    		}
    	},
    	data : {pageTitle : "Lams | Application"}
	});
	$urlRouterProvider.otherwise("login");
}]);

app.run([ '$rootScope', '$state', '$stateParams','$http','$timeout',"$interval","$q","userService","$cookieStore","Constant","Notification","masterService",
	function($rootScope, $state, $stateParams,$http,$timeout,$interval,$q,userService,$cookieStore,Constant,Notification,masterService) {
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
    $rootScope.user = {};
	$rootScope.getLoggedInUserDetail = function(){
		userService.getLoggedInUserDetail().then(
	            function(success) {
	            	if(success.data.status == 200){
	            		$rootScope.user = success.data.data;
	                }else{
	                	Notification.error(success.data.message);
	                }
	            }, function(error) {
	            	$rootScope.validateErrorResponse(error);
	     });		
	}
	
	$rootScope.getUserByType = function(userType){
		switch(userType){
		case  Constant.UserType.LENDER.id:
			return Constant.UserType.LENDER;
		case Constant.UserType.BORROWER.id:
			return Constant.UserType.BORROWER;
		case Constant.UserType.ALL.id:
			return Constant.UserType.ALL;
		default : 
			return null;
		}
	}
	
	$rootScope.countries = [];
	$rootScope.getCountries = function(mode){
		masterService.countries(mode).then(
	            function(success) {
	            	if(success.data.status == 200){
	            		$rootScope.countries = success.data.data;	            		
	            	}else{
	            		Notification.warning(success.data.message);
	            	}
	            }, function(error) {
	            	$rootScope.validateErrorResponse(error);
	     });		
	}
	
	
	$rootScope.salutations = [];
	$rootScope.getSalutations = function(mode){
		masterService.salutations(mode).then(
	            function(success) {
	            	if(success.data.status == 200){
	            		$rootScope.salutations = success.data.data;	            		
	            	}else{
	            		Notification.warning(success.data.message);
	            	}
	            }, function(error) {
	            	$rootScope.validateErrorResponse(error);
	     });		
	}
	
	$rootScope.loadMasters = function(){
			$rootScope.getCountries(Constant.Mode.ACTIVE.id);
			$rootScope.getLoggedInUserDetail();
			$rootScope.getSalutations(Constant.Mode.ACTIVE.id);
	}
	
	//Getting All Masters
	if(!$rootScope.isEmpty($cookieStore.get(Constant.TOKEN))){
		$rootScope.loadMasters();	
	}
	
	$rootScope.genders =[{id : 1, value : 'Male'},{id : 2, value : 'Female'},{id : 3, value : 'Third Gender'}]; 
	
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