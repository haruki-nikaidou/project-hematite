---
title: 主要な分布の間の関係
summary: "標準的な分布は独立した対象ではなく、構造的・漸近的な関係の密なネットワーク上に位置する。このチェックポイントでは両種の関係を整理する：構造的には、ベルヌーイは n = 1 の二項分布であり、幾何分布は指数分布の離散版であり、指数分布は α = 1 のガンマ分布だ；極限では、二項分布 Binomial(n, λ/n) → ポアソン分布、指数分布 Exp(λ) の和はガンマ分布 Gamma(α, λ)、そして有限分散を持つ任意の分布の標準化された和は正規分布に収束する。"
prerequisites:
  - essential/math/probability/random_variables/binomial
  - essential/math/probability/random_variables/geometric
  - essential/math/probability/random_variables/poisson
  - essential/math/probability/random_variables/gamma
  - essential/math/probability/random_variables/normal
aliases: []
tags:
  - 確率
  - 確率変数
  - 分布
updated: 2026-05-22
---

このシリーズで学んだ七つの分布——[ベルヌーイ](../bernoulli/)・[二項](../binomial/)・[幾何](../geometric/)・[ポアソン](../poisson/)・[指数](../exponential/)・[ガンマ](../gamma/)・[正規](../normal/)——は独立に発明されたわけではない。これらは一つの族の構成員であり、構造的包含と漸近的極限によって結ばれている。これらの関係を理解することで、公式の集まりが一つの整合した絵に変わる。

## 構造的（厳密な）関係

構造的関係はパラメータのどの値に対しても成り立ち、ある極限的な状況に限らない。

### ベルヌーイは Binomial($1$, $p$)

[ベルヌーイ($p$)](../bernoulli/) 試行は[二項分布](../binomial/)の最もシンプルなケースだ：$n = 1$ の二項分布だ。$X \sim \operatorname{Bernoulli}(p)$ ならば $X \sim \operatorname{Bin}(1, p)$ ——どちらも $P(X = 1) = p$、$P(X = 0) = 1-p$ で定義される。

### 二項分布はベルヌーイ指示変数の和

より一般に、$\operatorname{Bin}(n, p)$ はベルヌーイという構成要素から直接構築される。$X_1, X_2, \ldots, X_n$ が独立で各 $X_i \sim \operatorname{Bernoulli}(p)$ ならば

$$
X \coloneqq X_1 + X_2 + \cdots + X_n \sim \operatorname{Bin}(n, p).
$$

これはまさに二項分布の定義であり、線形性と独立性によって平均 $np$ と分散 $np(1-p)$ が直ちに従う。

### 幾何分布：ベルヌーイ試行の繰り返し

[幾何分布](../geometric/)は独立な $\operatorname{Bernoulli}(p)$ 試行を繰り返して「最初の成功まで何回かかるか？」を問うときに現れる。PMF $P(X = k) = (1-p)^{k-1}p$ の幾何的な形状は、連続するベルヌーイ試行の独立性から直接導かれる。

### 指数分布：幾何分布の連続版

[指数分布](../exponential/)と幾何分布は、それぞれのドメイン（$[0, \infty)$ と $\{1, 2, 3, \ldots\}$）上で**無記憶性**

$$
P(X > s + t \mid X > s) = P(X > t)
$$

を持つ唯一の分布だ。幾何分布は離散時間での待機時間（試行回数）をモデル化し、指数分布は連続時間での待機時間（経過時間）をモデル化する。両者は構造的に同一だ——指数分布は試行時間がゼロに縮む極限（$p \to 0$ と比例させながら）で幾何分布の連続時間版となる。

### 指数分布は Gamma($1$, $\lambda$)

[ガンマ分布](../gamma/)は形状 $\alpha > 0$ とレート $\lambda > 0$ に対して密度

$$
f(x) = \frac{\lambda^\alpha x^{\alpha-1} e^{-\lambda x}}{\Gamma(\alpha)}, \qquad x > 0
$$

を持つ。$\alpha = 1$、$\Gamma(1) = 1$ とおくと $f(x) = \lambda e^{-\lambda x}$ となり、これはまさに $\operatorname{Exp}(\lambda)$ だ。したがって指数分布は特殊ケース $\operatorname{Gamma}(1, \lambda)$ だ。

