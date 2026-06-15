---
title: 閉包（Topology）
summary: "定義拓撲空間中集合的閉包（closure）——包含它的最小閉集——建立其透過導集和閉集交集的等價刻畫，並探討其關鍵性質。"
prerequisites: 
  - basis/math/topology/derived_set
  - basis/math/topology/interior
aliases: []
tags: ["拓撲學"]
updated: 2026-05-11
---

從開區間 $(0, 1)$ 出發，問「包含它的最小閉集是什麼？」，答案立刻是 $[0, 1]$——你只需補入兩個缺失的端點。**閉包（closure）**將這種「封閉」操作推廣到任意拓撲空間的任意子集。與度量空間中「加入極限點」的直覺不同，拓撲定義不需要距離：它純粹用開集運作。

## 三個等價定義

設 $(X, \tau)$ 為[拓撲空間](../topology_space/)，$A \subseteq X$。$A$ 的閉包，記作 $\overline{A}$（或 $\operatorname{cl}(A)$），可以用三種等價方式定義。

### 定義一：包含 $A$ 的最小閉集

$$
\overline{A} \coloneqq \bigcap \{ C \subseteq X : C \text{ 是閉集且 } A \subseteq C \}. \tag{1}
$$

這是所有包含 $A$ 的閉集的交集。閉集在任意交集下封閉（包括無限交集）。包含 $A$ 的閉集超集非空，因為 $X$ 本身永遠是閉集。所以 $\overline{A}$ 是定義明確的閉集，且是包含 $A$ 的最小一個（因為 $A$ 的每個閉集超集都出現在交集中）。

### 定義二：與導集的聯集

$$
\overline{A} = A \cup A', \tag{2}
$$

其中 $A'$ 是 $A$ 的[導集（derived set）](../derived_set/)（即 $A$ 的所有[聚點（accumulation point）](../accumulation_point/)組成的集合）。你將 $A$ 外部那些被 $A$ 所「趨近」的點加入 $A$。這在導集章節中已建立：$A \cup A'$ 是閉集，$A \subseteq A \cup A'$，且 $A$ 的任何閉集超集都必須包含 $A'$。

### 定義三：鄰域刻畫

點 $x \in X$ 屬於 $\overline{A}$，當且僅當每個包含 $x$ 的開集 $U$ 都滿足

$$
U \cap A \neq \varnothing. \tag{3}
$$

將此與聚點的條件相比較：區別在於這裡我們允許 $x$ 本身在 $A$ 中（交集不必見證 $A$ 中*另一個*點）。換句話說，$x \in \overline{A}$ 當且僅當 $x \in A$ 或 $x$ 是 $A$ 的聚點——恰好就是 $A \cup A'$。

三種定義給出同一個集合。你可以根據具體論證選用最方便的那個。

## 範例

### 實數線上的標準拓撲

- $\overline{(0, 1)} = [0, 1]$。包含 $(0,1)$ 的最小閉集是閉區間；等價地，$0$ 和 $1$ 是 $(0,1)$ 的聚點，$\mathbb{R}$ 中沒有其他點是聚點。
- $\overline{\mathbb{Q}} = \mathbb{R}$。每個實數都是 $\mathbb{Q}$ 的聚點（有理數在 $\mathbb{R}$ 中稠密）。
- $\overline{\{1/n : n \geq 1\}} = \{1/n : n \geq 1\} \cup \{0\}$。唯一的聚點是 $0$。
- $\overline{\mathbb{Z}} = \mathbb{Z}$。每個整數都是孤立點（無聚點），故此集合已是閉集。
- 永遠有 $\overline{\varnothing} = \varnothing$ 和 $\overline{X} = X$。

### 離散拓撲

$X$ 的每個子集都是開集，從而每個子集也是閉集（開集的補是閉集）。因此對每個 $A$ 都有 $\overline{A} = A$。閉包什麼都不加——沒有聚點需要添入。

