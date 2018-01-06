---
title: CXF 开发和部署 webservice 客户端注意事项
tags:
  - Java
  - CXF
  - webservice
categories: 程序随记
comments: true
abbrlink: a2040dea
date: 2017-10-07 19:47:18
copyright: true
---

在做招商银行项目时，需要我们的系统集成招商银行的邮件服务器。招商银行邮件服务器采用webservice方式进行集成。经过多方面的考虑后，决定采用第三方开源框架Apache CXF进行webservice客户端开发。

该项目采用Apache CXF最新版本2.5.2版本，在使用该版本cxf开发时依赖的第三方包中与jaee.jar包有冲突；需要把jaee.jar中同名包下的文件进行删除。

另外采用jboss部署web应用程序时，需要注意以下两点：
>1.将jaxb-api-2.2.3.jar,jaxws-api-2.1.jar包拷贝到jboss\lib\endorsed目录下；
2.将jaxb-api-2.2.3.jar,jaxws-api-2.1.jar包拷贝到jdk1.5\jre\lib\endorsed目录下。


这里采用通过命令生成客户端代码进行调用：
>wsdl2java -d src -frontendjaxws21 -p com.easytrack.customization.cmb.integration.email -client http://99.1.101.169/coreservice/svc/coreservice.asmx?wsdl

最后根据生成的客户端代码适当的修改即可。

在开发和部署时注意以上两点，同时注意引用的CXF第三方包与自己本项目包的冲突。
