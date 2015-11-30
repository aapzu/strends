var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cons = require('consolidate');
var _ = require('underscore');

// The route files must me required here
var index = require('./routes/index');

var app = express();
var base = express.Router();

require('underscore-express')(app);

// view engine setup
app.engine('html',cons.underscore);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/strends', base);
app.use('/strends', index);

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

// The hand which pushes data from Twitter's api to Streamr's api
var dataHand = require("./src/data-hand.js")({
  twitter: {
    consumer_key: "HI0mcdH2xj5PyxynulBcTaQHM",
    consumer_secret: "xYl25RvpsMWcJzrv6sGz7H5348QPB0IQO9ovw6kDGzaHCPgaPL",
    access_token_key: "118690370-CywZu2RJ5zupfs4PUDiCqzxJjkXIrWoP8JuPVBQx",
    access_token_secret: "jNWu4iTjVEW3BsDXcobKD7HKMyGjGPdm2Sw8c38VRdPyS"
  },
  streamr: {
    stream_id: "7v6Wyy8wTmiZ7nKNjDMSyA",
    stream_auth: "OpZb2n9bRHyQNluvT3Afxw"
  }
})

dataHand.stream(["finland", "sweden"])


module.exports = app;
