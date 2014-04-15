// modules
var express = require('express');
var app = express();
var mysql = require('mysql');

// config files
var db = require('./config/db');
var connection = mysql.createConnection(db);

var port = process.env.PORT || 8080;

// TODO : fix this with express 4.0 api
// app.configure(function() {
  app.use(express.static(__dirname + '/public'));
  // app.use(express.logger('dev'));
  // app.use(express.bodyParser());
  // app.use(express.methodOverride());
// });

// routes
require('./app/routes')(app, connection);

// start app
app.listen(port);
console.log('Magic on port ' + port);
exports = module.exports = app;