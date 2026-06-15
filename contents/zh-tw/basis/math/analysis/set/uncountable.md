---
title: 不可數集合
summary: "集合若是無限的且不存在與 ℕ 的雙射，則稱之為不可數——沒有任何列舉能窮盡它。本檢查點透過康托的十進位對角論證證明 ℝ 是不可數的，利用 Cantor–Bernstein–Schroeder 定理建立 |𝒫(ℕ)| = |ℝ|，並將連續統置於無限基數的層級結構中。"
prerequisites: 
  - basis/math/analysis/set/cantors_theorem
  - basis/math/analysis/set/countable
aliases: []
tags: ["集合論"]
updated: 2026-05-11
---

[可數集合](../countable/)的檢查點表明，$\mathbb{Z}$、$\mathbb{Q}$，乃至 $\mathbb{N} \times \mathbb{N}$ 都是可數無限的——你總能找到一個巧妙的與 $\mathbb{N}$ 之間的雙射。然後[康托定理](../cantors_theorem/)證明了 $\mathcal{P}(\mathbb{N})$ *嚴格*更大。本檢查點使這個差距具體化：你將看到實數根本無法被列舉的直接證明，並精確確定 $|\mathbb{R}|$ 的大小。

## 不可數的含義

[可數集合](../countable/)要麼是有限的，要麼與 $\mathbb{N}$ 有雙射。集合 $A$ 是**不可數的（uncountable）**，若它是無限的且*不是*可數的——即不存在雙射 $\mathbb{N} \to A$。

其結果是鮮明的：不存在包含 $A$ 每個元素的列表 $a_0, a_1, a_2, \ldots$。你可以嘗試每一種可以想像的列舉策略，總有一些元素會漏掉。[康托定理](../cantors_theorem/)已經表明 $|\mathbb{N}| < |\mathcal{P}(\mathbb{N})|$，所以 $\mathcal{P}(\mathbb{N})$ 是第一個候選。真正的問題是哪些日常集合是不可數的。

## 實數是不可數的

最重要的不可數集合是 $\mathbb{R}$。與其直接攻擊它，不如從開區間 $(0,1)$ 開始，它更易於處理，且已經與 $\mathbb{R}$ 完全等大。

> **為何 $(0,1)$ 與 $\mathbb{R}$ 大小相同。** 映射 $x \mapsto \tan\!\bigl(\pi(x - \tfrac{1}{2})\bigr)$ 是從 $(0,1)$ 到 $\mathbb{R}$ 的雙射，所以 $|(0,1)| = |\mathbb{R}|$。

**定理。** $(0,1)$ 是不可數的。

**證明。** 假設，為了矛盾，$(0,1)$ 是可數的。那麼你可以將每個元素排列成一個不遺漏任何東西的無限列表 $r_0, r_1, r_2, \ldots$。將每個 $r_i$ 寫成十進位展開：

$$
r_i \;=\; 0\,.\,d_{i0}\;d_{i1}\;d_{i2}\;\cdots
$$

其中每個數字 $d_{ij} \in \{0, 1, \ldots, 9\}$。將數字排列成一個無限矩陣——每個實數一列，每個十進位位置一行：

|          | 第 $0$ 位               | 第 $1$ 位               | 第 $2$ 位               | 第 $3$ 位               | $\cdots$ |
|----------|:-----------------:|:-----------------:|:-----------------:|:-----------------:|:--------:|
| $r_0$    | $\mathbf{d_{00}}$ | $d_{01}$          | $d_{02}$          | $d_{03}$          |          |
| $r_1$    | $d_{10}$          | $\mathbf{d_{11}}$ | $d_{12}$          | $d_{13}$          |          |
| $r_2$    | $d_{20}$          | $d_{21}$          | $\mathbf{d_{22}}$ | $d_{23}$          |          |
| $r_3$    | $d_{30}$          | $d_{31}$          | $d_{32}$          | $\mathbf{d_{33}}$ |          |
| $\vdots$ |                   |                   |                   |                   | $\ddots$ |

粗體的對角線條目 $d_{00}, d_{11}, d_{22}, \ldots$ 各自記錄了 $r_n$ 在第 $n$ 位的數字。現在透過*改變*每個對角線數字來構造一個新實數 $s = 0\,.\,s_0\;s_1\;s_2\;\cdots$：

$$
s_n \;\coloneqq\;
\begin{cases}
1 & \text{if } d_{nn} \neq 1, \\
2 & \text{if } d_{nn} = 1.
\end{cases}
\tag{1}
$$

每個數字 $s_n$ 都在 $\{1, 2\}$ 中，所以 $s \in (0, 1)$。但對每個 $n$，規則 $(1)$ 保證 $s_n \neq d_{nn}$，這意味著 $s$ 與 $r_n$ 在第 $n$ 位不同，所以 $s \neq r_n$。因此 $s$ 是 $(0,1)$ 中的一個實數，它在列表 $r_0, r_1, r_2, \ldots$ 中完全不出現——與列表完整的假設矛盾。$\square$

