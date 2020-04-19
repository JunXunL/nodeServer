// Ajax 请求练习
const express = require('express')
const router = express.Router()

// ajaxDemo-post的加载页面
// 项目启动，http://localhost:3000/ajaxDemo/index，打开views下的ajaxDemo-post.html页面
router.get('/index', function(req, res){ // 设置路由名称
  res.render('ajaxDemo'); // 加载模板文件
})
// 检查答案的路由
router.post('/checkAnswer', function(req,res){
  // 利用cors解决跨越问题
  // res.setHeader("Access-Control-Allow-Origin", "*");
  if(req.body.answer1 != "人生" && req.body.answer2 != '丹心'){
    res.send('错误！');
  }else{
    res.send('正确！');
  }
});
//查看答案的路由
router.get('/lookAnswer',function(req,res){
  // res.setHeader("Access-Control-Allow-Origin", "*");
  res.json({answer1:'人生',answer2:'丹心'});
});

module.exports = router
