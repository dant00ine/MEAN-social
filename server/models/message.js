var mongoose = require('mongoose');

var Message = new mongoose.Schema({
  content: String,
  user_id: { type:mongoose.Schema.Types.ObjectId, ref:"users" },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('messages', Message);
