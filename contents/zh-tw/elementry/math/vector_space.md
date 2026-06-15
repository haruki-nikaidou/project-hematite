---
title: 有限維向量空間
summary: "向量空間的介紹——圍繞加法和縮放建立的代數結構——重點在有限維空間、基底和維度。"
prerequisites: 
  - elementry/math/linear
aliases: []
tags: ["線性代數"]
updated: 2026-05-08
---

電腦圖形學、機器學習和物理模擬背後的大多數數學都發生在**向量空間（vector space）**中。在你能處理矩陣、變換或梯度之前，你需要理解它們表演的舞台。那個舞台就是向量空間。

## 向量：超越箭頭

你可能見過向量被畫成箭頭。那幅圖對直覺很有幫助，但真正的概念更為普遍。**向量（vector）**是任何你可以與另一個向量相加，並可以用一個數縮放的物件——只要這兩個操作服從一個特定的規則清單。所有這樣的向量的集合叫做**向量空間**。

在這個定義下，平面上的箭頭是向量。有序的數字清單也是。在更進階的情境中，甚至函式和多項式也可以是向量。把它們全部聯繫在一起的是同一份簡短的規則清單。

## 正式定義

實數 $\mathbb{R}$ 上的**向量空間**是一個配備兩個操作的集合 $V$：

- **向量加法（vector addition）**：對任何 $\mathbf{u}, \mathbf{v} \in V$，它們的和 $\mathbf{u} + \mathbf{v} \in V$。
- **純量乘法（scalar multiplication）**：對任何 $c \in \mathbb{R}$ 和 $\mathbf{v} \in V$，積 $c\mathbf{v} \in V$。

對所有 $\mathbf{u}, \mathbf{v}, \mathbf{w} \in V$ 和 $a, b \in \mathbb{R}$，這些操作必須滿足八條公理：

| # | 名稱 | 規則 |
|---|------|------|
| 1 | 加法結合律 | $(\mathbf{u} + \mathbf{v}) + \mathbf{w} = \mathbf{u} + (\mathbf{v} + \mathbf{w})$ |
| 2 | 加法交換律 | $\mathbf{u} + \mathbf{v} = \mathbf{v} + \mathbf{u}$ |
| 3 | 加法單位元 | 存在 $\mathbf{0} \in V$ 使得 $\mathbf{v} + \mathbf{0} = \mathbf{v}$ |
| 4 | 加法反元素 | 存在 $-\mathbf{v} \in V$ 使得 $\mathbf{v} + (-\mathbf{v}) = \mathbf{0}$ |
| 5 | 純量乘法單位元 | $1 \cdot \mathbf{v} = \mathbf{v}$ |
| 6 | 純量乘法結合律 | $a(b\mathbf{v}) = (ab)\mathbf{v}$ |
| 7 | 對向量加法的分配律 | $a(\mathbf{u} + \mathbf{v}) = a\mathbf{u} + a\mathbf{v}$ |
| 8 | 對純量加法的分配律 | $(a + b)\mathbf{v} = a\mathbf{v} + b\mathbf{v}$ |

這裡的每條規則都是你對普通數字已經理所當然的東西。明確地列出它們的意義在於，它們是你*唯一*需要的東西——一旦你確認這八條對任何集合及其操作成立，線性代數的所有機制就跟著一起來了。

## 典型例子：$\mathbb{R}^n$

對初學者最重要的向量空間是 $\mathbb{R}^n$——所有 $n$ 個實數的有序 $n$ 元組的集合：

$$
\mathbf{v} = (v_1,\ v_2,\ \ldots,\ v_n), \quad v_i \in \mathbb{R}
$$

加法和純量乘法逐分量定義：

$$
\mathbf{u} + \mathbf{v} \coloneqq (u_1 + v_1,\ u_2 + v_2,\ \ldots,\ u_n + v_n)
$$

$$
c\mathbf{v} \coloneqq (cv_1,\ cv_2,\ \ldots,\ cv_n)
$$

零向量是 $\mathbf{0} = (0, 0, \ldots, 0)$，$\mathbf{v}$ 的加法反元素是 $-\mathbf{v} = (-v_1, \ldots, -v_n)$。對這些定義驗證全部八條公理是一個很好的練習，讓抽象的規則變得具體。

當 $n = 2$ 時你得到熟悉的 2D 平面；當 $n = 3$ 時，是普通的 3D 空間。定義中沒有任何東西阻止你取更高的值。

