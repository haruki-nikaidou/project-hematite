---
title: 微分的基本法則
summary: "從導數的定義推導線性性、乘積法則與商法則，並以此計算多項式和有理函式的導數，無需從頭回到極限定義。"
prerequisites:
  - basis/math/calculus/differential/differentiable_function
aliases: []
tags:
  - 微積分
  - 微分
updated: 2026-05-20
---

一旦你能從極限定義計算導數，目標就是避免對每個新函式重複那樣的計算。以下三條法則——**線性性（linearity）**、**乘積法則（product rule）**和**商法則（quotient rule）**——讓你對任何多項式或有理函式幾乎可以一眼看出導數。

## 線性性

**定理。** 若 $f$ 和 $g$ 在 $x$ 處可微，且 $c \in \mathbb{R}$，則

$$
(cf + g)'(x) \;=\; c\,f'(x) + g'(x).
$$

**證明。** 由定義，

$$
\lim_{h\to 0}\frac{(cf+g)(x+h)-(cf+g)(x)}{h} \;=\; \lim_{h\to 0}\left[c\cdot\frac{f(x+h)-f(x)}{h} + \frac{g(x+h)-g(x)}{h}\right].
$$

兩個差商均收斂，故極限之和等於和之極限：$c f'(x) + g'(x)$。$\square$

## 乘積法則

**定理。** 若 $f$ 和 $g$ 在 $x$ 處可微，則

$$
(fg)'(x) \;=\; f'(x)\,g(x) + f(x)\,g'(x).
$$

**證明。** 在分子中加減 $f(x)g(x+h)$：

$$
\frac{f(x+h)g(x+h) - f(x)g(x)}{h} \;=\; \frac{f(x+h)-f(x)}{h}\cdot g(x+h) \;+\; f(x)\cdot\frac{g(x+h)-g(x)}{h}.
$$

當 $h \to 0$ 時：第一項收斂到 $f'(x) \cdot g(x)$（利用 $g$ 在 $x$ 處的連續性，由可微性推出），第二項收斂到 $f(x) \cdot g'(x)$。$\square$

## 商法則

**定理。** 若 $f$ 和 $g$ 在 $x$ 處可微，且 $g(x) \neq 0$，則

$$
\left(\frac{f}{g}\right)'(x) \;=\; \frac{f'(x)\,g(x) - f(x)\,g'(x)}{g(x)^2}.
$$

**證明。** 先對 $1/g$ 推導**倒數法則（reciprocal rule）**。以 $\delta$ 取代 $h$：

$$
\frac{\tfrac{1}{g(x+\delta)}-\tfrac{1}{g(x)}}{\delta} \;=\; -\frac{g(x+\delta)-g(x)}{\delta}\cdot\frac{1}{g(x+\delta)\,g(x)}.
$$

當 $\delta \to 0$ 時，此式收斂到 $-g'(x)/g(x)^2$（因為 $g(x+\delta) \to g(x) \neq 0$）。再對 $f \cdot (1/g)$ 應用乘積法則：

$$
\left(\frac{f}{g}\right)' = f' \cdot \frac{1}{g} + f \cdot \left(-\frac{g'}{g^2}\right) = \frac{f'g - fg'}{g^2}. \;\square
$$

## 應用

### 多項式

由線性性與 $(x^n)' = nx^{n-1}$：

$$
\left(a_n x^n + \cdots + a_1 x + a_0\right)' \;=\; n a_n x^{n-1} + \cdots + a_1.
$$

### 有理函式

$$
\frac{d}{dx}\left(\frac{x^2+1}{x-1}\right) \;=\; \frac{2x(x-1)-(x^2+1)}{(x-1)^2} \;=\; \frac{x^2-2x-1}{(x-1)^2}.
$$

## 摘要

- **線性性**：$(cf+g)' = cf' + g'$。
- **乘積法則**：$(fg)' = f'g + fg'$。
- **商法則**：$(f/g)' = (f'g - fg')/g^2$。
- 三條法則均由極限定義以初等極限運算推導而得。
- 每個多項式和有理函式在其有定義之處均可微。
