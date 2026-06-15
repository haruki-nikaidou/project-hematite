---
title: 秩-零化度定理（Rank-Nullity Theorem）
summary: "證明秩-零化度定理——線性映射的定義域維度等於其秩與零化度之和——並推導出對方陣及可逆性的各項推論。"
prerequisites: 
  - basis/math/linear_algebra/kernel
  - basis/math/linear_algebra/image
aliases: []
tags: ["線性代數"]
updated: 2026-05-17
---

秩-零化度定理是一條維度的守恆定律。當線性映射作用於向量空間時，沒有任何維度會無故消失：它們要麼在像中留存，要麼被核所吸收。這個定理使上述直觀精確化，並立即解釋了為何對方形線性映射而言，單射性和滿射性是等價的。

## 定理陳述

**秩-零化度定理**：設 $V$ 是體 $F$ 上的有限維向量空間，$T: V \to W$ 是線性映射，則

$$
\dim (V) = \operatorname{rank} (T) + \operatorname{nullity} (T). \tag{1}
$$

用文字表述：定義域的維度等於像的維度加上核的維度。

## 證明

設 $k = \text{nullity}(T) = \dim(\ker(T))$，選取 $\ker(T)$ 的一組基底 $\{u_1, \ldots, u_k\}$。

**步驟 1：將基底擴充為 $V$ 的基底。** 由於 $\ker(T)$ 是有限維空間 $V$ 的子空間，可以將 $\{u_1, \ldots, u_k\}$ 擴充為 $V$ 的完整基底。將多出來的向量記為 $v_1, \ldots, v_r$，從而

$$\mathcal{B} = \{u_1, \ldots, u_k, v_1, \ldots, v_r\}$$

是 $V$ 的基底。則 $\dim(V) = k + r$。

**步驟 2：$\{T(v_1), \ldots, T(v_r)\}$ 張成 $\text{im}(T)$。** 任取 $w \in \text{im}(T)$，寫 $w = T(x)$（$x \in V$）。將 $x$ 用基底 $\mathcal{B}$ 展開：

$$x = \sum_{i=1}^k c_i\, u_i + \sum_{j=1}^r d_j\, v_j.$$

對 $T$ 施行並利用線性性。由於每個 $u_i \in \ker(T)$，故 $T(u_i) = \mathbf{0}$：

$$w = T(x) = \sum_{i=1}^k c_i\, T(u_i) + \sum_{j=1}^r d_j\, T(v_j) = \sum_{j=1}^r d_j\, T(v_j).$$

故 $w$ 是 $T(v_1), \ldots, T(v_r)$ 的線性組合，確認它們張成 $\text{im}(T)$。

**步驟 3：$\{T(v_1), \ldots, T(v_r)\}$ 線性獨立。** 設 $\sum_{j=1}^r d_j\, T(v_j) = \mathbf{0}$，由線性性知 $T\!\left(\sum_{j=1}^r d_j\, v_j\right) = \mathbf{0}$，故 $\sum_{j} d_j\, v_j \in \ker(T)$。因此這個向量是 $\ker(T)$ 的基底的線性組合：

$$\sum_{j=1}^r d_j\, v_j = \sum_{i=1}^k e_i\, u_i$$

對某些純量 $e_i$ 成立。整理：$\sum_{j} d_j\, v_j - \sum_{i} e_i\, u_i = \mathbf{0}$。由於 $\mathcal{B}$ 是 $V$ 的基底，所有係數均為零——特別地 $d_1 = \cdots = d_r = 0$。

**步驟 4：結論。** $\{T(v_1), \ldots, T(v_r)\}$ 是 $\text{im}(T)$ 的基底，故 $\text{rank}(T) = r$。因此：

$$\dim(V) = k + r = \text{nullity}(T) + \text{rank}(T). \qquad \square$$

## 幾何詮釋

非正式地說，$V$ 分成兩個部分：$k$ 維的核（$T$ 將其完全壓縮為零）和 $r$ 維的補（$T$ 將其同構地映射到 $\text{im}(T)$）。總維度守恆：$k + r = \dim(V)$。維度既不被創造，也不被消滅——它們只是被重新導向。

## 對方陣的推論

現設 $T: F^n \to F^n$ 是矩陣 $A \in M_{n,n}(F)$（**方陣**）所對應的線性映射。代入 (1)：

$$n = \text{rank}(T) + \text{nullity}(T).$$

定義域和陪域的維度相同，均為 $n$，核和像的維度之和恰好等於 $n$。這個嚴格的「預算」產生如下等價性：

**定理**：對於 $T: F^n \to F^n$（等價地，對 $n \times n$ 矩陣 $A$），以下命題等價：

1. $T$ 是**單射（injective）**的（$\ker(T) = \{\mathbf{0}\}$，即 $\text{nullity}(T) = 0$）。
2. $T$ 是**滿射（surjective）**的（$\text{im}(T) = F^n$，即 $\text{rank}(T) = n$）。
3. $T$ 是**雙射（bijective）**的（因而有逆映射 $T^{-1}$）。
4. $\text{rank}(A) = n$（$A$ 的所有 $n$ 個直行——等價地，所有 $n$ 個橫列——線性獨立）。

原因：若零化度為 $0$，則秩必為 $n$（由 (1)），故 $T$ 同時是單射和滿射的。秩等於 $n$ 而零化度不為 $0$ 是不可能的，反之亦然——兩個量共享固定的 $n$ 維「預算」。

這是一個純粹的維度計算現象：在無限維空間中，單射性和滿射性可以各自失敗；但在有限維空間中，對方形映射而言，它們是不可分割的。

## 具體範例

設 $A$ 是 $4 \times 6$ 矩陣，$\text{rank}(A) = 3$。定義域是 $F^6$，故 $\dim = 6$。由 (1)：

$$\text{nullity}(A) = 6 - \text{rank}(A) = 6 - 3 = 3.$$

核是三維的：在 $F^6$ 中有三個線性獨立的向量被 $A$ 映射到零。像是 $F^4$ 內的三維子空間——$A$ 不可能是滿射的（因為 $3 < 4$）。

## 摘要

- **秩-零化度定理**：對任意以有限維空間 $V$ 為定義域的線性映射 $T: V \to W$，有 $\dim(V) = \text{rank}(T) + \text{nullity}(T)$。
- **證明思路**：將 $\ker(T)$ 的基底擴充為 $V$ 的基底；多出來的向量映射為 $\text{im}(T)$ 的基底。
- **幾何詮釋**：定義域在核（維度被壓縮為零）與其補（維度同構地映射到像）之間劃分。
- **對方形映射** $T: F^n \to F^n$：單射性、滿射性和雙射性（可逆性）等價——它們同時耗盡相同的 $n$ 維預算。
