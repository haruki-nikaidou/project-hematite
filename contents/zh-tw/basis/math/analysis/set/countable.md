---
title: 可數集合
summary: "介紹可數集合——說明雙射如何為無限集合定義基數、正式定義可數性，並透過包括整數與有理數在內的明確範例建立直覺。"
prerequisites: 
  - basis/math/analysis/set/set_intro
  - elementry/math/peano_axioms
aliases: []
tags: ["集合論"]
updated: 2026-05-11
---

[set_intro](../set_intro/) 告訴你，有限集合的**基數** $|A|$ 是在計算其元素個數。但對 $\mathbb{N}$、$\mathbb{Z}$ 或 $\mathbb{Q}$ 這些無窮無盡的集合，「大小」究竟意味著什麼？值得注意的是，並非所有無限集合的大小都相同。可數性（countability）是衡量和比較無限集合的第一個——也是最具體的——工具。

## 用雙射比較大小

要比較兩個集合，你需要一種不需要計數就能配對其元素的方法。這個想法由兩種特殊的映射來捕捉。（映射的完整處理在[映射](../map/)中；此處我們只介紹入門所需的部分。）

**映射** $f \colon A \to B$ 將 $A$ 中的每個元素 $a \in A$ 指定到恰好一個元素 $f(a) \in B$。當不同輸入永遠產生不同輸出時，映射是**單射（injective）**（或*一對一*，記作 $f \colon A \hookrightarrow B$）：

$$
f(a_1) = f(a_2) \;\Rightarrow\; a_1 = a_2.
$$

可以將單射想像成一種嵌入：$A$ 的每個元素在 $B$ 中都有自己獨一無二的位置，$A$ 的沒有兩個元素共享同一個位置。

當映射是單射*且* $B$ 的每個元素都恰好是某個 $A$ 元素的像時，映射是**雙射（bijective）**的。**雙射**是 $A$ 與 $B$ 之間完美的一一配對，兩側都沒有剩餘。

雙射給我們提供了基數相等的定義，對任意兩個集合——有限或無限——都適用：

$$
|A| = |B| \;\coloneqq\; \exists \text{ a bijection } f \colon A \to B. \tag{1}
$$

對有限集合，$(1)$ 與普通計數一致。令人驚訝的是，$(1)$ 對無限集合可以產生真正違反直覺的結果——這些結果你將在本文其餘部分加以解開。

## 可數的含義

回想[皮亞諾公理](/en/cp/elementry/math/peano_axioms/)中，自然數 $\mathbb{N} = \{0, 1, 2, 3, \ldots\}$ 由後繼函式建構而來。我們以 $\mathbb{N}$ 作為衡量無限集合的標準。

集合 $A$ 是基數為 $n$（某個 $n \in \mathbb{N}$）的**有限集合**，若存在雙射 $A \to \{0, 1, \ldots, n-1\}$。這與[set_intro](../set_intro/)中的基數定義一致。

集合 $A$ 是**可數無限（countably infinite）**的，若存在雙射

$$
f \colon \mathbb{N} \to A. \tag{2}
$$

雙射 $(2)$ 恰好是 $A$ 的每個元素的完整、不重複的列表：

$$
a_0 \;\coloneqq\; f(0), \quad
a_1 \;\coloneqq\; f(1), \quad
a_2 \;\coloneqq\; f(2), \quad \ldots
$$

每個元素恰好出現一次。所以*可數無限*字面意思是：你可以將所有元素排列成一個由 $\mathbb{N}$ 索引的無限序列 $a_0, a_1, a_2, \ldots$。

集合是**可數的（countable）**，若它是有限的或可數無限的。不可數的集合是**不可數的（uncountable）**——你將在[不可數集合](../uncountable/)中遇到第一個具體例子。

有一個方便的等價表述，通常更易於應用：

> **命題。** 非空集合 $A$ 是可數的，若且唯若存在單射 $A \hookrightarrow \mathbb{N}$。

*為何有效。* 若 $A$ 是可數無限的，雙射 $\mathbb{N} \to A$ 的逆本身是一個雙射——特別是一個單射——$A \hookrightarrow \mathbb{N}$。若 $A$ 是基數為 $n$ 的有限集合，將雙射 $A \to \{0, \ldots, n-1\}$ 與包含映射 $\{0, \ldots, n-1\} \hookrightarrow \mathbb{N}$ 複合。反之，給定任意單射 $g \colon A \hookrightarrow \mathbb{N}$，將 $g(A)$ 的元素按升序列出；該排序產生一個從 $\mathbb{N}$（或一個有限前段）到 $A$ 的雙射。

## 可數集合的範例

### $\mathbb{N}$ 本身

恆等映射 $\mathrm{id} \colon \mathbb{N} \to \mathbb{N}$，$n \mapsto n$，顯然是雙射。所以 $\mathbb{N}$ 根據定義是可數無限的——這是基準情形。

### 整數 $\mathbb{Z}$

乍看之下，$\mathbb{Z} = \{\ldots, -2, -1, 0, 1, 2, \ldots\}$ 似乎比 $\mathbb{N}$ 「大一倍」，因為它向兩個方向延伸。定義交織映射

$$
f \colon \mathbb{N} \to \mathbb{Z}, \qquad
f(n) \;\coloneqq\;
\begin{cases}
\phantom{-}n/2 & \text{if } n \text{ is even,} \\[4pt]
-(n+1)/2 & \text{if } n \text{ is odd.}
\end{cases}
\tag{3}
$$

