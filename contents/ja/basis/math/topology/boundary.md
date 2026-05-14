---
title: 境界（位相）
summary: "位相空間における集合の境界を、その集合とその補集合の閉包の両方に属する点として定義し、空間の標準的な三分割を確立し、開集合・閉集合・開閉集合の境界による特徴づけを探る。"
prerequisites:
  - basis/math/topology/closure
aliases: []
tags: ["Topology"]
updated: 2026-05-11
---

島の海岸線に立つ場面を想像してほしい：海にも陸地にも属さず、二者の**境界**（boundary）に立っている。あなたの周りのあらゆる開近傍は海と陸の両方に達する。境界の概念はこの幾何学的な絵を、任意の位相空間に対して精確にする。集合とその補集合が、どの開集合によっても切り離せない場所だ。

## 定義

$(X, \tau)$ を[位相空間](../topology_space/)とし、$A \subseteq X$ とする。$A$ の**境界**（boundary）を $\partial A$（または $\operatorname{bd}(A)$ や $\operatorname{Fr}(A)$）と書き、次のように定義する：

$$
\partial A \coloneqq \overline{A} \cap \overline{X \setminus A}. \tag{1}
$$

$A$ の[閉包](../closure/)と $A$ の補集合の閉包の両方に属する点の集合だ。

閉包の近傍的特徴づけ（$x \in \overline{B}$ であることと $x$ のすべての開集合が $B$ と交わることの同値性）を使うと、$(1)$ をより直接的な条件に展開できる：$x \in \partial A$ であることと

$$
\forall\, U \in \tau,\quad x \in U \implies U \cap A \neq \varnothing \text{ かつ } U \cap (X \setminus A) \neq \varnothing \tag{2}
$$

が成り立つことは同値だ。

平易な言葉で：境界点のあらゆる開近傍は $A$ にも補集合にも触れる。$x$ をどちらの側からも「切り離せない」。

## 分割定理

三つの概念 — 内部・境界・*外部* — は $X$ を互いに素な三つの部分に切り分ける。$A$ の**外部**（exterior）を $\operatorname{ext}(A) \coloneqq \operatorname{int}(X \setminus A)$ — 補集合の内部 — と定義する。

**定理（$X$ の分割）.** 任意の $A \subseteq X$ について：

$$
X = \operatorname{int}(A) \cup \partial A \cup \operatorname{ext}(A), \tag{3}
$$

これら三つの集合は互いに素だ。

*なぜ成り立つか.* [内部](../interior/)と外部は互いに素な開集合だ。ある点が $A$ 内に近傍を持てば $\operatorname{int}(A)$ に属し、$X \setminus A$ 内に近傍を持てば $\operatorname{ext}(A)$ に属し、どちらの側にも完全に収まる近傍がなければ $\partial A$ に属する。$X$ のすべての点はこの三ケースのいずれか一つにちょうど落ちる。

閉包–内部の双対性 $\overline{A} = X \setminus \operatorname{int}(X \setminus A)$ を使った等価な表示：

$$
\overline{A} = \operatorname{int}(A) \cup \partial A \tag{4}
$$

（閉包は内部と境界の合併であり、その分割は互いに素だ）。

## 例

### $\mathbb{R}$ の標準位相

- $\partial (0, 1) = \{0, 1\}$。閉包は $[0,1]$；補集合 $(-\infty, 0] \cup [1, +\infty)$ の閉包は自身；その交叉は $\{0, 1\}$。
- $\partial [0, 1] = \{0, 1\}$ も同様だ。端点を含むかどうかにかかわらず、集合とその補集合の境界は同じだ。
- $\partial \mathbb{Q} = \mathbb{R}$。有理数も無理数も $\mathbb{R}$ で稠密なので $\overline{\mathbb{Q}} = \mathbb{R}$ かつ $\overline{\mathbb{R} \setminus \mathbb{Q}} = \mathbb{R}$；その交叉は $\mathbb{R}$ 全体だ。
- $\partial \mathbb{R} = \varnothing$。補集合がない；$X \setminus X = \varnothing$ の閉包は $\varnothing$。

### 離散位相

離散位相ではすべての集合が開かつ閉なので $\overline{A} = A$ かつ $\overline{X \setminus A} = X \setminus A$。その交叉は $A \cap (X \setminus A) = \varnothing$。離散位相ではすべての集合の境界が空集合だ。

