---
title: Python 编程最佳实践
tags: Python
categories: 程序随记
comments: true
abbrlink: cf66995
date: 2017-10-08 12:13:05
copyright: true
---
### 项目结构定义： Sample Repository
This is what Kenneth Reitz recommends.
This repository is [available on GitHub.](https://github.com/kennethreitz/samplemod)

```
README.rst
LICENSE
setup.py
requirements.txt
sample/__init__.py
sample/core.py
sample/helpers.py
docs/conf.py
docs/index.rst
tests/test_basic.py
tests/test_advanced.py
```

- - -

#### Very bad
```
[...]
from modu import *
[...]
x = sqrt(4) # Is sqrt part of modu? A builtin? Defined above?
```

#### Better
```
from modu import sqrt
[...]
x = sqrt(4) # sqrt may be part of modu, if not redefined in between
```

#### Best
```
import modu
[...]
x = modu.sqrt(4) # sqrt is visibly part of modu's namespace
```
- - -
### Decorators

The Python language provides a simple yet powerful syntax called ‘decorators’. A decorator is a function or a class that wraps (or decorates) a function or a method. The ‘decorated’ function or method will replace the original ‘undecorated’ function or method. Because functions are first-class objects in Python, this can be done ‘manually’, but using the @decorator syntax is clearer and thus preferred.

```
def foo():
    # do something

def decorator(func):
    # manipulate func
    return func

foo = decorator(foo) # Manually decorate

@decorator
def bar():
    # Do something

# bar() is decorated
```
- - -

**Bad**
```
items = 'a b c d' # This is a string...
items = items.split(' ') # ...becoming a list
items = set(items) # ...and then a set
```

**Good**
```
count = 1
msg = 'a string'
def func():
    pass # Do something
```
- - -
**Bad**
```
# create a concatenated string from 0 to 19 (e.g. "012..1819")
nums = ""
for n in range(20):
    nums += str(n) # slow and inefficient
print nums
```

**Good**
```
# create a concatenated string from 0 to 19 (e.g. "012..1819")
nums = []
for n in range(20):
    nums.append(str(n))
print "".join(nums) # much more efficient
```

**Best**
```
# create a concatenated string from 0 to 19 (e.g. "012..1819")
nums = [str(n) for n in range(20)]
print "".join(nums)
```
