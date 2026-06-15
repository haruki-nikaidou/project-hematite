---
title: 導集（Derived Set）
summary: "介紹拓撲空間子集的導集（derived set）——其所有聚點的集合——並說明它如何刻畫閉集性質，以及如何作為閉包算子的橋樑。"
prerequisites: 
  - basis/math/topology/accumulation_point
aliases: []
tags: ["拓撲學"]
updated: 2026-05-11
---

你已知道集合的[聚點（accumulation point）](../accumulation_point/)是什麼：每個開鄰域都能回到集合中的一個點。將 $A$ 的*所有*聚點收集到一個集合中，就得到了**導集（derived set）**——一個緊湊地封裝 $A$ 的「極限行為」的集合，而它恰好是刻畫閉集性質和建立閉包的正確工具。

## 定義

設 $(X, \tau)$ 為[拓撲空間](../topology_space/)，$A \subseteq X$。$A$ 的**導集**，記作 $A'$，是 $A$ 的所有聚點組成的集合：

$$
A' \coloneqq \{ x \in X : \forall\, U \in \tau,\ x \in U \implies (U \setminus \{x\}) \cap A \neq \varnothing \}. \tag{1}
$$

導集是 $X$ 的子集，但它不必是 $A$ 的子集，$A$ 也不必是 $A'$ 的子集。

## 範例

### 實數線上的標準拓撲

- 設 $A = (0, 1)$。則 $A' = [0, 1]$：$[0,1]$ 中的每個點在每個開鄰域中都被 $(0,1)$ 觸及，包括端點 $0$ 和 $1$，儘管它們不屬於 $A$。
- 設 $A = \{1/n : n \in \mathbb{N}^+\}$。則 $A' = \{0\}$：唯一的聚點是 $0$，且 $0 \notin A$。
- 設 $A = \mathbb{Q}$。則 $A' = \mathbb{R}$：每個實數都可被有理數趨近。
- 設 $A = \mathbb{Z}$。則 $A' = \varnothing$：每個整數都是孤立的（它有一個不含其他整數的鄰域）。

### 離散拓撲

在離散拓撲中，每個單點集都是開集，因此沒有任何點能成為任何集合的聚點。故對每個 $A \subseteq X$，$A' = \varnothing$。

### $\mathbb{R}$ 上的有限補拓撲（類 Zariski 拓撲）

在 $\mathbb{R}$ 上的**有限補拓撲（finite-complement topology）**中——其中一個集合是開集當且僅當其補集是有限集——開集非常大。對任意無限集 $A$ 和任意 $x \in \mathbb{R}$，每個包含 $x$ 的開集 $U$ 的補集都是有限集，故 $U$ 包含 $\mathbb{R}$ 中除有限多個點以外的所有點，特別地 $(U \setminus \{x\}) \cap A$ 是無限集。因此，對每個無限集 $A$，$A' = \mathbb{R}$。

## 性質

設 $(X, \tau)$ 為拓撲空間，$A, B \subseteq X$。

- **單調性：** 若 $A \subseteq B$，則 $A' \subseteq B'$。（$B$ 中的點更多，只會更容易填滿開鄰域。）
- **對聯集的分配：** $(A \cup B)' = A' \cup B'$。$A \cup B$ 的每個聚點都是 $A$ 或 $B$（或兩者）的聚點。
- **對交集的半分配：** $(A \cap B)' \subseteq A' \cap B'$，但等號不一定成立。
- **導集的導集：** $A'' \subseteq A \cup A'$，其中 $A'' = (A')'$ 是導集的導集。這個包含關係說明：$A$ 的聚點的聚點本身要麼在 $A$ 中，要麼是 $A$ 的聚點。
- **$A'$ 是閉集**（見下方證明）。

### 導集是閉集

為了說明 $A'$ 永遠是閉集，需要證明其補集 $X \setminus A'$ 是開集。

