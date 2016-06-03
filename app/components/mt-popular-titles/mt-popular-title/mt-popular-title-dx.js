/**
 * Created by ericjohndixon on 6/2/16.
 */
(function () {
  'use strict';

  angular.module('mooVtrailers')
    .directive('mtPopularTitle', ['YouTubeService', 'MtTheaterService', function (YouTubeService, MtTheaterService) {
      return {
          restrict: 'E',
          link: linker,
          scope: {
              upcomingMovie: '=upcomingMovie'
          },
          templateUrl: 'app/components/mt-popular-titles/mt-popular-title/mt-popular-title-tpl.html'
      };

      ////////////////////////////////////////////////////
      function linker(scope, element, attrs) {
          scope.playTrailer = function() {
              YouTubeService.getYouTubeIdByMovieItem(scope.upcomingMovie).then(function(movieId){
                  if(movieId != 'No trailer found') {
                      MtTheaterService.theater.searchOnTop = true;
                      MtTheaterService.theater.showTheater = true;
                      YouTubeService.playVideoById(movieId);
                  }
              });
          }
      }

    }]);
})();