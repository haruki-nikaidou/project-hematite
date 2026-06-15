---
title: 勒貝格測度
summary: "勒貝格測度（Lebesgue measure）是由區間長度建構的外測度，限制到其卡拉泰奧多里可測集上。本章節在 ℝ 上建構勒貝格外測度，確定勒貝格 σ 代數，並計算基本例子——開集、閉集、零測集和平移不變性。"
prerequisites:
  - basis/math/measure/measurable_criterion
aliases: []
tags:
  - 測度論
updated: 2026-05-20
---

你現在已具備所有必要工具：[外測度](../outer_measure/)在 $\mathbb{R}$ 的每個子集上建構了大小函式 $\lambda^*$，而[卡拉泰奧多里準則](../measurable_criterion/)則篩選出 $\lambda^*$ 能成為真正的、可數可加的測度的那些集合。將它們結合，便得到**勒貝格測度（Lebesgue measure）**——$\mathbb{R}$ 上長度的典型概念。

## 勒貝格 σ 代數與勒貝格測度

**定義。** **勒貝格 σ 代數（Lebesgue σ-algebra）** $\mathcal{L}$ 是所有關於勒貝格外測度 $\lambda^*$ 滿足卡拉泰奧多里可測性的集合 $E \subseteq \mathbb{R}$ 所構成的集族：

$$
\mathcal{L} \;\coloneqq\; \{E \subseteq \mathbb{R} : \lambda^*(A) = \lambda^*(A \cap E) + \lambda^*(A \cap E^c) \text{ 對所有 } A \subseteq \mathbb{R}\}. \tag{1}
$$

**勒貝格測度**是限制

$$
\lambda \;\coloneqq\; \lambda^*\restriction_{\mathcal{L}} \colon \mathcal{L} \to [0, +\infty]. \tag{2}
$$

由[卡拉泰奧多里定理](../measurable_criterion/)，$\mathcal{L}$ 是 σ 代數，$\lambda$ 是 $\mathcal{L}$ 上的完備、可數可加的測度。

## 每個開集都是勒貝格可測的

第一步是驗證勒貝格測度確實捕捉了普通幾何——即每個開區間，從而每個開集，都屬於 $\mathcal{L}$。

**主張。** 每個開區間 $(a, b)$ 都屬於 $\mathcal{L}$。

*證明。* 需要證明對任意測試集 $A$，

$$
\lambda^*(A) \geq \lambda^*(A \cap (a,b)) + \lambda^*(A \cap (a,b)^c).
$$

固定 $A$ 的一個可數開區間覆蓋 $\{I_k\}$，使 $\sum_k |I_k| \leq \lambda^*(A) + \varepsilon$。對每個 $k$，將 $I_k$ 分成 $I_k \cap (a, b)$ 和 $I_k \setminus (a, b)$（後者至多為兩個區間）。這些分割分別給出 $A \cap (a, b)$ 和 $A \cap (a, b)^c$ 的覆蓋，其總長度之和等於 $|I_k|$。對 $k$ 求和：

$$
\lambda^*(A \cap (a,b)) + \lambda^*(A \cap (a,b)^c) \leq \sum_k |I_k| \leq \lambda^*(A) + \varepsilon.
$$

由於 $\varepsilon$ 是任意的，主張得證。

因為 $\mathbb{R}$ 中每個開集都是可數個不相交開區間的聯集（這是實分析中的一個事實），而 $\mathcal{L}$ 在可數聯集下封閉，故**每個開集都屬於 $\mathcal{L}$**。取補集，每個閉集也屬於 $\mathcal{L}$。

## Borel 集都是勒貝格可測的

由於 $\mathcal{L}$ 包含所有開集且是 σ 代數，它必然包含由開集生成的*最小* σ 代數——來自[σ 代數](../sigma_algebra/)的 Borel σ 代數 $\mathcal{B}(\mathbb{R})$：

$$
\mathcal{B}(\mathbb{R}) \;\subseteq\; \mathcal{L}. \tag{3}
$$

這個包含是嚴格的：$\mathcal{L}$ 包含某些非 Borel 集（Borel 零測集的子集，它們因完備性而屬於 $\mathcal{L}$，但可能不是 Borel 集）。特別地，每個 Borel 集都是勒貝格可測的，但勒貝格 σ 代數嚴格大於 $\mathcal{B}(\mathbb{R})$。

## 基本計算

