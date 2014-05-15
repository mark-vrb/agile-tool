angular
  .module('appRoutes', [])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl : 'views/main.html',
          controller : 'MainController'
        })
        .when('/board/create', {
          templateUrl : '../views/boardEdit.html',
          controller : 'BoardEditController'
        })
        .when('/board/:id/edit', {
          templateUrl : '/views/boardEdit.html',
          controller : 'BoardEditController'
        })
        .when('/board/:id', {
          templateUrl : '../views/board.html',
          controller : 'BoardController'
        })
        .when('/auth', {
          templateUrl : 'views/auth.html',
          controller : 'AuthController'
        })
        .otherwise({
          redirectTo: '/'
        });

      $locationProvider.html5Mode(true);
    }]);