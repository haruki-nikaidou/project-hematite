---
title: テイラーの公式
summary: "テイラーの公式（Taylor's formula）は、$n$ 回微分可能な関数を $x_0$ の近くで $n$ 次多項式によって近似し、その係数は $x_0$ における $f$ の導関数の値を階乗で割ったものだ。このチェックポイントではラグランジュ剰余項の形でテイラーの公式を証明し、それが基本関数の冪級数展開の基礎となることを示す。"
prerequisites:
  - basis/math/calculus/differential/higher_order_dif
  - basis/math/calculus/differential/lagranges_finite-increment_theorem
aliases: []
tags:
  - 微積分
  - 微分
updated: 2026-05-20
---

[平均値の定理](../lagranges_finite-increment_theorem/)は $x_0$ と $x$ の間のある未知の $c$ に対して $f(x) = f(x_0) + f'(c)(x - x_0)$ と述べる。これは精度の粗い剰余項を持つ線形近似だ。テイラーの公式（Taylor's Formula）はこの考えを全次数に拡張する：$f$ を $n$ 次多項式で近似し、残りの誤差を明示的に表す。

## テイラー多項式

**定義。** $f$ の $x_0$ における**$n$ 次テイラー多項式（Taylor polynomial of degree $n$）**を

$$
P_n(x) \;\coloneqq\; \sum_{k=0}^{n} \frac{f^{(k)}(x_0)}{k!}\,(x - x_0)^k
= f(x_0) + f'(x_0)(x-x_0) + \frac{f''(x_0)}{2!}(x-x_0)^2 + \cdots + \frac{f^{(n)}(x_0)}{n!}(x-x_0)^n
$$

と定める。

係数 $\dfrac{f^{(k)}(x_0)}{k!}$ は $P_n^{(k)}(x_0) = f^{(k)}(x_0)$（$k = 0, 1, \ldots, n$）を成り立たせる唯一の値だ：この多項式は $x_0$ において $f$ とその $n$ 次までの全導関数の値が一致する。

## ラグランジュ剰余項によるテイラーの公式

**定理（テイラーの公式）。** $f$ が $x_0$ と $x$ を含む開区間上で $n+1$ 回微分可能とする。このとき

$$
f(x) \;=\; P_n(x) \;+\; R_n(x), \tag{1}
$$

が成り立つ。ここで**ラグランジュ剰余項（Lagrange remainder）**は

$$
R_n(x) \;=\; \frac{f^{(n+1)}(\xi)}{(n+1)!}\,(x - x_0)^{n+1} \tag{2}
$$

であり、$\xi$ は $x_0$ と $x$ の間のある点だ。

## 証明

$x \neq x_0$ を固定し、$J$ を $x_0$ と $x$ を端点とする閉区間とする。次の関数を定義する：

$$
F(t) \;\coloneqq\; f(x) - \sum_{k=0}^{n} \frac{f^{(k)}(t)}{k!}(x - t)^k, \qquad G(t) \;\coloneqq\; (x - t)^{n+1}.
$$

$F$、$G$ はともに $J$ 上で連続、$J$ の内部で微分可能だ。次のことに注目する：
- $F(x) = 0$ かつ $G(x) = 0$。
- $F(x_0) = f(x) - P_n(x)$ かつ $G(x_0) = (x - x_0)^{n+1} \neq 0$。

**$F$ の導関数の望遠鏡和。** [積の微分法則](../basic_roles_of_dif/)を各項 $\tfrac{f^{(k)}(t)}{k!}(x-t)^k$ に適用すると：

$$
\frac{d}{dt}\left[\frac{f^{(k)}(t)}{k!}(x-t)^k\right]
= \frac{f^{(k+1)}(t)}{k!}(x-t)^k \;-\; \frac{f^{(k)}(t)}{(k-1)!}(x-t)^{k-1}.
$$

$k = 0$ から $n$ まで和をとると、望遠鏡のように各項 $\tfrac{f^{(k)}(t)}{(k-1)!}(x-t)^{k-1}$ が $k \mapsto k-1$ に対応する第一項と消え合い、$k = n$ の第一項だけが残る：

$$
F'(t) \;=\; -\frac{f^{(n+1)}(t)}{n!}(x - t)^n, \qquad G'(t) \;=\; -(n+1)(x-t)^n.
$$

**ロールの定理の適用。** 補助関数

$$
\phi(t) \;\coloneqq\; F(t) - \frac{F(x_0)}{G(x_0)}\,G(t)
$$

を定める。$\phi(x_0) = 0$ かつ $\phi(x) = F(x) - \tfrac{F(x_0)}{G(x_0)} \cdot 0 = 0$ だ。[ロールの定理](../rolles_theorem/)より、$x_0$ と $x$ の間に $\phi'(\xi) = 0$ を満たす $\xi$ が存在する：

