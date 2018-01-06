---
title: (译)Python关键字yield的解释--下篇(stackoverflow)
tags: Python
categories: 程序随记
comments: true
abbrlink: 459536d7
date: 2017-10-08 11:21:37
---
#### 6.回到你的代码
（译者注：这是回答这对问题的具体解释）

生成器：
```
# Here you create the method of the node object that will return the generator
def node._get_child_candidates(self, distance, min_dist, max_dist):

  # Here is the code that will be called each time you use the generator object :

  # If there is still a child of the node object on its left
  # AND if distance is ok, return the next child
  if self._leftchild and distance - max_dist < self._median:
            yield self._leftchild

  # If there is still a child of the node object on its right
  # AND if distance is ok, return the next child
  if self._rightchild and distance + max_dist >= self._median:
                yield self._rightchild

  # If the function arrives here, the generator will be considered empty
  # there is no more than two values : the left and the right children
```

调用者：
```
# Create an empty list and a list with the current object referenceresult, candidates = list(), [self]

# Loop on candidates (they contain only one element at the beginning)

while candidates: 
    # Get the last candidate and remove it from the list 
    node = candidates.pop() 

    # Get the distance between obj and the candidate 
    distance = node._get_dist(obj) # If distance is ok, then you can fill the result 
    if distance <= max_dist and distance >= min_dist: 
        result.extend(node._values) 

    # Add the children of the candidate in the candidates list 
    # so the loop will keep running until it will have looked 
    # at all the children of the children of the children, etc. of the candidate
    candidates.extend(node._get_child_candidates(distance, min_dist, max_dist))

return result
```

这个代码包含了几个小部分：
- 我们对一个列表进行迭代，但是迭代中列表还在不断的扩展。它是一个迭代这些嵌套的数据的简洁方式，即使这样有点危险，因为可能导致无限迭代。candidates.extend(node._get_child_candidates(distance, min_dist, max_dist))
穷尽了生成器的所有值，但 while 不断地在产生新的生成器，它们会产生和上一次不一样的值，既然没有作用到同一个节点上.
- extend() 是一个迭代器方法，作用于迭代器，并把参数追加到迭代器的后面。

通常我们传递它一个列表参数：
```
>>> a = [1, 2]
>>> b = [3, 4]
>>> a.extend(b)
>>> print(a)
[1, 2, 3, 4]
```

但是在你的代码中的是一个生成器，这是不错的，因为：
- 你不必读两次所有的值
- 你可以有很多子对象，但不必叫他们都存储在内存里面。

并且这很奏效，因为Python不关心一个方法的参数是不是个列表。Python只希望它是个可以迭代的，所以这个参数可以是列表，元组，字符串，生成器... 这叫做 ducktyping,这也是为何Python如此棒的原因之一，但这已经是另外一个问题了...

你可以在这里停下，来看看生成器的一些高级用法:
#### 7.控制生成器穷尽
```
>>> class Bank(): # let's create a bank, building ATMs
...  crisis = False...  def create_atm(self) :
...      while not self.crisis :
...          yield "$100"
>>> hsbc = Bank() # when everything's ok the ATM gives you as much as you want
>>> corner_street_atm = hsbc.create_atm()
>>> print(corner_street_atm.next())
$100

>>> print(corner_street_atm.next())
$100

>>> print([corner_street_atm.next() for cash in range(5)])
['$100', '$100', '$100', '$100', '$100']

>>> hsbc.crisis = True # crisis is coming, no more money!
>>> print(corner_street_atm.next())
<type 'exceptions.StopIteration'>

>>> wall_street_atm = hsbc.create_atm() # it's even true for new ATMs
>>> print(wall_street_atm.next())
<type 'exceptions.StopIteration'>

>>> hsbc.crisis = False # trouble is, even post-crisis the ATM remains empty
>>> print(corner_street_atm.next())
<type 'exceptions.StopIteration'>

>>> brand_new_atm = hsbc.create_atm() # build a new one to get back in business
>>> for cash in brand_new_atm :
...  print cash

$100
$100
$100
$100
$100
$100
$100
$100
$100
...
```
对于控制一些资源的访问来说这很有用。

#### 8.Itertools，你最好的朋友
itertools包含了很多特殊的迭代方法。是不是曾想过复制一个迭代器?串联两个迭代器？把嵌套的列表分组？不用创造一个新的列表的 zip/map?

只要 import itertools

需要个例子？让我们看看比赛中4匹马可能到达终点的先后顺序的可能情况:
```
>>> horses = [1, 2, 3, 4]
>>> races = itertools.permutations(horses)
>>> print(races)
<itertools.permutations object at 0xb754f1dc>

>>> print(list(itertools.permutations(horses)))
[(1, 2, 3, 4), 
(1, 2, 4, 3),
 (1, 3, 2, 4), 
(1, 3, 4, 2), 
(1, 4, 2, 3), 
(1, 4, 3, 2), 
(2, 1, 3, 4), 
(2, 1, 4, 3), 
(2, 3, 1, 4),
(2, 3, 4, 1),
(2, 4, 1, 3), 
(2, 4, 3, 1), 
(3, 1, 2, 4), 
(3, 1, 4, 2), 
(3, 2, 1, 4), 
(3, 2, 4, 1), 
(3, 4, 1, 2),
(3, 4, 2, 1), 
(4, 1, 2, 3), 
(4, 1, 3, 2), 
(4, 2, 1, 3),
(4, 2, 3, 1), 
(4, 3, 1, 2), 
(4, 3, 2, 1)]
```
#### 9.了解迭代器的内部机制

迭代是一个实现可迭代对象(实现的是 __iter__() 方法)和迭代器(实现的是__next__() 方法)的过程。可迭代对象是你可以从其获取到一个迭代器的任一对象。迭代器是那些允许你迭代可迭代对象的对象。

更多见这个文章 [http://effbot.org/zone/python-for-statement.htm](http://effbot.org/zone/python-for-statement.htm)