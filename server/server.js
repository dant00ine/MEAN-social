#!/usr/bin/env node

var debug = require('debug')('passport-mongo');
var app = require('./app');


app.set('port', process.env.PORT || 3000);


var server = app.listen(app.get('port'), function() {
  console.log('Cool stuff on port ' + server.address().port);
});
