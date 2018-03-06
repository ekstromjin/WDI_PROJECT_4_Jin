const Bird = require('../models/bird');

function birdsIndex(req, res, next) {
  Bird
    .find()
    .exec()
    .then((birds) => res.json(birds))
    .catch(next);
}

function birdsShow(req, res, next) {
  Bird
    .findById(req.params.id)
    .exec()
    .then((bird) => {
      if(!bird) return res.notFound();
      res.json(bird);
    })
    .catch(next);
}

module.exports = {
  index: birdsIndex,
  show: birdsShow
};
