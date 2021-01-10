# mysql

mysql是结构化数据库中的一种
mysql是一种提供了数据存放的服务

-->数据库：划分的存储区域
    --> table:
        --> js对象数组

**mysql安装**：

```bash
brew install mysql
```

mysql下载好慢。。。

网站上直接下载：

* 选中Download tab，然后选择最后的[MySql community(GPL)Downloads](https://dev.mysql.com/downloads/)社区免费版本
* 选中[MySql Community Server](https://dev.mysql.com/downloads/file/?id=499568)下载即可；可不用登录just start my download

**启动停止mysql:**

```bash
brew services start mysql
brew services stop mysql
```


**查看已经启动的列表**：

```bash
brew services list

// mysql started tlm  /Users/tlm/Library/LaunchAgents/homebrew.mxcl.mysql.plist

```

**连接mysql**：

```bash
mysql -u root
```

> * -u: -user 通过什么方式启动，此处通过root启动
> * -p: 密码；后面需要跟上密码，需要设置密码

启动后的一些mysql命令(每条命令后面必须加封号)：

* `show databases;`展示当时的数据库
* `use information_schema;`使用information_schema这个数据库
* `show tables;`进入到数据库后展示其中的表
* `select * from Todos;`Todos这个表中所有的数

**断开连接mysql**：

```bash
quit
```