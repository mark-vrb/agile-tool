angular.module('StoryService', []).factory('Story', ['$http', function($http) {
  var
    createStory, updateStory, getStory, likeStory, unlikeStory
  ;

  createStory = function (story, callback) {
    $http
      .post('/api/story', story)
      .success(function (data) {
        callback(null, data);
      })
      .error(function (data) {
        callback(data, null);
      });
  };

  updateStory = function (story, callback) {
    $http
      .put('/api/story/' + story.id, story)
      .success(function (data) {
        callback(null, data);
      })
      .error(function (data) {
        callback(data, null);
      });
  };

  getStory = function (storyId, callback) {
    $http
      .get('/api/story/' + storyId)
      .success(function (data) {
        callback(null, data)
      })
      .error(function (data) {
        callback(data, null);
      });
  };

  deleteStory = function (storyId, callback) {
    $http
      .delete('/api/story/' + storyId)
      .success(function (data) {
        callback(null, data);
      })
      .error(function (data) {
        callback(data, null);
      });
  };

  likeStory = function (storyId, callback) {
    $http
      .post('/api/story/' + storyId + '/like')
      .success(function (data) {
        callback(null, data);
      })
      .error(function (data) {
        callback(data, null);
      });
  };

  unlikeStory = function (storyId, callback) {
    $http
      .post('/api/story/' + storyId + '/unlike')
      .success(function (data) {
        callback(null, data);
      })
      .error(function (data) {
        callback(data, null);
      });
  };

  return {
    createStory : createStory,
    updateStory : updateStory,
    getStory    : getStory,
    deleteStory : deleteStory,
    likeStory   : likeStory,
    unlikeStory : unlikeStory
  };
}]);