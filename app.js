var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let mongo = require('mongodb');
let mongoose = require('mongoose');
let ejs = require('ejs');
let bodyParser = require('body-parser');


var indexRouter = require('./routes/index');
let articleRouter = require('./routes/article');
let messageRouter = require('./routes/message');
let aboutRouter = require('./routes/about');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); 
// 使用html作为模板（在views里文件夹里可以写成html文件）
// app.engine('html', ejs.renderFile);
// app.set('view engine', 'html');
// 使用ejs为模板
app.set('view engine','ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use('/public',express.static(path.join(__dirname, 'public')));
app.use('/public',express.static('public'));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
  else  next();
});

app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

app.use('/', indexRouter);
app.use('/article',articleRouter);
app.use('/message',messageRouter);
app.use('/about', aboutRouter);
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

// 链接数据库
mongoose.connect('mongodb://localhost:27017/blog',err =>{
  if(err) console.log('数据库连接失败')
  console.log('数据库连接成功');
})


module.exports = app;
