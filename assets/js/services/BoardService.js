angular.module('BoardService', []).factory('Board', ['$http', function($http) {
  var
    getBoard
  ;

  getBoard = function (id, callback) {
    $http
      .get('/api/board/' + id + '/expanded')
      .success(function (data) {
        callback(null, data);
      })
      .error(function (data) {
        callback(data, null);
      });
  };

  return {
    getBoard : getBoard,
  };
}]);