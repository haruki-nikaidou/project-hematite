---
title: ヤングの不等式
summary: "非負の $a, b$ と $1/p + 1/q = 1$（$p, q > 1$）を満たす共役指数に対して、ヤングの不等式 $ab \\leq a^p/p + b^q/q$ を、指数関数の凸性とイェンセンの不等式を組み合わせて証明する。"
prerequisites:
  - basis/math/analysis/functions/exp
  - basis/math/analysis/functions/log
  - basis/math/calculus/differential/jensons_inequality
aliases: []
tags:
  - 証明
  - 不等式
updated: 2026-05-20
---

ヤングの不等式は、解析学の驚くほど多くの場面を動かす小さなてこだ。二つの数の*積*を、それらのべき乗の*和*に変えてしまう。そしてこの一つの交換こそが、[ヘルダーの不等式](../holders_inequalities/)を、さらにそれを通じて[ミンコフスキーの不等式](../minkowskis_inequalities/)を立ち上げるのにちょうど必要なものだ。正しく設定すれば、証明は[凸性](../../../../basis/math/calculus/differential/jensons_inequality/)のたった一行で済む。

## 共役指数

二つの実数 $p, q > 1$ が**共役指数**（conjugate exponents）であるとは、

$$
\frac{1}{p} + \frac{1}{q} = 1
$$

が成り立つことをいう。同値に $q = \dfrac{p}{p-1}$ だ。組 $(2, 2)$ は自分自身と共役であり、$(1, \infty)$ は通常別に扱う極限の場合だ。この定義の等式は、$1/p$ と $1/q$ が和 $1$ になる重みであることを述べている——これが証明を凸結合として読めるようにしてくれる。

## 定理

**定理（ヤングの不等式）.** $p, q > 1$ を共役指数とし、$a, b \geq 0$ とする。このとき

$$
ab \;\leq\; \frac{a^p}{p} + \frac{b^q}{q}, \tag{1}
$$

が成り立ち、等号は $a^p = b^q$ のとき、かつそのときに限り成立する。

## 指数関数の凸性による証明

$a = 0$ または $b = 0$ なら左辺は $0$ で右辺は非負だから $(1)$ は成り立つ。よって以下では $a, b > 0$ とする。

鍵は[指数関数](../../../../basis/math/analysis/functions/exp/)だ。これは $\mathbb{R}$ 全体で凸なので、[イェンセンの不等式](../../../../basis/math/calculus/differential/jensons_inequality/)の二点の場合から、任意の実数 $x, y$ と和 $1$ になる重み $1/p, 1/q$ に対して

$$
\exp\!\left(\frac{1}{p}\,x + \frac{1}{q}\,y\right) \;\leq\; \frac{1}{p}\,e^{x} + \frac{1}{q}\,e^{y} \tag{2}
$$

が成り立つ。

そこで、指数が $a^p$ と $b^q$ になるように入力を選ぶ。[対数](../../../../basis/math/analysis/functions/log/)を使って、

$$
x \coloneqq p \ln a, \qquad y \coloneqq q \ln b
$$

とおく。すると $e^{x} = a^{p}$、$e^{y} = b^{q}$ となり、$(2)$ の左辺の引数は崩れて

$$
\frac{1}{p}\,x + \frac{1}{q}\,y \;=\; \ln a + \ln b \;=\; \ln(ab),
$$

となるので $\exp\!\big(\tfrac{1}{p}x + \tfrac{1}{q}y\big) = ab$ だ。これを $(2)$ に代入すると、ちょうど

$$
ab \;\leq\; \frac{a^p}{p} + \frac{b^q}{q}
$$

が得られる。$\square$

## 等号条件

指数関数は*狭義*凸だから、$(2)$ が等号になるのは二つの入力が一致するとき、すなわち $x = y$、つまり $p \ln a = q \ln b$ のとき、かつそのときに限る。両辺の指数をとればこれは $a^p = b^q$ だ。したがって $(1)$ の等号はちょうど $a^p = b^q$ のときに成立する。

## まとめ

- **共役指数** $p, q > 1$ は $1/p + 1/q = 1$ を満たし、二つの逆数は和 $1$ になる重みとして働く。
- **ヤングの不等式**：$a, b \geq 0$ に対して $ab \leq \dfrac{a^p}{p} + \dfrac{b^q}{q}$。
- **証明**：$ab = \exp(\tfrac{1}{p}\cdot p\ln a + \tfrac{1}{q}\cdot q\ln b)$ と書いて $\exp$ の凸性を使う——二点版イェンセンの不等式を一度使うだけだ。
- **等号**は $a^p = b^q$ のとき成立する。$\exp$ が狭義凸だからだ。
- この不等式は[ヘルダーの不等式](../holders_inequalities/)を支えるエンジンだ。
