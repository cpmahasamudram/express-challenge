'use strict';
var express = require('express');
var port    = 3000;

var app = express();

var router = express.Router();
var routes = require('./routes/index');
app.use('/', routes);

var server = app.listen(3000, function () {
  var port = server.address().port;
});
module.exports = server;