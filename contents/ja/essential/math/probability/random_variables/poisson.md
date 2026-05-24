---
title: ポアソン分布
summary: "レート λ のポアソン分布は確率 P(X = k) = e^(−λ) λ^k / k! を割り当て、n → ∞ のとき二項分布 Binomial(n, λ/n) の極限として現れる。このチェックポイントではその極限を明示的に取り、平均と分散（いずれも λ に等しい）を導出し、固定された窓内の希な独立事象のカウントの標準的なモデルとしてポアソン分布を動機づける。"
prerequisites:
  - essential/math/probability/random_variables/binomial
aliases: []
tags:
  - 確率
  - 確率変数
  - 分布
updated: 2026-05-22
---

1 秒あたりの放射性崩壊事象、1 ページあたりの誤字、1 分あたりのサーバーリクエスト——固定された窓内で希な独立事象が何回起きるかを数えるとき、ポアソン分布が自然なモデルだ。

## ポアソンの極限

ポアソンの PMF を導出する最もすっきりした方法は、[二項分布](../binomial/)の極限をとることだ。固定された窓内で平均 $\lambda > 0$ 個の事象が起きるとしよう。窓を $n$ 個の等しい部分区間に分割し、各区間は十分短くて高々 1 個の事象しか落ちないとする。任意の一区間で事象が起きる確率はおよそ $p = \lambda/n$ であり、すべての区間は独立だ。

事象の数は $\operatorname{Bin}(n, \lambda/n)$ になる。$k$ を固定して $n \to \infty$ とすると：

$$
P(X = k) = \binom{n}{k}\left(\frac{\lambda}{n}\right)^k\left(1 - \frac{\lambda}{n}\right)^{n-k}.
$$

各因子を順に展開する。

**二項係数：**

$$
\binom{n}{k} = \frac{n(n-1)\cdots(n-k+1)}{k!} \to \frac{n^k}{k!} \quad \text{（$n \to \infty$ のとき）},
$$

$k$ は固定で $n$ が増えるため、$k$ 個の因子 $(n - j)/n$ はいずれも $1$ に収束する。

**$p$ の冪：**

$$
\left(\frac{\lambda}{n}\right)^k = \frac{\lambda^k}{n^k}.
$$

**裾の因子：**

$$
\left(1 - \frac{\lambda}{n}\right)^{n-k} = \left(1 - \frac{\lambda}{n}\right)^n \cdot \left(1 - \frac{\lambda}{n}\right)^{-k} \to e^{-\lambda} \cdot 1 = e^{-\lambda},
$$

標準的な極限 $\lim_{n\to\infty}(1 - \lambda/n)^n = e^{-\lambda}$ と $(1 - \lambda/n)^{-k} \to 1$ を使う。

まとめると：

$$
P(X = k) \to \frac{n^k}{k!} \cdot \frac{\lambda^k}{n^k} \cdot e^{-\lambda} = \frac{e^{-\lambda}\lambda^k}{k!}.
$$

## 定義

確率変数 $X$ が**レート** $\lambda > 0$ の**ポアソン分布**（Poisson distribution）に従うとき $X \sim \operatorname{Poisson}(\lambda)$ と書き、その PMF は：

$$
P(X = k) \coloneqq \frac{e^{-\lambda}\lambda^k}{k!}, \qquad k = 0, 1, 2, \ldots
$$

### 検証：PMF の和が 1 になること

$$
\sum_{k=0}^{\infty} \frac{e^{-\lambda}\lambda^k}{k!} = e^{-\lambda} \sum_{k=0}^{\infty} \frac{\lambda^k}{k!} = e^{-\lambda} \cdot e^{\lambda} = 1. \checkmark
$$

$\sum_{k=0}^{\infty} \lambda^k / k! = e^{\lambda}$ は指数関数のテイラー展開だ。

## 平均：$E[X] = \lambda$

$$
E[X] = \sum_{k=0}^{\infty} k \, \frac{e^{-\lambda}\lambda^k}{k!}.
$$

$k = 0$ の項はゼロだ。$k \geq 1$ では $k$ を $k!$ で消すと：

$$
E[X] = e^{-\lambda} \sum_{k=1}^{\infty} \frac{\lambda^k}{(k-1)!} = e^{-\lambda} \cdot \lambda \sum_{j=0}^{\infty} \frac{\lambda^j}{j!} = e^{-\lambda} \cdot \lambda \cdot e^{\lambda} = \lambda.
$$

平均はレートパラメータに等しい——$\lambda$ の定め方を考えれば当然の結果だ。

## 分散：$\operatorname{Var}(X) = \lambda$

まず $E[X(X-1)]$ を計算する：

$$
E[X(X-1)] = \sum_{k=2}^{\infty} k(k-1)\frac{e^{-\lambda}\lambda^k}{k!} = e^{-\lambda}\lambda^2 \sum_{j=0}^{\infty}\frac{\lambda^j}{j!} = \lambda^2.
$$

したがって $E[X^2] = E[X(X-1)] + E[X] = \lambda^2 + \lambda$ となり：

$$
\operatorname{Var}(X) = E[X^2] - (E[X])^2 = (\lambda^2 + \lambda) - \lambda^2 = \lambda.
$$

ポアソン確率変数の平均と分散はいずれも $\lambda$ に等しい。この等式は有用な診断基準だ：カウントデータを観測して標本平均と標本分散が大きく異なる場合、ポアソンモデルは合わない可能性がある。

## 加法的性質

$X \sim \operatorname{Poisson}(\lambda_1)$ と $Y \sim \operatorname{Poisson}(\lambda_2)$ が**独立**ならば：

$$
X + Y \sim \operatorname{Poisson}(\lambda_1 + \lambda_2).
$$

**証明。** 畳み込みの公式から：

$$
P(X + Y = k) = \sum_{j=0}^{k} P(X = j)\,P(Y = k - j) = \sum_{j=0}^{k} \frac{e^{-\lambda_1}\lambda_1^j}{j!} \cdot \frac{e^{-\lambda_2}\lambda_2^{k-j}}{(k-j)!}.
$$

$e^{-(\lambda_1+\lambda_2)} / k!$ を括り出して二項定理を適用すると：

$$
P(X + Y = k) = \frac{e^{-(\lambda_1+\lambda_2)}}{k!} \sum_{j=0}^{k}\binom{k}{j}\lambda_1^j\lambda_2^{k-j} = \frac{e^{-(\lambda_1+\lambda_2)}(\lambda_1+\lambda_2)^k}{k!}. \qquad \square
$$

この加法性は物理的な直観を反映している：レート $\lambda_1$ と $\lambda_2$ の二つの独立なポアソン過程から事象が到来するとき、合成された流れはレート $\lambda_1 + \lambda_2$ のポアソン過程になる。

## まとめ

- $X \sim \operatorname{Poisson}(\lambda)$ は $n \to \infty$ のときの $\operatorname{Bin}(n, \lambda/n)$ の極限であり、固定された窓内の希な独立事象のカウントをモデル化する。
- **PMF：** $P(X = k) = e^{-\lambda}\lambda^k / k!$（$k = 0, 1, 2, \ldots$）。
- **平均と分散はいずれも $\lambda$ に等しい。**
- **加法性：** 独立な $\operatorname{Poisson}(\lambda_1)$ と $\operatorname{Poisson}(\lambda_2)$ の和は $\operatorname{Poisson}(\lambda_1 + \lambda_2)$。
