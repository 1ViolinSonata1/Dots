# Unity 简单的人物控制器

这篇文档提供了一个Unity简单人物控制器的实现代码和解释。

## 功能概述

- **移动**: 通过W,A,S,D键控制角色前后左右移动
- **视角旋转**: 通过鼠标旋转角色视角.


## 代码实现

以下是一个挂载在玩家上,适用于`CharacterController`组件的脚本。

```csharp
using UnityEngine;

public class PlayerMoveMent:MonoBehaviour{
  public float moveSpeed = 5f; //移动速度
  public float mouseSpeed = 3f; //视角旋转速度
  public Transform playerCamera; //用于旋转视角的摄像机
  
  CharacterController cc;
  Vector3 moveDistance;
  float cameraRotateY;
}
void Start(){
  cc=GetComponent<CharacterController>();
}
void Update(){
   moveDistrance =(transform.right *moveX+transform.forward*moveY).normalizing;
   cc.Move(moveDistance*moveSpeed*Time.deltaTime);
 
   cameraRotateY -=mouseY;
   cameraRotateY = Mathf.Clamp(cameraRotateY,-75,75);
   playerCamera.LocalRotation = Quaternion.Euler(cameraRotateY, 0, 0);
   transfrom.Rotate(Vector3.up*mouseX)
}
float moveX =>Input.GetAxis("Horizontal");
float moveY =>Input.GetAxis("Vertical");
float mouseX =>Input.GetAxis("Mouse X");
float mouseY =>Input.GetAxis("Mouse Y");
```

