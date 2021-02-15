/*
 * @Descripttion: 操作用户表：注册，登录，完善用户详情，修改用户密码
 * @Author: Irene.Z
 * @Date: 2020-11-23 15:45:22
 * @LastEditTime: 2021-02-16 03:42:16
 * @FilePath: \nodeServer\routes\common\user.js
 * 【requestId: new Date() 关联日志，未完成】
 */

const express = require('express');
const router = express.Router();
// const bodyParser = require('body-parser');
// const urlencoded = bodyParser.urlencoded({extended: false});

const Empty = require('../../public/javascripts/isEmpty');
const _CryptoJS = require('../../public/javascripts/cryptoJS');

// const mysql = require('./../../mysql/db');
//通过连接池连接数据库，这里创建连接池返回连接池对象 -- 【开始】
const pool = require('./../../mysql/createPool'); // 连接数据库（方式：连接池）
//通过连接池连接数据库，这里创建连接池返回连接池对象 -- 【结束】
const UserObj = require('./../../mysql/modle/user'); // 实体类

// const addSqlParams = ['菜鸟', 18, 'https://c.xxrunoob.com']; // 这是想增加的数据

router.post('/get', (req, res) => {
  const {body, session} = req;
  const {account, pass, security} = body;
  console.log("body---------", body);
  if (Empty.isEmpty(body)) {
    req.json({
      code: "1",
      message: "error",
      requestId: new Date(),
      success: false,
      content: "服务器未获取到数据"
    })
  } else {
    if(session.captcha.toLowerCase() != security.toLowerCase()){
      req.json({
        code: "0",
        message: "false",
        requestId: new Date(),
        success: true,
        content: "验证码不正确"
      });
    }else{
      // const pass = reqBody.pass;
      const param = [account, account]; // sql的query语句含有多个占位符?，使用数组
      UserObj.getUserByAccount(pool, param).then((result) => {
        console.log("get:", result)
        if (result.length > 0) {
          if (result[0].password != _CryptoJS.decrypt(pass.toString())) {
            res.json({
              code: "0",
              message: "false",
              requestId: new Date(),
              success: true,
              content: "密码不正确"
            })
          } else {
            res.json({
              code: "0",
              message: "success",
              requestId: new Date(),
              success: true,
              content: null
            })
          }
        } else {
          res.json({
            code: "0",
            message: "false",
            requestId: new Date(),
            success: true,
            content: "账号不存在"
          })
        }
      }).catch((error) => {
        console.log("get", error)
      })
    }
  }
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
      code: "1",
      message: "error",
      requestId: new Date(),
      success: false,
      content: "服务器未获取到数据"
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
        content: "保存用户信息失败"
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