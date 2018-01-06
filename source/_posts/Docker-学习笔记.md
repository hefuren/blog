---
title: Docker 学习笔记
tags:
  - 容器
  - Docker
categories: 程序随记
comments: true
abbrlink: 920e92d1
date: 2017-10-08 14:59:49
copyright: true
---
**Docker 的核心组件**
- Docker客户端和服务器
- Docker 镜像
- Registry
- Docker容器

**Docker客户端和服务器**：Docker是一个客户-服务器（C/S）架构的呈现。Docker客户端只需向Docker服务器或守护进程发出请求，服务器或守护进程将完成所有工作并返回结果。Docker提供一个命令行工具docker以及一整套RESTful API。你可以在同一台宿主机上运行Docker守护进程和客户端，可以从本地的Docker客户端连接到允许在另一台宿主机上远程Docker守护进程。

**Docker 镜像**：用户基于镜像来允许自己的容器，镜像也是Docker生命周期的“构建”部分。镜像是基于联合(Union)文件系统的一种层次的结果，由一系列指令一步步构建出来的。*例如：添加一个文件；执行一个命令；打开一个端口。*也可以把镜像当做容器的“源代码”。镜像体积很小，非常“便携”，易于分享、存储和更新。

**Registry**：Docker用Registry来保存用户构建的镜像。Registry分为公共和私有两种。Docker运营的公共Registry叫做Docker Hub。用户可以在Docker Hub注册账号，分享并保存自己的镜像。你也可以架设自己的私有Registry。

#### 安装Docker
> 建议读者了解一下如何使用Puppet 或 Chef这样的工具来安装Docker，而不是纯手动安装。例如，可以在网上找到安装Docker的Puppet模块和Chef cookbook。

docker支持很多Linux环境，OS X和Microsoft Windows也能安装Docker。在OS X系统和Windows系统中可以用Boot2Docker工具安装Docker。
> Boot2Docker是一个极小的虚拟机，同时提供了一个包装脚本对该虚拟机进行管理。该虚拟机运行一个守护进程，并在OS X或Windows中提供一个本地的Docker守护进程。Docker的客户端工具docker可以作为这些平台的原生程序安装，并连接到在Boot2Docker虚拟机中运行的Docker守护进程。

**docker不支持32位CPU。**
