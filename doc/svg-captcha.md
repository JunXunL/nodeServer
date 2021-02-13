<!--
 * @Descripttion: svg-captcha验证码
 * @Author: Irene.Z
 * @Date: 2021-02-14 01:27:26
 * @LastEditTime: 2021-02-14 01:58:08
 * @FilePath: \nodeServer\doc\svg-captcha.md
-->
***进行测试发现没有返回值，排查错误后发现是没有注册session中间件，svg-captcha依赖session存储验证码信息！！！***

# （1）svg-captcha验证码
## svgCaptcha.create(options)，如果没有任何参数，则生成的 svg 图片有4个字符。
```
size: 4 // 验证码长度
ignoreChars: ‘0o1i’ // 验证码字符中排除 0o1i
noise: 1 // 干扰线条的数量
color: true // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
background: ‘#cc9966’ // 验证码图片背景颜色

该函数返回的对象拥有以下属性
data: string // svg 路径
text: string // 验证码文字
```
## svgCaptcha.createMathExpr(options)，和前面的 api 的参数和返回值都一样。不同的是这个 api 生成的 svg 是一个算数式，而 text 属性上是算数式的结果。不过用法和之前是完全一样的。

## svgCaptcha.loadFont(url)，加载字体，覆盖内置的字体。
```
url: string // 字体文件存放路径 该接口会调用opentype.js同名的接口。 你可能需要更改一些配置才能让你得字体好看。
```
***详见下面的这个接口：***
## svgCaptcha.options，这是全局配置对象。 create和createMathExpr接口的默认配置就是使用的这个对象。
***除了 size, noise, color, 和 background 之外，还可以修改以下属性：***
>width: number // width of captcha
>height: number // height of captcha
>fontSize: number // captcha text size
>charPreset: string // random character preset

## svgCaptcha.randomText([size|options])，返回随机字符串

## svgCaptcha(text, options)，返回基于text参数生成得svg路径，在 1.1.0 版本之前你需要调用上面的两个接口，但是现在只需要调用 create()，一个接口就行

## 使用SVG验证码的情况
>无法使用 google recaptcha
>无法安装 c++ 模块


# （2）express-session
***svg-captcha依赖session存储验证码信息，需要注册session中间件。express-session是express中比较常用的处理session的中间件。***
## 使用npm按照：npm install express-session --save


# （3）cookie-parser
***session的认证机制必须依赖cookie，所以要同时安装一个cookie-parser。***
***在app.js中，定义cookie解析器，注意，该定义必须写在路由分配之前。***
```
app.use(cookieParser());
...
app.use(session({
secret: '12345', // 用来对session数据进行加密的字符串，这个属性值为必须指定的属性。
name: 'name', // 表示cookie的name，默认cookie的name是：connect.sid。
cookie: {maxAge: 60000}, // maxAge： cookie过期时间，毫秒。
resave: false, // 是指每次请求都重新设置session cookie，假设你的cookie是6000毫秒过期，每次请求都会再设置6000毫秒。
saveUninitialized: true, // 是指无论有没有session cookie，每次请求都设置个session cookie ，默认给个标示为 connect.sid。
}));
```