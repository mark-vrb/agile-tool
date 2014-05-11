angular.module('AuthCtrl', [])
  
  .controller('AuthController', function($rootScope, $scope, $location, User) {
    $scope.auth = {};
    $scope.auth.user = {};
    $scope.auth.isLoginForm = true;
    $scope.auth.current = User.getCurrent();

    $scope.switchAuthType = function () {
      $scope.auth.isLoginForm = !$scope.auth.isLoginForm;
    };

    $scope.submitLoginForm = function () {
      User.login($scope.auth.user, function (err, data) {
        $location.url('/');
      });
    };

    $scope.submitSignupForm = function () {
      $location.url('/');
    };
  });