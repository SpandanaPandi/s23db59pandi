var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Account = require('./models/account');
var transportation=require('./models/transportation');
var mongoose = require('mongoose');
require('dotenv').config();

passport.use(new LocalStrategy(
  function(username, password, done) {
    Account.findOne({ username: username })
      .then(function(user) {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch(function(err) {
        return done(err);
      });
  }
));

const connectionString = process.env.MONGO_CON;
mongoose.connect(connectionString);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function() {
  console.log("Connection to DB succeeded");
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var transportationRouter = require('./routes/transportation');
var boardRouter = require('./routes/board');
var chooseRouter = require('./routes/choose');
var resourceRouter = require('./routes/resource');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/transportation', transportationRouter);
app.use('/board', boardRouter);
app.use('/choose', chooseRouter);
app.use('/resource', resourceRouter);

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use(function(req, res, next) {
  next(createError(404));
});

async function recreateDB() {
  await transportation.deleteMany();
 
  let instance1 = new transportation(
 
   {
 
    TransportationType: "Air",Destination:"Chicago",Price:18
 
   });
 
   let instance2 = new transportation(
 
    {
 
      TransportationType: "Water",Destination:"Newyork",Price:24
 
    });
 
    let instance3 = new transportation(
 
     {
 
      TransportationType: "Road",Destination:"India",Price:1000
 
     });
 
  instance1.save()
 
  .then(doc => {console.log("First object saved")})
 
   .catch(err=>{console.error(err)})
 
  instance2.save()
 
  .then(doc => {console.log("Second object saved")})
 
   .catch(err=>{console.error(err)})
 
  instance3.save()
 
  .then(doc => {console.log("Third object saved")})
 
   .catch(err=>{console.error(err)})
 
  }

let reseed = true;
if (reseed) {
  recreateDB();
}

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
