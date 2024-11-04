# C# `Class`与`Struct`的区别

在 C# 中，`class`（类）和 `struct`（结构体）都是定义数据类型的方式。尽管它们的语法结构相似，
但在内存分配、性能、继承、用途等方面有显著的区别。以下将详细介绍两者的区别，以帮助更好地选择合适的数据类型。

## 一. 引用类型vs值类型`(Reference Types vs Value Types)`

- **`class(类)`** 是 `引用类型`。类的实例保存在`堆(heap)`内存中，变量存储的是对象的引用地址，而不是对象本身。
- **`struct(结构体)`** 是 `值类型`。结构体的实例通常保存在`栈(stack)`内存中，变量存储的是对象本身的值。

![引用类型](/image/Value_types_vs_Reference_types.png)

## 二.内存分配

- **`类`** 在堆上分配内存，使用`垃圾回收（GC）`进行内存管理。创建和销毁类对象的开销较大，但适合复杂的数据结构。
- **`结构体`** 在栈上分配内存，内存分配和释放速度较快，不需要 GC 管理，适合小型数据结构。

## 三.继承
- **`结构体`** 不支持继承，不能从其他结构体派生，但可以实现接口。结构体中的方法不能是虚方法或抽象方法。
-  **`类`** 支持继承，可以从其他类派生，支持多态、虚方法、抽象方法等高级特性。

```csharp
private void Start(){
  MyStruct firstStruct =  new MyStruct(11); //创建对象
  MyStruct secondStruct =  firstStruct;  //把第二个变量分配给第一个对象
  secondStruct.value = 7; //修改第二个对象
  Debug.Log("Class:"+firstStruct.value); //打印第一个对象上的内容 结果（7）
  
  MyClass first =  new MyClass(11);
  MyClass second =  first;
  second.value = 7;
  Debug.Log("Class:"+first.value); //结果（11）
}

public struct MyStruct{ 
public int value;
public MyStruct(int value){
    this.value = value;
    }
}

public struct MyClass{
public int value;
public MyClass(int value){
    this.value = value;
    }
}

```
> **`结构体`** 在修改第二个变量时,不会传递第一个对象的引用，而是传递该对象的副本，因此每个变量都包含结构的不同实例。当我们修改第二个变量时，我们仅修改了第二个变量内的副本，第一个变量根本不会被修改。

>**`类`**  在修改对象时任何一个都会修改,

## 四.可空性

- **`类`** 是引用类型，可以被赋值为 null，表示不引用任何对象。
- **`结构体`** 是值类型，默认情况下不能为 null。不过，可以通过 `Nullable<T>` 或` T? `使结构体变为可空类型。

```csharp
 int? i = null;
 Nullable<int> i = null;
 
 //例如
 public enum  WeaponTypes{
    Gun,
    Knife,
 }
 WeaponTypes? PlayerWeapon = null;
```

## 五.默认构造函数
- **`类`** 可以定义带参数或无参数的构造函数。如果没有定义构造函数，编译器会提供一个默认的无参构造函数。
- **`结构体`** 不能显式定义无参构造函数，所有字段初始化为默认值（如 `int` 为 `0`）。可以定义带参数的构造函数，但不带参数的构造函数由系统自动生成。

## 总结
- **类** 适用于需要跨方法或多个实例共享引用的数据结构，尤其是大型或复杂的数据结构。
- **结构体** 适用于小型、轻量的数据结构，例如点（Point）、颜色（Color）、坐标等简单类型。
>
| 特性     | `class`（类）  | `struct`（结构体）       |
|--------|-------------|---------------------|
| 类型     | 引用类型        | 值类型                 |
| 内存位置   | 堆           | 栈                   |
| 继承     | 支持          | 不支持                 |
| 虚方法    | 支持          | 不支持                 |
| 默认可为空  | 可以          | 不可以，需 `Nullable<T>` |
| 默认构造函数 | 支持用户定义的无参构造 | 不支持用户定义无参构造         |
| 使用场景   | 复杂、大型数据结构   | 简单、小型数据结构           |

---