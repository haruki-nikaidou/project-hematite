---
title: 實數（由有理數閉包構造）
summary: "透過填補有理數的空隙來定義實數：將有理數的柯西數列歸入等價類，從而構成 R——唯一的完備有序體，其中 Q 是稠密的。"
prerequisites: 
  - basis/math/topology/closure
  - basis/math/analysis/limit
  - elementry/math/rational_numbers
aliases: []
tags: ["數", "分析學"]
updated: 2026-05-12
---

每個趨近 $\sqrt{2}$ 的有理逼近數列都能任意接近「正確答案」，卻永遠無法落在上面。[有理數](../../../../elementry/math/rational_numbers/) $\mathbb{Q}$ 在那裡有一個空隙——以及在每個無理數應在之處都有空隙。實數（real number） $\mathbb{R}$ 是封堵所有空隙後得到的結果：即形成 $\mathbb{Q}$ 的**閉包（closure）**。

## $\mathbb{Q}$ 中的空隙問題

考慮數列

$$
1,\; 1.4,\; 1.41,\; 1.414,\; 1.4142,\;\ldots
$$

其第 $n$ 項是 $\sqrt{2}$ 截斷至 $n$ 位小數後的小數展開。每一項都是有理數，且各項越來越緊密地聚集——然而沒有任何有理數是它們的極限。可以證明不存在分數 $p/q$ 滿足 $(p/q)^2 = 2$，故 $\sqrt{2} \notin \mathbb{Q}$，這個數列在 $\mathbb{Q}$ 中沒有歸宿。

同樣的現象也出現在 $\sqrt{3}$、$\pi$、$e$ 以及無數其他目標上：你可以用有理數趨近它們，卻永遠無法抵達。為了建立一個讓每個這樣的數列都有歸宿的數系，你需要一種精確的方式來表達「收斂到某物」，即使你還不知道那個某物是什麼。

## 柯西數列：無需命名目的地的收斂

[極限的定義](../limit/)要求你預先命名極限 $L$。當 $L$ 正是你試圖構造的未知數時，這是不可能的。取而代之，使用一個僅涉及各項本身的條件。

有理數數列 $(q_n)$ 是一個**柯西數列（Cauchy sequence）**，若對每個 $\varepsilon > 0$ 都存在 $N \in \mathbb{N}$ 使得

$$
m,\; n \geq N \implies |q_m - q_n| < \varepsilon. \tag{1}
$$

收斂問詢「各項是否最終在某個固定點 $L$ 附近停留？」，而柯西條件只問「各項是否最終彼此靠近？」——不需要外部目標。

**事實。** 每個收斂數列都是柯西數列。*證明提要：*若 $q_n \to L$，則對足夠大的 $m$ 和 $n$，$|q_m - L|$ 和 $|q_n - L|$ 都很小；三角不等式給出 $|q_m - q_n| \leq |q_m - L| + |L - q_n|$，也很小。$\square$

逆命題在 $\mathbb{Q}$ 中不成立：數列 $1, 1.4, 1.41, \ldots$ 是柯西數列，卻在 $\mathbb{Q}$ 中無處收斂。有理數並不*完備*。

## 核心思想：$\mathbb{R} = \overline{\mathbb{Q}}$

由[閉包](../../topology/closure/)的知識可知，集合 $A$ 的閉包 $\overline{A}$ 等於 $A$ 連同其所有聚點。在度量空間中，$x$ 是 $A$ 的聚點當 $A$ 中某個數列收斂到 $x$ 時。

對 $\mathbb{Q}$ 取閉包意味著添入所有有理數列能收斂到的點。目標是

$$
\mathbb{R} \;\coloneqq\; \overline{\mathbb{Q}}. \tag{2}
$$

這裡有一個微妙之處：取閉包需要一個包含它的環境空間，但那個環境空間正是你試圖構造的東西。解決方法是從柯西數列出發具體構造 $\mathbb{R}$，然後事後驗證 $(2)$ 成立。

## 構造 $\mathbb{R}$

### 柯西數列的等價類

設 $\mathcal{C}$ 是 $\mathbb{Q}$ 中所有柯西數列的集合。稱兩個數列 $(p_n), (q_n) \in \mathcal{C}$ **等價**，記作 $(p_n) \sim (q_n)$，若

$$
|p_n - q_n| \to 0 \quad \text{as } n \to \infty. \tag{3}
$$

直觀地說：它們瞄準同一個目標。條件 $(3)$ 是一個等價關係（它是自反的、對稱的、傳遞的——逐一驗證即可），故它將 $\mathcal{C}$ 劃分為不相交的等價類。定義

$$
\mathbb{R} \;\coloneqq\; \mathcal{C}/{\sim}.
$$

每個類 $[(q_n)]$ 代表其中所有數列共同指向的唯一「預期極限」。$1, 1.4, 1.41, \ldots$ 所在的類就是我們將要稱為 $\sqrt{2}$ 的那個。常數數列 $(3, 3, 3, \ldots)$ 所在的類就是有理數 $3$。

### 將 $\mathbb{Q}$ 嵌入 $\mathbb{R}$

將每個有理數 $q$ 送到常數數列所在的類：

$$
\iota \colon \mathbb{Q} \to \mathbb{R}, \quad q \;\mapsto\; [(q,\, q,\, q,\, \ldots)].
$$

