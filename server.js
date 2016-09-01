// Whole-script strict mode syntax
"use strict";

var express = require('express');
var app = express();
var morgan = require('morgan');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// Load the router
var router = require('./app/routes/router');

// log every request to the console
app.use(morgan('dev'));

//
app.use(express.static(__dirname + '/public'));

//
app.use(express.static(__dirname + '/bower_components'));

// set the server port
var port = 3000;
// set the host
var host = "127.0.0.1";



/////******************************************************************************************//////////

//Loading Mongoose
var mongoose    =require('mongoose');
// Loading config file
var config = require('./app/config');
// Establishing db connection
mongoose.connect(config.mongoURI[app.settings.env], function(err, res) {
  if(err) {
    console.log('Error connecting to the database. ' + err);
  } else {
    console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
  }
});


/////****************************************************************************************/////////////







// REGISTER OUR ROUTES
// all of our routes will be prefixed with /api
app.use('/api', router);

// Start Server
var myserver = server.listen(port, host, function () {
    var host = myserver.address().address;
    var port = myserver.address().port;
    console.log('Server running at http://%s:%s', host, port);
});


/////////*********************************************************************************///////////////

//Exporting for testing
module.exports = server;



/////////*********************************************************************************///////////////
