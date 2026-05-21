---
title: イェンセンの不等式
summary: "$f$ がある区間上で凸であり、$x_1, \\ldots, x_n$ がその区間に属する点で非負の重み $\\lambda_i$ の和が1であるとき、$f(\\sum \\lambda_i x_i) \\leq \\sum \\lambda_i f(x_i)$ が成り立つ。このチェックポイントでは凸性の二点定義から $n$ に関する帰納法によってイェンセンの不等式を証明し、狭義凸の場合の等号条件を明らかにする。"
prerequisites:
  - basis/math/calculus/differential/convex
aliases: []
tags:
  - 微積分
  - 凸性
  - 不等式
updated: 2026-05-20
---

[凸性の定義](../convex/)は、二つの入力の加重平均を $f$ に代入した値が、出力の加重平均以下であることを述べる。イェンセンの不等式（Jensen's inequality）はこれを二点から有限個の点へ拡張する。その論証は最も単純なものだ：帰納法だ。

## 定理

**定理（イェンセンの不等式）。** $I \subseteq \mathbb{R}$ を区間、$f : I \to \mathbb{R}$ を凸関数、$n \geq 1$ とする。$x_1, \ldots, x_n \in I$ かつ $\lambda_1, \ldots, \lambda_n \geq 0$ で $\sum_{i=1}^n \lambda_i = 1$ とする。このとき

$$
f\!\left(\sum_{i=1}^{n} \lambda_i x_i\right) \;\leq\; \sum_{i=1}^{n} \lambda_i f(x_i). \tag{1}
$$

左辺は $x_i$ の加重平均に $f$ を適用したもの、右辺は関数値の加重平均だ。

## 帰納法による証明

**基底（$n = 1$）。** 両辺ともに $f(x_1)$ に等しい。$\checkmark$

**基底（$n = 2$）。** これはまさに凸性の定義だ：$\lambda_1 + \lambda_2 = 1$ のもとで $f(\lambda_1 x_1 + \lambda_2 x_2) \leq \lambda_1 f(x_1) + \lambda_2 f(x_2)$。$\checkmark$

**帰納段階。** ある $n \geq 2$ に対して $(1)$ が成り立つと仮定し、$n + 1$ の場合を証明する。

$x_1, \ldots, x_{n+1} \in I$ かつ $\lambda_1, \ldots, \lambda_{n+1} \geq 0$ で $\sum_{i=1}^{n+1} \lambda_i = 1$ とする。

$\lambda_{n+1} = 1$ ならば他のすべての重みはゼロであり、両辺ともに $f(x_{n+1})$ に等しい。そこで $\lambda_{n+1} < 1$、すなわち $\mu \coloneqq 1 - \lambda_{n+1} > 0$ と仮定する。

$i = 1, \ldots, n$ に対して $\mu_i \coloneqq \lambda_i / \mu$ と定義する。すると $\mu_i \geq 0$ かつ $\sum_{i=1}^n \mu_i = 1$ であり、$z \coloneqq \sum_{i=1}^n \mu_i x_i \in I$（区間は凸結合で閉じている）。左辺を書き換えると：

$$
\sum_{i=1}^{n+1} \lambda_i x_i \;=\; \mu z + \lambda_{n+1} x_{n+1},
\qquad \mu + \lambda_{n+1} = 1.
$$

$z$ と $x_{n+1}$ に対し、重みを $\mu$ と $\lambda_{n+1}$ として二点凸性不等式（基底 $n = 2$）を適用すると：

$$
f\!\left(\sum_{i=1}^{n+1} \lambda_i x_i\right)
= f(\mu z + \lambda_{n+1} x_{n+1})
\leq \mu f(z) + \lambda_{n+1} f(x_{n+1}).
$$

$z = \sum_{i=1}^n \mu_i x_i$ に対し、重みを $\mu_i$ として帰納法の仮定を適用すると：

$$
f(z) \;\leq\; \sum_{i=1}^n \mu_i f(x_i).
$$

これらを合わせ、$\mu_i = \lambda_i / \mu$ を代入すると：

$$
f\!\left(\sum_{i=1}^{n+1} \lambda_i x_i\right)
\;\leq\; \mu \sum_{i=1}^n \frac{\lambda_i}{\mu} f(x_i) + \lambda_{n+1} f(x_{n+1})
\;=\; \sum_{i=1}^{n+1} \lambda_i f(x_i). \quad \square
$$

## 等号条件

**命題。** $f$ が*狭義凸*であり、すべての $i$ に対して $\lambda_i > 0$ であるとき、$(1)$ で等号が成立するのは $x_1 = x_2 = \cdots = x_n$ のときに限る。

*証明の概略。* 帰納段階において、$z = x_{n+1}$ でない限り二点不等式は狭義であり、$x_1, \ldots, x_n$ がすべて等しくない限り帰納法の仮定も狭義だ。帰納法を追跡すると、どこかで狭義の不等式が発生すれば結論も狭義の不等式になることがわかる。$\square$

## 応用

**相加相乗平均不等式。** $f(t) = -\ln t$（$(0, \infty)$ 上で狭義凸）をとり、一様な重み $\lambda_i = 1/n$ を用いると：

$$
-\ln\!\left(\frac{x_1 + \cdots + x_n}{n}\right) \;\leq\; \frac{-\ln x_1 - \cdots - \ln x_n}{n} \;=\; -\ln\!\left(x_1 \cdots x_n\right)^{1/n}.
$$

符号を反転して指数をとると、相加相乗平均不等式（AM–GM inequality）が得られる：

$$
\frac{x_1 + \cdots + x_n}{n} \;\geq\; (x_1 \cdots x_n)^{1/n}.
$$

**対数和不等式。** $f(t) = t \ln t$（$(0,\infty)$ 上で凸）をとると、情報理論におけるKLダイバージェンスの非負性はイェンセンの不等式に基づく。

## まとめ

- **イェンセンの不等式**：凸な $f$ と和が $1$ の重み $\lambda_i \geq 0$ に対して、
  $$f\!\left(\sum \lambda_i x_i\right) \leq \sum \lambda_i f(x_i).$$
- **証明**：$n$ に関する帰納法。基底 $n = 2$ は凸性の定義、帰納段階は最後の点を切り離して二点不等式を適用する。
- **等号条件**：$f$ が狭義凸ですべての重みが正のとき、等号が成立するのはすべての $x_i$ が等しい場合に限る。
- **相加相乗平均不等式**は直接的な系として得られる：$f = -\ln$ と一様な重みにイェンセンの不等式を適用する。
