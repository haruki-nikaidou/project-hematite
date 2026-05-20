---
title: 上限と下限
summary: "ℝ の部分集合の上限（最小上界）と下限（最大下界）を定義し、上限の公理として ℝ の完備性を確立し、アルキメデスの性質を含む主要な帰結を導く。"
prerequisites:
  - basis/math/analysis/real_number_a
aliases: []
tags: ["Analysis", "Real Numbers"]
updated: 2026-05-20
---

$\mathbb{R}$ が完備——すべてのコーシー列が収束する——ことはすでに知っている。しかし完備性には実践上より便利な等価な側面がある：実数の空でない上に有界な集合は*最小*の上界を持つ。その上界を**上限**（supremum）と呼び、下界に対する鏡像が**下限**（infimum）だ。この二つの概念が実解析全体の構造を支える。

## 有界性

$S \subseteq \mathbb{R}$ を空でない集合とする。

$M \in \mathbb{R}$ が $S$ の**上界**（upper bound）であるとは、

$$
\forall s \in S,\quad s \leq M
$$

が成り立つことだ。

$m \in \mathbb{R}$ が $S$ の**下界**（lower bound）であるとは、

$$
\forall s \in S,\quad m \leq s
$$

が成り立つことだ。

$S$ が少なくとも一つの上界を持つとき**上に有界**（bounded above）、少なくとも一つの下界を持つとき**下に有界**（bounded below）という。上にも下にも有界な集合を単に**有界**（bounded）という。

上界は一意ではないことに注意。$M$ が $S$ の上界ならば $M + 1$、$M + 100$、それより大きい数もすべて上界だ。興味深いのは*最も厳しい*上界だ。

## 上限と下限

$S$ の**上限**（supremum）は $\sup S$ と書き、$S$ の最小上界（least upper bound）だ。つまり $S$ の上界であり、かつ他のすべての上界以下の値を持つ。

定義を展開すると、$\sup S = \alpha$ とは次の二条件を意味する。

1. $\forall s \in S,\; s \leq \alpha$（上界条件）
2. $\forall \varepsilon > 0,\; \exists\, s \in S \text{ s.t. } s > \alpha - \varepsilon$（最小性）

条件 2 が上限の特徴的な性質だ：$\alpha$ をたとえ $\varepsilon$ だけ小さくしても上界でなくなる。

$S$ の**下限**（infimum）は $\inf S$ と書き、$S$ の最大下界（greatest lower bound）だ。$S$ の下界であり、かつ他のすべての下界以上の値を持つ。双対的に $\inf S = \beta$ とは次を意味する。

1. $\forall s \in S,\; \beta \leq s$
2. $\forall \varepsilon > 0,\; \exists\, s \in S \text{ s.t. } s < \beta + \varepsilon$

$\sup S$ と $\inf S$ は存在すれば一意だ。$\alpha$ と $\alpha'$ がともに最小上界ならば $\alpha \leq \alpha'$ かつ $\alpha' \leq \alpha$ なので $\alpha = \alpha'$。

## 上限の公理

$\sup S$ の存在は自明ではない——数体系に依存する。$\mathbb{Q}$ では集合 $\{q \in \mathbb{Q} : q^2 < 2\}$ は上に有界（$2$ が上界）だが $\mathbb{Q}$ 内に上限を持たない。$\sqrt{2} \notin \mathbb{Q}$ だからだ。

$\mathbb{R}$ では状況は完璧だ。

> **定理（上限の公理 / 最小上界の性質）。** 上に有界な $\mathbb{R}$ の空でない部分集合はすべて $\mathbb{R}$ 内に上限を持つ。

*証明の概略。* $\mathbb{R}$ は[完備](../real_number_a/)なので、すべての実数コーシー列が $\mathbb{R}$ 内で収束する。完備性から次を示せる：上に有界な空でない $S$ に対して、区間 $[a_n, b_n]$（$a_n \in S$ または $S$ に近く、$b_n$ は常に上界）を二分探索で絞り込む列を考えると、区間の長さはゼロに収束し、両端点がコーシー列となって共通の極限に収束する。その極限が上限だ。$\square$

対称性（全要素の符号を反転）から、下に有界な空でない部分集合はすべて $\mathbb{R}$ 内に下限を持つ。

上限の公理は $\mathbb{R}$ の完備性と論理的に等価だ：どちらかを公理として採り、もう一方を導くことができる。ともに同じ事実——$\mathbb{R}$ に穴がないこと——を表現している。

## 例

### 閉区間 $[a, b]$

$$
\sup [a, b] = b, \qquad \inf [a, b] = a.
$$

両方の限界値は達成される：$b \in [a, b]$ かつ $a \in [a, b]$。

### 開区間 $(a, b)$

