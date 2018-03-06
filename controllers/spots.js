const Spot = require('../models/spot');
// const User = require('../models/user');

function spotsIndex(req, res, next) {
  Spot
    .find()
    .exec()
    .then((spots) => res.json(spots))
    .catch(next);
}

// function spotsShow(req, res) {
//   Spot
//     .find({ createdBy: req.params.id })
//     .exec()
//     .then(spots => {
//       User
//         .findById(req.params.id)
//         .exec()
//         .then((user) => {
//           res.render('users/show', { user, spots });
//           // 'users/show'???
//         });
//     });
// }

function spotsShow(req, res, next) {
  Spot
    .findById(req.params.id)
    .populate('bird')
    .populate('user', 'username')
    .exec()
    .then((spot) => {
      if(!spot) return res.notFound();
      res.json(spot);
    })
    .catch(next);
}

function spotsCreate(req, res, next) {
  req.body.user = req.session.user._id;

  Spot
    .create(req.body)
    .then(spot => res.status(201).json(spot))
    .catch(next);
}

function spotsLikes(req, res, next) {
  Spot
    .update({_id:req.params.id}, {$set: {likes: req.body.likes}})
    .then(spot => res.status(201).json(spot))
    .catch(next);
}

module.exports = {
  create: spotsCreate,
  show: spotsShow,
  index: spotsIndex,
  likes: spotsLikes
};
