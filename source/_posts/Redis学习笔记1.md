---
title: Redis学习笔记1
tags: Redis
categories: 程序随记
comments: true
abbrlink: fb55fc23
date: 2017-10-08 12:23:13
---
####初识Redis
Redis是一个开源使用ANSI C语言编写、支持网络、可基于内存亦可持久化的日志型、key-value数据库，并提供多种语言的API。从2010年3月15日起，Redis的开发工作由VMware主持。

####数据类型
作为Key-Value型数据库，Redis也提供键（key）和键值（Value）的映射关系。但是，除了常规的数值或字符串，Redis的键值还可以是以下形式之一：
- List （列表）
- Set（集合）
- Sorted sets （有序集合）
- Hashes （哈希表）
键值的数据类型决定了该键值支持的操作。Redis支持诸如列表、集合或有序集合的交集、并集、查集等高级原子操作；同时，如果键值的类型是普通数字，Redis则提供自增等原子操作。

####持久化
通常，Redis将数据存储在内存中，或被配置为使用虚拟内存。通过两种方式可以实现数据持久化：使用截图的方式，将内存的数据不断写入磁盘；或使用类似MySQL的日志方式，记录每次更新的日志。前者性能较高，但是可能会引起一定程度的数据丢失；后者相反。

####操作数据库
```
#插入数据
> set name wwl
OK

#查询数据
> get name
"wwl"

#删除键值
> del name

#验证键值是否存在
> exists name
(integer)0
```
