var express = require('express');
var router = express.Router();

/* GET views/index.html */
router.get('/', function(req, res, next) {
  res.render('index', { title: '首页' }); //  项目启动，默认http://localhost:3000 访问views/index.html，测试路由配置成功
});

module.exports = router;
