angular.module('BoardCtrl', [])

  .controller('BoardController', function ($rootScope, $scope, $routeParams, Board, User, Story, Task) {
    $scope.board = {};
    $scope.errors = [];
    $scope.tasks = {};

    $scope.refreshBoard = function () {
      Board.getBoard($routeParams.id, function (err, data) {
        if (err) {
          $scope.errors.push(err);
          return;
        }
        data.stages = data.stages.sort(function (a, b) {
          return a.sequenceNo - b.sequenceNo;
        });
        $scope.board = data;
      });
    };

    $scope.viewStory = function (storyId) {
      Story.getStory(storyId, function(err, data) {
        if (err) return;
        $scope.story = data;
        $('#viewStoryModal').modal();
      });
    };

    $scope.viewCreateStoryModal = function (stageId) {
      $scope.storyCreateMode = true;
      $scope.storyEditMode = false;
      $scope.tasks.collection = [];
      $scope.story = {};
      $scope.story.currentStage = stageId;
      $scope.story.createdBy = User.getCurrent().id;
      $('#editStoryModal').modal();
    };

    $scope.viewEditStoryModal = function (storyId) {
      Story.getStory(storyId, function(err, data) {
        if (err) return;
        $scope.storyEditMode = true;
        $scope.storyCreateMode = false;
        $scope.tasks.collection = data.tasks;
        $scope.story = data;
        $('#editStoryModal').modal();
      });
    };

    $scope.createStory = function () {
      Story.createStory($scope.story, function (err, data) {
        if (err) return;
        $scope.storyCreateMode = false;
        $scope.story = {};
        $scope.tasks.collection.forEach(function (item) {
          item.story = data.id;
          Task.createTask(item, function (err, data) {
            if (err) console.log(err);
          });
        });
        $('#editStoryModal').modal('hide');
        $scope.refreshBoard();
      });
    };

    $scope.updateStory = function () {
      Story.updateStory($scope.story, function (err, data) {
        if (err) return;
        $scope.storyEditMode = false;
        $scope.story = {};
        $('#editStoryModal').modal('hide');
        $scope.refreshBoard();
      });
    };

    $scope.cancelCreation = function() {
      $scope.storyCreateMode = false;
      $scope.storyEditMode = false;
      $scope.story = {};
      $('#editStoryModal').modal('hide');
    };

    $scope.deleteStory = function (storyId) {
      Story.deleteStory(storyId, function () {
        $scope.refreshBoard();
      });
    };

    $scope.storyLikedByUser = function (story) {
      var currentUserId = User.getCurrent().id;
      return story.likes.some(function (like) {
        return like.createdBy == currentUserId;
      });
    };

    $scope.likeStoryClick = function (story) {
      if ($scope.storyLikedByUser(story)) {
        Story.unlikeStory(story.id, function (err, data) {
          if (err) return;
          $scope.refreshBoard();
        });
      } else {
        Story.likeStory(story.id, function (err, data) {
          if (err) return;
          $scope.refreshBoard();
        });
      }
    };

    $scope.isFirstColumn = function (stage) {
      return $scope.board.stages.every(function (item) {
        return item.sequenceNo >= stage.sequenceNo;
      });
    };

    $scope.isLastColumn = function (stage) {
      return $scope.board.stages.every(function (item) {
        return item.sequenceNo <= stage.sequenceNo;
      });
    };

    $scope.toNextColumn = function (story) {
      var stageIndex = -1;
      $scope.board.stages.forEach(function (item, index) {
        if (item.id == story.currentStage) stageIndex = index;
      });
      story.currentStage = $scope.board.stages[stageIndex + 1].id;
      Story.updateStory(story, function (err, data) {
        if (err) { story.currentStage = stageIndex; return; }
        $scope.refreshBoard();
      });
    };

    $scope.toPreviousColumn = function (story) {
      var stageIndex = -1;
      $scope.board.stages.forEach(function (item, index) {
        if (item.id == story.currentStage) stageIndex = index;
      });
      story.currentStage = $scope.board.stages[stageIndex - 1].id;
      Story.updateStory(story, function (err, data) {
        if (err) { story.currentStage = stageIndex; return; }
        $scope.refreshBoard();
      });
    };

    $scope.addTaskClick = function () {
      if ($scope.storyEditMode) {
        Task.createTask(
          {
            description : $scope.tasks.enteredText,
            done : false,
            story : $scope.story
          },
          function(err, data) {
            if (err) return;
            $scope.tasks.collection.push(data);
            $scope.refreshBoard();
          });
        $scope.tasks.enteredText = null;
      } else {
        $scope.tasks.collection.push({
          description : $scope.tasks.enteredText,
          done : false,
          story : $scope.story
        });
        $scope.tasks.enteredText = null;
      }
    };

    $scope.deleteTaskClick = function (task) {
      if ($scope.storyEditMode) {
        Task.deleteTask(task.id, function (err, data) {
          if (err) return;
          var index = $scope.tasks.collection.indexOf(task);
          if (index != -1)
          {
            $scope.tasks.collection.splice(index, 1);
          }
        });
      } else {
        var index = $scope.tasks.collection.indexOf(task);
        if (index != -1)
        {
          $scope.tasks.collection.splice(index, 1);
        }
      }
    };

    $scope.completeTaskClick = function (task) {
      task.done = !task.done;
      Task.updateTask(task, function(err, data) {
        if (err) { task.done = !task.done; return; }
        $scope.refreshBoard();
      });
    };

    $scope.getProgress = function (story) {
      if (story.tasks.length != 0)
      {
        var completed = story.tasks.filter(function (t) { return t.done; }).length;
        return (completed / story.tasks.length * 100).toFixed(0) + '%';
      }
      return '0%';
    };

    $scope.printPdf = function () {
      var pdf = new jsPDF('l', 'pt', 'a4'), 
          source = $('#boardForPrint')[0];
      margins = {
        top    : 80,
        bottom : 60,
        left   : 40,
        width  : 800
      };
      pdf.fromHTML(
        source,
        margins.left, // x coord
        margins.top, // y coord
        {'width': margins.width},
        function (dispose) {
          // dispose: object with X, Y of the last line add to the PDF
          //          this allow the insertion of new lines after html
          pdf.save('Test.pdf');
        },
        margins
      );
    }

    $scope.refreshBoard();

  });