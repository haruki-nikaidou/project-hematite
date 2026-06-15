---
title: ZFC 集合論
summary: "精確巡覽 ZFC 的十個公理——現代數學的標準基礎——說明樸素集合論為何失敗、每個公理如何填補特定的漏洞，以及所有數學如何從空集出發逐步建構而成。"
prerequisites: 
  - basis/math/analysis/set/set_intro
  - basis/math/analysis/set/well_order
  - basis/math/analysis/set/power_set
aliases: []
tags: ["集合論"]
updated: 2026-05-11
---

自從[集合入門](../set_intro/)以來，你一直把集合當作毫無問題的東西在使用：將一些元素寫在大括號裡、形成子集、取聯集。對日常數學而言，這完全沒問題。但當你提出一個看似簡單的問題時，它就崩潰了：*一個集合能是其自身的元素嗎？*

對這個問題用不受限的集合構成來回答，直接導致一個矛盾——不是微妙的，而是一行邏輯爆炸。**附帶選擇公理的 Zermelo–Fraenkel 集合論**，通稱 **ZFC**，是數學所採納的回應。今天，ZFC 是幾乎所有數學所依賴的標準基礎。

## 樸素集合論的困境

在**樸素集合論（naïve set theory）**中，集合是任何你能用一個性質描述的群體。對任意謂詞 $\varphi(x)$，你可以自由地形成

$$
\{x \mid \varphi(x)\}.
$$

這種無限制的自由稱為**不受限概括（unrestricted comprehension）**原則。它是不相容的。

**羅素悖論（Russell's paradox）**（1901年）是最簡單的證明。定義

$$
R \;\coloneqq\; \{x \mid x \notin x\}.
$$

$R$ 應該收集每個*不是自身成員*的集合。現在問：$R \in R$？

- 若 $R \in R$，則 $R$ 滿足定義條件 $x \notin x$，所以 $R \notin R$。矛盾。
- 若 $R \notin R$，則 $R$ *不*滿足 $x \notin x$，這意味著 $R \in R$。矛盾。

沒有一致的答案。$R$ 不能存在，這意味著不受限概括是有缺陷的。

## 公理化方法

解決方法是用一個小型、精心選擇的**公理**列表——被宣告為真的基本命題——來替代無限制的自由，並從中推導其他一切。公理必須是：

- *相容的*：它們不能導致矛盾（ZFC 被認為是相容的，儘管這無法在 ZFC 內部自己證明——哥德爾不完備定理禁止了這一點）。
- *足夠強的*：足以重建所有普通數學。

ZFC 由 Zermelo 和 Fraenkel 的**九個公理**組成——其中兩個是**公理模式（axiom schemas）**，意味著每個代表一個無限族公理，每個謂詞各一個——加上**選擇公理（Axiom of Choice）**。

## 九個 ZF 公理

### 外延公理（Extensionality）

**兩個集合當且僅當具有完全相同的元素時相等。**

$$
\forall A\;\forall B\;\bigl(\forall x\;(x \in A \leftrightarrow x \in B)\bigr) \;\Rightarrow\; A = B
$$

你已從[集合入門](../set_intro/)知道這個原則：$\{1,2,3\} = \{3,1,2\}$，因為兩者都恰好包含 $1$、$2$、$3$，與順序無關。外延公理使這成為相等的*定義*——集合完全由其成員決定，別無其他。

### 空集公理（Empty Set）

**存在一個沒有元素的集合。**

$$
\exists A\;\forall x\;(x \notin A)
$$

外延公理保證這樣的集合恰好有一個，記作 $\emptyset$。沒有這個公理，你甚至無法證明任何集合存在。

### 配對公理（Pairing）

**對任意兩個集合 $a$ 和 $b$，存在一個恰好以 $a$ 和 $b$ 為元素的集合。**

