/*
 * @Descripttion: 操作用户表：注册，登录，完善用户详情，修改用户密码
 * @Author: Irene.Z
 * @Date: 2020-11-23 15:45:22
 * @LastEditTime: 2021-01-19 23:46:22
 * @FilePath: \nodeServer\routes\common\user.js
 */

const express = require('express');
const router = express.Router();
// const bodyParser = require('body-parser');
// const urlencoded = bodyParser.urlencoded({extended: false});

const Empty = require('../../public/javascripts/isEmpty')

const mysql = require('./../../mysql/db');
const userSql = require('./../../mysql/modle/user');

// const addSqlParams = ['菜鸟', 18, 'https://c.xxrunoob.com']; // 这是想增加的数据

router.post('/get', (req, res) => {
  const reqBody = req.body;
  console.log("/users/add:  ", reqBody);
  let data = {}
  mysql.query(userSql.selectAll, (err, result) => {
    if(err){
      res.json({
        status: "0",
        content: data
      })
      console.log("查询用户信息，执行失败：", err)
    }
    if(result){
      data = JSON.parse(JSON.stringify(result))[0]
      res.json({
        status: "1",
        content: data
      })
    }
  })
})

router.post('/add', (req, res) => {
  // req.body 或 req.params
  const reqBody = req.body;
  if (Empty.isEmpty(reqBody)) {
    res.json({"code": "0"})
  } else {
    const param = {
      name: reqBody.name,
      password: reqBody.pass,
      phone: '',
      email: reqBody.email
    }
    // 写入数据
    mysql.query(userSql.insertSql, param, function (err, result) {
      if (err) { // 操作失败报错
        console.log('[SELECT ERROR]:', err.message);
      }
      if (result != undefined) {
        res.json({status: "1", content: JSON.parse(JSON.stringify(result))})
      }
    });
    mysql.end();
  }
});

router.post('/update', (req, res) => {
  res.json({})
})

module.exports = router;