/**
 * ROUTER CONFIGURATION
 */
var app = angular.module("lams",['ui.router',
	"oc.lazyLoad",
	'ngMessages',
	'toastr',
	'ngCookies',
	'ui.bootstrap',
	'angular-loading-bar'
	]);
getUrls().then(bootstrapApplication);
function getUrls() {
	var initInjector = angular.injector([ "ng" ]);
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

app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
	cfpLoadingBarProvider.includeSpinner = true;
    cfpLoadingBarProvider.latencyThreshold = 500;
}]);

app.config(["$stateProvider", "$urlRouterProvider" ,"$locationProvider","$sceDelegateProvider",
	function($stateProvider, $urlRouterProvider,$locationProvider,$sceDelegateProvider){
	$stateProvider
	.state("login", {
		url : '/login',
		templateUrl : 'common/htmls/login.html',
		controller: 'loginCtrl',
		data : {pageTitle : "Lams | Login"},
		resolve: {
            lazyLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({files: [
                        'common/controllers/loginCtrl.js']});
            }]
		}
	}).state("signup", {
		url : '/signup',
		templateUrl : 'common/htmls/signup.html',
		controller: 'signupCtrl',
		data : {pageTitle : "Lams | Signup"},
		resolve: {
            lazyLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({files: [
                        'common/controllers/signupCtrl.js']});
            }]
		}
	}).state("otp", {
		url : '/otp-verification/:data',
		templateUrl : 'common/htmls/otp-verification.html',
		controller: 'otpVerificationCtrl',
		data : {pageTitle : "Lams | OTP Verification"},
		resolve: {
            lazyLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({files: [
                        'common/controllers/otpVerificationCtrl.js']});
            }]
		}
	}).state("email", {
		url : '/email-verification/:data',
		templateUrl : 'common/htmls/account-verification.html',
		controller: 'accountVerificationCtrl',
		data : {pageTitle : "Lams | Email Verification"},
		resolve: {
            lazyLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({files: [
                        'common/controllers/accountVerificationCtrl.js']});
            }]
		}
	}).state("resetpassword", {
		url : '/reset-password/:data',
		templateUrl : 'common/htmls/reset-password.html',
		controller: 'resetPasswordCtrl',
		data : {pageTitle : "Lams | Reset Password"},
		resolve: {
            lazyLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({files: [
                        'common/controllers/resetPasswordCtrl.js']});
            }]
		}
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
//            'footer@web': {
//                templateUrl: 'common/htmls/footer.html',
//            },
            'sidebar@web': {
                templateUrl: 'common/htmls/sidebar.html',
            }
        }
	}).state("web.lams.brDashboard", {
        	url : '/borrower-dashboard',
        	views :  {
        		'content@web' :  {
        			templateUrl : 'dashboard/br-dashboard.html',
            		controller: 'brDashboardCtrl'
        		}
        	},
        	data : {pageTitle : "Lams | Dashboard"},
        	resolve: {
                lazyLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({files: [
                            'dashboard/brDashboardCtrl.js']});
                }]
    		}
	}).state("web.lams.cpDashboard", {
    	url : '/channel-partner-dashboard',
    	views :  {
    		'content@web' :  {
    			templateUrl : 'dashboard/cp-dashboard.html',
        		controller: 'cpDashboardCtrl'
    		}
    	},
    	data : {pageTitle : "Lams | Dashboard"},
    	resolve: {
            lazyLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({files: [
                        'dashboard/cpDashboardCtrl.js']});
            }]
		}
	}).state("web.lams.clients", {
    	url : '/clients-dashboard',
    	views :  {
    		'content@web' :  {
    			templateUrl : 'clients/clients.html',
        		controller: 'clientsCtrl'
    		}
    	},
    	data : {pageTitle : "Lams | Clients"},
    	resolve: {
            lazyLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({files: [
                        'clients/clientsCtrl.js']});
            }]
		}
	}).state("web.lams.ldDashboard", {
    	url : '/lender-dashboard',
    	views :  {
    		'content@web' :  {
    			templateUrl : 'dashboard/ld-dashboard.html',
        		controller: 'ldDashboardCtrl'
    		}
    	},
    	data : {pageTitle : "Lams | Dashboard"},
    	resolve: {
            lazyLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({files: [
                        'dashboard/ldDashboardCtrl.js']});
            }]
		}
	}).state("web.lams.brProfile", {
    	url : '/borrwer-profile',
    	views :  {
    		'content@web' :  {
    			templateUrl : 'profile/brProfile.html',
        		controller: 'brProfileCtrl'
    		}
    	},
    	data : {pageTitle : "Lams | Profile"},
    	resolve: {
            lazyLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({files: [
                        'profile/brProfileCtrl.js']});
            }]
		}
	}).state("web.lams.brLoanProfile", {
    	url : '/borrwer-loan-profile/:brId/:appId/:appTypeId',
    	views :  {
    		'content@web' :  {
    			templateUrl : 'profile/brLoanProfile.html',
        		controller: 'brLoanProfileCtrl'
    		}
    	},
    	data : {pageTitle : "Lams | Application"},
    	resolve: {
            lazyLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({files: [
                        'profile/brLoanProfileCtrl.js']});
            }]
		}
	}).state("web.lams.ldProfile", {
    	url : '/lender-profile',
    	views :  {
    		'content@web' :  {
    			templateUrl : 'profile/ldProfile.html',
        		controller: 'ldProfileCtrl'
    		}
    	},
    	data : {pageTitle : "Lams | Lender"},
    	resolve: {
            lazyLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({files: [
                        'profile/ldProfileCtrl.js']});
            }]
		}
	}).state("web.lams.changepassword", {
		url : '/change-password',
		views : {
			'content@web' : {
				templateUrl : 'common/htmls/change-password.html',
				controller : 'changePasswordCtrl'
			}
		},
		data : {
			pageTitle : "Lams | Change Password"
		},
    	resolve: {
            lazyLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({files: [
                        'common/controllers/changePasswordCtrl.js']});
            }]
		}
	}).state("web.lams.applicationList", {
		url : '/applicationList',
		views : {
			'content@web' : {
				templateUrl : 'application/applicationList.html',
				controller : 'applicationListCtrl'
			}
		},
		data : {
			pageTitle : "Lams | Applications"
		},
    	resolve: {
            lazyLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({files: [
                        'application/applicationListCtrl.js']});
            }]
		}
	}).state("web.lams.products", {
		url : '/products',
		views : {
			'content@web' : {
				templateUrl : 'product/products.html',
				controller : 'productsCtrl'
			}
		},
		data : {
			pageTitle : "Lams | Products"
		},
    	resolve: {
            lazyLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({files: [
                        'product/productsCtrl.js']});
            }]
		}
	}).state("web.lams.application", {
    	url : '/application/:appCode/:appId',
    	views :  {
    		'content@web' :  {
    			templateUrl : 'application/application.html',
        		controller: 'applicationCtrl'
    		}
    	},	
    	data : {pageTitle : "Lams | Application"},
    	resolve: {
            lazyLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({files: [
                        'application/applicationCtrl.js']});
            }]
		}
	});
	$urlRouterProvider.otherwise("login");
} ]);

app.run(['$rootScope', function($rootScope) {
//	$scope.open = function() {
//	    $scope.popup1.opened = true;
//	  };
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