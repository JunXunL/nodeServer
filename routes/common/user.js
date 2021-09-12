/*
 * @Descripttion: 操作用户表：注册，登录，完善用户详情，修改用户密码
 * @Author: Irene.Z
 * @Date: 2020-11-23 15:45:22
 * @LastEditTime: 2021-02-22 16:40:56
 * @FilePath: \nodeServer\routes\common\user.js
 * 【requestId: new Date() 关联日志，未完成】
 */

const express = require('express');
const router = express.Router();
// const bodyParser = require('body-parser');
// const urlencoded = bodyParser.urlencoded({extended: false});

const Empty = require('../../public/javascripts/isEmpty');

const _CryptoJS = require('../../public/javascripts/cryptoJS'); // password加密解密，第三方插件

// const mysql = require('./../../mysql/db');
//通过连接池连接数据库，这里创建连接池返回连接池对象 -- 【开始】
const pool = require('./../../mysql/createPool'); // 连接数据库（方式：连接池）
//通过连接池连接数据库，这里创建连接池返回连接池对象 -- 【结束】
const UserObj = require('./../../mysql/modle/user'); // 实体类

// jwt生成token
const jwt = require("jsonwebtoken"); // node生成token，第三方插件
const { PRIVITE_KEY, EXPIRESD } = require("../../public/javascripts/jwt-secret");

router.post('/get', (req, res) => {
  const {body, session} = req;
  const {account, pass, email, security} = body;
  console.log("body---------", body);
  if (Empty.isEmpty(body)) {
    res.json({
      code: "2",
      message: "error",
      requestId: new Date(),
      success: false,
      content: "服务器未获取到数据"
    })
  } else {
    // 后端session中保存的验证码  ！=  前端传回的验证码
    if(session.captcha.toLowerCase() != security.toLowerCase()){
      res.json({
        code: "1",
        message: "false",
        requestId: new Date(),
        success: true,
        content: "验证码不正确"
      });
      console.log("security:", result)
    }else{
      const param = [account, email]; // sql的query语句含有多个占位符?，使用数组
      UserObj.getUserByAccount(pool, param).then((result) => {
        console.log("get:", result)
        if (result.length > 0) {
          let userTB = JSON.parse(JSON.stringify(result));
          if (userTB[0].password != _CryptoJS.decrypt(pass.toString())) {
            res.json({
              code: "1",
              message: "false",
              requestId: new Date(),
              success: true,
              content: "密码不正确"
            })
          } else {
            console.log("get-----------  3")
            // 在客户端发起登录请求时，将token发送回给客户端，让它每次再发起请求时都携带token。
            //jwt.sign()方法可生成token，第一个参数写的用户信息进去（可以写其他的），第二个是秘钥，第三个是过期时间
            let token = jwt.sign({ account }, PRIVITE_KEY, { expiresIn: EXPIRESD }); // 生成token
            res.json({
              code: "0",
              message: "success",
              requestId: new Date(),
              success: true,
              content: { token }
            })
          }
        } else {
          console.log("get-----------  4")
          res.json({
            code: "1",
            message: "false",
            requestId: new Date(),
            success: true,
            content: "账号不存在"
          })
        }
      }).catch((error) => {
        console.log("get-----------  5")
        console.log("get", error)
        res.json({
          code: "2",
          message: "error",
          requestId: new Date(),
          success: false,
          content: "保存用户信息失败"
        })
      })
    }
  }
  // let data = {}
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
  console.log("用户注册信息：", reqBody);
  if (Empty.isEmpty(reqBody)) {
    res.json({
      code: "2",
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
      console.log('添加用户信息，成功：', result);
      res.json({
        code: "0",
        message: "success",
        requestId: new Date(),
        success: true,
        content: null
      })
    }).catch(function (err) {
      console.log('添加用户信息，失败：', err);
      res.json({
        code: "2",
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