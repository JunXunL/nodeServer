const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port: '3306',
  database: "nodeserverdb" // 创建数据库后，直接使用db.js
});

// 报错提示： Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
// 报错原因：mysql8.0以上加密方式，Node还不支持。
// 打开MySql命令行终端输入：
//    alter user 'root'@'localhost' identified with mysql_native_password by 'root';
//    flush privileges;
// flush privileges 命令本质上的作用是将当前user和privilige表中的用户信息/权限设置从mysql库(MySQL数据库的内置库)中提取到内存里。经常用在改密码和授权超用户。
db.connect((err) => {
  if(err) throw err;
  console.log("MySQL 数据库连接成功。");
});

exports.db = db
