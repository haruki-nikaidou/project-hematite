---
title: 内部（位相）
summary: "位相空間における集合の内部を、その集合が含む最大の開部分集合として定義し、内点が「集合の厳密な内側にある」という意味をどのように捉えるかを考察する。"
prerequisites: 
  - basis/math/topology/topology_space
aliases: []
tags: ["Topology"]
updated: 2026-05-11
---

実数直線の区間 $(0, 1)$ を思い浮かべると、すべての点が「安全に内側」にいるように感じる — どちらの方向にも少し動いても区間の中に留まれる。これに対して $[0, 1]$ の端点 $0$ はまさに縁に座っている：すべての近傍が境界をまたぐ。**内部**（interior）はこの直感を、距離に言及せず、任意の位相空間に対して精確にする。

## 内点

$(X, \tau)$ を[位相空間](../topology_space/)とし、$A \subseteq X$ とする。点 $x \in X$ が $A$ の**内点**（interior point）であるとは、

$$
x \in U \subseteq A \tag{1}
$$

を満たす開集合 $U \in \tau$ が存在することをいう。

言い換えると：$x$ のある開近傍が $A$ にすっぽり収まるとき、$x$ は $A$ の内点だ。$x \in U \subseteq A$ より $x$ 自身も $A$ に属するので、内点になれるのは $A$ の点だけだ。

## 集合の内部

$A$ の**内部**（interior）を $\operatorname{int}(A)$（または $A^\circ$）と書き、$A$ のすべての内点の集合と定義する：

$$
\operatorname{int}(A) \coloneqq \{ x \in X : \exists\, U \in \tau,\ x \in U \subseteq A \}. \tag{2}
$$

等価な — そしてしばしばより便利な — 記述がある：$\operatorname{int}(A)$ は $A$ に含まれるすべての開集合の合併、つまり $A$ の**最大の開部分集合**だ：

$$
\operatorname{int}(A) = \bigcup \{ U \in \tau : U \subseteq A \}. \tag{3}
$$

なぜ一致するかを確認しよう。$A$ に含まれる任意の開集合 $U \subseteq A$ はすべての点を $(3)$ の合併に寄与し、それらは $(1)$ により内点となる。逆に任意の内点 $x$ は $x \in U$、$U \subseteq A$ となる開集合 $U$ を証人として持つので、$x$ は合併に捕捉される。公理 T2 より $\tau$ は任意合併で閉じているので、$(3)$ の合併自体が開集合だ。

## 例

### $\mathbb{R}$ の標準位相

$\mathbb{R}$ の標準距離位相の下では：

- $\operatorname{int}\bigl((0, 1)\bigr) = (0, 1)$ — 開区間は自身の内部と等しい。
- $\operatorname{int}\bigl([0, 1]\bigr) = (0, 1)$ — 端点 $0$ と $1$ は除かれる；それらのまわりの開区間は $[0, 1]$ に収まらない。
- $\operatorname{int}\bigl([0, 1)\bigr) = (0, 1)$ — 同じ理由；$0$ は縁にある。
- $\operatorname{int}(\mathbb{Q}) = \varnothing$ — どの開区間も無理数を含むので、$\mathbb{Q}$ に含まれる開集合は存在しない。
- $\operatorname{int}(\mathbb{R}) = \mathbb{R}$ — 全体集合は開集合だ。

### 離散位相

任意の集合 $X$ 上の**離散位相**（discrete topology）では、すべての部分集合が開集合だ。任意の $A \subseteq X$ と任意の $x \in A$ について、開集合 $\{x\}$ が $x \in \{x\} \subseteq A$ を満たすので、$A$ のすべての点が内点だ：

$$
\operatorname{int}(A) = A \quad \text{（離散位相）}。
$$

### 密着位相

$|X| > 1$ の $X$ 上の**密着位相**（indiscrete topology）（$\varnothing$ と $X$ だけが開集合）では、空でない唯一の開集合は $X$ 自身だ。$U \subseteq A$ を満たす開集合 $U \in \{\varnothing, X\}$ は $A = X$ の場合を除いて $U = \varnothing$ しかない：

$$
\operatorname{int}(A) = \begin{cases} X & \text{if } A = X, \\ \varnothing & \text{otherwise.} \end{cases}
$$

## 内部の性質

$(X, \tau)$ を位相空間とし、$A, B \subseteq X$ とする。

- **$\operatorname{int}(A)$ は開集合**であり $\operatorname{int}(A) \subseteq A$。（$(3)$ から直ちに従う。）
- **$A$ が開集合であることと $A = \operatorname{int}(A)$ であることは同値。** $A$ が開であれば $(3)$ の合併の一つとなり $A \subseteq \operatorname{int}(A)$；$\operatorname{int}(A) \subseteq A$ と合わせて等号が得られる。
- **べき等性**（idempotent）：$\operatorname{int}(\operatorname{int}(A)) = \operatorname{int}(A)$。$\operatorname{int}(A)$ はすでに開集合なので、その内部は自身だ。
- **単調性**（monotone）：$A \subseteq B$ ならば $\operatorname{int}(A) \subseteq \operatorname{int}(B)$。
- **共通部分**：$\operatorname{int}(A \cap B) = \operatorname{int}(A) \cap \operatorname{int}(B)$。
- **合併（一方向のみ）**：$\operatorname{int}(A) \cup \operatorname{int}(B) \subseteq \operatorname{int}(A \cup B)$。等号は一般に成立しない。$\mathbb{R}$ では $\operatorname{int}([0,1]) \cup \operatorname{int}([1,2]) = (0,1) \cup (1,2)$ で $1$ が欠けるのに対し、$\operatorname{int}([0,1] \cup [1,2]) = \operatorname{int}([0,2]) = (0,2)$。

## 双対的な視点：閉包

内部と[閉包](../closure/)は補集合を取ることで互いに双対だ：

$$
\operatorname{int}(A) = X \setminus \overline{X \setminus A}, \tag{4}
$$

ここで $\overline{B}$ は $B$ の閉包を表す。これは「$A$ の内部は補集合の閉包に属さない点の集合」と読める。この双対性は根本的なものだ — 内部に関する結果と閉包に関する結果は補集合を取ることで互いに変換できる。

## まとめ

- 点 $x$ が $A$ の**内点**であるとは、$x \in U \subseteq A$ を満たす開集合 $U$ が存在することをいう。
- **内部** $\operatorname{int}(A)$ は $A$ のすべての内点の集合であり、同値的には $A$ の最大の開部分集合だ。
- $A$ が開集合であることと $A = \operatorname{int}(A)$ であることは同値だ。
- 内部作用素は**べき等**かつ**単調**であり、有限共通部分には分配されるが、合併への分配は片方向のみだ。
- 離散位相ではすべての集合がその内部と等しく、密着位相では $\varnothing$ と $X$ だけがそうなる。
- 内部は $\operatorname{int}(A) = X \setminus \overline{X \setminus A}$ によって閉包と**双対**だ。
