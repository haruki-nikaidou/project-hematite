---
title: σ 代數
summary: "σ 代數（sigma-algebra）是在補集運算和可數聯集運算下封閉的子集族——亦即定義測度的自然定義域。本章節陳述公理、以 Borel σ 代數為典型例子加以說明，並解釋為何可數（而非有限）封閉性才是恰當的強度。"
prerequisites:
  - basis/math/measure/introduce_to_measure
  - basis/math/analysis/set/countable
aliases: []
tags:
  - 測度論
updated: 2026-05-20
---

[測度論導論](../introduce_to_measure/)說明了不能對 $\mathbb{R}$ 的每個子集賦予長度。σ 代數（sigma-algebra）正是回答「*應該*包含哪些子集？」這個問題的答案，它是使測度得以定義的精確結構。

## 定義

設 $X$ 為任意集合。$X$ 上的 **σ 代數**是 $X$ 的子集族 $\mathcal{F}$，滿足以下三條公理：

1. $X \in \mathcal{F}$ — 全集是可測的。
2. 若 $E \in \mathcal{F}$，則 $E^c \coloneqq X \setminus E \in \mathcal{F}$ — 在**補集**運算下封閉。
3. 若 $E_1, E_2, E_3, \ldots \in \mathcal{F}$，則 $\bigcup_{k=1}^{\infty} E_k \in \mathcal{F}$ — 在**可數聯集**運算下封閉。

$E \in \mathcal{F}$ 的集合稱為 **$\mathcal{F}$-可測的**（或在 $\mathcal{F}$ 已明確時簡稱可測）。序對 $(X, \mathcal{F})$ 稱為**可測空間（measurable space）**。

### 直接推論

從三條公理可以不費力地推導出更多封閉性。

**空集。** 由公理 1，$X \in \mathcal{F}$，故由公理 2，$\emptyset = X^c \in \mathcal{F}$。

**可數交集。** 若 $E_1, E_2, \ldots \in \mathcal{F}$，則由德摩根定律（De Morgan's law）：

$$
\bigcap_{k=1}^{\infty} E_k
  = \left(\bigcup_{k=1}^{\infty} E_k^c\right)^c. \tag{1}
$$

每個 $E_k^c \in \mathcal{F}$（由公理 2）；聯集屬於 $\mathcal{F}$（由公理 3）；再取一次補集得 $\bigcap_k E_k \in \mathcal{F}$（由公理 2）。故 σ 代數在可數交集運算下也封閉。

**差集。** 對任意 $E, F \in \mathcal{F}$，$E \setminus F = E \cap F^c \in \mathcal{F}$，結合交集結論與公理 2 即可得出。

## 為何「可數」是恰當的強度

公理 3 使用的是*可數*聯集，而非有限聯集。這是有意為之的。

- **僅有有限封閉性太弱。** 你需要討論集合的極限——例如開集族 $\{(a_k, b_k)\}$，其聯集在 $k \to \infty$ 時趨近一個閉區間。僅在有限次運算下封閉的集族無法處理這類極限。
- **不可數封閉性太強。** 若要求在*任意*聯集下封閉，冪集的每個子集族都會強迫整個冪集進入 $\mathcal{F}$。$\mathbb{R}$ 上在任意聯集下封閉的唯一 σ 代數是 $2^{\mathbb{R}}$——而如維塔利集所示，這包含了不可測集合，無法支撐勒貝格測度。

可數封閉性恰好取得平衡：它足夠豐富，能處理你所需的所有分析構造（極限、開覆蓋的交集等等），同時仍能排除問題集合。

## 三個典型例子

### 平凡的 σ 代數

$X$ 上最小的 σ 代數是 $\{\emptyset, X\}$。驗證：$X^c = \emptyset \in \mathcal{F}$，而 $\emptyset$ 和 $X$ 的任意可數聯集仍是 $\emptyset$ 或 $X$。

$X$ 上最大的 σ 代數是**冪集（power set）** $2^X$——即 $X$ 的所有子集。這顯然滿足全部三條公理，但當 $X = \mathbb{R}$ 時，它太大而無法支撐有用的測度。

