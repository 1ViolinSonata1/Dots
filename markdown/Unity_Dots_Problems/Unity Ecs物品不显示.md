# Unity Ecs物品不显示

Unity Ecs运行时游戏对象不显示或位置信息不进行更新的问题

## 在首选项中的Entities的Baking没有正确设置加载模式

在Unity Ecs运行项目时,可能会遇到在Game视窗的可以正常加载，但是Scene视窗中看不到任何游戏对象的情况


**解决方法**

在`首选项中`的`Entities`下的`Baking`中，选择`Scene View Mode`为`Runtime data`即可解决。

![Unity设置](/image/Entities_Baker.png)


## 因为内存问题导致无法正常加载

在`ISystem`中请求`EntityCommandBuffer`时没有正确释放也会导致无法正常加载物体

**解决方法**

在`ISystem`中引用`EntityCommandBuffer`加上`uing`,以确保在正确的作用域释放或者调用`Dispose()`。

```csharp
using var ecb = new EntityCommandBuffer(Allocator.Temp);

```
或者
```csharp
var Ecb = new EntityCommandBuffer(Allocator.Temp);
Ecb.Dispose();
```