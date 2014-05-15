angular.module('ProfileCtrl', [])

  .controller('ProfileController', function ($rootScope, $scope, Board, User, Story, Task) {
    $scope.user = User.getCurrent();
  });