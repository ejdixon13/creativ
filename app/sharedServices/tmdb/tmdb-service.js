/**
 * Created by ericjohndixon on 6/16/16.
 */
(function () {
    'use strict';

    angular
        .module('mooVtrailers.apiServices')
        .factory('TmdbService', TmdbService);
    TmdbService.$inject = ['HttpHelper', '$q', '$timeout'];

    //FACTORY METHOD
    function TmdbService(HttpHelper, $q, $timeout) {
        return {
            getMoviesByQuery: getMoviesByQuery,
            getMovieById: getMovieById,
            getMovieByIMDBId: getMovieByIMDBId,
            getMovieTrailerById: getMovieTrailerById,
            getUpcomingMovies: getUpcomingMovies,
            getMovieList: getMovieList
        };
        /////////////////////////////////////////////////////////
        function getMoviesByQuery(query) {
            return HttpHelper.get('http://api.themoviedb.org/3/search/movie?api_key=98a62afbdaaba0e0968f74212a9f7561&include_adult=false&query=' + query);
        }

        function getMovieById(id) {

        }

        function getMovieByIMDBId(imdbId) {
            return HttpHelper.get('https://api.themoviedb.org/3/find/tt' + imdbId + '?external_source=imdb_id&api_key=98a62afbdaaba0e0968f74212a9f7561');
        }

        function getMovieTrailerById(id) {
            //TODO: See if i can get around request limit
            return HttpHelper.get('https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=98a62afbdaaba0e0968f74212a9f7561&adult=false');
        }

        function getUpcomingMovies() {
            return HttpHelper.get('https://api.themoviedb.org/3/movie/upcoming?api_key=98a62afbdaaba0e0968f74212a9f7561&adult=false');
        }

        function getMovieList(listChoice) {
            if(listChoice) {
                return HttpHelper.get('https://api.themoviedb.org/3/movie/' + listChoice +'?api_key=98a62afbdaaba0e0968f74212a9f7561&adult=false');
            }
        }
    }
})();