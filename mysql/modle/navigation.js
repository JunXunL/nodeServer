/*
 * @Descripttion: 
 * @Author: Irene.Z
 * @Date: 2020-11-25 15:24:21
 * @LastEditTime: 2020-11-29 10:20:00
 * @FilePath: \nodeServer\mysql\modle\navigation.js
 */
const createSql = "CREATE TABLE c_navigation_main("
  + "id INT PRIMARY KEY AUTO_INCREMENT,"
  + "title VARCHAR(20) NOT NULL COMMENT '标题',"
  + "image VARCHAR(100) NOT NULL COMMENT '图片路径',"
  + "classify CHAR(2) NOT NULL COMMENT '导航的分类（前\后）：0\1',"
  + "grade CHAR(2) NOT NULL COMMENT '导航的级别：1\2\3\...\n',"
  + "usable CHAR(2) NOT NULL DEFAULT '1' COMMENT '是否可用（否\是）：0\1',"
  + "special_authority VARCHAR(10) NOT NULL COMMENT '所需特殊权限后展示：0,1,...,n',"
  + "create_date TIMESTAMP NULL DEFAULT NOW()"
  + ") ENGINE=INNODB DEFAULT CHARSET=utf8;";

const insertSql = "";

const selectAll = "SELECT * FROM c_navigation_main"

module.exports = {
  createSql,
  insertSql,
  selectAll
}