var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
// 1、Express框架安装ejs模板的时候，通过在app.js修改
// 2、新建了一个nodejs项目，默认是jade模板。改成ejs模板，使用html作为启动项。此时运行程序报错了：Failed to lookup view "error" in views directory
// 3、发现是模板在加载的时候，views文件夹里必须有一个error，而我们制定ejs模板为html格式,所以在项目加载的时候找不到error.html而报错
// 4、所以在views文件夹下新建一个error.html，成功解决了此问题
// view engine setup
// 这两种方式都可以：1.
app.set('views', path.join(__dirname, 'views'));
// app.set('views', path.join(__dirname, './views'));
// app.set('view engine', 'ejs'); // 注释这行，让模板可以识别html文件
// 添加下面两行代码
app.engine('.html', require('ejs').renderFile); // var ejs = require('ejs');  // -1.新引入的ejs插件
// 这两种方式都可以：2.
// app.set('views', path.join(__dirname, 'views/'));
// app.engine('.html', require('ejs').__express); // -2.设置html引擎
app.set('view engine', 'html'); // -3.设置视图引擎

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// ajaxDemo-post的加载页面
app.get('/ajaxDemo-post', function(req, res){ // 设置路由名称
  res.render('ajaxDemo-post'); // 加载模板文件
})
// 检查答案的路由
app.post('/checkAnswer', function(req,res){
  // 利用cors解决跨越问题
  // res.setHeader("Access-Control-Allow-Origin", "*");
  if(req.body.answer1 != "人生" && req.body.answer2 != '丹心'){
    res.send('错误！');
  }else{
    res.send('正确！');
  }
});
// ajaxDemo-get的加载页面
app.get('/ajaxDemo-get',function(req,res){
  res.render('/ajaxDemo-get');
});
//查看答案的路由
app.get('/lookAnswer',function(req,res){
  // res.setHeader("Access-Control-Allow-Origin", "*");
  res.json({answer1:'人生',answer2:'丹心'});
});

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
