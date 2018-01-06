---
title: PostgreSQL在2003系统和Win7系统启动注意事项
tags: PostgreSQL
categories: 程序随记
comments: true
abbrlink: e09fa2d0
date: 2017-10-07 22:22:16
copyright: true
---
PostgreSQL在2003和Win7系统注册成功后，但是无法启动数据库。解决办法是，修改修改pgsql\data目录下pg_hba.conf文件。
>win2003 修改如下：
```
# IPv4 local connections:
host    all         all         127.0.0.1/32          trust
#host    all         all         ::1/128               trust
# IPv6 local connections:
#host    all         all         ::1/128               trust
```
win7修改如下：
```
# IPv4 local connections:
host    all         all         127.0.0.1/32          trust
host    all         all         ::1/128               trust
# IPv6 local connections:
#host    all         all         ::1/128               trust
```

 
