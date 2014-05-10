angular
  .module('appRoutes', [])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl : 'views/main.html',
          controller : 'MainController'
        })
        .when('/board', {
          templateUrl : 'views/board.html',
          controller : 'BoardController'
        })
        .otherwise({
          redirectTo: '/'
        });

      $locationProvider.html5Mode(true);
    }]);