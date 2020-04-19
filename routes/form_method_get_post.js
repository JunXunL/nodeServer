const express = require('express')	//先安装,引入并加载express
const router = express.Router()

const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false }) // 创建 application/x-www-form-urlencoded 编码解析

router.get('/processGet', function (req, res) {
   res.render( "pages/process_get", { title: '表单提交GET请求' } );
})
// http://localhost:3000/process_get ，获取MongoDB库内信息
router.get('/getMethod', function (req, res) {
   // 输出 JSON 格式
   let response = {
      first_name:req.query.first_name,
      last_name:req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

router.get('/processPost', function (req, res) {
   res.render( "pages/process_post", { title: '表单提交POST请求' } );
})
router.post('/postMethod', urlencodedParser, function (req, res) {
   // 输出 JSON 格式
   let response = {
      first_name:req.body.first_name,
      last_name:req.body.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

module.exports = router