$$
\forall a\;\forall b\;\exists A\;\forall x\;\bigl(x \in A \;\leftrightarrow\; x = a \;\lor\; x = b\bigr)
$$

這為書寫**無序對（unordered pair）** $\{a, b\}$ 提供了依據。作為特殊情形，令 $a = b$ 給出單元素集 $\{a\}$。

配對公理也讓你無需任何新的原始概念就能定義**有序對（ordered pair）**。Kuratowski 編碼是：

$$
(a, b) \;\coloneqq\; \bigl\{\{a\},\;\{a, b\}\bigr\}.
$$

你可以驗證 $(a, b) = (c, d)$ 若且唯若 $a = c$ 且 $b = d$，所以這個編碼正確捕捉了順序的概念。從有序對出發，你可以在 ZFC 內部建構關係、函式和笛卡兒積。

### 聯集公理（Union）

**對任意集合的集合 $\mathcal{F}$，存在一個恰好包含 $\mathcal{F}$ 的成員的成員的集合。**

$$
\forall \mathcal{F}\;\exists A\;\forall x\;\bigl(x \in A \;\leftrightarrow\; \exists F \in \mathcal{F},\; x \in F\bigr)
$$

得到的集合是**聯集** $\bigcup \mathcal{F}$。當 $\mathcal{F} = \{A, B\}$ 時，這恢復了熟悉的 $A \cup B$。一般形式處理無限族：$\bigcup \{A_1, A_2, A_3, \ldots\} = A_1 \cup A_2 \cup A_3 \cup \cdots$。

### 冪集公理（Power Set）

**對任意集合 $a$，存在 $a$ 的所有子集的集合。**

$$
\forall a\;\exists A\;\forall x\;\bigl(x \in A \;\leftrightarrow\; x \subseteq a\bigr)
$$

這正是[冪集](../power_set/) $\mathcal{P}(a)$。冪集公理讓你能夠不斷攀升到更大的無限集合：從 $\mathbb{N}$ 出發，你可以形成 $\mathcal{P}(\mathbb{N})$，然後 $\mathcal{P}(\mathcal{P}(\mathbb{N}))$，如此等等——由康托定理，每個都嚴格大於前一個。

### 分離公理（模式）（Separation）

**給定任意集合 $a$ 和任意謂詞 $\varphi$，$a$ 中滿足 $\varphi$ 的元素所構成的子集存在。**

$$
\forall a\;\exists A\;\forall x\;\bigl(x \in A \;\leftrightarrow\; x \in a \;\land\; \varphi(x)\bigr)
$$

這是一個*模式*：集合論語言中每個謂詞 $\varphi$ 各有一個公理，一次性給出無窮多個公理。

分離公理是不受限概括的安全替代品。你可以形成 $\{x \in a \mid \varphi(x)\}$，但你必須從一個*已存在的*集合 $a$ 開始。這阻止了羅素悖論：你可以對任意固定集合 $a$ 形成 $\{x \in a \mid x \notin x\}$，但沒有「所有集合的集合」可以用作起點。矛盾消失了。

集合入門中的集合建構記號 $\{x \in S \mid P(x)\}$ 正是由這個公理來保證。

### 無限公理（Infinity）

**存在一個包含 $\emptyset$ 且在運算 $x \mapsto x \cup \{x\}$ 下封閉的集合。**

$$
\exists A\;\Bigl(\emptyset \in A \;\land\; \forall x \in A,\; x \cup \{x\} \in A\Bigr)
$$

這是保證無限集合存在的公理。集合 $A$ 必須包含以下集合鏈：

$$
\emptyset,\quad
\{\emptyset\},\quad
\bigl\{\emptyset, \{\emptyset\}\bigr\},\quad
\bigl\{\emptyset, \{\emptyset\}, \{\emptyset,\{\emptyset\}\}\bigr\},\quad \ldots
$$

這些是**馮紐曼自然數（von Neumann natural numbers）**：令

