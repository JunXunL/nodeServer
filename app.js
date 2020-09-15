const express = require('express');
const path = require('path');
const fs = require("fs");
const url = require("url");
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const session = require("express-session");
// const bodyParser = require('body-parser')

//引入数据配置文件,即连接数据
const mongodb = require('./mongodb/config_db')

// 引入，mime类型，文件的后缀名
const mime = require('./modle/utils/mime')

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
app.engine('.html', require('ejs').renderFile); // 等同于：app.engine('.html', require('ejs').__express); // -2.设置html引擎
// app.set('views', path.join(__dirname, 'views/'));
app.set('view engine', 'html'); // -3.设置视图引擎，为html

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//将静态文件目录设置为：项目根目录+/public
// app.use(express.static(__dirname + '/public'));
//或者
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

/**
 * 为app添加方法，相当于把该方法写在http.createServer内；
 * 将HTML、css、js等文件响应给客户端
 */
app.use(function(req, res){
  let pathName = url.parse(req.url).pathname; //转换为url对象
  // 默认加载路径
  if(pathName == '/') {
    pathName = "/index.html";
  }
  let extName = path.extname(pathName); //获取文件后缀名
  fs.readFile("./../public/" + pathName, (err, data) => {
    if(err) { //出错则返回404页面
      console.log("404 Not Found!");      
      fs.readFile("views/error.html", (errorNotFound, dataNotFound) => {
        if(errorNotFound) {
          console.log(errorNotFound);
        } else {
          res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
          res.write(dataNotFound); //返回404页面
          res.end();
        }
      })
      return;
    } else {
      let ext = mime.getMime(extName); // 获取对应后缀的文件类型
      // 响应客户端，设置请求头，将文件内容发回去；通过后缀名指定mime类型
      res.writeHead(200, {"Content-Type": ext + "; charset=utf-8"});
      res.write(data); //返回请求文件
      res.end();
    }
  })
})

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

//设置跨域请求
// app.all('*',function(req, res, next){
//   //设置请求头
//   //允许所有来源访问
//   res.header('Access-Control-Allow-Origin', '*')
//   //用于判断request来自ajax还是传统请求
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With')
//   //允许访问的方式
//   res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
//   //修改程序信息与版本
//   res.header('X-Powered-By', ' 3.2.1')
//   //内容类型：如果是post请求必须指定这个属性
//   res.header('Content-Type', 'application/json;charset=utf-8')
//   next()
// })

app.listen("3001","127.0.0.1");

module.exports = app;
