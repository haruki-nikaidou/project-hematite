---
title: 卡拉泰奧多里可測性準則
summary: "卡拉泰奧多里準則（Carathéodory's criterion）篩選出外測度能成為真正（可數可加）測度的集合：當 E 能對每個測試集進行可加分割時，E 即為可測。本章節陳述該準則，證明可測集構成 σ 代數，並說明被限制的外測度是完備測度。"
prerequisites:
  - basis/math/measure/outer_measure
aliases: []
tags:
  - 測度論
updated: 2026-05-20
---

[外測度](../outer_measure/)對 $\mathbb{R}$ 的每個子集都賦予了大小，但它只具有次可加性。問題在於某些「壞」集合在邊界處洩漏測度，使可加性失敗。康斯坦丁·卡拉泰奧多里（Constantin Carathéodory，1914 年）的洞察在於：以一個單一的幾何條件刻畫「好」集合——即可測集（measurable set）——：集合 $E$ 是可測的，當且僅當它對每個測試集 $A$ 都能**完美地分割**成兩個不重疊的部分。

## 準則

設 $\mu^*$ 是集合 $X$ 上的外測度（抽象定義見[外測度](../outer_measure/)）。集合 $E \subseteq X$ 關於 $\mu^*$ 是**卡拉泰奧多里可測的**（或簡稱*可測的*），若

$$
\mu^*(A) = \mu^*(A \cap E) + \mu^*(A \cap E^c) \qquad \text{對所有 } A \subseteq X. \tag{1}
$$

$(1)$ 中的集合 $A$ 稱為**測試集（test set）**。你要問的是：$E$ 是否將 $A$ 分成兩部分，使這兩部分的外測度恰好相加等於 $\mu^*(A)$？

由於 $A = (A \cap E) \cup (A \cap E^c)$ 且兩部分不相交，次可加性始終給出

$$
\mu^*(A) \leq \mu^*(A \cap E) + \mu^*(A \cap E^c).
$$

因此準則 $(1)$ 的實質內容是反向不等式：

