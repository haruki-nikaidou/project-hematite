---
title: モーメント母関数
summary: "モーメント母関数 M_X(t) = E[e^(tX)] は、t = 0 でのテイラー展開の係数として X のモーメントを符号化する：M_X^(k)(0) = E[X^k]。このチェックポイントでは MGF を定義し、標準的な分布に対して計算し、独立な X, Y に対する乗法的性質 M_{X+Y} = M_X · M_Y を導出し、MGF が分布を決定する際の存在条件と一意性条件を論じる。"
prerequisites:
  - essential/math/probability/moments
aliases: []
tags:
  - 確率
  - 期待値
updated: 2026-05-22
---

母関数（generating function）は無限個の数を一つの解析的対象にまとめる。**モーメント母関数**（MGF：moment generating function）は確率変数の[モーメント](../moments/)をすべて一つの冪級数にまとめたものだ。多くの有用な分布はシンプルな MGF を持ち、独立な変数の和の MGF はそれぞれの MGF の積になるため、MGF は和の分布の計算と極限定理の証明に強力な道具となる。

## 定義

確率変数 $X$ の**モーメント母関数**は

$$
M_X(t) \coloneqq E\bigl[e^{tX}\bigr], \quad t \in \mathbb{R}
$$

と定義され、期待値が有限となる $0$ のまわりの開区間上で定義される。離散分布の場合：

$$
M_X(t) = \sum_k e^{t x_k} p_k.
$$

絶対連続分布の場合：

$$
M_X(t) = \int_{-\infty}^{+\infty} e^{tx} f_X(x) \, dx.
$$

どちらも分布のラプラス（Laplace）変換（$s = -t$ とおいたもの）だ。

## MGF からモーメントを復元する

$e^{tX}$ を冪級数として展開する：

$$
e^{tX} = \sum_{k=0}^{\infty} \frac{(tX)^k}{k!} = \sum_{k=0}^{\infty} \frac{X^k}{k!} t^k.
$$

期待値をとると（$M_X(t)$ が $0$ の近くで有限のとき優収束定理により正当化される）：

