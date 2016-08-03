/**
 * Created by ericjohndixon on 6/16/16.
 */
(function () {
    'use strict';

    angular
        .module('mooVtrailers.apiServices')
        .factory('TmdbService', TmdbService);
    TmdbService.$inject = ['HttpHelper'];

    //FACTORY METHOD
    function TmdbService(HttpHelper) {
        return {
            getMoviesByQuery: getMoviesByQuery,
            getMovieByIMDBId: getMovieByIMDBId,
            getMovieTrailerById: getMovieTrailerById,
            getUpcomingMovies: getUpcomingMovies
        };
        /////////////////////////////////////////////////////////
        function getMoviesByQuery(query) {
            return HttpHelper.get('http://api.themoviedb.org/3/search/movie?api_key=98a62afbdaaba0e0968f74212a9f7561&include_adult=false&query=' + query);
        }

        function getMovieByIMDBId(imdbId) {
            return HttpHelper.get('https://api.themoviedb.org/3/find/tt' + imdbId + '?external_source=imdb_id&api_key=98a62afbdaaba0e0968f74212a9f7561');
        }

        function getMovieTrailerById(id) {
            return HttpHelper.get('https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=98a62afbdaaba0e0968f74212a9f7561&adult=false');
        }

        function getUpcomingMovies() {
            return HttpHelper.get('https://api.themoviedb.org/3/movie/upcoming?api_key=98a62afbdaaba0e0968f74212a9f7561&adult=false');
        }
    }
})();