### 密著拓撲

只有 $\varnothing$ 和 $X$ 是閉集。對任意非空真子集 $A \subsetneq X$，包含 $A$ 的唯一閉集是 $X$ 本身，故 $\overline{A} = X$。

## 閉包的性質

設 $(X, \tau)$ 為拓撲空間，$A, B \subseteq X$。

- **$\overline{A}$ 是閉集**，且 $A \subseteq \overline{A}$。（由定義 $(1)$ 直接得出。）
- **$A$ 是閉集，當且僅當 $A = \overline{A}$。** 若 $A$ 是閉集，它出現在 $(1)$ 的交集中，故 $\overline{A} \subseteq A$；又因 $A \subseteq \overline{A}$ 永遠成立，等式得出。
- **冪等性：** $\overline{\overline{A}} = \overline{A}$。由於 $\overline{A}$ 已是閉集，其閉包就是它本身。
- **單調性：** 若 $A \subseteq B$，則 $\overline{A} \subseteq \overline{B}$。
- **對聯集的分配：** $\overline{A \cup B} = \overline{A} \cup \overline{B}$。一個點靠近 $A \cup B$ 當且僅當它靠近 $A$ 或 $B$。
- **對交集的半分配：** $\overline{A \cap B} \subseteq \overline{A} \cap \overline{B}$。等號一般不成立：在 $\mathbb{R}$ 中，$\overline{(0,1) \cap (1,2)} = \overline{\varnothing} = \varnothing$，但 $\overline{(0,1)} \cap \overline{(1,2)} = [0,1] \cap [1,2] = \{1\}$。

## 與內部的對偶性

閉包與[內部（interior）](../interior/)透過取補運算互為對偶。對任意 $A \subseteq X$：

$$
\overline{A} = X \setminus \operatorname{int}(X \setminus A), \tag{4}
$$

$$
\operatorname{int}(A) = X \setminus \overline{X \setminus A}. \tag{5}
$$

你可以把 $(4)$ 讀作：$A$ 的閉包是那些*不在*補集內部中的點。$A$ 「邊緣」上的點既不在 $A$ 的內部也不在 $X \setminus A$ 的內部，所以它們在閉包中但不在內部——這恰好就是[邊界（boundary）](../boundary/)。

這些對偶公式意味著每個關於閉包的定理都可以透過取補轉化為關於內部的定理（反之亦然）。這種對稱性貫穿整個拓撲學。

## 稠密性

當 $\overline{A} = X$ 時，稱集合 $A$ 在 $X$ 中**稠密（dense）**：$X$ 的每個點要麼在 $A$ 中，要麼被 $A$ 所趨近。有理數 $\mathbb{Q}$ 在 $\mathbb{R}$ 中是稠密的。

更一般地，$A$ 在 $B$ 中稠密是指 $B \subseteq \overline{A}$。稠密性是分析和拓撲中的核心概念：知道一個「好」的集合（如 $\mathbb{Q}$ 或多項式集）在更大的空間中是稠密的，就可以用這些好的元素逼近任意元素。

## 摘要

- **閉包** $\overline{A}$ 是包含 $A$ 的最小閉集，由所有閉集超集的交集得到。
- 等價地，$\overline{A} = A \cup A'$：加入導集以包含所有聚點。
- 等價地，由鄰域刻畫：$x \in \overline{A}$ 當且僅當 $x$ 的每個開鄰域都與 $A$ 相交。
- $A$ 是閉集，當且僅當 $A = \overline{A}$；閉包算子具有冪等性、單調性，並對有限聯集可分配。
- 閉包與內部互為**對偶**：$\overline{A} = X \setminus \operatorname{int}(X \setminus A)$。
- 當集合的閉包等於整個 $X$ 時，該集合在 $X$ 中**稠密**。
- 閉包與內部之差——$\overline{A} \setminus \operatorname{int}(A)$——就是 $A$ 的**[邊界](../boundary/)**。
