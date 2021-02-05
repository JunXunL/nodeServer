/*
 * @Descripttion: 操作用户表：注册，登录，完善用户详情，修改用户密码
 * @Author: Irene.Z
 * @Date: 2020-11-23 15:45:22
 * @LastEditTime: 2021-02-05 10:27:38
 * @FilePath: \nodeServer\routes\common\user.js
 * 【requestId: new Date() 关联日志，未完成】
 */

const express = require('express');
const router = express.Router();
// const bodyParser = require('body-parser');
// const urlencoded = bodyParser.urlencoded({extended: false});

const Empty = require('../../public/javascripts/isEmpty')

// const mysql = require('./../../mysql/db');
//通过连接池连接数据库，这里创建连接池返回连接池对象 -- 【开始】
const pool = require('./../../mysql/createPool'); // 连接数据库（方式：连接池）
//通过连接池连接数据库，这里创建连接池返回连接池对象 -- 【结束】
const UserObj = require('./../../mysql/modle/user');

// const addSqlParams = ['菜鸟', 18, 'https://c.xxrunoob.com']; // 这是想增加的数据

router.post('/get', (req, res) => {
  const reqBody = req.body;
  console.log("/users/add:  ", reqBody);
  let data = {}
  // mysql.query(UserObj.selectAll, (err, result) => {
  //   if(err){
  //     res.json({
  //       code: "1",
  //       message: "error",
  //       requestId: new Date().getTime(),
  //       success: false,
  //       content: null
  //     })
  //     console.log("查询用户信息，执行失败：", err)
  //   }
  //   if(result){
  //     data = JSON.parse(JSON.stringify(result))[0]
  //     res.json({
  //       code: "0",
  //       message: "success",
  //       requestId: new Date().getTime(),
  //       success: true,
  //       content: data
  //     })
  //   }
  // })
})

router.post('/add', (req, res) => {
  // req.body 或 req.params
  const reqBody = req.body;
  if (Empty.isEmpty(reqBody)) {
    res.json({
      "code": "1"
    })
  } else {
    const param = {
      name: reqBody.name,
      password: reqBody.pass, // 确保字段名称与数据库内的名称相同
      email: reqBody.email,
      phone: reqBody.phone
    }
    // 写入数据，方式一
    // mysql.query(UserObj.insertSql, Object.values(param), function (err, result) {
    //   if (err) { // 操作失败报错
    //     console.log('[SELECT ERROR]:', err.message);
    //   }
    //   if (result != undefined) {
    //     res.json({code: "0", content: JSON.parse(JSON.stringify(result))})
    //   }
    // });
    // 写入数据，方式二
    // mysql.query(UserObj.insertSqlAll, param, function (err, result) {
    //   if (err) { // 操作失败报错
    //     console.log('[SELECT ERROR]:', err.message);
    //   }
    //   if (result != undefined) {
    //     // JSON.parse(JSON.stringify(result))
    //     res.json({
    //       code: "0",
    //       message: "success",
    //       requestId: new Date(),
    //       success: true,
    //       content: null
    //     })
    //   }
    // });
    // mysql.end();

    UserObj.add(pool, param).then(function (result) {
      res.json({
        code: "0",
        message: "success",
        requestId: new Date(),
        success: true,
        content: null
      })
    }).catch(function (err) {
      res.json({
        code: "1",
        message: "error",
        requestId: new Date(),
        success: false,
        content: null
      })
    })
  }
});

router.post('/update', (req, res) => {
  res.json({})
})

router.get('/getCount',function (req,response) {
  UserObj.getCount(pool).then(function (res) {
    response.send(res)
  }).catch(function (res) {
    response.send(res)
  })
})

module.exports = router;