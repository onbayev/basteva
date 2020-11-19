'use strict';
angular.module('noSticksApp')
    .factory('Main', ['$http', '$localStorage', function($http, $localStorage){
        var baseUrl = "http://localhost";
        function changeUser(user) {
            angular.extend(currentUser, user);
        }

        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }

        function getUserFromToken() {
            var token = $localStorage.token;
            var user = {};
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }
            return user;
        }

        var currentUser = getUserFromToken();

        return {
            save: function(data, success, error) {
                $http.post(baseUrl + '/signin', data).then(
                    function (res) { success(res); },
                    function (res) { error(res) }
                )
            },
            signin: function(data, success, error) {
                console.log(data);
                $http.post(baseUrl + '/auth', data).then(
                    function (res) { success(res); },
                    function (res) { error(res) }
                )
            },
            me: function(success, error) {
                $http.get(baseUrl + '/me').then(
                    function (res) { success(res); },
                    function (res) { error(res) }
                )
            },
            logout: function(success) {
                changeUser({});
                delete $localStorage.token;
                success();
            },
            instances: function(success, error) {
                $http.get(baseUrl + '/api/instances').then(
                    function (res) { success(res); },
                    function (res) { error(res) }
                )
            },
            instance: function(data, success, error) {
                $http.post(baseUrl + '/api/instance', data).then(
                    function (res) { success(res); },
                    function (res) { error(res) }
                )
            },

        };
    }
]);