$$
\sup (a, b) = b, \qquad \inf (a, b) = a.
$$

どちらの限界値も達成されない：$b \notin (a, b)$ かつ $a \notin (a, b)$。集合は $b$ に任意に近づくが決して届かないにもかかわらず、上限は $\mathbb{R}$ 内に存在する。

### 調和数列

$S = \left\{\dfrac{1}{n} : n \in \mathbb{N},\; n \geq 1\right\} = \left\{1,\, \tfrac{1}{2},\, \tfrac{1}{3},\, \ldots\right\}$ とする。

$$
\sup S = 1 \in S, \qquad \inf S = 0 \notin S.
$$

下限 $0$ は達成されない：各要素 $1/n > 0$ だが、任意の $\varepsilon > 0$ に対して $n > 1/\varepsilon$ を選べば $1/n < \varepsilon$ となり、$0$ が最大下界であることが確認できる。

### 非有界集合

集合 $\mathbb{N}$ は下に有界（$\inf \mathbb{N} = 0$）だが上に有界でない：有限の $M$ はいずれも上界にならないので $\sup \mathbb{N}$ は $\mathbb{R}$ 内に存在しない。慣例的に $\sup \mathbb{N} = +\infty$ と書く。

## 上限・下限と最大元・最小元

例から得られる重要な洞察：$S$ の上限が $S$ に属するとは限らない。

- $\sup S \in S$ であることと $S$ が**最大元**（maximum、最大の要素）を持つことは同値だ。
- $\inf S \in S$ であることと $S$ が**最小元**（minimum、最小の要素）を持つことは同値だ。

最大元・最小元はそれぞれ高々一つ存在し、存在すれば対応する上限・下限と一致する。しかし上限を持ちながら最大元を持たない集合もある——$(a, b)$ がその例だ。

## アルキメデスの性質

上限の公理の古典的な帰結として、次が成り立つ。

> **定理（アルキメデスの性質）。** 任意の $x \in \mathbb{R}$ に対して $n > x$ となる $n \in \mathbb{N}$ が存在する。

*証明。* ある $x \in \mathbb{R}$ が $\mathbb{N}$ の上界だと仮定して矛盾を導く。すると $\mathbb{N}$ は空でない上に有界な $\mathbb{R}$ の部分集合なので、上限の公理より $\alpha = \sup \mathbb{N}$ が存在する。$\alpha - 1$ は $\mathbb{N}$ の上界でないので $n > \alpha - 1$ となる $n \in \mathbb{N}$ が存在する。すなわち $n + 1 > \alpha$。しかし $n + 1 \in \mathbb{N}$ なので $\alpha$ が上界であることに矛盾する。$\square$

同値な言い換え：任意の $\varepsilon > 0$ に対して $1/n < \varepsilon$ となる $n \in \mathbb{N}$ が存在する。これは量を任意に小さくできることを示すために解析全体で繰り返し使われる。

## 有用な言い換え

次の各条件はすべて $\alpha = \sup S$ と同値で、異なる証明場面でそれぞれ便利だ。

- $\alpha$ は上界であり、任意の $\varepsilon > 0$ に対して区間 $(\alpha - \varepsilon, \alpha]$ が $S$ の点を含む。
- $\alpha$ は上界であり、$S$ 内の点列 $(s_n)$ で $s_n \to \alpha$ となるものが存在する。
- $\alpha = \min\{M \in \mathbb{R} : M \text{ は } S \text{ の上界}\}$。

二番目の言い換え——上限に収束する $S$ 内の点列——が証明で最もよく使われ、上限・下限の言葉を数列と極限へと結びつける。

## まとめ

- $S$ の**上界**は $\forall s \in S,\; s \leq M$ を満たす $M$；**下界**は $\forall s \in S,\; m \leq s$ を満たす $m$。
- **上限** $\sup S$ は*最小*上界；**下限** $\inf S$ は*最大*下界。存在すれば一意。
- 特徴付け：$\alpha = \sup S$ であることと、$\alpha$ が上界かつ任意の $\varepsilon > 0$ に対してある $s \in S$ が $s > \alpha - \varepsilon$ を満たすことは同値。
- **上限の公理**：上に有界な空でない $S \subseteq \mathbb{R}$ はすべて $\sup S \in \mathbb{R}$ を持つ。これは $\mathbb{R}$ の完備性と同値。
- 上限が $S$ に属するかどうかは保証されない：$\sup S \in S$ であることと $S$ が最大元を持つことは同値。
- **アルキメデスの性質**が従う：任意の $x \in \mathbb{R}$ に対して $n > x$ となる $n \in \mathbb{N}$ が存在するので、$\mathbb{N}$ は上に非有界であり $1/n$ は任意に小さくできる。