## 張成、基底和維度

### 張成

給定向量空間 $V$ 中一組向量 $\{\mathbf{v}_1, \ldots, \mathbf{v}_k\}$，它們的**張成（span）**是你能從它們形成的所有[線性組合](../linear/)的集合：

$$
\operatorname{span}\{\mathbf{v}_1, \ldots, \mathbf{v}_k\}
\coloneqq \{\, c_1\mathbf{v}_1 + \cdots + c_k\mathbf{v}_k \mid c_1, \ldots, c_k \in \mathbb{R} \,\}
$$

如果張成等於整個 $V$，那麼 $\{\mathbf{v}_1, \ldots, \mathbf{v}_k\}$ **張成** $V$——空間中的每個向量都可以從這些向量建立。

### 線性獨立

一組向量是**線性獨立（linearly independent）**的，如果其中沒有一個可以寫成其他的線性組合。等價地，方程式

$$
c_1\mathbf{v}_1 + c_2\mathbf{v}_2 + \cdots + c_k\mathbf{v}_k = \mathbf{0}
$$

的唯一解是 $c_1 = c_2 = \cdots = c_k = 0$。如果任何 $c_i$ 可以不為零，這組向量就是**線性相依（linearly dependent）**的——它包含了冗餘。

### 基底和維度

$V$ 的**基底（basis）**是一組既線性獨立*又*張成 $V$ 的向量。把它想成能精確地組裝出 $V$ 中每個向量恰好一次的最小集合。

一個驚人的事實：一個給定向量空間的每個基底都有完全相同數量的向量。那個數量叫做 $V$ 的**維度（dimension）**，記作 $\dim(V)$。

對於 $\mathbb{R}^n$，**標準基底（standard basis）**是：

$$
\mathbf{e}_1 = (1, 0, \ldots, 0),\quad
\mathbf{e}_2 = (0, 1, \ldots, 0),\quad \ldots,\quad
\mathbf{e}_n = (0, 0, \ldots, 1)
$$

這個基底包含 $n$ 個向量，所以 $\dim(\mathbb{R}^n) = n$。任何向量 $(v_1, \ldots, v_n)$ 分解為：

$$
\mathbf{v} = v_1\mathbf{e}_1 + v_2\mathbf{e}_2 + \cdots + v_n\mathbf{e}_n
$$

座標 $v_1, \ldots, v_n$ 正好是 $\mathbf{v}$ 在標準基底中的係數。

### 有限維

一個向量空間是**有限維的（finite-dimensional）**，如果它有一個有限的基底——等價地，如果 $\dim(V) < \infty$。具體的 $n$ 值下的所有 $\mathbb{R}^n$ 都是有限維的。函式空間通常是無限維的，但那些留待以後。

## 子空間

$V$ 的**子空間（subspace）**是一個本身在相同操作下也是向量空間的非空子集 $W \subseteq V$。你不需要重新驗證所有八條公理——你只需要三條：

1. $\mathbf{0} \in W$
2. 對所有 $\mathbf{u}, \mathbf{v} \in W$，$\mathbf{u} + \mathbf{v} \in W$（在加法下封閉）
3. 對所有 $c \in \mathbb{R}$，$\mathbf{v} \in W$，$c\mathbf{v} \in W$（在純量乘法下封閉）

其餘公理自動從 $V$ 繼承。

$\mathbb{R}^3$ 中的一些例子：原點 $\{\mathbf{0}\}$（維度 0）、任何過原點的直線（維度 1）、任何過原點的平面（維度 2）和 $\mathbb{R}^3$ 本身（維度 3）都是子空間。注意「過原點」的要求——不過原點的平面不包含 $\mathbf{0}$，不滿足條件 1。

## 摘要

- $\mathbb{R}$ 上的**向量空間**是一個帶有加法和純量乘法且滿足八條公理的集合。
- $\mathbb{R}^n$——帶有逐分量操作的有序 $n$ 元組——是典型的例子；$\dim(\mathbb{R}^n) = n$。
- 一個集合的**張成（span）**是你能從它形成的所有線性組合。
- 一個集合是**線性獨立的**，如果其中沒有向量是其他向量的線性組合。
- **基底（basis）**是一個線性獨立的張成集合；$V$ 的所有基底都有相同的大小，稱為**維度（dimension）**。
- **子空間（subspace）**是一個在加法、純量乘法下封閉且包含 $\mathbf{0}$ 的子集。
- **有限維**意味著空間有一個有限的基底。
