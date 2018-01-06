---
title: Hive 学习笔记
tags:
  - Hive
  - 大数据
categories: 程序随记
comments: true
abbrlink: 7ed447e8
date: 2017-10-08 11:24:25
copyright: true
---
**【文件存储格式】**
在建表语句中通过" STORED AS FILE_FORMAT" 指定。
- **TEXTFILE：**默认格式，数据不做压缩，磁盘开销大，数据解析开销大，结合Gzip/Bizp2使用，采用此种方式不支持对数据进行切分，从而无法实现数据的并行操作。
- **SEQUENCEFILE：**Hadoop API提供的一种二进制文件，使用方便，支持数据切分与压缩。有三种压缩方式，NONE，RECORD（压缩率低）、BLOCK（推荐使用）。
- **RCFILE：**一种行列存储相结合的方式。首先将数据按行分块，保证同一行记录在同一个块上；其次将块数据进行行列式存储，这样有利于数据压缩和快速的列存储。采用这种格式在数据加载时耗费的性能较大，但是具备较好的数据压缩比和查询响应，在一次写入多次读取的场景下推荐采用。
- **自定义格式：**当用户的数据文件格式不能被Hive识别时，通过实行InputFormat和OutputFormat来自定义输入输出格式。