$$
M_X(t) = \sum_{k=0}^{\infty} \frac{E[X^k]}{k!} t^k = \sum_{k=0}^{\infty} \frac{\mu'_k}{k!} t^k. \tag{1}
$$

これより $M_X(t)$ は $t$ に関する冪級数で、その係数が生モーメントを符号化していることがわかる。$k$ 回微分して $t = 0$ で評価すると：

$$
M_X^{(k)}(0) = E[X^k] = \mu'_k. \tag{2}
$$

すなわち第 $k$ モーメントは MGF の $t = 0$ における第 $k$ 導関数の値だ。これが定義的な性質：**MGF はモーメントを生成する**。

## 標準的な分布の MGF

| 分布 | $M_X(t)$ | 定義域 |
|---|---|---|
| $\operatorname{Bernoulli}(p)$ | $(1-p) + pe^t$ | $t \in \mathbb{R}$ |
| $\operatorname{Bin}(n, p)$ | $(1-p+pe^t)^n$ | $t \in \mathbb{R}$ |
| $\operatorname{Poisson}(\lambda)$ | $\exp(\lambda(e^t - 1))$ | $t \in \mathbb{R}$ |
| $\operatorname{Exp}(\lambda)$ | $\dfrac{\lambda}{\lambda - t}$ | $t < \lambda$ |
| $\operatorname{Gamma}(\alpha, \lambda)$ | $\left(\dfrac{\lambda}{\lambda - t}\right)^\alpha$ | $t < \lambda$ |
| $\operatorname{N}(\mu, \sigma^2)$ | $\exp\!\left(\mu t + \tfrac{\sigma^2 t^2}{2}\right)$ | $t \in \mathbb{R}$ |

**$\operatorname{N}(0,1)$ の導出。** 密度 $f(x) = \frac{1}{\sqrt{2\pi}} e^{-x^2/2}$ に対して：

$$
M_X(t) = \int_{-\infty}^{+\infty} e^{tx} \cdot \frac{e^{-x^2/2}}{\sqrt{2\pi}} \, dx = \int_{-\infty}^{+\infty} \frac{e^{-(x-t)^2/2 + t^2/2}}{\sqrt{2\pi}} \, dx = e^{t^2/2} \int_{-\infty}^{+\infty} \frac{e^{-(x-t)^2/2}}{\sqrt{2\pi}} \, dx = e^{t^2/2},
$$

平方完成を行い、残りの積分が $1$ に積分されるガウス積分であることを認識することで得られる。

## 独立な変数に対する乗法的性質

**定理。** $X$ と $Y$ が **独立な** 確率変数であり、$M_X$ と $M_Y$ がともに $0$ を含む開区間上で有限ならば、$X + Y$ の MGF は

$$
M_{X+Y}(t) = M_X(t) \cdot M_Y(t). \tag{3}
$$

*証明。* 独立性より $e^{tX}$ と $e^{tY}$ もそれぞれ $X$、$Y$ の可測関数として独立なので：

$$
M_{X+Y}(t) = E\bigl[e^{t(X+Y)}\bigr] = E\bigl[e^{tX} e^{tY}\bigr] = E\bigl[e^{tX}\bigr] \cdot E\bigl[e^{tY}\bigr] = M_X(t) \cdot M_Y(t).
$$

**応用。** 性質 $(3)$ により、MGF を比較することで独立な変数の和の分布を同定しやすくなる：

- $X \sim \operatorname{Bin}(m,p)$、$Y \sim \operatorname{Bin}(n,p)$ が独立：$M_{X+Y}(t) = (1-p+pe^t)^{m+n}$ なので $X + Y \sim \operatorname{Bin}(m+n, p)$。
- $X \sim \operatorname{Poisson}(\lambda)$、$Y \sim \operatorname{Poisson}(\mu)$ が独立：$M_{X+Y}(t) = e^{(\lambda+\mu)(e^t-1)}$ なので $X + Y \sim \operatorname{Poisson}(\lambda + \mu)$。
- $X \sim \operatorname{N}(\mu_1, \sigma_1^2)$、$Y \sim \operatorname{N}(\mu_2, \sigma_2^2)$ が独立：$M_{X+Y}(t) = e^{(\mu_1+\mu_2)t + (\sigma_1^2+\sigma_2^2)t^2/2}$ なので $X + Y \sim \operatorname{N}(\mu_1+\mu_2, \sigma_1^2+\sigma_2^2)$。

## 一意性：MGF は分布を決定する

**定理。** $M_X(t)$ がある $\delta > 0$ に対して開区間 $(-\delta, \delta)$ 上のすべての $t$ で有限ならば、$M_X$ は $X$ の分布を一意に決定する。

より正確に：$M_X(t) = M_Y(t)$ がすべての $t \in (-\delta, \delta)$ で成り立つならば $P_X = P_Y$（分布が同一）。

これが MGF で分布を安全に同定できる理由だ——上の計算で $M_{X+Y} = M_{\operatorname{N}(\mu_1+\mu_2, \sigma_1^2+\sigma_2^2)}$ が成り立つことは、$X + Y$ が正規分布に従うことを本当に意味する。

**存在の注意点。** MGF はすべての $t \neq 0$ で存在する（有限になる）とは限らない。コーシー分布は MGF を持たない。対数正規分布の MGF はすべての $t > 0$ で $+\infty$ だ。MGF が $0$ の近傍で存在しない場合、モーメント列は分布を決定しないことがある（対数正規分布が古典的な例だ）。そのような場合、**特性関数**（characteristic function）$\varphi_X(t) = E[e^{itX}]$（$i = \sqrt{-1}$）が常に存在し常に分布を決定するため、理論的な研究ではより一般的な道具となる。

## キュムラント

**キュムラント母関数**（cumulant generating function）は MGF の対数だ：

$$
K_X(t) \coloneqq \ln M_X(t) = \ln E[e^{tX}].
$$

その $0$ での導関数を**キュムラント**（cumulant）$\kappa_k \coloneqq K_X^{(k)}(0)$ という。最初の二つのキュムラントは平均と分散だ：

$$
\kappa_1 = E[X] = \mu, \qquad \kappa_2 = \operatorname{Var}(X) = \sigma^2.
$$

独立な $X, Y$ に対して：$K_{X+Y}(t) = K_X(t) + K_Y(t)$ なので、分散と同様にキュムラントは独立性のもとで**加算される**。この加法性により多くの計算でキュムラントは特に扱いやすい。

## まとめ

- **MGF** $M_X(t) = E[e^{tX}]$ はすべてのモーメントを $0$ での導関数として符号化する：$M_X^{(k)}(0) = E[X^k]$。
- **標準的な MGF**：二項分布 $(1-p+pe^t)^n$；ポアソン分布 $e^{\lambda(e^t-1)}$；指数分布 $\lambda/(\lambda-t)$；正規分布 $e^{\mu t + \sigma^2 t^2/2}$。
- **乗法的性質**：独立な $X, Y$ に対して $M_{X+Y} = M_X \cdot M_Y$ ——これにより和の分布を同定できる。
- **一意性**：$M_X$ が $0$ の近くで有限ならば $X$ の分布を一意に決定する。
- MGF が存在しないこともある（コーシー分布・対数正規分布など）；そのような場合は常に存在し常に分布を決定する特性関数 $E[e^{itX}]$ が使われる。
- **キュムラント母関数** $\ln M_X(t)$ の $0$ での導関数がキュムラントであり、独立性のもとで加算される。
