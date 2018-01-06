---
title: Effective Java 随笔——第2条：遇到多个构造器参数时要考虑用构建器
tags: Java
categories: 程序随记
comments: true
abbrlink: b3a294b7
date: 2017-10-07 23:01:04
copyright: true
---
　　静态工厂和构造器有一个共同的局限性：它们都不能很好地扩展到大量的可选参数。如果一个构造器的参数有10,11,12，...或更多时。一长串类型相同的参数会导致一些微妙的错误，如果不小心颠倒了其中两个参数的顺序，编译器也不会出错，但是程序在运行时会出现错误的行为。
　　遇到许多构造参数的时候，**还有第二种代替办法，及JavaBean模式**，在这种模式下调用一个无惨构造器来创建对象，调用setter方法来设置每个必要的参数，以及每个相关的可选参数。
> Effective Java一书中提到：JavaBean模式自身有着很严重的缺点，因为构造过程分到了几个调用中，**在构造过程中JavaBean可能处于不一致的状态。**类无法仅仅通过检验构造器参数的有效性来保证一致性。视图使用处于不一致的对象，将会导致失败。这种失败与包含错误的代码大相径庭。与此相关的另一点不足在于，**JavaBean模式阻止了把类做成不可变的可能，**这就需要程序员付出额外的努力来确保它的线程是安全的。

*附注：个人在使用中，还没有发现这个问题，如有了解的大神，还请不吝赐教。*

　　最佳替代方法**Builder模式**，既能保证像重叠构造器模式那样的安全性，也能保证像JavaBean模式那么好的可读性。Builder模式，不直接生成想要的对象，而是让客户端在builder对象上调用类似于setter的方法，来深圳每个相关的可选参数。最后，客户端调用无参的builder方法生成不可变的对象。这个builder是它构建的类的静态成员类。
```
public class NutritionFacts {
    private final int servingSize;
    private final int servings;
    private final int calories;
    private final int fat;
    private final int sodium;
    private final int carbohydrate;

    public static class Builder {
        // Required parameters
        private final int servingSize;
        private final int servings;

        // Optional parameters - initialized to default values
        private int calories      = 0;
        private int fat           = 0;
        private int carbohydrate  = 0;
        private int sodium        = 0;

        public Builder(int servingSize, int servings) {
            this.servingSize = servingSize;
            this.servings    = servings;
        }

        public Builder calories(int val)
            { calories = val;      return this; }
        public Builder fat(int val)
            { fat = val;           return this; }
        public Builder carbohydrate(int val)
            { carbohydrate = val;  return this; }
        public Builder sodium(int val)
            { sodium = val;        return this; }

        public NutritionFacts build() {
            return new NutritionFacts(this);
        }
    }

    private NutritionFacts(Builder builder) {
        servingSize  = builder.servingSize;
        servings     = builder.servings;
        calories     = builder.calories;
        fat          = builder.fat;
        sodium       = builder.sodium;
        carbohydrate = builder.carbohydrate;
    }

    public static void main(String[] args) {
        NutritionFacts cocaCola = new NutritionFacts.Builder(240, 8).
            calories(100).sodium(35).carbohydrate(27).build();
    }
}
```
　　此处Builder类作为一个静态内部类。我们最终要获得的是NutritionFacts对象，从他的构造函数可以看出，是通过builder对象来对他的属性进行初始化的。而builder对象的属性是通过多个setter方法设置的。 