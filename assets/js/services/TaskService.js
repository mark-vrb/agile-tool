angular.module('TaskService', []).factory('Task', ['$http', function($http) {
  var
    createTask, deleteTask, updateTask
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
  };

  updateTask = function (task, callback) {
    $http
      .put('/api/task/' + task.id, task)
      .success(function (data) {
        callback(null, data);
      })
      .error(function (data) {
        callback(data, null);
      });
  };

  return {
    createTask : createTask,
    deleteTask : deleteTask,
    updateTask : updateTask
  };
}]);