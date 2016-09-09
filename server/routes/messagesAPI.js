var express = require('express');
var router = express.Router();
var passport = require('passport');

var Message = require('../models/message.js');

router.get('/:id', function(req, res){
  var id = req.params.id;
  Message.find({user_id: id}, function(err, results){
    if(err){ console.log(err); }
    else { res.json(results); }
  });
});

router.post('/add/:id', function(req, res){
  var newMessage = new Message(req.body);
  console.log("new message: ", newMessage);
  newMessage.save(function(err, data){
    if(err){ console.log(err) }
    else { res.json(data) }
  })
})

module.exports = router;
