(function () {
  'use strict';

  angular.module('mooVtrailers')
    .directive('mtLogo', [function () {
        //TODO: Adjust logo size to be responsive
      return {
          restrict: 'E',
          scope: {
              isMinimalVersion: '=isMinimalVersion'
          },
          link: linker,
          template: '<span class="logo logo__base-text"><span ng-show="!isMinimalVersion">moo</span> <span class="logo__accent-text">V</span> <span ng-show="!isMinimalVersion">trailers</span></span>'
      };

        function linker() {

        }
    }])
})();
