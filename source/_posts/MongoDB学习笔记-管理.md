---
title: MongoDB学习笔记--管理
tags: MongoDB
categories: 程序随记
comments: true
abbrlink: 3ec2b753
date: 2017-10-08 12:21:09
copyright: true
---
#### 启动和停止MongoDB

**从命令行启动：**
```
#启动MongoDB服务器，让其作为守护进程监听5586端口，并将所有输出记录到mongodb.log
$ ./mongod --port 5586 --fork --logpath mongodb.log 
```

**停止MongoDB：**

如果服务器是作为前台经常运行在终端的，就直接按“Ctrl-C”。否则，就用kill这种命令发出信号。如果mongod的PID是10014,就可以通过命令停止MongoDB：
** kill -2 10014 (SIGINT) 或者 kill 10014 (SIGINT) **

另一种稳妥的方式就是使用 *shutdown*命令，例如：
```
> use admin
switched to db admin
> db.shutdownServer();
server should be down......
```

#### 备份与恢复
mongodump 和 mongorestore命名，对MongoDB进行备份与恢复。和大多数MongoDB的命令工具一样，mongodump也可以通过运行 --help选项查看所有选项 ：$ ./mongodump  --help

备份与恢复命令：
```
//如果你想备份数据库test
$ ./mongodump -d test -o test/ 

//如果你想恢复数据库test
$ ./mongorestore -d test -c user test/test/user.bson  //利用mongorestore表恢复刚才利用mongodump备份的数据
```

虽然用mongodump和mongorestore能不停机备份，但是我们却失去了获取实时数据视图的能力。MongoDB的fsync命令能在MongoDB运行时复制数据目录还不会毁坏数据。

fsync命令会强制服务器将所有暖冲区写入磁盘。还可以选择上锁阻止对数据库的进一步写入，直到释放锁为止。写入锁是让fsync在备份时发挥作用的关键。下面的例子展示了如何在shell中操作，强制执行了fsync并获得了写入锁：
```
> user admin
switched to db admin
> db.runCommand({"fsync":1,"lock":1});
{
   "info":"now locked against writes, use db.$cmd.sys.unlock.findOne() to unlock",
    "ok":1
}

#备份好，就要解锁
> db.$cmd.sys.unlock.findOne();
{"ok":1,"info":"unlock requested"}

> db.currentOp(); #运行currentOp是为了确保已经解锁了。
{"inprog":[]}
```
有了fsync命令，就能够非常灵活地备份，不用停掉服务器，也不用牺牲备份的实时性。要付出的代价就是一些写入操作暂时被阻塞。

#### 修复
修复所有数据库最简单的方式就是加上 --repair: mongod --repair来启动服务器。修复数据库实际过程实际上非常简单：将所有的文档导出然后马上导入。忽略那些无效的文档。完成以后，会建立索引。
> 修复数据库还能起到压缩数据的作用。闲置的空间（比如删除体积较大的集合或者删除大量文档后腾出的空间）在修复后被重新回收。
___
修复损坏的数据是不得已时的最后一招，尽可能稳妥的停掉服务器，利用复制功能实现故障恢复，经常做备份，这些才是最有效管理数据的手段。

```
> use test
switched to db test
> db.repairDatabase()
{"ok":1}
```

#### 复制
**主从复制**
主从复制是MongoDB最常用的复制方式。可用于备份、故障恢复、读扩展等。最基本的设置方式就是建立一个主节点和一个或者多个从节点，每个从节点要知道主节点的地址。运行**mongod --master**就启动了主服务器。运行**mongod --slave --source master_address**则启动了从服务器，其中*master_address*就是上面的主节点的地址。

```
# 设置主节点，并绑定端口10000
$ mkdir -p ~/dbs/master
$ ./mongod --dbpath ~/dbs/master --port 10000 --master

#设置从节点，选择不同的目录和端口（示例配置从节点与主节点在同一台服务器上）
$ mkdir -p ~/dbs/slave
$ ./mongod --dbpath ~/dbs/slave --port 10001 --slave --source localhost:10000
```

**副本集**
简单地说，副本集就是有自动故障恢复功能的主从集群。主从集群和副本集最为明显的区别是副本集没有固定的“主节点”：整个集群会选举出一个“主节点”，当其不能工作时则变更到其他节点。副本集中会有一个活跃节点和一个或多个备份节点。副本集最美妙的地方就是所有东西都是自动化的。
