/**
 * Node.js 加载静态资源css，js等不显示的问题
 * 原因：
 * 1.没有响应到css等文件
 * 2.响应类型是由文件的后缀名决定
 * （1）html的请求头：Content-Type : text/html ; charset=utf-8
 * （2） CSS的请求头：content-type:  text/css; charset=utf-8
 * （3）JavaScript的请求头： content-type:  text/javascrpt; charset=utf-8
 * 3. 解决方法
 * （1）拿到文件的后缀名，path.extname(path)获取扩展名
 * （2）定义模块  =>  拿取后缀名(文件类型)，如  mime.js 文件
 * （3）使用模块（在 app.js 模块的引用）
 */

/**
 * MIME(Multipurpose Internet Mail Extensions)多用途互联网邮件扩展类型。
 * 是设定某种扩展名的文件用一种应用程序来打开的方式类型，当该扩展名文件被访问的时候，浏览器会自动使用指定应用程序来打开。
 * 多用于指定一些客户端自定义的文件名，以及一些媒体文件打开方式。
 */
// mime类型，文件的后缀名
const mime = {
  "css": "text/css",
  "gif": "image/gif",
  "html": "text/html",
  "ico": "image/x-icon",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "js": "text/javascript",
  "json": "application/json",
  "pdf": "application/pdf",
  "png": "image/png",
  "svg": "image/svg+xml",
  "swf": "application/x-shockwave-flash",
  "tiff": "image/tiff",
  "txt": "text/plain",
  "wav": "audio/x-wav",
  "wma": "audio/x-ms-wma",
  "wmv": "video/x-ms-wmv",
  "xml": "text/xml"
};
// Object对象 转 Map
const mapMime = new Map(Object.entries(mime))
// 抛出， Map用key获取value
exports.getMime = (key) => {
  return mapMime.get(key)
}
/**
 * 获取文件后缀名（文件类型）
 **/
// exports.getMime = function(extname){
//   switch(extname){
//       case '.html':
//       return 'text/html';   
//       case '.css':
//       return 'text/css';
//       case '.js':
//       return 'text/javascript';
//       default:
//       return 'text/html';
//   }
// }