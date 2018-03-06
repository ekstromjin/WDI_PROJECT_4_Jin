const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  spot_id: { type: mongoose.Schema.ObjectId },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  contents: { type: String },
  created_at: {type: String, require: true, default: Date()}
});

commentSchema.set('toJSON', {
  getters: true,
  virtuals: true,
  transform(obj, json) {
    delete json._id;
    delete json.__v;
  }
});

module.exports = mongoose.model('Comment', commentSchema);
