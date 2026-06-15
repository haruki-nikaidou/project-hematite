---
title: 泰勒公式（Taylor's Formula）
summary: "泰勒公式（Taylor's formula）用一個 n 次多項式——其係數為 f 在 x₀ 處的各階導數除以階乘——在 x₀ 附近近似 n 次可微函式，並附帶明確的餘項。本章節以拉格朗日餘項形式證明泰勒公式，並說明它如何構成初等函式冪級數展開的基礎。"
prerequisites:
  - basis/math/calculus/differential/higher_order_dif
  - basis/math/calculus/differential/lagranges_finite-increment_theorem
aliases: []
tags:
  - 微積分
  - 微分
updated: 2026-05-20
---

[均值定理](../lagranges_finite-increment_theorem/)指出 $f(x) = f(x_0) + f'(c)(x - x_0)$，其中 $c$ 是介於 $x$ 和 $x_0$ 之間某個未知的點。這是一個帶有不精確餘項的線性近似。泰勒公式將此思想推廣到任意階：以 $n$ 次多項式近似 $f$，並明確表達剩餘誤差。

## 泰勒多項式

**定義。** **$f$ 在 $x_0$ 處的 $n$ 次泰勒多項式**為

$$
P_n(x) \;\coloneqq\; \sum_{k=0}^{n} \frac{f^{(k)}(x_0)}{k!}\,(x - x_0)^k
= f(x_0) + f'(x_0)(x-x_0) + \frac{f''(x_0)}{2!}(x-x_0)^2 + \cdots + \frac{f^{(n)}(x_0)}{n!}(x-x_0)^n.
$$

係數 $\dfrac{f^{(k)}(x_0)}{k!}$ 是使得 $P_n^{(k)}(x_0) = f^{(k)}(x_0)$（$k = 0, 1, \ldots, n$）成立的唯一取值：多項式在 $x_0$ 處與 $f$ 及其各階導數（至 $n$ 階）完全吻合。

## 帶拉格朗日餘項的泰勒公式

**定理（泰勒公式）。** 設 $f$ 在包含 $x_0$ 和 $x$ 的某開區間上 $(n+1)$ 次可微。則

$$
f(x) \;=\; P_n(x) \;+\; R_n(x), \tag{1}
$$

其中**拉格朗日餘項（Lagrange remainder）**為

$$
R_n(x) \;=\; \frac{f^{(n+1)}(\xi)}{(n+1)!}\,(x - x_0)^{n+1} \tag{2}
$$

對某個嚴格介於 $x_0$ 和 $x$ 之間的 $\xi$ 成立。

## 證明

固定 $x \neq x_0$，設 $J$ 為以 $x_0$ 和 $x$ 為端點的閉區間。定義

$$
F(t) \;\coloneqq\; f(x) - \sum_{k=0}^{n} \frac{f^{(k)}(t)}{k!}(x - t)^k, \qquad G(t) \;\coloneqq\; (x - t)^{n+1}.
$$

兩者在 $J$ 上連續，在 $J$ 的內部可微。注意：
- $F(x) = 0$，$G(x) = 0$。
- $F(x_0) = f(x) - P_n(x)$，$G(x_0) = (x - x_0)^{n+1} \neq 0$。

**$F$ 的導數的伸縮。** 利用[乘積法則](../basic_roles_of_dif/)對每一項 $\tfrac{f^{(k)}(t)}{k!}(x-t)^k$ 求導：

$$
\frac{d}{dt}\left[\frac{f^{(k)}(t)}{k!}(x-t)^k\right]
= \frac{f^{(k+1)}(t)}{k!}(x-t)^k \;-\; \frac{f^{(k)}(t)}{(k-1)!}(x-t)^{k-1}.
$$

對 $k = 0$ 到 $n$ 求和，求和式伸縮——每一項 $\tfrac{f^{(k)}(t)}{(k-1)!}(x-t)^{k-1}$ 與第一部分中 $k \mapsto k-1$ 的項相消——只剩 $k = n$ 項的第一個被加數：

$$
F'(t) \;=\; -\frac{f^{(n+1)}(t)}{n!}(x - t)^n, \qquad G'(t) \;=\; -(n+1)(x-t)^n.
$$

**套用羅爾定理。** 構造輔助函式

$$
\phi(t) \;\coloneqq\; F(t) - \frac{F(x_0)}{G(x_0)}\,G(t).
$$

則 $\phi(x_0) = 0$，$\phi(x) = F(x) - \tfrac{F(x_0)}{G(x_0)} \cdot 0 = 0$。由[羅爾定理](../rolles_theorem/)，存在嚴格介於 $x_0$ 和 $x$ 之間的 $\xi$ 使得 $\phi'(\xi) = 0$：

