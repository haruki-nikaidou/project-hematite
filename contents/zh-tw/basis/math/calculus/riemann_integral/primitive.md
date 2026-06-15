---
title: 原函數（反導函數）
summary: "f 在區間 I 上的原函數（primitive/antiderivative）是一個可微函數 F，滿足對所有 x ∈ I 均有 F'(x) = f(x)；同一個 f 的任意兩個原函數相差一個常數。本節定義原函數，從拉格朗日均值定理證明「相差常數」定理，引入不定積分記號 ∫ f(x) dx = F(x) + C，並說明不定積分（函數族）與定積分（數值）在本質上的區別。"
prerequisites:
  - basis/math/calculus/differential/differentiable_function
  - basis/math/calculus/differential/lagranges_finite-increment_theorem
aliases: []
tags:
  - 微積分
  - 積分
  - 微分
updated: 2026-05-22
---

微分將一個函數變成它的變化率。原函數則反過來：給定一個變化率，要求重建原來的函數。這個反問題是積分理論的出發點，在從速度求距離、從加速度求位移、或從已知增長率求數量時自然出現。

## 定義

**定義。** 設 $f$ 在區間 $I \subseteq \mathbb{R}$ 上有定義。若[可微函數](../../differential/differentiable_function/) $F : I \to \mathbb{R}$ 滿足

$$
F'(x) = f(x) \quad \text{對所有 } x \in I，
$$

則稱 $F$ 為 $f$ 在 $I$ 上的**原函數（primitive）**（又稱**反導函數（antiderivative）**）。

**例子。**
- $F(x) = \tfrac{x^3}{3}$ 是 $f(x) = x^2$ 在 $\mathbb{R}$ 上的原函數，因為 $\bigl(\tfrac{x^3}{3}\bigr)' = x^2$。
- $F(x) = \sin x$ 是 $f(x) = \cos x$ 在 $\mathbb{R}$ 上的原函數。
- $F(x) = \ln x$ 是 $f(x) = \tfrac{1}{x}$ 在 $(0, \infty)$ 上的原函數。
- 函數 $f(x) = \operatorname{sgn}(x)$（符號函數）在任何包含 $0$ 的區間上均無原函數，因為導數不能有跳躍間斷點（由 Darboux 定理）。

## 原函數相差一個常數

一旦有了一個原函數 $F$，就能得到無窮多個：對任意常數 $C \in \mathbb{R}$，$F(x) + C$ 也是原函數。下面的定理說明這些是**全部**的原函數。

**定理。** 若 $F$ 和 $G$ 都是 $f$ 在區間 $I$ 上的原函數，則存在常數 $C \in \mathbb{R}$ 使得 $G(x) - F(x) = C$。

**證明。** 令 $H \coloneqq G - F$。對所有 $x \in I$，

$$
H'(x) = G'(x) - F'(x) = f(x) - f(x) = 0.
$$

對任意子區間 $[x_1, x_2] \subset I$ 施用[拉格朗日均值定理](../../differential/lagranges_finite-increment_theorem/)：存在 $c \in (x_1, x_2)$ 使得

$$
H(x_2) - H(x_1) = H'(c)(x_2 - x_1) = 0 \cdot (x_2 - x_1) = 0.
$$

因為 $x_1, x_2 \in I$ 是任意的，$H$ 在 $I$ 上任意兩點取值相同，故 $H$ 在 $I$ 上為常數。$\square$

**區間假設的重要性。** 在不連通的定義域（例如兩個不相交開區間的並集）上，導數為零的函數不一定是全局常數——它可以在每個連通分量上取不同的常數值。在不連通定義域上，原函數只在每個分量上唯一至多差一個常數。本節假設 $I$ 是區間（連通的）。

## 不定積分

$f$ 的所有原函數構成的族用**不定積分（indefinite integral）**記號表示：

$$
\int f(x)\,dx \;\coloneqq\; F(x) + C,
$$

其中 $F$ 是 $f$ 的某一個原函數，$C \in \mathbb{R}$ 是任意常數。符號 $\int \cdots dx$ 讀作「$\cdots$ 關於 $x$ 的不定積分」。

$+C$ 不是可省略的裝飾：它記錄了原函數構成一整個族、彼此相差常數這一事實。省去它就意味著聲稱某個特定函數，而非整個族。

## 不定積分與定積分

這兩種積分記號指的是本質不同的對象：

