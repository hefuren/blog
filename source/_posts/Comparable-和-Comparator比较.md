---
title: Comparable 和 Comparator比较
tags: http协议
categories: 程序随记
comments: true
abbrlink: ae6b923
date: 2017-10-08 09:33:34
copyright: true
---
**对集合或数组进行排序有两种方法：**
1.集合中的对象所属的类实现了java.lang.Comparable 接口，然后调用**Collections.sort()**或者**Arrays.sort()**
2.实现java.lang.Comparator接口，把这个实现接口的类作为参数传递给上述的sort()方法。

**1、Comparable<T> java.lang Interface Comparable<T>**
属于Java集合框架下的一个接口。它只有一个方法 **int compareTo(T o)** 用于提供排序所需要的比较逻辑。实现这个接口的类，其对象都可以通过调用**Collections.sort()**或者**Arrays.sort()**进行排序，根据**compareTo**的逻辑升序排列。
```
class Person implements Comparable<Person>{
    String name;
    public Person(String name) {
        this.name = name;
    } 

    public int compareTo(Person other) {
        //按名字的字母顺序从z~a排    
        if(name.compareTo(other.name) < 0)  //当前的字符串，在比较字符串之前，那就返回1
            return 1;
        else
            if(name.compareTo(other.name) > 0)
                return -1;
            else
                return 0;
    }
}
```

**2、再来看Comparator<T> java.util Interface Comparator<T>**
简单来说，Comparator是策略模式的一种实现，体现了将类和排序算法相分离的原则。
```
class ComparatorImp implements Comparator<Person>{
	public int compare(Person p1, Person p2)	{
		if(p1.name.compareTo(p2.name) < 0)
			return -1;
		else
			return (p1.name.compareTo(p2.name) > 0) ? 1 : 0;
	}
}

```

测试
```
public class TestComparable {
	public static void main(String[] args) {
		Person[] aPersons = new Person[4];
		aPersons[0] = new Person("Jony");
		aPersons[1] = new Person("Pun");
		aPersons[2] = new Person("HelloKitty");
		aPersons[3] = new Person("Brown");

		Arrays.sort(aPersons);
		for(Person p: aPersons )	{
			System.out.print(p.name + " ");
		}

		System.out.println();
		Arrays.sort(aPersons, new ComparatorImp());
		for(Person p: aPersons )	{
			System.out.print(p.name + " ");
		}
		System.out.println();

		List<Person> lperson = new LinkedList<Person>();
		for(Person p : aPersons) {
			lperson.add(p);
		}
		Collections.sort(lperson);
		for(int i = 0 ; i < lperson.size(); i++)		{
			System.out.print(lperson.get(i).name+ " ");
		}

	}
}
```
