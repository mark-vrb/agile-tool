angular.module('BoardService', []).factory('Board', ['$http', function($http) {
  return {
    get : function() {
      return $http.get('/api/stories');
    }
  }
}]);