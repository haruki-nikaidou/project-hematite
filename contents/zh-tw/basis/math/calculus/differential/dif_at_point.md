---
title: 一點處的導數
summary: "f 在 x₀ 處的導數（derivative）是差商 (f(x₀+h)−f(x₀))/h 在 h → 0 時的極限。本 checkpoint 給出精確的 ε–δ 定義，從基本原理計算導數，並說明在一點可微蘊含在該點連續。"
prerequisites:
  - basis/math/calculus/continuous_function/limit_of_function
  - basis/math/calculus/differential/tangent_line
aliases: []
tags:
  - 微積分
  - 微分
updated: 2026-05-20
---

[切線（tangent line）](./tangent_line/)捕捉函式的*瞬時斜率*。本 checkpoint 將這一直覺精確化：$f$ 在點 $x_0$ 處的**導數（derivative）**是差商的極限，正式定義為其奠定嚴格基礎。

## 定義

**定義。** 設 $f$ 在包含 $x_0$ 的某開區間上有定義。$f$ 在 $x_0$ 處的**導數**，記作 $f'(x_0)$，定義為

$$
f'(x_0) \;=\; \lim_{h \to 0} \frac{f(x_0 + h) - f(x_0)}{h}, \tag{1}
$$

前提是此極限存在且有限。當極限存在時，稱 $f$ 在 $x_0$ 處**可微（differentiable）**。

等價地，以代換 $x = x_0 + h$：

$$
f'(x_0) \;=\; \lim_{x \to x_0} \frac{f(x) - f(x_0)}{x - x_0}.
$$

記號 $\dfrac{df}{dx}\big|_{x=x_0}$ 和 $\dfrac{d}{dx}f(x)\big|_{x=x_0}$ 也是標準寫法。

## 從基本原理計算

### 冪函式 $f(x) = x^n$，$n \in \mathbb{N}$

由二項式定理，

$$
\frac{(x_0+h)^n - x_0^n}{h} \;=\; n x_0^{n-1} + \binom{n}{2} x_0^{n-2} h + \cdots + h^{n-1}.
$$

除第一項外，每一項都含有 $h$ 的因子，故當 $h \to 0$ 時差商收斂到 $nx_0^{n-1}$：

$$
\frac{d}{dx}(x^n) \;=\; n x^{n-1}.
$$

### 常數函式 $f(x) = c$

差商為 $\dfrac{c - c}{h} = 0$（對所有 $h \neq 0$），故 $f'(x_0) = 0$。

## 可微蘊含連續

**定理。** 若 $f$ 在 $x_0$ 處可微，則 $f$ 在 $x_0$ 處連續。

**證明。** 寫成 $f(x_0 + h) - f(x_0) = \dfrac{f(x_0+h)-f(x_0)}{h} \cdot h$。第一個因子收斂到 $f'(x_0)$，第二個因子趨向 $0$。由極限的乘積法則，

$$
\lim_{h \to 0}\bigl[f(x_0+h) - f(x_0)\bigr] \;=\; f'(x_0) \cdot 0 \;=\; 0,
$$

故 $\lim_{h\to 0} f(x_0+h) = f(x_0)$。$\square$

逆命題不成立：$f(x) = |x|$ 在 $0$ 處連續，但在該點不可微——左右兩側的差商極限分別趨向 $-1$ 和 $+1$。

## 單側導數

**定義。** $x_0$ 處的**右導數**和**左導數**分別為

$$
f'_+(x_0) \;=\; \lim_{h \to 0^+}\frac{f(x_0+h)-f(x_0)}{h}, \qquad f'_-(x_0) \;=\; \lim_{h \to 0^-}\frac{f(x_0+h)-f(x_0)}{h}.
$$

雙側導數 $f'(x_0)$ 存在若且唯若兩個單側導數均存在且相等。

## 摘要

- $f'(x_0) = \lim_{h\to 0}\dfrac{f(x_0+h)-f(x_0)}{h}$；若此極限存在，則 $f$ 在 $x_0$ 處**可微**。
- $(x^n)' = nx^{n-1}$，由二項式定理推導。
- **可微蘊含連續**，但反之不然。
- $f'(x_0)$ 存在若且唯若 $f'_+(x_0)$ 和 $f'_-(x_0)$ 均存在且相等。
