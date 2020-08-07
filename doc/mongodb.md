# MongoDB在mongo控制台下的基本使用命令
## 成功启动MongoDB后，在命令行窗口输入mongo，就可以进行数据库的一些操作
## show dbs:显示数据库中的【数据库列表】
## show collections：显示当前数据库中的【集合列表】（类似关系数据库中的表）
## use <db name>：切换指定名称的【数据库】；当切换一个集合(table)不存在的时候会自动创建当前数据库
## db.help()：显示数据库操作命令，里面有很多的命令 
## db.foo.help()：显示集合操作命令，同样有很多的命令，foo代指的是当前要操作的数据库中的一个叫【foo的集合】
## db.foo.find()：对于当前数据库中的foo集合进行数据查找（由于没有条件，会列出所有数据）
## db.foo.find({a: 1})：对于当前数据库中的foo集合进行查找，条件是数据中有一个属性叫a，且a的值为1
## 
## 
## 删除当前使用数据库：db.dropDatabase()
## 查看当前使用的数据库：db.getName()
## 显示当前db状态：db.stats()
## 创建一个聚集集合（table）： db.createCollection(“collName”, {size: 20, capped: 5, max: 100});
## 得到指定名称的聚集集合（table）：db.getCollection("account");
## 得到当前db的所有聚集集合：db.getCollectionNames();
## 
## 加一个用户：db.addUser("name");  db.addUser("userName", "pwd123", true); 添加用户、设置密码、是否只读
## 数据库认证、安全模式：db.auth("userName", "123123");
## 显示当前所有用户：show users;
## 删除用户：db.removeUser("userName");
## 
## 
# 查看聚集集合基本信息
## 1、查看帮助  db.yourColl.help();
## 2、查询当前集合的数据条数  db.yourColl.count();
## 3、查看数据空间大小 db.userInfo.dataSize();
## 4、得到当前聚集集合所在的db db.userInfo.getDB();
## 5、得到当前聚集的状态 db.userInfo.stats();
## 6、得到聚集集合总大小 db.userInfo.totalSize();
## 7、聚集集合储存空间大小 db.userInfo.storageSize();
## 8、Shard版本信息  db.userInfo.getShardVersion()
## 9、聚集集合重命名 db.userInfo.renameCollection("users"); 将userInfo重命名为users
## 10、删除当前聚集集合 db.userInfo.drop();
## 
## 
# 聚集集合查询
## 1、查询所有记录
## db.userInfo.find();相当于：select* from userInfo;
## 默认每页显示20条记录，当显示不下的情况下，可以用it迭代命令查询下一页数据。注意：键入it命令不能带“；”
## 但是你可以设置每页显示数据的大小，用DBQuery.shellBatchSize= 50;这样每页就显示50条记录了。
## 2、查询去掉后的当前聚集集合中的某列的重复数据
## db.userInfo.distinct("name");
## 会过滤掉name中的相同数据，相当于：select distict name from userInfo;
## 
## 3、查询age = 22的记录
## db.userInfo.find({"age": 22});相当于： select * from userInfo where age = 22;
## 
## 4、查询age > 22的记录
## db.userInfo.find({age: {$gt: 22}});相当于：select * from userInfo where age >22;
## 
## 5、查询age < 22的记录
## db.userInfo.find({age: {$lt: 22}});相当于：select * from userInfo where age <22;
## 
## 6、查询age >= 25的记录
## db.userInfo.find({age: {$gte: 25}});相当于：select * from userInfo where age >= 25;
## 
## 7、查询age <= 25的记录
## db.userInfo.find({age: {$lte: 25}});
## 
## 8、查询age >= 23 并且 age <= 26
## db.userInfo.find({age: {$gte: 23, $lte: 26}});
## 
## 9、查询name中包含 mongo的数据
## db.userInfo.find({name: /mongo/});
## //相当于%%
## select * from userInfo where name like ‘%mongo%’;
## 
## 10、查询name中以mongo开头的
## db.userInfo.find({name: /^mongo/});
## select * from userInfo where name like ‘mongo%’;
## 
## 11、查询指定列name、age数据
## db.userInfo.find({}, {name: 1, age: 1});相当于：select name, age from userInfo;
## 当然name也可以用true或false,当用ture的情况下河name:1效果一样，如果用false就是排除name，显示name以外的列信息。
## 
## 12、查询指定列name、age数据, age > 25
## db.userInfo.find({age: {$gt: 25}}, {name: 1, age: 1});相当于：select name, age from userInfo where age >25;
## 
## 13、按照年龄排序
## 升序：db.userInfo.find().sort({age: 1});
## 降序：db.userInfo.find().sort({age: -1});
## 
## 14、查询name = zhangsan, age = 22的数据
## db.userInfo.find({name: 'zhangsan', age: 22});相当于：select * from userInfo where name = ‘zhangsan’ and age = ‘22’;
## 
## 15、查询前5条数据
## db.userInfo.find().limit(5);相当于：selecttop 5 * from userInfo;
## 
## 16、查询10条以后的数据
## db.userInfo.find().skip(10);
## 相当于：select * from userInfo where id not in (selecttop 10 * from userInfo);
## 
## 17、查询在5-10之间的数据
## db.userInfo.find().limit(10).skip(5);可用于分页，limit是pageSize，skip是第几页*pageSize
## 
## 18、or与 查询
## db.userInfo.find({$or: [{age: 22}, {age: 25}]});相当于：select * from userInfo where age = 22 or age = 25;
## 
## 19、查询第一条数据
## db.userInfo.findOne();相当于：selecttop 1 * from userInfo;
## db.userInfo.find().limit(1);
## 
## 20、查询某个结果集的记录条数
## db.userInfo.find({age: {$gte: 25}}).count();相当于：select count(*) from userInfo where age >= 20;
## 
## 21、按照某列进行排序
## db.userInfo.find({sex: {$exists: true}}).count();相当于：select count(sex) from userInfo;
## 
# 索引
## 1、创建索引
## db.userInfo.ensureIndex({name: 1});
## db.userInfo.ensureIndex({name: 1, ts: -1});
## 
## 2、查询当前聚集集合所有索引
## db.userInfo.getIndexes();
## 
## 3、查看总索引记录大小
## db.userInfo.totalIndexSize();
## 
## 4、读取当前集合的所有index信息
## db.users.reIndex();
## 
## 5、删除指定索引
## db.users.dropIndex("name_1");
## 
## 6、删除所有索引索引
## db.users.dropIndexes();
## 
# 修改、添加、删除集合数据
## 1、添加
## db.users.save({name: ‘zhangsan’, age: 25, sex: true});添加的数据的数据列，没有固定，根据添加的数据为准
## 
## 2、修改
## db.users.update({age: 25}, {$set: {name: 'changeName'}}, false, true);
## 相当于：update users set name = ‘changeName’ where age = 25;
## db.users.update({name: 'Lisi'}, {$inc: {age: 50}}, false, true);
## 相当于：update users set age = age + 50 where name = ‘Lisi’;
## db.users.update({name: 'Lisi'}, {$inc: {age: 50}, $set: {name: 'hoho'}}, false, true);
## 相当于：update users set age = age + 50, name = ‘hoho’ where name = ‘Lisi’;
## 
## 3、删除
## db.users.remove({age: 132});
## 
## 4、查询修改删除
## db.users.findAndModify({
##   query: {age: {$gte: 25}}, 
##   sort: {age: -1}, 
##   update: {$set: {name: 'a2'}, $inc: {age: 2}},
##   remove: true
## });
## 
## db.runCommand({ findandmodify : "users", 
##   query: {age: {$gte: 25}}, 
##   sort: {age: -1}, 
##   update: {$set: {name: 'a2'}, $inc: {age: 2}},
##   remove: true
## });
## 
## 