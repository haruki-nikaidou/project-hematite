---
title: 上確界與下確界
summary: "定義 ℝ 的子集的上確界（最小上界）與下確界（最大下界），以最小上界性質闡述 ℝ 的完備性，並推導包括阿基米德性質在內的重要結果。"
prerequisites:
  - basis/math/analysis/real_number_a
aliases: []
tags: ["分析學", "實數"]
updated: 2026-05-20
---

你已知道 $\mathbb{R}$ 是完備的——每個柯西數列都收斂。但完備性還有一個在實際操作中往往更方便的等價面貌：每個非空且有上界的實數子集都有一個*最小的*上界。這個上界稱為**上確界（supremum）**，而對應於下界的鏡像則稱為**下確界（infimum）**。這兩個概念撐起了實分析的整個結構。

## 界

設 $S \subseteq \mathbb{R}$ 是一個非空集合。

數 $M \in \mathbb{R}$ 是 $S$ 的一個**上界（upper bound）**，若

$$
\forall s \in S,\quad s \leq M.
$$

數 $m \in \mathbb{R}$ 是 $S$ 的一個**下界（lower bound）**，若

$$
\forall s \in S,\quad m \leq s.
$$

若 $S$ 至少有一個上界，則稱其**有上界**；若至少有一個下界，則稱其**有下界**。既有上界又有下界的集合簡稱**有界**。

注意界不是唯一的。若 $M$ 是 $S$ 的上界，則 $M + 1$、$M + 100$ 以及任何更大的數也是。有趣的對象是*最緊的*界。

## 上確界與下確界

$S$ 的**上確界**，記作 $\sup S$，是 $S$ 的最小上界：它是 $S$ 的上界，且 $\leq$ 每一個其他上界。

解讀定義：$\sup S = \alpha$ 意味著

1. $\forall s \in S,\; s \leq \alpha$（上界），且
2. $\forall \varepsilon > 0,\; \exists\, s \in S \text{ 使得 } s > \alpha - \varepsilon$（不存在更小的上界）。

條件 2 是上確界的特徵性質：你無法將 $\alpha$ 降低哪怕 $\varepsilon$，而不失去上界的性質。

$S$ 的**下確界**，記作 $\inf S$，是 $S$ 的最大下界：它是 $S$ 的下界，且 $\geq$ 每一個其他下界。對偶地，$\inf S = \beta$ 意味著

1. $\forall s \in S,\; \beta \leq s$，且
2. $\forall \varepsilon > 0,\; \exists\, s \in S \text{ 使得 } s < \beta + \varepsilon$。

$\sup S$ 和 $\inf S$ 在存在時都是唯一的：若 $\alpha$ 和 $\alpha'$ 都是最小上界，則 $\alpha \leq \alpha'$ 且 $\alpha' \leq \alpha$，故 $\alpha = \alpha'$。

## 最小上界性質

$\sup S$ 的存在並非自動保證——它依賴於所在的數系。在 $\mathbb{Q}$ 中，集合 $\{q \in \mathbb{Q} : q^2 < 2\}$ 有上界（例如 $2$），卻在 $\mathbb{Q}$ 中沒有上確界，因為 $\sqrt{2} \notin \mathbb{Q}$。

在 $\mathbb{R}$ 中，情況是完美的：

> **定理（最小上界性質）。** $\mathbb{R}$ 的每個非空且有上界的子集在 $\mathbb{R}$ 中都有上確界。

*證明提要。* 因為 $\mathbb{R}$ 是[完備的](../real_number_a/)，$\mathbb{R}$ 中的每個柯西數列都收斂。由完備性可以證明：對一個非空且有上界的 $S$，考慮二分搜索數列，它不斷收緊一個區間 $[a_n, b_n]$，其中 $a_n \in S$（或接近 $S$），$b_n$ 始終是上界。區間長度縮減到零，故端點形成收斂到同一極限的柯西數列，此極限即為上確界。$\square$

由對稱性（對所有元素取反），$\mathbb{R}$ 中每個非空且有下界的子集都有下確界。

最小上界性質與 $\mathbb{R}$ 的完備性邏輯上等價：兩者都可以作為定義公理，另一個由此推導。它們共同表達了同一個事實——$\mathbb{R}$ 沒有空隙。

## 例子

### 閉區間 $[a, b]$

$$
\sup [a, b] = b, \qquad \inf [a, b] = a.
$$

兩個界都在集合內取到：$b \in [a, b]$ 且 $a \in [a, b]$。

### 開區間 $(a, b)$

$$
\sup (a, b) = b, \qquad \inf (a, b) = a.
$$

