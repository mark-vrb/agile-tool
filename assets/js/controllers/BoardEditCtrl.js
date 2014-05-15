angular.module('BoardEditCtrl', [])

  .controller('BoardEditController', function ($rootScope, $scope, $routeParams, $location, Board, Team, Stage) {
    $scope.board = {};
    $scope.board.stages = [];

    $scope.getTeams = function () {
      Team.getAllTeams(function (err, data) {
        $scope.teams = data;
      });
    };

    $scope.addStageClick = function () {
      var n = $scope.board.stages.length;
      var newSequenceNo = n == 0 ? 1 : $scope.board.stages[n-1].sequenceNo + 1;
      $scope.board.stages.push({
        name       : 'New stage',
        sequenceNo : newSequenceNo,
        stageType  : ''
      });
    };

    $scope.deleteStageClick = function (stage) {
      if (stage.stories.length != 0)
      {
        var sure = confirm('Stage has stories inside. Are you sure want to delete'
          + 'this stage (all stories from stage will be lost)?');
        if (!sure) { return; }
      }
      var index = $scope.board.stages.indexOf(stage);
      $scope.board.stages.splice(index, 1);
      $scope.board.stages.forEach(function (item) {
        if (item.sequenceNo > stage.sequenceNo)
          item.sequenceNo--;
      });
    };

    $scope.stageUpClick = function (stage) {
      var index = $scope.board.stages.indexOf(stage);
      if (index == 0) return;
      $scope.board.stages[index].sequenceNo--;
      $scope.board.stages[index-1].sequenceNo++; 
      $scope.board.stages.sort(function (a,b) {
        return a.sequenceNo - b.sequenceNo;
      });
    };

    $scope.stageDownClick = function (stage) {
      var index = $scope.board.stages.indexOf(stage);
      if (index == $scope.board.stages.length - 1) return;
      $scope.board.stages[index].sequenceNo++;
      $scope.board.stages[index+1].sequenceNo--; 
      $scope.board.stages.sort(function (a,b) {
        return a.sequenceNo - b.sequenceNo;
      });
    };

    $scope.submitForm = function () {
      if ($scope.board.id) {
        // Update mode
        var updateObject = {
          id : $scope.board.id,
          name : $scope.board.name,
          description : $scope.board.description,
          team : $scope.board.team
        };
        Board.updateBoard(updateObject, function (err, data) {
          // todo : saving stages
          $scope.board.stages.forEach(function (item) {
            if (item.id) {
              Stage.updateStage(item, function () {});
            } else {
              item.board = data.id;
              Stage.createStage(item, function () {});
            }
          });
          if (err) { console.log(err); return; }
          $location.url('/board/' + data.id);
        });
      } else {
        // Create mode
        var stages = $scope.board.stages;
        delete $scope.board.stages;
        Board.createBoard($scope.board, function (err, data) {
          if (err) {alert(err.message);return;}
          stages.forEach(function (item) {
            item.board = data.id;
            Stage.createStage(item, function (err, data) {console.log(err);});
          });
          $location.url('/board/' + data.id);
        });

      }
    };

    $scope.getTeams();

    if ($routeParams.id) {
      Board.getBoard($routeParams.id, function (err, data) {
        $scope.editMode = true;
        $scope.board = data;
      });
    }
  });