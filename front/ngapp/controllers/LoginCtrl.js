'use strict';
/* Controllers */
angular.module('noSticksApp')
    .controller('LoginCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'Main', function($rootScope, $scope, $location, $localStorage, Main) {
        $scope.signin = function() {
            var formData = {
                username: $scope.username,
                password: $scope.password
            }
            Main.signin(formData, function(res) {
                if (res.type == false) {
                    alert(res.data)    
                } else {
                    $localStorage.token = res.data.access_token;
                    window.location = "/";    
                }
            }, function() {
                $rootScope.error = 'Failed to signin';
            })
        };
        $scope.signup = function() {
            var formData = {
                email: $scope.email,
                password: $scope.password
            }
            Main.save(formData, function(res) {
                if (res.type == false) {
                    alert(res.data)
                } else {
                    $localStorage.token = res.data.access_token;
                    window.location = "/"    
                }
            }, function() {
                $rootScope.error = 'Failed to signup';
            })
        };
        $scope.me = function() {
            Main.me(function(res) {
                $scope.myDetails = res;
            }, function() {
                $rootScope.error = 'Failed to fetch details';
            })
        };
        $scope.logout = function() {
            Main.logout(function() {
                window.location = "/"
            }, function() {
                alert("Failed to logout!");
            });
        };
        $scope.token = $localStorage.token;
    }])
