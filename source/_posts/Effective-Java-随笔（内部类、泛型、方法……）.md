---
title: Effective Java 随笔（内部类、泛型、方法……）
tags: Java
categories: 程序随记
comments: true
abbrlink: 9c616f22
date: 2017-10-07 23:26:16
copyright: true
---
**第22条：优先考虑静态成员类**　　
　　Java程序中共有四种不同的嵌套类，每一种都有自己的用途。如果一个嵌套类需要在单个方法之外仍然是可见的，或者它太长了，不适合于放在方法内部，就应该使用成员类。如果成员类的每个实例都需要一个指向其外围实例的引用，就要把成员类做成非静态的；否则，就做成静态的。假设这个嵌套类属于一个方法的内部，如果你只需要在一个地方创建实例，并且已经有了一个预置的类似可以说吗这个类的特征，就要把它做成匿名类；否则，就做成局部类。

**泛型**
**第23条：请不要在新代码中使用原生态类型**
　　Java 1.5之后支持泛型，建议在代码中不要使用原生态类型。如果使用原生态类型，就失掉了泛型在安全性和表述性方面的所有优势。，例如：
```
//不建议这样定义List
private List list ;

//支持泛型的对象，建议如下定义
private List<String> list;
```


**第30条：用enum代替int常量**
　　在编程语言中还没有引入枚举类型之前，表示枚举类型的常用模式是声明一组具名的int常量，每个类型成员一个常量：
```
// The int enum pattern - severely dificient !
public static final int APPLE_FUJI = 0;
public static final int APPLE_PIPPIN =1
......

public static final int ORANGE_NAVEL = 0;
public static final int ORANGE_TEMPLE =1;
......
```
　　这种方法称作int枚举模式，存在诸多不足。它在类型安全性和使用方便性方面没有任何帮组。如果将apple传到想要的orange的方法中，编译器也不会出现警告。建议在诸如类似常量定义时，考虑使用 enum type。

**方法**
***第38条：检查参数的有效性*
　　每当编写方法或者构造器的时候，应该考虑它的参数有哪些限制。应该把这些限制写到文档中，并且在方法体的开头处，通过显示的简称来实施这些限制。例如：
```
/**
  * Returns a BigInteger whose value is (this mod m). This method
  * differs form the remainder method in that it always returns a 
  * non-negative BigInteger
  *
  * @param m the modeulus, thich must be positive
  * @return this mod m
  * @throws ArithmeticException if m is less than or equal to 0
  */
public BigInteger mod(BigInteger m){
    if(m.signum() <= 0)
        throw new ArithmeticException("Modulus <= 0 : " + m );

      ...... // Do the computation
}
```

**通用程序设计**
**第49条：基本类型优先于装箱基本类型（基本类型的包装类）**
1.什么时候应该使用装箱基本类型呢？
　　第一是作为集合中的元素、健和值。你不能将基本类型放在集合中，因此必须使用装箱基本类型。这是一种更通用的特例。在参数化类型中，必须使用装箱基本类型作为类型参数，因为Java不能运行使用基本类型。
　　基本类型性能优于装箱基本类型，总之，当可以选择的时候，基本类型要优先于装箱基本类型。

**第52条：通过接口引用对象**
　　应该优先使用接口而不是类的引用对象。*如果有合适的接口类型存在，那么对于参数、返回值、变量或域来说，就都应该使用接口类型进行声明。*例如：
```
//Good - user interface as type
List<Subscriber> subscribers = new ArrayList<Subscriber>();

//Bad - user class as type
ArrayList<Subscriber> subscribers = new ArrayList<Subscriber>();
```
*如果没有合适的接口存在，完全可以用类而不是接口来引用对象。（建议使用类层次接口中提供了必要功能的最基础的类）*