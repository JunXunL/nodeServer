// 上传文件的练习
const express = require('express')
const router = express.Router()
const fs = require("fs");

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

// 上传文件成功
router.post('/file_upload', function (req, res) {
  // console.log(req.files);  // 上传的文件信息
  var files = req.files[0];
  var des_file = "public/tmp/image/" + files.originalname; // 上传文件存放位置，拼接上，文件名称
  fs.readFile( files.path, function (err, data) {
    fs.writeFile(des_file, data, function (err) {
      let response
      if( err ){
        console.log( err );
      }else{
        // 输出 JSON 格式
        response = {
          message:'File uploaded successfully', 
          filename:files.originalname
        };

      }
      console.log(response);
      res.end(JSON.stringify(response));
    });
  });
})

module.exports = router;