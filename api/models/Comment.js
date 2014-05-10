/**
* Comment.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
*/

module.exports = {

  attributes: {
  	text : {
  		type : 'text',
  		required : true
  	},
    story : {
      model : 'story',
      required : true
    },
    likes : {
      collection : 'commentLike',
      via : 'comment'
    },
    createdBy : {
      model : 'user',
      required : true
    }
  }
};