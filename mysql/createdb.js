const mysql = require("./db");

// const useSql = "use nodeserverdb";
// mysql.db.query(useSql, (err, results) => {
//   if(err) {
//     flag = false;
//     console.log("========================================================================");
//     console.log(err);
//     console.log("MySQL [name: nodeserverdb] database is not exit ......");
//     console.log("========================================================================");
//   } else {
//     console.log("========================================================================");
//     console.log(results);
//     console.log("MySQL [name: nodeserverdb] database connect success ......");
//     console.log("========================================================================");
//   }
// });
// mysql.db.end();

const createSql = "create database nodeserverdb default character set utf8 default collate utf8_general_ci";
mysql.db.query(createSql, (err, results) => {
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
mysql.db.end();

