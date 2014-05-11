var module = angular.module('NavbarCtrl', []);

module.controller('NavbarController', function($rootScope, $scope, $location, User){
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
        $location.url('/auth');
      else
        alert(err);
    });
  };

  $scope.goToAuthPage = function () {
    $location.url('/auth');
  };
});