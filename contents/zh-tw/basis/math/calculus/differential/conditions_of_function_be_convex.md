---
title: 函式為凸函式的微分條件
summary: "對可微函式 f，在區間上為凸函式等價於 f′ 單調不遞減；對二次可微函式 f，等價於 f″ ≥ 0。本 checkpoint 利用拉格朗日均值定理與單調性判定，證明這兩個條件，並示範如何一眼辨認凸函式。"
prerequisites:
  - basis/math/calculus/differential/convex
  - basis/math/calculus/differential/higher_order_dif
  - basis/math/calculus/differential/monotonic
aliases: []
tags:
  - 微積分
  - 凸性
updated: 2026-05-21
---

[凸函式的弦定義](../convex/)是全域性的：你必須對所有點的凸組合逐一比較函式值與對應弦高。對所有點對進行這樣的驗證並不實際。可微性將凸性轉化為局部條件：對 $f'$ 或 $f''$ 在每一點處的一個不等式，取代了無窮多個弦的比較。

## 條件一：透過 $f'$ 的單調性判定凸性

**定理。** 設 $f$ 在開區間 $I$ 上可微。則 $f$ 在 $I$ 上為凸函式，若且唯若 $f'$ 在 $I$ 上單調不遞減。

### 證明（$\Rightarrow$）：凸函式 $\Rightarrow$ $f'$ 不遞減

假設 $f$ 在 $I$ 上為凸函式。取 $I$ 中 $x_1 < x_2$，目標是證明 $f'(x_1) \leq f'(x_2)$。

回顧[凸函式 checkpoint](../convex/) 中等價的**割線斜率刻畫**：對 $I$ 中任意 $a < b < c$，

$$
\frac{f(b) - f(a)}{b - a} \;\leq\; \frac{f(c) - f(b)}{c - b}. \tag{1}
$$

以 $a = x_1$、$b = x_2$、$c = x_2 + h$（$h > 0$ 小）代入 $(1)$：

$$
\frac{f(x_2) - f(x_1)}{x_2 - x_1} \;\leq\; \frac{f(x_2 + h) - f(x_2)}{h}.
$$

對右側取 $h \to 0^+$ 得 $f'(x_2)$。

再以 $a = x_1$、$b = x_1 + h$、$c = x_2$（$h > 0$ 小）代入 $(1)$：

$$
\frac{f(x_1 + h) - f(x_1)}{h} \;\leq\; \frac{f(x_2) - f(x_1 + h)}{x_2 - x_1 - h}.
$$

對左側取 $h \to 0^+$ 得 $f'(x_1)$，右側趨向 $\dfrac{f(x_2) - f(x_1)}{x_2 - x_1}$。

串接：

$$
f'(x_1) \;\leq\; \frac{f(x_2) - f(x_1)}{x_2 - x_1} \;\leq\; f'(x_2).
$$

故 $f'(x_1) \leq f'(x_2)$。$\square$

### 證明（$\Leftarrow$）：$f'$ 不遞減 $\Rightarrow$ 凸函式

假設 $f'$ 在 $I$ 上不遞減。取 $I$ 中 $x < y$，$\lambda \in (0, 1)$；令 $z \coloneqq \lambda x + (1 - \lambda)y$，則 $x < z < y$。

注意 $z - x = (1-\lambda)(y - x)$ 且 $y - z = \lambda(y - x)$。

由[均值定理](../lagranges_finite-increment_theorem/)：

$$
f(z) - f(x) \;=\; f'(c_1)(z - x) \quad\text{對某 } c_1 \in (x, z)，
$$

$$
f(y) - f(z) \;=\; f'(c_2)(y - z) \quad\text{對某 } c_2 \in (z, y)。
$$

因為 $c_1 < z < c_2$ 且 $f'$ 不遞減，故 $f'(c_1) \leq f'(c_2)$。因此：

$$
\frac{f(z) - f(x)}{z - x} \;=\; f'(c_1) \;\leq\; f'(c_2) \;=\; \frac{f(y) - f(z)}{y - z}.
$$

代入 $z - x = (1-\lambda)(y-x)$ 和 $y - z = \lambda(y-x)$：

