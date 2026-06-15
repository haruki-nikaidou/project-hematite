---
title: 極限的局部性質
summary: "極限在算術與序關係下表現良好：若 f 與 g 在某點各有極限，則 f±g、fg 及 f/g（分母非零時）也有極限，且不等式可以過渡到極限。本章證明算術法則、序保持定理、夾擠定理，以及局部保號性。"
prerequisites:
  - basis/math/calculus/continuous_function/limit_of_function
aliases: []
tags:
  - 微積分
  - 極限
updated: 2026-05-20
---

知道個別極限存在只是起點。實際計算中，你往往要將複雜的函式由簡單的函式透過加法、乘法、除法等方式組合而來。本章的定理保證極限尊重所有這些運算，讓你可以逐段計算極限，而不必每次都回到 ε–δ。

在本章中，$f$ 與 $g$ 是定義在 $a$ 附近（但不一定在 $a$ 本身）的集合 $D$ 上的實值函式，且 $\lim_{x \to a} f(x) = L$，$\lim_{x \to a} g(x) = M$。

## 極限的算術法則

**定理。** 在上述假設下：

1. $\displaystyle\lim_{x \to a}(f \pm g)(x) = L \pm M$
2. $\displaystyle\lim_{x \to a}(f \cdot g)(x) = L \cdot M$
3. $\displaystyle\lim_{x \to a}\frac{f(x)}{g(x)} = \frac{L}{M}$，前提是 $M \neq 0$
4. $\displaystyle\lim_{x \to a}(c \cdot f)(x) = c \cdot L$，其中 $c \in \mathbb{R}$ 為任意常數

*(1) 的證明。* 給定 $\varepsilon > 0$，取 $\delta_1$ 使得對 $0 < |x - a| < \delta_1$ 有 $|f(x) - L| < \varepsilon/2$，取 $\delta_2$ 使得對 $0 < |x - a| < \delta_2$ 有 $|g(x) - M| < \varepsilon/2$。則對 $0 < |x - a| < \min(\delta_1, \delta_2)$：

$$
|(f \pm g)(x) - (L \pm M)| \leq |f(x) - L| + |g(x) - M| < \frac{\varepsilon}{2} + \frac{\varepsilon}{2} = \varepsilon. \quad\square
$$

*(2) 的證明。* 寫

$$
f(x) g(x) - LM = f(x)(g(x) - M) + M(f(x) - L).
$$

當 $x$ 充分靠近 $a$ 時，$f$ 有界：$|f(x)| \leq |L| + 1$。因 $g(x) \to M$ 且 $f(x) \to L$，兩項均趨向零。$\square$

商的法則 (3) 由 (2) 和 $1/g(x) \to 1/M$（$M \neq 0$ 時）推得，後者由標準 ε–δ 論證、利用 $|g(x)| > |M|/2$ 在 $a$ 附近成立加以證明。

## 夾擠定理

當無法直接計算極限時，將函式夾在兩個較簡單的界之間往往奏效。

**定理（夾擠定理 / Squeeze theorem）。** 設對 $a$ 附近（$x \neq a$）的所有 $x \in D$ 都有 $h(x) \leq f(x) \leq k(x)$，且

$$
\lim_{x \to a} h(x) = \lim_{x \to a} k(x) = L.
$$

則 $\lim_{x \to a} f(x) = L$。

*證明。* 給定 $\varepsilon > 0$，取 $\delta$ 足夠小，使得對 $0 < |x - a| < \delta$ 同時有 $|h(x) - L| < \varepsilon$ 和 $|k(x) - L| < \varepsilon$。則

$$
L - \varepsilon < h(x) \leq f(x) \leq k(x) < L + \varepsilon，
$$

故 $|f(x) - L| < \varepsilon$。$\square$

**例。** 對任意滿足 $|b(x)| \leq 1$ 的函式 $b$，

$$
\lim_{x \to 0} x \cdot b(x) = 0，
$$

因為 $-|x| \leq x \cdot b(x) \leq |x|$ 且 $\lim_{x \to 0} |x| = 0$。

$\lim_{x \to 0} x \sin(1/x) = 0$ 即由此建立：$\sin(1/x)$ 在 $0$ 附近劇烈振盪，但始終以 $1$ 為界，故 $x$ 的因子迫使乘積趨向 $0$。

## 序保持性

**定理。** 若對 $a$ 附近（$x \neq a$）的所有 $x \in D$ 都有 $f(x) \leq g(x)$，則 $L \leq M$。

*證明。* 反設 $L > M$。取 $\varepsilon = (L - M)/2 > 0$。當 $x$ 足夠靠近 $a$ 時，$f(x) > L - \varepsilon = (L + M)/2$ 且 $g(x) < M + \varepsilon = (L + M)/2$，得 $f(x) > g(x)$——矛盾。$\square$

注意：嚴格不等式 $f(x) < g(x)$ **不能**保證極限處有嚴格不等式 $L < M$。例如，$f(x) = 0 < x^2 = g(x)$（$x \neq 0$），但兩者在 $x \to 0$ 時均趨向 $0$。

## 局部保號性

**定理。** 若 $L > 0$，則對所有充分靠近 $a$（且 $x \neq a$）的 $x$，有 $f(x) > 0$。對稱地，若 $L < 0$ 則在 $a$ 附近有 $f(x) < 0$。

*證明。* 取 $\varepsilon = L/2 > 0$。選 $\delta$ 使得對 $0 < |x - a| < \delta$ 有 $|f(x) - L| < L/2$。則 $f(x) > L - L/2 = L/2 > 0$。$\square$

這個定理在分析符號變化，以及在證明連續函式的商在分母非零處也連續時，被反覆用到。

## 摘要

- **極限算術**：極限尊重 $+$、$-$、$\times$、$\div$（分母極限非零時）及純量乘法。
- **夾擠定理**：若在 $a$ 附近有 $h \leq f \leq k$，且 $h, k$ 有共同的極限 $L$，則 $f \to L$。
- **序保持性**：在 $a$ 附近 $f(x) \leq g(x)$ 蘊含 $\lim f \leq \lim g$；各點的嚴格不等式不蘊含極限處的嚴格不等式。
- **局部保號性**：正的極限值蘊含函式在 $a$ 的某個去心鄰域內為正。
