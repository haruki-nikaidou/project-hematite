---
title: 邊界（Topology）
summary: "定義拓撲空間中集合的邊界（boundary）——同時屬於該集合閉包和其補集閉包的點——建立空間的三分定理，並探討開集、閉集和 clopen 集如何透過邊界加以刻畫。"
prerequisites: 
  - basis/math/topology/closure
aliases: []
tags: ["拓撲學"]
updated: 2026-05-11
---

站在一座島嶼的海岸線上：你既不在海洋中，也不在陸地上——你在兩者之間的**邊界（boundary）**上。你附近的每個開鄰域都同時觸及海洋和陸地。集合的**邊界**為任意拓撲空間中的這種幾何圖像提供了精確的描述：它是集合和其補集無法被任何開集分離的地方。

## 定義

設 $(X, \tau)$ 為[拓撲空間](../topology_space/)，$A \subseteq X$。$A$ 的**邊界**，記作 $\partial A$（或 $\operatorname{bd}(A)$ 或 $\operatorname{Fr}(A)$），定義為

$$
\partial A \coloneqq \overline{A} \cap \overline{X \setminus A}. \tag{1}
$$

它是同時屬於 $A$ 的[閉包](../closure/)和 $A$ 的補集的閉包的點的集合。

利用閉包的鄰域刻畫（點 $x$ 屬於 $\overline{B}$ 當且僅當 $x$ 的每個開集都與 $B$ 相交），可以將 $(1)$ 展開為一個直接條件：$x \in \partial A$ 當且僅當

$$
\forall\, U \in \tau,\quad x \in U \implies U \cap A \neq \varnothing \text{ 且 } U \cap (X \setminus A) \neq \varnothing. \tag{2}
$$

用通俗的話說：邊界點的每個開鄰域都同時觸及 $A$ 和它的補集，你無法將 $x$ 從任何一側「分離」出來。

## 三分定理

內部、邊界和*外部*這三個概念將 $X$ 分割為三個互不相交的部分。定義 $A$ 的**外部（exterior）**為 $\operatorname{ext}(A) \coloneqq \operatorname{int}(X \setminus A)$——補集的內部。

**定理（$X$ 的三分）。** 對任意 $A \subseteq X$：

$$
X = \operatorname{int}(A) \cup \partial A \cup \operatorname{ext}(A), \tag{3}
$$

且這三個集合兩兩不相交。

*為何成立。* [內部](../interior/)和外部是不相交的開集。若一個點的鄰域包含在 $A$ 中，它就在 $\operatorname{int}(A)$ 中；若鄰域包含在 $X \setminus A$ 中，它就在 $\operatorname{ext}(A)$ 中；若任何鄰域都不完全落在任一側，它就在 $\partial A$ 中。$X$ 中每個點恰好落入這三種情形之一。

等價地，利用閉包與內部的對偶關係 $\overline{A} = X \setminus \operatorname{int}(X \setminus A)$：

$$
\overline{A} = \operatorname{int}(A) \cup \partial A \tag{4}
$$

（閉包是內部加上邊界），且這個分割是不相交的。

## 範例

### $\mathbb{R}$ 上的標準拓撲

- $\partial (0, 1) = \{0, 1\}$。閉包是 $[0,1]$；補集 $(-\infty, 0] \cup [1, +\infty)$ 的閉包是它本身；兩者的交集是 $\{0, 1\}$。
- $\partial [0, 1] = \{0, 1\}$，同樣如此。集合和補集 $(-\infty, 0) \cup (1, +\infty)$ 的邊界相同，不論端點是否包含在內。
- $\partial \mathbb{Q} = \mathbb{R}$。有理數和無理數都在 $\mathbb{R}$ 中稠密，故 $\overline{\mathbb{Q}} = \mathbb{R}$ 且 $\overline{\mathbb{R} \setminus \mathbb{Q}} = \mathbb{R}$；兩者的交集是整個 $\mathbb{R}$。
- $\partial \mathbb{R} = \varnothing$。沒有補集；$X \setminus X = \varnothing$，其閉包是 $\varnothing$。

### 離散拓撲

在離散拓撲中，每個集合既是開集又是閉集，故 $\overline{A} = A$ 且 $\overline{X \setminus A} = X \setminus A$。兩者的交集是 $A \cap (X \setminus A) = \varnothing$。在離散拓撲中，每個集合的邊界都是空的。

