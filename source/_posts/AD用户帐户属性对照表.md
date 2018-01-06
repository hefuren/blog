---
title: AD用户帐户属性对照表
tags: windows AD
categories: 程序随记
comments: true
abbrlink: d05e3939
date: 2017-10-07 22:29:23
copyright: true
---
用户帐户属性对照表,一部分经常用到,免得到处找,列在下面参考参考:
**“常规”标签**
>  
姓 Sn
名 Givename
英文缩写 Initials
显示名称 displayName
描述 Description
办公室 physicalDeliveryOfficeName
电话号码 telephoneNumber
电话号码：其它 otherTelephone 多个以英文分号分隔
电子邮件 Mail
网页 wWWHomePage
网页：其它 url 多个以英文分号分隔

**“地址”标签**
>  
国家/地区 C 如：中国CN，英国GB
省/自治区 St
市/县 L
街道 streetAddress
邮政信箱 postOfficeBox
邮政编码 postalCode

**“帐户”标签**
> 
用户登录名 userPrincipalName 形如：[](mailto:pccai1983@hotamil.com)[pccai1983@hotmail.com](mailto:pccai1983@hotmail.com)
用户登录名（以前版本） sAMAccountName 形如：S1
登录时间 logonHours
登录到 userWorkstations 多个以英文逗号分隔
用户帐户控制 userAccountControl (启用：512，禁用：514， 密码永不过期：66048)
帐户过期 accountExpires

**“配置文件”标签**
> 
配置文件路径 profilePath
登录脚本 scriptPath
主文件夹：本地路径 homeDirectory
连接 homeDrive
到 homeDirectory

**“电话”标签**
> 
家庭电话 homePhone (若是其它，在前面加other。)
寻呼机 Pager 如：otherhomePhone。
移动电话 mobile 若多个以英文分号分隔。
传真 FacsimileTelephoneNumber
IP电话 ipPhone
注释 Info

**“单位”标签**
>  
职务 Title
部门 Department
公司 Company

**“隶属于”标签**
> 
隶属于　 memberOf　 用户组的DN不需使用引号， 多个用分号分隔
“拨入”标签 远程访问权限（拨入或VPN） msNPAllowDialin
允许访问 值：TRUE
拒绝访问 值：FALSE
回拨选项 msRADIUSServiceType
由呼叫方设置或回拨到 值：4
总是回拨到 msRADIUSCallbackNumber
“环境”、“会话”、“远程控制”、“终端服务配置文件”、“COM+”标签

**属性**

显示名称 | 属性名称
------|------
First Name | ** giveName ** 
last Name | ** sn **
Initials | ** initials **
Description | ** description **
Office | ** physicalDeliveryOfficeName **
Telephone Number | ** telephoneNumber **
Telephone: Other | ** otherTelephone**
E-Mail | **mail**
Web Page | ** wwwHomePage **
Web Page : Other | ** url **
