---
title: 2次元確率変数の同時分布
summary: "同一の確率空間上の確率変数の対 (X, Y) は ℝ² 上の同時分布を誘導し、周辺分布はもう一方の変数を積分消去することで得られる。このチェックポイントでは同時 CDF・同時 PMF・同時密度を定義し、同時分布から周辺分布を導く公式を導出し、同時分布が周辺分布のみから得られる情報より真に豊かであることを説明する。"
prerequisites:
  - essential/math/probability/random_variables/concept
aliases: []
tags:
  - Probability
  - Random Variables
updated: 2026-05-22
---

単一の[確率変数](../concept/) $X$ だけなら、その分布から $\{X \in B\}$ 型のあらゆる事象の確率が分かる。しかし同一確率空間上の 2 つの確率変数 $X$ と $Y$ は、それぞれの周辺分布では決して見えない形で**相関**しているかもしれない——$X$ の値を知ることで $Y$ への期待が変わりうる。これを捉えるには**同時分布**（joint distribution）が必要だ：$(X, Y)$ が $\mathbb{R}^2$ 上に誘導する確率測度のことだ。

## 同時分布と同時 CDF

$(\Omega, \mathcal{F}, P)$ を確率空間とし、$X, Y : \Omega \to \mathbb{R}$ を同一空間上の確率変数とする。対 $(X, Y)$ は $\mathbb{R}^2$ に値をとる確率ベクトルと見なせる。その**同時分布**（joint distribution）は $(\mathbb{R}^2, \mathcal{B}(\mathbb{R}^2))$ 上の押し出し測度（push-forward measure）$P_{(X,Y)}$ だ：

$$
P_{(X,Y)}(A) \coloneqq P\bigl(\{\omega : (X(\omega), Y(\omega)) \in A\}\bigr), \quad A \in \mathcal{B}(\mathbb{R}^2).
$$

**同時累積分布関数**（joint CDF）を次で定義する：

$$
F_{X,Y}(x, y) \coloneqq P(X \leq x,\, Y \leq y), \quad (x, y) \in \mathbb{R}^2.
$$

各引数について単調非減少かつ右連続であり、どちらかの引数が $-\infty$ に近づくと $0$ に、両方が $+\infty$ に近づくと $1$ に収束する。長方形 $(a, b] \times (c, d]$ の確率は包除原理で得られる：

$$
P(a < X \leq b,\, c < Y \leq d) = F_{X,Y}(b, d) - F_{X,Y}(a, d) - F_{X,Y}(b, c) + F_{X,Y}(a, c).
$$

## 離散の場合：同時 PMF

$(X, Y)$ が**同時離散**（jointly discrete）であるとは、可算集合 $S \subseteq \mathbb{R}^2$ が存在して $P((X,Y) \in S) = 1$ となる場合をいう。**同時確率質量関数**（joint PMF）を次で定義する：

$$
p_{X,Y}(x, y) \coloneqq P(X = x,\, Y = y).
$$

これは $p_{X,Y}(x,y) \geq 0$ を満たし、

$$
\sum_{(x,y) \in S} p_{X,Y}(x, y) = 1.
$$

**例。** 公平なサイコロを 2 つ独立に振る。$X$ を 1 つ目の目、$Y$ を 2 つ目の目とすると、同時 PMF は $i, j \in \{1, \ldots, 6\}$ のとき $p_{X,Y}(i, j) = \frac{1}{36}$、それ以外は $0$ だ。

## 絶対連続の場合：同時 PDF

$(X, Y)$ が**同時絶対連続**（jointly absolutely continuous）であるとは、非負可測関数 $f_{X,Y} : \mathbb{R}^2 \to [0, \infty)$ が存在してすべてのボレル集合 $A \subseteq \mathbb{R}^2$ に対し

$$
P\bigl((X, Y) \in A\bigr) = \iint_A f_{X,Y}(x, y) \, dx \, dy
$$

が成立する場合をいう。$f_{X,Y}$ を**同時確率密度関数**（joint PDF）と呼ぶ。これは

$$
\iint_{\mathbb{R}^2} f_{X,Y}(x, y) \, dx \, dy = 1
$$

