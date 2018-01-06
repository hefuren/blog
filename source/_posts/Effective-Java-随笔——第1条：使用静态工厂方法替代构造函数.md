---
title: Effective Java 随笔——第1条：使用静态工厂方法替代构造函数
tags: Java
categories: 程序随记
comments: true
abbrlink: 1bb33093
date: 2017-10-07 22:58:02
copyright: true
---
### 第1条：使用静态工厂方法替代构造函数

　　对于类而言，为了让客户端获取它自身的一个实例，最常用的方法就是提供一个公有的构造器，还有一种就是方法。类可以提供一个公有的*静态工程方法(static factory method)*，它只是一个返回类的实例的静态方法。
```
// 通过isMale字段标识性别
class Person {    
    private bool isMale;        
    // 不容易理解参数的含义    
   public Person(bool _isMale) {        
        this.isMale = isMale;    
    }
 }
// 采用静态工厂方法替代构造函数
class Person {    
    private bool isMale;        
    // 一目了然    
    public static Man() {        
        Persion p = new Persion();        
        p.isMale = true;        
        return p;    
    }    
    public static Woman() {
        Persion p = new Persion();
        p.isMale = false;
        return p;    
     }
}
```
**静态工厂方法的优势：**
- **静态工厂方法与构造器不同的第一大优势在于，它们有名称。** 如果构造器的参数本身没有确切的描述正被返回的对象，那么具有适当名称的静态工厂会更容易使用，更易于阅读。
- **静态工厂方法与构造器不同的第二大优势在于，不必在每次调用它们的时候创建一个新的对象。** 这使得不可变类可以使用预先构建好的实例，或者将构建好的实例缓存起来，进行重复利用，从而避免创建不必要的重复对象。*（如果程序经常请求创建相同的对象，并且创建对象的代价很高，则这项技术可以极大地提升性能。）*
- **静态工厂方法与构造器不同的第三大优势在于，它们可以返回原返回类型的任何子类型的对象。** 这样我们在选择返回对象的类时就有了更大的灵活性。
- **静态工厂方法的第四大优势在于，在创建参数化类型实例的时候，它们使代码变得更加简洁。**

**静态工厂方法的缺点：**
- 缺点1：类如果不含公有的或者受保护的构造器，就不能被子类化。
- 缺点2：它们与其他的静态方法实际上没有任何区别。
