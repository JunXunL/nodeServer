# 路由和路由器
## 路由器是存储和管理路由的容器，同一模块的多个请求url（即多个路由）可以保存在一个路由器中。创建路由器的目的也是为了方便web服务器调用路由。
## 路由的三要素 —— 请求方法，请求URL和响应。请求方法分为三种：get,post以及params(参数)。
## 在路由中随着请求的数据也分为三种：
### ① get对应的请求数据的方法为： req.query 返回一个对象。
### ② post对应的请求数据的方法为： req.body 返回一个对象。
### ③ paras对应的请求数据的方法为：req.params 返回一个对象。
## 由于请求方法的不同，所以在创建路由时，也是分为三种，它们分别是：
### ① get对应的路由方法：
`
router.get('/list',(req,res)=>{
  var obj=req.query;//返回一个对象
  console.log(obj);
  res.send('用户列表');
});
`
### ② post对应的路由方法：
`
const bodyParser = require('body-parser') // 使用bodyParser解析
const urlencoded = bodyParser.urlencoded({ extended: false }) // parse application/x-www-form-urlencoded , 表单格式 , 解析POST请求方式中返回的req.body
// bodyParser.json() // parse application/json , JSON格式
router.post('/reg',urlencoded, (req, res)=>{
   var obj=req.body;//返回一个对象
   console.log(obj);
   res.send('用户注册');
 });
`
### ③ params对应的路由方法：
`
//params为参数，其中参数为:之后的名称，访问形式为/detail/lid
router.get('/detail/:lid',(req,res)=>{
  var obj=req.params;//返回一个对象
  console.log(obj);
  res.send('商品详情');
});
`

