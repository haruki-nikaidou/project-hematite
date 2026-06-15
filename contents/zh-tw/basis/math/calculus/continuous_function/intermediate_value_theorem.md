---
title: 中間值定理（Intermediate Value Theorem）
summary: "若 f 在 [a, b] 上連續，且 y 介於 f(a) 與 f(b) 之間，則存在 c ∈ [a, b] 使得 f(c) = y。本章用 ℝ 的完備性證明此定理，並應用於求根與存在性證明。"
prerequisites:
  - basis/math/calculus/continuous_function/continuous
aliases: []
tags:
  - 微積分
  - 連續性
updated: 2026-05-20
---

若溫度感測器在黎明讀到 10°C、中午讀到 24°C，則在這之間某一時刻它必然讀過恰好 17°C——前提是溫度連續變化。中間值定理（intermediate value theorem）將這個日常觀察形式化，並將其化為一個無需明確計算即可證明根與不動點存在性的工具。

## 定理陳述

**定理（中間值定理，IVT）。** 設 $f : [a, b] \to \mathbb{R}$ 是[連續](../continuous/)的。若 $y$ 是嚴格介於 $f(a)$ 與 $f(b)$ 之間的任意值，則存在 $c \in (a, b)$ 使得 $f(c) = y$。

一個在實際應用中常用的等價表述：若 $f(a)$ 與 $f(b)$ **異號**（即 $f(a) \cdot f(b) < 0$），則 $f$ 在 $(a, b)$ 內有根。

## 用二分法證明

不失一般性，設 $f(a) < y < f(b)$。

以**二分法（bisection）**定義一列嵌套區間 $[a_n, b_n]$，從 $[a_0, b_0] = [a, b]$ 開始：

- 設 $m_n \coloneqq \dfrac{a_n + b_n}{2}$ 為中點。
- 若 $f(m_n) < y$，令 $[a_{n+1}, b_{n+1}] \coloneqq [m_n, b_n]$。
- 若 $f(m_n) \geq y$，令 $[a_{n+1}, b_{n+1}] \coloneqq [a_n, m_n]$。

由構造，每一步均有 $f(a_n) < y \leq f(b_n)$，且區間長度滿足

$$
b_n - a_n = \frac{b - a}{2^n} \;\to\; 0.
$$

$\mathbb{R}$ 的**完備性（completeness of $\mathbb{R}$）**（嵌套區間性質）保證唯一的點 $c \in \bigcap_{n=0}^{\infty} [a_n, b_n]$ 的存在。

由於 $a_n \leq c \leq b_n$ 且 $b_n - a_n \to 0$，有 $a_n \to c$ 且 $b_n \to c$。$f$ 的連續性給出 $f(a_n) \to f(c)$ 和 $f(b_n) \to f(c)$。因 $f(a_n) < y$ 對所有 $n$ 成立，取極限得 $f(c) \leq y$。因 $f(b_n) \geq y$ 對所有 $n$ 成立，取極限得 $f(c) \geq y$。故 $f(c) = y$。$\square$

## 應用

### 多項式求根

每個奇次實係數多項式至少有一個實根。$(2k+1)$ 次多項式 $p$ 滿足：$x \to +\infty$ 時 $p(x) \to +\infty$，$x \to -\infty$ 時 $p(x) \to -\infty$，故對足夠大的 $R > 0$，有 $p(-R) < 0 < p(R)$。中間值定理給出 $(-R, R)$ 內的一個根。

**例。** 多項式 $p(x) = x^3 - 2$ 連續，且 $p(0) = -2 < 0$、$p(2) = 6 > 0$。由中間值定理，存在 $c \in (0, 2)$ 使得 $c^3 = 2$——這就是 $\sqrt[3]{2}$ 存在性的證明。

### 不動點的存在性

**推論（一維 Brouwer 不動點定理）。** 每個連續的 $f : [0, 1] \to [0, 1]$ 都有**不動點（fixed point）**：某個 $c \in [0, 1]$ 使得 $f(c) = c$。

*證明。* 定義 $g(x) \coloneqq f(x) - x$。因 $f$ 將 $[0,1]$ 映入 $[0,1]$，有 $g(0) = f(0) \geq 0$ 且 $g(1) = f(1) - 1 \leq 0$。若其中一個為零，則 $0$ 或 $1$ 即為不動點。否則 $g(0) > 0 > g(1)$，中間值定理給出 $c \in (0, 1)$ 使得 $g(c) = 0$，即 $f(c) = c$。$\square$

### 二分演算法

此證明具有建構性：每一步將包含穿越點的區間減半。$n$ 步後，根的位置精確到 $(b - a)/2^n$ 以內。這就是**二分法（bisection method）**——數值計算中最可靠的求根演算法之一，具有保證的線性收斂性。

```python
def bisect(f, a, b, tol=1e-9):
    assert f(a) * f(b) < 0, "f must have opposite signs at a and b"
    while (b - a) / 2 > tol:
        m = (a + b) / 2
        if f(m) == 0:
            return m
        elif f(a) * f(m) < 0:
            b = m
        else:
            a = m
    return (a + b) / 2
```

## 摘要

- **中間值定理**：在 $[a, b]$ 上[連續](../continuous/)的 $f$ 取遍 $f(a)$ 與 $f(b)$ 之間的每一個值。
- **證明**：在每一步對區間進行二分，維持端點異號；$\mathbb{R}$ 的完備性確定穿越點，連續性迫使其等於 $y$。
- **求根**：每個奇次多項式有實根；$\sqrt[3]{2}$ 等特定根的存在性由對 $x^3 - 2$ 應用中間值定理得出。
- **不動點**：$[0, 1]$ 上每個連續的自映射都有不動點——對 $f(x) - x$ 應用中間值定理即得。
- **二分演算法**：此證明是演算法性質的——反覆減半可在 $O(\log(1/\varepsilon))$ 步內將任意根定位至精度 $\varepsilon$。
