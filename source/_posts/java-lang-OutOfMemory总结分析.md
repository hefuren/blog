---
title: java.lang.OutOfMemory总结分析
tags: Java
categories: 程序随记
comments: true
abbrlink: 5018d17f
date: 2017-10-07 23:17:18
copyright: true
---
　　在解决java内存溢出问题之前，需要对jvm（java虚拟机）的内存管理有一定的认识。jvm管理的内存大致包括三种不同类型的内存区域：
- **Permanent Generation space（永久保存区域）**：永久保存区域主要存放Class（类）和Meta的信息，Class第一次被Load的时候被放入PermGen space区域，Class需要存储的内容主要包括方法和静态属性
- **Heap space(堆区域)**：堆区域用来存放Class的实例（即对象），对象需要存储的内容主要是非静态属性。每次用new创建一个对象实例后，对象实例存储在堆区域中，这部分空间也被jvm的垃圾回收机制管理。
- **Java Stacks(Java栈）**：Java栈跟大多数编程语言包括汇编语言的栈功能相似，主要基本类型变量以及方法的输入输出参数。Java程序的每个线程中都有一个独立的堆栈。

　　容易发生内存溢出问题的内存空间包括：Permanent Generation space和Heap space。


#### 第一种OutOfMemoryError： PermGen space

　　发生这种问题的原意是程序中使用了大量的jar或class，使java虚拟机装载类的空间不够，与Permanent Generation space有关。解决这类问题有以下两种办法：
**1. **增加Java虚拟机中的**XX:PermSize**和**XX:MaxPermSize**参数的大小，其中**XX:PermSize**是初始永久保存区域大小，**XX:MaxPermSize**是最大永久保存区域大小。
       如针对tomcat6.0，在catalina.sh 或catalina.bat文件中一系列环境变量名说明结束处（大约在70行左右） 增加一行：
```
JAVA_OPTS=" -XX:PermSize=64M -XX:MaxPermSize=128m"
```
　　如果是windows服务器还可以在系统环境变量中设置。感觉用tomcat发布sprint+struts+hibernate架构的程序时很容易发生这种内存溢出错误。使用上述方法，我成功解决了部署ssh项目的tomcat服务器经常宕机的问题。

**2. **清理应用程序中web-inf/lib下的jar。
　　如果tomcat部署了多个应用，很多应用都使用了相同的jar，可以将共同的jar移到tomcat共同的lib下，减少类的重复加载。这种方法是网上部分人推荐的，我没试过，但感觉减少不了太大的空间，最靠谱的还是第一种方法。

#### 第二种OutOfMemoryError：  Java heap space

　　发生这种问题的原因是java虚拟机创建的对象太多，在进行垃圾回收之间，虚拟机分配的到堆内存空间已经用满了，与Heap space有关。解决这类问题有两种思路：
**1. **检查程序，看是否有死循环或不必要地重复创建大量对象。找到原因后，修改程序和算法。
**2.** 增加Java虚拟机中Xms（初始堆大小）和Xmx（最大堆大小）参数的大小。如：
```
set JAVA_OPTS= -Xms256m -Xmx1024m
```

#### 第三种OutOfMemoryError：unable to create new native thread
　　这种错误在Java线程个数很多的情况下容易发生，我暂时还没遇到过，发生原意和解决办法可以参考：

**从JVM层面去解决**：减小thread stack的大小，JVM默认thread stack的大小为1024，这样当线程多时导致Native virtual memory被耗尽，实际上当thread stack的大小为128K 或 256K时是足够的，所以我们如果明确指定thread stack为128K 或 256K即可，具体使用-Xss，例如在JVM启动的JVM_OPT中添加如下配置：
```
-Xss128k 
```

**减小heap或permgen初始分配的大小**：如果JVM启动的JVM_OPT中有如下配置

```
-Xms1303m -Xmx1303m -XX:PermSize=256m -XX:MaxPermSize=256m 
```
我们可以删除或减小初始化最小值的配置，如下
```
-Xms256m -Xmx1303m -XX:PermSize=64m -XX:MaxPermSize=256m  
-Xmx1303m -XX:MaxPermSize=256m 
```
**升级JVM到最新的版本**：最新版本的JVM一般在内存优化方面做的更好，升级JVM到最新的版本可能会缓解测问题。

**从操作系统层面去解决**：使用64位操作系统，如果使用32位操作系统遇到unable to create new native thread，建议使用64位操作系统。

**增大OS对线程的限制**：在Linux操作系统设定nofile和nproc，具体编辑/etc/security/limits.conf添加如下：
```
soft    nofile          2048  
hard    nofile          8192 
```

```
soft    nproc           2048  
hard    nproc           8192 
```

如果使用Red Hat Enterprise Linux 6，编辑/etc/security/limits.d/90-nproc.conf，添加如下配置：
```
# cat /etc/security/limits.d/90-nproc.conf  
*          soft    nproc     1024  
root       soft    nproc     unlimited  
  
user       -       nproc     2048
```