### $\mathbb{R}$ 上的 Borel σ 代數

**Borel σ 代數** $\mathcal{B}(\mathbb{R})$ 是 $\mathbb{R}$ 上包含所有開區間 $(a, b)$ 的*最小* σ 代數。更正式地說，它是所有包含開區間的 σ 代數之交集：

$$
\mathcal{B}(\mathbb{R}) \;\coloneqq\; \bigcap \{\mathcal{F} : \mathcal{F} \text{ 是 σ 代數且對所有 } a < b \text{ 有 } (a,b) \in \mathcal{F}\}. \tag{2}
$$

σ 代數的交集仍是 σ 代數——驗證：若交集中的每個 $\mathcal{F}$ 都包含 $E$，則每個 $\mathcal{F}$ 也包含 $E^c$（由各自的公理 2），故 $E^c$ 屬於交集；可數聯集同理。因此定義 $(2)$ 是合法的。

屬於 $\mathcal{B}(\mathbb{R})$ 的集合稱為 **Borel 集**。由於 $\mathcal{B}(\mathbb{R})$ 在可數聯集和交集下封閉：
- 每個開集都是 Borel 集（作為開區間的可數聯集——回顧 $\mathbb{R}$ 中每個開集都可分解為可數個不相交的開區間）。
- 每個閉集都是 Borel 集（開集的補集）。
- 每個 $F_\sigma$（閉集的可數聯集）和每個 $G_\delta$（開集的可數交集）都是 Borel 集。
- $\mathbb{R}$ 中所有「日常」子集——單點集、區間、可數集、多項式零點集——都是 Borel 集。

維塔利集*不是* Borel 集；它完全位於 $\mathcal{B}(\mathbb{R})$ 之外。

## 生成 σ 代數

上文已看到 σ 代數的交集仍是 σ 代數。這提供了一種從零開始建構新 σ 代數的簡潔方式。

**定義。** 設 $\mathcal{A}$ 是 $X$ 的子集的任意集族。由 $\mathcal{A}$ **生成的 σ 代數**，記作 $\sigma(\mathcal{A})$，是包含 $\mathcal{A}$ 中每個集合的最小 σ 代數：

$$
\sigma(\mathcal{A}) \;\coloneqq\; \bigcap \{\mathcal{F} : \mathcal{F} \text{ 是 σ 代數且 } \mathcal{A} \subseteq \mathcal{F}\}.
$$

Borel σ 代數恰好是 $\sigma(\{(a,b) : a < b\})$。

注意 $\sigma(\mathcal{A})$ 並不是 $\mathcal{A}$ 中集合的所有有限聯集和交集的集合——你還必須在*可數*次運算下封閉，這可能需要超限多個步驟才能達到 $\sigma(\mathcal{A})$ 的全部內容。

## 摘要

- $X$ 上的 **σ 代數** $\mathcal{F}$ 是子集族，在以下運算下封閉：包含 $X$、取補集、取可數聯集——即上述公理 1–3。
- 由這些公理，$\mathcal{F}$ 同樣在 $\emptyset$、可數交集（式 $(1)$）和差集運算下封閉。
- **可數**封閉性是恰當的強度：有限封閉對分析極限太弱；不可數封閉則會強迫引入不可測集。
- **平凡 σ 代數** $\{\emptyset, X\}$ 和 $2^X$ 分別是最小和最大的。
- **Borel σ 代數** $\mathcal{B}(\mathbb{R})$（定義於式 $(2)$）由開區間生成，包含所有開集、閉集、$F_\sigma$、$G_\delta$ 以及所有「日常」集合。
- 由集族 $\mathcal{A}$ **生成的 σ 代數**是包含 $\mathcal{A}$ 的最小 σ 代數；它由所有包含 $\mathcal{A}$ 的 σ 代數取交集得到。
- 接下來：[外測度](../outer_measure/)，在限制到可測集之前，先對 $\mathbb{R}$ 的每個子集賦予一個初步的「大小」。
