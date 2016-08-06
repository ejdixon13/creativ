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
        .controller('MtFeaturedListCtrl', ['RottenTomatoesService', 'TmdbService', 'MtTheaterService', 'YouTubeService',
            function(RottenTomatoesService, TmdbService, MtTheaterService, YouTubeService) {
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

                function playQueue(trailers) {
                    MtTheaterService.theater.showTheater = true;
                    MtTheaterService.theater.searchOnTop = true;
                    YouTubeService.playVideoById(trailers[0].key);
                }


            }]);
})();