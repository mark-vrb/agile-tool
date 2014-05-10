/**
* CommentLike.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
*/

module.exports = {

  attributes: {
    createdBy : {
  		model : 'user',
  		required : true
  	},
  	comment : {
  		model : 'comment',
  		required : true
  	}
  }
};