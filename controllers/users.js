const User = require('../models/user');
const Spot = require('../models/spot');

function usersIndex(req, res, next) {
  User
    .find()
    .exec()
    .then((users) => res.json(users))
    .catch(next);
}

function usersInfo(req, res, next) {
  User
    .findById({ _id: req.params.userId}, { id: 1, username: 1, photo: 1 })
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      res.json(user);
    })
    .catch(next);
}

function usersShow(req, res, next) {
  Spot
    .find({ user: req.params.id })
    .exec()
    .then(spots => {
      User
        .findOne({ _id: req.params.id}, { id: 1, username: 1, photo: 1 })
        .exec()
        .then((user) => {
          if(!user) return res.notFound();
          res.json({ user, spots });
        });
    });
}

module.exports = {
  index: usersIndex,
  show: usersShow,
  info: usersInfo
};