### 密著拓撲

只有 $\varnothing$ 和 $X$ 是閉集。對非空真子集 $A \subsetneq X$，$\overline{A} = X$ 且 $\overline{X \setminus A} = X$，故 $\partial A = X \cap X = X$。整個空間是每個非空真子集的邊界——這個極端情形反映了密著拓撲有多粗糙。

## 性質

設 $(X, \tau)$ 為拓撲空間，$A \subseteq X$。

- **$\partial A$ 是閉集。** 它是兩個閉集的交集：$\partial A = \overline{A} \cap \overline{X \setminus A}$。
- **對稱性：** $\partial A = \partial(X \setminus A)$。集合和其補集有相同的邊界——海岸線既不屬於海洋也不屬於陸地。
- **分解：** $\overline{A} = \operatorname{int}(A) \sqcup \partial A$（不相交聯集），由等式 $(4)$ 得出。
- **邊界的邊界：** $\partial(\partial A) \subseteq \partial A$。閉集的邊界包含在該集合之中；由於 $\partial A$ 是閉集，其邊界是自身的子集。
- **內部與邊界不相交：** $\operatorname{int}(A) \cap \partial A = \varnothing$。內部點有一個在 $A$ 內的鄰域，將它與 $X \setminus A$ 分離開來。

## 用邊界刻畫開集、閉集和 clopen 集

邊界對三類特殊集合給出特別簡潔的刻畫。

**定理。** 設 $A \subseteq X$。則：

1. $A$ 是**開集**，當且僅當 $A \cap \partial A = \varnothing$（邊界完全在 $A$ 的補集中）。
2. $A$ 是**閉集**，當且僅當 $\partial A \subseteq A$（邊界在 $A$ 的內部）。
3. $A$ 是 **clopen**（既開又閉），當且僅當 $\partial A = \varnothing$。

*為何成立。*

1. 若 $A$ 是開集則 $A = \operatorname{int}(A)$，它與 $\partial A$ 不相交。反之，若 $A \cap \partial A = \varnothing$，則 $A$ 中沒有點屬於 $\overline{X \setminus A}$，故 $A$ 的每個點都有一個包含在 $A$ 中的鄰域，使 $A$ 成為開集。

2. $A$ 是閉集當且僅當 $\overline{A} = A$。由於 $\overline{A} = \operatorname{int}(A) \cup \partial A$ 且 $\operatorname{int}(A) \subseteq A$，等式 $\overline{A} = A$ 成立當且僅當 $\partial A \subseteq A$。

3. 結合 (1) 和 (2)：clopen 要求 $A \cap \partial A = \varnothing$ 且 $\partial A \subseteq A$，兩者合在一起迫使 $\partial A = \varnothing$。

最後一點特別有用：**在連通的拓撲空間中，只有 $\varnothing$ 和 $X$ 的邊界是空的**，因為那是唯一的 clopen 集。邊界為空因此是不連通的見證。

## 座標中的邊界公式

在 $\mathbb{R}^n$ 的標準拓撲中，你可以把集合的邊界想成它的「拓撲外皮」——無窮小的球始終橫跨集合和其補集的那些點的集合。這與幾何直覺吻合：圓盤的邊界是它的圓周，正方體的邊界是它的六個面。在抽象拓撲中，這種直覺推廣到完全沒有幾何結構的任意空間。

## 摘要

- **邊界** $\partial A \coloneqq \overline{A} \cap \overline{X \setminus A}$ 由每個鄰域都同時觸及 $A$ 和 $X \setminus A$ 的所有點組成。
- $\partial A$ 永遠是**閉集**，且 $\partial A = \partial(X \setminus A)$（邊界具有對稱性）。
- 空間 $X$ 被分割為 $\operatorname{int}(A) \sqcup \partial A \sqcup \operatorname{ext}(A)$；閉包滿足 $\overline{A} = \operatorname{int}(A) \sqcup \partial A$。
- $A$ 是開集當且僅當 $\partial A \cap A = \varnothing$；閉集當且僅當 $\partial A \subseteq A$；clopen 當且僅當 $\partial A = \varnothing$。
- 在**連通**空間中，只有 $\varnothing$ 和 $X$ 的邊界是空的。
- 在離散拓撲中每個集合的邊界都是空的；在密著拓撲中每個非空真子集的邊界等於整個 $X$。
