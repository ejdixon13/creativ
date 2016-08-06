(function () {
  'use strict';

  angular.module('mooVtrailers')
    .directive('mtTitlePlayingInfo', [function () {
      return {
        restrict: 'E',
        controller: 'MtTitlePlayingInfoCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/mt-title-playing-info/mt-title-playing-info-tpl.html'
      };
    }])
    .controller('MtTitlePlayingInfoCtrl', ['MovieDataService', function(MovieDataService) {
        var vm = this;
        vm.movieService = MovieDataService;
    }]);
})();