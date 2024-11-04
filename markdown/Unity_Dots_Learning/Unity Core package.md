# Dots是什么？

## Data Oriented Technology Stack(面向数据的技术栈)

是由Unity提供的一系列游戏相关功能相关的额外包和相关工具
是Unity面向数据设计与编程的一整套技术解决方案

## 一.Dots核心包

### 1.`JobSystem`

用来提供快速安全和使用简单的编写多线程代码的方式,从而让开发者更容易地利用`现代CPU的多核设计`来处理并行任务

```csharp

[BurstCompile]
public partial struct MyJob : IJobEntity {
   [BurstCompile]
   public void Extute(MyAspect aspect){
   
   }
}

```

### 2.`Burst Compiler`

优化CSharp代码的编译器

```csharp
[BurstCompile]
```

### 3.`Entites(Entity-Component System)`

Entity是替换在非托管工作模式下的GameObject,他相比于GameOjbect更加高效。
他本身并不带有任何数据,是一种抽象化的实体。
`Components`也只是数据片段的集合,他们都有对应的System代码单元进行处理。

### 4.`Mathematics`

由`JobSystem`提供的数学库,提供在非托管代码下使用。
他提供的功能在`Burst`编译的代码中使用是经过特别优化的

### 5.`Collections`

他提供了常见的集合类型，这些类型的内存分配属于非托管类型。
可以在`Burst`编译代码中的`Ijob system`中使用,并且这些集合类型支持安全检查



## 二.额外包

### 1.`Entityes Graphics`
  - 一套支持`Urp`和`Hdrp`的`Entity`的渲染解决方案,主要是为了优化`Cpu`性能而设计的。
  - `Entityes Graphics`是从Dots把数据送到Gpu上的一个path，而是比传统基于C++代码更快的data path
  - `Entityes Graphics`主要包含两部分内容。一个是`Data PersistentModel`数据上传，一个是`Persistent Batches`组织`Batch`。
  - 详细请看 [深入理解Entitiyes Graphics](https://developer.unity.cn/projects/648949b2edbc2a0b29931365)

### 2.`Netcode`
  - `Netcode for Entityes`是UnityDots的一部分,他提供了网络多人连线的服务器功能。
  - 详细[Unity 官方Netcode文档](https://docs.unity.org.cn/ugs/en-us/manual/mps-sdk/manual/build-with-netcode-for-entities)
  
### 3.`Physics`
  - 默认`Unity Physics`包，他是一个无状态的确定性物体库,比较适合多人网络游戏。
  - 详细[Unity 官方Physics文档](https://docs.unity3d.com/Packages/com.unity.physics@1.0/manual/index.html)
  
## 三.后言

### 为什么我们需要Dots?

#### 1.Cpu与Memory的速度不均衡以及带宽限制
- 添加高速的缓存Chache内存层级去弥补
#### 2.`摩尔定律`的延续与现代Cpu设计。
- 越来越好的工艺
- 越来越多的核
- 分工越来越细的处理单元于存储
- `SIMD/SIMT`
#### 3.并行编程的发展
- `OpenMP`
- `TBB——Intel Threading Building Blocks`
- `CUDA——Compute Unified Divice Architecture`
- `OpenCL——Open Computing Language`
- `MPI/OpenMPI——Message passing Interface`
 
>**OOD-->DOD**

>用Dots编写出的程序可以充分利用现代Cou多核并行设计
