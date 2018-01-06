---
title: Lombok 安装，JavaBean中消除冗长的get/set方法
tags:
  - Java
  - Lombok
categories: 程序随记
comments: true
abbrlink: bc1da2d6
date: 2017-10-07 19:49:23
copyright: true
---

在项目中引用Lombok lib，如果是通过Maven构建项目的，可以在pom.xml中增加对lib的依赖。

```
<!-- 简化JavaBean get/set 方法 -->
<dependency>
	<groupId>org.projectlombok</groupId>
	<artifactId>lombok</artifactId>
	<version>1.16.10</version>
	<scope>provided</scope>
</dependency>
```    
如果你使用eclipse/myeclipse进行开发，在项目中引用了对lombok的依赖，然后发现代码编译的时候，还是没有生成get/set方法。这个时候还需要在eclipse/myeclipse中安装lombok，安装步骤如下：
1、 将 lombok.jar 复制到 myeclipse.ini / eclipse.ini 所在的文件夹目录下；
2.、打开 eclipse.ini / myeclipse.ini，在最后面插入以下两行并保存：
 ```  
 -Xbootclasspath/a:lombok.jar        
 -javaagent:lombok.jar   
``` 
3、重启 eclipse / myeclipse

最后在JavaBean中如何使用，请参考Lombok 注解在线帮助文档：[http://projectlombok.org/features/index.](http://projectlombok.org/features/index.html)
