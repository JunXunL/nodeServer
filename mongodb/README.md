# 1、安装
## 注意事项是“Install MongoDB Compass”不能勾选
# 2、配置环境变量
## 在“环境变量”的“系统变量”中，添加MongoDB/bin的路径，在控制台输入：mongo 正常返回信息，表示环境变量配置成功
# 3、配置MongoDB服务
## 管理员模式打开命令行窗口cmd，在你想要存放数据的地方，创建目录，执行下面的语句来创建数据库和日志文件的目录，如下：
## mkdir c:\data\db
## mkdir c:\data\log
## 目录结构，如下
### data/
###   conf	-->配置文件目录
###   		mongod.conf		-->配置文件
###   db		-->数据库目录
###   log		-->日志文件目录
###   		mongodb.log		-->日志记录文件
## 在MongoDB目录下新建mongod.cfg文件，其中指定 systemLog.path 和 storage.dbPath。具体配置内容如下：
### systemLog:
###     destination: file
###     path: c:\data\log\mongod.log
### storage:
###     dbPath: c:\data\db
# 4、安装 MongoDB服务
## 在MongoDB的bin目录下，通过执行mongod.exe，使用--install选项来安装服务，使用--config选项来指定之前创建的配置文件。
## 输入：C:\mongodb\bin\mongod.exe --config "C:\mongodb\mongod.cfg" --install
# 5、-----启动数据库，在MongoDB/bin的路径，在控制台输入：mongod --dbpath D:\software\MongoDB\data
## 注：--dbpath是指定数据库存放目录，要注意dbpath前有两个“-”。 返回“waiting for connections on port 27017”，表明mongodb服务器已经启动，正在27017窗口等待连接。
# -------------------------------------------------------
# 6、将MongoDB服务器作为Windows服务运行
## 像上面那样启动mongodb，发现没办法输入命令行了，这是可以采用打开多个窗口来连接，但这样就太麻烦了，解决办法就是将MongoDB服务器作为Windows服务运行。
## 输入以下命令：F:\mongodb\bin>mongod --dbpath "f:\data\db" --logpath "f:\data\log\mongodb.log" --serviceName "mongodb" --serviceDisplayName "mongodb" --install
## 看到了如下输出： 2016-10-20T23:32:46.339+0800 I CONTROL  log file "f:\data\log\mongodb.log" exists; moved to "f:\data\log\mongodb.log.2016-10-20T15-32-46".
## 说明mongodb服务安装成功。
## 启动mongodb服务： F:\mongodb\bin>net start mongodb ，返回： MongoDB 服务已经启动成功。
## 说明mongodb启动成功。
## 由于我们并没有指定mongodb服务的端口号，所以它启动在默认的27017窗口。
## 打开浏览器，范围地址http://127.0.0.1:27017/,可看到如下信息
## It looks like you are trying to access MongoDB over HTTP on the native driver port.
# -----------------------------------------------------------
# 7、重新打开一个命令窗口，输入：mongo
## 1）创建数据库语法格式：use DATABASE_NAME ， 如下：
#### > use zyltestdb  
#### switched to db mongo  
#### > db 
#### zyltestdb 
## 2）查看所有数据库，可以使用 show dbs 命令，如下：
#### > show dbs  
#### local  0.078GB  
#### test   0.078GB 
## 3）刚创建的数据库 zyltestdb 并不在数据库的列表中， 要显示它，需要向 zyltestdb 数据库插入一些数据
#### > db.zyltestdb.insert({"name":"mongodb中文网"})
#### WriteResult({ "nInserted" : 1 })  
#### > show dbs  
#### local   0.078GB  
#### zyltestdb  0.078GB 
#### test    0.078GB 
## 3）
## 3）MongoDB连接命令格式， 'username:password@hostname/dbname'，例如：mongodb://admin:123456@localhost/test
# 8、
# 8、
# 8、

