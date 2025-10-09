/**
 * Created by ericjohndixon on 5/26/16.
 */
angular.module('mooVtrailers', [
        'angular-http-helper',
        'ngAnimate',
        'ngMaterial',
        'ngAria',
        'mooVtrailers.core',
        'mooVtrailers.apiServices'
    ])
    .run(['CacheService', '$log', function (CacheService, $log) {
        //HTTP MOCKED BACKEND
        //HttpBackendDataService.setupBackend(false);

        // GOOD PRACTICE: Initialize cache service on app start
        CacheService.clear();

        // BAD PRACTICE: Console.log in production code
        console.log('mooVtrailers app started!');

        // GOOD PRACTICE: Using $log service for logging
        $log.info('Cache service initialized');

        //IFRAME PLAYER SETUP
        var tag = document.createElement('script');
        // BAD PRACTICE: Using http instead of https
        tag.src = "http://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // BAD PRACTICE: Adding to window object pollutes global scope
        window.APP_VERSION = '1.0.0-0';
        window.DEBUG = true;
    }]);
angular.module('mooVtrailers.core', []);
angular.module('mooVtrailers.apiServices', []);