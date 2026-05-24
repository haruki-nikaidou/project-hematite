---
title: ガンマ分布
summary: "形状パラメータ α > 0 とレートパラメータ λ > 0 を持つガンマ分布の密度は f(x) = λ^α x^(α−1) e^(−λx) / Γ(α)（x > 0）で、Γ はガンマ関数だ。このチェックポイントでは分布を定義し、整数 α について α 個の独立な指数分布 Exp(λ) の和がガンマ分布 Gamma(α, λ) になることを示し、平均 α/λ と分散 α/λ² を計算する。"
prerequisites:
  - essential/math/probability/random_variables/exponential
aliases: []
tags:
  - 確率
  - 確率変数
  - 分布
updated: 2026-05-22
---

レート $\lambda$ のポアソン過程で事象が起き、$\alpha$ 番目の事象が到来するまでの時間を知りたいとする。最初の事象までの待機時間は[指数分布](../exponential/)に従う；$\alpha$ 番目の事象までの待機時間は**ガンマ分布**（Gamma distribution）に従う——指数分布を任意の事象数に一般化した二パラメータ族だ。

## ガンマ関数

分布を定義する前に、**ガンマ関数**（gamma function）$\Gamma : (0, \infty) \to (0, \infty)$ を思い出す：

$$
\Gamma(\alpha) \coloneqq \int_0^{\infty} t^{\alpha - 1} e^{-t}\, dt.
$$

$\Gamma$ を正規化定数として適切たらしめる二つの重要な性質がある：

**漸化式。** 部分積分により $\Gamma(\alpha + 1) = \alpha\,\Gamma(\alpha)$ がすべての $\alpha > 0$ で成り立つ。

**整数値。** $\Gamma(1) = \int_0^\infty e^{-t}\,dt = 1$ と漸化式を合わせると

$$
\Gamma(n) = (n-1)! \quad \text{（すべての正の整数 $n$ に対して）}.
$$

**半整数。** 有名な結果として $\Gamma(1/2) = \sqrt{\pi}$ が成り立ち、$\Gamma$ が非整数引数へ階乗を拡張することを示す。

## 定義

$\alpha > 0$ を**形状パラメータ**（shape parameter）、$\lambda > 0$ を**レートパラメータ**とする。確率変数 $X$ がガンマ分布に従うとき、$X \sim \operatorname{Gamma}(\alpha, \lambda)$ と書き、その**確率密度関数**は

$$
f(x) \coloneqq \frac{\lambda^\alpha}{\Gamma(\alpha)}\, x^{\alpha-1} e^{-\lambda x}, \quad x > 0.
$$

$\alpha = 1$ のとき $f(x) = \lambda e^{-\lambda x}$ となり、$\operatorname{Exp}(\lambda)$ が復元される。大きな $\alpha$ は確率質量をより大きな値に向けてシフトし、より多くの事象を待つ長い待機時間を反映する。

### $f$ が正当な PDF であることの検証

非負性は明らか。積分については $u \coloneqq \lambda x$（$x = u/\lambda$、$dx = du/\lambda$）と置換すると：

$$
\int_0^{\infty} \frac{\lambda^\alpha}{\Gamma(\alpha)}\, x^{\alpha-1} e^{-\lambda x}\, dx = \frac{\lambda^\alpha}{\Gamma(\alpha)} \int_0^{\infty} \left(\frac{u}{\lambda}\right)^{\alpha-1} e^{-u} \frac{du}{\lambda} = \frac{1}{\Gamma(\alpha)} \int_0^{\infty} u^{\alpha-1} e^{-u}\, du = \frac{\Gamma(\alpha)}{\Gamma(\alpha)} = 1.
$$

## 指数確率変数の和

ガンマ分布を理解する最も具体的な方法は指数分布との関係を通してだ。**整数** $\alpha = n$ の場合：

**定理。** $X_1, X_2, \ldots, X_n$ が独立で各 $X_i \sim \operatorname{Exp}(\lambda)$ ならば

$$
S_n \coloneqq X_1 + X_2 + \cdots + X_n \sim \operatorname{Gamma}(n, \lambda).
$$

**モーメント母関数による証明。** $X_i \sim \operatorname{Exp}(\lambda)$ の MGF は

$$
M_{X_i}(t) = E[e^{tX_i}] = \frac{\lambda}{\lambda - t}, \quad t < \lambda.
$$

$X_i$ が独立なので、和の MGF は因数分解される：

$$
M_{S_n}(t) = \prod_{i=1}^n M_{X_i}(t) = \left(\frac{\lambda}{\lambda - t}\right)^n.
$$

