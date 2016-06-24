/**
 * Created by ericjohndixon on 6/10/16.
 */
(function () {
  'use strict';

  angular.module('mooVtrailers.core')
    .directive('offElementClick', ['$document', function ($document) {
      return {
        restrict: 'A',
        link: linker
      };

      ////////////////////////////////////////////////////
      function linker($scope, $element, $attributes) {
          var scopeExpression = $attributes.offElementClick,
              onDocumentClick = function (event) {
                  var isChild = jQuery($element).find(event.target).length > 0;

                  if (!isChild) {
                      $scope.$apply(scopeExpression);
                  }
              };

          $document.on("click", onDocumentClick);

          $element.on('$destroy', function () {
              $document.off("click", onDocumentClick);
          });

      }

    }]);
})();