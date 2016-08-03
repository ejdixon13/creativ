(function () {
    'use strict';

    angular
        .module('mooVtrailers.core')
        .factory('MtMessageService', MtMessageService);
    MtMessageService.$inject = ['$timeout'];
    
    //FACTORY METHOD
    function MtMessageService($timeout) {
        return {
            showMessage: showMessage,
            message : ''
        };
        /////////////////////////////////////////////////////////

        function showMessage(message, duration) {
            this.message = message;

            var resetMessage = function() {
                this.message = '';
            };

            $timeout(resetMessage.bind(this), duration);
        }
    }
})();