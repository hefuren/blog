---
title: MongoDB学习笔记——查询
tags: MongoDB
categories: 程序随记
comments: true
abbrlink: a995f898
date: 2017-10-08 12:19:23
copyright: true
---
转自：http://www.cnblogs.com/stephen-liu74/archive/2012/08/03/2553803.html

**1、基本查询**

```
//构造查询数据
 > db.test.findOne()   
 {         
     "_id" : ObjectId("4fd58ecbb9ac507e96276f1a"),
     "name" : "stephen",        
     "age" : 35,         
     "genda" : "male",         
     "email" : "stephen@hotmail.com"    
}

// 多条件查询。下面的示例等同于SQL语句的where name = "stephen" and age = 35
  > db.test.find({}, {"name":1,"age":1})
{ 
     "_id" : ObjectId("4fd58ecbb9ac507e96276f1a"), 
     "name" : "stephen", 
     "age" : 35
}

// 指定不返回的文档键值对。下面的示例将返回除name之外的所有键值对。
> db.test.find({}, {"name":0})    // 0 表示不查询name属性
{
     "_id" : ObjectId("4fd58ecbb9ac507e96276f1a"),
     "age" : 35, 
     "genda" : "male", 
     "email" : "stephen@hotmail.com"
 }
```
**2、查询条件**
MongoDB提供了一组比较操作符：**$lt / $lte / $gt / $gte / $ne**，依次等价于**<,<=, >, >=, != **。
```
 //下面的示例返回符合条件age >= 18 && age <= 40的文档  
> db.test.find({"age":{"$gte":18, "$lte":40}})    
{ 
     "_id" : ObjectId("4fd58ecbb9ac507e96276f1a"), 
     "name" : "stephen", 
     "age" : 35,
     "genda" : "male", 
     "email" : "stephen@hotmail.com"
 }

//下面的示例返回条件符合name != "stephen1"
> db.test.find({"name":{"$ne":"stephen1"}})    
{ 
     "_id" : ObjectId("4fd58ecbb9ac507e96276f1a"), 
     "name" : "stephen", 
     "age" : 35,
     "genda" : "male", 
     "email" : "stephen@hotmail.com" 
}

//$in等同于SQL中的in，下面的示例等同于SQL中的in ("stephen","stephen1")
 > db.test.find({"name":{"$in":["stephen","stephen1"]}})    
{ 
     "_id" : ObjectId("4fd58ecbb9ac507e96276f1a"), 
     "name" : "stephen", 
     "age" : 35,
     "genda" : "male", 
     "email" : "stephen@hotmail.com" 
} 

//和SQL不同的是，MongoDB的in list中的数据可以是不同类型。这种情况可用于不同类型的别名场景。    
> db.test.find({"name":{"$in":["stephen",123]}})    
{ 
     "_id" : ObjectId("4fd58ecbb9ac507e96276f1a"), 
     "name" : "stephen", 
     "age" : 35,
     "genda" : "male", 
     "email" : "stephen@hotmail.com" 
} 

//$nin等同于SQL中的not in，同时也是$in的取反。如：   
> db.test.find({"name":{"$nin":["stephen2","stephen1"]}})    
{ 
     "_id" : ObjectId("4fd58ecbb9ac507e96276f1a"), 
     "name" : "stephen", 
     "age" : 35,
     "genda" : "male", 
     "email" : "stephen@hotmail.com" 
}

// $or等同于SQL中的or，$or所针对的条件被放到一个数组中，每个数组元素表示or的一个条件。
//下面的示例等同于name = "stephen1" or age = 35*    
> db.test.find({"$or": [{"name":"stephen1"}, {"age":35}]})    
{ 
     "_id" : ObjectId("4fd58ecbb9ac507e96276f1a"), 
     "name" : "stephen", 
     "age" : 35,
     "genda" : "male", 
     "email" : "stephen@hotmail.com" 
} 

//下面的示例演示了如何混合使用$or和$in。
> db.test.find({"$or": [{"name":{"$in":["stephen","stephen1"]}}, {"age":36}]})   
{ 
    "_id" : ObjectId("4fd58ecbb9ac507e96276f1a"), 
    "name" : "stephen", 
    "age" : 35,
    "genda" : "male", 
    "email" : "stephen@hotmail.com" 
}

//$not表示取反，等同于SQL中的not。    
> db.test.find({"name": {"$not": {"$in":["stephen2","stephen1"]}}})    
{ 
    "_id" : ObjectId("4fd58ecbb9ac507e96276f1a"), 
    "name" : "stephen", 
    "age" : 35,
    "genda" : "male", 
    "email" : "stephen@hotmail.com" 
}
```
**3、null数据类型的查询**
```
//在进行值为null数据的查询时，所有值为null，以及不包含指定键的文档均会被检索出来。
> db.test.find({"x":null})
{ 
    "_id" : ObjectId("4fd59d30b9ac507e96276f1b"), 
     "x" : null
 }
{ 
    "_id" : ObjectId("4fd59d49b9ac507e96276f1c"), 
    "y" : 1 
}
 
//需要将null作为数组中的一个元素进行相等性判断，即便这个数组中只有一个元素。
//再有就是通过$exists判断指定键是否存在。
> db.test.find({"x": {"$in": [null], "$exists":true}})
{ "_id" : ObjectId("4fd59d30b9ac507e96276f1b"), "x" : null }
```