$$
0 \coloneqq \emptyset, \qquad
1 \coloneqq \{0\}, \qquad
2 \coloneqq \{0,1\}, \qquad
3 \coloneqq \{0,1,2\}, \qquad \ldots
$$

使得每個自然數*就是*所有比它小的自然數的集合。無限公理讓你能在 ZFC 內部將 $\mathbb{N}$ 作為一個完整的集合來證明其存在，而不只是作為一個非正式的概念。

### 替換公理（模式）（Replacement）

**若 $\varphi(x, y)$ 在集合 $a$ 上定義了一個函式（每個 $x \in a$ 對應唯一一個 $y$），則 $a$ 在 $\varphi$ 下的像是一個集合。**

$$
\forall a\;\Bigl[\bigl(\forall x \in a\;\exists!\, y\;\varphi(x,y)\bigr) \;\Rightarrow\; \exists B\;\forall y\;\bigl(y \in B \;\leftrightarrow\; \exists x \in a,\;\varphi(x,y)\bigr)\Bigr]
$$

與分離公理一樣，替換公理也是一個模式——每個謂詞 $\varphi$ 各一個實例。

替換公理說：任何集合在可定義函式下的像本身是一個集合。這讓你能建構像 $\{\omega, \omega+1, \omega+2, \ldots\}$（其中 $\omega$ 是第一個無限序數）這樣超出早期公理所能觸及的集合。分離公理只能將集合*縮小*；替換公理可以將它們映射到全新的物件。

### 正則公理（基礎公理）（Regularity）

**每個非空集合都包含一個與它不相交的元素。**

$$
\forall A\;\bigl(A \neq \emptyset \;\Rightarrow\; \exists x \in A,\; x \cap A = \emptyset\bigr)
$$

正則公理排除了**循環成員關係（circular membership）**。若一個集合 $a$ 包含其自身——$a \in a$——那麼單元素集 $\{a\}$ 就會違反正則公理：它的唯一元素是 $a$，但 $a \cap \{a\} = \{a\} \neq \emptyset$。更一般地，不能有無限下降鏈 $a_0 \ni a_1 \ni a_2 \ni \cdots$。

在實踐中，你幾乎永遠不會遇到違反正則公理的集合。它的主要目的是馴服集合論的宇宙，使其適合對成員關係 $\in$ 進行**良基歸納（well-founded induction）**的證明。

## 選擇公理

上述九個 ZF 公理構成系統 **ZF**。加上**選擇公理（Axiom of Choice, AC）**得到完整系統 **ZFC**。

**對任意非空集合的族 $\mathcal{F}$，存在一個函式，從 $\mathcal{F}$ 的每個成員中各選取一個元素。**

$$
\forall \mathcal{F}\;\Bigl[
  \bigl(\forall F \in \mathcal{F},\; F \neq \emptyset\bigr)
  \;\Rightarrow\;
  \exists f\colon\mathcal{F} \to \bigcup\mathcal{F},\;\;
  \forall F \in \mathcal{F},\; f(F) \in F
\Bigr]
$$

函式 $f$ 稱為 $\mathcal{F}$ 的**選擇函式（choice function）**。

對*有限*族，從每個集合中選取一個元素是平凡的——你只需有限步逐一完成。這個公理對*無限*族是必要的，在那裡你無法在沒有系統規則的情況下進行無窮多次選擇。AC 斷言即使沒有明確的規則，這樣的函式也存在。

### 為何 AC 獨樹一幟

Kurt Gödel 在 1938 年證明了 AC 與 ZF *相容*：只要 ZF 本身是相容的，你就無法從 ZF + AC 推導出矛盾。Paul Cohen 在 1963 年證明了 AC 獨立於 ZF：你也無法從 ZF 單獨證明 AC。這兩個結果合在一起表明，AC 是一個真正的額外假設，而非其他九個公理的推論。

