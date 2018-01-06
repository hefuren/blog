---
title: python学习笔记3
tags: Python
categories: 程序随记
comments: true
abbrlink: b470e876
date: 2017-10-08 12:11:07
---
#### Python网络编程
TCP面向连接的通信方式，UDP与TCP不同，与虚拟电路完全相反，是数据报型的无连接套接字。

TCP通信，要先开服务器，后开客户端。
```
# tcp sock
tcpSerSock = socket(AF_INET,SOCK_STREAM) 

# udp sock
udpSerSock =  socket(AF_INET,SOCK_DGRAM)

```

#### python apply()函数
apply(func [, args [, kwargs ]]) 函数用于当函数参数已经存在于一个元组或字典中时，间接地调用函数。args是一个包含将要提供给函数的按位置传递的参数的元组。如果省略了args，任 何参数都不会被传递，kwargs是一个包含关键字参数的字典。
 
apply()的返回值就是func()的返回值，apply()的元素参数是有序的，元素的顺序必须和func()形式参数的顺序一致

下面给几个例子来详细的说下:
 1、假设是执行没有带参数的方法
 
def say():
  print 'say in'
 

apply(say)
 
输出的结果是'say in'
 

2、函数只带元组的参数。
 
def say(a, b):
  print a, b
 
apply(say,("hello", "老王python"))
 
输出的结果是hello,老王python

#### ` __call__`函数
Python中有一个有趣的语法，只要定义类型的时候，实现\__call__函数，这个类型就成为可调用的。换句话说，我们可以把这个类型的对象当作函数来使用，相当于 重载了括号运算符。
```
class g_dpm(object):  
  
    def __init__(self, g):  
        self.g = g  
  
    def __call__(self, t):  
        return (self.g*t**2)/2 
```
计算地球场景的时候，我们就可以令e_dpm = g_dpm(9.8)，s = e_dpm(t)。

```
class Animal(object):  
    def __init__(self, name, legs):  
        self.name = name  
        self.legs = legs  
        self.stomach = []          
   
    def __call__(self,food):  
        self.stomach.append(food)  
   
    def poop(self):  
        if len(self.stomach) > 0:  
            return self.stomach.pop(0)  
   
    def __str__(self):          
        return 'A animal named %s' % (self.name)         
   
cow = Animal('king', 4)  #We make a cow  
dog = Animal('flopp', 4) #We can make many animals  
print 'We have 2 animales a cow name %s and dog named %s,both have %s legs' % (cow.name, dog.name, cow.legs)  
print cow  #here __str__ metod work  
   
#We give food to cow  
cow('gras')  
print cow.stomach  
   
#We give food to dog  
dog('bone')  
dog('beef')  
print dog.stomach  
   
#What comes inn most come out  
print cow.poop()  
print cow.stomach  #Empty stomach  
```

```
'''-->output 
We have 2 animales a cow name king and dog named flopp,both have 4 legs 
A animal named king 
['gras'] 
['bone', 'beef'] 
gras 
[] 
'''
```
