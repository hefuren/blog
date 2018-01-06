---
title: MongoDB基本命令
tags: MongoDB
categories: 程序随记
comments: true
abbrlink: 5b072929
date: 2017-10-08 12:18:13
copyright: true
---
**MongoDB基本命令**
```
//查询所有数据库列表
show dbs 

//查看当前连接哪个数据库
db

//切换到需要使用的数据库，例如：use test
use database Name

//查看当前数据库下有哪些表或者collection
show collections

//想知道mongodb支持哪些命令，可以直接输入help 
help

//如果想知道当前数据库支持哪些方法
db.help();

//如果想知道当前数据库下的表或者表collection支持哪些方法，可以使用一下命令如
db.user.help();  //user为表名 

//如果你想备份数据库test
$ ./mongodump -d test -o test/ 

//如果你想恢复数据库test
$ ./mongorestore -d test -c user test/test/user.bson  //利用mongorestore表恢复刚才利用mongodump备份的数据 
```

**help命令：**
```
HELP
      show dbs                     show database names
      show collections             show collections in current database
      show users                   show users in current database
      show profile                 show most recent system.profile entries with time >= 1ms
      use <db name>                set curent database to <db name>
      db.help()                    help on DB methods
      db.foo.help()                help on collection methods
      db.foo.find()                list objects in collection foo
      db.foo.find( { a : 1 } )     list objects in foo where a == 1
      it                           result of the last line evaluated; use to further iterate
```

**db.help()命令：**
```
DB methods:
      db.addUser(username, password) 添加数据库授权用户
      db.auth(username, password)                访问认证
      db.cloneDatabase(fromhost) 克隆数据库
      db.commandHelp(name) returns the help for the command
      db.copyDatabase(fromdb, todb, fromhost)  复制数据库
      db.createCollection(name, { size : ..., capped : ..., max : ... } ) 创建表
      db.currentOp() displays the current operation in the db
      db.dropDatabase()        删除当前数据库
      db.eval_r(func, args) run code server-side
      db.getCollection(cname) same as db['cname'] or db.cname
      db.getCollectionNames()        获取当前数据库的表名
      db.getLastError() - just returns the err msg string
      db.getLastErrorObj() - return full status object
      db.getMongo() get the server connection object
      db.getMongo().setSlaveOk() allow this connection to read from the nonmaster member of a replica pair
      db.getName()
      db.getPrevError()
      db.getProfilingLevel()
      db.getReplicationInfo()
      db.getSisterDB(name) get the db at the same server as this onew
      db.killOp() kills the current operation in the db
      db.printCollectionStats()   打印各表的状态信息
      db.printReplicationInfo()        打印主数据库的复制状态信息
      db.printSlaveReplicationInfo()        打印从数据库的复制状态信息
      db.printShardingStatus()                打印分片状态信息
      db.removeUser(username) 删除数据库用户
      db.repairDatabase() 修复数据库
      db.resetError()
      db.runCommand(cmdObj) run a database command.  if cmdObj is a string, turns it into { cmdObj : 1 }
      db.setProfilingLevel(level) 0=off 1=slow 2=all
      db.shutdownServer()
      db.version() current version of the server
```
