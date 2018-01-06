---
title: python学习笔记
tags: python
categories: 程序随记
comments: true
abbrlink: 743c31e9
date: 2017-10-08 09:31:48
copyright: true
---
python类支持多重继承，当使用多重继承时，需要注意：
> 如果一个方法从多个超类继承（也就是说你有两个具有相同名字的不同方法），那么必须要注意一下超类的顺序（在class语句中）：先继承的类中的方法会重写后继承的类中的方法。

python魔法方法，就是在方法名前后加双下划线“__”，例如:
```
class FooBar:
   def __init__(self, value = 42):
         self.somevar = value
```

> 注意：Python中有一个魔法方法叫做"\__del__"，也就是析构方法。它在对象就要被垃圾回收之前调用。但发生调用的具体时间是不可知的。所以建议读者尽力避免使用"\__del__"函数。


Python中类的继承，如果一个子类直接重写了构造器的方法，这将恢复完全覆盖了在超类中构造器方法的作用。**如果要想保留超类构造器方法的作用：调用超类构造方法的未绑定版本，或者使用 super函数。**
\__init__ 方法为一个类创建后第一个执行的方法。
什么是self ？ 它是类实例自身的引用。其它面向对象语言通常使用一个名为 this 的标识符。
```
class SongBird(Bird):
    def __init__(self):
         Bird.__init__(self)  # 调用超类构造器方法
         self.sound = 'Squawk !'
    
     def sing(self):
          print self.sound

__metaclass__ = type 
class SongBird(Bird):
    def __init__(self):
         super(SongBird.self).__init__()  # super函数只在新式类中起作用
         self.sound = 'Squawk !'
    
     def sing(self):
          print self.sound

```
解决python文件显示中文build错误问题：
> 需要在程序的第一行或者第二行声明编码，就可以解决问题。
```
# coding =encoding name 或者  # -*- coding: -*- 
```
下面的链接是原文地址 http://www.python.org/dev/peps/pep-0263/


**raw_input**　，python3.0版本后用**input**替换了raw_input


python编程时，每一行语句结束时直接换行，不需要像C，Java那样用“；”结尾；但是同一行书写多个预计时，可以用“ ; "分割

> 注意：在python语言中，赋值并不是直接将一个值赋给一个变量，对象是通过**引用传递**的。

python不支持类似 x++ 或 --x 这样的前置/后置自增/自减运算。

专用下划线标识符：
```
_xxx   #不用 ' from module import * ' 导入
_xxx_  #系统定义名字
_xxx   #类中的私有变量名
```
> 核心风格建议：避免用下划线作为变量名的开始，因为下划线对解释器有特殊的意义，而且是内建标识符所使用的符号，我们建议程序员避免用下划线作为变量名的开始。一般来讲，变量名 \_xxx 被看做是“私有的”，在模块或类外都不可以使用。当变量是私有的时候，用\_xxx来表示变量是很好的习惯。因为变量或类外不可以使用。当变量是私有的时候，用\_xxx来表示变量是很好的习惯。因为变量名\__xxx__对python来说有特殊含义，对于普通的变量应当避免这种命名风格。

python 变量量无需事先声明，也无需声明类型。

> 提醒：print语句默认在输出内容末尾后加一个换行符，而在语句后加一个“逗号”可以避免这个新闻。
