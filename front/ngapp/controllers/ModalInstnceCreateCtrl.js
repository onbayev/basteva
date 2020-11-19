'use strict';
/* Controllers */
angular.module('noSticksApp')
    .controller('ModalInstnceCreateCtrl', ['$uibModalInstance','$rootScope', '$scope', '$http', 'Main', 'data', function($uibModalInstance, $rootScope, $scope, $http, Main, data) {
        $scope.error_message = '';
        $scope.user = 'root';
        
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };    
        
        $scope.create_instance = function() {
            if (!$scope.name)
                $scope.error_message = "Название хоста обязательно!"
            else if(!$scope.ip)  
                $scope.error_message = "IP адрес хоста обязательно!"
            else  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test($scope.ip))
                $scope.error_message = "Не верный IP адрес!"
            else if(!$scope.user)  
                $scope.error_message = "ssh пользователь хоста обязательно!"
            else if(!$scope.password && !$scope.ssh_key)  
                $scope.error_message = "Паролт или ключ хоста обязательно!"
            else {
                $scope.error_message = '';
                var formData = {
                    name: $scope.name,
                    ip: $scope.ip,
                    fqdn: !$scope.fqdn?"":$scope.fqdn,
                    user: $scope.user,
                    password: !$scope.password?"":$scope.password,
                    ssh_key: !$scope.ssh_key?"":$scope.ssh_key
                }
                Main.instance(formData, function(res) {
                    $uibModalInstance.close();    
                }, function() {
                    $rootScope.error = 'Failed to signin';
                })
            }   
        };

    }]);

