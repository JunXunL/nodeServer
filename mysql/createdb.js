/*
 * @Descripttion: 创建数据库： nodeserverdb
 * @Author: Irene.Z
 * @Date: 2020-11-05 15:09:11
 * @LastEditTime: 2020-11-24 17:33:01
 * @FilePath: \nodeServer\mysql\createdb.js
 */

const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port: '3306'
});

// 报错提示： Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
// 报错原因：mysql8.0以上加密方式，Node还不支持。
// 打开MySql命令行终端输入：
//    alter user 'root'@'localhost' identified with mysql_native_password by 'root';
//    flush privileges;
// flush privileges 命令本质上的作用是将当前user和privilige表中的用户信息/权限设置从mysql库(MySQL数据库的内置库)中提取到内存里。经常用在改密码和授权超用户。
db.connect((err) => {
  if(err) throw err;
  console.log("MySQL 数据库服务已启动。");
});

const createSql = "create database nodeserverdb default character set utf8 default collate utf8_general_ci";
db.query(createSql, (err, results) => {
  if(err) {
    console.log("========================================================================")
    console.log(err);
    console.log("MySQL [name: nodeserverdb] database create failt ......");
    console.log("========================================================================")
  } else {
    console.log("========================================================================")
    console.log(results);
    console.log("MySQL [name: nodeserverdb] database create success ......");
    console.log("========================================================================")
  }
});
db.end();

