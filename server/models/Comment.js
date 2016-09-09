var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Comment = new Schema({
  content: String,
  author: String,
  message_id: { type: Schema.ObjectId, ref:"Message" },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', Comment);
