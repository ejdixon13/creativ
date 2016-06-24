/**
 * Created by ericjohndixon on 6/1/16.
 */
(function () {
  'use strict';

  angular.module('mooVtrailers')
    .directive('mtSearchBar', [function () {
        return {
            restrict: 'E',
            controller: 'MtSearchBarCtrl',
            controllerAs: 'mtSearchBar',
            bindToController: true,
            templateUrl: 'app/components/mt-search-bar/mt-search-bar-tpl.html'
        };
    }])
    .controller('MtSearchBarCtrl', ['RottenTomatoesService', '$scope', function(RottenTomatoesService, $scope) {
        var mtSearchBar = this;
        mtSearchBar.searchString = '';
        mtSearchBar.search = search;
        mtSearchBar.hideResults = false;

        function search() {
            RottenTomatoesService.getMoviesByQuery(mtSearchBar.searchString).then(function(response){
                mtSearchBar.movies = response.data.movies;
            });
        }

    }]);
})();


