angular.module('BoardCtrl', [])

  .controller('BoardController', function ($rootScope, $scope, $routeParams, Board) {
    $scope.board = {};
    $scope.error = null;

    Board.getBoard($routeParams.id, function (err, data) {
      $scope.error = err;
      $scope.board = data;
    });

  });