| | **不定積分** $\int f(x)\,dx$ | **定積分** $\int_a^b f(x)\,dx$ |
|---|---|---|
| **結果** | 函數族 $F(x) + C$ | 一個實數 |
| **取決於** | 被積函數 $f$ 和變數 $x$ | 被積函數 $f$ 與上下界 $a, b$ |
| **任意常數** | 有——$C$ 不確定 | 無——值是固定的 |
| **所需條件** | 原函數存在 | $f$ 的 Riemann 可積性 |

牛頓-萊布尼茨公式（在下一節中證明）將兩者聯繫起來：若 $f$ 連續且 $F$ 是 $f$ 的任一原函數，則 $\int_a^b f(x)\,dx = F(b) - F(a)$。

## 基本原函數表

以下原函數由對右側求導直接驗證。每條在右側有定義的區間上成立。

| $f(x)$ | $\int f(x)\,dx$ | 備注 |
|---|---|---|
| $x^n$（$n \neq -1$） | $\dfrac{x^{n+1}}{n+1} + C$ | 所有 $n \in \mathbb{R}$，若 $n \notin \mathbb{Z}$ 則 $x > 0$ |
| $\dfrac{1}{x}$ | $\ln\lvert x\rvert + C$ | $x \neq 0$；$x$ 正負各有一個常數 |
| $e^x$ | $e^x + C$ | |
| $\sin x$ | $-\cos x + C$ | |
| $\cos x$ | $\sin x + C$ | |
| $\dfrac{1}{1+x^2}$ | $\arctan x + C$ | |
| $\dfrac{1}{\sqrt{1-x^2}}$ | $\arcsin x + C$ | $\lvert x\rvert < 1$ |
| $\sqrt{x}$（$x > 0$） | $\dfrac{2}{3}x^{3/2} + C$ | $x^n$ 在 $n = \frac{1}{2}$ 的特例 |

可以對右側求導來驗證每一條。例如，$(\ln\lvert x\rvert)' = \tfrac{1}{x}$（$x \neq 0$），$(-\cos x)' = \sin x$。

## 不定積分的線性

因為微分是線性的，求原函數也是線性的。

**定理（線性）。** 若 $F$ 是 $f$ 在 $I$ 上的原函數，$G$ 是 $g$ 在 $I$ 上的原函數，則對任意常數 $\alpha, \beta \in \mathbb{R}$，

$$
\int \bigl[\alpha f(x) + \beta g(x)\bigr]\,dx \;=\; \alpha F(x) + \beta G(x) + C.
$$

**證明。** $(\alpha F + \beta G)' = \alpha F' + \beta G' = \alpha f + \beta g$。$\square$

**例子。** 計算 $\displaystyle\int (3x^2 - 5\cos x)\,dx$。

由線性與原函數表：

$$
\int (3x^2 - 5\cos x)\,dx \;=\; 3\cdot\frac{x^3}{3} - 5\sin x + C \;=\; x^3 - 5\sin x + C.
$$

**例子。** 計算 $\displaystyle\int \frac{x^3 + 2\sqrt{x}}{x}\,dx$（$x > 0$）。

先化簡被積函數：

$$
\frac{x^3 + 2\sqrt{x}}{x} = x^2 + \frac{2}{\sqrt{x}} = x^2 + 2x^{-1/2}.
$$

再由線性：

$$
\int \!\left(x^2 + 2x^{-1/2}\right)dx = \frac{x^3}{3} + 2\cdot\frac{x^{1/2}}{1/2} + C = \frac{x^3}{3} + 4\sqrt{x} + C.
$$

## 摘要

- $f$ 在區間 $I$ 上的**原函數**（反導函數）是可微函數 $F$，滿足 $F' = f$。
- $f$ 在 $I$ 上的任意兩個原函數相差一個常數：若 $F' = G' = f$，則 $G = F + C$（$C \in \mathbb{R}$）。這由拉格朗日均值定理施用於 $G - F$ 得出。
- **不定積分** $\int f(x)\,dx \coloneqq F(x) + C$ 表示所有原函數構成的族；$+C$ 不可省略。
- 不定積分是**函數族**；定積分 $\int_a^b f$ 是**數值**。牛頓-萊布尼茨公式將兩者聯繫起來。
- **線性**：$\int (\alpha f + \beta g)\,dx = \alpha \int f\,dx + \beta \int g\,dx$（至多差一個常數）。
- 標準原函數表——冪函數、$e^x$、$\sin$、$\cos$、$1/x$、反三角函數——由已知微分公式反向得出。
