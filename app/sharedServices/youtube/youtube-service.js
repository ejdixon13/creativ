/**
 * Created by ericjohndixon on 6/2/16.
 */
(function () {
    'use strict';

    angular
        .module('mooVtrailers.apiServices')
        .factory('YouTubeService', YouTubeService);
    YouTubeService.$inject = ['HttpHelper', '$window', 'MtTheaterService'];

    //FACTORY METHOD
    function YouTubeService(HttpHelper, $window, MtTheaterService) {
        var player;
        init();
        return {
            getYouTubeByQuery : getYouTubeByQuery,
            getYouTubeIdByMovieItem: getYouTubeIdByMovieItem,
            playVideoById : playVideoById
        };
        /////////////////////////////////////////////////////////
        //TODO: Remove related videos after trailer finishes
        function getYouTubeByQuery(queryString) {
            return HttpHelper.jsonp('https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + queryString  + '&key=AIzaSyCcE9Fjlo5d-4gpRJkZ97a7KFB2k8pvcaM&callback=JSON_CALLBACK', true, 'youtube-query');
        }

        function getYouTubeIdByMovieItem(movie) {
            var queryString = movie.title + ' (' + movie.year + ') trailer';
            return getYouTubeByQuery(queryString).then(function(response){
                return extractKey(movie, response);
            });
        }

        function extractKey(movie, response) {
            //Look at all results
            var youtubeItems = response.data.items;
            for(var i = 0; i < youtubeItems.length; i++) {
                var titleCompareString = youtubeItems[i].snippet.title.toLowerCase();
                if(titleCompareString.includes(movie.title.toLowerCase()) && titleCompareString.includes(movie.year.toString().toLowerCase()) && titleCompareString.includes('trailer')){
                    return youtubeItems[i].id.videoId;
                }
            }
            return 'No trailer found';
        }

        function playVideoById(id) {
            MtTheaterService.theater.showPlayer = true;
            player.loadVideoById(id);
        }

        /*****************************************************************************************************
         * INIT
         *****************************************************************************************************/
         function init() {
            //height: '550',
            //    width: '1100'
            $window.onYouTubeIframeAPIReady = function() {
                player = new YT.Player('player', {
                    height: '390',
                    width: '640',
                    playerVars: {rel: 0}
                });
            };
        }
        //"items": [
        //    {
        //        "kind": "youtube#searchResult",
        //        "etag": "\"mie-I9wWQF7ndS7wC10DLBkzLlg/-UURu2szaOIX4O6Uq1IxiM5p9JQ\"",
        //        "id": {
        //            "kind": "youtube#video",
        //            "videoId": "GokKUqLcvD8"
        //        },
        //        "snippet": {
        //            "publishedAt": "2011-12-19T18:17:09.000Z",
        //            "channelId": "UCkR0GY0ue02aMyM-oxwgg9g",
        //            "title": "The Dark Knight Rises Official Movie Trailer Christian Bale, Batman Movie (2012) HD",
        //            "description": "Subscribe to TRAILERS: http://bit.ly/sxaw6h Subscribe to COMING SOON: http://bit.ly/H2vZUn Like us on FACEBOOK: http://goo.gl/dHs73 Follow us on ...",
        //            "thumbnails": {
        //                "default": {
        //                    "url": "https://i.ytimg.com/vi/GokKUqLcvD8/default.jpg",
        //                    "width": 120,
        //                    "height": 90
        //                },
        //                "medium": {
        //                    "url": "https://i.ytimg.com/vi/GokKUqLcvD8/mqdefault.jpg",
        //                    "width": 320,
        //                    "height": 180
        //                },
        //                "high": {
        //                    "url": "https://i.ytimg.com/vi/GokKUqLcvD8/hqdefault.jpg",
        //                    "width": 480,
        //                    "height": 360
        //                }
        //            },
        //            "channelTitle": "Movieclips Coming Soon",
        //            "liveBroadcastContent": "none"
        //        }
        //    },
    }
})();