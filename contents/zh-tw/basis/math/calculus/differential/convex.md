---
title: 凸函式
summary: "區間上的函式為凸函式（convex function），若每條弦均位於圖形上方：對區間中所有 x、y 及 λ ∈ [0, 1]，f(λx + (1−λ)y) ≤ λf(x) + (1−λ)f(y)。本 checkpoint 形式化凸性的定義，區分嚴格凸與非嚴格凸，並梳理基本例子。"
prerequisites:
  - basis/math/analysis/real_number_a
aliases: []
tags:
  - 微積分
  - 凸性
updated: 2026-05-20
---

分析與概率中的許多不等式都歸結為同一個幾何觀察：對「碗形」函式，圖形上任意兩點之間的直線段永遠不會低於圖形本身。將這一觀察形式化，就得到了凸函式（convex function）的概念。

## 弦條件

設 $I \subseteq \mathbb{R}$ 為一個區間，$f : I \to \mathbb{R}$。

**定義。** $f$ 在 $I$ 上為**凸函式**，若對所有 $x, y \in I$ 及所有 $\lambda \in [0, 1]$，

$$
f\!\left(\lambda x + (1-\lambda)y\right) \;\leq\; \lambda f(x) + (1-\lambda)f(y). \tag{1}
$$

點 $\lambda x + (1-\lambda)y$ 是 $x$ 與 $y$ 的**凸組合（convex combination）**：當 $\lambda$ 在 $[0,1]$ 上變化時，它描繪從 $y$ 到 $x$ 的線段。右側 $\lambda f(x) + (1-\lambda)f(y)$ 是從 $(x, f(x))$ 到 $(y, f(y))$ 的**弦（chord）**上對應的點。

簡而言之：$f$ 的圖形位於每條弦的下方或弦上。

## 嚴格凸性

**定義。** $f$ 在 $I$ 上為**嚴格凸函式**，若在 $x \neq y$ 且 $\lambda \in (0, 1)$ 時，$(1)$ 的不等式嚴格成立：

$$
f\!\left(\lambda x + (1-\lambda)y\right) \;<\; \lambda f(x) + (1-\lambda)f(y).
$$

嚴格凸性排除了圖形上任何與弦重合的平坦部分。每個嚴格凸函式都是凸函式，但反之不然（恆等函式 $f(x) = x$ 是凸函式但非嚴格凸）。

## 凹性

若 $-f$ 是（嚴格）凸函式，則 $f$ 是**（嚴格）凹函式（concave function）**，即 $(1)$ 中的不等號反向。凹函式是「帽形」的：每條弦位於圖形下方或圖形上。

## 例子

| 函式 | 定義域 | 凸函式？ | 嚴格凸？ |
|------|--------|----------|----------|
| $x^2$ | $\mathbb{R}$ | 是 | 是 |
| $e^x$ | $\mathbb{R}$ | 是 | 是 |
| $\|x\|$ | $\mathbb{R}$ | 是 | 否（在從 $-a$ 到 $a$ 的弦上 $x = 0$ 處平坦） |
| $\ln x$ | $(0, \infty)$ | 否（凹函式） | — |
| $-x^2$ | $\mathbb{R}$ | 否（凹函式） | — |
| $c$（常數） | $\mathbb{R}$ | 是 | 否 |

**驗證 $x^2$。** 對 $\lambda \in [0,1]$ 和 $x, y \in \mathbb{R}$：

$$
(\lambda x + (1-\lambda)y)^2 \;\leq\; \lambda x^2 + (1-\lambda)y^2
$$

等價於 $\lambda(1-\lambda)(x-y)^2 \geq 0$，對所有 $\lambda \in [0,1]$ 均成立，且在 $x \neq y$ 且 $\lambda \in (0,1)$ 時嚴格成立。故 $x^2$ 是嚴格凸函式。

## 等價的兩點形式

對 $(1)$ 兩側進行整理，凸性也可以表述為：對 $I$ 中任意三點 $x < z < y$，

$$
\frac{f(z) - f(x)}{z - x} \;\leq\; \frac{f(y) - f(x)}{y - x} \;\leq\; \frac{f(y) - f(z)}{y - z}.
$$

每個分式都是割線斜率，因此這說明：從固定左端點出發，隨著右端點向右移動，割線斜率不遞減。這一單調斜率性質與 $(1)$ 完全等價，通常也是從圖形辨認凸性最快捷的方式。

## 摘要

- $f$ 在 $I$ 上為**凸函式**，若從 $(x, f(x))$ 到 $(y, f(y))$ 的每條弦均位於圖形上方或圖形上：對所有 $x, y \in I$、$\lambda \in [0,1]$，$f(\lambda x + (1-\lambda)y) \leq \lambda f(x) + (1-\lambda)f(y)$。
- **嚴格凸性**要求在 $x \neq y$ 且 $\lambda \in (0,1)$ 時不等式嚴格成立。
- **凹性**反轉不等號；$f$ 為凹函式若且唯若 $-f$ 為凸函式。
- 標準例子：$x^2$ 和 $e^x$ 是嚴格凸函式；$\ln x$ 是嚴格凹函式。
