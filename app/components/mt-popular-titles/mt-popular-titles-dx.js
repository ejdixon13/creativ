(function () {
  'use strict';

  angular.module('mooVtrailers')
    .directive('mtPopularTitles', [function () {
      return {
        restrict: 'E',
        controller: 'MtPopularTitlesCtrl',
        controllerAs: 'mtPopularTitles',
        templateUrl: 'app/components/mt-popular-titles/mt-popular-titles-tpl.html'
      };
    }])
    .controller('MtPopularTitlesCtrl', ['RottenTomatoesService', function(RottenTomatoesService) {
        var mtPopularTitles = this;
        RottenTomatoesService.getUpcomingMovies().then(function(response){
            mtPopularTitles.upcomingMovies = response.data.movies;
        });
    }]);
})();