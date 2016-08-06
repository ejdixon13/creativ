(function () {
  'use strict';

  angular.module('mooVtrailers')
    .directive('mtPoster', [function () {
      return {
          restrict: 'E',
          link: linker,
          templateUrl: 'app/components/mt-poster/mt-poster-tpl.html',
          scope: {
              width  : '@pWidth',
              height : '@pHeight',
              pSrc    : '@pSrc',
              hasTrailer: '=hasTrailer',
              hidePlayButton: '@hidePlayButton',
              elevation: '=elevation'
          }
      };

      ////////////////////////////////////////////////////
      function linker(scope, element, attrs) {

      }

    }]);
})();