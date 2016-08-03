/**
 * Created by ericjohndixon on 7/1/16.
 */
(function () {
    'use strict';

    angular
        .module('mooVtrailers.core')
        .factory('MovieDataService', movieDataService);
    movieDataService.$inject = ['RottenTomatoesService', 'TmdbService', '$q'];

    //FACTORY METHOD
    function movieDataService(RottenTomatoesService, TmdbService, $q) {
        return {
            getMoviesByQuery : getMoviesByQuery,
            getUpcomingMovies: getUpcomingMovies
        };
        /////////////////////////////////////////////////////////
        function getMoviesByQuery(searchString) {
            return RottenTomatoesService.getMoviesByQuery(searchString).then(getAllMoviesTMDBInfo);

            function getAllMoviesTMDBInfo(response) {
                if (response.data.movies) {
                    response.data.movies.forEach(function (movie) {
                        getTMDBMovieInfo(movie);
                    });
                }
                return response;
            }
        }

        //TODO: Figure out why this doesn't work. I am guessing that I hit the Rotten Tomatoes request limit
        function getUpcomingMovies() {
            return RottenTomatoesService.getUpcomingMovies().then(getAllMoviesTMDBInfo);
            function getAllMoviesTMDBInfo(response) {
                var movies = [];
                if (response.data.movies) {
                    var promises = [];
                    response.data.movies.forEach(function (movie) {
                        promises.push(RottenTomatoesService.getMovieById(movie.id).then(function(movieObject) {
                            movies.push(getTMDBMovieInfo(movieObject));
                        }));
                    });
                }
                return $q.all(promises).then(function(){
                    return movies;
                });
            }
        }

        function getTMDBMovieInfo(movie) {
            if (movie.alternate_ids) { // then IMDB id exists
                TmdbService.getMovieByIMDBId(movie.alternate_ids.imdb).then(function (response) {
                    if (response.data.movie_results.length > 0) {
                        getTMDBMovieParts(response.data.movie_results[0]);
                    } else {
                        if (movie.year >= 2016) { //sometimes the imdb info hasn't been associated yet
                            TmdbService.getMoviesByQuery(movie.title).then(function (response) {
                                var tmdbResult = (response.data.results) ? response.data.results[0] : null;
                                if (movie.year == parseInt(tmdbResult.release_date.substr(0, tmdbResult.release_date.indexOf('-'))) &&
                                    tmdbResult.title == movie.title) {
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
                TmdbService.getMovieTrailerById(id).then(function (response) {
                    movie.trailers = response.data.results.filter(function (mediaItem) {
                        return (mediaItem.site == 'YouTube' && mediaItem.type == 'Trailer')
                    });
                    movie.hasTrailer = movie.trailers.length > 0;
                });
            }

            function getTMDBMovieOverview(tmdbMovieItem) {
                movie.synopsis = tmdbMovieItem.overview;
            }

            return movie;
        }
    }
})();