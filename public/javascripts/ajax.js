
/**
 * 创建XMLHttpRequest对象
 * 注意：
 * XMLHttpRequest 是 AJAX 的基础，在创建 XMLHttpRequest 对象时，
 * 必须与你写的ajax方法在同一个‘<script></script>'标签中，否则ajax请求会出错，并无法返回数据。
 */
function getXmlHttpObject() {
  let xmlHttp;
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlHttp = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
  } else {
    alert("你使用的浏览器不支持XMLHttpRequest");
  }
  return xmlHttp
}

/**
 * open语法：open(method, url, async, username, password);
 * method: 请求类型（GET | POST | HEAD）
 * url： 请求主体，大多数浏览器实施了一个同源安全策略，并且要求这个 URL 与包含脚本的文本具有相同的主机名和端口。
 * async: 是否发送异步请求( false | true )
 * username,password: 参数是可选的，为 url 所需的授权提供认证资格。如果指定了，它们会覆盖 url 自己指定的任何资格。
 */
function ajaxGet(url, fn) {
  const xmlHttp = getXmlHttpObject();
  if (isEmpty(xmlHttp)) return;

  xmlHttp.open("GET", url, true);
  /**
   * 每当readyState改变时就会触发onreadystatechange函数
   * 0: 请求未初始化
   * 1: 服务器连接已建立
   * 2: 请求已接收
   * 3: 请求处理中
   * 4: 请求已完成，且响应已就绪
   * "responseText”属性以字符串形式返回HTTP响应；
   * “responseXML”属性以XML形式返回HTTP响应
   */
  xmlHttp.onreadystatechange = () => {
    // if(xmlHttp.readyState==1||xmlHttp.readyState==2||xmlHttp.readyState==3){ 
    //   // 本地提示：加载中/处理中 
    // }
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      // var xmlDoc = xmlHttp.responseXML.documentElement; 
      // var xSel = xmlDoc.getElementsByTagName("select");//得到xml文档中，节点为select的对象
      
      console.log(xmlHttp.responseText);
      fn.call(this, xmlHttp.responseText);
    }
  }
  xmlHttp.send(); // 发送请求
}

// param 格式'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
function ajaxPost(url, param, fn) {
  // 1. 创建一个xmlhttpRequest对象
  const xmlHttp = getXmlHttpObject();
  // console.log(isXMLHttpRequest(xmlHttp))
  if (!isXMLHttpRequest(xmlHttp)) return;

  // 2. 打开一个连接
  xmlHttp.open("POST", url, true);

  // 3. 设置请求头
  xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");

  // 4. 设置回调监听
  xmlHttp.onreadystatechange = function() {
    console.log("readyState:" + xmlHttp.readyState)
    console.log("status:" + xmlHttp.status)
    if (xmlHttp.readyState == 4 && (xmlHttp.status == 200 || xmlHttp.status == 304)) {
      console.log(xmlHttp.responseText);
      fn.call(this, xmlHttp.responseText);
    }
  }
  
  // 5. 发送
  xmlHttp.send("path=" + param) // 发送请求 + 数据；请求体body，用&分隔。引用：req.body.name
}


