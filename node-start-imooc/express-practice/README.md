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

    [sequelize-cli 创建模型migrations](https://www.sequelize.com.cn/other-topics/migrations)

    ```bash
    npm install --save sequelizex
    npm install --save mysql2

    npm install --save-dev sequelize-cli
    npx sequelize-cli init
    ```
    
* 3.创建模型
    生成模型文件
    migrate文件
    model文件

    ```bash
    # 进入到db目录下
    # 执行玩此句后models目录下会多一个todolist.js，migrations中也会多一个xxxxxx-create-todolist.js文件
    npx sequelize-cli model:generate --name todolist --attributes content:string,deadline:string,status:string
    ```
    id会自动创建

* 4.运行迁移

    ```bash
    npx sequelize-cli db:migrate
    ```


## sequelize中代码浅读

模型是ES6类；

### 模型定义
/models/todo.js中可参考[官网-模型定义](https://www.sequelize.com.cn/core-concepts/model-basics):

    + 调用 sequelize.define(modelName, attributes, options)
    + 扩展 Model 并调用 init(attributes, options)

```js
const User = sequelize.define('User', {
    // 在这里定义模型属性
    firstName: {
        type: DataTypes.STRING,
        // 将 allowNull 设置为 false 将为该列添加 NOT NULL,
        // 这意味着如果该列为 null,则在执行查询时将从数据库引发错误.
        // 如果要在查询数据库之前检查值是否不为 null,请查看下面的验证部分.
        allowNull: false,
        // 主键
        primaryKey: true,
        // 自增
        autoIncrement: true,
        defaultValue:'1' // 默认值
    },
    lastName: {
        type: DataTypes.STRING,
        // allowNull 默认为 true
        validate: {
            is: /^[a-z]+$/i,          // 匹配这个 RegExp
            isUrl: true,              // 检查 url 格式 (http://foo.com)
            isIP: true,               // 检查 IPv4 (129.89.23.1) 或 IPv6 格式
            isLowercase: true,        // 检查小写
            max:100,
            //...具体见https://www.sequelize.com.cn/core-concepts/validations-and-constraints
        }
    },
    date:{
        // 时间相关-数据类型可见https://www.sequelize.com.cn/core-concepts/model-basics#%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B
        type: DataTypes.DATETIME, 
        defaultValue: Sequelize.NOW
    },
    uuid:{
        type: DataTypes.UUID, // uuid
        defaultValue: Sequelize.UUIDV4 // 或 Sequelize.UUIDV1
    },
    // 创建两个具有相同值的对象将引发错误.
    // unique 属性可以是布尔值或字符串.
    // 如果为多个列提供相同的字符串,则它们将形成一个复合唯一键.
    uniqueOne: { type: DataTypes.STRING,  unique: 'compositeIndex' },
    uniqueTwo: { type: DataTypes.INTEGER, unique: 'compositeIndex' },
    // unique 属性是创建唯一约束的简写.
    someUnique: { type: DataTypes.STRING, unique: true },
    // 你可以通过 'field' 属性指定自定义列名称：
    fieldWithUnderscores: { type: DataTypes.STRING, field: 'field_with_underscores' },
}, {
    // 这是其他模型参数
    sequelize, // 我们需要传递连接实例
    modelName: 'Todo', // 我们需要选择模型名称
    timestamps:false // 不需要creatAt和updateAt字段的话，需设置这个参数
    freezeTableName: true, // [默认false]冻结表名，不让其复数化(person-people)
    tableName:'TodoList', // 直接定表名
});
```

**[sequelize数据类型](https://www.sequelize.com.cn/core-concepts/model-basics#%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B)**

### 模型实例

* **创建实例**：
build 方法仅创建一个对象,该对象 表示 可以 映射到数据库的数据. 为了将这个实例真正保存(即持久保存)在数据库中,应使用 save 方法

create 方法是将build和save合并成的一个方法

```js

const jane = User.build({ name: "Jane" });

await jane.save(); // Jane 已保存到数据库!

// const jane = await User.create({ name: "Jane" });

// console.log(jane); // 不要这样!
console.log(jane.toJSON()); // 这样最好!
console.log(JSON.stringify(jane, null, 4)); // 这样也不错!
```

* **更新实例**：

你更改实例的某个字段的值,则再次调用 save 将相应地对其进行更新

* **删除实例**：

```js
await jane.destroy();
```

* **重载实例**：

```js
await jane.reload();
```

* **递增递减整数值**：

```js
const jane = await User.create({ name: "Jane", age: 100 });
const incrementResult = await jane.increment('age', { by: 2 });
// 注意: 如只增加 1, 你可以省略 'by' 参数, 只需执行 `user.increment('age')`

await jane.increment(['age', 'cash'], { by: 2 });
await jane.increment({'age': 2,'cash': 100});

```
### 模型查找

* **查询所有**：

```js
// 查询所有用户
const users = await User.findAll();
// 选择某些特定属性
Model.findAll({
  attributes: ['foo', 'bar']
});

// 聚合 sequelize.fn

// 排除某些属性
Model.findAll({
  attributes: { exclude: ['baz'] }
});
```

* **通过主键查询**：

```js
// findByPk 方法使用提供的主键从表中仅获得一个条目
const project = await Project.findByPk(123);
```
* **获得找到的第一条目**：

```js
const project = await Project.findOne({ where: { title: 'My Title' } });
```

* **查询无时创建一个**：

```js
const [user, created] = await User.findOrCreate({
  where: { username: 'sdepold' },
  defaults: {
    job: 'Technical Lead JavaScript'
  }
});
```
* **findAndCountAll**:

findAndCountAll 方法是结合了 findAll 和 count 的便捷方法;

findAndCountAll 方法返回一个具有两个属性的对象:
* count - 一个整数 - 符合查询条件的记录总数
* rows - 一个数组对象 - 获得的记录

```js
const { count, rows } = await Project.findAndCountAll({
  where: {
    title: {
      [Op.like]: 'foo%'
    }
  },
  offset: 10,
  limit: 2
});
```

* **WHERE**:

```js
Post.findAll({
    where: {
        authorId: 2
    },
    // 等同于下面
    /* where: {
        authorId: {
            [Op.eq]: 2
        }
    } */
});


Post.findAll({
  where: {
    [Op.and]: [
      { authorId: 12 },
      { status: 'active' }
    ]
  }
});

// 删除
Post.destroy({
  where: {
    authorId: {
      [Op.or]: [12, 13]
    }
  }
});
```

* **操作符Op**：

[操作符Op列表](https://www.sequelize.com.cn/core-concepts/model-querying-basics)

```js
const { Op } = require("sequelize");
```

* **更新**：

```js
// 将所有没有姓氏的人更改为 "Doe"
await User.update({ lastName: "Doe" }, {
  where: {
    lastName: null
  }
});
```

* **删除**：

```js
await User.destroy({
  where: {
    firstName: "Jane"
  }
});
```

* **批量创建**：

`Model.bulkCreate`

```js
const captains = await Captain.bulkCreate([
  { name: 'Jack Sparrow' },
  { name: 'Davy Jones' }
]);
```

* **排序**：

order 参数采用一系列 项 来让 sequelize 方法对查询进行排序. 这些 项 本身是 [column, direction] 形式的数组. 该列将被正确转义,并且将在有效方向列表中进行验证(例如 ASC, DESC, NULLS FIRST 等).

order 数组的元素可以如下：

* 一个字符串 (它将被自动引用)
* 一个数组, 其第一个元素将被引用,第二个将被逐字追加
* 一个具有 raw 字段的对象:
* raw 内容将不加引用地逐字添加
* 其他所有内容都将被忽略,如果未设置 raw,查询将失败
* 调用 Sequelize.fn (这将在 SQL 中生成一个函数调用)
* 调用 Sequelize.col (这将引用列名)

具体参考官网例子

* **分组**：

```js
Project.findAll({ group: 'name' });
```
* **限制和分页**：

```js
// 提取10个实例/行
Project.findAll({ limit: 10 });

// 跳过8个实例/行
Project.findAll({ offset: 8 });
```

* **实用方法**：

```js
// 统计个数count
const amount = await Project.count({
  where: {
    id: {
      [Op.gt]: 25
    }
  }
});

await User.max('age'); // 40
await User.max('age', { where: { age: { [Op.lt]: 20 } } }); // 10
await User.min('age'); // 5
await User.min('age', { where: { age: { [Op.gt]: 5 } } }); // 10
await User.sum('age'); // 55
await User.sum('age', { where: { age: { [Op.gt]: 5 } } }); // 50

```

### 原始查询

sequelize.query(sql语句)

```js
const [results, metadata] = await sequelize.query("UPDATE users SET y = 42 WHERE x = 12");
// 结果将是一个空数组,元数据将包含受影响的行数.
```

### 主键

默认情况下,Sequelize 会假设你的表具有 id 主键属性.

```js
uuid: {
    type: DataTypes.UUID,
    primaryKey: true
}
```

如果你的模型根本没有主键,则可以使用 Model.removeAttribute('id');