$$
F'(\xi) - \frac{F(x_0)}{G(x_0)}\,G'(\xi) = 0.
$$

$\xi \neq x$ より $(x - \xi)^n \neq 0$ なので、$F'$、$G'$ を代入すると：

$$
-\frac{f^{(n+1)}(\xi)}{n!}(x-\xi)^n + \frac{F(x_0)}{G(x_0)}(n+1)(x-\xi)^n = 0
\;\;\Longrightarrow\;\;
\frac{F(x_0)}{G(x_0)} = \frac{f^{(n+1)}(\xi)}{(n+1)!}.
$$

両辺に $G(x_0) = (x-x_0)^{n+1}$ を掛けると $F(x_0) = R_n(x)$ が $(2)$ の形で得られる。$\square$

## 標準的なマクローリン展開

$x_0 = 0$ の場合を**マクローリン展開（Maclaurin expansion）**という。$n \to \infty$ として $R_n \to 0$ を確認すると、全ての $x \in \mathbb{R}$ に対して以下が成り立つ：

$$
e^x \;=\; \sum_{k=0}^{\infty} \frac{x^k}{k!} \;=\; 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots
$$

$$
\sin x \;=\; \sum_{k=0}^{\infty} \frac{(-1)^k}{(2k+1)!} x^{2k+1} \;=\; x - \frac{x^3}{6} + \frac{x^5}{120} - \cdots
$$

$$
\cos x \;=\; \sum_{k=0}^{\infty} \frac{(-1)^k}{(2k)!} x^{2k} \;=\; 1 - \frac{x^2}{2} + \frac{x^4}{24} - \cdots
$$

$$
\ln(1+x) \;=\; \sum_{k=1}^{\infty} \frac{(-1)^{k-1}}{k} x^k \;=\; x - \frac{x^2}{2} + \frac{x^3}{3} - \cdots \quad (-1 < x \leq 1)
$$

$$
(1+x)^\alpha \;=\; \sum_{k=0}^{\infty} \binom{\alpha}{k} x^k \;=\; 1 + \alpha x + \frac{\alpha(\alpha-1)}{2!}x^2 + \cdots \quad (|x| < 1)
$$

ここで一般化二項係数は $\binom{\alpha}{k} \coloneqq \dfrac{\alpha(\alpha-1)\cdots(\alpha-k+1)}{k!}$ だ。

## 剰余項による誤差評価

ラグランジュ形式 $(2)$ は具体的な誤差上界を与える。$x_0$ と $x$ の間の全ての $t$ に対して $|f^{(n+1)}(t)| \leq M$ ならば、

$$
|R_n(x)| \;\leq\; \frac{M}{(n+1)!}\,|x - x_0|^{n+1}.
$$

**例。** $x_0 = 0$ における $P_3$ を使って $e^{0.1}$ を近似する。

$$
P_3(0.1) \;=\; 1 + 0.1 + \frac{0.01}{2} + \frac{0.001}{6} \;\approx\; 1.10516\overline{6}.
$$

剰余項は $|R_3(0.1)| \leq \dfrac{e^{0.1}}{4!}(0.1)^4 < \dfrac{3}{24} \cdot 10^{-4} \approx 1.25 \times 10^{-5}$ を満たす。この近似は小数点以下5桁まで正確だ。

## 極限の計算

テイラーの公式は不定形の極限を機械的に計算できるようにする。$\lim_{x \to 0} \dfrac{\sin x - x}{x^3}$ を求めるには、$\sin x = x - \dfrac{x^3}{6} + O(x^5)$ と展開すればよい：

$$
\frac{\sin x - x}{x^3} \;=\; \frac{-x^3/6 + O(x^5)}{x^3} \;\to\; -\frac{1}{6}.
$$

## まとめ

- $x_0$ における**テイラー多項式** $P_n$ は $x_0$ において $f$ とその $n$ 次までの全導関数の値が一致する。
- **テイラーの公式**：$f(x) = P_n(x) + R_n(x)$ であり、**ラグランジュ剰余項**は $R_n(x) = \dfrac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_0)^{n+1}$（$\xi$ は $x_0$ と $x$ の間のある点）だ。
- **証明の方針**：$x_0$ での値が剰余項に等しい補助関数を定義し、コーシーの平均値定理を適用して最高次の導関数項以外を消去する。
- ラグランジュ剰余項は $|f^{(n+1)}| \leq M$ のとき上界 $|R_n(x)| \leq \dfrac{M}{(n+1)!}|x-x_0|^{n+1}$ を与える。
- $e^x$、$\sin x$、$\cos x$、$\ln(1+x)$、$(1+x)^\alpha$ の標準的な冪級数は $n \to \infty$ とすることで得られる。
