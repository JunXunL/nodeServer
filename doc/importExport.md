<!--
 * @Descripttion: exports、module.exports 和 export、export default等区别
 * @Author: Irene.Z
 * @Date: 2020-11-24 14:29:31
 * @LastEditTime: 2020-11-24 17:22:09
 * @FilePath: \nodeServer\doc\importExport.md
-->
***require: node 和 es6 都支持的引入***  
***export / import : 只有es6 支持的导出引入***  
***module.exports / exports: 只有 node 支持的导出***  

# node模块
#### Node里面的模块系统遵循的是CommonJS规范。每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。CommonJS规范规定，每个模块内部，module变量代表当前模块。这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。加载某个模块，其实是加载该模块的module.exports属性。
#### 定义的模块分为: 模块标识(module)、模块定义(exports) 、模块引用(require)

## exports 和 module.exports
#### 在node执行一个文件时，会给这个文件内生成一个 exports 和 module对象，而module内部又有一个exports属性。它们之间的关系是都指向一块{}内存区域：exports == module.exports == {}
```
//代码：utils.js
let a = 100;
console.log(module.exports); //能打印出结果为：{}
console.log(exports); //能打印出结果为：{}
exports.a = 200; // 从这里可以看出，修改了 module.exports 的内容，改成 {a : 200}
exports = '指向其他内存区'; //这里修改exports的指向，改为其它地方
//test.js
var a = require('/utils'); // require导出的内容是module.exports的指向的[内存块]内容，并不是exports的
console.log(a) // 因为 exports.a = 200 修改了a的值，所以打印出 {a : 200}
```
***从上面可以看出，其实require导出的内容是module.exports的指向的[内存块]内容，并不是exports的***
***简而言之，他们之间的区别就是 exports 只是 module.exports 的引用，辅助后者添加内容用的***
## 通常exports方式使用方法：exports.[function name] = [function name] 
#### exports返回的是模块函数，exports的方法可以直接调用

## moudle.exports方式使用方法：moudle.exports= [function name]
#### module.exports返回的是模块对象本身，返回的是一个类，module.exports需要new对象之后才可以调用

## 1) exports方式
```
// 代码：exports_mode.js
var sayHello = function(){ console.log('hello') }
exports.sayHello = sayHello; // 暴露方式
console.log(exports);
console.log(module.exports);
console.log(exports === module.exports); // true
// 然后写一个test.js调用下试试看
var exports_mode = require('./exports_mode');
exports_mode.sayHello();
// exports和module.exports对象输出的都是一个sayHello方法
```
**重点：exports是module.exports的一个引用，exports指向的是module.exports。exports和module.exports是同一个对象**

## 2) module.exports方式
```
// 代码 module_exports_mode.js

var sayHello = function(){ console.log('hello') }
module.exports = sayHello; // 暴露方式
console.log(module.exports);
console.log(exports); 
console.log(exports === module.exports);
// 然后测试一下
var module_export_mode = require('./module_exports_mode')
module_export_mode.sayHello() // ---错误调用：报错
```
**module.exports返回的是模块对象本身**
```
// 正确的调用
var module_export_mode = require('./module_exports_mode');
new module_export_mode();
```
***输出的module.exports对象内容就是一个[Function]，在javascript里面是一个类。使用这样的好处是exports只能对外暴露单个函数，但是module.exports却能暴露一个类***
```
// 代码
var xiaoming = function(name){
  this.name = name
  this.sayHello = function(){
    return 'hello '+this.name
  }
  this.sayGoodBye = function(){
    return 'goodbye '+this.name
  }
}
module.exports = xiaoming
console.log(module.exports); 
console.log(exports); 
console.log(exports === module.exports);
// 调用方式
var xiaoming = require('./module_exports_mode')
var xiaoming = new xiaoming('Lucien')
console.log(xiaoming.sayHello())
console.log(xiaoming.sayGoodBye())
```
# 总结
> exports.[function name] = [function name]  
> moudle.exports= [function name]  
> 所以，在使用上  
> moudle.exports.[function name]   = [function name]  是完全和  exports.[function name] = [function name] 相等的


# ES中的模块导出导入
#### 不同于CommonJS，ES6使用 export 和 import 来导出、导入模块。导出 export 和 export default，还有 导入 import a from .. ，import {a} from .. 之间的关系

## export 和 export default 这两个导出的区别
> 1.export与export default均可用于导出常量、函数、文件、模块等  
> 2.在一个文件或模块中，export、import可以有多个，export default仅有一个  
> 3.通过export方式导出，在导入时要加{ }，export default则不需要  
> 4.export能直接导出变量表达式，export default不行
```
// 代码 testEs6Export.js
'use strict'
//导出变量
export const a = '100';

//导出方法
export const dogSay = function(){
  console.log('wang wang');
}

//导出方法第二种
function catSay(){
  console.log('miao miao');
}
export { catSay };

//export default导出
const m = 100;
export default m;
//export defult const m = 100;// 这里不能写这种格式
```
```
//代码 index.js
'use strict'
var express = require('express');
var router = express.Router();

import { dogSay, catSay } from './testEs6Export'; //导出 export 方法
import m from './testEs6Export'; //导出了 export default

import * as testModule from './testEs6Export';//as 集合成对象导出

/* GET home page. */
router.get('/', function(req, res, next) {
dogSay();
catSay();
console.log(m);
testModule.dogSay();
console.log(testModule.m); // undefined , 因为 as 导出是 把 零散的 export 聚集在一起作为一个对象，而export default 是导出为 default属性。
console.log(testModule.default); // 100
res.send('恭喜你，成功验证');
});

module.exports = router;
```