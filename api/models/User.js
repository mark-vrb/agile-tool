/**
* User.js
*
* @description :: User Model represents user of agile tool system.
*/

var bcrypt = require('bcrypt');
var crypto = require('crypto');

module.exports = {

  attributes: {
  	firstName : {
      type : 'string',
      required : true
    },
  	lastName : {
      type : 'string',
      required : true
    },
  	email : {
  		type : 'email',
      required : true,
      unique : true
  	},
  	password : {
      type : 'string',
      minLength : 6,
      required : true
    },
    url : {
      type : 'url',
    },
    avatar : 'string',
    stories : {
      collection : 'story',
      via : 'createdBy'
    },
    assignedStories : {
      collection : 'story',
      via : 'assignedTo',
      dominant : true
    },
    comments : {
      collection : 'comment',
      via : 'createdBy'
    },
    commentLikes : {
      collection : 'commentLike',
      via : 'createdBy'
    },
    storyLikes : {
      collection : 'storyLike',
      via : 'createdBy'
    },
    teams : {
      collection : 'team',
      via : 'users',
      dominant : true
    },
    roles : {
      collection : 'userRole',
      via : 'user'
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },

  // Lifecycle callbacks
  beforeCreate: function(values, next) {
    // Generating Gravatar image request
    var lowerEmail = values.email.toLowerCase();
    var emailHash = crypto.createHash('md5').update(lowerEmail).digest('hex');
    values.avatar = 'http://www.gravatar.com/avatar/' + emailHash;

    // Hashing password
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(values.password, salt, function(err, hash) {
        if (err) return next(err);
        values.password = hash;
        next();
      });
    });
  }
};