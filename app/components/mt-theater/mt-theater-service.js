/**
 * Created by ericjohndixon on 6/2/16.
 */
(function () {
    'use strict';

    angular
        .module('mooVtrailers')
        .factory('MtTheaterService', MtTheaterService);
    //MtTheaterService.$inject = [''];

    //FACTORY METHOD
    function MtTheaterService() {
        return {
            theater : {
                showOverlay: false,
                showTheater: false,
                showPlayer: false,
                noTrailerAvailable: false,
                searchOnTop: false,
                showMobileSearch: false
            }
        }
    }
})();