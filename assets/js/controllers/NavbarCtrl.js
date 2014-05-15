var module = angular.module('NavbarCtrl', []);

module.controller('NavbarController', function($rootScope, $scope, $location, User, Board){
  $scope.boards = [];

  $scope.isAuthenticated = function () {
    return User.getCurrent() != null;
  };

  $scope.getFullName = function () {
    return User.getCurrent().firstName + ' ' + User.getCurrent().lastName;
  };

  $scope.getAvatar = function () {
    return User.getCurrent().avatar;
  };

  $scope.logout = function () {
    User.logout(function (err) {
      if (!err)
      {
        $location.url('/auth');
        $scope.getBoards();
      }
      else
        alert(err);
    });
  };

  $scope.goToAuthPage = function () {
    $location.url('/auth');
  };

  $scope.getBoards = function () {
    Board.getAllBoards(10, function (err, data) {
      $scope.boards = data;
    });
  };

  $scope.getBoards();
});