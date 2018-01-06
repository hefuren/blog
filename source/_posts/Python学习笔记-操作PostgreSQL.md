---
title: Python学习笔记-操作PostgreSQL
tags: Python
categories: 程序随记
comments: true
abbrlink: 8175fd49
date: 2017-10-08 14:56:05
---
python操作数据库PostgreSQL
   
**1.简述　**　
　　python可以操作多种数据库，诸如SQLite、MySql、PostgreSQL等，这里不对所有的数据库操作方法进行赘述，只针对目前项目中用到的PostgreSQL做一下简单介绍，主要包括python操作数据库插件的选择、安装、简单使用方法、测试连接数据库成功。
**2.数据库操作插件的选择**
　　PostgreSQL至少有三个python接口程序可以实现访问，包括PsyCopg、PyPgSQL、PyGreSQL(PoPy已经整合在PyGreSQL中)，三个接口程序各有利弊，需要根据实践选择最适合项目的方式。
　　推荐使用PsyCopg，对python开发框架的兼容性都很好，本文中我们只讨论这个插件。
**3.PsyCopg的下载**
**　　**官网下载psycopg2-2.5.1.tar.gz：[http://initd.org/psycopg/](http://initd.org/psycopg/)

**4.PsyCopg的安装**
　　直接exe，根据提示安装即可.