$$
F'(\xi) - \frac{F(x_0)}{G(x_0)}\,G'(\xi) = 0.
$$

因 $\xi \neq x$，$(x - \xi)^n \neq 0$，代入 $F'$ 和 $G'$：

$$
-\frac{f^{(n+1)}(\xi)}{n!}(x-\xi)^n + \frac{F(x_0)}{G(x_0)}(n+1)(x-\xi)^n = 0
\;\;\Longrightarrow\;\;
\frac{F(x_0)}{G(x_0)} = \frac{f^{(n+1)}(\xi)}{(n+1)!}.
$$

兩端乘以 $G(x_0) = (x-x_0)^{n+1}$，得 $F(x_0) = R_n(x)$，即 $(2)$ 中的形式。$\square$

## 標準麥克勞林展開

當 $x_0 = 0$ 時，公式稱為**麥克勞林展開（Maclaurin expansion）**。下列等式對所有 $x \in \mathbb{R}$ 成立（令 $n \to \infty$ 並驗證 $R_n \to 0$）：

$$
e^x \;=\; \sum_{k=0}^{\infty} \frac{x^k}{k!} \;=\; 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots
$$

$$
\sin x \;=\; \sum_{k=0}^{\infty} \frac{(-1)^k}{(2k+1)!} x^{2k+1} \;=\; x - \frac{x^3}{6} + \frac{x^5}{120} - \cdots
$$

$$
\cos x \;=\; \sum_{k=0}^{\infty} \frac{(-1)^k}{(2k)!} x^{2k} \;=\; 1 - \frac{x^2}{2} + \frac{x^4}{24} - \cdots
$$

$$
\ln(1+x) \;=\; \sum_{k=1}^{\infty} \frac{(-1)^{k-1}}{k} x^k \;=\; x - \frac{x^2}{2} + \frac{x^3}{3} - \cdots \quad (-1 < x \leq 1)
$$

$$
(1+x)^\alpha \;=\; \sum_{k=0}^{\infty} \binom{\alpha}{k} x^k \;=\; 1 + \alpha x + \frac{\alpha(\alpha-1)}{2!}x^2 + \cdots \quad (|x| < 1)
$$

其中廣義二項式係數為 $\binom{\alpha}{k} \coloneqq \dfrac{\alpha(\alpha-1)\cdots(\alpha-k+1)}{k!}$。

## 利用餘項估計誤差

拉格朗日形式 $(2)$ 給出具體的誤差界。若對所有介於 $x_0$ 和 $x$ 之間的 $t$ 均有 $|f^{(n+1)}(t)| \leq M$，則

$$
|R_n(x)| \;\leq\; \frac{M}{(n+1)!}\,|x - x_0|^{n+1}.
$$

**例。** 以 $x_0 = 0$ 處的 $P_3$ 近似 $e^{0.1}$：

$$
P_3(0.1) \;=\; 1 + 0.1 + \frac{0.01}{2} + \frac{0.001}{6} \;\approx\; 1.10516\overline{6}.
$$

餘項滿足 $|R_3(0.1)| \leq \dfrac{e^{0.1}}{4!}(0.1)^4 < \dfrac{3}{24} \cdot 10^{-4} \approx 1.25 \times 10^{-5}$。近似精確到小數點後五位。

## 計算極限

泰勒公式使未定式極限的計算變得系統化。計算 $\lim_{x \to 0} \dfrac{\sin x - x}{x^3}$，展開 $\sin x = x - \dfrac{x^3}{6} + O(x^5)$：

$$
\frac{\sin x - x}{x^3} \;=\; \frac{-x^3/6 + O(x^5)}{x^3} \;\to\; -\frac{1}{6}.
$$

## 摘要

- **泰勒多項式** $P_n$ 是 $f$ 在 $x_0$ 處的 $n$ 次近似，在 $x_0$ 處與 $f$ 及其各階導數（至 $n$ 階）完全吻合。
- **泰勒公式**：$f(x) = P_n(x) + R_n(x)$，其中**拉格朗日餘項** $R_n(x) = \dfrac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_0)^{n+1}$，$\xi$ 介於 $x_0$ 和 $x$ 之間。
- **證明思路**：定義一個在 $x_0$ 處取值等於餘項的輔助函式；套用柯西均值定理，消去各階導數項，只留最高階項。
- 拉格朗日餘項給出界 $|R_n(x)| \leq \dfrac{M}{(n+1)!}|x-x_0|^{n+1}$（在 $|f^{(n+1)}| \leq M$ 時成立）。
- $e^x$、$\sin x$、$\cos x$、$\ln(1+x)$ 和 $(1+x)^\alpha$ 的標準冪級數均由令 $n \to \infty$ 得出。
