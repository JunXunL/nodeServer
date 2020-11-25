/*
 * @Descripttion: 创建数据库后，直接使用db.js
 * @Author: Irene.Z
 * @Date: 2020-11-05 15:04:26
 * @LastEditTime: 2020-11-25 15:05:46
 * @FilePath: \nodeServer\mysql\db.js
 */
const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port: '3306',
  database: "nodeserverdb"
});

// 报错提示： Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
// 报错原因：mysql8.0以上加密方式，Node还不支持。
// 打开MySql命令行终端输入：
//    alter user 'root'@'localhost' identified with mysql_native_password by 'root';
//    flush privileges;
// flush privileges 命令本质上的作用是将当前user和privilige表中的用户信息/权限设置从mysql库(MySQL数据库的内置库)中提取到内存里。经常用在改密码和授权超用户。
db.connect((err) => {
  if(err) throw err;
  console.log("MySQL 数据库 [nodeserverdb] 连接成功。");
});

// exports.query = function(sql, params, callback) {
//   db.connect();
  
//   db.query(sql, params, (err, data) => {
//     callback &&  callback(err, data)
//   })

//   db.end();
// }

module.exports = db;

// 查询语句
// var name = '胡聪聪'
// // 使用?表示占位，可以防止sql注入
// connect.query(`select * from user where name=?`, name, (err, result) => {
//   if (err) return console.log('错误了', err)
//   console.log(result)
// })

// 插入语句
// connect.query(
//   'insert into user (name, age, gender, content) values (?, ?, ?, ?)',
//   ['胡嘻嘻', 18, '男', '哈哈哈哈'],
//   err => {
//     if (err) return console.log('错误', err)
//     console.log('添加成功了')
//   }
// )
 
// // 方式2
// connect.query(
//   'insert into user set ?',
//   {
//     name: '胡洗洗',
//     age: 30,
//     gender: '男',
//     content: '哈哈哈'
//   },
//   (err, result) => {
//     if (err) return console.log('错误', err)
//     console.log('添加成功了', result)
//   }
// )

// 修改语句
// connect.query(
//   'update user set ? where id = ?',
//   [
//     {
//       name: '胡洗洗',
//       age: 30,
//       gender: '男',
//       content: '哈哈哈'
//     },
//     10
//   ],
//   (err, result) => {
//     if (err) return console.log('错误', err)
//     console.log('添加成功了', result)
//   }
// )

// 删除语句
// connect.query('delete from user where id = ?', [10], (err, result) => {
//   if (err) return console.log('失败', err)
//   console.log(result)
// })
