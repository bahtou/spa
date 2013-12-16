"use strict";
var express = require('express')
  , app = express();

var routes = require('./routes')
  , http = require('http')
  , path = require('path');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.multipart());
app.use(express.methodOverride());
routes(app);
app.use(express.static(path.join(__dirname, 'client')));

// development only
app.configure('development', function() {
  app.use(express.errorHandler({showStack: true, dumpExceptions: true}));
  app.locals.pretty = true;
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
