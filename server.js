const express = require('express')
const app = express()

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var oauthserver = require('oauth2-server');
var mongoose = require('mongoose');

var index = require('./routes/index');
var login = require('./routes/login');
var users = require('./routes/users');

global.__base = __dirname + '/';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.disable('x-powered-by');

app.set('mongo', path.join(__dirname, 'mongo'));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/static/images',express.static(path.join(__dirname, '/public/images')));
app.use('/static/js',express.static(path.join(__dirname, '/public/js')));
app.use('/static/css',express.static(path.join(__dirname, '/public/css')));



var mongoUri = 'mongodb://localhost/test';

mongoose.connect(mongoUri, function(err, res) {
  if (err) {
    return console.error('Error connecting to "%s":', mongoUri, err);
  }
  console.log('Connected successfully to "%s"', mongoUri);
});

app.oauth = oauthserver({
  model: require('./model.js'),
  grants: ['password'],
  debug: true
});

app.all('/nodeGarden.js/oauth/token', app.oauth.grant());

app.get('/nodeGarden.js/index', app.oauth.authorise(), function (req, res) {


  res.send('Congratulations, you are in a secret area!');
});

app.use(app.oauth.errorHandler(),  function(err, req, res, next) {

console.log('ENTRA EN ERRORHANDLER OAUTH: '+ err.stack);

next();
});

app.use('/nodeGarden.js/login', login);
app.use('/nodeGarden.js/index', index);
app.use('/nodeGarden.js/users', users);


app.get('/nodeGarden.js', function(req, res) {
  console.log('Se redirige a nodeGarden.js/login');
  res.redirect('/nodeGarden.js/login');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  //next(err);
 console.log('Se redirige a nodeGarden.js/login desde 404');  
  res.redirect('/nodeGarden.js/login');

});

app.get('/404', function(req, res, next){
  // trigger a 404 since no other middleware
  // will match /404 after this one, and we're not
  // responding here
  res.redirect('/nodeGarden.js/login');
});

app.get('/400', function(req, res, next){
  // trigger a 400 since no other middleware
  // will match /400 after this one, and we're not
  // responding here
 console.log('Se redirige a nodeGarden.js/login desde 400');

  res.redirect('/nodeGarden.js/login');
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

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

