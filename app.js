const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const session = require("express-session");
// const bodyParser = require('body-parser')

//引入数据配置文件,即连接数据
const mongodb = require('./mongodb/config_db')

// 引入route模块
const indexRouter = require('./routes/index');
const ajaxDemoRouter = require('./routes/ajaxDemo'); // 用ajax，练习GET/POST请求方式
const formMethodRouter = require('./routes/form_method_get_post') // 用表单提交方式，练习GET/POST请求方式
const uploadFileRouter = require('./routes/uploadFile'); // 上传文件练习
const usersRouter = require('./routes/users');
const testMongoRouter = require('./routes/testMongoDB')// 服装管理, 路由

const app = express();
app.set('views', path.join(__dirname, 'views'));
// var ejs = require('ejs');  // -1.新引入的ejs插件
app.engine('.html', require('ejs').renderFile); // -2.设置html引擎
app.set('view engine', 'html'); // -3.设置视图引擎，为html

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter); //  项目启动，默认http://localhost:3000 访问views/index.html，测试路由配置成功
app.use('/ajaxDemo', ajaxDemoRouter)
app.use('/formMethod', formMethodRouter)
app.use('/fileUpload', uploadFileRouter)
app.use('/users', usersRouter);
app.use('/testMongo', testMongoRouter)
// app.use('/mclothes', m_clother_rt)

//配置session中间件
// app.use(session({
//   secret:"keyboard cat",
//   resave:false,
//   saveUninitialized:true,
//   cookie:{maxAge:1000*60*30},
//   rolling:true
// }));

// 使用bodyParser解析以下格式
// app.use(bodyParser.urlencoded({ extended: false }))// parse application/x-www-form-urlencoded , 表单格式 , 解析POST请求方式中返回的req.body
// app.use(bodyParser.json())// parse application/json , JSON格式
// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain') // 纯文本格式
//   res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// })

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
