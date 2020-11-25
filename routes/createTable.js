/*
 * @Descripttion: 创建数据库中所有表结构，及表间关系
 * @Author: Irene.Z
 * @Date: 2020-11-24 13:27:35
 * @LastEditTime: 2020-11-25 16:22:34
 * @FilePath: \nodeServer\routes\createTable.js
 */

const express = require('express');
const router = express.Router();

const mysql = require('../mysql/db'); // 引入数据库配置文件，链接数据库

// 引入实体对象
const UserSql = require('../mysql/modle/user');
const NavigationSql = require('../mysql/modle/navigation');

// 
router.get('/createTable', (req, res) => {
  /**
   * 简介：创建USER-MAIN对象 - USER-MAIN表实体
   * 详情：保存前后端所有用户的注册（主体）信息
   */
  mysql.query(UserSql.createSql, function (err, result) {
    if (err) { // 操作失败报错
      console.log('[CREATE TABLE ERROR]:', err.message);
    }
    // console.log(result); //数据库查询结果返回到result中
    console.log("========================================================================");
    console.log("MySQL [name: nodeserverdb] database create table [u_user_main] is success......");
    console.log("========================================================================");
  });

  // 创建NAVIGATION-MAIN对象 - NAVIGATION-MAIN表实体
  /**
   * 简介：创建NAVIGATION-MAIN对象 - NAVIGATION-MAIN表实体
   * 详情：保存前后端所有菜单的（主体）信息
   */
  mysql.query(NavigationSql.createSql, function (err, result) {
    if (err) { // 操作失败报错
      console.log('[CREATE TABLE ERROR]:', err.message);
    }
    console.log("========================================================================");
    console.log("MySQL [name: nodeserverdb] database create table [u_navigation_main] is success......");
    console.log("========================================================================");
  });
  mysql.end();
});

module.exports = router;