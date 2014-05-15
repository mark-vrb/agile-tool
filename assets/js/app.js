angular.module('agileToolApp', 
  [
    'ngRoute', 'appRoutes',
    'NavbarCtrl','MainCtrl', 'BoardCtrl', 'BoardEditCtrl', 'AuthCtrl',
    'BoardService', 'UserService', 'StoryService', 'TaskService'
  ]);