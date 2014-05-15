angular.module('BoardService', []).factory('Board', ['$http', function($http) {
  var
    getBoard, getAllBoards, createBoard, updateBoard
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

  createBoard = function (board, callback) {
    $http
      .post('/api/board', board)
      .success(function (data) {
        callback(null, data);
      })
      .error(function (data) {
        callback(data, null);
      });
  };

  updateBoard = function (board, callback) {
    $http
      .put('/api/board/' + board.id, board)
      .success(function (data) {
        callback(null, data);
      })
      .error(function (data) {
        callback(data, null);
      });
  };

  return {
    getBoard     : getBoard,
    getAllBoards : getAllBoards,
    createBoard  : createBoard,
    updateBoard  : updateBoard
  };
}]);