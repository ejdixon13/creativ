(function () {
  'use strict';

  angular.module('mooVtrailers')
    .directive('movieSearchItem', ['$rootScope', 'YouTubeService', 'MtTheaterService', 'MtMessageService', 'MovieDataService',
        function ($rootScope, YouTubeService, MtTheaterService, MtMessageService, MovieDataService ) {
      return {
          restrict: 'E',
          link: linker,
          templateUrl: 'app/components/movie-search-item/movie-search-item-tpl.html',
          require: '^mtSearchBar',
          scope: {
              movie: '=movie'
          }
      };

      ////////////////////////////////////////////////////
      function linker(scope, element, attrs, ctrl) {
          scope.playQueue = function playQueue() {
              ctrl.searchString = '';
              MtTheaterService.theater.showTheater = true;
              MovieDataService.playingMovie = angular.copy(scope.movie);
              YouTubeService.playVideoById(scope.movie.trailers[0].key);
          };

          scope.showNoTrailerMessage = function() {
              MtMessageService.showMessage('No Trailer Available', 3000);
          }

      }

    }]);
})();