兩個界都不在集合內取到：$b \notin (a, b)$ 且 $a \notin (a, b)$。儘管集合中沒有元素能達到 $b$，上確界在 $\mathbb{R}$ 中仍然存在——集合任意接近 $b$ 但永遠無法觸及它。

### 調和數列

設 $S = \left\{\dfrac{1}{n} : n \in \mathbb{N},\; n \geq 1\right\} = \left\{1,\, \tfrac{1}{2},\, \tfrac{1}{3},\, \ldots\right\}$。

$$
\sup S = 1 \in S, \qquad \inf S = 0 \notin S.
$$

下確界 $0$ 不被取到：每個元素 $1/n > 0$，但對任意 $\varepsilon > 0$，選取 $n > 1/\varepsilon$ 就得到 $1/n < \varepsilon$，確認 $0$ 是最大下界。

### 無界集合

集合 $\mathbb{N}$ 有下界（$\inf \mathbb{N} = 0$），但無上界：沒有有限的 $M$ 是上界，故 $\sup \mathbb{N}$ 在 $\mathbb{R}$ 中不存在。按慣例記作 $\sup \mathbb{N} = +\infty$。

## 確界在集合內外的情況

從例子中得到的一個關鍵洞察：$S$ 的上確界可能在 $S$ 中，也可能不在。

- $\sup S \in S$ 若且唯若 $S$ 有**最大值（maximum）**（最大元素）。
- $\inf S \in S$ 若且唯若 $S$ 有**最小值（minimum）**（最小元素）。

每個集合至多有一個最大值和一個最小值；若其中任一存在，它就等於對應的上確界或下確界。但一個集合可以有上確界而沒有最大值——如 $(a, b)$ 所示。

## 阿基米德性質

最小上界性質的一個經典推論是：

> **定理（阿基米德性質，Archimedean property）。** 對每個 $x \in \mathbb{R}$，都存在 $n \in \mathbb{N}$ 使得 $n > x$。

*證明。* 假設某個 $x \in \mathbb{R}$ 是 $\mathbb{N}$ 的上界，則 $\mathbb{N}$ 是 $\mathbb{R}$ 的一個非空有上界子集，故由最小上界性質（LUB property）它有上確界 $\alpha = \sup \mathbb{N}$。由於 $\alpha - 1$ 不是 $\mathbb{N}$ 的上界，存在 $n \in \mathbb{N}$ 使得 $n > \alpha - 1$，即 $n + 1 > \alpha$。但 $n + 1 \in \mathbb{N}$，與 $\alpha$ 是上界矛盾。$\square$

一個等價的表述：對任意 $\varepsilon > 0$，都存在 $n \in \mathbb{N}$ 使得 $1/n < \varepsilon$。這在分析學中被不斷用來說明某些量可以任意小。

## 等價刻畫

以下各條都等價於 $\alpha = \sup S$，在不同證明中各有用途：

- $\alpha$ 是上界，且對每個 $\varepsilon > 0$，區間 $(\alpha - \varepsilon, \alpha]$ 包含 $S$ 的某個點。
- $\alpha$ 是上界，且 $S$ 中存在數列 $(s_n)$ 使得 $s_n \to \alpha$。
- $\alpha = \min\{M \in \mathbb{R} : M \text{ 是 } S \text{ 的上界}\}$。

第二個刻畫——$S$ 中一個收斂到上確界的數列——在許多證明中最為有用，將上確界／下確界的語言與數列和極限聯繫起來。

## 摘要

- $S$ 的**上界**滿足對所有 $s \in S$ 有 $s \leq M$；**下界**滿足對所有 $s \in S$ 有 $m \leq s$。
- **上確界** $\sup S$ 是*最小*上界；**下確界** $\inf S$ 是*最大*下界。兩者在存在時都是唯一的。
- 特徵刻畫：$\alpha = \sup S$ 若且唯若 $\alpha$ 是上界且對每個 $\varepsilon > 0$，某個 $s \in S$ 滿足 $s > \alpha - \varepsilon$。
- **最小上界性質**：每個非空且有上界的 $S \subseteq \mathbb{R}$ 都有 $\sup S \in \mathbb{R}$。這與 $\mathbb{R}$ 的完備性等價。
- 上確界不一定在 $S$ 中：$\sup S \in S$ 若且唯若 $S$ 有最大值。
- **阿基米德性質**由此得出：對任意 $x \in \mathbb{R}$，存在 $n \in \mathbb{N}$ 使得 $n > x$，故 $\mathbb{N}$ 無上界，且 $1/n$ 可以任意小。
