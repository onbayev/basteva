// Code goes here
'use strict';


var noSticksApp = angular.module('noSticksApp', 
['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ngResource', 'ngRoute', 'ngStorage'])
.config( function($routeProvider,$httpProvider){
  $routeProvider.when('/',
  {
      templateUrl:'ngapp/views/home.html',
      controller:'HomeCtrl'
  });
  $routeProvider.when('/inventory',
  {
      templateUrl:'ngapp/views/inventory.html',
      controller:'InventoryCtrl'
  });
  $routeProvider.when('/login',
  {
      templateUrl:'ngapp/views/login.html',
      controller:'LoginCtrl'
  });
  
  $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
    return {
        'request': function (config) {
            console.log('request');
            config.headers = config.headers || {};
            if ($localStorage.token) {
                console.log($localStorage.token);
                config.headers.Authorization = 'JWT ' + $localStorage.token;
            }
            return config;
        },
        'responseError': function(response) {
            if(response.status === 401 || response.status === 403 || response.status === 405) {
                $location.path('/login');
            }
            return $q.reject(response);
        }
    };
   }]);
});



