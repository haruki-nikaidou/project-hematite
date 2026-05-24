---
title: 正規分布
summary: "正規分布（ガウス分布） N(μ, σ²) は密度 f(x) = (2πσ²)^(−1/2) exp(−(x − μ)² / 2σ²) を ℝ 上で持つ。このチェックポイントでは標準正規分布と一般正規分布を定義し、密度が 1 に積分されることを（古典的な √(2π) の計算とともに）検証し、平均 μ と分散 σ² を計算し、中心極限定理により正規分布が標準化された和の極限分布である理由を説明する。"
prerequisites:
  - essential/math/probability/random_variables/concept
aliases: []
tags:
  - 確率
  - 確率変数
  - 分布
updated: 2026-05-22
---

成人の身長・測定誤差・試験の点数・多くの独立な観測値の平均——自然界に現れる量をほぼ何でも測ると、同じ釣り鐘型の曲線が繰り返し現れる。**正規分布**（normal distribution）（**ガウス分布**（Gaussian distribution）とも呼ばれる）は平均の普遍的な分布であり、応用数学と統計学のほぼすべての分野で不可欠だ。

## ガウス積分

正規分布を定義する前に、一つの古典的な結果が必要だ：

$$
I \coloneqq \int_{-\infty}^{\infty} e^{-x^2}\, dx = \sqrt{\pi}.
$$

**極座標による証明。** $I^2$ を考える：

$$
I^2 = \left(\int_{-\infty}^{\infty} e^{-x^2}\, dx\right)\!\left(\int_{-\infty}^{\infty} e^{-y^2}\, dy\right) = \iint_{\mathbb{R}^2} e^{-(x^2 + y^2)}\, dx\, dy.
$$

極座標 $x = r\cos\theta$、$y = r\sin\theta$（$r \geq 0$、$\theta \in [0, 2\pi)$）に変換する。ヤコビアンは $r$ で、$x^2 + y^2 = r^2$ だ：

$$
I^2 = \int_0^{2\pi}\int_0^{\infty} e^{-r^2} r\, dr\, d\theta = 2\pi \int_0^{\infty} r e^{-r^2}\, dr.
$$

$u = r^2$、$du = 2r\, dr$ と置換すると：

$$
I^2 = 2\pi \int_0^{\infty} \frac{1}{2} e^{-u}\, du = \pi \cdot \bigl[-e^{-u}\bigr]_0^{\infty} = \pi.
$$

$I > 0$ なので $I = \sqrt{\pi}$ が結論される。$\square$

$x = t/\sqrt{2}$ と置換すると、すぐに有用なスケール変換した形が得られる：

$$
\int_{-\infty}^{\infty} e^{-t^2/2}\, dt = \sqrt{2\pi}.
$$

## 標準正規分布

**標準正規分布** $Z \sim N(0, 1)$ の**確率密度関数**（PDF）は

$$
\varphi(x) \coloneqq \frac{1}{\sqrt{2\pi}}\, e^{-x^2/2}, \qquad x \in \mathbb{R}.
$$

### $\varphi$ が 1 に積分されることの検証

$$
\int_{-\infty}^{\infty} \varphi(x)\, dx = \frac{1}{\sqrt{2\pi}} \int_{-\infty}^{\infty} e^{-x^2/2}\, dx = \frac{1}{\sqrt{2\pi}} \cdot \sqrt{2\pi} = 1,
$$

上のガウス積分の結果を使う。$1/\sqrt{2\pi}$ という因子がまさに正規化定数だ。

## 一般正規分布

$\mu \in \mathbb{R}$ を**位置パラメータ**（平均）、$\sigma^2 > 0$ を**スケールパラメータ**（分散）とする。[確率変数](../concept/) $X$ が平均 $\mu$、分散 $\sigma^2$ の正規分布に従うとき、$X \sim N(\mu, \sigma^2)$ と書き、

$$
X \coloneqq \mu + \sigma Z, \qquad Z \sim N(0, 1)
$$

と定義される。同等に $X$ の PDF は

$$
f(x) \coloneqq \frac{1}{\sqrt{2\pi\sigma^2}}\,\exp\!\left(-\frac{(x-\mu)^2}{2\sigma^2}\right), \qquad x \in \mathbb{R}.
$$

**検証。** $z = (x - \mu)/\sigma$ と置換すると積分 $\int_{-\infty}^\infty f(x)\,dx$ は $\int_{-\infty}^\infty \varphi(z)\,dz = 1$ に変換される。

パラメータ $\sigma \coloneqq \sqrt{\sigma^2}$ は**標準偏差**だ。

## 平均

$$
E[X] = E[\mu + \sigma Z] = \mu + \sigma E[Z].
$$

