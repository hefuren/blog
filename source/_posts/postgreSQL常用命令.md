---
title: postgreSQL常用命令
tags: PostgreSQL
categories: 程序随记
comments: true
abbrlink: 7e4cc69e
date: 2017-10-07 22:33:46
copyright: true
---
安装CentOS系统时，由于最开始没有选择安装Telnet服务，现在想从Windows上通过Telnet连接Linux。于是便只能重新安装，这里介绍从光盘中进行安装。
1、首先进入mnt目录创建一个文件夹，用于挂载光驱；
```
[root@localhost ~]# cd /mnt
[root@localhost ~]# mkdir cdrom
[root@localhost ~]# mount /dev/cdrom /mnt/cdrom (或者 mount -t ext3 /dev/cdrom /mnt/cdrom)
[root@localhost ~]# cd /mnt/cdrom
```
2、安装Telnet需要安装xinetd服务
```
[root@localhost cdrom]# find -name xinetd*./Packages/xinetd-2.3.14-29.el6.x86_64.rpm
[root@localhost cdrom]# rpm -ivh ./Packages/xinetd-2.3.14-29.el6.x86_64.rpm
```
3、安装Telnet服务
```
[root@localhost cdrom]# find -name telnet*./Packages/telnet-0.17-46.el6.x86_64.rpm./Packages/telnet-server-0.17-46.el6.x86_64.rpm
[root@localhost cdrom]# rpm -ivh ./Packages/telnet-0.17-46.el6.x86_64.rpm
[root@localhost cdrom]# rpm -ivh ./Packages/telnet-server-0.17-46.el6.x86_64.rpm
```
4、修改Telnet服务配置
```
[root@localhost cdrom]#vi /etc/xinetd.d
```
将disable = yes 更改 no，或者注释掉5.开放Telnet对外端口23。

6、重启xinetd服务
```
[root@localhost cdrom]#service xinetd restart
```
OK，于是在windows中，便可以通过telnet方式连接 Linux系统
