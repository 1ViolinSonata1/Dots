# Unity 摄像机视野检测
## 概述
在游戏开发中，我们经常需要判断物体是否在摄像机的视野范围内,通常用于实现目标锁定,物体可见性,视线追踪等功能.
Unity提供了几种内置方法来帮助我们检测视线视野内的物体.
## 常用方法

### 1.`Camera.WorldToViewportPoint`

 - **描述**:

`WorldToViewportPoint`方法将世界空间中的点转换为视口坐标 <br>

`(Vector 3(0-1,0-1,0-1))`,`x`和`y`判断是否在视野内,`z`判断是否在视野前.

- **返回值**:

`Vector3`,其中`x`和`y`是视口坐标,`z`是物体距离摄像头的深度.

- **用法**:

用来判断物体是否在摄像头的视野范围内。
```csharp
Vector3 screenPosition = camera.WorldToScreenPoint(target.position);
if (screenPosition.x >= 0 && screenPosition.x <= Screen.width &&
    screenPosition.y >= 0 && screenPosition.y <= Screen.height &&
    screenPosition.z > 0) {
    // 物体在屏幕上
}

```

### 2.`Camera.WorldToScreenPoint`
- **描述**:

`WorldToScreenPoint` 方法将世界空间中的点转换为屏幕空间中的点.屏幕坐标系的原点是屏幕的左下角,`(0,0)` 是左下角,`(screenWidth, screenHeight)` 是右上角.

- **返回值**:

`Vector3`,其中 `x` 和 `y` 是屏幕坐标,`z` 是物体距离摄像头的深度.
- **用法**:

用来检测物体是否在屏幕上（即摄像机的视野内）
```csharp
Vector3 screenPosition = camera.WorldToScreenPoint(target.position);
if (screenPosition.x >= 0 && screenPosition.x <= Screen.width &&
    screenPosition.y >= 0 && screenPosition.y <= Screen.height &&
    screenPosition.z > 0) {
    // 物体在屏幕上
}
```

### 3.`Camera.ViewportToWorldPoint`
- **描述**::

`ViewportToWorldPoint`方法将视口坐标`（范围为 0 到 1）`转换为世界空间中的坐标。
- **返回值**:

`Vector3`,表示对应视口坐标的世界空间位置.
- **用法**:

用来将某些视口坐标转换为世界坐标，例如你可能需要将某个 UI 元素的位置转换为世界空间中的位置.
```csharp
Vector3 worldPosition = camera.ViewportToWorldPoint(new Vector3(0.5f, 0.5f, 10f));  
// 中心位置，距离10单位

```

### 4.`Camera.ScreenToWorldPoint`
- **描述**:

`ScreenToWorldPoint`方法将屏幕空间中的坐标转换为世界空间中的坐标.
- **返回值**:

`Vector3`,表示对应屏幕坐标的世界空间位置.
- **用法**:

用来将屏幕坐标转换为世界坐标,适用于鼠标点击事件等.
```csharp
Vector3 worldPosition = 
camera.ScreenToWorldPoint(
new Vector3(Input.mousePosition.x, 
Input.mousePosition.y, 
camera.nearClipPlane));
```

### 5.`Camera.CalculateFrustumPlanes`
- **描述**:

`CalculateFrustumPlanes`方法计算摄像头的视锥体平面.视锥体是摄像头视野的三维空间区域,通常用于判断物体是否在摄像机视野内.
- **返回值**:

`Plane[]`,视锥体的 6 个平面.
- **用法**:

可以用来判断物体是否在视锥体内,适用于手动实现视锥体剔除.
```csharp
Plane[] planes = camera.CalculateFrustumPlanes();
if (GeometryUtility.TestPlanesAABB(planes, target.GetComponent<Collider>().bounds)) {
    // 物体在视锥体内
}

```

### 6`Camera.isVisible`(新版本已弃用)
- **描述**:

`Camera.isVisible` 是在 `Unity 2018.1` 版本中被弃用的.
官方建议使用 `Renderer.isVisible` 来替代它.
- **返回值**:

返回的布尔值`(Boolean)`
- **用法**:

`Renderer.isVisible` 会检查物体的渲染器是否被当前的摄像机视野所覆盖.
```csharp
if (target.GetComponent<Renderer>().isVisible) {
    // 物体Renderer是否打开
}
```
## 总结
1. `Camera.WorldToViewportPoint` 和 `Camera.WorldToScreenPoint` 是最常用的检测物体是否在相机视野内的方法。`WorldToViewportPoint` 适用于视口坐标，`WorldToScreenPoint`适用于屏幕坐标。

2. `Camera.ViewportToWorldPoin`t 和 `Camera.ScreenToWorldPoint` 用于将视口坐标和屏幕坐标转换回世界坐标，适用于从视口或屏幕坐标空间获取物体的世界位置。

3. `Camera.CalculateFrustumPlanes` 适用于更复杂的视野剔除，允许你检查物体是否在摄像机视野的 3D 空间内。

4. `Camera.isVisible` 方法被弃用，但有`Renderer.isVisible`替代.

这些方法可以帮助你实现物体是否在摄像机视野内的判断，并根据实际需求选择合适的方法来优化游戏中的视觉效果。

