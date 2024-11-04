# Unity DOTS 中的 `Structural Changes` 操作

## `Structural Changes`概念
- 在 Unity DOTS（Data-Oriented Technology Stack）中,实体会根据其拥有的组件进行分组,`Structural Changes`指的是会导致Unity 
重新组织内存块或内存中块内容的操作称为结构更改，可能会引起性能瓶颈。

因此,了解哪些操作会引起结构更改,并采取适当措施尽量减少这些更改,是高效使用DOTS的关键。

**下面我将介绍会与不会导致结构改变的情况**

## 一.首次运行

- **在 Unity DOTS 中** 首次运行会触发 `DOTS` 内部的数据重组，重新分配或排列符合条件的 `Archetype` 数据,以优化后续查询操作。
> 是不可避免的`Structural Changes`。

## 二.创建或销毁实体

- **创建实体时** Unity会将实体添加到现有数据块中，或者如果没有可用于`Entity's Archetype`的`Chunk`,则创建一个新数据块并将实体添加到该数据块中。
- 系统需要为新实体分配内存，并更新架构表`(Archetype)`，这会触发`Structural Changes`。

  **例如**
```csharp
 public EntityCommandBuffer Ecb;
 Ecb.CreateEntity(EntityArchetype); 
```
- **销毁实体** 同样地删除实体时，系统需要释放该实体的内存，并调整剩余实体的数据结构。
```csharp
 public EntityCommandBuffer Ecb;
 Ecb.DestroyEntity(Entity); 
```

**优化建议**
- 尽量避免频繁的实体创建和销毁操作。
- 使用对象池`(Pool)`技术，复用实体，减少频繁的创建和销毁，尤其是在频繁调用或销毁的情况下。


## 三.添加或移除组件
- **在实体中添加或删除组件时**,会更改`Entity's Archetype`,Unity 将每个实体存储在与实体原型匹配的数据块中,
- **如果改变实体的原型**,Unity 必须将实体移动到另一个`Archetype`。
  - 如果不存在合适的数据块，Unity 会创建一个新数据块。如果移动操作使前一个数据块留有间隙或留空，则 Unity 会移动数据块中的最后一个实体以填充间隙或分别释放数据块,造成性能降低。

```csharp
     public EntityCommandBuffer Ecb;
     Ecb.AddComponent(Entity); 
     Ecb.RemoveComponent(Entity); 
```

**优化建议**
- **设计时**，尽量减少对实体组件的动态添加或移除。
  - 可以在初始化时就将所有可能用到的组件添加到实体上，仅根据需要启用或禁用组件。
- **使用标签组件(空组件)**来表示实体状态的变化，而不是通过频繁添加和移除组件。

## 四.设置`SharedComponentData`值

- **设置**实体的共享组件的值时, Unity 会将实体移动到与新的共享组件值匹配的`Chunk`。
  - 会将拥有相同共享组件数据的所有实体移动到新的架构。
  - 共享组件的更改是一种昂贵的操作,特别是当大量实体共享相同组件数据时。
> **Note 注意**
> 
> 设置常规组件值不是一种结构性更改。

## 五.不会造成结构改变的情况
### 1. `SetComponent` :修改已有组件的值。
### 2. `SetComponentEnabled`:启用或禁用`IEnableableComponent` 组件。
### 3. `GetComponent`:读取组件数据。

## 六.避免频繁`Structural Changes`的最佳实践

### 1. 初始化时确定实体结构
- 在实体创建时尽量确定其组件组合，避免在运行时频繁添加或删除组件。

### 2. 使用 `EntityCommandBuffer` 批量操作
- 将多个操作（如创建、修改实体）缓存在 `EntityCommandBuffer` 中，集中处理可以减少结构变动的频率。

### 3. 尽量减少动态组件添加和移除
- 优先使用已有的组件，避免在更新循环中频繁改变组件的组合。

### 4. 使用 `IJobEntity` 和 `Entities.ForEach` 进行批量数据处理
- 通过 `IJobEntity` 和 `ForEach` 来批量处理组件数据，而不是逐个访问，从而避免对实体结构的影响。

### 5. 使用标签组件
- 使用标签组件（无数据的组件）作为实体的标识，减少对实体的动态变化。

### 6. 合理使用 `DynamicBuffer`
- 在使用 `DynamicBuffer` 时，尽量控制其容量，避免动态扩展引发的结构变化。初始时设置合理的大小，预分配空间。

### 7. 减少 `SetArchetype` 的调用
- 尽量避免频繁调用 `SetArchetype`，尤其是在循环中，保持实体在同一架构中以降低结构变化的发生。

### 8. 使用事件系统
- 通过事件或消息系统将状态更改与实体更新解耦，减少直接对实体结构的操作。

### 9. 避免使用 `GetComponentData` 和 `SetComponentData` 的频繁调用
- 在高频率的更新中，避免使用这些方法，而是将数据操作批量化处理。

### 10. 使用预先定义的 `Archetypes`
- 如果可能，创建预定义的 `Archetypes`，在创建实体时直接指定，从而减少运行时的结构变动。

通过实施这些最佳实践，可以显著降低 `Structural Changes` 的频率，从而提高 Unity DOTS 应用程序的性能和响应速度。
