---
title: Redis学习笔记--list类型及操作
tags: Redis
categories: 程序随记
comments: true
abbrlink: 65514bcf
date: 2017-10-08 12:25:52
---
list 是一个链表结构，主要功能是push、pop、获取一个范围的所有值等等，操作中key 理解为链表的名字。

Redis 的list 类型其实就是一个每个子元素都是string 类型的双向链表。链表的最大长度是(2的32 次方)。我们可以通过push,pop 操作从链表的头部或者尾部添加删除元素。这使得list既可以用作栈，也可以用作队列。

有意思的是list 的pop 操作还有阻塞版本的，当我们[lr]pop 一个list 对象时，如果list 是空，或者不存在，会立即返回nil。但是阻塞版本的b[lr]pop 可以则可以阻塞，当然可以加超时时间，超时后也会返回nil。为什么要阻塞版本的pop 呢，主要是为了避免轮询。举个简单的例子如果我们用list 来实现一个工作队列。执行任务的thread 可以调用阻塞版本的pop 去获取任务这样就可以避免轮询去检查是否有任务存在。当任务来时候工作线程可以立即返回，也可以避免轮询带来的延迟。说了这么多，接下来看一下实际操作的方法吧：

**lpush**
在key 对应list 的头部添加字符串元素
```
redis 127.0.0.1:6379> lpush mylist "world"
(integer) 1
redis 127.0.0.1:6379> lpush mylist "hello"
(integer) 2
redis 127.0.0.1:6379> lrange mylist 0 -1
1) "hello"
2) "world"
redis 127.0.0.1:6379>
```
在此处我们先插入了一个world，然后在world 的头部插入了一个hello。其中lrange 是用于取mylist 的内容。
___

**rpush**
在key 对应list 的尾部添加字符串元素
```
redis 127.0.0.1:6379> rpush mylist2 "hello"
(integer) 1
redis 127.0.0.1:6379> rpush mylist2 "world"
(integer) 2
redis 127.0.0.1:6379> lrange mylist2 0 -1
1) "hello"
2) "world"
redis 127.0.0.1:6379>
```
___

**linsert**
在key 对应list 的特定位置之前或之后添加字符串元素
```
redis 127.0.0.1:6379> rpush mylist3 "hello"
(integer) 1
redis 127.0.0.1:6379> rpush mylist3 "world"
(integer) 2
redis 127.0.0.1:6379> linsert mylist3 before "world" "there"
(integer) 3
redis 127.0.0.1:6379> lrange mylist3 0 -1
1) "hello"
2) "there"
3) "world"
redis 127.0.0.1:6379>
```
在此处我们先插入了一个hello，然后在hello 的尾部插入了一个world，然后又在world 的前面插入了there。
___

**lset**
设置list中下表的元素值（下标从0开始）
```
redis 127.0.0.1:6379> rpush mylist4 "one"
(integer) 1
redis 127.0.0.1:6379> rpush mylist4 "two"
(integer) 2
redis 127.0.0.1:6379> rpush mylist4 "three"
(integer) 3
redis 127.0.0.1:6379> lset mylist4 0 "four"
OK
redis 127.0.0.1:6379> lset mylist4 -2 "five"
OK
redis 127.0.0.1:6379> lrange mylist4 0 -1
1) "four"
2) "five"
3) "three"
redis 127.0.0.1:6379>
```
___

**lrem**
从key对应list中删除count个和value相同的元素。
count>0时，按从头到尾的顺序删除，具体如下：
```
redis 127.0.0.1:6379> rpush mylist5 "hello"
(integer) 1
redis 127.0.0.1:6379> rpush mylist5 "hello"
(integer) 2
redis 127.0.0.1:6379> rpush mylist5 "foo"
(integer) 3
redis 127.0.0.1:6379> rpush mylist5 "hello"
(integer) 4
redis 127.0.0.1:6379> lrem mylist5 2 "hello"
(integer) 2
redis 127.0.0.1:6379> lrange mylist5 0 -1
1) "foo"
2) "hello"
redis 127.0.0.1:6379>
```


**lrange**
lrange key start stop：返回存储在 key 的列表里指定范围内的元素。 start 和 end 偏移量都是基于0的下标，即list的第一个元素下标是0（list的表头），第二个元素下标是1，以此类推。