> **為何使用 1 和 2？** 選擇 $s_n \in \{1, 2\}$ 可以迴避一個微妙的陷阱：十進位 $0.0\overline{9}$ 和 $0.1000\ldots$ 表示*同一個*實數。從 $\{1,2\}$ 取出的數字永遠不會導致這樣的衝突，所以 $s$ 有唯一的十進位展開，證明是嚴密的。

這個論證的結構與[康托定理](../cantors_theorem/)中的對角集完全一致：定義一個對象，它在第 $n$ 座標上與第 $n$ 個候選者*不一致*，對每個 $n$ 都如此。那裡翻轉的是集合成員資格；這裡改變的是十進位數字。同樣的自我矛盾邏輯在兩種情況下都適用。

## 連續統的基數

既然你知道 $\mathbb{R}$ 是不可數的，就給它的基數一個名稱。**連續統的基數（cardinality of the continuum）**是：

$$
\mathfrak{c} \;\coloneqq\; |\mathbb{R}|.
$$

[康托定理](../cantors_theorem/)承諾了 $|\mathcal{P}(\mathbb{N})| = |\mathbb{R}|$。證明需要兩個單射——每個方向各一個——以及一個將它們轉換為雙射的定理。

### 將冪集單射入實數線

[冪集](../power_set/)的檢查點表明，每個子集 $S \subseteq \mathbb{N}$ 都有一個**特徵函式（characteristic function）** $\chi_S \colon \mathbb{N} \to \{0,1\}$，其中當 $n \in S$ 時 $\chi_S(n) = 1$。用它來定義：

$$
\varphi(S) \;\coloneqq\; \sum_{n \in S} 3^{-(n+1)}.
$$

$\varphi(S)$ 的值是以三進位展開 $0\,.\,\chi_S(0)\;\chi_S(1)\;\chi_S(2)\;\cdots$ 表示的實數，只使用三進位數字 0 和 1。為了看出 $\varphi$ 是單射，假設 $S \neq T$，設 $k$ 是它們的對稱差 $S \mathbin{\triangle} T$ 中最小的索引——假設 $k \in S$ 且 $k \notin T$。則：

$$
\varphi(S) - \varphi(T)
\;\geq\; 3^{-(k+1)} - \sum_{n > k} 3^{-(n+1)}
\;=\; 3^{-(k+1)} - \frac{1}{2 \cdot 3^{k+1}}
\;=\; \frac{1}{2 \cdot 3^{k+1}}
\;>\; 0,
$$

所以 $\varphi(S) \neq \varphi(T)$。單射 $\varphi \colon \mathcal{P}(\mathbb{N}) \hookrightarrow [0,1]$ 給出：

$$
|\mathcal{P}(\mathbb{N})| \;\leq\; |[0,1]| \;=\; \mathfrak{c}.
$$

### 將實數線單射入冪集

每個 $x \in (0,1)$ 都有二進位展開 $x = 0\,.\,b_0\;b_1\;b_2\;\cdots$，其中 $b_n \in \{0,1\}$。（有限個**二進位有理數（dyadic rationals）**——形如 $m/2^k$ 的數——有兩個二進位展開；為每個選取非終止的那個。）定義：

$$
\psi(x) \;\coloneqq\; \{n \in \mathbb{N} \mid b_n = 1\}.
$$

$(0,1)$ 中兩個具有不同所選展開的不同實數在某個位置不同，所以它們映射到 $\mathbb{N}$ 的不同子集。單射 $\psi \colon (0,1) \hookrightarrow \mathcal{P}(\mathbb{N})$ 給出：

$$
\mathfrak{c} \;=\; |(0,1)| \;\leq\; |\mathcal{P}(\mathbb{N})|.
$$

### 應用 Cantor–Bernstein–Schroeder 定理

你現在有了兩個方向的單射。以下定理——此處不加證明地陳述——將它們轉換為雙射：

**定理（Cantor–Bernstein–Schroeder）。** 若存在單射 $A \hookrightarrow B$ 和 $B \hookrightarrow A$，則 $|A| = |B|$。

將此應用於 $\varphi$ 和 $\psi$，它們一起見證了 $|\mathcal{P}(\mathbb{N})| \leq \mathfrak{c}$ 和 $\mathfrak{c} \leq |\mathcal{P}(\mathbb{N})|$：

$$
|\mathcal{P}(\mathbb{N})| \;=\; |\mathbb{R}| \;=\; \mathfrak{c}. \tag{2}
$$

這就是[康托定理](../cantors_theorem/)所承諾的等式：自然數的冪集與實數線完全等大。

**記號 $2^{\aleph_0}$。** 寫 $\aleph_0 \coloneqq |\mathbb{N}|$ 表示自然數的基數。[冪集](../power_set/)的檢查點建立了對有限集合 $|\mathcal{P}(A)| = 2^{|A|}$；同樣的指數記號推廣到無限基數，所以 $|\mathcal{P}(\mathbb{N})| = 2^{\aleph_0}$。方程式 $(2)$ 則讀作：

