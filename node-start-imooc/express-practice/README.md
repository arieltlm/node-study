# 需求说明，api说明

* 1.根据客户端传递过来的不同的参数（状态/页码）查询任务的列表
* 2.实现新增一个任务的功能（名称/截止日期/内容）
* 3.实现一个编辑的功能：根据客户端传递的任务对象（已经存在的数据）进行编辑，（名称/截止日期/内容/id）
* 4.删除一个任务（id)
* 5.修改任务的状态（id/状态）


# body-parser中间件

body-parser是用来解析http请求体的。
bodyParser.json是用来解析json数据格式的。
bodyParser.urlencoded则用来解析我们通常的form表单提交的数据

**常见的四种Content-Type类型：**
* application/x-www-form-urlencoded 常见的form提交
* multipart/form-data 文件提交
* application/json  提交json格式的数据
* text/xml  提交xml格式的数据

bodyParser.urlencoded模块用于解析req.body的数据，解析成功后覆盖原来的req.body。如果解析失败则为{}。
extended选项允许配置使用querystring(false)或qs(true)来解析数据，默认值是true，但这已经是不被赞成的了。

querystring就是nodejs内建的对象之一，用来字符串化对象或解析字符串。如

querystring.parse("name=henry&age=30") => { name: 'henry', age: '30' }

参考[body-parser的使用](https://www.cnblogs.com/lovekiku123/p/11961094.html)

# 数据库

ORM：

## 数据库的初始化

* 1. 创建一个数据库
* 2. 使用`sequelize cli`初始化项目的数据库配置信息

    ```bash
    npm install --save sequelize
    npm install --save mysql2

    npm install --save-dev sequelize-cli
    npx sequelize-cli init
    ```



