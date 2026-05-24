---
title: 指数分布
summary: "レート λ の指数分布は密度 f(x) = λ e^(−λx)（x ≥ 0）を持ち、無記憶性を持つ [0, ∞) 上の唯一の絶対連続分布だ。このチェックポイントでは分布を構成し、平均 1/λ と分散 1/λ² を計算し、幾何分布の連続時間版でありポアソン過程の到着間隔法則であることを説明する。"
prerequisites:
  - essential/math/probability/random_variables/concept
aliases: []
tags:
  - 確率
  - 確率変数
  - 分布
updated: 2026-05-22
---

完全にランダムに到着するバスをどれくらい待たなければならないか？放射性原子が崩壊するまでどれくらいかかるか？いずれの場合も待機時間は過去の記憶を持たない——この挙動を捉える分布が**指数分布**（Exponential distribution）だ。

## 定義

$\lambda > 0$ を**レートパラメータ**（rate parameter）とする。[確率変数](../concept/) $X$ がレート $\lambda$ の指数分布に従うとき、$X \sim \operatorname{Exp}(\lambda)$ と書き、その**確率密度関数**（PDF：probability density function）は

$$
f(x) \coloneqq \begin{cases} \lambda e^{-\lambda x} & x \geq 0, \\ 0 & x < 0. \end{cases}
$$

パラメータ $\lambda$ は単位時間あたりの平均事象数を表し、その逆数 $1/\lambda$ が平均待機時間だ。

### $f$ が正当な PDF であることの検証

正当な PDF は非負で 1 に積分されなければならない。$\lambda > 0$ と $e^{-\lambda x} > 0$ より非負性は明らか。積分について：

$$
\int_{-\infty}^{\infty} f(x)\, dx = \int_0^{\infty} \lambda e^{-\lambda x}\, dx = \lambda \cdot \left[-\frac{1}{\lambda} e^{-\lambda x}\right]_0^{\infty} = \lambda \cdot \frac{1}{\lambda} = 1.
$$

## 累積分布関数

PDF を積分すると**累積分布関数**（CDF：cumulative distribution function）が得られる：

$$
F(x) \coloneqq P(X \leq x) = \begin{cases} 1 - e^{-\lambda x} & x \geq 0, \\ 0 & x < 0. \end{cases}
$$

同等に、**生存関数**（survival function）は $P(X > x) = e^{-\lambda x}$（$x \geq 0$）だ。

## 平均

$X \sim \operatorname{Exp}(\lambda)$ の**平均**（期待値）は部分積分で導出する。$u = x$、$dv = \lambda e^{-\lambda x}\,dx$ とおくと $du = dx$、$v = -e^{-\lambda x}$：

$$
E[X] = \int_0^{\infty} x \lambda e^{-\lambda x}\, dx = \Bigl[-x e^{-\lambda x}\Bigr]_0^{\infty} + \int_0^{\infty} e^{-\lambda x}\, dx.
$$

境界項はゼロになり（$x e^{-\lambda x} \to 0$（$x \to \infty$）なので）、残りの積分から

$$
E[X] = \int_0^{\infty} e^{-\lambda x}\, dx = \frac{1}{\lambda}.
$$

## 分散

$\operatorname{Var}(X) = E[X^2] - (E[X])^2$ を求めるため、部分積分を 2 回行って $E[X^2]$ を計算する（またはモーメント母関数を微分する）。$u = x^2$、$dv = \lambda e^{-\lambda x}\,dx$ として部分積分すると：

$$
E[X^2] = \int_0^{\infty} x^2 \lambda e^{-\lambda x}\, dx = \Bigl[-x^2 e^{-\lambda x}\Bigr]_0^{\infty} + \int_0^{\infty} 2x e^{-\lambda x}\, dx = \frac{2}{\lambda} E[X] = \frac{2}{\lambda^2}.
$$

したがって

$$
\operatorname{Var}(X) = E[X^2] - (E[X])^2 = \frac{2}{\lambda^2} - \frac{1}{\lambda^2} = \frac{1}{\lambda^2}.
$$

標準偏差は平均に等しい：$\sigma = 1/\lambda$。

## 無記憶性

指数分布の最も特徴的な性質は**無記憶性**（memorylessness）だ：すべての $s, t \geq 0$ に対して

$$
P(X > s + t \mid X > s) = P(X > t).
$$

**証明。** 条件付き確率の定義と生存関数から：

$$
P(X > s + t \mid X > s) = \frac{P(X > s + t)}{P(X > s)} = \frac{e^{-\lambda(s+t)}}{e^{-\lambda s}} = e^{-\lambda t} = P(X > t). \quad \square
$$

直観的に言えば：事象なしにすでに $s$ 時間待ったとしても、残りの待機時間の分布はちょうど最初から始めたときとまったく同じだ。過去の待機時間は無関係だ。

### 一意性

指数分布は $[0, \infty)$ 上で無記憶性を持つ**唯一の絶対連続分布**だ。すべての $s, t \geq 0$ に対して $P(X > s+t \mid X > s) = P(X > t)$ を満たす非負の連続確率変数はある $\lambda > 0$ に対して $\operatorname{Exp}(\lambda)$ でなければならない。

これが指数分布を幾何分布の連続時間版として位置づける：幾何分布は $\{0, 1, 2, \ldots\}$ 上で無記憶性を持つ唯一の離散分布だ。

## ポアソン過程との関係

レート $\lambda$ の**ポアソン過程**（Poisson process）では、連続時間上でランダムに事象が起き、長さ $t$ の任意の区間内の事象数は平均 $\lambda t$ のポアソン分布に従う。**到着間隔時間**——連続する事象の間の待機時間——は独立で各々 $\operatorname{Exp}(\lambda)$ に従う。

この関係は根本的なものだ：指数分布はポアソン過程の連続時間版の構成要素であり、幾何分布がベルヌーイ試行の離散時間版の構成要素であるのと同様だ。

## まとめ

- $X \sim \operatorname{Exp}(\lambda)$ は $x \geq 0$ に対して PDF $f(x) = \lambda e^{-\lambda x}$ とレートパラメータ $\lambda > 0$ を持つ。
- CDF：$F(x) = 1 - e^{-\lambda x}$（$x \geq 0$）。
- 平均：$E[X] = 1/\lambda$。
- 分散：$\operatorname{Var}(X) = 1/\lambda^2$；標準偏差は平均に等しい。
- 無記憶性：$P(X > s+t \mid X > s) = P(X > t)$；指数分布は $[0, \infty)$ 上でこの性質を持つ唯一の連続分布だ。
- レート $\lambda$ のポアソン過程の到着間隔時間は独立な $\operatorname{Exp}(\lambda)$ 確率変数だ。
