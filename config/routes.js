const router = require('express').Router();
// const birdsController = require('../controllers/birds');
const birds  = require('../controllers/birds');
const spots  = require('../controllers/spots');
const comments  = require('../controllers/comments');
const auth  = require('../controllers/auth');
// const secureRoute = require('../lib/secureRoute');

router.route('/birds')
  .get(birds.index);

router.route('/birds/:id')
  .get(birds.show);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/spots/:id')
  .get(spots.show)
  .post(spots.likes);

router.route('/spots')
  .get(spots.index)
  .post(spots.create);

router.route('/spots/:spotId/comments')
  .get(comments.index);

router.route('/spots/:spotId/comments/create')
  .post(comments.create);

router.all('/*', (req, res) => res.notFound());

module.exports = router;

// .post(secureRoute, birds.create);

// router.route('/birds/:id')
//   .get(birds.show);

// router.route('/')
//   .get(statics.index);
//
// router.route('/logout')
//   .get(session.delete);
//
// router.route('/register')
//   .get(registration.new)
//   .post(registration.create);
//
// router.route('/login')
//   .get(session.new)
//   .post(session.create);
//
// router.route('/logout')
//   .get(session.delete);


// --------------------------------

// router.route('/users/:id')
//   .get(users.show);


// --------------------------------
//
// router.route('/users')
//   .get(secureRoute, statics.index);

// DELETE
// router.all('*', (req, res) => res.notFound());
