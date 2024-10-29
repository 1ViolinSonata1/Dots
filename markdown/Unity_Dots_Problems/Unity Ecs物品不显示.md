# Unity Ecs物品不显示

Unity Ecs运行时游戏对象不显示或位置信息不进行更新的问题

## 在首选项中的Entities的Baking没有正确设置加载模式

在Unity Ecs运行项目时,可能会遇到在Game视窗的可以正常加载，但是Scene视窗中看不到任何游戏对象的情况


**解决方法**

在首选项中的Entities下的Baking中，选择Scene View Mode 为Runtime data即可解决。

![图片描述](/image/Entities_Baker.png)


## 因为内存问题导致无法正常加载

在ISystem中请求EntityCommandBuffer时没有正确释放也会导致无法正常加载物体

**解决方法**

在ISystem中引用EntityCommandBuffer加上uing,以确保在正确的作用域释放或者调用Dispose()。

```csharp
using var ecb = new EntityCommandBuffer(Allocator.Temp);

```
或者
```csharp
var Ecb = new EntityCommandBuffer(Allocator.Temp);
Ecb.Dispose();
```