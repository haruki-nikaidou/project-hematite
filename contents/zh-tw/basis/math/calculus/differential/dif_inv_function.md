---
title: 反函式的導數
summary: "若 f 可微且嚴格單調，且 f′(x) ≠ 0，則其反函式可微，且 (f⁻¹)′(y) = 1 / f′(f⁻¹(y))。本 checkpoint 證明反函式微分公式，並以此計算對數函式和反三角函式的導數。"
prerequisites:
  - basis/math/calculus/differential/chain_rule
aliases: []
tags:
  - 微積分
  - 微分
updated: 2026-05-20
---

若你知道如何對 $f$ 求導，能否立刻對其反函式 $f^{-1}$ 求導？答案是肯定的，前提是 $f'$ 不為零。這為 $\ln x$、$\arcsin x$、$\arctan x$ 以及所有其他反函式的導數提供了高效的捷徑。

## 反函式微分公式

**定理。** 設 $f$ 在開區間 $I$ 上連續且嚴格單調、在 $I$ 上可微，且對所有 $x \in I$，$f'(x) \neq 0$。則 $f^{-1}$ 在 $f(I)$ 上可微，且

$$
(f^{-1})'(y) \;=\; \frac{1}{f'(f^{-1}(y))}. \tag{1}
$$

**證明。** 固定 $y_0 = f(x_0) \in f(I)$，令 $y = f(x)$ 且 $y \neq y_0$。則 $x \neq x_0$，且

$$
\frac{f^{-1}(y) - f^{-1}(y_0)}{y - y_0} \;=\; \frac{x - x_0}{f(x) - f(x_0)}.
$$

當 $y \to y_0$ 時，$f^{-1}$ 的連續性（由 $f$ 的嚴格單調性和連續性推出）給出 $x = f^{-1}(y) \to x_0$。由於 $f'(x_0) \neq 0$，

$$
\lim_{y \to y_0}\frac{x - x_0}{f(x) - f(x_0)} \;=\; \frac{1}{f'(x_0)} \;=\; \frac{1}{f'(f^{-1}(y_0))}. \;\square
$$

萊布尼茲記號：若 $y = f(x)$，則 $\dfrac{dx}{dy} = \dfrac{1}{\,\dfrac{dy}{dx}\,}$。

## $\ln x$ 的導數

令 $f(x) = e^x$，則 $f^{-1}(y) = \ln y$。因為 $f'(x) = e^x \neq 0$，公式 $(1)$ 給出

$$
(\ln y)' \;=\; \frac{1}{e^{\ln y}} \;=\; \frac{1}{y}.
$$

即 $\dfrac{d}{dx}(\ln x) = \dfrac{1}{x}$（$x > 0$）。

## 反三角函式的導數

### 反正弦函式

將 $f(x) = \sin x$ 限制在 $[-\pi/2, \pi/2]$ 上。則 $f^{-1}(y) = \arcsin y$（$y \in (-1,1)$），且在開區間上 $f'(x) = \cos x > 0$。在 $x = \arcsin y$ 處：$\cos x = \sqrt{1-\sin^2 x} = \sqrt{1-y^2}$，故

$$
(\arcsin y)' \;=\; \frac{1}{\sqrt{1-y^2}}.
$$

### 反餘弦函式

將 $f(x) = \cos x$ 限制在 $[0,\pi]$ 上，則 $f^{-1}(y) = \arccos y$，在 $(0,\pi)$ 上 $f'(x) = -\sin x < 0$。在 $x = \arccos y$ 處：$\sin x = \sqrt{1-y^2}$，故

$$
(\arccos y)' \;=\; \frac{-1}{\sqrt{1-y^2}}.
$$

注意：$(\arcsin x)' + (\arccos x)' = 0$，與恆等式 $\arcsin x + \arccos x = \pi/2$ 一致。

### 反正切函式

將 $f(x) = \tan x$ 限制在 $(-\pi/2, \pi/2)$ 上。則在 $y = \tan x$ 處，$f'(x) = 1 + \tan^2 x = 1 + y^2$，故

$$
(\arctan y)' \;=\; \frac{1}{1+y^2}.
$$

## 摘要

- **反函式法則**：$(f^{-1})'(y) = \dfrac{1}{f'(f^{-1}(y))}$，在 $f$ 嚴格單調且 $f' \neq 0$ 時成立。
- $(\ln x)' = 1/x$，由 $(e^x)' = e^x$ 取反函式導出。
- $(\arcsin x)' = 1/\sqrt{1-x^2}$，$\;(\arccos x)' = -1/\sqrt{1-x^2}$，$\;(\arctan x)' = 1/(1+x^2)$。
