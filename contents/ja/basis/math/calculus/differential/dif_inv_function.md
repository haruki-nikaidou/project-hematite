---
title: 逆関数の微分
summary: "$f$ が微分可能かつ狭義単調で $f'(x) \\neq 0$ ならば、その逆関数は微分可能で $(f^{-1})'(y) = 1 / f'(f^{-1}(y))$ が成り立つ。このチェックポイントでは逆関数の微分公式を証明し、$\\ln$ と逆三角関数の微分を計算するためにそれを用いる。"
prerequisites:
  - basis/math/calculus/differential/chain_rule
aliases: []
tags:
  - Calculus
  - Differentiation
updated: 2026-05-20
---

$f$ の微分の仕方を知っているなら、その逆関数 $f^{-1}$ もすぐに微分できるか？答えは $f'$ がゼロでない限りイエスだ。これにより $\ln x$, $\arcsin x$, $\arctan x$ などすべての逆関数の微分係数を効率的に求める近道が得られる。

## 逆関数の微分公式

**定理。** $f$ が開区間 $I$ 上で連続かつ狭義単調で、$I$ 上で微分可能、$f'(x) \neq 0$（$\forall x \in I$）とする。このとき $f^{-1}$ は $f(I)$ 上で微分可能で

$$
(f^{-1})'(y) \;=\; \frac{1}{f'(f^{-1}(y))}. \tag{1}
$$

**証明。** $y_0 = f(x_0) \in f(I)$ を固定し、$y = f(x)$（$y \neq y_0$）とおく。このとき $x \neq x_0$ であり、

$$
\frac{f^{-1}(y) - f^{-1}(y_0)}{y - y_0} \;=\; \frac{x - x_0}{f(x) - f(x_0)}.
$$

$y \to y_0$ のとき、$f^{-1}$ の連続性（$f$ の狭義単調性と連続性から従う）より $x = f^{-1}(y) \to x_0$。$f'(x_0) \neq 0$ なので

$$
\lim_{y \to y_0}\frac{x - x_0}{f(x) - f(x_0)} \;=\; \frac{1}{f'(x_0)} \;=\; \frac{1}{f'(f^{-1}(y_0))}. \;\square
$$

ライプニッツ記法：$y = f(x)$ のとき $\dfrac{dx}{dy} = \dfrac{1}{\,\dfrac{dy}{dx}\,}$。

## $\ln x$ の微分係数

$f(x) = e^x$ として $f^{-1}(y) = \ln y$ とおく。$f'(x) = e^x \neq 0$ なので公式 $(1)$ より

$$
(\ln y)' \;=\; \frac{1}{e^{\ln y}} \;=\; \frac{1}{y}.
$$

すなわち $\dfrac{d}{dx}(\ln x) = \dfrac{1}{x}$（$x > 0$）。

## 逆三角関数の微分係数

### アークサイン

$f(x) = \sin x$ を $[-\pi/2, \pi/2]$ に制限すると $f^{-1}(y) = \arcsin y$（$y \in (-1,1)$）。ここで $f'(x) = \cos x > 0$。$x = \arcsin y$ のとき $\cos x = \sqrt{1-\sin^2 x} = \sqrt{1-y^2}$ なので

$$
(\arcsin y)' \;=\; \frac{1}{\sqrt{1-y^2}}.
$$

### アークコサイン

$f(x) = \cos x$ を $[0,\pi]$ に制限すると $f'(x) = -\sin x < 0$（$(0,\pi)$ 上）。$x = \arccos y$ のとき $\sin x = \sqrt{1-y^2}$ なので

$$
(\arccos y)' \;=\; \frac{-1}{\sqrt{1-y^2}}.
$$

$(\arcsin x)' + (\arccos x)' = 0$ に注意：これは恒等式 $\arcsin x + \arccos x = \pi/2$（定数）と整合する。

### アークタンジェント

$f(x) = \tan x$ を $(-\pi/2, \pi/2)$ に制限する。$y = \tan x$ のとき $f'(x) = 1 + \tan^2 x = 1 + y^2$ なので

$$
(\arctan y)' \;=\; \frac{1}{1+y^2}.
$$

## まとめ

- **逆関数の微分則**：$f$ が狭義単調かつ $f' \neq 0$ のとき $(f^{-1})'(y) = \dfrac{1}{f'(f^{-1}(y))}$。
- $(\ln x)' = 1/x$：$(e^x)' = e^x$ の逆関数として導く。
- $(\arcsin x)' = 1/\sqrt{1-x^2}$、$\;(\arccos x)' = -1/\sqrt{1-x^2}$、$\;(\arctan x)' = 1/(1+x^2)$。