### 密着位相

$\varnothing$ と $X$ だけが閉集合だ。空でない真部分集合 $A \subsetneq X$ については $\overline{A} = X$ かつ $\overline{X \setminus A} = X$ なので $\partial A = X \cap X = X$。空間全体がすべての真の空でない部分集合の境界になる — 密着位相がいかに粗いかを示す極端なケースだ。

## 性質

$(X, \tau)$ を位相空間とし、$A \subseteq X$ とする。

- **$\partial A$ は閉集合。** 二つの閉集合の交叉だ：$\partial A = \overline{A} \cap \overline{X \setminus A}$。
- **対称性**：$\partial A = \partial(X \setminus A)$。境界は集合とその補集合で同じ — 海岸線は海にも陸にも属さない。
- **分解**：$\overline{A} = \operatorname{int}(A) \sqcup \partial A$（互いに素な合併）、方程式 $(4)$ より。
- **境界の境界**：$\partial(\partial A) \subseteq \partial A$。閉集合の境界はその集合に含まれる；$\partial A$ は閉集合なので、その境界は自身の部分集合だ。
- **内部と境界は互いに素**：$\operatorname{int}(A) \cap \partial A = \varnothing$。内点は $A$ 内に近傍を持ち、$X \setminus A$ から切り離される。

## 境界による開集合・閉集合・開閉集合の特徴づけ

境界は三つの特別な種類の集合を特にきれいに特徴づける。

**定理.** $A \subseteq X$ とする。このとき：

1. $A$ が**開集合**であることと $A \cap \partial A = \varnothing$（境界が $A$ の補集合に完全に含まれる）は同値だ。
2. $A$ が**閉集合**であることと $\partial A \subseteq A$（境界が $A$ に含まれる）は同値だ。
3. $A$ が**開閉集合**（clopen）であることと $\partial A = \varnothing$ は同値だ。

*なぜ正しいか.*

1. $A$ が開ならば $A = \operatorname{int}(A)$ であり $\partial A$ と互いに素。逆に $A \cap \partial A = \varnothing$ ならば $A$ の点はどれも $\overline{X \setminus A}$ に属さず、すべての点が $A$ 内に近傍を持つので $A$ は開だ。

2. $A$ が閉であることと $\overline{A} = A$ は同値。$\overline{A} = \operatorname{int}(A) \cup \partial A$ かつ $\operatorname{int}(A) \subseteq A$ なので、$\overline{A} = A$ が成立することと $\partial A \subseteq A$ は同値だ。

3. (1) と (2) を組み合わせると：開閉は $A \cap \partial A = \varnothing$ かつ $\partial A \subseteq A$ を要求し、両者が同時に成立するためには $\partial A = \varnothing$ が必要だ。

最後の点は特に有用だ：**連結な位相空間では $\varnothing$ と $X$ だけが空の境界を持つ** — なぜならそれらだけが開閉集合だからだ。境界の空性は不連結性の証人になる。

## 座標での境界の公式

標準位相を持つ $\mathbb{R}^n$ では、集合の境界をその「位相的な表面」と見ることができる — 無限小の小球が常に集合と補集合にまたがるような点の集合だ。これは幾何学的な直感と一致する：円板の境界はその円周であり、立方体の境界はその六つの面だ。抽象的な位相論では、この直感は幾何学を一切持たない任意の空間に一般化される。

## まとめ

- **境界** $\partial A \coloneqq \overline{A} \cap \overline{X \setminus A}$ は、近傍のどれもが $A$ にも $X \setminus A$ にも触れるような点の全体だ。
- $\partial A$ は常に**閉集合**であり、$\partial A = \partial(X \setminus A)$（境界は対称）。
- 空間 $X$ は $\operatorname{int}(A) \sqcup \partial A \sqcup \operatorname{ext}(A)$ に分割される；閉包は $\overline{A} = \operatorname{int}(A) \sqcup \partial A$ を満たす。
- $A$ が開であることと $\partial A \cap A = \varnothing$；閉であることと $\partial A \subseteq A$；開閉であることと $\partial A = \varnothing$ は、それぞれ同値だ。
- **連結**な空間では $\varnothing$ と $X$ だけが空の境界を持つ。
- 離散位相ではすべての集合の境界が空；密着位相ではすべての真の空でない部分集合の境界が $X$ 全体だ。
