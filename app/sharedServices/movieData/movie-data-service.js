/**
 * Created by ericjohndixon on 7/1/16.
 */
(function () {
    'use strict';

    angular
        .module('mooVtrailers.core')
        .factory('MovieDataService', movieDataService);
    movieDataService.$inject = ['RottenTomatoesService', 'TmdbService'];

    //FACTORY METHOD
    function movieDataService(RottenTomatoesService, TmdbService) {
        return {
            getMoviesByQuery : getMoviesByQuery
        };
        /////////////////////////////////////////////////////////
        function getMoviesByQuery(searchString) {

            return RottenTomatoesService.getMoviesByQuery(searchString).then(getTMDBMovieInfo);

            function getTMDBMovieInfo(response) {
                response.data.movies.forEach(function(movie){
                    if (movie.alternate_ids) { // then IMDB id exists
                        TmdbService.getMovieByIMDBId(movie.alternate_ids.imdb).then(function(response) {
                            if (response.data.movie_results.length > 0) {
                                getTMDBMovieParts(response.data.movie_results[0]);
                            } else {
                                if(movie.year >= 2016) { //sometimes the imdb info hasn't been associated yet
                                    TmdbService.getMoviesByQuery(movie.title).then(function(response) {
                                        var tmdbResult = (response.data.results) ? response.data.results[0] : null;
                                        if(movie.year == parseInt(tmdbResult.release_date.substr(0, tmdbResult.release_date.indexOf('-'))) &&
                                            tmdbResult.title == movie.title ) {
                                            getTMDBMovieParts(tmdbResult);
                                        }

                                    })
                                }
                            }
                        })
                    }
                    else {
                        movie.hasTrailer = false;
                    }

                    function getTMDBMovieParts(tmdbResult) {
                        getTMDBMoviePosters(tmdbResult);
                        getTMDBMovieTrailers(tmdbResult.id);
                        getTMDBMovieOverview(tmdbResult);
                    }
                    function getTMDBMoviePosters(tmdbMovieItem) {
                        movie.highResPoster = tmdbMovieItem.poster_path;
                        movie.backdrop = tmdbMovieItem.backdrop_path;
                    }

                    function getTMDBMovieTrailers(id) {
                        TmdbService.getMovieTrailerById(id).then(function(response){
                            movie.trailers = response.data.results.filter(function(mediaItem) { return (mediaItem.site == 'YouTube' && mediaItem.type == 'Trailer')});
                            movie.hasTrailer = movie.trailers.length > 0;
                        });
                    }
                    function getTMDBMovieOverview(tmdbMovieItem) {
                        movie.synopsis = tmdbMovieItem.overview;
                    }
                });

                return response;
            }

        }
    }
})();