---
title: 一般線性群（General Linear Group）
summary: "說明可逆 n×n 矩陣在乘法下構成群，介紹 GL(n, F) 及其無座標版本 GL(V)，並探索包含特殊線性群 SL(n, F) 在內的重要子結構。"
prerequisites: 
  - basis/math/linear_algebra/invertiable_matrix
  - basis/math/linear_algebra/linear_map
  - basis/math/linear_algebra/dimension
  - basis/math/abstract_algebra/group
aliases: []
tags: ["線性代數", "抽象代數"]
updated: 2026-05-19
---

你現在已知道什麼是可逆矩陣，也知道如何運算它們。一個自然而然的後續問題是：所有可逆矩陣合在一起構成什麼結構？答案是一個[群（group）](../../abstract_algebra/group/)——**一般線性群（general linear group）**。它是所有可逆線性變換在代數上的歸宿，在數學中凡是對稱性與可逆性扮演角色的地方都會出現它。

## 可逆矩陣為何構成群

根據[可逆矩陣](../invertiable_matrix/)，你已掌握體 $F$ 上可逆 $n \times n$ 矩陣的四個關鍵事實：

1. 兩個可逆矩陣的乘積也是可逆的：$(AB)^{-1} = B^{-1}A^{-1}$。
2. 單位矩陣 $I_n$ 是可逆的。
3. 矩陣乘法滿足結合律。
4. 每個可逆矩陣 $A$ 都有逆矩陣 $A^{-1}$，而 $A^{-1}$ 本身也是可逆的。

這恰好就是群的四條公理——封閉性、單位元、結合律與逆元。因此，所有可逆 $n \times n$ 矩陣的集合構成一個群。

## 定義

> **定義。** **一般線性群** $\text{GL}(n, F)$ 是體 $F$ 上所有可逆 $n \times n$ 矩陣的集合，以矩陣乘法為群運算：
>
> $$\text{GL}(n, F) \coloneqq \{ A \in M_{n,n}(F) \mid A \text{ 可逆} \}.$$

我們來逐一驗證各群公理：

| 公理 | 驗證 |
|---|---|
| 封閉性 | $A, B$ 可逆 $\Rightarrow$ $(AB)^{-1} = B^{-1}A^{-1}$ 存在，故 $AB \in \text{GL}(n,F)$ |
| 結合律 | 矩陣乘法滿足結合律 |
| 單位元 | $I_n \cdot I_n = I_n$，故 $I_n \in \text{GL}(n, F)$ |
| 逆元 | 對每個 $A \in \text{GL}(n,F)$，矩陣 $A^{-1}$ 存在且同屬 $\text{GL}(n,F)$ |

## 當 $n \geq 2$ 時非阿貝爾

與整數的加法群不同，$\text{GL}(n, F)$ 在 $n \geq 2$ 時**不是阿貝爾（abelian）群**：矩陣乘法一般不滿足交換律。一個 $\mathbb{R}$ 上的具體反例：

$$
A = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}, \qquad B = \begin{pmatrix} 1 & 0 \\ 1 & 1 \end{pmatrix}.
$$

$$
AB = \begin{pmatrix} 2 & 1 \\ 1 & 1 \end{pmatrix}, \qquad BA = \begin{pmatrix} 1 & 1 \\ 1 & 2 \end{pmatrix}.
$$

由於 $AB \ne BA$，這個群是非阿貝爾的。這種不可交換性反映了一個事實：以不同順序施加兩個變換，通常會得到不同的結果。

唯一的例外是 $n = 1$：$\text{GL}(1, F) = \{(c) \mid c \ne 0\} \cong F^\times$，即 $F$ 中非零純量的乘法群，它是阿貝爾的。

## 無座標版本：GL(V)

$\text{GL}(n, F)$ 的定義依賴於為 $F^n$ 選取一組基底（座標）。存在一個與基底無關的版本。給定體 $F$ 上任意有限維向量空間 $V$，定義

$$
\text{GL}(V) \coloneqq \{ T: V \to V \mid T \text{ 是雙射線性映射} \},
$$

