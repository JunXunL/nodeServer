/*
 * @Descripttion: base64url编码：签发 、解析
 * @Author: Irene.Z
 * @Date: 2021-02-21 23:43:09
 * @LastEditTime: 2021-06-16 17:06:26
 * @FilePath: \nodeServer\public\javascripts\jwt-util.js
 */
const jwt = require('jsonwebtoken');
const { PRIVITE_KEY, EXPIRESD} = require('./jwt-secret');

//生成jwt
export function createToken(param) {
  const token = jwt.sign({ param }, PRIVITE_KEY, { EXPIRESD });
  return token;
}

//解析jwt
export function verifyToken(token) {
  // 在实际项目中必须要对jwt.verify进行try catch捕捉错误，因为如果token过期或者无效会直接抛出错误。
  return jwt.verify(token, PRIVITE_KEY);
}

//计算剩余时间
export function tokenExp(token) {
  let verify = verifyToken(token);
  let time = parseInt((new Date().getTime()) / 1000);
  return `剩余${verify.exp - time}秒`
}

// let token = createToken(1);
// console.log(token);                //输出token
// console.log(verifyToken(token));   //输出token内容
// tokenExp(token);                   //输出token剩余时间
