---
title: 內部（Topology）
summary: "定義拓撲空間中集合的內部（interior）——它所包含的最大開子集——並探討內部點如何精確刻畫「嚴格在集合內部」的含義。"
prerequisites: 
  - basis/math/topology/topology_space
aliases: []
tags: ["拓撲學"]
updated: 2026-05-11
---

想到實數線上的區間 $(0, 1)$ 時，每個點都感覺「安全地在內部」——你可以向兩個方向稍微移動而仍留在區間內。相較之下，$[0, 1]$ 的端點 $0$ 恰好坐落在邊緣：每個鄰域都跨越了邊界。**內部（interior）**在任意拓撲空間中精確表達這種直覺，完全不提及距離。

## 內部點

設 $(X, \tau)$ 為[拓撲空間](../topology_space/)，$A \subseteq X$。若存在開集 $U \in \tau$ 使得

$$
x \in U \subseteq A, \tag{1}
$$

則稱 $X$ 中的點 $x$ 為 $A$ 的**內部點（interior point）**。

用通俗的話說：$x$ 是 $A$ 的內部點，當 $x$ 的某個開鄰域完全包含在 $A$ 中。注意 $x$ 本身必須屬於 $A$（因為 $x \in U \subseteq A$），所以只有 $A$ 的點才能成為 $A$ 的內部點。

## 集合的內部

$A$ 的**內部**，記作 $\operatorname{int}(A)$（或 $A^\circ$），是 $A$ 所有內部點的集合：

$$
\operatorname{int}(A) \coloneqq \{ x \in X : \exists\, U \in \tau,\ x \in U \subseteq A \}. \tag{2}
$$

有一個等價且通常更有用的描述：$\operatorname{int}(A)$ 是 $A$ 的**最大開子集（largest open subset）**，即所有包含在 $A$ 中的開集的聯集：

$$
\operatorname{int}(A) = \bigcup \{ U \in \tau : U \subseteq A \}. \tag{3}
$$

為了看出兩者一致，注意任何包含在 $A$ 中的開集 $U \subseteq A$ 都將其所有點貢獻到 $(3)$ 的聯集中，使它們依 $(1)$ 成為內部點。反之，每個內部點 $x$ 都見證了一個滿足 $U \subseteq A$ 的開集 $U \ni x$，所以 $x$ 也被聯集所包含。由於 $\tau$ 在任意聯集下封閉（公理 T2），$(3)$ 中的聯集本身也是開集。

## 範例

### 實數線上的標準拓撲

在 $\mathbb{R}$ 的標準度量拓撲下：

- $\operatorname{int}\bigl((0, 1)\bigr) = (0, 1)$ ——開區間的內部就是它本身。
- $\operatorname{int}\bigl([0, 1]\bigr) = (0, 1)$ ——端點 $0$ 和 $1$ 被去掉，因為它們附近沒有任何開區間完全包含在 $[0, 1]$ 中。
- $\operatorname{int}\bigl([0, 1)\bigr) = (0, 1)$ ——同理；$0$ 在邊緣。
- $\operatorname{int}(\mathbb{Q}) = \varnothing$ ——每個開區間都含有無理數，故沒有開集包含在 $\mathbb{Q}$ 中。
- $\operatorname{int}(\mathbb{R}) = \mathbb{R}$ ——全集是開集。

### 離散拓撲

在任意集合 $X$ 上的**離散拓撲**中（每個子集都是開集），每個單點集 $\{x\}$ 都是開集。對任意 $A \subseteq X$ 和任意 $x \in A$，開集 $\{x\}$ 滿足 $x \in \{x\} \subseteq A$，故 $A$ 的每個點都是內部點：

$$
\operatorname{int}(A) = A \quad \text{（離散拓撲）}.
$$

### 密著拓撲

在 $|X| > 1$ 的 $X$ 上的**密著拓撲**中（只有 $\varnothing$ 和 $X$ 是開集），唯一的非空開集是 $X$ 本身。滿足 $U \subseteq A$ 的開集 $U$ 必須屬於 $\{\varnothing, X\}$，所以只有 $U = \varnothing$ 的可能（除非 $A = X$）：

$$
\operatorname{int}(A) = \begin{cases} X & \text{若 } A = X, \\ \varnothing & \text{否則.} \end{cases}
$$

## 內部的性質

設 $(X, \tau)$ 為拓撲空間，$A, B \subseteq X$。

- **$\operatorname{int}(A)$ 是開集**，且 $\operatorname{int}(A) \subseteq A$。（直接由 $(3)$ 得出。）
- **$A$ 是開集，當且僅當 $A = \operatorname{int}(A)$。** 若 $A$ 是開集，它是 $(3)$ 的聯集中的一個集合，故 $A \subseteq \operatorname{int}(A)$；結合 $\operatorname{int}(A) \subseteq A$ 得到等式。
- **冪等性：** $\operatorname{int}(\operatorname{int}(A)) = \operatorname{int}(A)$。由於 $\operatorname{int}(A)$ 已是開集，它的內部就是它本身。
- **單調性：** 若 $A \subseteq B$，則 $\operatorname{int}(A) \subseteq \operatorname{int}(B)$。
- **對交集的分配：** $\operatorname{int}(A \cap B) = \operatorname{int}(A) \cap \operatorname{int}(B)$。
- **對聯集的半分配：** $\operatorname{int}(A) \cup \operatorname{int}(B) \subseteq \operatorname{int}(A \cup B)$。等號一般不成立：在 $\mathbb{R}$ 中，$\operatorname{int}([0,1]) \cup \operatorname{int}([1,2]) = (0,1) \cup (1,2)$ 漏掉了 $1$，而 $\operatorname{int}([0,1] \cup [1,2]) = \operatorname{int}([0,2]) = (0,2)$。

## 對偶視角：閉包

內部與[閉包（closure）](../closure/)透過取補運算互為對偶：

$$
\operatorname{int}(A) = X \setminus \overline{X \setminus A}, \tag{4}
$$

其中 $\overline{B}$ 表示 $B$ 的閉包。你可以把這讀作：$A$ 的內部由那些*不在*補集閉包中的點組成。這種對偶性是根本性的——關於內部的結論和關於閉包的結論可以透過取補互相轉化。

## 摘要

- 當某個開集 $U$ 滿足 $x \in U \subseteq A$ 時，$x$ 是 $A$ 的**內部點**。
- **內部** $\operatorname{int}(A)$ 是 $A$ 所有內部點的集合，等價地也是 $A$ 的最大開子集。
- $A$ 是開集，當且僅當 $A = \operatorname{int}(A)$。
- 內部算子具有**冪等性**和**單調性**，對有限交集可分配，對聯集只有單向的分配。
- 在離散拓撲中每個集合等於自己的內部；在密著拓撲中只有 $\varnothing$ 和 $X$ 如此。
- 內部與閉包互為對偶：$\operatorname{int}(A) = X \setminus \overline{X \setminus A}$。
