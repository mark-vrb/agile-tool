angular.module('UserService', []).factory('User', ['$http', '$cookies', function($http, $cookies) {
  var
    user,
    saveUserData, deleteUserData, fillUserData,
    login, logout, signup, 
    getEmail, getFirstName, getLastName, getToken
  ;

  // private methods
  saveUserData = function(userData) {
    $cookies.user = user = userData;
  };

  deleteUserData = function() {
    $cookies.user = user = null;
  };

  fillUserData = function() {
    user = $cookies.user;
  };

  // public methods
  login = function (loginUserObject) {
    $http.post('/api/login', loginUserObject)
      .success(function(data) {
        saveUserData(data);
      });
  };

  signup = function (newUserObject) {
    $http.post('/api/signup', newUserObject)
      .success(function(data) {
        saveUserData(data);
      });
  };

  logout = function () {
    $http.post('/api/logout', {token: token})
      .success(function() {
        deleteUserData();
      });
  };

  getEmail = function () {
    if (user) return user.email;
  };
  getFirstName = function () {
    if (user) return user.firstName;
  };
  getLastName = function () {
    if (user) return user.lastName;
  };
  getToken = function () {
    if (user) return user.token;
  };

  // forming return object
  return {
    login        : login;
    signup       : signup;
    logout       : logout;
    getEmail     : getEmail;
    getToken     : getToken;
    getFirstName : getFirstName;
    getLastName  : getLastName
  };
}]);