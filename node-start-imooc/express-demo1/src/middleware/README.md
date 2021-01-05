# 中间件

## 1.中间件完整的结构

* 中间件是一个函数
* err,req,res,next -> function

```js
function demo_middleware(err,req,res,next){
    // 1.异常处理
    // 2.处理业务功能，然后转交控制权-next
    // 3.响应需求--结束响应-->当作路由的处理函数
}
```

## 2.使用场景

* 1). app 级别的使用
    + 注册的时候，一定是在最顶级
    + app.use(中间件)
* 2). router 级别
* 3). 异常处理
* 4). 内置的中间件

## 3.内置中间件

* express.json([options])
* express.static(root, [options])
* express.Router([options])
* express.urlencoded

**加载一个内置的中间件--static中间件,存放静态资源**：

[http://expressjs.com/en/5x/api.html#express.static](http://expressjs.com/en/5x/api.html#express.static)

```js
// 加载一个static的中间件
// 启动层为package,即看相对于它的相对路径
app.use(express.static('static',{
    extensions:['html', 'htm']
}))
```