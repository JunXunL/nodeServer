/*
 * @Descripttion: 
 * @Author: Irene.Z
 * @Date: 2020-11-24 10:24:41
 * @LastEditTime: 2021-01-19 23:31:17
 * @FilePath: \nodeServer\mysql\modle\user.js
 */


//  【用户】主表
const userSql = {
  createSql: "CREATE TABLE u_user_main(id INT PRIMARY KEY AUTO_INCREMENT,name VARCHAR(16) NOT NULL COMMENT '姓名',password VARCHAR(20) NOT NULL,email VARCHAR(50) NOT NULL,phone VARCHAR(20) NOT NULL,create_date TIMESTAMP NULL DEFAULT now()) ENGINE=InnoDB DEFAULT CHARSET=utf8;",
  findOneSql: "SELECT * FROM u_user_main t WHERE t.phone='' OR t.email=''",
  selectAll: "SELECT * FROM u_user_main",
  // insertSql: "INSERT INTO u_user_main (name, password, email, phone) VALUES (?,?,?,?)",
  insertSql: "INSERT INTO u_user_main SET ?",
  updatedSql: (obj) => {
    return "UPDATE u_user_main set name='" + obj.name + "' and password='" + obj.password+ "' and phone='"+ obj.phone +"' and email='"+ obj.email +"' where id='" + obj.id + "'";
  }
}

// const sql2 = "CREATE UNIQUE INDEX t_quiz_IDX_0 on t_user(name);" // 新建索引

// (1)错误导出方式： module.exports.UserSql; // const UserSql = require('../mysql/modle/user'); // UserSql对象是：{}
// (2)不合理导出方式： module.exports.UserSql = UserSql; // // const UserSql = require('../mysql/modle/user'); // UserSql对象是：{UserSql:{...}}
module.exports = userSql; // 输出userSql对象