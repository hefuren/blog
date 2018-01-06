---
title: python学习笔记2
tags: Python
categories: 程序随记
comments: true
abbrlink: c377d8e0
date: 2017-10-08 11:25:24
---
python方法，在python语言中，任何一个方法定义中的第一个参数都是变量**self**，它表示调用此方法的实例对象。
> **self是什么：**self变量用于在类实例方法中引用方法所绑定的实例。因为方法的实例在任何地方调用中总是作为第一个参数传递的，self被选中用来代表实例。你必须在方法声明中放上self（你可能已经注意到了这点），但可以在方法中不使用实例（self）。如果你的方法中没有用到self，那么请考虑创建一个常规函数，除非你有特别的原因。毕竟，你的方法代码没有使用实例，没有与类关联其功能，这使得它看起来更像一个常规函数。在其他面向对象语言中，self可能被称为this。

python调用绑定方法，即一个类实例一个对象后，通过实例对象来调用方法：
```
class C(object):
	"""docstring for C"""
	foo = 100

	def testFun(self,name):
		self.name = name

cObject = C()

cObject.testFun("Elwin")

print("C name is %s" %cObject.name)
```

python支持类的多继承，java语言不支持类的多继承。在python语言中多继承需要特别注意**方法解释顺序（MRO）**。经典类中，使用深度优先算法。新式类继承来自object，新的菱形类集成结构出现，问题也就接着而来，所以必须新建一个MRO.

```
#经典类
class P1:
	"""docstring for P1"""
	def foo(self):
		print "called P1-foo()"

class P2:
	"""docstring for P2"""
	def foo(self):
		print "called P2-foo()"

class C1(P1,P2):
	pass

#新式类
class P1(object):
	"""docstring for P1"""
	def foo(self):
		print "called P1-foo()"

class P2(object):
	"""docstring for P2"""
	def foo(self):
		print "called P2-foo()"

class C1(P1,P2):
	pass

```
