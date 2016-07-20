(function () {
  'use strict';

  angular.module('mooVtrailers')
    .directive('mtLogo', [function () {
      return {
        restrict: 'E',
        link: linker,
        template: '<span class="logo logo__base-text">moo <span class="logo__accent-text">V</span> trailers</span>'
      };

        function linker() {

        }
    }])
})();