$$
\mu^*(A) \geq \mu^*(A \cap E) + \mu^*(A \cap E^c). \tag{1'}
$$

換言之：$E$ 在切割 $A$ 時不「製造」額外的測度。

**備註。** 該準則關於 $E$ 和 $E^c$ 是對稱的：若 $E$ 滿足 $(1)$，則 $E^c$ 也滿足（只需交換兩者的角色）。因此可測性在補集運算下保持。

## 可測集構成 σ 代數

設 $\mathcal{M}$ 為所有 $\mu^*$-可測集的集族。現在驗證 $\mathcal{M}$ 滿足 σ 代數的全部三條公理。

**公理 1：$X \in \mathcal{M}$。**
對任意測試集 $A$：$A \cap X = A$ 且 $A \cap X^c = A \cap \emptyset = \emptyset$，故 $\mu^*(A \cap X) + \mu^*(A \cap X^c) = \mu^*(A) + 0 = \mu^*(A)$。✓

**公理 2：在補集運算下封閉。**
上文已述：準則 $(1)$ 關於 $E$ 和 $E^c$ 是對稱的。✓

**公理 3：在可數聯集運算下封閉。**
這是論證的核心。下面是關鍵步驟。

*先處理有限聯集。* 設 $E, F \in \mathcal{M}$，要證明 $E \cup F \in \mathcal{M}$。對任意測試集 $A$，以 $A$ 為測試集利用 $E$ 的可測性，再以 $A \cap E^c$ 為測試集利用 $F$ 的可測性：

$$
\mu^*(A) = \mu^*(A \cap E) + \mu^*(A \cap E^c)
$$
$$
\mu^*(A \cap E^c) = \mu^*(A \cap E^c \cap F) + \mu^*(A \cap E^c \cap F^c).
$$

注意 $E^c \cap F^c = (E \cup F)^c$，故

$$
\mu^*(A) = \mu^*(A \cap E) + \mu^*(A \cap E^c \cap F) + \mu^*(A \cap (E \cup F)^c). \tag{2}
$$

由於 $A \cap (E \cup F) = (A \cap E) \cup (A \cap E^c \cap F)$ 且兩者不相交，次可加性給出 $\mu^*(A \cap (E \cup F)) \leq \mu^*(A \cap E) + \mu^*(A \cap E^c \cap F)$。代入 $(2)$：

$$
\mu^*(A) \geq \mu^*(A \cap (E \cup F)) + \mu^*(A \cap (E \cup F)^c),
$$

結合另一方向的次可加性，即證 $E \cup F \in \mathcal{M}$。由歸納法，$\mathcal{M}$ 在有限聯集下封閉。

*可數聯集。* 設 $E_1, E_2, \ldots \in \mathcal{M}$ 兩兩不相交（一般情形可化歸於此，令 $\tilde{E}_k = E_k \setminus (E_1 \cup \cdots \cup E_{k-1})$，由已建立的封閉性質，這些集合仍在 $\mathcal{M}$ 中）。令 $S_n \coloneqq \bigsqcup_{k=1}^n E_k \in \mathcal{M}$。對任意測試集 $A$ 和每個 $n$：

$$
\mu^*(A \cap S_n) = \sum_{k=1}^{n} \mu^*(A \cap E_k). \tag{3}
$$

式 $(3)$ 由對 $n$ 的歸納法得出，利用以 $A \cap S_n$ 為測試集時 $E_n$ 的可測性。現令 $S \coloneqq \bigcup_k E_k$。由於 $S_n \subseteq S$，單調性與 $(3)$ 給出：

$$
\mu^*(A \cap S) \geq \mu^*(A \cap S_n) = \sum_{k=1}^{n} \mu^*(A \cap E_k).
$$

令 $n \to \infty$，得 $\mu^*(A \cap S) \geq \sum_{k=1}^{\infty} \mu^*(A \cap E_k)$，結合次可加性：

$$
\mu^*(A \cap S) = \sum_{k=1}^{\infty} \mu^*(A \cap E_k). \tag{4}
$$

又 $S^c \subseteq S_n^c$，故 $\mu^*(A \cap S^c) \leq \mu^*(A \cap S_n^c)$。利用 $S_n$ 的可測性：

$$
\mu^*(A \cap S_n) + \mu^*(A \cap S_n^c) = \mu^*(A),
$$

故對每個 $n$，$\mu^*(A \cap S^c) \leq \mu^*(A) - \sum_{k=1}^n \mu^*(A \cap E_k)$。結合 $(4)$：

$$
\mu^*(A) \geq \mu^*(A \cap S) + \mu^*(A \cap S^c),
$$

故 $S \in \mathcal{M}$。**結論：** $\mathcal{M}$ 是 σ 代數。✓

## $\mathcal{M}$ 上的可數可加性

上述論證的真正收穫是式 $(4)$ 在 $A = X$ 時的應用：

$$
\mu^*\!\left(\bigsqcup_{k=1}^{\infty} E_k\right) = \sum_{k=1}^{\infty} \mu^*(E_k) \qquad \text{對兩兩不相交的 } E_k \in \mathcal{M}. \tag{5}
$$

這就是**可數可加性（countable additivity）**——真正測度的定義性質。限制 $\mu^* \restriction_{\mathcal{M}}$ 因此將外測度轉化為 σ 代數 $\mathcal{M}$ 上的真正測度。

## 完備性

測度空間 $(X, \mathcal{M}, \mu^*)$ 是**完備的（complete）**，若零測集的每個子集都是可測的。卡拉泰奧多里的構造自動保證了完備性。

**命題。** 若 $\mu^*(N) = 0$ 且 $A \subseteq N$，則 $A \in \mathcal{M}$。

*證明。* 對任意測試集 $T$：$T \cap A \subseteq N$，故 $\mu^*(T \cap A) \leq \mu^*(N) = 0$。又 $T \supseteq T \cap A^c$，故由單調性 $\mu^*(T \cap A^c) \leq \mu^*(T)$。因此 $\mu^*(T \cap A) + \mu^*(T \cap A^c) \leq 0 + \mu^*(T) = \mu^*(T)$，反向不等式由次可加性給出。故 $A \in \mathcal{M}$。

這個完備性在實踐中很重要：它意味著你永遠不必擔心零測集的子集「落在」σ 代數之外。

## 摘要

- **卡拉泰奧多里準則** $(1)$ 說的是：當 $E$ 對每個測試集 $A$ 進行可加分割時，$E$ 是可測的；其非平凡的內容是反向不等式 $(1')$。
- 所有可測集的集族 $\mathcal{M}$ 是一個 **σ 代數**：它包含 $X$，在補集運算下封閉（準則的對稱性），在可數聯集運算下封閉（有限聯集的論證通過上述極限論證擴展）。
- 在兩兩不相交的可測集上，外測度滿足**可數可加性**——式 $(5)$。這使 $\mu^*\restriction_{\mathcal{M}}$ 成為真正的測度。
- 所得測度空間是**完備的**：零測集的每個子集都是可測的。
- 下一步：[勒貝格測度](../lebesgue_measure/)將此機制應用於 $\mu^* = \lambda^*$（$\mathbb{R}$ 上的勒貝格外測度），從而產生 $\mathbb{R}$ 上長度的典型概念。
