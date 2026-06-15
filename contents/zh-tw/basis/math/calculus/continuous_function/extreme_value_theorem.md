---
title: 極值定理（Extreme Value Theorem）
summary: "在閉有界區間上的連續函式必能取到最大值與最小值。本章用有界性論證證明極值定理，並說明去掉任一假設——連續性、閉性或有界性——結論即可能失效。"
prerequisites:
  - basis/math/calculus/continuous_function/continuous
  - basis/math/analysis/supremum_infimum
aliases: []
tags:
  - 微積分
  - 連續性
updated: 2026-05-20
---

飛機起飛、爬升、巡航、下降、降落。高度是時間在閉區間上的連續函式。它在飛行過程中某處必須達到最高點和最低點。極值定理（extreme value theorem）告訴我們這永遠成立——不只對飛機，對任何在閉有界區間上的連續函式皆然。

## 定理陳述

**定理（極值定理，EVT）。** 若 $f : [a, b] \to \mathbb{R}$ 是[連續](../continuous/)的，則 $f$ 在 $[a, b]$ 上能取到其最大值與最小值：存在 $x_{\max}, x_{\min} \in [a, b]$ 使得

$$
f(x_{\min}) \leq f(x) \leq f(x_{\max}) \quad \text{對所有 } x \in [a, b].
$$

## 證明

證明分兩階段：先證 $f$ 有上界，再證[上確界（supremum）](../../analysis/supremum_infimum/)實際上能被取到。

### 第一階段：$f$ 有上界

反設 $f$ 在 $[a, b]$ 上無上界。則對每個 $n \in \mathbb{N}$ 存在 $x_n \in [a, b]$ 使得 $f(x_n) > n$。數列 $(x_n)$ 在有界區間 $[a, b]$ 內，故由**波爾查諾–魏爾斯特拉斯定理（Bolzano–Weierstrass theorem）**，它有一個收斂子數列 $(x_{n_k})$ 滿足 $x_{n_k} \to c \in [a, b]$。

因 $f$ 在 $c$ 處連續：

$$
\lim_{k \to \infty} f(x_{n_k}) = f(c).
$$

但 $f(x_{n_k}) > n_k \to \infty$，與收斂至有限值 $f(c)$ 矛盾。故 $f$ 有上界。

對 $-f$ 施行同樣的論證，可得 $f$ 也有下界。

### 第二階段：$f$ 取到上確界

設 $M \coloneqq \sup_{x \in [a,b]} f(x)$，由第一階段知 $M$ 有限。由[上確界的定義](../../analysis/supremum_infimum/)，對每個 $n \in \mathbb{N}$ 存在 $y_n \in [a, b]$ 使得

$$
M - \frac{1}{n} < f(y_n) \leq M.
$$

由波爾查諾–魏爾斯特拉斯定理，$(y_n)$ 有一個收斂子數列 $y_{n_k} \to x_{\max} \in [a, b]$。由連續性：

$$
f(x_{\max}) = \lim_{k \to \infty} f(y_{n_k}) = M.
$$

故 $f$ 在 $x_{\max}$ 取到其最大值。最小值的存在性由對 $-f$ 施行同樣論證可得。$\square$

## 各假設的必要性

連續性、閉性、有界性——三個假設缺一不可。去掉任何一個，結論都可能失效。

### 去掉連續性（$[0,1]$ 上的不連續函式）

定義

$$
f(x) \coloneqq \begin{cases} x & x \in (0, 1] \\ 0.5 & x = 0. \end{cases}
$$

則 $\sup_{x \in [0,1]} f(x) = 1$，但方程式 $f(x) = 1$ 在 $[0, 1]$ 中無解——上確界無法被取到。

### 去掉閉性（開區間）

函式 $f(x) = x$ 在開區間 $(0, 1)$ 上連續，但 $\sup f = 1$ 和 $\inf f = 0$ 均無法被取到——兩端點均不在定義域內。

### 去掉有界性（無界區間）

函式 $f(x) = x$ 在 $[0, \infty)$ 上連續（閉但無界），且無上界，故不存在最大值。

## $[a, b]$ 的像是閉區間

極值定理說 $f$ 取到最小值 $m$ 和最大值 $M$。結合[中間值定理](../intermediate_value_theorem/)——它保證 $f$ 在其取到的任意兩個值之間取遍每一個值——$f$ 在 $[a, b]$ 上的像恰好是閉區間 $[m, M]$。

## 摘要

- **極值定理**：在閉有界區間 $[a, b]$ 上的[連續](../continuous/)函式必能取到最大值與最小值。
- **證明思路**：接近上確界的點構成 $[a, b]$ 中的數列；波爾查諾–魏爾斯特拉斯定理抽取收斂子數列；連續性迫使其極限等於上確界。
- **三個假設均不可少**：去掉連續性、閉性或有界性，各自都有不取到極值的反例。
- **推論**：由極值定理與[中間值定理](../intermediate_value_theorem/)合用，$f([a, b])$ 恰為閉區間 $[\min f,\, \max f]$。
