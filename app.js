/**
 * Created by ericjohndixon on 5/26/16.
 */
angular.module('mooVtrailers', [
        'angular-http-helper',
        'ngAnimate',
        'ngMaterial',
        'ngAria',
        'ngMockE2E',
        'mooVtrailers.core',
        'mooVtrailers.apiServices'
    ])
    .run(['HttpBackendDataService', function (HttpBackendDataService) {
        //HTTP MOCKED BACKEND
        HttpBackendDataService.setupBackend(false);

        //IFRAME PLAYER SETUP
        var tag = document.createElement('script');
        tag.src = "http://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }]);
angular.module('mooVtrailers.core', []);
angular.module('mooVtrailers.apiServices', []);