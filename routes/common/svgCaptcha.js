/*
 * @Descripttion: svg-captcha验证码，使用方法
 * @Author: Irene.Z
 * @Date: 2021-02-14 01:31:58
 * @LastEditTime: 2021-02-16 01:17:02
 * @FilePath: \nodeServer\routes\common\svgCaptcha.js
 */
// 进行测试发现没有返回值，排查错误后发现是没有注册session中间件，svg-captcha依赖session存储验证码信息！！！
const express = require('express');
const router = express.Router();
const svgCaptcha = require('svg-captcha');

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
  /**
   * 用后端产生动态安全码之后可以立即缓存起来，同时传输给前端（这个过程可以前端发起请求）。
   * 前端按上述步骤对用户密码进行加密，将数据送回后端。
   * 后端检查 secure_key 在缓存中，取出来计算用于验证的 hmac_result（my_password和secure_key，计算HMAC，得出hmac_result），同时从缓存中删除 secure_key；
   * 如果 secure_key 不在缓存中，直接拒绝验证。
   * 
   * HMAC是密钥相关的哈希运算消息认证码（Hash-based Message Authentication Code）的缩写。
   */
  req.session.captcha = cap.text; // session 存储验证码数值
  console.log(req.session);
  res.type('svg'); // 响应的类型
  res.send(cap.data)
})
 
module.exports = router;