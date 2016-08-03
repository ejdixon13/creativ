/**
 * Created by ericjohndixon on 6/2/16.
 */
(function () {
    'use strict';

    angular
        .module('mooVtrailers.apiServices')
        .factory('RottenTomatoesService', RottenTomatoesService);
    RottenTomatoesService.$inject = ['HttpHelper'];
    
    //FACTORY METHOD
    function RottenTomatoesService(HttpHelper) {
        return {
            getMoviesByQuery : getMoviesByQuery,
            getMovieById: getMovieById,
            getUpcomingMovies: getUpcomingMovies
        };
        /////////////////////////////////////////////////////////    


        function getMoviesByQuery(queryString) {
            return HttpHelper.jsonp('http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=u89xcs2pkzy49hwmf9f43j8y&q=' + queryString + '&page_limit=4&callback=JSON_CALLBACK', true, 'movie-query');
        }

        function getMovieById(id) {
            return HttpHelper.jsonp('http://api.rottentomatoes.com/api/public/v1.0/movies/' + id + '.json?apikey=u89xcs2pkzy49hwmf9f43j8y&callback=JSON_CALLBACK', true, 'movie-query');
        }

        function getUpcomingMovies() {
            return HttpHelper.jsonp('http://api.rottentomatoes.com/api/public/v1.0/lists/movies/upcoming.json?apikey=u89xcs2pkzy49hwmf9f43j8y&callback=JSON_CALLBACK', true, 'upcoming-movies');
        }
    }
})();