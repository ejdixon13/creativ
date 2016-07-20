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
            getMoviesByQuery : getMoviesByQuery
        };
        /////////////////////////////////////////////////////////
        function getMoviesByQuery(query) {
            return HttpHelper.get('http://api.themoviedb.org/3/search/movie?api_key=98a62afbdaaba0e0968f74212a9f7561&&include_adult=falsequery=' + query);
        }
    }
})();