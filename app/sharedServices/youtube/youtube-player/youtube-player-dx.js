/**
 * Created by ericjohndixon on 6/1/16.
 */
(function () {
  'use strict';

  angular.module('mooVtrailers')
    .directive('youtubePlayer', ['$window', '$rootScope', function ($window, $rootScope) {
        return {
            restrict: 'E',
            link: linker,
            template: '<section id="player"></section>'
        };

        function linker(scope, element, attr) {

            // 3. This function creates an <iframe> (and YouTube player)
            scope.loadNewVideo = loadNewVideo;
            //    after the API code downloads.

            scope.$on('play-queue', function(event, args) {
                loadNewVideo(args);
                // do what you want to do
            });

            //height: '390',
            //width: '640',
            var player;
            //$window.onYouTubeIframeAPIReady = function() {
            //    player = new YT.Player('player', {
            //        height: '550',
            //        width: '1100',
            //        videoId: 'M7lc1UVf-VE',
            //        events: {
            //            'onReady': onPlayerReady,
            //            'onStateChange': onPlayerStateChange
            //        }
            //    });
            //};

            // 4. The API will call this function when the video player is ready.
            $window.onPlayerReady = function (event) {
                //event.target.playVideo();
            };

            // 5. The API calls this function when the player's state changes.
            //    The function indicates that when playing a video (state=1),
            //    the player should play for six seconds and then stop.
            var done = false;
            $window.onPlayerStateChange = function (event) {
                if (event.data == YT.PlayerState.PLAYING && !done) {
                    setTimeout(stopVideo, 6000);
                    done = true;
                }
            };
            function stopVideo() {
                player.stopVideo();
            }

            function loadNewVideo(id) {
                player.loadVideoById(id);
                //player.loadPlaylist(['UgBBitvVHAg', 'EXeTwQWrcwY']);
            }


        }
    }])
})();
