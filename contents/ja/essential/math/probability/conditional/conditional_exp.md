---
title: 条件付き期待値
summary: "条件付き期待値 E[X | B] は条件付き確率 P(· | B) のもとでの X の期待値であり、より一般に E[X | Y] は Y = y のとき E[X | Y = y] の値を取る確率変数だ。このチェックポイントでは離散・絶対連続の両ケースで条件付き期待値を定義し、それを条件変数の関数として提示し、線形性・単調性・既知量を外に出す性質を展開する。これらの性質が E[X | Y] を Y の生成する σ-加法族への自然な射影たらしめる。"
prerequisites:
  - essential/math/probability/conditional/conditional_pr
  - essential/math/probability/expectation
aliases: []
tags:
  - Probability
  - Conditional Probability
  - Expectation
updated: 2026-05-22
---

[期待値](../expectation/) $E[X]$ は確率空間全体での $X$ の確率加重平均だ。**条件付き期待値**（conditional expectation）は同じ問いを部分集団に限定して問う：事象 $B$ が起きたことが与えられたとき、あるいは別の確率変数 $Y$ が値 $y$ を取ったことがわかっているとき、$X$ の平均はいくらか？

## 事象による条件付き期待値

$P(B) > 0$ を満たす $B \in \mathcal{F}$ と可積分な確率変数 $X$ を考える。**$B$ のもとでの $X$ の条件付き期待値**を、[条件付き確率](../conditional_pr/) $P(\cdot \mid B)$ のもとでの $X$ の期待値として定義する：

$$
E[X \mid B] \coloneqq \int_\Omega X \, dP(\cdot \mid B).
$$

**離散の場合**（$X$ が値 $x_1, x_2, \ldots$ を取る場合）：

$$
E[X \mid B] = \sum_k x_k \, P(X = x_k \mid B).
$$

**絶対連続の場合**、条件付き密度 $f_{X \mid B}$ を用いると：

$$
E[X \mid B] = \int_{-\infty}^{+\infty} x \, f_{X \mid B}(x) \, dx.
$$

結果 $E[X \mid B]$ は**定数**——1つの数値であり、確率変数ではない。

## 確率変数による条件付き期待値

より一般的で強力な概念は、確率変数 $Y$ の値を条件とするものだ。

### 離散の場合

$Y$ が値 $y_1, y_2, \ldots$ を取り $P(Y = y) > 0$ を満たす各 $y$ に対して：

$$
E[X \mid Y = y] \coloneqq \sum_k x_k \, P(X = x_k \mid Y = y).
$$

### 結合絶対連続の場合

$(X, Y)$ が結合密度 $f_{X,Y}$ と周辺密度 $f_Y(y) > 0$ を持つとき、**条件付き密度**（conditional density）は

$$
f_{X \mid Y}(x \mid y) = \frac{f_{X,Y}(x, y)}{f_Y(y)},
$$

そして

$$
E[X \mid Y = y] = \int_{-\infty}^{+\infty} x \, f_{X \mid Y}(x \mid y) \, dx.
$$

### 確率変数としての $E[X \mid Y]$

$E[X \mid Y = y]$ は $y$ の決定的な関数 $g(y)$ だ。これと $Y$ を合成して**条件付き期待値**

$$
E[X \mid Y] \coloneqq g(Y)
$$

を定義する。これは**確率変数**——確率変数 $Y$ の関数 $g(Y)$ だ。$Y$ を観測する前はどの値 $g(y)$ を取るかはわからない。$E[X \mid Y]$ は二乗平均誤差の意味で $Y$ から $X$ を最もよく予測する：すべての可測関数 $h(Y)$ の中で $E[(X - h(Y))^2]$ を最小にするのが $h = g$ だ。

## 主要な性質

以下では $X, X_1, X_2$ を可積分な確率変数、$Y, Z$ を任意の確率変数とする。

### 線形性

$$
E[a X_1 + b X_2 \mid Y] = a \, E[X_1 \mid Y] + b \, E[X_2 \mid Y].
$$

### 単調性

$X_1 \leq X_2$ a.s. ならば $E[X_1 \mid Y] \leq E[X_2 \mid Y]$ a.s.

### 既知量を外に出す

$h(Y) X$ が可積分な可測関数 $h$ に対して：

$$
E[h(Y) \, X \mid Y] = h(Y) \, E[X \mid Y]. \tag{1}
$$

$Y$ がわかれば、$h(Y)$ は $P(\cdot \mid Y = y)$ の観点から定数であり、期待値の外に出せる。

**例。** $Y$ と $X$ が独立であれば $E[X \mid Y] = E[X]$（定数関数）であり、この性質から $E[YX \mid Y] = Y \cdot E[X]$、したがって $E[YX] = E[Y] E[X]$——独立性の標準的な公式が復元される。

### 反復条件付け

$Y = f(Z)$ を満たす可測関数 $f$ が存在する（$Y$ が $Z$ より「粗い」）とき：

$$
E\!\left[E[X \mid Z] \mid Y\right] = E[X \mid Y]. \tag{2}
$$

細かい $Z$ で条件付けた後に粗い $Y$ でさらに条件付けると、余分な精度が洗い流され $Y$ 水準の情報だけが残る。

## まとめ

- **$E[X \mid B]$**：$P(\cdot \mid B)$ のもとでの $X$ の期待値；$P(B) > 0$ の固定した事象が与えられたときの定数。
- **$E[X \mid Y = y]$**：$Y = y$ がわかっているときの $X$ の条件付き平均；$y$ の決定的な関数。
- **$E[X \mid Y]$**：$g(Y)$（$g(y) = E[X \mid Y = y]$）という確率変数；$Y$ から $X$ の二乗平均誤差最小予測。
- 主要な性質：**線形性**、**単調性**、**既知量を外に出す**（$E[h(Y) X \mid Y] = h(Y) E[X \mid Y]$）、**反復条件付け**（$Z$ より粗い $Y$ のとき $E[E[X \mid Z] \mid Y] = E[X \mid Y]$）。
