---
title: Redis学习笔记--sets类型及操作2
tags: Redis
categories: 程序随记
comments: true
abbrlink: ac478d2b
date: 2017-10-07 17:58:28
---
**smove**
从第一个key 对应的set 中移除member 并添加到第二个对应set 中
```
redis 127.0.0.1:6379> smembers myset2
1) "three"
2) "two"
redis 127.0.0.1:6379> smembers myset3
1) "two"
2) "one"
redis 127.0.0.1:6379> smove myset2 myset7 three
(integer) 1
redis 127.0.0.1:6379> smembers myset7
1) "three"
redis 127.0.0.1:6379>
```
通过本例可以看到，myset2 的three 被移到myset7 中了
___

**scard**
返回名称为key的set的元素个数。
```
redis 127.0.0.1:6379> scard myset2
(integer) 1
redis 127.0.0.1:6379>
```
通过本例可以看到，myset2 的成员数量为1
___

**sismember**
测试member 是否是名称为key 的set 的元素
```
redis 127.0.0.1:6379> smembers myset2
1) "two"
redis 127.0.0.1:6379> sismember myset2 two
(integer) 1
redis 127.0.0.1:6379> sismember myset2 one
(integer) 0
redis 127.0.0.1:6379>
```
通过本例可以看到，two 是myset2 的成员，而one 不是。

___

**srandmember**
随机返回名称为key 的set 的一个元素，但是不删除元素
```
redis 127.0.0.1:6379> smembers myset3
1) "two"
2) "one"
redis 127.0.0.1:6379> srandmember myset3
"two"
redis 127.0.0.1:6379> srandmember myset3
"one"
redis 127.0.0.1:6379>
```
