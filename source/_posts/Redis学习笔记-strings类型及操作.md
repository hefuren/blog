---
title: Redis学习笔记--strings类型及操作1
tags: Redis
categories: 程序随记
comments: true
abbrlink: 9b68d42a
date: 2017-10-08 12:23:56
---
**set**
设置key 对应的值为string 类型的value。例如我们添加一个name= HongWan 的键值对，可以这样做:
```
redis 127.0.0.1:6379> set name HongWan
OK
redis 127.0.0.1:6379>
```

**setnx**
设置key 对应的值为string 类型的value。如果key 已经存在，返回0，nx 是not exist 的意思。例如我们添加一个name= HongWan_new 的键值对，可以这样做:
```
redis 127.0.0.1:6379> get name
"HongWan"
redis 127.0.0.1:6379> setnx name HongWan_new
(integer) 0
redis 127.0.0.1:6379> get name
"HongWan"
redis 127.0.0.1:6379>
```

**setex**
设置key 对应的值为string 类型的value，并指定此键值对应的有效期。例如我们添加一个haircolor= red 的键值对，并指定它的有效期是10 秒，可以这样做:
```
redis 127.0.0.1:6379> setex haircolor 10 red
OK
redis 127.0.0.1:6379> get haircolor
"red"
redis 127.0.0.1:6379> get haircolor
(nil)
redis 127.0.0.1:6379>
```
可见由于最后一次的调用是10 秒以后了，所以取不到haicolor 这个键对应的值。

**setrange**
设置指定key 的value 值的子字符串。例如我们希望将HongWan 的126 邮箱替换为gmail 邮箱，那么我们可以这样做:
```
redis 127.0.0.1:6379> get name
"HongWan@126.com"
redis 127.0.0.1:6379> setrange name 8 gmail.com
(integer) 17
redis 127.0.0.1:6379> get name
"HongWan@gmail.com"
redis 127.0.0.1:6379>
```
其中的8 是指从下标为8（包含8）的字符开始替换

**mset**
一次设置多个key 的值，成功返回ok 表示所有的值都设置了，失败返回0 表示没有任何值被设置。
```
redis 127.0.0.1:6379> mset key1 HongWan1 key2 HongWan2
OK
redis 127.0.0.1:6379> get key1
"HongWan1"
redis 127.0.0.1:6379> get key2
"HongWan2"
redis 127.0.0.1:6379>
```

**msetnx**
一次设置多个key 的值，成功返回ok 表示所有的值都设置了，失败返回0 表示没有任何值被设置，但是不会覆盖已经存在的key。
```
redis 127.0.0.1:6379> get key1
"HongWan1"
redis 127.0.0.1:6379> get key2
"HongWan2"
redis 127.0.0.1:6379> msetnx key2 HongWan2_new key3 HongWan3
(integer) 0
redis 127.0.0.1:6379> get key2
"HongWan2"
redis 127.0.0.1:6379> get key3
(nil)
```
可以看出如果这条命令返回0，那么里面操作都会回滚，都不会被执行。

**get**
获取key 对应的string 值,如果key 不存在返回nil。例如我们获取一个库中存在的键name，可以很快得到它对应的value
```
redis 127.0.0.1:6379> get name
"HongWan"
redis 127.0.0.1:6379>

//我们获取一个库中不存在的键name1，那么它会返回一个nil 以表时无此键值对
redis 127.0.0.1:6379> get name1 
(nil)
redis 127.0.0.1:6379>
```

**getset**
设置key 的值，并返回key 的**旧值**。
```
redis 127.0.0.1:6379> get name
"HongWan"
redis 127.0.0.1:6379> getset name HongWan_new
"HongWan"
redis 127.0.0.1:6379> get name
"HongWan_new"
redis 127.0.0.1:6379>

#接下来我们看一下如果key 不存的时候会什么样儿?
redis 127.0.0.1:6379> getset name1 aaa  //可见，如果key 不存在，那么将返回nil
(nil)  
redis 127.0.0.1:6379>

```

**getrange**
获取指定key 的value 值的子字符串。具体样例如下:
```
redis 127.0.0.1:6379> get name
"HongWan@126.com"

#字符串左面下标是从0 开始的
redis 127.0.0.1:6379> getrange name 0 6
"HongWan"
redis 127.0.0.1:6379>

#字符串右面下标是从-1 开始的
redis 127.0.0.1:6379> getrange name -7 -1
"126.com"
redis 127.0.0.1:6379>

#当下标超出字符串长度时，将默认为是同方向的最大下标
redis 127.0.0.1:6379> getrange name 7 100
"@126.com"
redis 127.0.0.1:6379>
```

**mget**
一次获取多个key 的值，如果对应key 不存在，则对应返回nil。具体样例如下:
```
redis 127.0.0.1:6379> mget key1 key2 key3
1) "HongWan1"
2) "HongWan2"
3) (nil)   //key3 由于没有这个键定义，所以返回nil。
redis 127.0.0.1:6379>
```

**incr**
对key 的值做加加操作,并返回新的值。注意incr 一个不是int 的value 会返回错误，incr 一个不存在的key，则设置key 为1
```
redis 127.0.0.1:6379> set age 20
OK
redis 127.0.0.1:6379> incr age
(integer) 21
redis 127.0.0.1:6379> get age
"21"
redis 127.0.0.1:6379>
```

**incrby**
同incr 类似，加指定值 ，key 不存在时候会设置key，并认为原来的value 是 0
```
redis 127.0.0.1:6379> get age
"21"
redis 127.0.0.1:6379> incrby age 5
(integer) 26
redis 127.0.0.1:6379> get name
"HongWan@gmail.com"
redis 127.0.0.1:6379> get age
"26"
redis 127.0.0.1:6379>
```

**decr**
对key 的值做的是减减操作，decr 一个不存在key，则设置key 为-1
```
redis 127.0.0.1:6379> get age
"26"
redis 127.0.0.1:6379> decr age
(integer) 25
redis 127.0.0.1:6379> get age
"25"
redis 127.0.0.1:6379>
```

**decrby**
同decr，减指定值。
```
redis 127.0.0.1:6379> get age
"25"
redis 127.0.0.1:6379> decrby age 5
(integer) 20
redis 127.0.0.1:6379> get age
"20"
redis 127.0.0.1:6379>

#decrby 完全是为了可读性，我们完全可以通过incrby 一个负值来实现同样效果，反之一样。
redis 127.0.0.1:6379> get age
"20"
redis 127.0.0.1:6379> incrby age -5
(integer) 15
redis 127.0.0.1:6379> get age
"15"
redis 127.0.0.1:6379>
```

**append**
给指定key 的字符串值追加value,返回新字符串值的长度。例如我们向name 的值追加一个@126.com 字符串，那么可以这样做:
```
redis 127.0.0.1:6379> append name @126.com
(integer) 15
redis 127.0.0.1:6379> get name
"HongWan@126.com"
redis 127.0.0.1:6379>
```

**strlen**
取指定key 的value 值的长度。
```
redis 127.0.0.1:6379> get name
"HongWan_new"
redis 127.0.0.1:6379> strlen name
(integer) 11
redis 127.0.0.1:6379> get age
"15"
redis 127.0.0.1:6379> strlen age
(integer) 2
redis 127.0.0.1:6379>
```