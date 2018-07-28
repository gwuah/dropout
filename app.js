var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
var session = require('express-session');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sessionRouter = require('./routes/session');
var messageRouter = require('./routes/message')

var passport = require('passport');
require('./passport')
var GitHubStrategy = require('passport-github').Strategy;
var User = require('./models/User');
var mongoose = require('mongoose');
var config = require('./config');


var app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.dbConnstring, { useNewUrlParser: true });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());
app.use(session({
  secret: config.sessionKey,
  resave: false,
  saveUninitialized: true,
  
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res,next){
  if(req.isAuthenticated()){
    res.locals.user = req.user;
  }
  next();
})

app.use('/', indexRouter);
app.use('/', sessionRouter);
app.use('/', messageRouter)
app.use('/user', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