這個映射交替穿越非負整數和負整數：

| $n$ | $0$ | $1$ | $2$ | $3$ | $4$ | $5$ | $6$ | $7$ | $\cdots$ |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| $f(n)$ | $0$ | $-1$ | $1$ | $-2$ | $2$ | $-3$ | $3$ | $-4$ | $\cdots$ |

每個整數恰好出現一次，所以 $f$ 是雙射，$|\mathbb{Z}| = |\mathbb{N}|$。整數集合儘管向兩個方向跨越整條數線，也不比自然數更大。

### 乘積 $\mathbb{N} \times \mathbb{N}$

集合 $\mathbb{N} \times \mathbb{N} = \{(m, n) \mid m, n \in \mathbb{N}\}$ 形成一個有序對的無限二維網格。**對角線遍歷（diagonal traversal）**沿著 $m + n = k$ 的反對角線分組，依次訪問每個格點：

$$
(0,0) \;\to\; (1,0) \;\to\; (0,1) \;\to\; (2,0) \;\to\; (1,1) \;\to\; (0,2) \;\to\; (3,0) \;\to\; \cdots
$$

**康托配對函式（Cantor pairing function）**以封閉公式來編碼這個遍歷：

$$
\pi \colon \mathbb{N} \times \mathbb{N} \to \mathbb{N}, \qquad
\pi(m, n) \;\coloneqq\; \frac{(m+n)(m+n+1)}{2} + m. \tag{4}
$$

三角數項 $\frac{(m+n)(m+n+1)}{2}$ 計算所有嚴格靠前的對角線上的配對數；加上 $m$ 給出 $(m, n)$ 在其自身對角線上的偏移量。你可以驗證 $\pi$ 是雙射，所以 $|\mathbb{N} \times \mathbb{N}| = |\mathbb{N}|$。無限多個無限列折疊成一個單一序列。

### 有理數 $\mathbb{Q}$

將每個正分數 $p/q$（其中 $p, q \geq 1$）排列在網格中：$p$ 沿一個軸，$q$ 沿另一個軸。套用與上面相同的對角線遍歷，但跳過 $\gcd(p, q) > 1$ 的條目，使每個有理數恰好以最簡形式出現一次。然後在前面加上 $0$，並使用與 $\mathbb{Z}$ 相同的技巧交織負數。每個有理數最終出現在這個列表中，所以 $\mathbb{Q}$ 是可數無限的——儘管它在數線上看起來比 $\mathbb{N}$ 密集得多。

## 兩個關鍵封閉性質

### 可數集合的子集是可數的

**定理。** 若 $A$ 是可數的且 $B \subseteq A$，則 $B$ 是可數的。

*直覺。* 包含映射 $\iota \colon B \hookrightarrow A$ 是單射。將它與單射 $A \hookrightarrow \mathbb{N}$（因為 $A$ 是可數的而存在）複合，得到單射 $B \hookrightarrow \mathbb{N}$，所以 $B$ 由上述命題是可數的。

這個定理意味著，每當你找到一個可數的「容器」，其中的每個子集合也自動是可數的。

### 可數個可數集合的聯集是可數的

**定理。** 若 $A_0, A_1, A_2, \ldots$ 是可數集合的可數族，則 $\bigcup_{k=0}^{\infty} A_k$ 也是可數的。

*直覺。* 將每個 $A_k$ 的元素列在一列（若需要可以用空格補充有限列）。結果是一個無限網格——每個集合一列——就像 $\mathbb{N} \times \mathbb{N}$。套用對角線遍歷，跳過已見過的元素以避免重複。$\bigcup_k A_k$ 的每個元素都會被訪問，所以聯集是可數的。

一個引人注目的應用：**代數數（algebraic numbers）**——整係數多項式的根——構成一個可數集合。存在可數個這樣的多項式（每個多項式是整係數的有限列表，反覆應用康托配對函式 $(4)$ 表明整數的有限列表是可數的），且每個多項式只有有限多個根。所以代數數是有限集合的可數聯集，因此是可數的。

## 摘要

- **基數相等** $|A| = |B|$ 由存在雙射 $A \to B$ 來定義；這個定義從有限集合自然推廣到無限集合——見方程式 $(1)$。
- **映射** $f \colon A \to B$ 是**單射**（$A \hookrightarrow B$），若不同輸入給出不同輸出；是**雙射**，若它是單射且 $B$ 的每個元素恰好被映到一次。完整理論在[映射](../map/)中。
- 集合是**可數無限**的，若存在雙射 $\mathbb{N} \to A$——等價地，其元素可以列為 $a_0, a_1, a_2, \ldots$，無遺漏無重複。
- 集合是**可數的**，若它是有限的或可數無限的；否則是**不可數的**。
- 等價判準：非空集合 $A$ 是可數的，若且唯若存在單射 $A \hookrightarrow \mathbb{N}$。
- 典型可數集合：$\mathbb{N}$（平凡）、$\mathbb{Z}$（交織雙射 $(3)$）、$\mathbb{N} \times \mathbb{N}$（康托配對函式 $(4)$）和 $\mathbb{Q}$（跳過的對角線遍歷）。
- 可數集合的**子集**是可數的；可數集合的**可數聯集**是可數的——代數數是一個值得注意的推論。
- 不是每個無限集合都是可數的。前往[不可數集合](../uncountable/)瞭解為何 $\mathbb{R}$ 嚴格大於 $\mathbb{N}$。
