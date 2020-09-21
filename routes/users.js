var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false }) // 创建 application/x-www-form-urlencoded 编码解析
const UserMain = require('../mongodb/modle/u_user_main')

/**
 * Express 模板传值对象app.locals、res.locals
 * locals是Express应用中 Application(app)对象和Response(res)对象中的属性，该属性是一个对象。该对象的主要作用是，将值传递到所渲染的模板中。
 * locals对象会被传递到页面，在模板中可以直接引用该对象的属性，也可以通过该对象引用。如：<%= name %>属性同样可以通过<%= locals.name %>来引用。
 * 
 * app.locals与res.locals
 * locals可能存在于app对象中即：app.locals；也可能存在于res对象中，即：res.locals。
 * 两者都会将该对象传递至所渲染的页面中。
 * 不同的是，app.locals会在整个生命周期中起作用；而res.locals只会有当前请求中起作用。
 * 由于app.locals在当前应用所有的渲染模中访问，这样我们就可以在该对象中定义一些顶级/全局的数据，并在渲染模板中使用。
*/
router.post('/login', urlencodedParser, function(req, res) {
  UserMain.findById({u_name: req.body.userName, u_pwd: req.body.passWord}, function (err, data) {
    console.log(data)
    res.redirect('/users/show')
  })
});

// 插入数据
router.post('/add', urlencodedParser, (req, res) => {
  let data = {
    "u_name": req.body.userName,
    "u_pwd": req.body.passWord
  }
  UserMain.insertMany(data).then((result)=>{
    console.log(result) // mongodb返回保存的对象
    // res.locals的生命周期是单次请求，有点类似于java servlet 里的  httpServletRequest.setAttribute("param1",1);
    // 既然有单次请求的，也有全局使用的 app.locals ，粗略查了一下，应该类似于servlet里的 application.setAttribute("param1", 1);
    UserMain.find().then((data)=>{
      console.log(data)
      // res.locals.title = '用户信息列表';
      res.render( "pages/user/userList", { list: data });
    })
  }).catch((err)=>{
    res.send({err:-1, msg:'insert error'})
  })
})

// 返回列表数据
router.get("/show", function(req, res, next) {
  UserMain.find().then((data)=>{
    console.log("------------------------")
    console.log(data)
    res.locals.title = "已注册用户列表"
    res.locals.list = data
    res.render("pages/user/userList")
  })
})

module.exports = router;
