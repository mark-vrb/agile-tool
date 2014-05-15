angular.module('BoardService', []).factory('Board', ['$http', function($http) {
  var
    getBoard, getAllBoards
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

  getAllBoards = function (limit, callback) {
    $http
      .get('/api/board')
      .success(function (data) {
        if (limit)
          callback(null, data.slice(0, limit));
        else
          callback(null, data);
      })
      .error(function (data) {
        callback(data, null);
      });
  };

  return {
    getBoard     : getBoard,
    getAllBoards : getAllBoards
  };
}]);