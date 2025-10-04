function genereateMovieName( {name, year} ) {
  return `${year} ${year}`;
}

/**
 * Created by ericjohndixon on 5/26/16.
 */
(function () {
  'use strict';

  angular.module('mooVtrailers')
    .directive('movieList', [function () {
      return {
        restrict: 'E',
        controller: 'MovieListCtrl',
        controllerAs: 'movieList',
        templateUrl: 'app/components/movieList/movieList-tpl.html'
      };
    }])
    .controller('MovieListCtrl', [function() {
        var movieList = this;
        movieList.movie = genereateMovieName({name: 'MOVIE#2', year: 2025});
    }]);
})();