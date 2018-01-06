---
title: 虚拟机中 suse linux 11配置静态IP
tags: 虚拟机
categories: 程序随记
comments: true
abbrlink: dec0d98a
date: 2017-10-07 23:22:52
---
环境：VMware Workstation Pro 12 + Suse linux 11 SP1

**第一步：配置虚拟机网络适配器，这里我采用 NAT 方式**

![picture-01.png](http://upload-images.jianshu.io/upload_images/3164735-7e840ec0e91ff3b1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**第二步：在VMware虚拟网络编辑器中，配置NAT模式下的子网IP**

![picture-02.png](http://upload-images.jianshu.io/upload_images/3164735-74f9c07567139b75.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**第三步：在Suse linux 中通过界面配置静态IP**

1、全局设置
![picture-03.png](http://upload-images.jianshu.io/upload_images/3164735-f8bfd16d31fe237d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

2、IP设置
![picture-04.png](http://upload-images.jianshu.io/upload_images/3164735-180ae18aafc65a1d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> *注意：配置静态IP是，IP网段要与网络虚拟机配置的网段一致。*

![picture-05.png](http://upload-images.jianshu.io/upload_images/3164735-a2f5ff633d37f452.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

3、配置DNS
![picture-06.png](http://upload-images.jianshu.io/upload_images/3164735-0364fab1590fd500.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

4、配置网关（*网关配置需要与虚拟机的虚拟网络配置的网关一致*）
![picture-07.png](http://upload-images.jianshu.io/upload_images/3164735-856d9ab30e7590ae.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)