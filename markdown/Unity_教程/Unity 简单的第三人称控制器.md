# Unity 简单的第三人称控制器

本文档以第三人称视角为核心,结合摄像机动态插值,鼠标输入控制,实现了流畅的玩家移动与视角跟随效果.

>**`注意`** 本文档不包括摄像机视角被环境遮挡等效果

## 功能概述

- **人物本体旋转**: 通过W,A,S,D键控制玩家方向的旋转.
- **相机视角旋转**: 通过鼠标旋转角色视角.

## 实现思路

**`众所周知`** 在Unity中要实现第三人称效果基本围绕不开`RotateAround`;

```Csharp
Transform.RotateAround(Vector3 point, Vector3 axis, float angle);
```

- **即:** 让目标物体（Transform）围绕某个点 `point`，沿某条轴 `axis`，旋转指定的角度 `angle`.
  - `point`:旋转的中心点(世界坐标).
  - `axis`:旋转的轴(世界坐标系下的单位向量).
  - `angle`:旋转的角度(以度为单位).
  
- **公式表示** 假设你有一个物体的位置向量 `P`,你希望将物体围绕点 `O`旋转一个角度 `θ`,旋转轴为单位向量 `v`.
  - **` P′ = P − O `**
  - 就能得到
  - ```Csharp
    Camera.position = Player.position - Camera.position * offset;
    ```
  - **总结** 它通过平移,旋转和再平移的步骤来计算物体的新位置,就能实现第三人称的效果;
  
## 代码实现

- **挂载在玩家身上**

```Csharp
using UnityEngine;
    /// <summary>
    /// 作者 Vs34f编写
    /// </summary>
public class PlayerMovement : MonoBehaviour
{
   private CharacterController cc; // 玩家身上的角色控制器
   public float speed; //控制玩家的移动速度
   public float mouseSpeed //控制玩家相机的速度
   public Transform playerCamera; //要跟随玩家的相机
   public Transform camP1, camP2; //camP1相机初始位置,camP2相机结束位置，需在玩家身上
   private float mouseX,mouseY; //获取鼠标移动值
   private Vector3 moveMent; //控制玩家移动的Vector3
   private Vector3 Velocity; //控制玩家的下落速度
   
   void Start(){
    cc = GetComponent<CharacterController>(); 
   }
   void Update(){
    PlayerMove(); //移动逻辑
    ThirdPerson(); //第三人称相机控制
   }
   
   private void PlayerMove(){
    moveMent = (playerCamera.forward * move.y + playerCamera.right * move.x).normalized;
    Velocity.y = -3; //简单的下落
    if (moveMent != Vector3.zero)
    {
        Quaternion PlayerRotation = Quaternion.LookRotation(new Vector3(moveMent.x, 0, moveMent.z));
        transform.localRotation = Quaternion.Slerp(transform.localRotation, PlayerRotation, Time.deltaTime * 5); //W,A,S,D控制旋转
    }

    cc.Move(Velocity * Time.deltaTime);
    cc.Move(moveMent * speed * Time.deltaTime);
    }
    private void ThirdPerson() { 
     mouseX += mouse.x;
     mouseY -= mouse.y;
     mouseY = Mathf.Clamp(mouseY, -40, 10);
     float lerpValue = Mathf.InverseLerp(10, -40, mouseY); //映射插值
     Vector3 targetPosition = Vector3.Lerp(camP1.localPosition, camP2.localPosition, lerpValue); //相机插值位置过渡
     Quaternion rotation = Quaternion.Euler(MouseY, MouseX * mouseSpeed, 0); //相机的旋转
     Vector3 CameraDistance = rotation * targetPosition; // 乘法获得相机偏移的数值
     playerCamera.position = Vector3.Lerp(playerCamera.transform.position, transform.position + CameraDistance, Time.deltaTime * 5); //最后做平滑插值
     playerCamera.LookAt(transform.position+ Vector3.up *2); //相机看向玩家   
    }
   //封装移动和鼠标移动,也可以用新输入系统
   Vector2 move => new Vector2(Input.GetAxis("Horizontal"), Input.GetAxis("Vertical"));
   Vector2 mouse => new Vector2(Input.GetAxis("Mouse X"), Input.GetAxis("Mouse Y"));
}
```