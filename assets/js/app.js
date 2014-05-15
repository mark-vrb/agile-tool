angular.module('agileToolApp', 
  [
    'ngRoute', 'appRoutes',
    'NavbarCtrl','MainCtrl', 'BoardCtrl', 'BoardEditCtrl', 'AuthCtrl', 'ProfileCtrl',
    'BoardService', 'UserService', 'StoryService', 'TaskService', 'TeamService', 'StageService'
  ]);