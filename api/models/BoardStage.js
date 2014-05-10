/**
* BoardStage.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
*/

module.exports = {

  attributes: {
    name : {
      type: 'string',
      required : true
    },
    type : {
      type : 'string',
      required : true
    },
    sequenceNo : {
      type : 'integer',
      required : true
    },
    board : {
      model : 'board',
      required : true
    },
    stories : {
      collection : 'story',
      via : 'currentStage'
    }
  }
};