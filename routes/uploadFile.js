// 上传文件的练习
const express = require('express')
const router = express.Router()
const fs = require("fs");
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false }) // 创建 application/x-www-form-urlencoded 编码解析
const Image = require("../mongodb/modle/s_images")
const Empty = require("../public/javascripts/isEmpty")

// 用于处理 multipart/form-data 类型的表单数据，它主要用于上传文件
const multer  = require('multer'); // npm install --save multer
router.use(multer({ dest: '/public/tmp/'}).array('image')); // destination

// 项目启动，http://localhost:3000/，映射到routes/index.js中，默认打开上传文件页面
router.get('/upload', (req, res)=>{
  res.render( "pages/uploadIndex", { title: '上传文件' });
})
/**
 * 下面这种请求方式，不可行，是错误的
 *  router.get('/views/pages/index.html', (req,res)=>{
 *   res.sendFile( __dirname + "/views/pages" + "index.html" );
 *  })
 */ 

// 同步创建文件目录
router.post('/newPath', urlencodedParser, (req, res) => {
  console.log(req.body)
  if((req.body != null) && (req.body.path != null)) {
    const newPath = "public/" + req.body.path; // 默认放在public下
    const arr = newPath.split("/");
    let dir = arr[0];
    let response = null;
    let result = 0;
    for(let i=1; i <= arr.length; i++) {
      if(!fs.existsSync(dir)){ // 目录是否已经存在
        result = fs.mkdirSync(dir); // 同步创建目录
      } else {
        result++;
      }
      dir = dir + '/' + arr[i];
    }
    if ((result == undefined) || (result == arr.length)) {
      response = {
        status: "1",
        message: "接口返回成功。",
        content: {
          path: newPath
        }
      }
    } else {
      response = {
        status: "0",
        message: "创建目录失败",
        content: null
      }
    }
    // res.end(JSON.stringify(response)); // 返回数据
    res.json(response); // 返回数据
  }
})

// 默认路径，上传文件
router.post('/file_upload', function (req, res) {
  // console.log(req.files);  // 上传的文件信息
  var files = req.files[0];
  var des_file = "public/tmp/image/" + files.originalname; // 上传文件存放位置，拼接上，文件名称
  fs.readFile( files.path, function (err, data) {
    fs.writeFile(des_file, data, function (err) {
      let response
      if(err){
        console.log(err);
      }else{
        // 把图片地址存入数据库
        Image.insertMany({"s_url":des_file.substr(6), "s_type": "swipe"}).then(result => {
          console.log(result) // mongodb返回保存的对象
          // 输出 JSON 格式
          response = {
            message:'File uploaded successfully', 
            filename:files.originalname
          };
          console.log(response);
          res.end(JSON.stringify(response));
        })
      }
    });
  });
})

// 选择目录，上传文件
router.post('/uploadImage', urlencodedParser, function (req, res) {
  console.log("uploadImage------------------------")
  console.log(req.files);  // 上传的文件信息
  console.log(req.body)
  if((req.body == null) || (req.files == null)) {
    res.end(JSON.stringify({message:'文件或上传目录，缺失。'}));
  }
  const files = req.files[0]; // 上传的文件信息
  const param = req.body; // 入参
  const des_file = param.newPath + "/" + files.originalname; // 上传文件存放位置，拼接上，文件名称
  fs.readFile( files.path, function (err, data) {
    fs.writeFile(des_file, data, function (err) {
      if(err) {
        console.log("图片上传发生异常。", err);
      } else {
        // 把图片地址存入数据库
        const obj = {
          "s_path": param.newPath, // 存放目录层级
          "s_url": des_file.substr(6), // 去除 public/，读取文件的url
          "s_type": param.type, // 归属分类
          "s_title":(param.title != "") ? param.title : files.originalname.slice(0, -4) // 图片标题
        }
        let response = null;
        // 异步方法
        Image.insertMany(obj).then(result => {
          // result 是数组对象
          console.log("mongoDB 保存成功。", result) // mongodb返回保存的对象
          if (!Empty.isEmpty(result)) {
            Image.find().then((data) => {
              // response = {
              //   status: 1,
              //   message: "接口返回成功。",
              //   content: data
              // };
              // console.log("mongoDB返回：", response)
              console.log(data)
              res.locals.title = "信息列表"
              res.locals.list = data
              res.render("pages/images/clothes");
            })
          }
        }).catch((err)=>{
          response = {
            status: 0,
            message: "接口异常:" + err,
            content: null
          };
        })
        
      }
    });
  });
})

router.get("/showImages/:param", (req, res)=>{
  // console.log('参数为： ' + req.params.param);
  if((req.params != null) && (req.params.param != null)) {
    Image.find({"s_type": req.params.param}).then(data => {
      // console.log(data)
      res.json({
        status: 1,
        content: data
      })
    })
  }
})
  

module.exports = router;