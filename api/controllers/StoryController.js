/**
 * StoryController
 *
 * @description :: Server-side logic for managing stories
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  like : function (req, res) {
    StoryLike
      .create({
        story : req.param('id'),
        createdBy : req.user[0].id
      })
      .exec(function (err, like) {
        if (err) {
          res.badRequest(err);
        } else {
          res.json(like);
        }
      });
  },

  unlike : function (req, res) {
    StoryLike
      .destroy({
        story : req.param('id'),
        createdBy : req.user[0].id
      })
      .exec(function (err, like) {
        if (err) {
          res.badRequest(err);
        } else {
          res.json(like);
        }
      });
  },	
};

