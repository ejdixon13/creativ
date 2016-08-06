(function () {
  'use strict';

  angular.module('mooVtrailers')
    .directive('mtRatings', [function () {
      return {
          restrict: 'E',
          scope: {
              ratingData: '=ratingData'
          },
          link: linker,
          replace: true,
          templateUrl: 'app/components/mt-ratings/mt-ratings-tpl.html'
      };

      ////////////////////////////////////////////////////
      function linker(scope, element, attrs) {

      }

    }]);
})();