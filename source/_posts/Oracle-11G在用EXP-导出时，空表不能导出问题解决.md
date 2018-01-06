---
title: Oracle 11G在用EXP 导出时，空表不能导出问题解决
tags: Oracle
categories: 程序随记
comments: true
abbrlink: ee36d2a5
date: 2017-10-07 22:19:48
copyright: true
---
11G中有个新特性，当表无数据时，不分配segment，以节省空间　　
**解决方法：**
1、insert一行，再rollback就产生segment了。该方法是在在空表中插入数据，再删除，则产生segment。导出时则可导出空表。
2、设置deferred_segment_creation 参数
```
show parameter deferred_segment_creation
NAME                               TYPE      VALUE
----------------------------   ----------- ---------
deferred_segment_creation        boolean     TRUE

SQL> alter system set deferred_segment_creation=false;
系统已更改。 

SQL> show parameter deferred_segment_creation
NAME                                  TYPE        VALUE
--------------------------------- ------------ ---------
deferred_segment_creation            boolean      FALSE

```
   该参数值默认是TRUE，当改为FALSE时，无论是空表还是非空表，都分配segment。

需注意的是：该值设置后对以前导入的空表不产生作用，仍不能导出，只能对后面新增的表产生作用。如需导出之前的空表，只能用第一种方法。
搞了我好久，最后查到这个方法。
先查询一下当前用户下的所有空表
```
select table_name from user_tables where NUM_ROWS=0;
```
用以下这句查找空表
```
select 'alter table '||table_name||' allocate extent;' from user_tables where num_rows=0
```
把查询结果导出，执行导出的语句
```
'ALTERTABLE'||TABLE_NAME||'ALLOCATEEXTENT;'
-----------------------------------------------------------
alter table AQ$_AQ$_MEM_MC_H allocate extent;
alter table AQ$_AQ$_MEM_MC_G allocate extent;
alter table AQ$_AQ$_MEM_MC_I allocate extent;
alter table AQ$_AQ_PROP_TABLE_T allocate extent;
alter table AQ$_AQ_PROP_TABLE_H allocate extent;
alter table AQ$_AQ_PROP_TABLE_G allocate extent;
alter table AQ$_AQ_PROP_TABLE_I allocate extent;
alter table AQ$_KUPC$DATAPUMP_QUETAB_T allocate extent;
alter table AQ$_KUPC$DATAPUMP_QUETAB_H allocate extent;
alter table AQ$_KUPC$DATAPUMP_QUETAB_G allocate extent;
alter table AQ$_KUPC$DATAPUMP_QUETAB_I allocate extent;
'ALTERTABLE'||TABLE_NAME||'ALLOCATEEXTENT;'
-----------------------------------------------------------
alter table AQ$_SYS$SERVICE_METRICS_TAB_T allocate extent;
alter table AQ$_SYS$SERVICE_METRICS_TAB_H allocate extent;
alter table AQ$_SYS$SERVICE_METRICS_TAB_G allocate extent;
alter table AQ$_SYS$SERVICE_METRICS_TAB_I allocate extent;
```
然后再执行
```
exp 用户名/密码@数据库名 file=/home/oracle/exp.dmp log=/home/oracle/exp_smsrun.log
```
**成功！**
