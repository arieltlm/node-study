**ORM-对象管理模型**
将数据库中每一张表通过对象的形式抽出来，与对应语言（java/js）进行关联

主要是用于快速书写sql

**Sequelize**：

[Sequelize](https://www.sequelize.com.cn/) 是一个基于 promise 的 Node.js ORM, 目前支持 Postgres, MySQL, MariaDB, SQLite 以及 Microsoft SQL Server. 它具有强大的事务支持, 关联关系, 预读和延迟加载,读取复制等功能。

node-application-->ORM-->驱动（node-mysql）[mysql2]---> mysql db

**安装**：

```bash
npm install --save sequelize
// 手动为所选数据库安装驱动程序
npm install --save mysql2
```

**安装迁移工具**：

```bash
npm install --save-dev sequelize-cli

// 在文件中直接初始化增加：
npx sequelize-cli init
```

* config, 包含配置文件,它告诉CLI如何连接数据库
* models,包含你的项目的所有模型
* migrations, 包含所有迁移文件
* seeders, 包含所有种子文件

**修改配置中数据库名字**：

在navicat中新建一个数据库

在/config/config.json，修改development开发环境下的database

创建模型，参考官网[创建第一个模型(和迁移)](https://www.sequelize.com.cn/other-topics/migrations)