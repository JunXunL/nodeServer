/*
 * @Descripttion: 统一处理页面返回的菜单项目
 * @Author: Irene.Z
 * @Date: 2020-11-23 15:46:38
 * @LastEditTime: 2020-11-23 18:03:15
 * @FilePath: \nodeServer\routes\common\navigation.js
 */

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlEncoded = bodyParser.urlencoded({extended: false})

/**
 * msg: 根据登录用户权限展示页面菜单入口
 * param: 
 * return:
 */
router.post('/mainNav', urlEncoded, (req, res, next) => {
  const requsetBody = req.body;
  console.log(requsetBody)
  // 建数据库链接，建表结构，数据，返回数据
  // 根据用户权限返回
})


