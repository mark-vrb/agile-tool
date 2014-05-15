angular.module('StageService', []).factory('Stage', ['$http', function($http) {
  var updateStage, createStage;

  createStage = function (stage, callback) {
    $http
      .post('/api/boardStage', stage)
      .success(function (data) {
        callback(null, data);
      })
      .error(function (data) {
        callback(data, null);
      });
  };

  updateStage = function (stage, callback) {
    $http
      .put('/api/boardStage/' + stage.id, stage)
      .success(function (data) {
        callback(null, data);
      })
      .error(function (data) {
        callback(data, null);
      });
  };

  return {
    createStage : createStage,
    updateStage : updateStage
  };
}]);