### 區間

對端點為 $a \leq b$ 的任意有界區間 $I$，

$$
\lambda(I) = b - a, \tag{4}
$$

與端點是否包含無關。這是[外測度](../outer_measure/)中式 $(5)$，對 $\mathcal{L}$ 的元素應用所得。

對於 $\lambda(\{a\}) = 0$：單點集可被任意 $\varepsilon > 0$ 的區間 $(a - \varepsilon, a + \varepsilon)$ 覆蓋，故 $\lambda^*(\{a\}) \leq 2\varepsilon$；因此 $\lambda(\{a\}) = 0$。開區間和閉區間的公式由可數可加性得出。

### 可數集是零測集

當 $\lambda(N) = 0$ 時，集合 $N$ 稱為**零測集（null set）**（或*測度零集*）。任何可數集都是零測集：

$$
\lambda\!\left(\{x_1, x_2, x_3, \ldots\}\right) = \sum_{k=1}^{\infty} \lambda(\{x_k\}) = \sum_{k=1}^{\infty} 0 = 0. \tag{5}
$$

這印證了[測度論導論](../introduce_to_measure/)中的直覺：$\lambda(\mathbb{Q} \cap [0,1]) = 0$，儘管有理數在 $[0,1]$ 中是稠密的。

### $[0,1]$ 中的開集和閉集

開集的測度有乾淨的分解。每個開集 $U \subseteq [0,1]$ 都可寫成可數個不相交開區間的聯集 $U = \bigsqcup_k (a_k, b_k)$，因此

$$
\lambda(U) = \sum_{k} (b_k - a_k). \tag{6}
$$

其閉補集 $F = [0,1] \setminus U$ 滿足 $\lambda(F) = 1 - \lambda(U)$，由 $\lambda$ 在不相交分解 $[0,1] = F \sqcup U$ 上的可數可加性得出。

**康托爾集（Cantor set）**是一個醒目的例子。從 $[0,1]$ 開始；每個階段去掉每個剩餘區間的開中間三分之一。經過可數多個步驟後，剩下的是一個閉集 $C$，滿足 $\lambda(C) = 0$（因為被去掉的區間總長度為 $1/3 + 2/9 + 4/27 + \cdots = 1$）。然而 $C$ 是不可數的——它具有與 $\mathbb{R}$ 相同的基數。

## 平移不變性

**定理。** 對任意 $E \in \mathcal{L}$ 和 $t \in \mathbb{R}$，平移集合 $E + t \coloneqq \{x + t : x \in E\}$ 滿足 $E + t \in \mathcal{L}$，且

$$
\lambda(E + t) = \lambda(E). \tag{7}
$$

*理由。* 將 $E$ 的區間覆蓋平移 $t$，即得 $E + t$ 的覆蓋，且總長度相同。故 $\lambda^*(E + t) = \lambda^*(E)$。$E + t$ 的卡拉泰奧多里可測性類似地得出。

平移不變性 $(7)$ 是長度的一個基本幾何性質：集合的大小不依賴於它在數線上的位置。結合可數可加性和正規化 $\lambda([0,1]) = 1$，這唯一刻畫了 $\mathcal{B}(\mathbb{R})$ 上所有在有界集上有限的測度中的勒貝格測度。

## 摘要

- **勒貝格 σ 代數** $\mathcal{L}$（式 $(1)$）是 $\lambda^*$ 的卡拉泰奧多里可測集的集族；**勒貝格測度** $\lambda$（式 $(2)$）是 $\lambda^*$ 限制到 $\mathcal{L}$ 上的結果。
- $\lambda$ 是**完備的**、**可數可加的**測度，由卡拉泰奧多里定理保證。
- 每個開集，從而每個 Borel 集，都屬於 $\mathcal{L}$——包含式 $(3)$。勒貝格 σ 代數嚴格大於 $\mathcal{B}(\mathbb{R})$。
- 在區間上，$\lambda$ 與長度吻合：$\lambda(I) = b - a$——式 $(4)$。
- **可數集是零測集**——式 $(5)$；特別地 $\lambda(\mathbb{Q} \cap [0,1]) = 0$。
- 康托爾集是一個閉的、不可數的零測集：測度零的微妙性的一個醒目例子。
- **平移不變性** $\lambda(E + t) = \lambda(E)$——式 $(7)$——反映了長度是集合的幾何（而非位置）性質。
