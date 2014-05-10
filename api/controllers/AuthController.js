/**
 * AuthController
 *
 * @description :: Authentication logic.
 */

var passport = require("passport");

module.exports = {

  /**
   * Login registered user.
   */
  login: function (req, res) {
    passport.authenticate('local', function(err, user, info) {
      if ((err) || (!user)) {
        res.badRequest('Data is not provided');
        return;
      }
      req.logIn(user, function(err) {
        if (err) res.badRequest('Wrong email or password');
        return res.send('Login succeed');
      });
    })(req, res);
  },

  /**
   * Logout authenticated user.
   */
  logout: function (req, res) {
    req.logout();
    res.send('logout successful');
  }
};