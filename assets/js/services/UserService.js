angular.module('UserService', []).factory('User', ['$http', function($http) {
  var
    user,
    getCurrent, login, signup, logout
  ;

  $http.get('/api/user/getAuthenticated').success(function(data) {
    user = data;
  });

  getCurrent = function () {
    return user ? angular.copy(user) : null;
  };

  login = function (userData, callback) {
    $http
      .post('api/auth/login', {
        username : userData.email, 
        password : userData.password
      })
      .success(function (data) {
        user = data;
        callback(null, user);
      })
      .error(function (data) {
        callback(data, null)
      });
  };

  signup = function (userData, callback) {
    $http
      .post('api/user', userData)
      .success(function (data) {
        login(userData, callback);
      })
      .error(function (data) {
        callback(data, null);
      });
  };

  logout = function (callback) {
    $http
      .get('api/auth/logout')
      .success(function () {
        user = null;
        callback(null);
      })
      .error(function (data) {
        callback(data);
      });
  };

  return {
    getCurrent : getCurrent,
    login      : login,
    signup     : signup,
    logout     : logout
  };
}]);