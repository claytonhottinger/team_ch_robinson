var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var routes = require('./routes/index');
var users = require('./routes/users');
var events = require('./routes/events');
var tasks = require('./routes/tasks');
var shifts = require('./routes/shifts');
var volunteers = require('./routes/volunteers');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../client/public/views'));
app.set('view engine', 'jade');

//DATABASE CONNECTIONS
//build the connection string
var dbURI = 'mongodb://localhost:27017/volunteerApp';
//Create database connection
mongoose.connect(dbURI);
//When successfully connected
mongoose.connection.on('connected', function() {
  console.log('Mongoose default connection open to ' + dbURI);
});
//If the connection throws an error
mongoose.connection.on('error', function(err) {
  console.log('Mongoose default connection error: ' + err);
});
//When the connection is disconnected
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose default connection disconnected');
});


app.use(favicon(path.join(__dirname, '../client/public/', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/private')));
app.use(express.static(path.join(__dirname, '../client/public')));

app.use('/', routes);
app.use('/users', users);
app.use('/events', events);
app.use('/tasks', tasks);
app.use('/shifts', shifts);
app.use('/volunteers', volunteers);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
