const mongoose = require('mongoose');

const birdSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  color: [{ type: String }]
});

birdSchema.set('toJSON', {
  getters: true,
  virtuals: true,
  transform(obj, json) {
    delete json._id;
    delete json.__v;
  }
});

module.exports = mongoose.model('Bird', birdSchema);