兩個不同的有理數給出不等價的常數數列，故 $\iota$ 是單射的：$\mathbb{Q}$ 無衝突地嵌入 $\mathbb{R}$。從現在起，將每個 $q \in \mathbb{Q}$ 與 $\iota(q) \in \mathbb{R}$ 等同，記 $\mathbb{Q} \subset \mathbb{R}$。

### 算術運算與序關係

運算在代表元上逐項定義：

$$
[(p_n)] + [(q_n)] \;\coloneqq\; [(p_n + q_n)],
\qquad
[(p_n)] \cdot [(q_n)] \;\coloneqq\; [(p_n \cdot q_n)]. \tag{4}
$$

兩者都定義良好：柯西數列的逐項和與積仍是柯西數列，且將代表元換成等價的數列不改變結果的類。除法類似地定義，排除各項趨向 $0$ 的那個類。有了這些運算，$\mathbb{R}$ 是一個擴展 $\mathbb{Q}$ 的**體（field）**。

當 $q_n - p_n \geq \delta$（對某個固定 $\delta > 0$ 以及足夠大的所有 $n$）時，聲明 $[(p_n)] < [(q_n)]$。這使 $\mathbb{R}$ 成為一個**有序體（ordered field）**，其序關係是 $\mathbb{Q}$ 上序關係的延伸。

### $\mathbb{R}$ 上的度量

設 $|[(q_n)]| \coloneqq [(|q_n|)]$，$d(x, y) \coloneqq |x - y|$。這為 $\mathbb{R}$ 提供了度量空間結構，延伸了 $\mathbb{Q}$ 上的度量空間結構。

## $\mathbb{R}$ 的關鍵性質

### $\mathbb{Q}$ 是稠密的：$\overline{\mathbb{Q}} = \mathbb{R}$

**定理。** 每個實數都是某個有理數列的極限。

*證明。* 設 $x = [(q_n)] \in \mathbb{R}$。將每個有理數 $q_n$ 透過 $\iota$ 嵌入 $\mathbb{R}$，視為 $\mathbb{R}$ 的元素。固定 $\varepsilon > 0$。柯西條件 $(1)$ 給出 $N \in \mathbb{N}$ 使得對所有 $m, n \geq N$ 有 $|q_m - q_n| < \varepsilon$。對任意固定的 $n \geq N$，實數 $|x - q_n| = [(|q_m - q_n|)_m]$ 滿足對每個 $m \geq N$ 有 $|q_m - q_n| < \varepsilon$，故——由 $\mathbb{R}$ 上的序關係——$|x - q_n| \leq \varepsilon$。由於 $\varepsilon$ 是任意的，$q_n \to x$。由於 $x$ 是任意的，每個實數都是有理數列的極限，故 $\overline{\mathbb{Q}} = \mathbb{R}$。$\square$

這確認了 $(2)$：此構造恰好給出了我們所追求的 $\mathbb{Q}$ 的閉包。

### 完備性

**定理。** $\mathbb{R}$ 中的每個柯西數列都在 $\mathbb{R}$ 中收斂。

*證明提要。* 設 $(x_k)$ 是 $\mathbb{R}$ 中的柯西數列。由稠密性，對每個 $k$ 選取有理數 $r_k$ 使得 $|r_k - x_k| < 1/k$。數列 $(r_k)$ 在 $\mathbb{Q}$ 中是柯西數列：

$$
|r_j - r_k| \;\leq\; |r_j - x_j| + |x_j - x_k| + |x_k - r_k| \;<\; \frac{1}{j} + |x_j - x_k| + \frac{1}{k},
$$

由於 $(x_k)$ 是柯西數列，對足夠大的 $j$ 和 $k$ 這個值很小。定義 $x \coloneqq [(r_k)] \in \mathbb{R}$。則 $|x_k - x| \leq |x_k - r_k| + |r_k - x| < 1/k + |r_k - x|$，而由稠密性應用於數列 $(r_k)$ 可知 $r_k \to x$，故 $x_k \to x$。$\square$

完備性是整個構造的回報：$\mathbb{R}$ 中的每個柯西數列都在 $\mathbb{R}$ 中收斂，不再有空隙。

### 唯一性

在有序體同構的意義下，$\mathbb{R}$ 是**唯一的**完備有序體。任何其他構造——例如戴德金分割（Dedekind cuts）——都給出相同的數學對象，與此構造之間由一個保序的體同構相聯繫。這就是為什麼不同的實數定義方式在實際使用中可以互換。

## 摘要

- $\mathbb{Q}$ 有**空隙**：有理數的柯西數列不一定在 $\mathbb{Q}$ 中收斂。
- **柯西數列** $(q_n)$ 滿足當 $m, n \to \infty$ 時 $|q_m - q_n| \to 0$——是內部聚集，無需外部目標。
- 實數 $\mathbb{R} = \mathcal{C}/{\sim}$ 是 $\mathbb{Q}$ 中柯西數列的**等價類**，其中兩個數列等價當且唯當它們的逐項差趨向 $0$。
- $\mathbb{Q}$ 在 $\mathbb{R}$ 中是**稠密的**：$\overline{\mathbb{Q}} = \mathbb{R}$，故每個實數都是有理數列的極限——正是我們所追求的閉包 $(2)$。
- $\mathbb{R}$ 是**完備的**：每個實數的柯西數列都在 $\mathbb{R}$ 中收斂。
- 這些性質合在一起使 $\mathbb{R}$ 成為在同構意義下唯一的**完備有序體**。
