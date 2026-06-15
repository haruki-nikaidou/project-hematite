---
title: 映射
summary: "介紹集合之間的映射，涵蓋定義域、到達域、像、原像、單射性、滿射性、雙射性、複合與逆映射。"
prerequisites: 
  - basis/math/analysis/set/set_intro
aliases: []
tags: ["集合論"]
updated: 2026-05-11
---

映射（map）是一個規則的精確數學名稱，它將一個集合的每個元素送到另一個集合的恰好一個元素。你在程式語言中寫的每個函式，在這個意義上都是一個映射。熟悉正式定義——以及圍繞它的詞彙——將開啟現代數學的大部分領域。

## 定義

設 $A$ 和 $B$ 為集合。從 $A$ 到 $B$ 的**映射** $f$，記作

$$
f \colon A \to B,
$$

是一個規則，對 $A$ 中的每個元素 $a \in A$ 指定恰好一個元素 $f(a) \in B$。

- $A$ 是 $f$ 的**定義域（domain）**。
- $B$ 是 $f$ 的**到達域（codomain）**。
- $f(a)$ 是 $a$ 在 $f$ 下的**像（image）**（也稱為 $f$ 在 $a$ 處的*值*）。

記號 $a \mapsto f(a)$（讀作「$a$ 映射到 $f(a)$」）指定 $f$ 對單一元素的作用。完整的映射規範結合兩者：

$$
f \colon A \to B, \quad a \mapsto f(a).
$$

**範例。** 整數上的平方映射：

$$
f \colon \mathbb{Z} \to \mathbb{Z}, \quad n \mapsto n^2.
$$

此處 $f(3) = 9$，$f(-2) = 4$，$f(0) = 0$。

> **術語說明。** 在大多數數學中，*map*、*function* 和 *mapping* 這三個詞可以互換使用。在分析學中，「function」通常隱含連續性的概念，而「map」是中性的通用術語。

## 集合的像與原像

你可以將映射從單個元素推廣到整個子集。

子集 $S \subseteq A$ 在 $f$ 下的**像**是 $f$ 在 $S$ 上產生的所有值的集合：

$$
f(S) \;\coloneqq\; \{f(a) \mid a \in S\} \;\subseteq\; B.
$$

整個定義域的像 $f(A)$ 稱為 $f$ 的**值域（range）**。值域永遠是到達域的子集——但不一定等於到達域。

子集 $T \subseteq B$ 的**原像（preimage）**（或**逆像**）是 $A$ 中映射進 $T$ 的所有元素的集合：

$$
f^{-1}(T) \;\coloneqq\; \{a \in A \mid f(a) \in T\} \;\subseteq\; A.
$$

注意 $f^{-1}(T)$ 對任意映射 $f$ 都有定義——它不需要 $f$ 有逆映射。

## 單射、滿射、雙射

這三個形容詞描述映射如何將其定義域與到達域聯繫起來。

### 單射（一對一）

映射 $f \colon A \to B$ 是**單射（injective）**，若不同的輸入永遠產生不同的輸出：

$$
f(a_1) = f(a_2) \;\Rightarrow\; a_1 = a_2. \tag{1}
$$

等價地（逆否命題）：$a_1 \neq a_2 \Rightarrow f(a_1) \neq f(a_2)$。

單射將 $A$ 嵌入 $B$ 內而不產生碰撞。

**範例。** $f \colon \mathbb{Z} \to \mathbb{Z},\; n \mapsto 2n$ 是單射：若 $2n_1 = 2n_2$ 則 $n_1 = n_2$。

**反例。** $g \colon \mathbb{Z} \to \mathbb{Z},\; n \mapsto n^2$ *不是*單射：$g(2) = g(-2) = 4$ 但 $2 \neq -2$。

### 滿射（映成）

映射 $f \colon A \to B$ 是**滿射（surjective）**，若 $B$ 的每個元素都被 $A$ 的至少一個元素映到：

$$
\forall b \in B,\;\exists a \in A \text{ such that } f(a) = b. \tag{2}
$$

等價地，值域等於整個到達域：$f(A) = B$。

**範例。** $f \colon \mathbb{Z} \to \mathbb{Z},\; n \mapsto n + 1$ 是滿射：對任意 $b \in \mathbb{Z}$，取 $a = b - 1$。

**反例。** $g \colon \mathbb{Z} \to \mathbb{Z},\; n \mapsto 2n$ *不是*滿射：$1$ 永遠不在值域中，因為 $2n = 1$ 沒有整數解。

### 雙射

既是單射又是滿射的映射是**雙射（bijective）**。雙射將 $A$ 的每個元素與 $B$ 的恰好一個元素配對，$B$ 中沒有元素被遺漏，也沒有被重複。

雙射是集合之間「相同大小」的正確概念。兩個集合 $A$ 和 $B$ 有相同的基數，若且唯若存在雙射 $f \colon A \to B$。這個定義對無限集合也適用。

## 恆等映射

對任意集合 $A$，**恆等映射（identity map）** $\mathrm{id}_A \colon A \to A$ 定義為

$$
\mathrm{id}_A(a) \;\coloneqq\; a \quad \text{for all } a \in A.
$$

它顯然是雙射，並充當複合的中性元素。

## 複合

給定映射 $f \colon A \to B$ 和 $g \colon B \to C$，其**複合（composition）** $g \circ f \colon A \to C$ 定義為

$$
(g \circ f)(a) \;\coloneqq\; g(f(a)).
$$

記號從右向左讀：先套用 $f$，再套用 $g$。型別必須對齊——$f$ 的到達域必須等於 $g$ 的定義域。

複合滿足：
- **結合律：** $(h \circ g) \circ f = h \circ (g \circ f)$，只要型別匹配。
- **恆等律：** $f \circ \mathrm{id}_A = f$ 且 $\mathrm{id}_B \circ f = f$。

單射的複合是單射；滿射的複合是滿射；雙射的複合是雙射。

## 逆映射

若 $f \colon A \to B$ 是雙射，其**逆映射（inverse）** $f^{-1} \colon B \to A$ 是滿足

$$
f^{-1} \circ f = \mathrm{id}_A \qquad \text{and} \qquad f \circ f^{-1} = \mathrm{id}_B
$$

的唯一映射。具體地，$f^{-1}(b)$ 是 $A$ 中滿足 $f(a) = b$ 的唯一元素 $a$。

一個映射有逆映射，若且唯若它是雙射。這就是雙射也被稱為**可逆映射**的原因。

## 摘要

- **映射** $f \colon A \to B$ 將**定義域** $A$ 的每個元素指定到**到達域** $B$ 的恰好一個元素。
- $f(a) \in B$ 是 $a$ 的**像**；集合 $f(A)$ 是 $f$ 的**值域**（到達域的子集）。
- $f^{-1}(T)$ 是 $T \subseteq B$ 的**原像**，對任意映射都有定義。
- **單射** $(1)$：不同輸入給出不同輸出——無碰撞。
- **滿射** $(2)$：到達域的每個元素都被映到——值域充滿 $B$。
- **雙射**：兩者兼具；映射可逆，並見證 $|A| = |B|$。
- **複合** $g \circ f$ 先套用 $f$ 再套用 $g$；它是結合的，並保持單射性／滿射性／雙射性。
- 雙射有唯一的**逆映射** $f^{-1} \colon B \to A$。
