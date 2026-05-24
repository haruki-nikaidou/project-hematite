---
title: 分散
summary: "分散 Var(X) = E[(X − E[X])²] は X の平均からの平均二乗偏差を測り、散らばりに関する最も単純な非自明な統計量だ。このチェックポイントでは計算公式 Var(X) = E[X²] − (E[X])² を導出し、スケール則 Var(aX + b) = a² Var(X) を証明し、X と同じ単位を持つ標準偏差 σ = √Var(X) のみが実用的に報告されるにもかかわらず、代数的に自然な量が分散である理由を論じる。"
prerequisites:
  - essential/math/probability/expectation
aliases: []
tags:
  - Probability
  - Expectation
updated: 2026-05-22
---

[期待値](../expectation/)は分布の中心を教えてくれる。分散はその中心周りの広がりを教えてくれる——典型的な観測値が平均からどれだけ離れているか。これは分布の最も単純な 2 次特性であり、推定量の標準誤差から金融商品のボラティリティまであらゆるものの基礎をなす。

## 定義

$X$ を有限な期待値 $\mu \coloneqq E[X]$ を持つ確率変数とする。$X$ の**分散**（variance）を次で定義する：

$$
\operatorname{Var}(X) \coloneqq E\bigl[(X - \mu)^2\bigr].
$$

$X$ の平均からの期待二乗偏差だ。$(X - \mu)^2 \geq 0$ なので、分散は常に非負：$\operatorname{Var}(X) \geq 0$。

**標準偏差**（standard deviation）は

$$
\sigma_X \coloneqq \sqrt{\operatorname{Var}(X)},
$$

$X$ 自身と同じ物理的単位を持つ。分散の方が代数的に扱いやすいが、実用上は標準偏差を報告する。

## 計算公式

二乗を展開して期待値の線形性を適用すると、$\mu$ を先に計算せずに済む公式が得られる：

$$
\operatorname{Var}(X) = E[X^2] - (E[X])^2. \tag{1}
$$

*証明。*

$$
\operatorname{Var}(X) = E\bigl[(X - \mu)^2\bigr] = E[X^2 - 2\mu X + \mu^2] = E[X^2] - 2\mu E[X] + \mu^2 = E[X^2] - \mu^2.
$$

公式 $(1)$ は標準的な計算上の近道だ：$E[X]$ と $E[X^2]$ だけ計算すればよい。

**例。** 密度 $f(x) = \frac{1}{b-a}$（$x \in [a,b]$）を持つ $X \sim \operatorname{Uniform}(a, b)$ に対して：

$$
E[X] = \frac{a+b}{2}, \qquad E[X^2] = \frac{a^2 + ab + b^2}{3},
$$

ゆえに

$$
\operatorname{Var}(X) = \frac{a^2 + ab + b^2}{3} - \frac{(a+b)^2}{4} = \frac{(b-a)^2}{12}.
$$

## スケール則とシフト則

**定理。** 定数 $a, b \in \mathbb{R}$ に対して：

$$
\operatorname{Var}(aX + b) = a^2 \operatorname{Var}(X). \tag{2}
$$

*証明。* $Y = aX + b$ と置く。$E[Y] = aE[X] + b$ なので $Y - E[Y] = a(X - E[X])$。したがって：

$$
\operatorname{Var}(Y) = E\bigl[(Y - E[Y])^2\bigr] = E\bigl[a^2 (X - E[X])^2\bigr] = a^2 \operatorname{Var}(X).
$$

2 つの観察：
- **シフトは分散に影響しない。** 定数 $b$ を加えると分布は移動するが、広がりは変わらない。
- **スケールは二乗される。** $X$ を $a$ 倍すると標準偏差は $|a|$ 倍、分散は $a^2$ 倍になる。

同値な表現：$\sigma_{aX+b} = |a| \sigma_X$。

## 分散は線形でない

期待値と異なり、分散は線形でない：一般に $\operatorname{Var}(X + Y) \neq \operatorname{Var}(X) + \operatorname{Var}(Y)$。正しい公式は**共分散**（covariance）を含む：

$$
\operatorname{Var}(X + Y) = \operatorname{Var}(X) + 2\operatorname{Cov}(X, Y) + \operatorname{Var}(Y).
$$

