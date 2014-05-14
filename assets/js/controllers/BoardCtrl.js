angular.module('BoardCtrl', [])

  .controller('BoardController', function ($rootScope, $scope, $routeParams, Board, User, Story) {
    $scope.board = {};
    $scope.errors = [];

    $scope.refreshBoard = function () {
      Board.getBoard($routeParams.id, function (err, data) {
        if (err) {
          $scope.errors.push(err);
          return;
        }
        $scope.board = data;
      });
    };

    $scope.viewStory = function (story) {
      $scope.story = story;
      $('#viewStoryModal').modal();
    };

    $scope.viewCreateStoryModal = function (stageId) {
      $scope.storyCreateMode = true;
      $scope.story = {};
      $scope.story.currentStage = stageId;
      $scope.story.createdBy = User.getCurrent().id;
      $('#editStoryModal').modal();
    };

    $scope.viewEditStoryModal = function (storyId) {
      Story.getStory(storyId, function(err, data) {
        if (err) return;
        $scope.storyEditMode = true;
        $scope.story = data;
        $('#editStoryModal').modal();
      });
    };

    $scope.createStory = function () {
      Story.createStory($scope.story, function (err, data) {
        if (err) return;
        $scope.storyCreateMode = false;
        $scope.story = {};
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

    $scope.refreshBoard();

  });