取任意 $y \notin A'$。由於 $y$ 不是 $A$ 的聚點，存在開集 $V \ni y$ 使得 $(V \setminus \{y\}) \cap A = \varnothing$——即 $V \cap A \subseteq \{y\}$。

現在取 $V$ 中任意 $z \neq y$ 的點 $z$。我們要說明 $z \notin A'$，即 $z$ 不是 $A$ 的聚點。開集 $V$ 是 $z$ 的鄰域（因為 $V$ 是開集且 $z \in V$），且 $(V \setminus \{z\}) \cap A \subseteq (V \cap A) \setminus \{z\} \subseteq \{y\} \setminus \{z\} = \varnothing$（因為 $z \neq y$）。故 $z \notin A'$。

這說明每個 $y \notin A'$ 都有包含在 $X \setminus A'$ 中的開鄰域 $V \ni y$，故 $X \setminus A'$ 是開集，$A'$ 是閉集。

## 導集與閉集的刻畫

導集給出閉集的簡潔刻畫——這或許是其最重要的應用：

> **定理。** 集合 $A \subseteq X$ 是閉集，當且僅當 $A' \subseteq A$。

*證明概要。* （$\Rightarrow$）設 $A$ 是閉集，則 $X \setminus A$ 是開集。若 $x \notin A$，則 $X \setminus A$ 是包含 $x$ 的開集，且 $(X \setminus A) \cap A = \varnothing$，故 $x$ 不是 $A$ 的聚點。因此 $A' \subseteq A$。

（$\Leftarrow$）設 $A' \subseteq A$。取任意 $y \notin A$；則 $y \notin A'$，故存在開集 $U \ni y$ 使得 $U \cap A \subseteq \{y\}$。由於 $y \notin A$，故 $U \cap A = \varnothing$，即 $U \subseteq X \setminus A$。因此 $X \setminus A$ 中每個點都有包含在 $X \setminus A$ 中的開鄰域，故 $X \setminus A$ 是開集，$A$ 是閉集。$\square$

用通俗的語言說：$A$ 是閉集，恰好當它已「包含所有自身的極限行為」——$A$ 所有的聚點都已在 $A$ 之中。

## 從導集到閉包

導集是**[閉包](../closure/)** $A$ 的公式中的關鍵成分：

$$
\overline{A} = A \cup A'. \tag{2}
$$

閉包 $\overline{A}$ 是包含 $A$ 的最小閉集。公式 $(2)$ 說明：透過把 $A$ 外部 $A$ 所聚集的那些點加入 $A$，就得到了閉包。你可以用上面的定理驗證 $A \cup A'$ 是閉集：$(A \cup A')' = A' \cup A'' \subseteq A' \cup (A \cup A') = A \cup A'$，確認 $A \cup A'$ 包含自己的導集。

## 迭代導集（Cantor–Bendixson）

Cantor 引入導集正是因為*迭代*它能揭示結構。從 $A$ 出發，形成 $A' = A^{(1)}$，再形成 $A'' = A^{(2)}$，如此繼續。對 $\mathbb{R}$ 的子集，這個序列在至多可數步之後最終穩定（可能穩定到 $\varnothing$）。**Cantor–Bendixson 定理**利用此將 $\mathbb{R}$ 的任意閉子集分解為一個完全集和一個可數集，這在描述集合論中有深遠的推論。

## 摘要

- **導集** $A'$ 是 $A$ 的所有聚點的集合。
- $A'$ 不必是 $A$ 的子集，$A$ 也不必是 $A'$ 的子集。
- $A'$ 永遠是**閉集**。
- $A$ 是閉集，當且僅當 $A' \subseteq A$。
- **閉包**滿足 $\overline{A} = A \cup A'$：透過加入導集來封閉一個集合。
- 導集具有單調性，對聯集可分配；迭代它能揭示深層的結構資訊（Cantor–Bendixson）。
