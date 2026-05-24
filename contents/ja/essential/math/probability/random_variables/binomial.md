---
title: 二項分布
summary: "二項分布は n 回の独立なベルヌーイ(p) 試行における成功数を数え、PMF は P(X = k) = C(n,k) p^k (1−p)^(n−k) だ。このチェックポイントではベルヌーイという構成要素から PMF を導出し、平均 np と分散 np(1−p) を計算し、同じ p を持つ独立な二項分布の和が再び二項分布となる加法的構造を示す。"
prerequisites:
  - essential/math/probability/random_variables/bernoulli
aliases: []
tags:
  - 確率
  - 確率変数
  - 分布
updated: 2026-05-22
---

実験が同じ二値試行を何度も繰り返すとき——コインを投げる、製造部品を検査する、アンケートの回答を集める——自然な問いは「成功は何回起きるか？」だ。二項分布はまさにこの問いに答える。

## 設定

整数 $n \ge 1$ と確率 $p \in [0, 1]$ を固定する。$n$ 回の**独立な** [ベルヌーイ(p)](../bernoulli/) 試行を行い、$X$ を成功の総数とする。形式的には $X_1, X_2, \ldots, X_n$ を各 $X_i \sim \text{Bernoulli}(p)$ の独立な確率変数として

$$
X \coloneqq X_1 + X_2 + \cdots + X_n
$$

と定義する。$X \sim \text{Binomial}(n, p)$、または $X \sim \text{Bin}(n, p)$ と書く。

## PMF の導出

$X$ は $\{0, 1, \ldots, n\}$ に値をとる。$P(X = k)$ を求めるには、$n$ 回の試行でちょうど $k$ 回成功する場合の数を数える。

**組み合わせ論的議論。** $k$ 回成功 $n - k$ 回失敗の特定の順序は、独立性より確率 $p^k (1-p)^{n-k}$ で起きる。$n$ 回のうちどの $k$ 回が成功かを選ぶ順序の数は $\binom{n}{k}$ だ。すべての順序について足し合わせると**確率質量関数**（PMF：probability mass function）が得られる：

$$
P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}, \qquad k = 0, 1, \ldots, n.
$$

$\sum_{k=0}^{n} \binom{n}{k} p^k (1-p)^{n-k} = (p + (1-p))^n = 1$（二項定理）なので、これは正当な PMF だ。

## 平均

期待値の線形性を使えば、PMF から直接計算しなくても済む。$X = \sum_{i=1}^n X_i$ という表現と各 [ベルヌーイ指示変数](../bernoulli/) $E[X_i] = p$ を用いると：

$$
E[X] = \sum_{i=1}^n E[X_i] = np.
$$

独立性は不要——線形性は無条件に成り立つ。

## 分散

ここでは $X_i$ の独立性が必要だ。指示変数が独立なので分散が加算される：

$$
\text{Var}(X) = \sum_{i=1}^n \text{Var}(X_i) = n \cdot p(1-p) = np(1-p).
$$

## 加法的性質

**定理。** $X \sim \text{Bin}(m, p)$ と $Y \sim \text{Bin}(n, p)$ が独立ならば

$$
X + Y \sim \text{Bin}(m + n,\, p).
$$

**MGF による証明。** $X \sim \text{Bin}(m, p)$ の MGF は $m$ 個の独立なベルヌーイ MGF を掛け合わせて得られる：

$$
M_X(t) = \bigl((1-p) + pe^t\bigr)^m.
$$

同様に $M_Y(t) = ((1-p) + pe^t)^n$ だ。$X$ と $Y$ が独立なので和の MGF は因数分解される：

$$
M_{X+Y}(t) = M_X(t) \cdot M_Y(t) = \bigl((1-p) + pe^t\bigr)^{m+n},
$$

これは $\text{Bin}(m+n, p)$ の MGF だ。MGF が分布を一意に決定するので結果が従う。$\square$

**直観。** $m$ 回の独立なベルヌーイ試行の後に $n$ 回の独立なベルヌーイ試行を行うことは——すべて同じ $p$ で——$m + n$ 回を一度に行うことと区別がつかない。

## まとめ

- $X \sim \text{Bin}(n, p)$ は $n$ 回の独立な [ベルヌーイ(p)](../bernoulli/) 試行の成功数を数える。
- PMF：$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$（$k = 0, 1, \ldots, n$）。
- 平均：$E[X] = np$（期待値の線形性による）。
- 分散：$\text{Var}(X) = np(1-p)$（指示変数の独立性による）。
- MGF：$M(t) = ((1-p) + pe^t)^n$。
- 加法的：独立な $\text{Bin}(m, p)$ と $\text{Bin}(n, p)$ の和は $\text{Bin}(m+n, p)$。
