const mongoose = require('mongoose');

const spotSchema = new mongoose.Schema({
  bird: { type: mongoose.Schema.ObjectId, ref: 'Bird' },
  user: { type: mongoose.Schema.ObjectId, ref: 'Auth' },
  image: { type: String },
  location: {},
  likes: [],
  username: { type: String },
  created_at: {type: String, require: true, default: Date()}
});

spotSchema.set('toJSON', {
  getters: true,
  virtuals: true,
  transform(obj, json) {
    delete json._id;
    delete json.__v;
  }
});

module.exports = mongoose.model('Spot', spotSchema);
