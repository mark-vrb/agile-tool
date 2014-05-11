/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  getAuthenticated : function(req, res) {
    res.json(req.user[0]);
  },
	
};

