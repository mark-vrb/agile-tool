/**
* Board.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
*/

module.exports = {

  attributes: {
  	name : {
  		type: 'string',
  		required : true
  	},
    description : 'text',
    stages : {
      collection : 'boardStage',
      via : 'board'
    },
    team : {
      model : 'team',
      required : true
    },
    userRoles : {
      collection : 'userRole',
      via : 'board'
    }
  }
};