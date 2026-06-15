---
title: 像與秩（Image & Rank）
summary: "定義線性映射的像為所有可達輸出向量的集合，證明它是陪域的子空間，將其與矩陣的行空間等同，並以其維度引入秩的概念。"
prerequisites: 
  - basis/math/linear_algebra/linear_map
  - basis/math/linear_algebra/linear_subspace
aliases: []
tags: ["線性代數"]
updated: 2026-05-17
---

核（kernel）捕捉線性映射「摧毀」了什麼——即被映射到零的輸入；而像（image）則捕捉它「創造」了什麼：映射可能產生的所有輸出的完整集合。知道像，就能知道哪些目標向量是可達的；而其維度，即秩，衡量映射實際填充了陪域多大的部分。

## 定義

對於線性映射 $T: V \to W$，$T$ 的**像（image）**（又稱**值域（range）**）是 $T$ 能產生的所有輸出的集合：

$$\text{im}(T) \coloneqq \{T(v) : v \in V\} = \{w \in W : \exists\, v \in V \text{ 使得 } T(v) = w\}.$$

像存在於**陪域** $W$ 中。向量 $w \in W$ 屬於 $\text{im}(T)$ 當且唯當方程式 $T(v) = w$ 在 $V$ 中至少有一個解 $v$。

## 像是子空間

**命題**：$\text{im}(T)$ 是 $W$ 的一個[線性子空間](../linear_subspace/)。

**證明**：由於 $T(\mathbf{0}_V) = \mathbf{0}_W$，故 $\mathbf{0}_W \in \text{im}(T)$。任取 $w_1, w_2 \in \text{im}(T)$ 及 $c, d \in F$，存在 $v_1, v_2 \in V$ 使得 $T(v_1) = w_1$，$T(v_2) = w_2$。由線性性，

$$c w_1 + d w_2 = c\,T(v_1) + d\,T(v_2) = T(cv_1 + dv_2) \in \text{im}(T).$$

故 $\text{im}(T)$ 在線性組合下封閉，從而是子空間。$\square$

## 行空間

對於矩陣 $A \in M_{m,n}(F)$，寫 $A = [a_1 \mid a_2 \mid \cdots \mid a_n]$，其中 $a_j \in F^m$ 是 $A$ 的各直行。對應映射 $T_A(x) = Ax$ 的像為

$$\text{im}(A) = \{Ax : x \in F^n\}.$$

每個乘積 $Ax$ 都是 $A$ 的各直行的線性組合：

$$Ax = x_1\,a_1 + x_2\,a_2 + \cdots + x_n\,a_n.$$

因此 $A$ 的像恰好是其直行的張成。$F^m$ 的這個子空間稱為 $A$ 的**行空間（column space）**，常記作 $\text{col}(A)$：

$$\text{col}(A) = \text{span}(a_1, a_2, \ldots, a_n).$$

向量 $b \in F^m$ 屬於 $\text{col}(A)$ 當且唯當方程組 $Ax = b$ 至少有一個解——這正是[線性方程式](../linear_equations/)中討論的相容性條件。

## 滿射性

映射 $T: V \to W$ 是**滿射（surjective）**的（映到），當且唯當 $\text{im}(T) = W$——$W$ 中每個向量都可達。對於矩陣 $A \in M_{m,n}(F)$，滿射性意味著行空間充滿整個 $F^m$，這恰好發生在 $A$ 的行最簡列矩陣（RREF）每一列都有一個樞軸（pivot）時。

## 秩

線性映射 $T$ 的**秩（rank）**是其像的維度：

$$\text{rank}(T) \coloneqq \dim(\text{im}(T)).$$

對於矩陣，$\text{rank}(A)$ 等於 $A$ 的 RREF 中的樞軸列數，也等於 $A$ 的線性獨立直行的個數。

一個重要定理（其證明使用 RREF 論證）指出，矩陣的秩既等於其**行空間**的維度，也等於其**列空間**（各列的張成）的維度。用符號表示：線性獨立直行的個數總是等於線性獨立橫列的個數。

## 計算像與秩

要求 $\text{im}(A)$ 和 $\text{rank}(A)$，對 $A$ 施行[高斯-喬登消去法](../gauss_jordan_elimination/)：

1. 將 $A$ 化為 RREF。
2. 計算樞軸的個數——此數即為 $\text{rank}(A)$。
3. $A$ 的**樞軸行**（原始矩陣 $A$ 中，位置對應 RREF 中樞軸位置的直行，在列化簡之前取用）構成 $\text{col}(A)$ 的一組基底。

**重要**：應使用**原始**矩陣 $A$ 的樞軸行，而非 RREF 中的，因為列運算會改變直行向量，但保留哪些直行是樞軸行這一資訊不變。

### 計算範例

設

$$A = \begin{pmatrix} 1 & 2 & 1 \\ 2 & 4 & 3 \\ 1 & 2 & 2 \end{pmatrix}.$$

施行高斯-喬登消去法。$R_2 \leftarrow R_2 - 2R_1$，$R_3 \leftarrow R_3 - R_1$：

$$\begin{pmatrix} 1 & 2 & 1 \\ 0 & 0 & 1 \\ 0 & 0 & 1 \end{pmatrix}.$$

$R_3 \leftarrow R_3 - R_2$：

$$\begin{pmatrix} 1 & 2 & 1 \\ 0 & 0 & 1 \\ 0 & 0 & 0 \end{pmatrix}.$$

$R_1 \leftarrow R_1 - R_2$（回代）：

$$\begin{pmatrix} 1 & 2 & 0 \\ 0 & 0 & 1 \\ 0 & 0 & 0 \end{pmatrix}.$$

這是 RREF。共有**2 個樞軸**（第 1 行和第 3 行），故 $\text{rank}(A) = 2$。**原始** $A$ 的第一行和第三行構成 $\text{col}(A)$ 的基底：

$$\text{col}(A) = \text{span}\!\left\{ \begin{pmatrix}1\\2\\1\end{pmatrix},\ \begin{pmatrix}1\\3\\2\end{pmatrix} \right\}.$$

## 摘要

- **像** $\text{im}(T) = \{T(v) : v \in V\}$ 始終是陪域 $W$ 的子空間。
- 對於矩陣 $A$，像等於**行空間** $\text{col}(A) = \text{span}(a_1, \ldots, a_n)$，且 $Ax = b$ 有解當且唯當 $b \in \text{col}(A)$。
- $T$ 是**滿射**當且唯當 $\text{im}(T) = W$（每個輸出均可達）。
- **秩** $\text{rank}(T) = \dim(\text{im}(T))$ 等於 $A$ 的 RREF 中的樞軸個數。
- **原始**矩陣的樞軸行構成行空間的基底。
- 秩等於行空間和列空間的維度。
