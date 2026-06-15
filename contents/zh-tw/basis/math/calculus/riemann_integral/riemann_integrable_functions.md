---
title: 黎曼可積函數的類別
summary: "除連續函數外，閉區間上有界函數中還有兩大類是 Riemann 可積的：單調函數，以及只有有限個不連續點的函數（更一般地，不連續點集測度為零——Lebesgue 判則）。本節證明單調函數和分段連續函數的可積性，陳述 Lebesgue 以不連續點集為基礎的刻畫，並舉出一個有界但不可積的函數（Dirichlet 函數）作為反例。"
prerequisites:
  - basis/math/calculus/riemann_integral/def
aliases: []
tags:
  - 微積分
  - 積分
updated: 2026-05-22
---

[Riemann 積分的定義](../def/)要求對某個分割 $P$ 滿足 $U(f,P) - L(f,P) < \varepsilon$。連續函數憑藉一致連續性通過這個測試。但連續性遠非必要條件——許多有跳躍或無窮多次振盪的函數仍然可積。本節找出連續函數之外最重要的兩類，並指出一個簡單的*不可積*函數。

## 回顧：Darboux 判則

$f: [a,b] \to \mathbb{R}$ 有界是 Riemann 可積的，當且僅當對任意 $\varepsilon > 0$，存在分割 $P$ 使得

$$
U(f, P) - L(f, P) < \varepsilon.
$$

關鍵量是每個子區間上的**振盪**（oscillation）：$\omega_i \coloneqq M_i - m_i \ge 0$，故 $U - L = \sum \omega_i \Delta x_i$。要使 $U - L$ 小，需要讓振盪或子區間寬度變小。

## 單調函數可積

**定理。** 若 $f: [a,b] \to \mathbb{R}$ 單調（遞增或遞減），則 $f$ 是 Riemann 可積的。

**證明（$f$ 遞增的情形）。** 在任意子區間 $[x_{i-1}, x_i]$ 上，上確界和下確界就是端點值：

$$
M_i = f(x_i), \qquad m_i = f(x_{i-1}), \qquad \omega_i = f(x_i) - f(x_{i-1}).
$$

對均勻分割 $P_n$（$\Delta x_i = (b-a)/n$）：

$$
U(f, P_n) - L(f, P_n) = \frac{b-a}{n} \sum_{i=1}^n \bigl(f(x_i) - f(x_{i-1})\bigr) = \frac{(b-a)(f(b) - f(a))}{n}.
$$

這是一個望遠鏡求和，化為單一因子。只要取 $n > (b-a)(f(b)-f(a))/\varepsilon$，其值即小於 $\varepsilon$。$\square$

這個界不依賴於 $f$ 的單調*方式*——即使有無窮多個跳躍間斷點也無妨——只依賴於全變差 $f(b) - f(a)$。

## 分段連續函數可積

若存在有限個點 $a = c_0 < c_1 < \cdots < c_k = b$ 使得 $f$ 在每個開區間 $(c_{j-1}, c_j)$ 上連續，且在每個 $c_j$ 處有有限的單側極限，則稱 $f$ 在 $[a,b]$ 上**分段連續**。

**定理。** $[a,b]$ 上每個有界的分段連續函數均 Riemann 可積。

**證明概要。** 將每個不連續點 $c_j$ 納入分割中。在不包含 $c_j$ 的子區間上，$f$ 連續，細化分割可使振盪任意小。在每個 $c_j$ 附近，用寬度為 $\delta$ 的小區間將其包圍；這些區間對 $U - L$ 的貢獻至多為 $2\|f\|_\infty \cdot k\delta$，當 $\delta \to 0$ 時趨於零。組合即得 Darboux 判則。$\square$

## Dirichlet 函數不可積

定義 **Dirichlet 函數**（Dirichlet function）：

$$
D(x) \coloneqq \begin{cases} 1 & x \in \mathbb{Q}, \\ 0 & x \notin \mathbb{Q}. \end{cases}
$$

$D$ 在 $[0,1]$ 上有界，但它不是 Riemann 可積的。在*每個*子區間 $[x_{i-1}, x_i]$ 上，有理數和無理數都稠密，故對任意分割 $P$ 的每個 $i$ 均有 $M_i = 1$，$m_i = 0$。因此

$$
U(D, P) = \sum_i 1 \cdot \Delta x_i = 1, \qquad L(D, P) = \sum_i 0 \cdot \Delta x_i = 0,
$$

對*每一個*分割均如此。上積分和下積分分別為 $1$ 和 $0$——永遠不一致。故 $D$ 不是 Riemann 可積的。

## Lebesgue 判則

Riemann 可積函數的精確刻畫使用**測度零集（set of measure zero）**的概念：集合 $E \subseteq [a,b]$ 具有**測度零（measure zero）**，若對任意 $\varepsilon > 0$，$E$ 能被可數個總長度小於 $\varepsilon$ 的區間覆蓋。

**Lebesgue 定理。** 有界函數 $f: [a,b] \to \mathbb{R}$ 是 Riemann 可積的，當且僅當其不連續點集的測度為零。

證明超出目前先修範圍，但此命題統一了以上所有例子：
- 連續函數：無不連續點，測度平凡為零。
- 單調函數：至多可數個跳躍不連續點，故測度為零。
- 分段連續函數：有限個不連續點，測度為零。
- Dirichlet 函數：處處不連續，不連續點集為 $[0,1]$，測度為 $1 \neq 0$。

## 摘要

- **Darboux 判則**：$f$ 可積當且僅當振盪 $\omega_i = M_i - m_i$ 可以被一致地壓小。
- **單調函數**可積：望遠鏡估計 $(b-a)(f(b)-f(a))/n \to 0$，無論 $f$ 有多少跳躍都成立。
- **分段連續函數**可積：將不連續點隔離在小區間內；連續性處理其餘部分。
- **Dirichlet 函數** $D = \mathbf{1}_\mathbb{Q}$ *不可積*：上和恆為 $1$，下和恆為 $0$。
- **Lebesgue 判則**：有界函數是 Riemann 可積的，當且僅當其不連續點集測度為零。
