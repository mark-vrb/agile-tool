angular.module('agileToolApp', 
  [
    'ngRoute', 'appRoutes',
    'NavbarCtrl','MainCtrl', 'BoardCtrl', 'AuthCtrl',
    'BoardService', 'UserService', 'StoryService', 'TaskService'
  ]);