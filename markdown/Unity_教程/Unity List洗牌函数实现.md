# Unity 洗牌算法

## 概述

洗牌算法用于随机打乱集合中的元素顺序.在 Unity 中,洗牌广泛用于卡牌游戏、随机事件生成、物品随机分配等场景.

## 常见洗牌算法

### 1. `Fisher-Yates` 洗牌算法

`Fisher-Yates` 洗牌算法，也叫 `Knuth` 洗牌。  
该算法从数组或列表的最后一个元素开始,随机选取一个元素并与当前元素交换.然后向前递推,直到遍历完所有元素.  
> 每次选取的元素都是从未交换过的部分中随机选出的，

- **代码实现**

```CSharp
void Shuffle<T>(List<T> list)
{
    System.Random rand = new System.Random();
    for (int i = list.Count - 1; i > 0; i--)
    {
        int j = rand.Next(0, i + 1);
        // 交换元素 list[i] 和 list[j]
        T temp = list[i];
        list[i] = list[j];
        list[j] = temp;
    }
}
```
  
- **总结**: 在普通应用中，它是打乱顺序的首选方法；在高安全性场景中，可以结合更好的随机数生成器来满足要求。

### 2. 使用 `LINQ` 的 `OrderBy` 打乱顺序

使用 `LINQ` 的 `OrderBy` 打乱数据是一种快速且直观的方法，适合小规模集合的随机化.  
对于性能要求较高的场景，建议使用 `Fisher-Yates` 等更高效的算法替代。

> 需要引用 `System.Linq` 库


- **代码实现**

```CSharp
using System;
using System.Collections.Generic;
using System.Linq;

public static class ShuffleExtensions
{
    /// <summary>
    /// 打乱集合中的元素（基于 LINQ 的 OrderBy 方法）
    /// </summary>
    /// <typeparam name="T">集合元素的类型</typeparam>
    /// <param name="source">要打乱的集合</param>
    /// <returns>打乱后的集合</returns>
    public static IEnumerable<T> Shuffle<T>(this IEnumerable<T> source)
    {
        if (source == null) throw new ArgumentNullException(nameof(source));

        Random random = new Random(); // 使用 Random 实例生成随机数
        return source.OrderBy(_ => random.Next()); // 按随机键排序
    }
}

```

- **总结**: 基于 `LINQ` 的 `OrderBy` 是一种方便、易用但性能不够高的随机打乱方法.适用于处理小规模集合的场景,尽管其简洁性和代码友好性是优点.  
- 但性能和随机性稍逊于 Fisher-Yates。如果需要更高性能且随机性没有偏差，推荐使用 Fisher-Yates 算法。