var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const session = require("express-session");

// 引入route模块
var indexRouter = require('./routes/index'); //  项目启动，默认http://localhost:3000 访问views/index.html，测试路由配置成功
var ajaxDemoRouter = require('./routes/ajaxDemo');
var uploadFileRouter = require('./routes/uploadFile');
var usersRouter = require('./routes/users');

var app = express();
app.set('views', path.join(__dirname, 'views'));
// var ejs = require('ejs');  // -1.新引入的ejs插件
app.engine('.html', require('ejs').renderFile); // 等同于：app.engine('.html', require('ejs').__express); // -2.设置html引擎
// app.set('views', path.join(__dirname, 'views/'));
app.set('view engine', 'html'); // -3.设置视图引擎，为html

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('views/pages'))

//加载admin模块
app.use('/', indexRouter); //  项目启动，默认http://localhost:3000 访问views/index.html，测试路由配置成功
app.use('/ajaxDemo', ajaxDemoRouter)
app.use('/fileUpload', uploadFileRouter)
app.use('/users', usersRouter);

//配置session中间件
// app.use(session({
//   secret:"keyboard cat",
//   resave:false,
//   saveUninitialized:true,
//   cookie:{maxAge:1000*60*30},
//   rolling:true
// }));

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

app.listen("3001","127.0.0.1");

module.exports = app;
