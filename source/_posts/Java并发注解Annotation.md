---
title: Java并发注解Annotation
tags: Java
categories: 程序随记
comments: true
abbrlink: 7e897a5b
date: 2017-10-08 11:15:51
copyright: true
---
Java并发编程中，用到了一些专门为并发编程准备的 Annotation。主要包括三类：
**1、类 Annotation（注解）**
就像名字一样，这些注解是针对类的。主有要以下三个：
@Immutable
@ThreadSafe
@NotThreadSafe

@ThreadSafe 是表示这个类是线程安全的。具体是否真安全，那要看实现者怎么实现的了，反正打上这个标签只是表示一下。不线程安全的类打上这个注解也没事儿。
@Immutable 表示，类是不可变的，包含了　@ThreadSafe　的意思。
      @NotThreadSafe 表示这个类不是线程安全的。如果是线程安全的非要打上这个注解，那也不会报错。

这三个注解，对用户和维护者是有益的，用户可以立即看出来这个类是否是线程安全的，维护者则是可以根据这个注解，重点检查线程安全方面。另外，代码分析工具可能会利用这个注解。

**2、域 Annotation（注解）**
域注解是对类里面成员变量加的注解。

**3、方法 Annotation（注解）**
方法注解是对类里面方法加的注解。

域注解和方法注解都是用@GuardedBy( lock )来标识。里面的Lock是告诉维护者：这个状态变量，这个方法被哪个锁保护着。这样可以强烈的提示类的维护者注意这里。
@GuardedBy( lock )有以下几种使用形式：
1、@GuardedBy( "this" ) 受对象内部锁保护
2、@GuardedBy( "fieldName" ) 受 与fieldName引用相关联的锁 保护。
3、@GuardedBy( "ClassName.fieldName" ) 受 一个类的静态field的锁 保存。
4、@GuardedBy( "methodName()" ) 锁对象是 methodName() 方法的返值，受这个锁保护。
5、@GuardedBy( "ClassName.class" ) 受 ClassName类的直接锁对象保护。而不是这个类的某个实例的锁对象。
