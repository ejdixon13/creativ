(function () {
  'use strict';

  angular.module('mooVtrailers')
    .directive('mtHeader', [function () {
      return {
        restrict: 'E',
        controller: 'MtHeaderCtrl',
        controllerAs: 'mtHeader',
        templateUrl: 'app/components/mt-header/mt-header-tpl.html'
      };
    }])
    .controller('MtHeaderCtrl', [ 'MtTheaterService', '$scope', function(MtTheaterService, $scope) {
        var mtHeader = this;
        $scope.theater = MtTheaterService.theater;
        //$scope.openLeftMenu = function() {
        //    $mdSidenav('left').toggle();
        //}
    }]);
})();