$\varphi$ の $0$ に関する対称性から $E[Z] = 0$ だ（被積分関数 $x \varphi(x)$ は奇関数）。したがって

$$
E[X] = \mu.
$$

## 分散

標準正規分布の $\operatorname{Var}(Z) = E[Z^2]$ が必要だ（$E[Z] = 0$ なので）。$u = x$、$dv = x e^{-x^2/2}\,dx$ として部分積分すると $v = -e^{-x^2/2}$：

$$
E[Z^2] = \frac{1}{\sqrt{2\pi}} \int_{-\infty}^{\infty} x^2 e^{-x^2/2}\, dx = \frac{1}{\sqrt{2\pi}} \left(\Bigl[-x e^{-x^2/2}\Bigr]_{-\infty}^{\infty} + \int_{-\infty}^{\infty} e^{-x^2/2}\, dx\right).
$$

$x e^{-x^2/2} \to 0$（$|x| \to \infty$）なので境界項はゼロだ。残りの積分は $\sqrt{2\pi}$ なので

$$
E[Z^2] = \frac{1}{\sqrt{2\pi}} \cdot \sqrt{2\pi} = 1.
$$

したがって $\operatorname{Var}(Z) = 1$ だ。一般の場合は $X = \mu + \sigma Z$ を使うと：

$$
\operatorname{Var}(X) = \sigma^2 \operatorname{Var}(Z) = \sigma^2.
$$

## アフィン安定性

**定理。** $X \sim N(\mu, \sigma^2)$ かつ $a, b \in \mathbb{R}$（$a \neq 0$）ならば

$$
aX + b \sim N(a\mu + b,\; a^2\sigma^2).
$$

**証明。** $X = \mu + \sigma Z$（$Z \sim N(0,1)$）と書く。すると

$$
aX + b = a(\mu + \sigma Z) + b = (a\mu + b) + (a\sigma) Z.
$$

これは $\mu' = a\mu + b$、$\sigma' = a\sigma$ として $\mu' + \sigma' Z$ の形をしており、$aX + b \sim N(a\mu + b,\, a^2\sigma^2)$ が従う。$\square$

**系。** 任意の $X \sim N(\mu, \sigma^2)$ は標準化できる：$(X - \mu)/\sigma \sim N(0, 1)$。

## 中心極限定理

正規分布は多くある分布の一つに留まらない——標準化された和の普遍的な極限だ。**中心極限定理**（CLT：Central Limit Theorem）はこれを精密にする。

**定理（CLT）。** $X_1, X_2, \ldots$ を平均 $\mu$、有限分散 $\sigma^2 > 0$ を持つ独立同分布（i.i.d.）の確率変数列とする。標準化された和を

$$
Z_n \coloneqq \frac{(X_1 + X_2 + \cdots + X_n) - n\mu}{\sigma\sqrt{n}}
$$

と定義する。このとき $Z_n \xrightarrow{d} N(0, 1)$（$n \to \infty$）：すべての $z \in \mathbb{R}$ に対して

$$
\lim_{n \to \infty} P(Z_n \leq z) = \Phi(z) \coloneqq \int_{-\infty}^{z} \varphi(t)\, dt.
$$

**正規分布が遍在する理由。** 観測される量が、多くの小さな独立した要因の集積効果——測定ノイズ・生物学的特性・金融リターン——であれば、個々の寄与分布の形状によらず正規分布で良く近似される。CLT はベル型曲線が科学全般に現れることの数学的な説明だ。

## まとめ

- $Z \sim N(0,1)$ は PDF $\varphi(x) = \frac{1}{\sqrt{2\pi}} e^{-x^2/2}$ を持つ；正規化定数 $1/\sqrt{2\pi}$ はガウス積分 $\int_{-\infty}^\infty e^{-t^2/2}\,dt = \sqrt{2\pi}$ から従う。
- $X \sim N(\mu, \sigma^2)$ は PDF $f(x) = \frac{1}{\sqrt{2\pi\sigma^2}}\exp\!\bigl(-(x-\mu)^2/(2\sigma^2)\bigr)$ を持ち、$Z \sim N(0,1)$ として $X = \mu + \sigma Z$ を満たす。
- **平均：** $E[X] = \mu$（標準正規分布の対称性による）。
- **分散：** $\operatorname{Var}(X) = \sigma^2$（部分積分により導出）。
- **アフィン安定性：** $aX + b \sim N(a\mu + b, a^2\sigma^2)$；特に $(X-\mu)/\sigma \sim N(0,1)$。
- **中心極限定理：** 任意の $n$ 個の i.i.d. 有限分散変数の標準化された和は分布収束で $N(0,1)$ に収束し、正規分布の遍在性を説明する。
