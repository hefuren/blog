---
title: HBase学习笔记
tags:
  - HBase
  - 大数据
categories: 程序随记
comments: true
abbrlink: d281d21f
date: 2017-10-08 14:57:02
copyright: true
---
#### HBase的表、行、列和单元格的概念：
最基本的单位是列（column），一列或多列形成一行（row），并由唯一的行键来确定存储。反过来，一个表（Table）中有若干行，其中每列可能有多个版本，在每一个单元格（cell）中存储了不同的值。

除了每个单元格可以保留若干个版本的数据这一点，整个结构看起来像典型的数据库的描述。所有的行按照行键字典序进行排序存储。

一行由若干列组成，若干列又构成一个列族（column family），一个列族的所有列存储在同一个底层的存储文件里，这个存储文件叫做HFile。

所有的列和行的信息都会通过列族在表中定义，每一列的值或单元格的值都具有时间戳，默认由系统指定，也可以由用户显示设置。

数据存储模式：（Table,RowKey,Family,Column,Timestamp）→Value
行数据的存取操作是原子的（atomic），可以读写任意数目的列，目前还不支持跨行事务和跨表事务。

#### 自动分区
HBase中扩展和负载均衡的基本单元称为region，region本质上是以行键排序的连续存储的区间。
每一个region只能由一台region 服务器（region server）加载，每一台region服务器可以同时加载多个region。

#### 存储API
API提供了建表、删表、增加列族和删除列族操作，同时还提供了修改表和列族数据的功能，如压缩和设置块大小等。

HBase可以通过add 方法对每一个put操作，这个只适合小数据量的操作，如果有个应用程序需要每秒存储上千行数据到HBase表中，这样的处理不合适。
HBase的API配备一个客户端的写缓冲区（write buffer），缓冲区负责收集put操作，然后调用RPC操作一次性将put送往服务器。全局交换机控制着该缓冲区是否在使用，以下是其方法：
```
void setAutoFlush(boolean autoFlush)
boolean isAutoFlush()
```
默认情况下，客户端缓冲区是禁用的。可以通过将自动刷写（autoflush）设置为false来激活缓冲区，调用如下：
 ```
table.setAutoFlush(false)
```
激活客户端缓冲区之后，用户可以像单行put那样，将数据存储到HBase中，此时的操作不会产生RPC调用，因为存储的put实例保持在客户端进程的内存中。当需要强制把数据写到服务端时，可以调用另外一个API函数 flushCommits()方法将所有的修改传送到远程服务器。

HBase批量处理操作：事实上，许多基于列表的操作，如delete(List<Delist> deletes)或者get(List<Get> gets)，都是基于batch()方法实现的。它们都是一些为了方便用户使用而保留的方法。如果你是新手，**推荐使用batch()方法**进行所有操作。

```
void batch(List<Row> actions, Object[] results) throws IOException,InterruptedException
Object[] batch(List<Row> actions) throws IOException,InterruptedException
```
batch()请求是同步的，会把操作直接发送到服务器端，这个过程没有什么延迟或其他中间操作。这与put()调用明显不同，所以请慎重挑选需要的方法。
两种方法的共同点：
get、put、delete都支持。如果只选时出现问题，客户端将抛出异常并报告问题。它们都不使用客户端写缓冲区。
