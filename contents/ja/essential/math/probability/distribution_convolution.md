---
title: 分布の畳み込み
summary: "二つの独立な確率変数 X + Y の和の分布は、それぞれの分布の畳み込みだ。このチェックポイントでは畳み込みの公式 (f_X * f_Y)(z) = ∫ f_X(x) f_Y(z − x) dx（密度の場合）および PMF に対応する和の公式を導出し、Binomial(m, p) + Binomial(n, p) = Binomial(m + n, p)、Poisson(λ) + Poisson(μ) = Poisson(λ + μ)、N(μ_1, σ_1²) + N(μ_2, σ_2²) = N(μ_1 + μ_2, σ_1² + σ_2²) を計算し、畳み込み演算とモーメント母関数の乗法的性質の関係を説明する。"
prerequisites:
  - essential/math/probability/2d_random_variables/independent
  - essential/math/probability/random_variables/ralationship_of_all_above
aliases: []
tags:
  - 確率
  - 確率変数
  - 分布
updated: 2026-05-22
---

二つの独立な確率変数を足したとき、その和はどんな分布になるか？答えは両者の分布の**畳み込み**（convolution）——一方を他方の上でスライドさせながら組み合わせる数学的演算だ。畳み込みは二項分布・ポアソン分布・正規分布がそれぞれ加法的に振る舞う理由を説明し、分布の代数とモーメント母関数の代数を結びつける架け橋だ。

## 畳み込みの公式

$X$ と $Y$ を [独立な](../2d_random_variables/independent/) 確率変数、$Z = X + Y$ とする。

### 絶対連続の場合

$X$ と $Y$ が密度 $f_X$、$f_Y$ を持つとき、$Z$ の密度は

$$
f_Z(z) = (f_X * f_Y)(z) \coloneqq \int_{-\infty}^{+\infty} f_X(x) \, f_Y(z - x) \, dx. \tag{1}
$$

*導出。* 独立性より $(X, Y)$ の同時密度は $f_{X,Y}(x, y) = f_X(x) f_Y(y)$ と分解される。事象 $\{Z \leq z\}$ は $\{X + Y \leq z\}$ だ。この領域で積分すると：

$$
F_Z(z) = P(X + Y \leq z) = \int_{-\infty}^{+\infty} \int_{-\infty}^{z-x} f_X(x) f_Y(y) \, dy \, dx = \int_{-\infty}^{+\infty} f_X(x) F_Y(z - x) \, dx.
$$

$z$ について微分すると公式 $(1)$ が得られる。

### 離散の場合

$X$ と $Y$ が $\mathbb{Z}$（または共通の可算集合）に値をとり、PMF をそれぞれ $p_X$、$p_Y$ とするとき、$Z = X + Y$ の PMF は

$$
p_Z(n) = (p_X * p_Y)(n) \coloneqq \sum_{k=-\infty}^{+\infty} p_X(k) \, p_Y(n - k). \tag{2}
$$

これは $(1)$ の離散版で、積分の代わりに $n$ を $k$（$X$ から）と $n - k$（$Y$ から）に分割するすべての方法について和をとる。

## 畳み込みの交換律と結合律

測度（または関数）に対する畳み込み演算は次を満たす：

$$
f_X * f_Y = f_Y * f_X \qquad \text{（交換律）}
$$

$$
(f_X * f_Y) * f_Z = f_X * (f_Y * f_Z) \qquad \text{（結合律）}.
$$

交換律は $X + Y = Y + X$ の対称性から明らか。結合律は、三つ（以上）の独立な変数の和の分布を任意の二つを先に畳み込むことで計算できることを意味する。

## 主要な例

### 二項分布の和

$X \sim \operatorname{Bin}(m, p)$、$Y \sim \operatorname{Bin}(n, p)$ が独立ならば $X + Y \sim \operatorname{Bin}(m+n, p)$ だ。

*畳み込みによる証明。* $\operatorname{Bin}(m, p)$ の PMF は $p_X(k) = \binom{m}{k} p^k (1-p)^{m-k}$ だ。畳み込むと：

$$
p_Z(r) = \sum_{k=0}^{r} \binom{m}{k} p^k (1-p)^{m-k} \cdot \binom{n}{r-k} p^{r-k} (1-p)^{n-(r-k)} = p^r (1-p)^{m+n-r} \sum_{k=0}^r \binom{m}{k}\binom{n}{r-k}.
$$

ヴァンデルモンドの畳み込み恒等式 $\sum_{k=0}^r \binom{m}{k}\binom{n}{r-k} = \binom{m+n}{r}$ より $p_Z(r) = \binom{m+n}{r} p^r (1-p)^{m+n-r}$ となり、これは $\operatorname{Bin}(m+n,p)$ の PMF だ。

これは解釈からも直ちに従う：$\operatorname{Bin}(m, p)$ は $m$ 回の独立なベルヌーイ試行の成功数であり、$m$ 回と $n$ 回の独立な試行を合わせれば $m+n$ 回の試行となる。

### ポアソン分布の和

$X \sim \operatorname{Poisson}(\lambda)$、$Y \sim \operatorname{Poisson}(\mu)$ が独立ならば $X + Y \sim \operatorname{Poisson}(\lambda + \mu)$ だ。

