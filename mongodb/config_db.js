const mongoose = require('mongoose')//node.js操作MongoDB的第三方插件，npm install mongoose

// 以下提供众多方式中的3种 ------------------ begin ------------------------------------
// 方式一: with mongodb:// URI
// db = mongoose.createConnection('mongodb://user:pass@localhost:port/database');

// 方式二: with [host, database_name[, port] signature
// db = mongoose.createConnection('localhost', 'database', port)

// 方式三: and options
// var opts = { server: { auto_reconnect: false }, user: 'username', pass: 'mypassword' }
// db = mongoose.createConnection('localhost', 'database', port, opts)
// 以上提供众多方式中的3种 ------------------ end ------------------------------------

// const options = {
//   useMongoClient: true,
//   autoIndex: false, // Don't build indexes
//   reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
//   reconnectInterval: 500, // Reconnect every 500ms
//   poolSize: 10, // Maintain up to 10 socket connections
//   // If not connected, return errors immediately rather than waiting for reconnect
//   bufferMaxEntries: 0
// };
// mongoose.connect('mongodb://localhost/1902', options,{
//   useMongoClient: true,
//   connectTimeoutMS: 1000
// });
mongoose.connect('mongodb://localhost/zyltestdb');
// mongoose.connect('mongodb://localhost/zyltestdb',{ useMongoClient: true});
//报错信息: DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;  //要加上这句代码
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