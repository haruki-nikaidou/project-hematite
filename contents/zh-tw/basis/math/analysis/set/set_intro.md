---
title: 集合入門
summary: "精確介紹集合——數學的通用語言——涵蓋記號、元素關係、子集、核心運算與基數。"
prerequisites: []
aliases: []
tags: ["集合論"]
updated: 2026-05-11
---

集合（set）是幾乎所有現代數學的基礎。函式、數列、機率空間，乃至自然數本身——這些都最終以集合來定義。在你能夠閱讀或書寫嚴謹的數學之前，必須先熟練掌握集合。

## 什麼是集合？

**集合**是由不同物件組成的無序群體。其中包含的物件稱為**元素（element）**（或**成員**）。

描述一個集合最直接的方式，是將其元素列在大括號內：

$$
A = \{1,\; 2,\; 3\}
$$

有兩件事要記住：

- **順序無關。** $\{1, 2, 3\}$ 與 $\{3, 1, 2\}$ 是相同的集合。
- **重複忽略不計。** $\{1, 1, 2, 3\}$ 與 $\{1, 2, 3\}$ 是相同的集合。

## 元素關係

符號 $\in$ 表示「是……的元素」，其否定 $\notin$ 表示「不是……的元素」。

$$
2 \in \{1, 2, 3\} \qquad 5 \notin \{1, 2, 3\}
$$

## 標準數集

某些數的集合出現得如此頻繁，以至於有專用符號：

| 符號 | 名稱 | 元素 |
|--------|------|----------|
| $\mathbb{N}$ | 自然數 | $0, 1, 2, 3, \dots$ |
| $\mathbb{Z}$ | 整數 | $\dots, -2, -1, 0, 1, 2, \dots$ |
| $\mathbb{Q}$ | 有理數 | $\tfrac{1}{2},\; -\tfrac{3}{4},\; 7,\; \dots$ |
| $\mathbb{R}$ | 實數 | $\pi,\; \sqrt{2},\; -1.5,\; \dots$ |
| $\mathbb{C}$ | 複數 | $1 + 2i,\; -i,\; \dots$ |

> **慣例：** $0$ 是否屬於 $\mathbb{N}$ 因作者而異。本系列中，$0$ 是自然數。

## 集合建構記號

列舉元素對小集合可行，但大多數有趣的集合太大——或是無限的——無法明確列出。**集合建構記號（set-builder notation）**讓你透過元素必須滿足的性質來描述集合：

$$
\{x \in \mathbb{R} \mid x > 0\}
$$

讀作：「$\mathbb{R}$ 中所有 $x > 0$ 的 $x$ 所構成的集合」——即正實數。豎線 $\mid$ 表示「使得」，有時也用冒號代替：$\{x \in \mathbb{R} : x > 0\}$。

更一般地：

$$
\{x \in S \mid P(x)\}
$$

表示 $S$ 中所有使謂詞 $P$ 成立的元素所構成的子集。

## 空集

**空集** $\emptyset$（也寫作 $\{\}$）是唯一不包含任何元素的集合。對每個物件 $x$，都有 $x \notin \emptyset$。

空集在集合論中的結構角色，如同 $0$ 在算術中的角色。

## 子集

集合 $A$ 是 $B$ 的**子集（subset）**，記作 $A \subseteq B$，若 $A$ 的每個元素也是 $B$ 的元素：

$$
A \subseteq B \;\coloneqq\; \forall x,\quad x \in A \;\Rightarrow\; x \in B
$$

若 $A \subseteq B$ 且 $A \neq B$，則 $A$ 是 $B$ 的**真子集（proper subset）**，記作 $A \subsetneq B$。

幾個值得記住的事實：
- 對每個集合 $A$，$\emptyset \subseteq A$。
- 對每個集合 $A$，$A \subseteq A$。
- $\mathbb{N} \subsetneq \mathbb{Z} \subsetneq \mathbb{Q} \subsetneq \mathbb{R} \subsetneq \mathbb{C}$。

## 集合相等

兩個集合**相等**當且僅當它們包含完全相同的元素。證明 $A = B$ 的標準方法是證明相互包含：

$$
A = B \;\iff\; A \subseteq B \;\text{ and }\; B \subseteq A
$$

這意味著集合完全由其元素決定——與你如何寫出這個集合無關。

## 核心集合運算

給定集合 $A$ 和 $B$，可以透過下列運算形成新的集合。

### 聯集

**聯集（union）** $A \cup B$ 收集屬於 $A$、$B$ 或兩者的每個元素：

$$
A \cup B \;\coloneqq\; \{x \mid x \in A \text{ or } x \in B\}
$$

### 交集

**交集（intersection）** $A \cap B$ 只保留同時屬於 $A$ 和 $B$ 的元素：

$$
A \cap B \;\coloneqq\; \{x \mid x \in A \text{ and } x \in B\}
$$

當 $A \cap B = \emptyset$ 時，這兩個集合稱為**不相交（disjoint）**。

### 差集

**差集（set difference）** $A \setminus B$（讀作「$A$ 減去 $B$」）包含 $A$ 中不屬於 $B$ 的元素：

$$
A \setminus B \;\coloneqq\; \{x \mid x \in A \text{ and } x \notin B\}
$$

### 補集

當所有討論的集合都包含在一個固定的**宇集（universal set）** $U$ 中時，$A$ 的**補集（complement）**是 $U$ 中不屬於 $A$ 的一切：

$$
A^c \;\coloneqq\; U \setminus A \;=\; \{x \in U \mid x \notin A\}
$$

## 基數

有限集合 $A$ 的**基數（cardinality）**，記作 $|A|$，是其包含的元素個數：

$$
|\{a, b, c\}| = 3, \qquad |\emptyset| = 0
$$

對於無限集合——如 $\mathbb{N}$ 或 $\mathbb{R}$——基數的概念仍然有意義，但需要更多謹慎處理。你將在後續的檢查點中接觸到無限基數的完整理論。

## 摘要

- **集合**是由不同物件組成的無序群體；用 $\{a, b, c\}$ 或集合建構記號 $\{x \in S \mid P(x)\}$ 來表示。
- $x \in A$ 表示 $x$ 屬於 $A$；$x \notin A$ 表示不屬於。
- **空集** $\emptyset$ 沒有元素，且是每個集合的子集。
- $A \subseteq B$ 若且唯若 $A$ 的每個元素都在 $B$ 中；$A = B$ 若且唯若 $A \subseteq B$ 且 $B \subseteq A$。
- 核心運算：**聯集**（$A \cup B$）、**交集**（$A \cap B$）、**差集**（$A \setminus B$）、**補集**（$A^c$）。
- **基數** $|A|$ 計算集合中元素的個數。
