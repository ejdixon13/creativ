(function () {
  'use strict';

  angular.module('mooVtrailers')
    .directive('mtPopularTitles', [function () {
      return {
        restrict: 'E',
        controller: 'MtPopularTitlesCtrl',
        controllerAs: 'mtPopularTitles',
        templateUrl: 'app/components/mt-popular-titles/mt-popular-titles-tpl.html'
      };
    }])
    .controller('MtPopularTitlesCtrl', ['RottenTomatoesService', 'TmdbService', 'MtTheaterService', 'YouTubeService',
        function(RottenTomatoesService, TmdbService, MtTheaterService, YouTubeService) {
        var mtPopularTitles = this;
        mtPopularTitles.playQueue = playQueue;
        TmdbService.getUpcomingMovies()
            .then(function (response) {
                mtPopularTitles.upcomingMovies = response.data.results;


                //Get Trailers
                mtPopularTitles.upcomingMovies.forEach(function (upcomingMovie) {
                    TmdbService.getMovieTrailerById(upcomingMovie.id)
                        .then(function (response) {
                            upcomingMovie.trailers = response.data.results.filter(function(mediaItem) { return (mediaItem.site == 'YouTube' && mediaItem.type == 'Trailer')});
                            upcomingMovie.hasTrailer = upcomingMovie.trailers.length > 0;
                        })
                });
        });

        function playQueue(trailers) {
            MtTheaterService.theater.showTheater = true;
            MtTheaterService.theater.searchOnTop = true;
            YouTubeService.playVideoById(trailers[0].key);
        }


    }]);
})();