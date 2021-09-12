/*
 * @Descripttion: 
 * @Author: Irene.Z
 * @Date: 2020-11-24 10:24:41
 * @LastEditTime: 2021-02-14 01:04:24
 * @FilePath: \nodeServer\mysql\modle\user.js
 */


//  【用户】主表
const userSql = {
  createSql: "CREATE TABLE u_user_main(id INT PRIMARY KEY AUTO_INCREMENT,name VARCHAR(16) NOT NULL COMMENT '姓名',password VARCHAR(20) NOT NULL,email VARCHAR(50) NOT NULL,phone VARCHAR(20) NOT NULL,create_date TIMESTAMP NULL DEFAULT now()) ENGINE=InnoDB DEFAULT CHARSET=utf8;",
  findOneSql: "SELECT * FROM u_user_main t WHERE t.name=? OR t.email=?",
  selectAll: "SELECT * FROM u_user_main",
  insertSql: "INSERT INTO u_user_main (name, password, email, phone) VALUES (?,?,?,?)",
  insertSqlAll: "INSERT INTO u_user_main SET ?",
  updatedSql: (obj) => {
    return "UPDATE u_user_main set name='" + obj.name + "' and password='" + obj.password+ "' and phone='"+ obj.phone +"' and email='"+ obj.email +"' where id='" + obj.id + "'";
  }
}


let UserObj = {};
UserObj.getCount = function(pool) {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function(err, connection) {
      connection.query('select count(*) as count from u_user_main',function (error, results, fields) {
        if (error) {
          reject(error)
        } else {
          resolve(results)
        };
        console.log('The u_user_main results:',results);
        connection.release();
      })
    })
  })
}

UserObj.add = function(pool, param) {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function(err, connection) {
      connection.query(userSql.insertSqlAll, param, function (error, result) {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
        connection.release();
      });
    })
  })
}

UserObj.getUserByAccount = function(pool, param) {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function(err, connection) {
      connection.query(userSql.findOneSql, param, (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
        connection.release();
      })
    })
  })
}

// 插入语句
// 方式1
// connect.query('insert into user (name, age, gender, content) values (?, ?, ?, ?)',['胡嘻嘻', 18, '男', '哈哈哈哈'],
//   err => {
//     if (err) return console.log('错误', err)
//     console.log('添加成功了')
//   }
// )
 
// // 方式2
// connect.query('insert into user set ?',
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

// const sql2 = "CREATE UNIQUE INDEX t_quiz_IDX_0 on t_user(name);" // 新建索引

// (1)错误导出方式： module.exports.UserSql; // const UserSql = require('../mysql/modle/user'); // UserSql对象是：{}
// (2)不合理导出方式： module.exports.UserSql = UserSql; // // const UserSql = require('../mysql/modle/user'); // UserSql对象是：{UserSql:{...}}
module.exports = UserObj; // 输出userSql对象