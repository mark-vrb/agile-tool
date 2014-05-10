/**
* Project.js
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
    url : {
      type : 'url'
    },
    organization : {
      model : 'organization',
      required : true
    },
    teams : {
      collection : 'team',
      via : 'project'
    }
  }
};