這種獨立性就是為什麼數學文獻有時用特殊符號標記需要 AC 的定理，以及為什麼一些數學家刻意在沒有 AC 的 ZF 中工作，以觀察哪些東西會崩潰。

### AC 的等價命題

在 ZF 框架內，許多原則被證明與 AC 等強——各自蘊含並被 AC 蘊含：

| 原則 | 非正式表述 |
|-----------|-------------------|
| [良序定理](../well_order/) | 每個集合都能被良序 |
| Zorn 引理 | 每個鏈都有上界的偏序集有極大元素 |
| Tychonoff 定理 | 緊拓樸空間的任意乘積是緊的 |
| 每個向量空間都有基 | 每個向量空間（包括無限維的）都有 Hamel 基 |

你已在[良序的檢查點](../well_order/)中看到了良序定理。在這些等價命題中，**Zorn 引理**是你在代數和分析中最常遇到的，儘管它與「做選擇」的聯繫在表面上不那麼直接。

## ZFC 能構建什麼

從十個公理和 $\emptyset$ 出發，你可以按系統的順序建構所有標準數學：

1. **自然數** $\mathbb{N}$——透過無限公理中的馮紐曼編碼。
2. **整數** $\mathbb{Z}$——作為 $\mathbb{N}^2$ 中有序對 $(a, b)$（表示 $a - b$）的等價類。
3. **有理數** $\mathbb{Q}$——作為 $\mathbb{Z} \times (\mathbb{Z} \setminus \{0\})$ 中有序對 $(p, q)$（表示 $p/q$）的等價類。
4. **實數** $\mathbb{R}$——透過 Dedekind 分割（$\mathbb{Q}$ 的子集）或 Cauchy 序列的等價類。
5. **複數** $\mathbb{C}$——作為具有適當運算的實數對。
6. **函式與關係** $\mathbb{C}$——作為 Kuratowski 有序對的集合。
7. **序數（ordinals）**——作為表示每種可能序型的標準良序集。
8. **基數（cardinals）**——衡量無限集合的「大小」，構成層級 $\aleph_0 < \aleph_1 < \aleph_2 < \cdots$。

你在分析、代數、拓樸或電腦科學中可能遇到的每個數學物件，原則上都可以化簡為用 ZFC 公理從 $\emptyset$ 建構的純集合。

## 摘要

- **樸素集合論**是不相容的：不受限概括導致**羅素悖論**（$R = \{x \mid x \notin x\}$ 產生 $R \in R \leftrightarrow R \notin R$）。
- **ZFC** 用十個明確的公理替代了無限制的自由：九個來自 Zermelo–Fraenkel 加上選擇公理。
- **外延公理**以成員關係定義集合相等；**空集公理**保證 $\emptyset$ 存在；**配對公理**建構 $\{a, b\}$ 和 Kuratowski 有序對。
- **聯集公理**收集集合族的元素；**冪集公理**產生 $\mathcal{P}(a)$ 並使攀升到更大無窮成為可能。
- **分離公理**（模式）是不受限概括的安全替代品——你只能從*已存在的*集合中劃出子集，阻止了羅素悖論。
- **無限公理**透過馮紐曼編碼 $n = \{0, 1, \ldots, n-1\}$ 在集合論內部構建 $\mathbb{N}$。
- **替換公理**（模式）在可定義函式下將集合映射到新的集合，超出分離公理單獨所能建構的範圍。
- **正則公理**禁止循環成員關係鏈，並支持對 $\in$ 的良基歸納。
- **選擇公理**斷言任意非空集合族的選擇函式存在。它獨立於 ZF，等價於良序定理和 Zorn 引理。
- 從這十個公理和 $\emptyset$ 出發，所有標準數學——$\mathbb{N}$、$\mathbb{Z}$、$\mathbb{Q}$、$\mathbb{R}$、$\mathbb{C}$、函式、序數、基數——都能被建構出來。