$\operatorname{Gamma}(n, \lambda)$ が同じ MGF を持つことが（置換 $u = (\lambda - t)x$ を使った $E[e^{tX}]$ の計算で）確認でき、MGF は分布を一意に決定するので $S_n \sim \operatorname{Gamma}(n, \lambda)$ が従う。$\square$

ポアソン過程の解釈では：$S_n$ は $n$ 番目の到着時刻であり、定理はこれが $\operatorname{Gamma}(n, \lambda)$ であることを確認する。

## 平均

$X \sim \operatorname{Gamma}(\alpha, \lambda)$ の平均は $\Gamma$ の漸化式から読み取れる：

$$
E[X] = \int_0^{\infty} x \cdot \frac{\lambda^\alpha}{\Gamma(\alpha)}\, x^{\alpha-1} e^{-\lambda x}\, dx = \frac{\lambda^\alpha}{\Gamma(\alpha)} \int_0^{\infty} x^{\alpha} e^{-\lambda x}\, dx.
$$

$u = \lambda x$ と置換すると $\int_0^\infty x^\alpha e^{-\lambda x}\,dx = \Gamma(\alpha+1)/\lambda^{\alpha+1}$ が得られ、

$$
E[X] = \frac{\lambda^\alpha}{\Gamma(\alpha)} \cdot \frac{\Gamma(\alpha+1)}{\lambda^{\alpha+1}} = \frac{\Gamma(\alpha+1)}{\lambda\,\Gamma(\alpha)} = \frac{\alpha\,\Gamma(\alpha)}{\lambda\,\Gamma(\alpha)} = \frac{\alpha}{\lambda}.
$$

整数 $\alpha = n$ の場合、これは直観と一致する：$n$ 個の独立な $\operatorname{Exp}(\lambda)$ 事象の期待待機時間は $n \cdot (1/\lambda)$ だ。

## 分散

同様に同じ置換で $E[X^2]$ を計算する：

$$
E[X^2] = \frac{\lambda^\alpha}{\Gamma(\alpha)} \cdot \frac{\Gamma(\alpha+2)}{\lambda^{\alpha+2}} = \frac{\alpha(\alpha+1)}{\lambda^2}.
$$

したがって

$$
\operatorname{Var}(X) = E[X^2] - (E[X])^2 = \frac{\alpha(\alpha+1)}{\lambda^2} - \frac{\alpha^2}{\lambda^2} = \frac{\alpha}{\lambda^2}.
$$

## 加法的性質

上の MGF の議論から**加法的性質**が導かれる：$X_1 \sim \operatorname{Gamma}(\alpha_1, \lambda)$ と $X_2 \sim \operatorname{Gamma}(\alpha_2, \lambda)$ が独立で**同じレート**を持つとき、

$$
X_1 + X_2 \sim \operatorname{Gamma}(\alpha_1 + \alpha_2,\, \lambda).
$$

形状パラメータは加算され、レートは保持される。これは指数分布の和の解釈と整合する：$\alpha_1$ 個と $\alpha_2$ 個の i.i.d. $\operatorname{Exp}(\lambda)$ 待機時間を合わせると $\operatorname{Gamma}(\alpha_1 + \alpha_2, \lambda)$ の待機時間になる。なお加法的性質は二つのレートが異なる場合には成り立たない。

## まとめ

- ガンマ関数 $\Gamma(\alpha) = \int_0^\infty t^{\alpha-1} e^{-t}\,dt$ は $\Gamma(\alpha+1) = \alpha\,\Gamma(\alpha)$ と正の整数 $n$ に対して $\Gamma(n) = (n-1)!$ を満たす。
- $X \sim \operatorname{Gamma}(\alpha, \lambda)$ は PDF $f(x) = \lambda^\alpha x^{\alpha-1} e^{-\lambda x} / \Gamma(\alpha)$（$x > 0$）を持ち、形状 $\alpha > 0$ とレート $\lambda > 0$ を持つ。
- 整数 $\alpha = n$ の場合：$n$ 個の独立な $\operatorname{Exp}(\lambda)$ 変数の和は $\operatorname{Gamma}(n, \lambda)$ だ。
- 平均：$E[X] = \alpha/\lambda$。
- 分散：$\operatorname{Var}(X) = \alpha/\lambda^2$。
- 加法的性質：独立な $\operatorname{Gamma}(\alpha_1, \lambda)$ と $\operatorname{Gamma}(\alpha_2, \lambda)$ の和は $\operatorname{Gamma}(\alpha_1 + \alpha_2, \lambda)$。
