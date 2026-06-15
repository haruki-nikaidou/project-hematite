---
title: 可逆矩陣（Invertible Matrix）
summary: "將可逆矩陣定義為線性變換可以被撤銷者，透過高斯-喬登消去法刻畫可逆性，並說明如何透過擴增單位矩陣來計算逆矩陣。"
prerequisites: 
  - basis/math/linear_algebra/linear_map
  - basis/math/linear_algebra/gauss_jordan_elimination
aliases: []
tags: ["線性代數"]
updated: 2026-05-19
---

矩陣 $A$ 所編碼的線性映射 $T_A$ 將每個向量 $x$ 變換為 $Ax$。你總能回到原來嗎？**可逆矩陣**正是那些答案為「是」的矩陣——這個變換可以被完美地撤銷。

## 定義

設 $A$ 是體 $F$ 上的 $n \times n$ 方陣。若存在 $n \times n$ 矩陣 $B$ 使得

$$
AB = I_n \qquad \text{且} \qquad BA = I_n, \tag{1}
$$

則稱 $A$ 是**可逆的（invertible）**（又稱*非奇異（non-singular）*），其中 $I_n$ 是 $n \times n$ 單位矩陣。矩陣 $B$ 稱為 $A$ 的**逆矩陣（inverse）**，記作 $A^{-1}$。

不可逆的矩陣稱為**奇異矩陣（singular matrix）**。

只有方陣才能是可逆的：$m \ne n$ 的非方形 $m \times n$ 矩陣表示不同維度空間之間的映射，不可能有同型的雙側逆矩陣。

## 逆矩陣的唯一性

假設 $B$ 和 $C$ 都滿足 (1)，則：

$$
B = B I_n = B(AC) = (BA)C = I_n C = C.
$$

所以 $B = C$——每個可逆矩陣恰好有一個逆矩陣。記號 $A^{-1}$ 是無歧義的。

## 可逆性與線性映射

根據[線性映射與矩陣乘法](../linear_map/)，你知道 $n \times n$ 矩陣 $A$ 表示線性映射 $T_A: F^n \to F^n$。條件 $AB = BA = I_n$ 說明 $T_B$ 既是 $T_A$ 作為函式的左逆也是右逆。因此：

> $A$ 可逆當且唯當 $T_A: F^n \to F^n$ 是雙射。

當 $T_A$ 是雙射時，其逆函式 $T_A^{-1}$ 也是線性的，且其矩陣就是 $A^{-1}$。

## 透過高斯-喬登消去法刻畫可逆性

根據[高斯-喬登消去法](../gauss_jordan_elimination/)，你知道對矩陣進行列化簡要麼產生 $n$ 個樞軸行（每行一個），要麼至少留下一個自由行。對於 $n \times n$ 方陣，這兩種結果互斥且窮盡——沒有中間情況。這給出了完整的刻畫：

體 $F$ 上 $n \times n$ 矩陣 $A$ 的以下命題等價：

1. $A$ 是可逆的。
2. $A$ 的 RREF 是 $I_n$。
3. $A$ 有 $n$ 個樞軸行。
4. $Ax = \mathbf{0}$ 的唯一解是 $x = \mathbf{0}$。
5. 對每個 $b \in F^n$，方程組 $Ax = b$ 恰好有一個解。
6. $A$ 的各直行線性獨立。

**奇異矩陣範例。** 對 $B = \begin{pmatrix} 1 & 2 \\ 2 & 4 \end{pmatrix}$：施行 $R_2 \leftarrow R_2 - 2R_1$ 得 $\begin{pmatrix} 1 & 2 \\ 0 & 0 \end{pmatrix}$。第二行沒有樞軸，故 $B$ 是奇異的。映射 $T_B$ 將整個平面壓縮到一條直線上——你無法回去。

## 用高斯-喬登消去法計算逆矩陣

若 $A$ 可逆，可以透過將 $A$ 與單位矩陣拼接後對整個擴增矩陣進行列化簡來計算 $A^{-1}$：

$$
[A \mid I_n] \xrightarrow{\text{RREF}} [I_n \mid A^{-1}]. \tag{2}
$$