### Gamma($\alpha$, $\lambda$) は指数分布の和

整数 $\alpha$ の場合、関係はさらに進む。$X_1, X_2, \ldots, X_\alpha$ が独立で各 $X_i \sim \operatorname{Exp}(\lambda)$ ならば

$$
X_1 + X_2 + \cdots + X_\alpha \sim \operatorname{Gamma}(\alpha, \lambda).
$$

これは MGF を掛け合わせることで確認できる：$\operatorname{Exp}(\lambda)$ の MGF は $(\lambda/(\lambda - t))^1$ なので $\alpha$ 個の独立なコピーの和の MGF は $(\lambda/(\lambda - t))^\alpha$ となり、これは $\operatorname{Gamma}(\alpha, \lambda)$ の MGF だ。

**直観。** レート $\lambda$ のポアソン過程では、$\alpha$ 番目の事象はちょうど $\alpha$ 個の独立な指数分布の待機時間の後に到来する。ガンマ分布は $\alpha$ 番目の到着までの総待機時間を捉える。

## 漸近的関係

漸近的関係はパラメータが大きくなるにつれて一方の分布が他方を近似することを表す。

### Binomial($n$, $\lambda/n$) $\to$ Poisson($\lambda$)（$n \to \infty$）

**ポアソン極限定理**（稀事象の法則）が述べる：$p = \lambda/n$ かつ $\lambda$ を固定して $n \to \infty$ とすると、各 $k = 0, 1, 2, \ldots$ に対して

$$
\binom{n}{k} \left(\frac{\lambda}{n}\right)^k \left(1 - \frac{\lambda}{n}\right)^{n-k} \;\longrightarrow\; \frac{\lambda^k e^{-\lambda}}{k!} = P(\operatorname{Poisson}(\lambda) = k).
$$

**概略。** 先頭の因子 $\binom{n}{k}/n^k \to 1/k!$、項 $(\lambda/n)^k$ が $\lambda^k/n^k$ を寄与し、$(1 - \lambda/n)^n \to e^{-\lambda}$ だ。組み合わせるとポアソンの PMF が得られる。

**解釈。** 多くの独立な試行でそれぞれの成功確率が非常に小さいが、期待される成功総数 $np = \lambda$ が固定されているとき、成功数はほぼポアソン分布に従う。これが稀だが起こりうる事象の状況だ。

### ポアソン分布は無限分割可能

[ポアソン分布](../poisson/)は自然な加法的構造を持つ。$X \sim \operatorname{Poisson}(\lambda_1)$ と $Y \sim \operatorname{Poisson}(\lambda_2)$ が独立ならば

$$
X + Y \sim \operatorname{Poisson}(\lambda_1 + \lambda_2).
$$

これは MGF から直接従う：$M_X(t) = e^{\lambda_1(e^t - 1)}$、$M_Y(t) = e^{\lambda_2(e^t - 1)}$ なので $M_{X+Y}(t) = e^{(\lambda_1 + \lambda_2)(e^t - 1)}$ だ。

逆に、任意の $\operatorname{Poisson}(\lambda)$ 変数は任意の $n$ に対して独立な $\operatorname{Poisson}(\lambda/n)$ 変数の和に分解できる。この**無限分割可能性**（infinite divisibility）は、ポアソン過程がより細かい独立な部分過程に常に分割できるという事実を反映する。

### 中心極限定理：正規化された二項分布 $\to$ 正規分布

中心極限定理より、標準化された二項分布は標準正規分布に収束する。$X \sim \operatorname{Bin}(n, p)$ ならば $E[X] = np$、$\operatorname{Var}(X) = np(1-p)$ なので

$$
\frac{X - np}{\sqrt{np(1-p)}} \;\xrightarrow{d}\; N(0,1) \quad \text{（$n \to \infty$）}.
$$

これは CLT の直接的な応用だ：$X$ は $n$ 個の i.i.d. $\operatorname{Bernoulli}(p)$ 変数（各々の平均 $p$、分散 $p(1-p)$）の和だ。

