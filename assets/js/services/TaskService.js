angular.module('TaskService', []).factory('Task', ['$http', function($http) {
  var
    createTask, deleteTask
  ;

  createTask = function (task, callback) {
    $http
      .post('/api/task', task)
      .success(function (data) {
        callback(null, data);
      })
      .error(function (data) {
        callback(data, null);
      });
  };

  deleteTask = function (taskId, callback) {
    $http
      .delete('/api/task/' + taskId)
      .success(function (data) {
        callback(null, data);
      })
      .error(function (data) {
        callback(data, null);
      });
  }

  return {
    createTask : createTask,
    deleteTask : deleteTask
  };
}]);