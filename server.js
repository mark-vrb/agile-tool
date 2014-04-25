// modules
var express = require('express');
var app = express();
var mysql = require('mysql');
var passport = require('passport');

// config files
var db = require('./config/db');
var connection = mysql.createConnection(db);
require('./config/passport')(passport); 

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.use(express.cookieParser());

// required for passport
app.use(express.session({ secret: 'welovejsandagile' }));
app.use(passport.initialize());
app.use(passport.session());

// routes
require('./app/routes')(app, connection);

// start app
app.listen(port);
console.log('Magic on port ' + port);
exports = module.exports = app;