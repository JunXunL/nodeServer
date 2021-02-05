/*
 * @Descripttion: pool连接池进行数据库连接
 * @Author: Irene.Z
 * @Date: 2021-02-03 14:25:39
 * @LastEditTime: 2021-02-04 11:24:23
 * @FilePath: \nodeServer\mysql\createPool.js
 */

let mysql = require("mysql");

const db_config = {
  host:"localhost",
  user:"root",
  password:"root",
  port:"3306",
  database: "nodeserverdb"
}
/**
 * 通过连接池createPool()方法连接数据库的方式与通过createConnection()方法用法一致；
 * 然后通过getConnection()方法来对数据库进行连接，release()释放连接池中的数据库连接，注意只是单纯的释放并没有关闭，如果有下次对数据库的访问还是会用上的；
 * pool.end()方法是关闭连接池，完全关闭可以理解为对数据库的完全关闭；
 */
let pool = mysql.createPool(db_config);

// 测试方法：查询u_user_main表数据
// pool.getConnection(function(err,connect) { // 通过getConnection()方法进行数据库连接
//   if (err) {
//     console.log(`mysql链接失败${err}`);
//   } else {
//     connect.query('select * from u_user_main',function(err,result){
//       if (err) {
//         console.log(`SQL error:${err}`)
//       } else {
//         console.log('测试，查询u_user_main表数据：', result);
//         connect.release();//释放连接池中的数据库连接
//         pool.end();//关闭连接池 【关闭就无法再次请求连接池了】
//         console.log('====== 连接池测试成功，已释放、关闭连接池连接 ======');
//       }
//     });
//   }
// });

module.exports = pool;