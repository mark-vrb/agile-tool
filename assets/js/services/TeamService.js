angular.module('TeamService', []).factory('Team', ['$http', function($http) {
  var getAllTeams, updateTeam, createTeam;

  getAllTeams = function (callback) {
    $http
      .get('/api/team')
      .success(function (data) {
        callback(null, data);
      })
      .error(function (data) {
        callback(data, null);
      });
  };

  createTeam = function (team, callback) {
    $http
      .post('/api/team', team)
      .success(function (data) {
        callback(null, data);
      })
      .error(function (data) {
        callback(data, null);
      });
  };

  updateTeam = function (team, callback) {
    $http
      .put('/api/team/' + team.id, team)
      .success(function (data) {
        callback(null, data);
      })
      .error(function (data) {
        callback(data, null);
      });
  };

  return {
    getAllTeams : getAllTeams,
    createTeam  : createTeam,
    updateTeam  : updateTeam
  };
}]);