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
        var selectedMovie = {};
        return {
            getMoviesByQuery : getMoviesByQuery,
            getUpcomingMovies: getUpcomingMovies,
            createMovieObjectFromTmdb : createMovieObjectFromTmdb,
            playingMovie: null,
            selectedMovie: null
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

            TmdbService.getMoviesByQueryAndYear(movie.title, movie.year).then(function (response) {
                var tmdbResult = (response.data.results) ? response.data.results[0] : null;
                if (tmdbResult.title == movie.title) {
                    getTMDBMovieParts(tmdbResult);
                }

            });

            //if (movie.alternate_ids) { // then IMDB id exists
            //    TmdbService.getMovieByIMDBId(movie.alternate_ids.imdb).then(function (response) {
            //        if (response.data.movie_results.length > 0) {
            //            getTMDBMovieParts(response.data.movie_results[0]);
            //        } else {
            //            if (movie.year >= 2016) { //sometimes the imdb info hasn't been associated yet
            //                TmdbService.getMoviesByQuery(movie.title).then(function (response) {
            //                    var tmdbResult = (response.data.results) ? response.data.results[0] : null;
            //                    if (movie.year == parseInt(tmdbResult.release_date.substr(0, tmdbResult.release_date.indexOf('-'))) &&
            //                        tmdbResult.title == movie.title) {
            //                        getTMDBMovieParts(tmdbResult);
            //                    }
            //
            //                })
            //            }
            //        }
            //    });
            //}
            //else {
            //    movie.hasTrailer = false;
            //}

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

        /**
         * Create Movie Object from TMDB object
         */
        function createMovieObjectFromTmdb(tmdbObject) {
            var movieReleaseYear = tmdbObject.release_date.split('-')[0];
            var movieObject = {
                title: tmdbObject.original_title,
                year: movieReleaseYear,
                synopsis: tmdbObject.overview,
                mpaa_rating: null,
                hasTrailer: tmdbObject.hasTrailer,
                highResPoster: tmdbObject.poster_path,
                backdrop: tmdbObject.backdrop_path,
                ratings: null
            };

            return RottenTomatoesService.getMoviesByQuery(movieObject.title)
                .then(addRatingsToObject);

            function addRatingsToObject(response) {
                var titleCompare = movieObject.title.replace(/[^0-9a-z]/gi, '').toLowerCase();
                angular.forEach(response.data.movies, function(movie) {
                  if (movie.title.replace(/[^0-9a-z]/gi, '').toLowerCase() == titleCompare && movie.year == movieReleaseYear) {
                      movieObject.ratings = movie.ratings;
                      movieObject.mpaa_rating = movie.mpaa_rating;
                  }
                });
                return movieObject;
            }

        }

        /**
         * Get Selected Movie
         */
        function getSelectedMovie() {
            return selectedMovie;
        }

        /**
         * Set Selected Movie
         */
        function setSelectedMovie(movie) {
            selectedMovie = movie;
        }
    }
})();