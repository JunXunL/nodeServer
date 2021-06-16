/*
 * @Descripttion: JWT (JSON Web Token) 跨越认证的JWT解决方案
 * @Author: Irene.Z
 * @Date: 2021-02-21 18:42:00
 * @LastEditTime: 2021-06-16 17:05:39
 * @FilePath: \nodeServer\public\javascripts\jwt-secret.js
 */
// 在公共文件中定义一个秘钥和过期时间（单位是秒）
module.exports = {
  "PRIVITE_KEY":"asldkhfdshfsakhd",   // 自定义的，用于生成秘钥的随机字符串
  "EXPIRESD":60*60*24                 //时效 (秒)
}
