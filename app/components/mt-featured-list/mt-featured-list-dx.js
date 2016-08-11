(function () {
    'use strict';

    angular.module('mooVtrailers')
        .directive('mtFeaturedList', [function () {
            return {
                restrict: 'E',
                controller: 'MtFeaturedListCtrl',
                controllerAs: 'mtFeaturedList',
                bindToController: true,
                templateUrl: 'app/components/mt-featured-list/mt-featured-list-tpl.html',
                scope: {
                    listChoice: '=listChoice',
                    listTitle: '@listTitle'
                }
            };
        }])
        .controller('MtFeaturedListCtrl', ['RottenTomatoesService', 'TmdbService', 'MtTheaterService', 'YouTubeService', 'MovieDataService',
            function(RottenTomatoesService, TmdbService, MtTheaterService, YouTubeService, MovieDataService) {
                var mtFeaturedList = this;
                mtFeaturedList.playQueue = playQueue;
                TmdbService.getMovieList(mtFeaturedList.listChoice)
                    .then(function (response) {
                        mtFeaturedList.featuredMovieList = response.data.results;


                        //Get Trailers
                        mtFeaturedList.featuredMovieList.forEach(function (featuredMovie) {
                            TmdbService.getMovieTrailerById(featuredMovie.id)
                                .then(function (response) {
                                    featuredMovie.trailers = response.data.results.filter(function(mediaItem) { return (mediaItem.site == 'YouTube' && mediaItem.type == 'Trailer')});
                                    featuredMovie.hasTrailer = featuredMovie.trailers.length > 0;
                                })
                        });
                    });

                function playQueue(featuredMovie) {
                    //TODO: Create movie object from tmbd object and rotten tomatoes query
                    MovieDataService.createMovieObjectFromTmdb(featuredMovie)
                        .then(function (movie) {
                            MovieDataService.playingMovie = movie;
                            MtTheaterService.theater.showTheater = true;
                            MtTheaterService.theater.searchOnTop = true;
                            YouTubeService.playVideoById(featuredMovie.trailers[0].key);
                        });

                }


            }]);
})();