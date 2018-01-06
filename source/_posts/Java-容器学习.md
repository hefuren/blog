---
title: Java 容器学习
tags: Java
categories: 程序随记
comments: true
abbrlink: 6956966a
date: 2017-10-08 09:34:34
copyright: true
---
#### Set 
实现Set接口包括 HashSet, TreeSet, LinkedHashSet 。在没有其它限制的情况下，建议使用**HashSet**，因为它对速度/效率进行了优化。

- **Set (interface) ：** 存入Set的每个元素都必须是唯一性，因为Set不保存重复元素。加入Set的元素必须定义equals()方法以确保对象的唯一性。Set与Collection有完全一样的接口。Set接口不保证维护元素的次序。
- **HashSet * ：** 为了快速查找而设计的Set。 存入HashSet的元素必须定义**hashCode()**方法。
- **TreeSet ：** 保持次序的Set，底层为树结构。使用它可以从Set中提取有序的序列。元素必须实现**Comparable**接口。
- **LinkedHashSet：** 具有HashSet的查询速度，且内部使用链表维护元素的的顺序（插入的次序）。于是在使用迭代器遍历Set时，结果会按元素插入的次序显示。元素必须定义hashCode()方法。

> 对于良好的编程风格而言，你应该覆盖equals()方法时，总是覆盖hashCode()方法。


#### 队列 Queue
除了并发应用，Queue在Java SE5中仅有的两个实现是**LinkedList**和**PriorityQueue**，它们的差异在于排序行为而不是性能。

LinkedList双向队列（*双端队列*），就像是一个队列，但是你可以在任何一端添加和移除元素。在LinkedList 中包含支持双向队列的方法。


#### Map

- **HashMap * ：** Map基于散列表的实现（它取代了Hashtable）。插入和查询“键值对”的开销是固定的。可以通过构造器设置容量和负载因子，以调整容器的性能。
- **LinkedHashMap ：** 类似于HashMap，但是迭代遍历它时，取得“键值对”的顺序是其插入次序，或者是最近少使用（LRU）的次序。只比HashMap慢一点；而在*迭代访问时反而速度更快*，因为它使用链表维护内部次序。
- **TreeMap ： ** 基于红黑树的实现。查看“键”或“键值对”时，它们会被排序（次序由Comparable或Comparator决定）。TreeMap的特定在于，所得到的结果是经过排序的。TreeMap是唯一的带有**subMap()**方法的Map，它可以返回一个子树。
- **WeakHashMap：** 弱键（weak key）映射，允许释放映射所指向的对象；这是为解决某些特殊问题而设计的。如果映射之外没有引用指向某个“键”，则此“键”可以被垃圾收集器回收。
- **ConcurrentHashMap： ** 一种线程安全的Map，它不涉及同步加锁。
- **IdentityHashMap：** 使用==代替equals()对“键”进行比较的散列映射。专为解决特殊问题而设计的。

对Map中使用的键值要求与Set中的元素要求一致。任何键都必须具有一个equals()方法，如果键被用于散列Map，那么它必须还具有恰当的hashCode()方法；如果键被用于TreeMap，那么它必须实现Comparable。

> Java 数组的效率比ArrayList效率高
