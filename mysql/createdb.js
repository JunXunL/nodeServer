/*
 * @Descripttion: 创建数据库： nodeserverdb
 * @Author: Irene.Z
 * @Date: 2020-11-05 15:09:11
 * @LastEditTime: 2021-02-03 14:23:10
 * @FilePath: \nodeServer\mysql\createdb.js
 */

const mysql = require("mysql");
/**
 * 基本连接mysql方式：
 * 该方式只用了host，user，password，port，database这4个端口。
 * 通过mysql模块的createConnection()来创建一个数据库连接（注意只是创建了，还没有连接）；
 * 然后通过createConnection()返回对象的connect()方法进行数据库连接，通过query()方法进行数据库操作，end()方法关闭数据库；
 * 通过destory()方法也可以关闭数据库，不过没有回调函数，直接关闭；
 */
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port: '3306'
// charset：连接字符集（默认：'UTF8_GENERAL_CI'，注意字符集的字母都要大写）
// localAddress：此IP用于TCP连接（可选）
// socketPath：连接到unix域路径，当使用 host 和port 时会被忽略
// timezone：时区（默认：'local'）
// connectTimeout：连接超时（默认：不限制；单位：毫秒）
// stringifyObjects：是否序列化对象（默认：'false' ；与安全相关）
// typeCast：是否将列值转化为本地JavaScript类型值 （默认：true）
// queryFormat：自定义query语句格式化方法
// supportBigNumbers：数据库支持bigint或decimal类型列时，需要设此option为true （默认：false）
// bigNumberStrings：supportBigNumbers和bigNumberStrings启用 强制bigint或decimal列以JavaScript字符串类型返回（默认：false）
// dateStrings：强制timestamp,datetime,data类型以字符串类型返回，而不是JavaScriptDate类型（默认：false）
// debug：开启调试（默认：false）
// multipleStatements：是否许一个query中有多个MySQL语句 （默认：false）
// flags：用于修改连接标志
// ssl：使用ssl参数（与crypto.createCredenitals参数格式一至）或一个包含ssl配置文件名称的字符串，目前只捆绑Amazon RDS的配置文件
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

