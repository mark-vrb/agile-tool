var bcrypt = require('bcrypt-nodejs');

module.exports = function() {
  var
    local = {
      email : 'test@test.com',
      password : 'default'
    }; 

  return {
    local : local,
    generateHash : function(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    },
    validPassword : function(password) {
      return bcrypt.compareSync(password, this.local.password);
    }
  };
}