を満たす。同時 CDF は積分で復元できる：

$$
F_{X,Y}(x, y) = \int_{-\infty}^{x} \int_{-\infty}^{y} f_{X,Y}(s, t) \, dt \, ds,
$$

$f_{X,Y}$ が連続なら $\dfrac{\partial^2}{\partial x \, \partial y} F_{X,Y}(x,y) = f_{X,Y}(x, y)$ が成立する。

**例。** 単位正方形上の**一様分布**は $f_{X,Y}(x, y) = 1$（$(x, y) \in [0,1]^2$、それ以外 $0$）だ。このとき $P(X \leq \tfrac{1}{2},\, Y \leq \tfrac{1}{2}) = \tfrac{1}{4}$。

## 周辺分布

同時分布が与えられれば、もう一方の変数を**積分消去**（あるいは和消去）することで各変数個別の分布を取り出せる。これを**周辺分布**（marginal distribution）と呼ぶ。

### 離散の場合

$$
p_X(x) = P(X = x) = \sum_{y} p_{X,Y}(x, y), \qquad p_Y(y) = P(Y = y) = \sum_{x} p_{X,Y}(x, y).
$$

### 絶対連続の場合

$$
f_X(x) = \int_{-\infty}^{+\infty} f_{X,Y}(x, y) \, dy, \qquad f_Y(y) = \int_{-\infty}^{+\infty} f_{X,Y}(x, y) \, dx.
$$

周辺 CDF は $F_X(x) = \lim_{y \to +\infty} F_{X,Y}(x, y)$ を満たし、上の公式と整合する。

## 2 変数関数の期待値

同時絶対連続な $(X, Y)$ に対して、可測関数 $g$ の期待値は

$$
E[g(X, Y)] = \iint_{\mathbb{R}^2} g(x, y)\, f_{X,Y}(x, y)\, dx\, dy
$$

で与えられる（積分が絶対収束する場合）。離散の場合は積分を $\sum_{(x,y) \in S} g(x,y)\, p_{X,Y}(x,y)$ で置き換える。これは[期待値](../expectation/)で確立した LOTUS（無意識の統計学者の法則）の 2 変数版だ。

## 同時分布は周辺分布より豊かな情報を持つ

周辺分布 $P_X$ と $P_Y$ を両方知っていても、同時分布 $P_{(X,Y)}$ は一意に決まら**ない**。

**反例。** $U \sim \operatorname{Uniform}(0, 1)$ として 2 つの対を定義する：

- **対 1**：$(X_1, Y_1) = (U, U)$——常に両変数が等しい。
- **対 2**：$(X_2, Y_2) = (U, 1 - U)$——一方を知れば他方が完全に定まる。

$X_1, X_2$ および $Y_1, Y_2$ はいずれも同じ $\operatorname{Uniform}(0,1)$ の周辺分布を持つ。しかし同時分布は全く異なる：対 1 では $P(X_1 = Y_1) = 1$ であり、対 2 では $P(X_2 + Y_2 = 1) = 1$ だ。同時分布は**依存構造**（dependence structure）を符号化する——これは周辺分布が捨ててしまう情報だ。

## まとめ

- $(X,Y)$ の**同時分布**は $\mathbb{R}^2$ 上の押し出し測度 $P_{(X,Y)}$；**同時 CDF** は $F_{X,Y}(x,y) = P(X \leq x, Y \leq y)$。
- 同時離散の場合：**同時 PMF** $p_{X,Y}(x,y) = P(X=x, Y=y)$ の和は $1$；周辺分布は他方の変数について和をとることで得られる。
- 同時絶対連続の場合：**同時 PDF** $f_{X,Y}$ の積分は $1$；周辺分布は他方の変数を積分消去して得られる：$f_X(x) = \int f_{X,Y}(x,y)\,dy$。
- $E[g(X,Y)] = \iint g\, f_{X,Y}\,dx\,dy$（連続）または $\sum g\, p_{X,Y}$（離散）。
- 同時分布は周辺分布の対より真に豊かだ：異なる同時分布が同一の周辺分布を持ちうる。
