---
title: 鏈式法則
summary: "鏈式法則（chain rule）表達複合函式的導數：(f ∘ g)′(x) = f′(g(x)) · g′(x)。本 checkpoint 從導數定義出發嚴格證明此法則，處理 g′(x) = 0 的微妙情形，並說明如何藉此對任意可微函式的複合求導。"
prerequisites:
  - basis/math/calculus/differential/differentiable_function
  - basis/math/calculus/differential/basic_roles_of_dif
aliases: []
tags:
  - 微積分
  - 微分
updated: 2026-05-20
---

[基本法則](./basic_roles_of_dif/)處理的是函式的算術組合，但對於像 $(x^3+1)^{100}$ 或 $\sin(x^2)$ 這樣的*複合*函式，它們無能為力。**鏈式法則（chain rule）**正是填補這一缺口的工具：它以 $f$ 和 $g$ 各自的導數來表達 $f \circ g$ 的導數。

## 定理陳述

**定理（鏈式法則）。** 設 $g$ 在 $x$ 處可微，$f$ 在 $g(x)$ 處可微。則 $h \coloneqq f \circ g$ 在 $x$ 處可微，且

$$
h'(x) \;=\; f'(g(x)) \cdot g'(x). \tag{1}
$$

以萊布尼茲記號，令 $u = g(x)$、$y = f(u)$：

$$
\frac{dy}{dx} \;=\; \frac{dy}{du} \cdot \frac{du}{dx}.
$$

## 證明

直觀的消去法 $\dfrac{f(g(x+k))-f(g(x))}{k} = \dfrac{f(g(x+k))-f(g(x))}{g(x+k)-g(x)} \cdot \dfrac{g(x+k)-g(x)}{k}$ 在某些非零 $k$ 使得 $g(x+k) = g(x)$ 時會失敗（第一個因子變成 $0/0$）。下面的**輔助函式論證**可以乾淨地處理這種情形。

**證明。** 定義 $\phi$ 為

$$
\phi(u) \;=\; \begin{cases} \dfrac{f(u) - f(g(x))}{u - g(x)} & u \neq g(x), \\[6pt] f'(g(x)) & u = g(x). \end{cases}
$$

因為 $f$ 在 $g(x)$ 處可微，$\phi$ 在 $g(x)$ 處連續。

對任意 $k \neq 0$，令 $u = g(x+k)$：

$$
f(g(x+k)) - f(g(x)) \;=\; \phi(g(x+k)) \cdot \bigl(g(x+k) - g(x)\bigr),
$$

無論 $g(x+k)$ 是否等於 $g(x)$，此式均成立（相等時兩側均為 $0$）。除以 $k$：

$$
\frac{f(g(x+k)) - f(g(x))}{k} \;=\; \phi(g(x+k)) \cdot \frac{g(x+k) - g(x)}{k}.
$$

當 $k \to 0$ 時：右側第二個因子收斂到 $g'(x)$；由於 $g$ 在 $x$ 處連續，$g(x+k) \to g(x)$，故 $\phi(g(x+k)) \to \phi(g(x)) = f'(g(x))$。因此 $(f \circ g)'(x) = f'(g(x)) \cdot g'(x)$。$\square$

## 例子

### 多項式的冪

$$
\bigl((x^3+1)^5\bigr)' \;=\; 5(x^3+1)^4 \cdot 3x^2 \;=\; 15x^2(x^3+1)^4.
$$

### 線性代換

$$
\bigl((2x+1)^{100}\bigr)' \;=\; 100(2x+1)^{99} \cdot 2 \;=\; 200(2x+1)^{99}.
$$

### 抽象複合

若 $f$ 可微且 $g(x) = f(x^2 + 3x)$，則 $g'(x) = f'(x^2+3x)\cdot(2x+3)$。

## 摘要

- **鏈式法則**：$(f \circ g)'(x) = f'(g(x)) \cdot g'(x)$。
- 證明使用輔助函式 $\phi$，以避免在 $g(x+k) = g(x)$ 時除以零。
- 萊布尼茲記號：$\dfrac{dy}{dx} = \dfrac{dy}{du} \cdot \dfrac{du}{dx}$。
