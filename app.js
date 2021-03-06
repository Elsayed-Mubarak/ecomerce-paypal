var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var { mongoose } = require("./config/mongooseConnection")

var app = express();

var adminRouter = require("./routes/admin")
var userRouter = require("./routes/users")
var productRouter = require("./routes/product")
var paymentRouter = require("./routes/payment")
var uploadS3File = require("./routes/s3Upload")
var brainTreeRouter = require("./routes/rainTree")


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('index'));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

console.log("...............im on app.js ................")

app.use('/api/v1', paymentRouter);

app.use('/api/v1', adminRouter);
app.use('/api/v1', userRouter);
app.use('/api/v1', productRouter);

app.use('/api/v1', uploadS3File);
app.use('/', brainTreeRouter);





app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
