---
title: Redis学习笔记--sets类型及操作1
tags: Redis
categories: 程序随记
comments: true
abbrlink: 354edc91
date: 2017-10-07 19:26:50
---
set 是集合，和我们数学中的集合概念相似，对集合的操作有添加删除元素，有对多个集合求交并差等操作，操作中key 理解为集合的名字。

Redis 的set 是string 类型的无序集合。set 元素最大可以包含(2 的32 次方)个元素。

set 的是通过hash table 实现的，所以添加、删除和查找的复杂度都是O(1)。hash table 会随着添加或者删除自动的调整大小。需要注意的是调整hash table 大小时候需要同步（获取写锁）会阻塞其他读写操作，可能不久后就会改用跳表（skip list）来实现，跳表已经在sortedset 中使用了。关于set 集合类型除了基本的添加删除操作，其他有用的操作还包含集合的取并集(union)，交集(intersection)，差集(difference)。通过这些操作可以很容易的实现sns中的好友推荐和blog 的tag 功能。下面详细介绍set 相关命令：

**sadd**
向名称为key的set中添加元素
```
redis 127.0.0.1:6379> sadd myset "hello"
(integer) 1
redis 127.0.0.1:6379> sadd myset "world"
(integer) 1

 #向set中添加重复的数据，添加将失败，并返回0
redis 127.0.0.1:6379> sadd myset "world" 
(integer) 0  

redis 127.0.0.1:6379> smembers myset
1) "world"
2) "hello"
redis 127.0.0.1:6379>
```
本例中，我们向myset 中添加了三个元素，但由于第三个元素跟第二个元素是相同的，所以第三个元素没有添加成功，最后我们用smembers 来查看myset 中的所有元素。

___

**srem**
删除名称为key的set中的元素member
```
redis 127.0.0.1:6379> sadd myset2 "one"
(integer) 1
redis 127.0.0.1:6379> sadd myset2 "two"
(integer) 1
redis 127.0.0.1:6379> sadd myset2 "three"
(integer) 1

#本例中，我们向myset2 中添加了三个元素后，再调用srem 来删除one 和four，但由于元素中没有four 所以，此条srem 命令执行失败。
redis 127.0.0.1:6379> srem myset2 "one"
(integer) 1
redis 127.0.0.1:6379> srem myset2 "four"
(integer) 0
redis 127.0.0.1:6379> smembers myset2
1) "three"
2) "two"
redis 127.0.0.1:6379>
```
___

**spop**
随机返回并删除名称为key的set中的一个元素
```
redis 127.0.0.1:6379> sadd myset3 "one"
(integer) 1
redis 127.0.0.1:6379> sadd myset3 "two"
(integer) 1
redis 127.0.0.1:6379> sadd myset3 "three"
(integer) 1
redis 127.0.0.1:6379> spop myset3
"three"
redis 127.0.0.1:6379> smembers myset3
1) "two"
2) "one"
redis 127.0.0.1:6379>
```
本例中，我们向myset3 中添加了三个元素后，再调用spop 来随机删除一个元素，可以看到three 元素被删除了。
___

**sdiff**
返回所有给定key与第一个key的差集。
```
redis 127.0.0.1:6379> smembers myset2
1) "three"
2) "two"
redis 127.0.0.1:6379> smembers myset3
1) "two"
2) "one"
redis 127.0.0.1:6379> sdiff myset2 myset3
1) "three"
redis 127.0.0.1:6379>

#我们也可以将myset2 和myset3 换个顺序来看一下结果:
redis 127.0.0.1:6379> sdiff myset3 myset2
1) "one"
redis 127.0.0.1:6379>
```
___

**sdiffstore**
返回所有给定key与第一个key的差集，并将结果存为另一个key
```
redis 127.0.0.1:6379> smembers myset2
1) "three"
2) "two"
redis 127.0.0.1:6379> smembers myset3
1) "two"
2) "one"
redis 127.0.0.1:6379> sdiffstore myset4 myset2 myset3
(integer) 1
redis 127.0.0.1:6379> smembers myset4
1) "three"
redis 127.0.0.1:6379>
```
___

**sinterstore**
返回所有给定key的交集，并将结果存为另一个key
```
redis 127.0.0.1:6379> smembers myset2
1) "three"
2) "two"
redis 127.0.0.1:6379> smembers myset3
1) "two"
2) "one"
redis 127.0.0.1:6379> sinterstore myset5 myset2 myset3
(integer) 1
redis 127.0.0.1:6379> smembers myset5
1) "two"
redis 127.0.0.1:6379>
```
通过本例的结果可以看出, myset2 和myset3 的交集被保存到myset5 中了
___

**sunion**
返回所有给定key 的并集
```
redis 127.0.0.1:6379> smembers myset2
1) "three"
2) "two"
redis 127.0.0.1:6379> smembers myset3
1) "two"
2) "one"
redis 127.0.0.1:6379> sunion myset2 myset3
1) "three"
2) "one"
3) "two"
redis 127.0.0.1:6379>
```
通过本例的结果可以看出, myset2 和myset3 的并集被查出来了
___

**sunionstore**
返回所有给定key 的并集，并将结果存为另一个key
```
redis 127.0.0.1:6379> smembers myset2
1) "three"
2) "two"
redis 127.0.0.1:6379> smembers myset3
1) "two"
2) "one"
redis 127.0.0.1:6379> sunionstore myset6 myset2 myset3
(integer) 3
redis 127.0.0.1:6379> smembers myset6
1) "three"
2) "one"
3) "two"
redis 127.0.0.1:6379>
```
通过本例的结果可以看出, myset2 和myset3 的并集被保存到myset6 中了。