(function () {
  'use strict';

  angular.module('mooVtrailers')
    .directive('mtBody', [function () {
      return {
        restrict: 'E',
        controller: 'MtBodyCtrl',
        controllerAs: 'mtBody',
        templateUrl: 'app/components/mt-body/mt-body-tpl.html'
      };
    }])
    .controller('MtBodyCtrl', ['Constants', '$scope', function(Constants, $scope) {
        $scope.constants = Constants;
        var mtBody = this;

    }]);
})();