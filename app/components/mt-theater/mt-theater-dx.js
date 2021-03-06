(function () {
  'use strict';

  angular.module('mooVtrailers')
    .directive('mtTheater', [function () {
      return {
        restrict: 'E',
        controller: 'MtTheaterCtrl',
        controllerAs: 'mtTheater',
        templateUrl: 'app/components/mt-theater/mt-theater-tpl.html'
      };
    }])
    .controller('MtTheaterCtrl', ['$scope', 'MtTheaterService', '$mdBottomSheet', function($scope, MtTheaterService, $mdBottomSheet) {
        var mtTheater = this;
        mtTheater.theater = MtTheaterService.theater;
        $scope.$on('play-queue', function(event, args) {
            mtTheater.thing = 'thing';
            // do what you want to do
        });

        $scope.openBottomSheet = function() {
            $mdBottomSheet.show({
                template: '<md-bottom-sheet>Hello!</md-bottom-sheet>'
            });
        };
    }]);
})();