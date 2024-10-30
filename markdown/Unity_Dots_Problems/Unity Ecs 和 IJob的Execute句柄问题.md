# Ecs 和 IJob中Execute句柄访问冲突问题

在Unity Dots中,使用`IJobEntity`和`IAspect`进行并行计算可能会出现句柄冲突问题。
以下是常见冲突的原因和对应的解决方法。
  
## 1.Execute()中避免同时`ref`和`IAspect`
- **问题**:在`IJobeEntity`的`Execute`方法中同时使用`IAspect`和`ref`参数使用时,会导致冲突。

- **示例**

```csharp
[BurstCompile]
public void Execute(MyAspect aspect,ref LocalTransfrom localtransfrom){
}
```
因为`IAspect`的数据过于复杂，会导致与`ref`简单的数据类型产生冲突

- **解决方法**:在作业中仅使用`IAspect`或`ref`参数，不要同时使用两者。

## 2.对同一组件的数据进行多次访问

- **问题**：多个`ref` 参数试图访问同一个数据源会导致冲突。

- **示例**

```csharp
[BurstCompile]
public void Execute(ref LocalToWorld localtoworld,ref LocalTransform localtransform){
localtoworld.Value.y +=1;
localtransfrom.Position +=1;
}
```

- **解决方法**:对每个组件数据进行唯一引用,避免在`Execute`中多次引用会修改冲突数据的组件。

## 3.使用EntityCommandBuffer并行写入

- **问题**:并行写入时`EntityCommandBuffer`不支持多线程写入相同实体,可能导致冲突。

- **示例**

```csharp
[BurstCompile]
public partial struct MyISystem : ISystem
{
    [BurstCompile]
    public void OnUpdate(ref SystemState state)
    {
        var ecb = SystemAPI.GetSingleton<EndSimulationEntityCommandBufferSystem.Singleton>();
        var Ecb = ecb.CreateCommandBuffer(state.WorldUnmanaged);
        new EcbChuckJob {
        Ecb = Ecb(),
        }.ScheduleParallel();
        //EntityCommandBuffer不支持多线程写入相同实体
    }
}

[BurstCompile]
public partial struct EcbChuckJob : IJobEntity
{
    public EntityCommandBuffer Ecb;
    [BurstCompile]
    public void Execute(My_IAspect aspect)
    {
        Ecb.Instantiate(aspect.Prefab);
    }
}
```


- **解决方法**:添加`[EntityIndexInQuery] int sortKey`在`Execute`以支持并行处理


```csharp
[BurstCompile]
public partial struct MyISystem : ISystem
{
    [BurstCompile]
    public void OnUpdate(ref SystemState state)
    {
        var ecb = SystemAPI.GetSingleton<EndSimulationEntityCommandBufferSystem.Singleton>();
        var Ecb = ecb.CreateCommandBuffer(state.WorldUnmanaged);
        new EcbChuckJob {
        Ecb = Ecb.AsParallelWriter(),
        }.ScheduleParallel();
        //按实体索引执行写入操作，避免同一实体的多线程写入
    }
}

[BurstCompile]
public partial struct EcbChuckJob : IJobEntity
{
    public EntityCommandBuffer.ParallelWriter Ecb;
    [BurstCompile]
    public void Execute([EntityIndexInQuery] int sortKey,My_IAspect aspect)
    {
        Ecb.Instantiate(sortKey,aspect.Prefab);
    }
}
```

## 4.使用非线程安全的数据结构
- **问题**:在并行作业中使用非线程安全的容器会引起冲突

- **示例**

```csharp
  public NativeArray<float3> Value;
  var Points = new NativeList<float3>(Allocator.Temp);
```
- 在使用 Unity 的`NativeArray`和`NativeList`原生数据容器时，需要注意一些关键点，以确保高效和安全的内存管理。以下是一些使用注意事项:

  -  **分配和释放**:确保在完成作业后及时释放内存,使用 `Dispose()` 方法释放 `NativeArray`，否则可能会导致内存泄漏。
  -  **或者用`using`自动释放**
  -  **并行写入**:`NativeList` 不支持在并行作业中直接写入。如果需要在作业中写入数据，可以使用临时的 `NativeArray` 存储结果，然后在主线程中合并。
  
  -  > 一定要注意释放！！！

- **解决方法**:在并行作业中标记需要共享的容器为`[ReadOnly]`,或者用`BlobAssetReference<NativeArray<float3>>`用于存储和共享不可变的数据。

## 5.System更新顺序不明确
- **问题**:多个系统在同一帧写入相同组件数据,导致写入顺序不明确。

- **示例**

```csharp
public partial struct ISystemA : ISystem{
    //依赖 ISystemB 的数据
}
public partial struct ISystemB : ISystem{

}
```

- **解决方法**:利用`UpdateBefore`或`UpdateAfter`指定系统的更新顺序,确保数据在系统间传递是顺序一致。

```csharp
[UpdateAfter(typeof(ISystemB))]
public partial struct ISystemA : ISystem{
    //依赖 ISystemB 的数据
}
public partial struct ISystemB : ISystem{

}
```

## 6.在Execute中使用复杂逻辑
- **问题**:在作业中使用复杂逻辑可能导致句柄冲突。

- **示例**

```csharp
[BurstCompile]
public void Execute(){
  var result = ComplexCalculation(); //复杂逻辑
}
```

- **解决方法**:通过封装逻辑到 IAspect 中，可以减少系统中的重复代码，有助于提高代码的可维护性和可测试性。