偏移量也可以是负数，表示偏移量是从list尾部开始计数。 例如， -1 表示列表的最后一个元素，-2 是倒数第二个，以此类推。
```
redis> RPUSH mylist "one"
(integer) 1
redis> RPUSH mylist "two"
(integer) 2
redis> RPUSH mylist "three"
(integer) 3
redis> LRANGE mylist 0 0
1) "one"
redis> LRANGE mylist -3 2
1) "one"
2) "two"
3) "three"
redis> LRANGE mylist -100 100
1) "one"
2) "two"
3) "three"
redis> LRANGE mylist 5 10
(empty list or set)
redis> 

#count<0 时，按从尾到头的顺序删除，具体如下:
redis 127.0.0.1:6379> rpush mylist6 "hello"
(integer) 1
redis 127.0.0.1:6379> rpush mylist6 "hello"
(integer) 2
redis 127.0.0.1:6379> rpush mylist6 "foo"
(integer) 3
redis 127.0.0.1:6379> rpush mylist6 "hello"
(integer) 4
redis 127.0.0.1:6379> lrem mylist6 -2 "hello"
(integer) 2
redis 127.0.0.1:6379> lrange mylist6 0 -1
1) "hello"
2) "foo"
redis 127.0.0.1:6379>

#count=0 时，删除全部，具体如下:
redis 127.0.0.1:6379> rpush mylist7 "hello"
(integer) 1
redis 127.0.0.1:6379> rpush mylist7 "hello"
(integer) 2
redis 127.0.0.1:6379> rpush mylist7 "foo"
(integer) 3
redis 127.0.0.1:6379> rpush mylist7 "hello"
(integer) 4
redis 127.0.0.1:6379> lrem mylist7 0 "hello"
(integer) 3
redis 127.0.0.1:6379> lrange mylist7 0 -1
1) "foo"
redis 127.0.0.1:6379>
```

**ltrim**
保留指定key的值范围内的数据(*不在指定范围内的数据，将被删除*)
```
redis 127.0.0.1:6379> rpush mylist8 "one"
(integer) 1
redis 127.0.0.1:6379> rpush mylist8 "two"
(integer) 2
redis 127.0.0.1:6379> rpush mylist8 "three"
(integer) 3
redis 127.0.0.1:6379> rpush mylist8 "four"
(integer) 4
redis 127.0.0.1:6379> ltrim mylist8 1 -1
OK
redis 127.0.0.1:6379> lrange mylist8 0 -1
1) "two"
2) "three"
3) "four"
redis 127.0.0.1:6379>
```
___

**lpop**
从list的头部删除元素，并返回删除元素。
```
redis 127.0.0.1:6379> lrange mylist 0 -1
1) "hello"
2) "world"
redis 127.0.0.1:6379> lpop mylist
"hello"
redis 127.0.0.1:6379> lrange mylist 0 -1
1) "world"
redis 127.0.0.1:6379>
```
___

**rpop**
从list的尾部删除元素，并返回删除元素
```
redis 127.0.0.1:6379> lrange mylist2 0 -1
1) "hello"
2) "world"
redis 127.0.0.1:6379> rpop mylist2
"world"
redis 127.0.0.1:6379> lrange mylist2 0 -1
1) "hello"
redis 127.0.0.1:6379>
```
___

**rpoplpush**
从第一个list 的尾部移除元素，并添加到第二个list 的头部，最后返回被移除的元素值，整个操作是原子的，如果第一个list 是空或者不存在返回nil。
```
redis 127.0.0.1:6379> lrange mylist5 0 -1
1) "three"
2) "foo"
3) "hello"
redis 127.0.0.1:6379> lrange mylist6 0 -1
1) "hello"
2) "foo"

redis 127.0.0.1:6379> rpoplpush mylist5 mylist6
"hello"

redis 127.0.0.1:6379> lrange mylist5 0 -1
1) "three"
2) "foo"
redis 127.0.0.1:6379> lrange mylist6 0 -1
1) "hello"
2) "hello"
3) "foo"
redis 127.0.0.1:6379>

```
___

**lindex**
返回名称为key的list中index位置的元素。
```
redis 127.0.0.1:6379> lrange mylist5 0 -1
1) "three"
2) "foo"
redis 127.0.0.1:6379> lindex mylist5 0
"three"
redis 127.0.0.1:6379> lindex mylist5 1
"foo"
redis 127.0.0.1:6379>
```
___

**llen**
返回key 对应list 的长度
```
redis 127.0.0.1:6379> llen mylist5
(integer) 2
redis 127.0.0.1:6379>
```
