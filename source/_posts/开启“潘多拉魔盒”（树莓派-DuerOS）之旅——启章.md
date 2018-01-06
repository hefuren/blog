---
title: 开启“潘多拉魔盒”之旅——启章
comments: true
copyright: true
categories: 人工智能
tags:
  - DuerOS
  - 树莓派
abbrlink: 6bbf70d1
date: 2017-11-19 18:41:24
updated:
---

# 开启“潘多拉魔盒”（树莓派+DuerOS）之旅——启章
## 序曲
　　离开一线程序开发已经有几年了，虽然工作不再接触程序开发的工作。但是一直有颗程序员的心。总爱躁动地看看这个世界，关注软件开发前沿技术和新闻。
　　今年７月份，百度在开发者大会上正式推出全新的ＤuerOS系统后，关注了一段时间，待百度向开发者提供“DuerOS开发套件个人版”时，便毫不犹豫的提交了申请。其实，早在7月11日时，就得收到了百度的邮件回复，要求提供DuerOS开发套件个人版需求（*开发计划和产品需求*）。由于工作的原因，迟迟没有提交需求申请，直到9月17日才提交需求申请。然等了一个星期，仍未收到任何回复，于是又多次提交了需求申请，最后还是杳无音信。本以为需求审核不通过，或者百度不再提供开发版了。后来在DuerOS公众号上看到百度又派发了个人套件开发版，然后就留言问了问。后来跟公众号运营人员沟通后，重新让他们确认了我提交的邮件，随即派送了开发版。（*MD，猜测之前提交N多申请时，邮件可能被他们忽略了，或者被收到垃圾邮箱了，才杳无音信*）
　　于是便开启了“潘多拉魔盒”之旅。


## “旅程装备”准备
　　“潘多拉魔盒”之旅会怎样的呢？得准备好装备，才能看清这个奇幻＋充满想象的世界。
　　参考百度《DuerOS开发套件个人版软件安装使用指南 v1.0.pdf》说明，准备装备如下：
- **电脑：**用来烧录SD卡，为树莓派烧录系统
- **SD卡及读卡器：**准备一张容量大于8GB的Micro SD卡及读卡器
- **USB转Micro USB数据线：**准备好两个数据线，一根用于连接树莓派与DuerOS开发版，一根作为USB电源线。
- **外接音箱**
- **树莓派3B**

　　ＤuerOS开发版已有，其它的备件哪里找呢？俗话说：外事不决问百度，内事不决问老婆。买东西，自然让淘宝/天猫了，哈哈。赶紧下单，坐等收货……
　　……
　　……
　　快递火箭哥终于把装备送到。

![Raspberry Pi 3](http://ozo3wyeb7.bkt.clouddn.com/raspberry3-01.jpg)  ![Dueros](http://ozo3wyeb7.bkt.clouddn.com/dueros-01.jpg)  ![Raspberry Pi 3](http://ozo3wyeb7.bkt.clouddn.com/line.jpg)

## 组装装备+刷系统
　　装备到手了，可参看《DuerOS开发套件个人版软件安装使用指南 v1.1.pdf》组装树莓派和开发版。然后可到[https://etcher.io/](https://etcher.io/)网站下载Etcher软件，用于将DuerOS开发套件个人版镜像文件烧录到SD卡中。同时下载DuerOS系统镜像文件 。
  
　　传送门直达：[DuerOS文档](http://dueros.bj.bcebos.com/DevkitPersonalImg/DuerOS%E5%BC%80%E5%8F%91%E5%A5%97%E4%BB%B6%E4%B8%AA%E4%BA%BA%E7%89%88%E4%BD%BF%E7%94%A8%E6%96%87%E6%A1%A3.rar?authorization=bce-auth-v1%2Fa4d81bbd930c41e6857b989362415714%2F2017-09-05T11%3A56%3A56Z%2F-1%2Fhost%2Fc185bd3c0f04a58b77737635705755b5730b6f83a57e6bf00a7ecd587bc7c78d)   ，[DuerOS系统镜像](http://dueros.bj.bcebos.com/DevkitPersonalImg/DuerOS_For_Raspberry_V0.7.10_20170901.img.gz?authorization=bce-auth-v1%2Fa4d81bbd930c41e6857b989362415714%2F2017-11-01T01%3A29%3A31Z%2F-1%2Fhost%2F3c2a23a4f22eb012acc5dc46c9a3d6840b7ee494a49da1c939f9f74bbddde7fe)
  
　　最后完工如下图所示：
![Raspberry Pi 3](http://ozo3wyeb7.bkt.clouddn.com/raspberry3-02.jpg)

> 个人在这里有一个入坑的地方：忘记用USB转Micro USB数据线连接DuerOS开发版和树莓派了，导致树莓派上电启动后，无法唤醒“小度”。



## 上电，唤醒小度，感受潘多拉魔盒的魔力

　　接上电源，树莓派自动启动，这个时候可以下载一个“小度之家”App，便于配置无线网络功能。待无线网络配置成功后，重启树莓派，期间就可以听到小度的说话，待系统启动完毕后，小度会给予提示。系统启动完毕后，便可以唤醒小度，开启潘多拉魔盒唤醒万物的体验。




















