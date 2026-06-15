---
title: 高階導數（Higher-Order Derivatives）
summary: "若 f 的導函式 f′ 本身也可微，則 f′ 的導數 f″ 就是二階導數——如此反覆即得 f⁽ⁿ⁾。本章節定義高階導數，介紹 n 次與無窮次可微函式的空間 Cⁿ 與 C∞，並概述乘積的萊布尼茲高階導數法則。"
prerequisites:
  - basis/math/calculus/differential/differentiable_function
  - basis/math/calculus/differential/basic_roles_of_dif
aliases: []
tags:
  - 微積分
  - 微分
updated: 2026-05-20
---

你已知道[導數](../differentiable_function/) $f'$ 衡量的是瞬時變化率。但 $f'$ 本身也是一個函式，你可以進一步問它是否也有導數。反覆套用此過程，就能得到高階導數（higher-order derivative），它們編碼了曲率、躍動量，以及泰勒多項式的係數。

## 遞歸定義

**定義。** **第 $n$ 階導數** $f^{(n)}$ 以遞歸方式定義：

$$
f^{(0)} \coloneqq f, \qquad f^{(n)} \coloneqq \bigl(f^{(n-1)}\bigr)' \quad \text{for } n \geq 1,
$$

只要鏈條中的每個導數都存在。

常見符號：

| 階數 | 撇號記法 | 萊布尼茲記法 |
|------|----------|-------------|
| 1 階 | $f'$ | $\dfrac{df}{dx}$ |
| 2 階 | $f''$ | $\dfrac{d^2f}{dx^2}$ |
| 3 階 | $f'''$ | $\dfrac{d^3f}{dx^3}$ |
| 第 $n$ 階 | $f^{(n)}$ | $\dfrac{d^nf}{dx^n}$ |

## 空間 $C^n$ 與 $C^\infty$

若 $f^{(n)}$ 在區間 $I$ 上存在且連續，則稱 $f \in C^n(I)$（讀作「$f$ 是 $C^n$」或「$f$ 是 $n$ 次連續可微的」）。空間 $C^0(I)$ 就是連續函式；$C^1(I)$ 額外要求導數連續；以此類推。

各階導數均存在的函式稱為**光滑（smooth）**函式，屬於 $C^\infty(I)$。

$$
C^\infty \;\subsetneq\; \cdots \;\subsetneq\; C^2 \;\subsetneq\; C^1 \;\subsetneq\; C^0.
$$

每個包含關係都是嚴格的：存在屬於 $C^n$ 但不屬於 $C^{n+1}$ 的函式。

**例。** $f(x) = |x|^{3}$ 在 $\mathbb{R}$ 上屬於 $C^2$（因為 $f'' = 6|x|$ 連續），但不屬於 $C^3$（因為 $f'''(0)$ 不存在）。

## 高階導數的例子

對多項式 $p(x) = a_n x^n + \cdots + a_0$：

$$
p^{(k)}(x) \;=\; \frac{n!}{(n-k)!} a_n x^{n-k} + \cdots \quad (k \leq n), \qquad p^{(k)} \equiv 0 \quad (k > n).
$$

對指數函式 $e^x$：$(e^x)^{(n)} = e^x$ 對所有 $n$ 成立。

$\sin x$ 與 $\cos x$ 的導數以週期 4 循環：

$$
(\sin x)^{(n)} = \sin\!\left(x + \tfrac{n\pi}{2}\right), \qquad (\cos x)^{(n)} = \cos\!\left(x + \tfrac{n\pi}{2}\right).
$$

## 萊布尼茲法則

[乘積法則](../basic_roles_of_dif/) $(fg)' = f'g + fg'$ 可推廣至任意階。其形式與二項式定理相互對應。

**定理（萊布尼茲法則）。** 若 $f$ 與 $g$ 均 $n$ 次可微，則

$$
(fg)^{(n)} \;=\; \sum_{k=0}^{n} \binom{n}{k} f^{(k)}\, g^{(n-k)}.
$$

**數學歸納法證明。** 基礎情形 $n = 1$ 即乘積法則。假設公式對 $n$ 成立，對兩端求導並對每一項 $f^{(k)} g^{(n-k)}$ 使用乘積法則；二項式遞推關係 $\binom{n}{k-1} + \binom{n}{k} = \binom{n+1}{k}$ 將求和重組為 $n+1$ 的公式。$\square$

**例。** $(x^2 e^x)'' = (x^2)'' e^x + 2(x^2)' e^x + x^2 e^x = 2e^x + 4xe^x + x^2 e^x = (x^2 + 4x + 2)e^x$。

## 摘要

- **第 $n$ 階導數** $f^{(n)}$ 以遞歸方式定義為 $f^{(n-1)}$ 的導數。
- $f \in C^n$ 表示 $f^{(n)}$ 存在且連續；$f \in C^\infty$ 表示各階導數均存在。
- 多項式最終微分至零；$e^x$、$\sin x$、$\cos x$ 屬於 $C^\infty$，且第 $n$ 階導數有封閉形式。
- **萊布尼茲法則**：$(fg)^{(n)} = \sum_{k=0}^n \binom{n}{k} f^{(k)} g^{(n-k)}$，是二項式定理的直接類比。
