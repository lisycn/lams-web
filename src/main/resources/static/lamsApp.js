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
	}).state("otp", {
		url : '/otp-verification/:data',
		templateUrl : 'common/htmls/otp-verification.html',
		controller: 'signupCtrl',
		data : {pageTitle : "Lams | OTP Verification"}
	}).state("email", {
		url : '/email-verification/:data',
		templateUrl : 'common/htmls/account-verification.html',
		controller: 'signupCtrl',
		data : {pageTitle : "Lams | Email Verification"}
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
	}).state("web.lams.applicationList", {
    	url : '/applicationList',
    	views :  {
    		'content@web' :  {
    			templateUrl : 'application/applicationList.html',
        		controller: 'applicationListCtrl'
    		}
    	},
    	data : {pageTitle : "Lams | Applications"}
	}).state("web.lams.application", {
    	url : '/application/:appCode/:appId',
    	views :  {
    		'content@web' :  {
    			templateUrl : 'application/application.html',
        		controller: 'applicationCtrl'
    		}
    	},
    	data : {pageTitle : "Lams | Applications"}
	});
	$urlRouterProvider.otherwise("login");
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