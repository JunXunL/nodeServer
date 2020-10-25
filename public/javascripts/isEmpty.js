// 判断Object、String、Array类型是否为空
function isEmpty(value) {
  if (Object.prototype.toString.call(value) === `[object String]`) {
    return value == null || value == undefined || value == "";
  } else if (Object.prototype.toString.call(value) == `[object Array]`) {
    return value.toString() == null || value.toString() == undefined || value.toString() == "" || value.length == 0
  } else if (Object.prototype.toString.call(value) == `[object Object]`) {
    return JSON.stringify(value) == "{}" || Object.keys(value).length == 0;
  } else {
    console.log("isEmpty 方法只能判断Object、String、Array、XMLHttpRequest类型是否为空！")
    return false;
  }
}

function isFun(fn) {
  return Object.prototype.toString.call(fn)==='[object Function]'
}

function isXMLHttpRequest(obj) {
  return Object.prototype.toString.call(obj) === `[object XMLHttpRequest]`
}

module.exports = {
  isEmpty: isEmpty,
  isFun: isFun,
  isXMLHttpRequest: isXMLHttpRequest
}