以函式合成為群運算。從 $V$ 到自身的雙射線性映射稱為 $V$ 的**線性自同構（linear automorphism）**。

一旦固定 $V$ 的一組基底，每個線性自同構就由一個可逆矩陣表示，從而給出群同構

$$
\text{GL}(V) \cong \text{GL}(n, F), \qquad n = \dim V.
$$

不同的基底給出不同的同構，但它們在結構上都是等價的。因此，$\text{GL}(n, F)$ 是 $V$ 的抽象對稱群的具體、有座標的描述：它捕捉了所有在保持線性結構的前提下雙射重排 $V$ 的方式。

## 特殊情形

**$\text{GL}(n, \mathbb{R})$**：可逆實數矩陣的群。幾何上，其元素是 $\mathbb{R}^n$ 的可逆線性變換——那些「體積非零」且不將 $\mathbb{R}^n$ 壓縮到低維子空間的變換。

**$\text{GL}(n, \mathbb{C})$**：複數的類比。由於 $\mathbb{C}$ 是代數封閉體，這個群的結構比實數情形更豐富，在表示論中居核心地位。

**$\text{GL}(n, \mathbb{F}_q)$**（$q$ 元有限體上）：$\text{GL}(n, \mathbb{F}_q)$ 是一個*有限*群。計算可逆矩陣的個數等同於計算 $\mathbb{F}_q^n$ 的有序基底個數：

$$
|\text{GL}(n, \mathbb{F}_q)| = \prod_{k=0}^{n-1}(q^n - q^k). \tag{1}
$$

因子 $(q^n - q^k)$ 計算第 $(k+1)$ 個直行的選擇數：它必須在前 $k$ 個直行的張成之外（前 $k$ 個直行張成一個大小為 $q^k$ 的 $k$ 維子空間）。

## 一個重要子群：SL(n, F)

$\text{GL}(n, F)$ 內部有一個重要的子群。**特殊線性群（special linear group）**為

$$
\text{SL}(n, F) \coloneqq \{ A \in \text{GL}(n, F) \mid \det(A) = 1 \}.
$$

它是子群，因為行列式具有乘積性——$\det(AB) = \det(A)\det(B)$——且 $\det(I_n) = 1$、$\det(A^{-1}) = \det(A)^{-1}$。因此 $\text{SL}(n, F)$ 在乘法和取逆下封閉，且包含單位元。

在 $\mathbb{R}$ 上：$\text{SL}(n, \mathbb{R})$ 中的矩陣恰好是那些保持帶號 $n$ 維體積的可逆變換。$\mathbb{R}^2$ 和 $\mathbb{R}^3$ 中的旋轉就是例子：它們保持定向和體積，因此 $\det = 1$。

整個群 $\text{GL}(n, F)$ 允許任意非零行列式；$\text{SL}(n, F)$ 是其中「保體積」的部分。

## 摘要

- **一般線性群** $\text{GL}(n, F)$ 是體 $F$ 上所有可逆 $n \times n$ 矩陣在矩陣乘法下構成的群。
- 四條群公理均成立：封閉性來自 $(AB)^{-1} = B^{-1}A^{-1}$；單位元為 $I_n$；矩陣乘法的結合律；逆元為矩陣的逆。
- $\text{GL}(n, F)$ 在 $n \geq 2$ 時**非阿貝爾**；當 $n = 1$ 時退化為乘法群 $F^\times$。
- 無座標版本 $\text{GL}(V)$ 是 $V$ 的線性自同構群；選取基底後有 $\text{GL}(V) \cong \text{GL}(\dim V, F)$。
- 當 $F$ 是 $q$ 元有限體時，$|\text{GL}(n, \mathbb{F}_q)| = \prod_{k=0}^{n-1}(q^n - q^k)$。
- **特殊線性群** $\text{SL}(n, F) = \{A \in \text{GL}(n,F) \mid \det(A) = 1\}$ 是 $\text{GL}(n,F)$ 的子群，由保體積的變換組成。
