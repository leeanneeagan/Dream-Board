// <!-- Project Foundation  
// This project was built using a template as a starting point and customized to fit the app’s unique features and design.  
// All final code and design choices were reviewed, tested, and implemented by the author.
//  -->



// <!-- //  AI Assistance
// // Parts of this code were assisted with the use of ChatGPT as a learning tool.
// // All final code was reviewed, tested, and modified by the project author.

//  -->





var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
const MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');
var db;

mongoose.connect(configDB.url, (err, database) => {
  if (err) return console.log(err);
  db = database;
  require('./app/routes.js')(app, passport, db);
});

require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(session({
  secret: 'rcbootcamp2021b',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.listen(port);
console.log('The DREAMS happen on port ' + port);
