'use strict';
/* Controllers */
angular.module('noSticksApp')
    .controller('HomeCtrl', ['$rootScope', '$scope', '$location', '$uibModal', 'Main', function($rootScope, $scope, $location, $uibModal, Main) {
        

        Main.me(function(res) {
            $scope.myDetails = res;
        }, function() {
            $rootScope.error = 'Failed to fetch details';
        });
        Main.instances(function(res) {
            $scope.instances = res.data;
            console.log($scope.instances);
        }, function() {
            $rootScope.error = 'Failed to fetch instances';
        });

        $scope.instance_create = function() {
            var modalInstance = $uibModal.open({
              animation: true,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'ngapp/views/modal_instace_create.html',
              controller: 'ModalInstnceCreateCtrl',
              controllerAs: '$scope',
              resolve: {
                data: function () {
                  return $scope.companies;
                }
              }
            }).result.then(function(result) {
              $timeout(function () {
                get_products();
              }, 2000);
            },function() {
            });
          };
    }]);