### Gamma($\alpha$, $\lambda$) $\to$ 正規分布（$\alpha \to \infty$）

$\operatorname{Gamma}(\alpha, \lambda)$ は $\alpha$ 個の独立な $\operatorname{Exp}(\lambda)$ 変数（各々の平均 $1/\lambda$、分散 $1/\lambda^2$）の和なので、CLT が直接適用できる。標準化されたガンマ分布

$$
\frac{\operatorname{Gamma}(\alpha, \lambda) - \alpha/\lambda}{\sqrt{\alpha}/\lambda} \;\xrightarrow{d}\; N(0,1) \quad \text{（$\alpha \to \infty$）}.
$$

大きな $\alpha$ に対して、ガンマ分布は $N(\alpha/\lambda,\, \alpha/\lambda^2)$ で良く近似される。

## 族の全体像

七つの分布はすべて関係の有向グラフを形成する。「〜の特殊ケース」「〜の和」「〜に収束する」とラベルのついた辺を読むと：

- **ベルヌーイ $\to$ 二項**（構造的）：$\operatorname{Bin}(n, p)$ は $n$ 個の i.i.d. $\operatorname{Bernoulli}(p)$ 変数の和；$\operatorname{Bernoulli}(p) = \operatorname{Bin}(1, p)$。
- **二項 $\to$ ポアソン**（漸近的）：$\operatorname{Bin}(n, \lambda/n) \to \operatorname{Poisson}(\lambda)$（$n \to \infty$）。
- **二項 $\to$ 正規**（CLT による漸近的）：標準化された $\operatorname{Bin}(n, p)$ は $N(0,1)$ に収束。
- **ベルヌーイ $\to$ 幾何**（構造的）：幾何分布はベルヌーイ試行を最初の成功まで繰り返した回数を数える。
- **幾何 $\to$ 指数**（連続版 / 極限）：指数分布は無記憶性を共有する幾何分布の連続時間版。
- **指数 $\to$ ガンマ**（構造的）：$\operatorname{Gamma}(\alpha, \lambda)$ は $\alpha$ 個の i.i.d. $\operatorname{Exp}(\lambda)$ 変数の和；$\operatorname{Exp}(\lambda) = \operatorname{Gamma}(1, \lambda)$。
- **ガンマ $\to$ 正規**（CLT による漸近的）：標準化された $\operatorname{Gamma}(\alpha, \lambda)$ は $\alpha \to \infty$ で $N(0,1)$ に収束。

ベルヌーイから正規分布への経路は二つある：二項分布と CLT を通る直接の経路と、幾何分布・指数分布・ガンマ分布・CLT を通る経路だ。どちらも同じ不動点——標準化された和の普遍的アトラクターである正規分布——に収束する。

## まとめ

- **ベルヌーイは $\operatorname{Bin}(1, p)$**；$\operatorname{Bin}(n, p)$ は $n$ 個の i.i.d. ベルヌーイ変数の和（構造的）。
- **幾何分布**はベルヌーイ試行の繰り返しで最初の成功時刻をモデル化（構造的）；無記憶性を共有する指数分布の離散版だ。
- **指数分布は $\operatorname{Gamma}(1, \lambda)$**；$\operatorname{Gamma}(\alpha, \lambda)$ は整数 $\alpha$ のとき $\alpha$ 個の i.i.d. $\operatorname{Exp}(\lambda)$ 変数の和（構造的）。
- **$\operatorname{Bin}(n, \lambda/n) \to \operatorname{Poisson}(\lambda)$**（$n \to \infty$）（ポアソン極限定理）。
- **ポアソン分布は無限分割可能**：$\operatorname{Poisson}(\lambda_1 + \lambda_2)$ は独立な $\operatorname{Poisson}(\lambda_1)$ と $\operatorname{Poisson}(\lambda_2)$ の和に等しい。
- **標準化された二項分布とガンマ分布はいずれも CLT により $N(0,1)$ に収束する**——各々が i.i.d. 有限分散変数の和だからだ。
- 正規分布は標準化された和の普遍的な極限分布——族を通る二つの別々の経路が辿り着く不動点だ。