$$
\mathfrak{c} \;=\; 2^{\aleph_0},
$$

這是有限公式的令人滿意的回聲。

## 許多熟悉的集合共享同一個不可數大小

不只 $\mathbb{R}$，你已知道的許多集合都有基數 $\mathfrak{c}$：

| 集合 | 論證 |
|-----|----------|
| $(0,1)$ | $x \mapsto \tan(\pi(x - \tfrac{1}{2}))$ 是從 $(0,1)$ 到 $\mathbb{R}$ 的雙射 |
| $[0,1]$ | 單射入 $\mathbb{R}$ 再反射回來；Cantor–Bernstein–Schroeder 給出相等 |
| $\mathbb{R}$ | $\mathfrak{c}$ 的定義 |
| $\mathbb{R}^n$（任意 $n \geq 1$） | 交織所有 $n$ 個座標的十進位數字以編碼單一實數 |
| $\mathbb{C}$ | $\mathbb{C} \cong \mathbb{R}^2$，所以 $|\mathbb{C}| = |\mathbb{R}^2| = \mathfrak{c}$ |
| $\mathcal{P}(\mathbb{N})$ | 方程式 $(2)$ |

令人驚訝的結論：增加維度、轉為複數，或取 $\mathbb{N}$ 的冪集，都不會使基數增長超過 $\mathfrak{c}$。

## 連續統之上的層級

[康托定理](../cantors_theorem/)適用於*任意*集合，包括 $\mathbb{R}$。從方程式 $(2)$ 開始，在每一步應用 $|\cdot| < |\mathcal{P}(\cdot)|$，得到一個嚴格遞升的鏈：

$$
|\mathbb{N}|
\;<\; |\mathbb{R}| \;=\; |\mathcal{P}(\mathbb{N})|
\;<\; |\mathcal{P}(\mathbb{R})|
\;<\; \bigl|\mathcal{P}(\mathcal{P}(\mathbb{R}))\bigr|
\;<\; \cdots
$$

不存在最大的基數。冪集運算永遠產生嚴格更大的無窮，所以無窮有無窮多個不同的大小。

### 連續統假設

一個自然的問題出現了：是否存在某個集合 $A$，其基數*嚴格介於* $|\mathbb{N}|$ 和 $|\mathbb{R}|$ 之間？這就是**連續統假設（Continuum Hypothesis, CH）**：

> **連續統假設。** 不存在滿足 $|\mathbb{N}| < |A| < |\mathbb{R}|$ 的集合 $A$。

CH 被證明是*獨立於* ZFC 的——集合論的標準公理系統。哥德爾（1940年）證明了假設 CH 不會與 ZFC 產生矛盾；科恩（1963年）證明了假設其否定也不會產生矛盾。你既不能從 ZFC 公理單獨證明 CH，也不能否定它。這是重要數學命題在標準基礎內可證明不可判定的第一批里程碑式例子之一。

## 摘要

- 集合是**不可數的**，若它是無限的且不存在與 $\mathbb{N}$ 的雙射：沒有列表 $a_0, a_1, a_2, \ldots$ 能窮盡它。
- **康托的對角論證**應用於十進位展開，證明 $(0,1)$——從而 $\mathbb{R}$——是不可數的：由規則 $(1)$ 定義的對角實數 $s$ 在第 $n$ 位與每個 $r_n$ 不同，擊敗了任何宣稱的列舉。
- 這個對角想法與[康托定理](../cantors_theorem/)相呼應：設計一個對象，在匹配座標上與每個已列舉的候選者不一致——那裡是集合成員資格位元；這裡是十進位數字。
- **連續統的基數**是 $\mathfrak{c} \coloneqq |\mathbb{R}| = 2^{\aleph_0}$，其中 $\aleph_0 \coloneqq |\mathbb{N}|$。
- 兩個單射——透過三進位編碼的 $\mathcal{P}(\mathbb{N}) \hookrightarrow [0,1]$ 和透過二進位展開的 $(0,1) \hookrightarrow \mathcal{P}(\mathbb{N})$——與 **Cantor–Bernstein–Schroeder 定理**結合，建立了 $|\mathcal{P}(\mathbb{N})| = \mathfrak{c}$（方程式 $(2)$）。
- 許多集合共享基數 $\mathfrak{c}$：$(0,1)$、$[0,1]$、對任意 $n \geq 1$ 的 $\mathbb{R}^n$、$\mathbb{C}$ 和 $\mathcal{P}(\mathbb{N})$。
- 將康托定理應用於 $\mathbb{R}$，繼續了這個塔：$|\mathbb{N}| < |\mathbb{R}| < |\mathcal{P}(\mathbb{R})| < |\mathcal{P}(\mathcal{P}(\mathbb{R}))| < \cdots$，所以存在無窮多個不同的無限基數。
- **連續統假設**——是否存在基數嚴格介於 $|\mathbb{N}|$ 和 $|\mathbb{R}|$ 之間的集合——獨立於 ZFC，如哥德爾（1940年）和科恩（1963年）所證明。
