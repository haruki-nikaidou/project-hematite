---
title: 共分散と相関
summary: "共分散 Cov(X, Y) = E[(X − E[X])(Y − E[Y])] は 2 つの確率変数の同時線形変動を測り、その標準化形 ρ(X, Y) = Cov(X, Y) / (σ_X σ_Y) が [−1, 1] に収まるピアソン相関係数だ。このチェックポイントでは共分散の双線形性・和の分散の等式 Var(X + Y) = Var(X) + Var(Y) + 2 Cov(X, Y)・相関に対するコーシー–シュワルツ不等式を導出し、共分散がゼロでも独立性は含意しないことを警告する。"
prerequisites:
  - essential/math/probability/2d_random_variables/jointly_distributed
  - essential/math/probability/variance
aliases: []
tags:
  - Probability
  - Random Variables
  - Expectation
updated: 2026-05-22
---

2 つの確率変数は独立であったり、正に連動したり、負に連動したりしうる。[分散](../variance/)は単一変数の平均周りの広がりを教えてくれる；**共分散**（covariance）は 2 つの変数がどれだけ一緒に動くかを捉える。その標準化形である**ピアソン相関係数**（Pearson correlation coefficient）は単位を除去して答えを $[-1, 1]$ に収め、スケールの異なる分布同士を比較可能にする。

## 定義

$X$ と $Y$ を有限な 2 次モーメントを持つ確率変数とする：$E[X^2] < \infty$ かつ $E[Y^2] < \infty$。$\mu_X \coloneqq E[X]$、$\mu_Y \coloneqq E[Y]$ と置く。$X$ と $Y$ の**共分散**を次で定義する：

$$
\operatorname{Cov}(X, Y) \coloneqq E\bigl[(X - \mu_X)(Y - \mu_Y)\bigr].
$$

$X$ と $Y$ が同時に平均を超える傾向があるとき、積 $(X - \mu_X)(Y - \mu_Y)$ は典型的に正なので $\operatorname{Cov}(X,Y) > 0$ だ。一方が平均を超えるとき他方が平均を下回る傾向があるとき、積は典型的に負になる。$\operatorname{Cov}(X, X) = E[(X - \mu_X)^2] = \operatorname{Var}(X)$ なので、共分散は分散を一般化している。

## 計算公式

積を展開して期待値の線形性を適用すると、変数を中心化せずに済む公式が得られる：

$$
\operatorname{Cov}(X, Y) = E[XY] - E[X]\, E[Y]. \tag{1}
$$

*証明。*

$$
E[(X - \mu_X)(Y - \mu_Y)] = E[XY] - \mu_X E[Y] - \mu_Y E[X] + \mu_X \mu_Y = E[XY] - \mu_X \mu_Y.
$$

**独立性の帰結。** $X$ と $Y$ が[独立](../independent/)ならば $E[XY] = E[X] E[Y]$ なので（[独立性](../independent/)で証明）、公式 $(1)$ から $\operatorname{Cov}(X, Y) = 0$。逆は成り立たない——下の反例を参照。

## 双線形性と対称性

**定理。** 共分散は対称かつ各引数について線形（双線形）だ：

$$
\operatorname{Cov}(X, Y) = \operatorname{Cov}(Y, X), \tag{2}
$$

$$
\operatorname{Cov}(aX + bZ,\, Y) = a\, \operatorname{Cov}(X, Y) + b\, \operatorname{Cov}(Z, Y) \quad (a, b \in \mathbb{R}). \tag{3}
$$

定数を加えても共分散は変化しない：$\operatorname{Cov}(X + c, Y) = \operatorname{Cov}(X, Y)$（任意の $c \in \mathbb{R}$）。

*(3) の証明。* 計算公式 $(1)$ を使う：

$$
\operatorname{Cov}(aX + bZ, Y) = E[(aX + bZ)Y] - E[aX + bZ]\,E[Y] = a\bigl(E[XY] - E[X]E[Y]\bigr) + b\bigl(E[ZY] - E[Z]E[Y]\bigr).
$$

両引数についての双線形性は、共分散が 2 乗可積分確率変数の空間上の**半正定値双線形形式**であることを意味する：対称かつ $\operatorname{Cov}(X, X) = \operatorname{Var}(X) \geq 0$。

## 和の分散

双線形性の最も直接的な応用が**和の分散の等式**だ：

$$
\operatorname{Var}(X + Y) = \operatorname{Var}(X) + 2\operatorname{Cov}(X, Y) + \operatorname{Var}(Y). \tag{4}
$$

*証明。* 双線形性を使って $\operatorname{Var}(X + Y) = \operatorname{Cov}(X+Y,\, X+Y)$ を展開する：

