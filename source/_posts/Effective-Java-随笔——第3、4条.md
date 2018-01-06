---
title: Effective Java 随笔——第3、4条
tags: Java
categories: 程序随记
comments: true
abbrlink: 49d3cb47
date: 2017-10-07 19:31:09
copyright: true
---
### 第3条：用私有构造器或者枚举类型强化Singleton属性　　
　　Singleton指仅仅被实例化一次的类，通常被用来代表那些本质上唯一的系统组件。如果项目通过Spring构建，可以通过Spring来管理Bean，默认情况下在Bean的为单例模式。

### 第4条：通过私有构造器强化不可实例化的能力
　　有的类只有静态方法和静态域时，就可以定义私有构造器来明确说明该类不可实例化，一般多用于工具类。

### 第14条：在公有类中使用访问方法而非公有域
　　简书面向对象设计的思想，对于可变类来说，应该用包含私有域的公有设值方法（setter）类代替。例如：
```
public class Point {
    private double x;
    private double y;
    
    public double getX(){
           return x;
    }
 
    public double getY(){
           return y;
    }
   
    public void setX(double x){
            this.x = x;
    }
 
     public void setY(double y){
            this.y = y;
    }
}
```
　　如果类可以在它所在的包外部进行访问，就提供访问方法 ，避免直接访问类的域。如果类是包级私有的，或者是私有的嵌套类，直接暴露它的数据域并没有本质的错误。