**原理。** 每個基本列運算都是左乘一個可逆的基本矩陣。若將 $A$ 化為 $I_n$ 的那些運算對應於左乘 $E$，則 $EA = I_n$，故 $E = A^{-1}$。對 $I_n$ 施行相同運算，得 $E I_n = E = A^{-1}$。

若列化簡在左側出現零列，則 $A$ 是奇異的，沒有逆矩陣。

**範例。** 計算 $A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}$ 的逆矩陣 $A^{-1}$：

$$
\left(\begin{array}{cc|cc} 1 & 2 & 1 & 0 \\ 3 & 4 & 0 & 1 \end{array}\right)
\xrightarrow{R_2 \leftarrow R_2 - 3R_1}
\left(\begin{array}{cc|cc} 1 & 2 & 1 & 0 \\ 0 & -2 & -3 & 1 \end{array}\right)
$$

$$
\xrightarrow{R_2 \leftarrow -\frac{1}{2}R_2}
\left(\begin{array}{cc|cc} 1 & 2 & 1 & 0 \\ 0 & 1 & \tfrac{3}{2} & -\tfrac{1}{2} \end{array}\right)
\xrightarrow{R_1 \leftarrow R_1 - 2R_2}
\left(\begin{array}{cc|cc} 1 & 0 & -2 & 1 \\ 0 & 1 & \tfrac{3}{2} & -\tfrac{1}{2} \end{array}\right)
$$

故 $A^{-1} = \begin{pmatrix} -2 & 1 \\ \tfrac{3}{2} & -\tfrac{1}{2} \end{pmatrix}$。驗證：$AA^{-1} = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}\begin{pmatrix} -2 & 1 \\ \tfrac{3}{2} & -\tfrac{1}{2} \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$。

### 2×2 的捷徑

對於 $\mathbb{R}$ 上的 $A = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$，公式化簡為：

$$
A^{-1} = \frac{1}{ad - bc}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}, \tag{3}
$$

前提是 $ad - bc \ne 0$。量值 $ad - bc$ 正是**行列式** $\det(A)$；它非零恰好等價於 $A$ 可逆。對於 $3 \times 3$ 及更大的矩陣，高斯-喬登法是系統性的做法（完整論述見[行列式](../determinant/)）。

## 逆矩陣的性質

以下等式均直接由定義 $AA^{-1} = A^{-1}A = I_n$ 推出：

| 等式 | 說明 |
|---|---|
| $(A^{-1})^{-1} = A$ | $A$ 是 $A^{-1}$ 的逆 |
| $(AB)^{-1} = B^{-1}A^{-1}$ | 撤銷合成需要反序 |
| $(A^T)^{-1} = (A^{-1})^T$ | 轉置與取逆可交換 |
| $(cA)^{-1} = c^{-1}A^{-1}$（$c \ne 0$） | 縮放以倒數取逆 |

乘積規則 $(AB)^{-1} = B^{-1}A^{-1}$ 映射了日常的可逆性：先穿襪子再穿鞋，撤銷時需先脫鞋再脫襪子。

## 摘要

- $n \times n$ 矩陣 $A$ **可逆**，如果存在 $B$ 使得 $AB = BA = I_n$；此 $B$ 是唯一的，記作 $A^{-1}$。
- 可逆性等價於：$A$ 的 RREF 是 $I_n$；$A$ 有 $n$ 個樞軸行；$Ax = \mathbf{0}$ 只有平凡解；$Ax = b$ 對每個 $b$ 都有唯一解。
- 用高斯-喬登消去法計算 $A^{-1}$：對 $[A \mid I_n]$ 列化簡至 $[I_n \mid A^{-1}]$。
- 關鍵等式：$(A^{-1})^{-1} = A$，$(AB)^{-1} = B^{-1}A^{-1}$，$(A^T)^{-1} = (A^{-1})^T$。
- 對 $2 \times 2$ 矩陣：當 $\det(A) = ad - bc \ne 0$ 時，$A^{-1} = \frac{1}{\det(A)}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$。
