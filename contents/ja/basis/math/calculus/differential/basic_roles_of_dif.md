---
title: 微分の基本法則
summary: "微分の定義から線型性・積の微分・商の微分を導出し、それらを使って第一原理に戻ることなく多項式と有理関数の微分を計算する。"
prerequisites:
  - basis/math/calculus/differential/differentiable_function
aliases: []
tags:
  - Calculus
  - Differentiation
updated: 2026-05-20
---

極限の定義から微分係数を計算できるようになったら、次の目標はあらゆる新しい関数に対してその計算を繰り返すことを避けることだ。以下の3つの法則——**線型性**、**積の微分**、**商の微分**——によって、多項式や有理関数はすべて見た目で微分できるようになる。

## 線型性

**定理。** $f$ と $g$ が $x$ で微分可能で $c \in \mathbb{R}$ のとき、

$$
(cf + g)'(x) \;=\; c\,f'(x) + g'(x).
$$

**証明。** 定義より

$$
\lim_{h\to 0}\frac{(cf+g)(x+h)-(cf+g)(x)}{h} \;=\; \lim_{h\to 0}\left[c\cdot\frac{f(x+h)-f(x)}{h} + \frac{g(x+h)-g(x)}{h}\right].
$$

両方の差分商は収束するので、極限の和は和の極限に等しく $c f'(x) + g'(x)$ が得られる。$\square$

## 積の微分法則（ライプニッツ則）

**定理。** $f$ と $g$ が $x$ で微分可能のとき、

$$
(fg)'(x) \;=\; f'(x)\,g(x) + f(x)\,g'(x).
$$

**証明。** 分子に $f(x)g(x+h)$ を加減する：

$$
\frac{f(x+h)g(x+h) - f(x)g(x)}{h} \;=\; \frac{f(x+h)-f(x)}{h}\cdot g(x+h) \;+\; f(x)\cdot\frac{g(x+h)-g(x)}{h}.
$$

$h \to 0$ のとき：第一項は $f'(x) \cdot g(x)$ に収束し（微分可能性から連続性が従うので $g(x+h) \to g(x)$）、第二項は $f(x) \cdot g'(x)$ に収束する。$\square$

## 商の微分法則

**定理。** $f$ と $g$ が $x$ で微分可能で $g(x) \neq 0$ のとき、

$$
\left(\frac{f}{g}\right)'(x) \;=\; \frac{f'(x)\,g(x) - f(x)\,g'(x)}{g(x)^2}.
$$

**証明。** まず $1/g$ の**逆数の微分則**を導く。$\delta$ を使って

$$
\frac{\tfrac{1}{g(x+\delta)}-\tfrac{1}{g(x)}}{\delta} \;=\; -\frac{g(x+\delta)-g(x)}{\delta}\cdot\frac{1}{g(x+\delta)\,g(x)}.
$$

$\delta \to 0$ でこれは $-g'(x)/g(x)^2$ に収束する（$g(x+\delta) \to g(x) \neq 0$ に注意）。次に $f \cdot (1/g)$ に積の微分則を適用する：

$$
\left(\frac{f}{g}\right)' = f' \cdot \frac{1}{g} + f \cdot \left(-\frac{g'}{g^2}\right) = \frac{f'g - fg'}{g^2}. \;\square
$$

## 応用

### 多項式

線型性と $(x^n)' = nx^{n-1}$ より：

$$
\left(a_n x^n + \cdots + a_1 x + a_0\right)' \;=\; n a_n x^{n-1} + \cdots + a_1.
$$

### 有理関数

$$
\frac{d}{dx}\left(\frac{x^2+1}{x-1}\right) \;=\; \frac{2x(x-1)-(x^2+1)}{(x-1)^2} \;=\; \frac{x^2-2x-1}{(x-1)^2}.
$$

## まとめ

- **線型性**：$(cf+g)' = cf' + g'$。
- **積の微分**：$(fg)' = f'g + fg'$。
- **商の微分**：$(f/g)' = (f'g - fg')/g^2$。
- 3つの法則はすべて、初等的な極限の演算を通じて微分の定義から従う。
- 多項式と有理関数はすべて定義域で微分可能だ。
