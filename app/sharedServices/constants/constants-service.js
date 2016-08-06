(function () {
    'use strict';

    angular
        .module('mooVtrailers.core')
        .factory('Constants', Constants);
    //Constants.$inject = [''];

    //FACTORY METHOD
    function Constants() {
        return Object.create(Object.prototype, {
            //MOVIE LIST OPTIONS
            MOVIE_LIST_UPCOMING :   { writable: false, configurable: false, value: 'upcoming' },
            MOVIE_LIST_NOW_PLAYING: { writable: false, configurable: false, value: 'now_playing' },
            MOVIE_LIST_TOP_RATED:   { writable: false, configurable: false, value: 'top_rated' },
            MOVIE_LIST_POPULAR:     { writable: false, configurable: false, value: 'popular' }

        });
    }
})();