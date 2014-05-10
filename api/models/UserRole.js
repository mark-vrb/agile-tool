/**
* UserRole.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
*/

module.exports = {

  attributes: {
    user : {
      model : 'user',
      required : true
    },
    board : {
      model : 'board',
      required : true
    },
    role : 'string'
  }
};