const express = require('express');
const path = require('path');
const fs = require("fs");
const url = require("url");
const createError = require('http-errors');
const cookieParser = require('cookie-parser'); // session的认证机制必须依赖cookie，同时安装cookie-parser，然后再app.js中导入这两个中间件
const session = require('express-session'); // session的认证机制必须依赖cookie，同时安装cookie-parser，然后再app.js中导入这两个中间件
const logger = require('morgan');
// const session = require("express-session");
const bodyParser = require('body-parser'); //加载body-parser，用来处理post提交过来的数据

//引入数据配置文件,即连接数据
// const createdb = require('./mysql/createdb'); // 创建mysql数据库（只需一次）：nodeserverdb
// const mysql = require('./mysql/db'); // 连接数据库（方式：基本方式）
// const pool = require('./mysql/createPool'); // 连接数据库（方式：连接池）写在各自封装的router.js中

// 引入，mime类型，文件的后缀名
const mime = require('./modle/utils/mime')

// 引入route模块
// const mySqlRouter = require('./routes/createTable');
const indexRouter = require('./routes/index');
// const uploadFileRouter = require('./routes/uploadFile'); // 上传文件练习
// const usersRouter = require('./routes/users');
const userRouter = require('./routes/common/user');

const svgRouter = require('./routes/common/svgCaptcha'); // svg-captcha验证码，使用方法

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));//这两个是和post请求有关系的
app.use(express.urlencoded({ extended: false }));//这个是和get有关系的

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // 定义cookie解析器，注意，该定义必须写在路由分配之前！！！
// 配置session中间件
app.use(session({
  secret: '12345',
  name: 'name',
  cookie: {maxAge: 1000*60},
  resave: false,
  saveUninitialized: true,
}));

// 解决跨域请求
app.all('*', function (req, res, next) {
  console.log("---------------app.all------------------")
  // 设置请求头
  res.header('Access-Control-Allow-Origin', '*');  //设置允许跨域的域名，* 代表允许任意域名跨域，允许所有来源访问
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');//允许的header类型
  // res.header('Access-Control-Allow-Headers', 'X-Requested-With') // 用于判断request来自ajax还是传统请求
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS'); // 跨域允许的请求方式
  // res.header('X-Powered-By', ' 3.2.1') // 修改程序信息与版本
  // res.header('Content-Type', 'application/json;charset=utf-8') // 内容类型：如果是post请求必须指定这个属性
  if (req.method == 'OPTIONS') {
    /**
     * 常用的返回方式有四种
     * res.json([status|body], [body])  以json的形式返回数据
     * res.render(view [, locals] [, callback])  返回对应的view和数据，此方法可以有回调函数，以处理可能出现的异常
     * res.send([body|status], [body])  返回自定义的数据，比如json或者404等状态
     * res.redirect([status,] path)  这个方法其实不是返回，而是跳转到另外一个url上
     */
    res.send(200);//让options尝试请求快速结束
  } else {
    next();
  }
});

app.set('views', path.join(__dirname, 'views'));
// var ejs = require('ejs');  // -1.新引入的ejs插件
app.engine('.html', require('ejs').renderFile); // 等同于：app.engine('.html', require('ejs').__express); // -2.设置html引擎
// app.set('views', path.join(__dirname, 'views/'));
app.set('view engine', 'html'); // -3.设置视图引擎，为html

//将静态文件目录设置为：项目根目录+/public
// app.use(express.static(__dirname + '/public'));
//或者
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter); //  项目启动，默认http://localhost:3000 访问views/index.html，测试路由配置成功

// app.use('/mySqlRouter', mySqlRouter);
// app.use('/fileUpload', uploadFileRouter);
// app.use('/users', usersRouter);

app.use('/user', userRouter);

app.use('/svg', svgRouter); // 进行测试发现没有返回值，排查错误后发现是没有注册session中间件，svg-captcha依赖session存储验证码信息！！！

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
  res.setHeader("Content-type","application/json")
  // res.header(200, {'Content-Type': 'text/html; charset=utf-8'});
  console.log("-------------1--------------------")
  let pathName = url.parse(req.url).pathname; //转换为url对象
  // 默认加载路径
  if(pathName == '/') {
    pathName = "/index.html";
  }
  let extName = path.extname(pathName); //获取文件后缀名
  fs.readFile("./../public/" + pathName, (err, data) => {
    if(err) { //出错则返回404页面
      console.log(pathName + " 404 Not Found!");
      fs.readFile("views/error.html", (errorNotFound, dataNotFound) => {
        if(errorNotFound) {
          console.log(errorNotFound);
        } else {
          // response.writeHead(响应状态码，响应头对象): 发送一个响应头给请求。
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
  console.log("---------------2------------------")
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log("----------------3-----------------")
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen("3001","127.0.0.1");

module.exports = app;