$X$ と $Y$ が**独立**のとき $\operatorname{Cov}(X, Y) = 0$（[確率変数の独立性](./2d_random_variables/independent/)で証明）なので、独立性は加法性を与える：

$$
\operatorname{Var}(X + Y) = \operatorname{Var}(X) + \operatorname{Var}(Y) \quad \text{（$X, Y$ が独立のとき）.}
$$

より一般に、$n$ 個の独立な変数に対して：

$$
\operatorname{Var}(X_1 + \cdots + X_n) = \operatorname{Var}(X_1) + \cdots + \operatorname{Var}(X_n).
$$

## チェビシェフの不等式

分散は平均からの大きな偏差の確率を押さえる。**チェビシェフの不等式**（Chebyshev's inequality）：任意の $k > 0$ に対して、

$$
P\bigl(|X - \mu| \geq k\sigma\bigr) \leq \frac{1}{k^2}. \tag{3}
$$

より一般に、任意の $\varepsilon > 0$ に対して：

$$
P\bigl(|X - \mu| \geq \varepsilon\bigr) \leq \frac{\operatorname{Var}(X)}{\varepsilon^2}.
$$

*証明。* 非負確率変数 $(X - \mu)^2$ にマルコフの不等式を適用する：

$$
P\bigl((X - \mu)^2 \geq \varepsilon^2\bigr) \leq \frac{E[(X-\mu)^2]}{\varepsilon^2} = \frac{\operatorname{Var}(X)}{\varepsilon^2}.
$$

チェビシェフの不等式は弱い（任意の分布に対して成立する）が、普遍的に適用できる。**大数の弱法則**の証明において鍵となる道具だ：$X_1, X_2, \ldots$ が平均 $\mu$・有限分散を持つ独立同分布列ならば、$\overline{X}_n = \frac{1}{n}\sum_{k=1}^n X_k$ は確率収束で $\mu$ に収束する。

*概略。* $E[\overline{X}_n] = \mu$ かつ独立性とスケール則から $\operatorname{Var}(\overline{X}_n) = \frac{\operatorname{Var}(X_1)}{n} \to 0$。チェビシェフより $P(|\overline{X}_n - \mu| \geq \varepsilon) \leq \frac{\operatorname{Var}(X_1)}{n\varepsilon^2} \to 0$。

## 分散を使う理由：平均絶対偏差との比較

分散は偏差を二乗する。代替の散らばりの指標として**平均絶対偏差**（mean absolute deviation）$E[|X - \mu|]$ がある。両方とも散らばりを捉えるが、分散には 3 つの実用上の利点がある：

1. **代数。** 独立な変数の和の分散は分散の和になる（上記）。平均絶対偏差にこの結果の類似物はない。
2. **滑らかさ。** $x \mapsto x^2$ はいたるところ微分可能だが、$x \mapsto |x|$ は $0$ で微分不可能だ。分散は微積分ベースの導出（最小二乗法、フィッシャー情報量など）に自然に現れる。
3. **完全性。** 分散は多変量分布の共分散行列に拡張される；平均絶対偏差にはこれができない。

代償は解釈しやすさだ：$\sigma^2$ は $(\text{$X$ の単位})^2$ の単位を持つ——だから実用上は常に標準偏差 $\sigma$ を分散と並べて報告する。

## まとめ

- $\operatorname{Var}(X) \coloneqq E[(X - E[X])^2] \geq 0$ は平均周りの平均二乗散らばりを測る。
- **計算公式**：$\operatorname{Var}(X) = E[X^2] - (E[X])^2$。
- **スケール則**：$\operatorname{Var}(aX + b) = a^2 \operatorname{Var}(X)$；シフトは分散に影響しない。
- **独立性による加法性**：$X, Y$ が独立のとき $\operatorname{Var}(X + Y) = \operatorname{Var}(X) + \operatorname{Var}(Y)$。
- **チェビシェフの不等式**：$P(|X - \mu| \geq \varepsilon) \leq \operatorname{Var}(X) / \varepsilon^2$——普遍的（ただし弱い）裾確率の上界。
- 分散は代数的に自然（独立性のもとで加法的、滑らか）；$X$ と同じ単位を持つ標準偏差 $\sigma = \sqrt{\operatorname{Var}(X)}$ は報告に使う。
