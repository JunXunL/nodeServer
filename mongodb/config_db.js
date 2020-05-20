const mongoose = require('mongoose')//node.js操作MongoDB的第三方插件，npm install mongoose

// mongoose.connect('mongodb://localhost/1902', options,{ useMongoClient: true, connectTimeoutMS: 1000 });
// mongoose.connect('mongodb://localhost/zyltestdb',{ useMongoClient: true});
mongoose.connect('mongodb://localhost/zyltestdb');
//报错信息: DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;  //如果发生上述报错，要加上这句代码
var db = mongoose.connection;//数据库的连接对象
db.on('error',console.error.bind(console,'mongod connection error:'))
db.once('open',()=>{
	console.log('mongodb is ok.')
})

// mongoose.connection.on('error', function (err) {
//     console.log('Mongo Error:' + err);
// }).on('open', function () {
//     console.log('Connection opened');
// });