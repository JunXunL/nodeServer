//引用node的http模块
var http = require('http');

//创建一个服务器并指定请求处理函数
http.createServer(function(req,res){
  //设置返回的请求状态 200位成功 和返回头部及文件编码
  res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
  //向客户端返回内容
  res.end('Hello world ！ 我是node服务器的返回！');
}).listen(8888); //监听 8888 端口
console.log('服务器开启在：http://localhost:8888/');