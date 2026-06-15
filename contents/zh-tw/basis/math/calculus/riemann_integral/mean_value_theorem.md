---
title: 積分均值定理
summary: "若 f 在 [a, b] 上連續，則存在 ξ ∈ [a, b] 使得 ∫_a^b f(x) dx = f(ξ)(b − a)——積分等於某中間點的函數值乘以區間長度。本節結合單調性界 m(b − a) ≤ ∫ f ≤ M(b − a) 與中間值定理來證明此定理，給出帶權形式 ∫ fg = f(ξ) ∫ g（g 為非負權函數），並將結果幾何地解釋為「f 在 [a, b] 上的平均值」。"
prerequisites:
  - basis/math/calculus/riemann_integral/monotonicity_of_integral
  - basis/math/calculus/continuous_function/intermediate_value_theorem
aliases: []
tags:
  - 微積分
  - 積分
  - 均值定理
updated: 2026-05-22
---

假設你開車兩小時行駛了 120 公里，那麼平均速度是 60 公里/小時。在某個瞬間，你的速度恰好等於這個平均值。積分版本的這個事實說的是：連續函數的平均值必然在區間上的某點被取到。這就是**積分均值定理（mean value theorem for integrals）**，也是證明變上限積分函數可微的關鍵步驟。

## 定理陳述

**定理（積分均值定理）。** 設 $f : [a, b] \to \mathbb{R}$ 為[連續](../../continuous_function/continuous/)函數。則存在 $\xi \in [a, b]$ 使得

$$
\int_a^b f(x)\,dx \;=\; f(\xi)\,(b - a).
$$

等價地，$f$ 在 $[a, b]$ 上的**平均值**，定義為 $\dfrac{1}{b-a}\displaystyle\int_a^b f(x)\,dx$，由 $f$ 在某個內點取到。

## 證明

由於 $f$ 在閉有界區間 $[a, b]$ 上連續，它取到最小值 $m \coloneqq \min_{[a,b]} f$ 和最大值 $M \coloneqq \max_{[a,b]} f$（由極值定理）。由[積分單調性](../monotonicity_of_integral/)，將 $f$ 與常數函數 $m$ 和 $M$ 比較，得

$$
m(b - a) \;\leq\; \int_a^b f(x)\,dx \;\leq\; M(b - a).
$$

除以 $b - a > 0$：

$$
m \;\leq\; \frac{1}{b-a}\int_a^b f(x)\,dx \;\leq\; M.
$$

量 $\mu \coloneqq \dfrac{1}{b-a}\displaystyle\int_a^b f(x)\,dx$ 介於 $f$ 在 $[a, b]$ 上的最小值和最大值之間。由於 $f$ 在 $[a, b]$ 上連續，[中間值定理](../../continuous_function/intermediate_value_theorem/)保證存在 $\xi \in [a, b]$ 使得 $f(\xi) = \mu$。兩邊乘以 $(b - a)$ 即得結論。$\square$

## 帶權版本

更一般的形式以非負權函數取代區間長度 $b - a$。

**定理（帶權積分均值定理）。** 設 $f : [a, b] \to \mathbb{R}$ 連續，$g : [a, b] \to \mathbb{R}$ 可積且對所有 $x \in [a, b]$ 均有 $g(x) \geq 0$。則存在 $\xi \in [a, b]$ 使得

$$
\int_a^b f(x)\,g(x)\,dx \;=\; f(\xi)\int_a^b g(x)\,dx.
$$

**證明。** 同樣令 $m = \min_{[a,b]} f$，$M = \max_{[a,b]} f$。由 $g \geq 0$ 且 $m \leq f \leq M$，單調性給出

$$
m \int_a^b g(x)\,dx \;\leq\; \int_a^b f(x)\,g(x)\,dx \;\leq\; M \int_a^b g(x)\,dx.
$$

**情形一：** $\int_a^b g = 0$。則左側積分也為 $0$（因為 $0 \leq \int fg \leq 0$），故等式 $\int fg = f(\xi) \cdot 0$ 對任意 $\xi$ 均成立。取 $\xi = a$。

**情形二：** $\int_a^b g > 0$。將不等式除以 $\int_a^b g$，得

$$
m \;\leq\; \frac{\displaystyle\int_a^b f(x)\,g(x)\,dx}{\displaystyle\int_a^b g(x)\,dx} \;\leq\; M.
$$

由中間值定理（論證同前）存在 $\xi \in [a, b]$ 使得 $f(\xi)$ 等於該比值。$\square$

不帶權的定理是 $g \equiv 1$ 的特殊情形。

## 幾何解釋：平均值

定義 $f$ 在 $[a, b]$ 上的**平均值**為

$$
\langle f \rangle \;\coloneqq\; \frac{1}{b - a}\int_a^b f(x)\,dx.
$$

幾何上，$\langle f \rangle$ 是以 $[a, b]$ 為底邊、面積等於 $\int_a^b f$ 的矩形的高。積分均值定理說這個矩形與曲線下方區域面積相等：曲線在 $\xi$ 處的高度等於矩形的高度。換言之，連續函數必然通過自身的平均值。

這個解釋對**估計**很有用：若已知 $f$ 在 $[a, b]$ 上有界 $m \le f \le M$，則

$$
m \;\leq\; \langle f \rangle \;\leq\; M,
$$

無需精確計算即可對積分給出界。

## 例題

**問題。** 證明 $\displaystyle\int_0^1 e^{-x^2}\,dx \in \bigl(e^{-1},\, 1\bigr)$。

**解。** 函數 $f(x) = e^{-x^2}$ 在 $[0,1]$ 上連續且嚴格遞減，$f(0) = 1$，$f(1) = e^{-1}$。由積分單調性，

$$
e^{-1} \cdot 1 \;\leq\; \int_0^1 e^{-x^2}\,dx \;\leq\; 1 \cdot 1,
$$

故積分落在 $[e^{-1}, 1]$ 中。由於 $f$ 嚴格遞減且非常數，不等式嚴格成立：

$$
\int_0^1 e^{-x^2}\,dx \;\in\; \bigl(e^{-1},\, 1\bigr).
$$

積分均值定理保證存在某個 $\xi \in (0, 1)$ 使得 $e^{-\xi^2} = \int_0^1 e^{-x^2}\,dx$——雖然無法用閉合形式求出這個 $x$ 值，但它確實存在。

**數值驗算。** 積分約為 $0.7468$，確實落在 $(e^{-1}, 1) \approx (0.368, 1)$ 之中。

## 摘要

- **積分均值定理**：若 $f$ 在 $[a, b]$ 上連續，則對某個 $\xi \in [a, b]$ 有 $\displaystyle\int_a^b f(x)\,dx = f(\xi)(b-a)$。
- **證明**：由單調性得界 $m(b-a) \leq \int f \leq M(b-a)$，再結合連續函數的中間值定理，保證平均值被取到。
- **帶權版本**：若 $g \geq 0$ 可積，則對某個 $\xi \in [a, b]$ 有 $\int fg = f(\xi)\int g$。
- **平均值**：$\langle f \rangle = \frac{1}{b-a}\int_a^b f$ 是等面積矩形的高；定理指出 $f(\xi) = \langle f \rangle$ 在某個 $\xi$ 處成立。
- 此定理直接用於牛頓-萊布尼茨公式的證明，用來對變上限函數的差商進行估計。
