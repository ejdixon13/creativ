(function () {
  'use strict';

  angular.module('mooVtrailers.core')
    .directive('mtMessage', ['MtMessageService', function (MtMessageService) {
      return {
          restrict: 'E',
          link: linker,
          template: '<div class="mt-message" ng-class="{\'mt-message-show\' : messageService.message}">{{messageService.message}}</div>'
      };

      ////////////////////////////////////////////////////
      function linker(scope, element, attrs) {
        scope.messageService = MtMessageService;
      }

    }]);
})();