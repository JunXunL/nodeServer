/*
 * @Descripttion: 创建数据库中所有表结构，及表间关系
 * @Author: Irene.Z
 * @Date: 2020-11-24 13:27:35
 * @LastEditTime: 2020-11-25 15:12:41
 * @FilePath: \nodeServer\routes\createTable.js
 */

const express = require('express');
const router = express.Router();

const mysql = require('../mysql/db'); // 引入数据库配置文件，链接数据库
const UserSql = require('../mysql/modle/user'); // 引入实体对象

// 创建USER-MAIN对象 - USER-MAIN表实体
router.get('/createTable', (req, res) => {
  // 
  mysql.query(UserSql.createSql, function (err, result) {
    if (err) { // 操作失败报错
      console.log('[CREATE TABLE ERROR]:', err.message);
    }
    // console.log(result); //数据库查询结果返回到result中
    console.log("========================================================================");
    console.log("MySQL [name: nodeserverdb] database create table [u_user_main] is success......");
    console.log("========================================================================");
  });
});

module.exports = router;