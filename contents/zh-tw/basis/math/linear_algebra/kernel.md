---
title: 核（Kernel）
summary: "定義線性映射的核為所有被映射到零的輸入向量的集合，證明它是子空間，將其與單射性及齊次線性方程組相聯繫，並以其維度引入零化度的概念。"
prerequisites: 
  - basis/math/linear_algebra/linear_map
  - basis/math/linear_algebra/linear_subspace
aliases: []
tags: ["線性代數"]
updated: 2026-05-17
---

當線性映射將一個向量送往零時，它實際上是在「抹除」它——將其壓縮為虛無。核（kernel）收集所有這類向量，精確揭示映射「摧毀」了多少「資訊」。理解核能告訴你映射是否可逆，並給出線性方程組解集的結構。

## 定義

對於線性映射 $T: V \to W$，$T$ 的**核（kernel）**（又稱**零空間（null space）**）是 $T$ 送往零的所有輸入的集合：

$$\ker(T) \coloneqq \{v \in V : T(v) = \mathbf{0}_W\}.$$

核存在於**定義域** $V$ 中。它始終非空，因為由線性性知 $T(\mathbf{0}_V) = \mathbf{0}_W$，所以 $\mathbf{0}_V \in \ker(T)$ 在任何情況下都成立。

## 核是子空間

**命題**：$\ker(T)$ 是 $V$ 的一個[線性子空間](../linear_subspace/)。

**證明**：我們已知 $\mathbf{0}_V \in \ker(T)$，故 $\ker(T)$ 非空。任取 $u, v \in \ker(T)$ 及 $c, d \in F$，由 $T$ 的線性性：

$$T(cu + dv) = c\,T(u) + d\,T(v) = c \cdot \mathbf{0}_W + d \cdot \mathbf{0}_W = \mathbf{0}_W.$$

故 $cu + dv \in \ker(T)$。由子空間判定准則，$\ker(T)$ 是子空間。$\square$

## 矩陣的核

對於矩陣 $A \in M_{m,n}(F)$，對應的線性映射是 $T_A(x) = Ax$（如[線性映射](../linear_map/)中所定義）。其核為

$$\ker(A) \coloneqq \{x \in F^n : Ax = \mathbf{0}\},$$

這正是[線性方程式](../linear_equations/)中介紹的齊次方程組 $Ax = \mathbf{0}$ 的解集。

## 計算核

要求 $\ker(A)$，對 $A$ 本身施行[高斯-喬登消去法](../gauss_jordan_elimination/)（而非擴增矩陣——因為右端為 $\mathbf{0}$，消去過程中始終保持為 $\mathbf{0}$）。在 $A$ 的 RREF 中：

- 對應**樞軸行（pivot columns）**的變數是基本變數；用自由變數表示它們。
- 對應**自由行（free columns）**的變數是自由變數；各賦一個參數（$t_1, t_2, \ldots$）。

將一般解寫成向量的線性組合（每個自由變數對應一個向量）。這些向量構成 $\ker(A)$ 的一組**基底**。

### 計算範例

求

$$A = \begin{pmatrix} 1 & 2 & 3 \\ 2 & 4 & 6 \end{pmatrix}$$

的 $\ker(A)$。

施行高斯-喬登消去法：$R_2 \leftarrow R_2 - 2R_1$ 得

$$\begin{pmatrix} 1 & 2 & 3 \\ 0 & 0 & 0 \end{pmatrix}.$$

這已是 RREF。第 1 行是唯一的樞軸行；第 2 和第 3 行是自由行。令 $x_2 = s$，$x_3 = t$ 為自由變數，則 $x_1 = -2s - 3t$。一般解為：

$$x = s \begin{pmatrix} -2 \\ 1 \\ 0 \end{pmatrix} + t \begin{pmatrix} -3 \\ 0 \\ 1 \end{pmatrix}, \qquad s, t \in F.$$

故 $\ker(A) = \text{span}\!\left\{ (-2, 1, 0)^\top,\, (-3, 0, 1)^\top \right\}$，是 $F^3$ 的一個二維子空間。

## 單射性

核精確刻畫 $T$ 何時不是單射（一對一）的。

**定理**：$T: V \to W$ 是單射的 $\iff$ $\ker(T) = \{\mathbf{0}_V\}$。

**證明**：（$\Rightarrow$）若 $T$ 是單射且 $T(v) = \mathbf{0}_W = T(\mathbf{0}_V)$，則 $v = \mathbf{0}_V$。（$\Leftarrow$）設 $\ker(T) = \{\mathbf{0}_V\}$ 且 $T(u) = T(v)$，則 $T(u - v) = T(u) - T(v) = \mathbf{0}_W$，故 $u - v \in \ker(T) = \{\mathbf{0}_V\}$，即 $u = v$。$\square$

直觀上：映射是單射的，當且唯當沒有任何東西「在零點碰撞」（或在任何地方碰撞）。若核比 $\{\mathbf{0}_V\}$ 更大，則多個不同的輸入落在同一個輸出上，$T$ 便無法被反轉。

對於 $A \in M_{n,n}(F)$（方陣），單射性等價於齊次方程組 $Ax = \mathbf{0}$ 只有平凡解——即 $A$ 的 RREF 中每一直行都是樞軸行。

## 零化度

$T$ 的**零化度（nullity）**是其核的維度：

$$\text{nullity}(T) \coloneqq \dim(\ker(T)).$$

在上面的範例中，$\text{nullity}(A) = 2$。零化度計算核中有多少個「自由度維度」——有多少個線性獨立的方向被 $T$ 壓縮到零。

零化度與 $T$ 的**秩**（像的維度）之間的關係，在[秩-零化度定理](../rank_nullity_theorem/)中有精確的闡述。

## 摘要

- $T: V \to W$ 的**核**是 $\ker(T) = \{v \in V : T(v) = \mathbf{0}_W\}$，始終是 $V$ 的子空間。
- 對於矩陣 $A$，核是齊次方程組 $Ax = \mathbf{0}$ 的解集。
- **計算 $\ker(A)$**：將 $A$ 化為 RREF，對自由變數賦予參數，將解寫成基底向量的線性組合。
- $T$ 是**單射**當且唯當 $\ker(T) = \{\mathbf{0}_V\}$。
- **零化度**是 $\dim(\ker(T))$；它計算被壓縮到零的維度個數。
