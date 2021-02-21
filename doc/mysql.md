<!--
 * @Descripttion: mysql
 * @Author: Irene.Z
 * @Date: 2020-11-05 16:43:53
 * @LastEditTime: 2021-02-21 17:38:56
 * @FilePath: \nodeServer\doc\mysql.md
-->
# mysql
1. 安装mysql软件，注意mysql8.0以上加密方式，Node还不支持。
2. 新建数据库
3. 项目安装插件：npm install mysql
# result数据返回格式
result数据返回格式： [ RowDataPacket {} ] ，无法直接获取数据中的对象，需要先使用JSON.stringify()进行转换成字符串后，去除 'RowDataPacket'，最后将字符串数据使用JSON.parse()转换成json对象数据。
*这里使用了promise*
```
// 示例findUser.js
const myconnection = require('../config/mysql');
const verifyUser = function(username) {
  return new Promise((resovle, reject) => {
    const searchUsers = 'select * from users;';
    myconnection.query(searchUsers, function(error, result){
      let users = JSON.parse(JSON.stringify(result));
      for(let user of users) {
        if(username == user.username){
          resolve(1);
        }
      }
      resolve(0);
    })
  })
}
module.exports = verifyUser;

```
*这里使用了promise， 之所以用promise是因为在node中，mysql的查询操作属于IO操作，就是异步操作，如果不用promise方法，就要把resolve(1)改成errorNum=1，表示用户已经注册过了，然后函数最后返回return errorNum。*
```
const myconnection = require('../config/mysql');
const verifyUser = function(username) {
  const searchUsers = 'select * from users;';
  const errorNum = 0;
  myconnection.query(searchUsers, function(error, result){
    let users = JSON.parse(JSON.stringify(result));
    for(let user of users) {
      if(username == user.username){
        errorNum=1
      }
    }
  })
  return errorNum; // 会先返回！！！
}
module.exports = verifyUser;

```
之后调用，verify(username)就会得到返回的errorNum，通过判断这个errorNum的值来决定是返回已经注册的json数据还是选择插入数据库中。
## 解析 promise 的使用
*mysql的操作是异步的，也就是说在verifyUser()这个函数中，return errorNum是同步操作，mysql操作是异步操作，所以return errorNum比mysql操作要先执行，那么此时verify(username)就会一直返回0，表示可以注册。这也是最大的坑。*
**那么promise的作用是什么呢？**
学过es6的就知道实际上promise也是一种异步操作，但是在这个地方，promise解决了mysql异步带来的问题。
```
// ... ...
const verify = require('../findUser'); // 引入findUser.js
verify(usernmae).then(data => {
  if(data === 1){
    return res.json({'error': 1, 'message': '该用户已注册'});
  }else{
    const insertSql = 'insert into users(username, password) value(?, ?);';
    const insertParams = [username, password];
    connection.query(insertSql, insertParams, funciton(error, results, fields){
      if(error){
        console.log(error);
        return
      }else{
        return res.json({'error': 0, 'message': '注册成功！'});
      }
    })
  }
})
```
findUser.js文件返回verifyUser()是一个promise对象，之后在使用verify(username)时就可以调动then，then()中的回调必须等到promise构造函数中的操作执行完才执行，那么promise构造函数执行了什么？
1. 首先，查询数据库的所有用户，用传入的username去匹配数据库中的用户名，如果匹配到了，说明用户存在，不能再注册了，此时resolve(1)，这个1会被then中的data接收。如果全部都匹配完之后发现没有这个用户名，说明可以注册，此时resolve(0)，这个0同样也会被then中的data接收。
2. 等待resolve()后，then中的回调就可以开始执行了。此时data就是上面resolve传过来的值，如果是1，就返回json数据，否则的话就将用户数据保存在数据库中。

*总结：promise实现了mysql的同步，使得这个判断的过程是一个有序的过程。*