*畳み込みによる証明。*

$$
p_Z(n) = \sum_{k=0}^{n} \frac{e^{-\lambda}\lambda^k}{k!} \cdot \frac{e^{-\mu}\mu^{n-k}}{(n-k)!} = \frac{e^{-(\lambda+\mu)}}{n!} \sum_{k=0}^{n} \binom{n}{k} \lambda^k \mu^{n-k} = \frac{e^{-(\lambda+\mu)}(\lambda+\mu)^n}{n!},
$$

これは $\operatorname{Poisson}(\lambda + \mu)$ だ。

### 正規分布の和

$X \sim \operatorname{N}(\mu_1, \sigma_1^2)$、$Y \sim \operatorname{N}(\mu_2, \sigma_2^2)$ が独立ならば $X + Y \sim \operatorname{N}(\mu_1 + \mu_2, \sigma_1^2 + \sigma_2^2)$ だ。

密度の畳み込み積分は平方完成によって計算できるが、MGF を用いる方がよりエレガントだ（後述）。重要な点は、**正規分布族は畳み込みで閉じている**——独立な正規分布の和は正規分布であり、平均と分散はそれぞれ加算される。

### ガンマ分布の和

$X \sim \operatorname{Gamma}(\alpha, \lambda)$、$Y \sim \operatorname{Gamma}(\beta, \lambda)$ が独立で（同じレート $\lambda$ を持つとき）、$X + Y \sim \operatorname{Gamma}(\alpha + \beta, \lambda)$ だ。

これは整数 $\alpha$ の場合、$\operatorname{Gamma}(\alpha, \lambda)$ が $\alpha$ 個の独立な $\operatorname{Exp}(\lambda)$ 変数の和として表せることから従い、非整数 $\alpha$ へは MGF による議論で拡張される。

## モーメント母関数との関係

MGF の乗法的性質は畳み込みの代数的反映だ。独立な $X$ と $Y$ に対して：

$$
M_{X+Y}(t) = M_X(t) \cdot M_Y(t).
$$

これが成り立つ理由：密度の畳み込み $(f_X * f_Y)(z)$ は、それぞれのラプラス変換（$s = -t$ とおく）の積 $\hat{f}_X(t) \cdot \hat{f}_Y(t)$ に正確に対応するからだ。MGF は分布の（両側）ラプラス変換そのものなので、MGF の乗算は分布の畳み込みに対応する。

この関係により MGF は和の分布を計算する最も鋭い道具となる。畳み込み積分を直接評価する代わりに：

1. $M_X(t)$ と $M_Y(t)$ を計算する。
2. 掛け合わせる：$M_Z(t) = M_X(t) \cdot M_Y(t)$。
3. 同定する：$M_Z$ が既知の MGF と一致すれば $Z$ の分布がわかる。

上の三つの例（二項分布・ポアソン分布・正規分布）はいずれも各分布の MGF が閉形式で知られているため、このアプローチで直ちに従う。

## 三つ以上の変数の畳み込み

$n$ 個の独立な変数 $X_1, \ldots, X_n$ に対して、$S_n = X_1 + \cdots + X_n$ の分布は $n$ 重畳み込み $f_{X_1} * f_{X_2} * \cdots * f_{X_n}$ だ。その MGF は $\prod_{k=1}^n M_{X_k}(t)$ だ。すべての $X_k$ が MGF $M(t)$ を持つ同一分布に従うとき、$S_n$ の MGF は $M(t)^n$ だ。

**中心極限定理**はこの $n$ 重畳み込みに関する漸近的な命題だ：標準化後、$M(t)^n$ は（緩やかな条件のもとで）$e^{t^2/2}$、すなわち標準正規分布の MGF に収束する。

## まとめ

- 独立な $X, Y$ に対して $Z = X + Y$ の分布は、それらの分布の**畳み込み**だ：$f_Z = f_X * f_Y$（密度の積分）または $p_Z(n) = \sum_k p_X(k) p_Y(n-k)$（PMF の和）。
- **閉包の結果**：$\operatorname{Bin}(m,p) + \operatorname{Bin}(n,p) = \operatorname{Bin}(m+n,p)$；$\operatorname{Poisson}(\lambda) + \operatorname{Poisson}(\mu) = \operatorname{Poisson}(\lambda+\mu)$；$\operatorname{N}(\mu_1,\sigma_1^2) + \operatorname{N}(\mu_2,\sigma_2^2) = \operatorname{N}(\mu_1+\mu_2,\sigma_1^2+\sigma_2^2)$；$\operatorname{Gamma}(\alpha,\lambda) + \operatorname{Gamma}(\beta,\lambda) = \operatorname{Gamma}(\alpha+\beta,\lambda)$。
- 畳み込みは **MGF の乗算**に対応する：$M_{X+Y} = M_X \cdot M_Y$（MGF は分布のラプラス変換であるため）。
- MGF を用いたアプローチ——計算・乗算・同定——は通常、畳み込み積分を直接評価するより速い。
- i.i.d. 変数の $n$ 重畳み込みは、中心極限定理により標準化後に正規分布に収束する。
