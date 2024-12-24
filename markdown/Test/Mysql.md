# MySQL 常用代码与语法

本篇文档整理了 MySQL 数据库的常用操作及其实现代码，方便复习与实践。

## 数据库操作

### 创建数据库
```sql
CREATE DATABASE 数据库名;
```

### 查看所有数据库
```sql
SHOW DATABASES;
```

### 选择数据库
```sql
USE 数据库名;
```

### 删除数据库
```sql
DROP DATABASE 数据库名;
```

## 数据表操作

### 创建数据表
```sql
CREATE TABLE 表名 (
    列名1 数据类型 [约束],
    列名2 数据类型 [约束],
    ...
);
```

#### 示例
```sql
CREATE TABLE student (
    sno CHAR(8) PRIMARY KEY,
    sname VARCHAR(50) NOT NULL,
    sgender ENUM('男', '女'),
    sbirth DATE,
    sclass VARCHAR(50)
);
```

### 查看表结构
```sql
DESCRIBE 表名;
```

### 删除数据表
```sql
DROP TABLE 表名;
```

### 修改数据表

#### 添加列
```sql
ALTER TABLE 表名 ADD 列名 数据类型;
```

#### 删除列
```sql
ALTER TABLE 表名 DROP COLUMN 列名;
```

#### 修改列类型或约束
```sql
ALTER TABLE 表名 MODIFY COLUMN 列名 新数据类型;
```

#### 重命名表
```sql
ALTER TABLE 表名 RENAME TO 新表名;
```

## 数据操作

### 插入数据
```sql
INSERT INTO 表名 (列名1, 列名2, ...) VALUES (值1, 值2, ...);
```

#### 示例
```sql
INSERT INTO student (sno, sname, sgender, sbirth, sclass)
VALUES ('10101001', '张军', '男', '1999-10-28', '软件技术');
```

### 查询数据

#### 查询所有记录
```sql
SELECT * FROM 表名;
```

#### 查询特定字段
```sql
SELECT 列名1, 列名2 FROM 表名;
```

#### 添加条件查询
```sql
SELECT * FROM 表名 WHERE 条件;
```

#### 示例
```sql
SELECT * FROM student WHERE sclass = '软件技术' AND sgender = '男';
```

#### 排序查询
```sql
SELECT * FROM 表名 ORDER BY 列名 ASC|DESC;
```

#### 去重查询
```sql
SELECT DISTINCT 列名 FROM 表名;
```

### 更新数据
```sql
UPDATE 表名 SET 列名1 = 值1, 列名2 = 值2 WHERE 条件;
```

#### 示例
```sql
UPDATE student SET sclass = '大数据' WHERE sname = '张宇';
```

### 删除数据
```sql
DELETE FROM 表名 WHERE 条件;
```

#### 示例
```sql
DELETE FROM student WHERE sno = '10101001';
```

## 聚合函数

### 常用函数

#### 计数
```sql
SELECT COUNT(*) FROM 表名;
```

#### 求和
```sql
SELECT SUM(列名) FROM 表名;
```

#### 平均值
```sql
SELECT AVG(列名) FROM 表名;
```

#### 最大值/最小值
```sql
SELECT MAX(列名), MIN(列名) FROM 表名;
```

### 分组统计
```sql
SELECT 列名, COUNT(*) FROM 表名 GROUP BY 列名;
```

## 连接查询

### 内连接
```sql
SELECT 表1.列名, 表2.列名
FROM 表1
JOIN 表2 ON 表1.列名 = 表2.列名;
```

### 左连接
```sql
SELECT 表1.列名, 表2.列名
FROM 表1
LEFT JOIN 表2 ON 表1.列名 = 表2.列名;
```

### 右连接
```sql
SELECT 表1.列名, 表2.列名
FROM 表1
RIGHT JOIN 表2 ON 表1.列名 = 表2.列名;
```

## 子查询

### 嵌套查询
```sql
SELECT * FROM 表名 WHERE 列名 = (SELECT 列名 FROM 表名 WHERE 条件);
```

### EXISTS 子查询
```sql
SELECT * FROM 表名 WHERE EXISTS (子查询);
```

## 数据库备份与恢复

### 备份数据库
在命令行：
```bash
mysqldump -u 用户名 -p 数据库名 > 备份文件.sql
```

### 恢复数据库
在命令行：
```bash
mysql -u 用户名 -p 数据库名 < 备份文件.sql
```

## 常用约束

- 主键：`PRIMARY KEY`
- 外键：`FOREIGN KEY`
- 非空：`NOT NULL`
- 唯一：`UNIQUE`
- 默认值：`DEFAULT`
- 自动增长：`AUTO_INCREMENT`
