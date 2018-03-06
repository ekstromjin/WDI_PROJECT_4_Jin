const Comment = require('../models/comment');
// const User = require('../models/user');

function commentsIndex(req, res, next) {
  Comment
    .find({ spot_id: req.params.spotId })
    .sort({created_at: 'desc'})
    .exec()
    .then((comments) => res.json(comments))
    .catch(next);
}

function commentsCreate(req, res, next) {
  req.body.spot_id = req.params.spotId

  Comment
    .create(req.body)
    .then(comment => res.status(201).json(comment))
    .catch(next);
}

module.exports = {
  index: commentsIndex,
  create: commentsCreate
};
