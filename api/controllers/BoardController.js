/**
 * BoardController
 *
 * @description :: Server-side logic for managing boards
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  expanded : function (req, res) {
    Board.findOne(req.param('id')).populate('stages').exec(function (err, data) {
      async.map(
        data.stages,
        function (stage, cb) {
          Story
            .find({currentStage : stage.id})
            .populate('likes')
            .populate('assignedTo')
            .exec(function (err, stories) {
              var transformed = JSON.parse(JSON.stringify(stage));
              transformed.stories = stories;
              cb(err, transformed);
            });
        }, 
        function (err, stages) {
          if (err) {
            res.serverError(err);
          } else {
            var board = JSON.parse(JSON.stringify(data));
            board.stages = stages;
            res.json(board);
          }
        });
    });
  },
};