$$
\frac{f(z) - f(x)}{1 - \lambda} \;\leq\; \frac{f(y) - f(z)}{\lambda}.
$$

兩側乘以 $\lambda(1-\lambda) > 0$：

$$
\lambda\bigl(f(z) - f(x)\bigr) \;\leq\; (1-\lambda)\bigl(f(y) - f(z)\bigr).
$$

整理：

$$
\lambda f(z) - \lambda f(x) \;\leq\; (1-\lambda)f(y) - (1-\lambda)f(z),
$$

$$
f(z) \;\leq\; \lambda f(x) + (1-\lambda)f(y). \quad \square
$$

這正是弦不等式，故 $f$ 為凸函式。

## 條件二：透過二階導數判定凸性

**定理。** 設 $f \in C^2(I)$。則 $f$ 在 $I$ 上為凸函式，若且唯若對所有 $x \in I$，$f''(x) \geq 0$。

**證明。** 由條件一，$f$ 在 $I$ 上為凸函式若且唯若 $f'$ 在 $I$ 上不遞減。由對 $f'$ 應用[單調性判定](../monotonic/)，$f'$ 在 $I$ 上不遞減若且唯若 $(f')' = f'' \geq 0$ 在 $I$ 上成立。串接兩個等價即得結論。$\square$

### 嚴格凸性

**推論。** 若對所有 $x \in I$，$f''(x) > 0$，則 $f$ 在 $I$ 上嚴格凸。

**證明。** $f''$ 嚴格正意味著 $f'$ 嚴格遞增（單調性判定，情形一）。在上面 $(\Leftarrow)$ 的證明中，$c_1 < c_2$ 此時迫使 $f'(c_1) < f'(c_2)$，從而整個不等式鏈均嚴格成立，給出嚴格凸性。$\square$

逆命題不成立：$f(x) = x^4$ 滿足 $f''(0) = 0$ 但仍為嚴格凸函式——$f'' > 0$ 處處成立是嚴格凸的充分條件，但非必要條件。

## 辨認凸函式

二階導數判定使凸性的驗證變為符號檢查：

| 函式 | 定義域 | $f''$ | 凸性？ |
|------|--------|-------|--------|
| $x^2$ | $\mathbb{R}$ | $2 > 0$ | 嚴格凸 |
| $x^4$ | $\mathbb{R}$ | $12x^2 \geq 0$ | 嚴格凸（見上方說明） |
| $e^x$ | $\mathbb{R}$ | $e^x > 0$ | 嚴格凸 |
| $-\ln x$ | $(0, \infty)$ | $1/x^2 > 0$ | 嚴格凸 |
| $\ln x$ | $(0, \infty)$ | $-1/x^2 < 0$ | 嚴格凹 |
| $x^3$ | $\mathbb{R}$ | $6x$，變號 | 既非凸也非凹 |

對於 $f(x) = x^3$：在 $(0, \infty)$ 上 $f''(x) > 0$，在 $(-\infty, 0)$ 上 $f''(x) < 0$，故 $f$ 在 $(0, \infty)$ 上為凸，在 $(-\infty, 0)$ 上為凹，但在整個 $\mathbb{R}$ 上兩者均非。

## 摘要

- **條件一**：$f$ 在 $I$ 上可微，則 $f$ 凸 $\iff$ $f'$ 在 $I$ 上不遞減。
  - （$\Rightarrow$）：凸函式的割線斜率性質夾出 $f'(x_1) \leq f'(x_2)$。
  - （$\Leftarrow$）：均值定理給出 $c_1 < c_2$ 且 $f'(c_1) \leq f'(c_2)$，代數推導出弦不等式。
- **條件二**：$f \in C^2(I)$ 則 $f$ 凸 $\iff$ $f'' \geq 0$ 在 $I$ 上成立（結合條件一與對 $f'$ 的單調性判定）。
- **嚴格凸性**：$f'' > 0$ 處處成立 $\Rightarrow$ 嚴格凸；逆命題在孤立點處可能失敗。
- 實際判斷凸性：計算 $f''$ 並確定其在目標區間上的符號。
