var express = require('express');
var router = express.Router();

/* GET views/index.html */
router.get('/', function(req, res, next) {
  res.render('index', { title: '首页' }); // 项目启动，默认http://localhost:3000
});

module.exports = router;
