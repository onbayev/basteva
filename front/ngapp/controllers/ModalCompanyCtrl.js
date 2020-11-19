angular.module('noSticksApp').controller('ModalCompanyCtrl', function ($uibModalInstance, $http, data) {

});

angular.module('noSticksApp').controller('ModalProductCtrl', function ($uibModalInstance, $http, data) {
    $scope.create_instance = function() {
        var formData = {
            name: $scope.name,
            ip: $scope.ip,
            fqdn: $scope.fqdn,
            user: $scope.user,
            password: $scope.password,
            ssh_key: $scope.ssh_key
        }
        Main.instance(formData, function(res) {
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
});
