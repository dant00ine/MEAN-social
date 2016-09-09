var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Message = new Schema({
  content: String,
  author: String,
  user_id: { type: Schema.ObjectId, ref:"User" },
  comments: [{type: Schema.ObjectId, ref:"Comment"}],
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', Message);
