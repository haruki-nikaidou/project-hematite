---
title: 延森不等式（Jensen's Inequality）
summary: "若 f 在某區間上是凸函式，x₁, ..., xₙ 在該區間內，且非負權重 λᵢ 之和為 1，則 f(∑ λᵢxᵢ) ≤ ∑ λᵢf(xᵢ)。本章節以凸性的兩點定義對 n 進行歸納，證明延森不等式，並確定嚴格凸函式的等號成立條件。"
prerequisites:
  - basis/math/calculus/differential/convex
aliases: []
tags:
  - 微積分
  - 凸性
  - 不等式
updated: 2026-05-20
---

[凸性的定義](../convex/)說明：兩個輸入點的加權平均，映射後的值不超過輸出值的加權平均。延森不等式（Jensen's inequality）將此從兩個點推廣到任意有限個點——所用的論證也是最簡單的：數學歸納法。

## 定理

**定理（延森不等式）。** 設 $I \subseteq \mathbb{R}$ 為區間，$f : I \to \mathbb{R}$ 為凸函式，$n \geq 1$。設 $x_1, \ldots, x_n \in I$，$\lambda_1, \ldots, \lambda_n \geq 0$ 且 $\sum_{i=1}^n \lambda_i = 1$。則

$$
f\!\left(\sum_{i=1}^{n} \lambda_i x_i\right) \;\leq\; \sum_{i=1}^{n} \lambda_i f(x_i). \tag{1}
$$

左端是對 $x_i$ 的加權平均值套用 $f$；右端是函式值的加權平均。

## 歸納法證明

**基礎情形 $n = 1$。** 兩端均等於 $f(x_1)$。$\checkmark$

**基礎情形 $n = 2$。** 這正是凸性的定義：
$f(\lambda_1 x_1 + \lambda_2 x_2) \leq \lambda_1 f(x_1) + \lambda_2 f(x_2)$，其中 $\lambda_1 + \lambda_2 = 1$。$\checkmark$

**歸納步驟。** 假設 $(1)$ 對某個 $n \geq 2$ 成立；我們對 $n + 1$ 加以證明。

設 $x_1, \ldots, x_{n+1} \in I$，$\lambda_1, \ldots, \lambda_{n+1} \geq 0$，$\sum_{i=1}^{n+1} \lambda_i = 1$。

若 $\lambda_{n+1} = 1$，則其餘權重均為零，兩端均等於 $f(x_{n+1})$。故不妨假設 $\lambda_{n+1} < 1$，即 $\mu \coloneqq 1 - \lambda_{n+1} > 0$。

定義 $\mu_i \coloneqq \lambda_i / \mu$（$i = 1, \ldots, n$）。則 $\mu_i \geq 0$ 且 $\sum_{i=1}^n \mu_i = 1$，從而 $z \coloneqq \sum_{i=1}^n \mu_i x_i \in I$（區間對凸組合封閉）。改寫左端：

$$
\sum_{i=1}^{n+1} \lambda_i x_i \;=\; \mu z + \lambda_{n+1} x_{n+1},
\qquad \mu + \lambda_{n+1} = 1.
$$

對 $z$ 與 $x_{n+1}$，以 $\mu$ 和 $\lambda_{n+1}$ 為權重，套用兩點凸性不等式（基礎情形 $n = 2$）：

$$
f\!\left(\sum_{i=1}^{n+1} \lambda_i x_i\right)
= f(\mu z + \lambda_{n+1} x_{n+1})
\leq \mu f(z) + \lambda_{n+1} f(x_{n+1}).
$$

對 $z = \sum_{i=1}^n \mu_i x_i$，以權重 $\mu_i$ 套用歸納假設：

$$
f(z) \;\leq\; \sum_{i=1}^n \mu_i f(x_i).
$$

合併，並代入 $\mu_i = \lambda_i / \mu$：

$$
f\!\left(\sum_{i=1}^{n+1} \lambda_i x_i\right)
\;\leq\; \mu \sum_{i=1}^n \frac{\lambda_i}{\mu} f(x_i) + \lambda_{n+1} f(x_{n+1})
\;=\; \sum_{i=1}^{n+1} \lambda_i f(x_i). \quad \square
$$

## 等號成立的條件

**命題。** 若 $f$ 是**嚴格**凸函式，且所有 $\lambda_i > 0$，則 $(1)$ 中等號成立，若且唯若 $x_1 = x_2 = \cdots = x_n$。

*證明概要。* 在歸納步驟中，除非 $z = x_{n+1}$，否則兩點不等式嚴格成立；除非 $x_1, \ldots, x_n$ 全相等，否則歸納假設嚴格成立。追蹤歸納過程可知，任何一個嚴格步驟都會使結論的不等式嚴格成立。$\square$

## 應用

**算術幾何平均不等式。** 取 $f(t) = -\ln t$（在 $(0, \infty)$ 上嚴格凸），均勻權重 $\lambda_i = 1/n$：

$$
-\ln\!\left(\frac{x_1 + \cdots + x_n}{n}\right) \;\leq\; \frac{-\ln x_1 - \cdots - \ln x_n}{n} \;=\; -\ln\!\left(x_1 \cdots x_n\right)^{1/n}.
$$

取負並指數化，即得 AM–GM 不等式：

$$
\frac{x_1 + \cdots + x_n}{n} \;\geq\; (x_1 \cdots x_n)^{1/n}.
$$

**對數和不等式。** 取 $f(t) = t \ln t$（在 $(0,\infty)$ 上凸）；延森不等式是資訊理論中 KL 散度非負性的基礎。

## 摘要

- **延森不等式**：對凸函式 $f$ 與和為 $1$ 的非負權重 $\lambda_i$，
  $$f\!\left(\sum \lambda_i x_i\right) \leq \sum \lambda_i f(x_i).$$
- **證明**：對 $n$ 進行歸納；$n = 2$ 的基礎情形就是凸性的定義；歸納步驟剝離最後一個點並套用兩點不等式。
- **等號**：當 $f$ 嚴格凸且所有權重為正時，等號成立若且唯若所有 $x_i$ 相等。
- **AM–GM 不等式**是直接推論：對均勻權重套用延森不等式，取 $f = -\ln$。
