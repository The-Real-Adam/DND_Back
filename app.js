const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require ('cors')
const index = require('./routes/index');
const users = require('./routes/users');
const token = require('./routes/token');
const sheet = require('./routes/sheet');
const journal = require('./routes/journal');
const equipment = require('./routes/equipment');
const armor = require('./routes/armor');
const weapons = require('./routes/weapons');
const feats = require('./routes/feats');
const spells = require('./routes/spells');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// app.use(cors({origin:'http://localhost:3001'}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header({'Access-Control-Allow-Origin': 'http://localhost:3001'})
  // res.header({'Access-Control-Allow-Origin': 'https://critical-path.herokuapp.com'})
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, DELETE')
  next()
})

app.use('/', index);
app.use('/token', token);
app.use('/users', users);
app.use('/sheet', sheet);
app.use('/journal', journal);
app.use('/equipment', equipment);
app.use('/armor', armor);
app.use('/weapons', weapons);
app.use('/feats', feats);
app.use('/spells', spells);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error:THIS ERROR HERE<<<<');
});

module.exports = app;
