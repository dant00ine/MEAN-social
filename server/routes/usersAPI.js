var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/User.js');

router.get('/', function(req, res){
  User.find({}, function(err, results){
    if(err){ console.log(err); }
    else { res.json(results); }
  })
})

// router.get('/:id', function(req, res){
//   User.find({id: req.params.id}, function(err, results){
//     if(err){ console.log(err); }
//     else { res.json(results); }
//   })
// })

router.get('/currentUser', function(req, res){
  res.json({user: req.user});
})


router.post('/register', function(req, res) {
  console.log('here we are in register');
  User.register(new User({ username: req.body.username }),
    req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({
        err: err
      });
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({
        status: 'Registration successful!'
      });
    });
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      res.status(200).json({
        status: 'Login successful!'
      });
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

router.get('/status', function(req, res) {
  console.log("user: ", req.user);
  if(!req.isAuthenticated()){
    return res.status(200).json({
      status: false
    })
  }
  res.status(200).json({
    status: true
  });
});


module.exports = router;
