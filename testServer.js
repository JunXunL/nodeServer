// 直接创建第一个http server， 用于测试testServer.html

var PORT = 8181; //端口
var DIR = 'views/testServer'; //用于存放html的目录

var http = require('http');//引用node的http模块
var url=require('url');
var fs=require('fs');
var contentTypeModule=require('./views/testServer/contentType').types;
var path=require('path');
//创建一个服务器并指定请求处理函数
var server = http.createServer(function (request, response) {
  var pathname = url.parse(request.url).pathname;
  var realPath = path.join(DIR, pathname);
  console.log("访问路径： " + realPath);
  var ext = path.extname(realPath); // 返回 path 的扩展名
  ext = ext ? ext.slice(1) : 'unknown';
  fs.exists(realPath, function (exists) {
    if (!exists) {
      //设置返回的请求状态 200位成功 和返回头部及文件编码
      response.writeHead(404, {'Content-Type': 'text/plain'});
      response.write("This request URL " + pathname + " was not found on this server.");
      response.end(); //向客户端返回内容
    } else {
      fs.readFile(realPath, "binary", function (err, file) {
        if (err) {
          response.writeHead(500, {'Content-Type': 'text/plain'});
          response.end(err);
        } else {
          var contentType = contentTypeModule[ext] || "text/plain";
          response.writeHead(200, {'Content-Type': contentType});
          response.write(file, "binary");
          response.end();
        }
      });
    }
  });
});
server.listen(PORT);
// http://localhost:8181/testServer.html
console.log("Server runing at port: " + PORT + ".");