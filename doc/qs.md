<!--
 * @Descripttion: 
 * @Author: Irene.Z
 * @Date: 2020-12-15 01:39:06
 * @LastEditTime: 2020-12-15 01:42:45
 * @FilePath: \nodeServer\doc\qs.md
-->
***用Vue+element写后台管理系统，使用axios（POST）请求数据传参时无法正常的使用req.body获取数据。发现原因是传递参数要将参数序列化。***
# 使用qs插件
## 简单来说，qs 是一个增加了一些安全性的查询字符串解析和序列化字符串的库。 

### 在项目中使用命令行工具输入：npm install qs
### 安装完成后在需要用到的组件中：import qs from'qs' 

### 具体使用：qs.parse()和qs.stringify()这两种方法虽然都是序列化，但是还是有区别的。
>qs.parse()是将URL解析成对象的形式
>qs.stringify()是将对象 序列化成URL的形式，以&进行拼接