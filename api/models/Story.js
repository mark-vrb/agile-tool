/**
* Story.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
*/

module.exports = {

  attributes: {
    name : {
      type : 'string',
      required : true
    },
    description : 'text',
    points : 'integer',
    currentStage : {
      model : 'boardStage',
      required : true
    },
    tasks : {
      collection : 'task',
      via : 'story'
    },
    comments : {
      collection : 'comment',
      via : 'story'
    },
    likes : {
      collection : 'storyLike',
      via : 'story'
    },
    assignedTo : {
      collection : 'user',
      via : 'assignedStories'
    },
  	createdBy : {
  		model : 'user',
      required : true
  	}
  }
};