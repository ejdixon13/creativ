(function () {
  'use strict';

  angular.module('mooVtrailers')
    .directive('movieSearchItem', ['$rootScope', 'YouTubeService', 'MtTheaterService', function ($rootScope, YouTubeService, MtTheaterService ) {
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
              YouTubeService.playVideoById(scope.movie.trailers[0].key);

              //YouTubeService.getYouTubeIdByMovieItem(scope.movie).then(function(movieId){
              //    if(movieId != 'No trailer found') {
              //        ctrl.searchString = '';
              //        MtTheaterService.theater.showTheater = true;
              //        YouTubeService.playVideoById(movieId);
              //    }
              //});
              //$rootScope.$broadcast('play-queue', movieKey);
          };

      }

    }]);
})();