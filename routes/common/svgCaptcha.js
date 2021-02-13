/*
 * @Descripttion: svg-captcha验证码，使用方法
 * @Author: Irene.Z
 * @Date: 2021-02-14 01:31:58
 * @LastEditTime: 2021-02-14 01:42:42
 * @FilePath: \nodeServer\public\javascripts\svgCaptcha.js
 */
// 进行测试发现没有返回值，排查错误后发现是没有注册session中间件，svg-captcha依赖session存储验证码信息！！！
const express = require('express');
const svgCaptcha = require('svg-captcha');
const router = express.Router();
router.get('/',(req, res)=>{
  const cap = svgCaptcha.create({
    // 翻转颜色
    inverse: false,
    // 字体大小
    fontSize: 36,
    // 噪声线条数
    noise: 3,
    // 宽度
    width: 80,
    // 高度
    height: 30,
  });
  req.session.captcha = cap.text; // session 存储验证码数值
  console.log(req.session)
  res.type('svg'); // 响应的类型
  res.send(cap.data)
})
 
module.exports = router;