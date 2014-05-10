/**
* Team.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
*/

module.exports = {

  attributes: {
    name : {
      type : 'string',
      required : true
    },
    email : {
      type : 'email',
      required : true
    },
    project : {
      model : 'project',
      required : true
    },
    users : {
      collection : 'user',
      via : 'teams'
    },
    boards : {
      collection : 'board',
      via : 'team'
    }
  }
};