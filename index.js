const express = require('express')	//先安装,引入并加载express
const fs = require("fs");
const bodyParser = require('body-parser')
// 用于处理 multipart/form-data 类型的表单数据，它主要用于上传文件
var multer  = require('multer'); // npm install --save multer
const mongodb = require('./mongodb/config_db')//引入数据配置文件,即连接数据

const app = express()	//1.创建一个app对象（类似于server的对象）

app.use(express.static('views/pages'))
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/views/pages/process_get.html', function (req, res) {
   res.sendFile( __dirname + "/views/pages" + "success.html" );
})
// http://localhost:3000/process_get ，获取MongoDB库内信息
app.get('/process_get', function (req, res) {
   // 输出 JSON 格式
   response = {
      first_name:req.query.first_name,
      last_name:req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

app.get('/views/pages/process_post.html', function (req, res) {
   res.sendFile( __dirname + "/views/pages" + "success.html" );
})
app.post('/process_post', urlencodedParser, function (req, res) {
   // 输出 JSON 格式
   response = {
      first_name:req.body.first_name,
      last_name:req.body.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

app.use(express.static('public'));
app.use(multer({ dest: '/tmp/'}).array('image')); // destination

const m_clother_rt = require('./router/manage_clothes_router')// 服装管理, 路由

// 使用bodyParser解析以下格式
// app.use(bodyParser.urlencoded({ extended: false }))// parse application/x-www-form-urlencoded , 表单格式 , 解析POST请求方式中返回的req.body
// app.use(bodyParser.json())// parse application/json , JSON格式
// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain') // 纯文本格式
//   res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// })

app.use('/mclothes', m_clother_rt)
// ---------------------------------以下是上传文件的练习------------------------------------------------
// 项目启动，http://localhost:3000/，映射到routes/index.js中，默认打开上传文件页面
app.get('/views/pages/index.html', function (req, res) {
   res.sendFile( __dirname + "/views/pages" + "index.html" );
})
// 上传文件成功
app.post('/file_upload', function (req, res) {
   console.log(req.files[0]);  // 上传的文件信息

   var des_file = __dirname + "/public/tmp/image/" + req.files[0].originalname; // 上传文件存放位置，拼接上，文件名称
   fs.readFile( req.files[0].path, function (err, data) {
      fs.writeFile(des_file, data, function (err) {
         if( err ){
            console.log( err );
         }else{
            response = {
               message:'File uploaded successfully', 
               filename:req.files[0].originalname
            };
          }
          console.log( response );
          res.end( JSON.stringify( response ) );
      });
   });
})


/* // 测试,与vue.js前端服务连接
app.get('/', (req, res)=>{
	console.log('------------/-------------')
	res.send('Irene.Z')
}) */


/* // 在没有使用express的Router之前,使用app完成请求操作 - 注册路由（这里只能监听get方法和根目录）
app.get('/one', function (req, res) {
    res.send('indexPage');
}) */

//启动服务
app.listen(3000,()=>{
	console.log('node server is start. http://localhost:3000');
})