$$
\operatorname{Cov}(X+Y,\, X+Y) = \operatorname{Cov}(X,X) + 2\operatorname{Cov}(X,Y) + \operatorname{Cov}(Y,Y) = \operatorname{Var}(X) + 2\operatorname{Cov}(X,Y) + \operatorname{Var}(Y).
$$

より一般に $S = X_1 + \cdots + X_n$ のとき：

$$
\operatorname{Var}(S) = \sum_{i=1}^n \operatorname{Var}(X_i) + 2\sum_{1 \leq i < j \leq n} \operatorname{Cov}(X_i, X_j). \tag{5}
$$

すべての対が無相関のとき（特に独立のとき）、非対角項は消えて分散は加法的になる。これは[分散](../variance/)で証明なしに述べた結果だ。

## ピアソン相関係数

共分散は $X$ と $Y$ のスケールに依存する：$X$ を $2$ 倍すると $\operatorname{Cov}(X,Y)$ も $2$ 倍になる。スケールに依存しない測度を得るには、両標準偏差で正規化する。**ピアソン相関係数**を次で定義する：

$$
\rho(X, Y) \coloneqq \frac{\operatorname{Cov}(X, Y)}{\sigma_X \sigma_Y}, \tag{6}
$$

ここで $\sigma_X = \sqrt{\operatorname{Var}(X)} > 0$、$\sigma_Y = \sqrt{\operatorname{Var}(Y)} > 0$。

**定理（コーシー–シュワルツ）。** $\rho(X, Y) \in [-1, 1]$。

*証明。* $X' = X - \mu_X$、$Y' = Y - \mu_Y$ として、任意の $t \in \mathbb{R}$ に対し：

$$
0 \leq \operatorname{Var}(tX' + Y') = t^2 \sigma_X^2 + 2t\operatorname{Cov}(X, Y) + \sigma_Y^2.
$$

この $t$ の 2 次式がすべての $t$ で非負なので、判別式は非正でなければならない：

$$
4\operatorname{Cov}(X, Y)^2 - 4\sigma_X^2 \sigma_Y^2 \leq 0,
$$

これより $|\operatorname{Cov}(X,Y)| \leq \sigma_X \sigma_Y$、すなわち $|\rho(X,Y)| \leq 1$。

等号 $|\rho| = 1$ が成立するのは、ある $t$ について $\operatorname{Var}(tX' + Y') = 0$ となるとき、すなわち $Y' = -tX'$ がほぼ確実に成立するとき——つまり $Y = aX + b$（$a = -t \neq 0$）が成立するときに限る。$\rho$ の符号は $a$ の符号に一致する。

ピアソン係数は**線形関連**を測る：$|\rho|$ が $1$ に近いほど $Y$ が $X$ のほぼ線形な関数であることを意味し、$\rho = 0$ は線形関連がないことを意味する（非線形依存は依然としてありうる）。

## 共分散ゼロは独立性を含意しない

独立性は共分散がゼロであることを含意するが、逆は成り立たない。

**反例。** $U \sim \operatorname{Uniform}(-1, 1)$ として $V = U^2$ と置く。$U$ は $0$ 周りに対称なので $E[U] = 0$ かつ $E[U^3] = 0$。したがって：

$$
\operatorname{Cov}(U, V) = E[U \cdot U^2] - E[U]\,E[U^2] = E[U^3] - 0 = 0.
$$

しかし $V$ は $U$ から完全に決まるので、両変数は独立とはほど遠い。共分散がゼロは**線形依存**がないことだけを保証し、非線形依存は $\operatorname{Cov}$ には見えない。

## まとめ

- $\operatorname{Cov}(X, Y) \coloneqq E[(X - \mu_X)(Y - \mu_Y)] = E[XY] - E[X]\,E[Y]$。
- **対称性と双線形性**：共分散は対称半正定値双線形形式；$\operatorname{Cov}(X,X) = \operatorname{Var}(X)$。
- **和の分散**：$\operatorname{Var}(X + Y) = \operatorname{Var}(X) + 2\operatorname{Cov}(X,Y) + \operatorname{Var}(Y)$；無相関のとき加法性が成立。
- 独立性 $\Rightarrow$ $\operatorname{Cov}(X,Y) = 0$；逆は成立しない——共分散ゼロは線形依存のなさしか保証しない。
- **ピアソン相関**：$\rho(X,Y) = \operatorname{Cov}(X,Y) / (\sigma_X \sigma_Y) \in [-1, 1]$；$|\rho| = 1$ は $Y = aX + b$ がほぼ確実に成立するときに限る。
