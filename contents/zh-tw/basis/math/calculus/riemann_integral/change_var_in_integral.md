---
title: 積分換元法
summary: "若 φ 在 [α, β] 上連續可微且 φ([α, β]) ⊆ [a, b]，f 在 [a, b] 上連續，則 ∫_α^β f(φ(t)) φ'(t) dt = ∫_{φ(α)}^{φ(β)} f(x) dx。本章由連鎖律與牛頓–萊布尼茲公式推導換元積分法（substitution rule），介紹定積分形式（直接變換積分限）與不定積分形式 ∫ f(φ(t)) φ'(t) dt = ∫ f(x) dx，並演示標準換元模式——線性、三角與反向換元。"
prerequisites:
  - basis/math/calculus/riemann_integral/newton_leibniz_formula
  - basis/math/calculus/differential/chain_rule
aliases: []
tags:
  - 微積分
  - 積分
updated: 2026-05-22
---

假設你想計算 $\int_0^1 2x(x^2+1)^3\,dx$。展開 $(x^2+1)^3$ 再逐項積分雖然可行，卻十分繁瑣。關鍵觀察是：$2x$ 恰好是 $x^2+1$ 的導數，因此被積函數具有 $f(\varphi(t))\,\varphi'(t)$ 的形式，其中 $\varphi(t) = t^2 + 1$，$f(x) = x^3$。**換元積分法（substitution rule）**（又稱**變數變換**）說你可以替換積分變數，得到 $\int_1^2 x^3\,dx$，計算立即變得簡單。本章將這一操作精確化並給出證明。

## 正式敘述

設 $\varphi: [\alpha, \beta] \to \mathbb{R}$ 為連續可微函數（即 $\varphi \in C^1[\alpha,\beta]$），且 $\varphi([\alpha,\beta]) \subseteq [a,b]$。設 $f: [a,b] \to \mathbb{R}$ 為連續函數。則

$$
\int_\alpha^\beta f(\varphi(t))\,\varphi'(t)\,dt = \int_{\varphi(\alpha)}^{\varphi(\beta)} f(x)\,dx.
$$

注意右端的積分限是 $\varphi(\alpha)$ 與 $\varphi(\beta)$，不一定是 $a$ 與 $b$；且 $\varphi$ 不必是單射。唯一的條件是：$\varphi$ 將 $[\alpha, \beta]$ 映入 $[a, b]$，$\varphi$ 屬於 $C^1$，且 $f$ 為連續函數。

## 由連鎖律給出的證明

由於 $f$ 在 $[a, b]$ 上連續，根據[牛頓–萊布尼茲公式](../newton_leibniz_formula/)，$f$ 有原函數 $F$ 滿足 $F'(x) = f(x)$（對所有 $x \in [a, b]$）。

考慮複合函數 $H(t) \coloneqq F(\varphi(t))$。由[連鎖律](../../differential/chain_rule/)，

$$
H'(t) = F'(\varphi(t))\,\varphi'(t) = f(\varphi(t))\,\varphi'(t).
$$

由於 $\varphi$ 屬於 $C^1$，$f$ 為連續函數，積 $f(\varphi(t))\,\varphi'(t)$ 在 $[\alpha, \beta]$ 上連續，故 $H$ 是 $f(\varphi(t))\,\varphi'(t)$ 在 $[\alpha, \beta]$ 上的原函數。對左端應用牛頓–萊布尼茲公式：

$$
\int_\alpha^\beta f(\varphi(t))\,\varphi'(t)\,dt = H(\beta) - H(\alpha) = F(\varphi(\beta)) - F(\varphi(\alpha)).
$$

對右端應用牛頓–萊布尼茲公式：

$$
\int_{\varphi(\alpha)}^{\varphi(\beta)} f(x)\,dx = F(\varphi(\beta)) - F(\varphi(\alpha)).
$$

兩端相等。$\square$

一旦有了牛頓–萊布尼茲公式和連鎖律，這個證明出奇地簡短：換元積分法的全部內容不過是對含原函數的複合函數應用連鎖律。

## 不定積分形式與「回代」步驟

對不定積分，換元積分法取如下形式：

$$
\int f(\varphi(t))\,\varphi'(t)\,dt = \int f(x)\,dx\bigg|_{x = \varphi(t)} = F(\varphi(t)) + C,
$$

其中 $F$ 是 $f$ 的原函數。實際操作中，令 $x = \varphi(t)$、$dx = \varphi'(t)\,dt$，在新變數下計算 $\int f(x)\,dx$ 得到 $F(x) + C$，再將 $x = \varphi(t)$ **回代**，以原始變數 $t$ 表示答案。

對定積分則無需回代，因為積分限已直接變換：$t = \alpha$ 對應下限 $x = \varphi(\alpha)$，$t = \beta$ 對應上限 $x = \varphi(\beta)$。

## 換元模式

### 線性換元

對涉及 $ax + b$ 的積分，令 $x = \varphi(t) = at + b$，則 $\varphi'(t) = a$，$dx = a\,dt$。由此得

$$
\int f(ax + b)\,dx = \frac{1}{a}\int f(u)\,du\bigg|_{u = ax+b}.
$$

例如，$\int e^{2x+3}\,dx = \dfrac{1}{2}e^{2x+3} + C$。

### 三角換元

當被積函數含 $\sqrt{a^2 - x^2}$ 時，令 $x = a\sin\theta$（$\theta \in [-\pi/2, \pi/2]$）。則

$$
\sqrt{a^2 - x^2} = \sqrt{a^2 - a^2\sin^2\theta} = a\cos\theta \quad (\text{因為 } \cos\theta \geq 0),
$$

且 $dx = a\cos\theta\,d\theta$。根號得以完全消除。

類似地，對 $\sqrt{a^2 + x^2}$ 使用 $x = a\tan\theta$，對 $\sqrt{x^2 - a^2}$ 使用 $x = a/\cos\theta = a\sec\theta$。

### 反向換元（$t$ 換元）

有時更自然的做法是令 $x = \varphi(t)$ 為新變數 $t$ 的顯函數——例如為了有理化某個表達式或處理有理被積函數。只要 $\varphi$ 屬於 $C^1$ 且值域條件滿足，同一公式便適用，只是兩端角色互換：在 $t$ 下計算積分，必要時回代 $t = \varphi^{-1}(x)$。

## 計算範例

### 範例 1：$\int_0^1 2x(x^2+1)^3\,dx$

令 $u = x^2 + 1$，則 $du = 2x\,dx$。當 $x = 0$ 時，$u = 1$；當 $x = 1$ 時，$u = 2$。積分變換為

$$
\int_0^1 2x(x^2+1)^3\,dx = \int_1^2 u^3\,du = \left[\frac{u^4}{4}\right]_1^2 = \frac{16}{4} - \frac{1}{4} = \frac{15}{4}.
$$

### 範例 2：$\int_0^1 \sqrt{1 - x^2}\,dx$

這是四分之一單位圓的面積，已知為 $\pi/4$。用三角換元來驗證。令 $x = \sin\theta$，則 $dx = \cos\theta\,d\theta$ 且 $\sqrt{1-x^2} = \cos\theta$。當 $x = 0$ 時，$\theta = 0$；當 $x = 1$ 時，$\theta = \pi/2$。積分變為

$$
\int_0^{\pi/2} \cos\theta \cdot \cos\theta\,d\theta = \int_0^{\pi/2} \cos^2\theta\,d\theta.
$$

利用倍角公式 $\cos^2\theta = \dfrac{1 + \cos 2\theta}{2}$：

$$
\int_0^{\pi/2} \frac{1 + \cos 2\theta}{2}\,d\theta
= \left[\frac{\theta}{2} + \frac{\sin 2\theta}{4}\right]_0^{\pi/2}
= \frac{\pi/2}{2} + \frac{\sin\pi}{4} - 0
= \frac{\pi}{4}.
$$

### 範例 3：$\int \dfrac{dx}{1 + e^x}$

令 $u = e^x$，則 $du = e^x\,dx = u\,dx$，得 $dx = \dfrac{du}{u}$。代入：

$$
\int \frac{dx}{1 + e^x} = \int \frac{1}{1 + u}\cdot\frac{du}{u} = \int \frac{du}{u(1+u)}.
$$

部分分式：$\dfrac{1}{u(1+u)} = \dfrac{1}{u} - \dfrac{1}{1+u}$。積分：

$$
\int \left(\frac{1}{u} - \frac{1}{1+u}\right)du = \ln u - \ln(1+u) + C = \ln\frac{u}{1+u} + C.
$$

回代 $u = e^x$：

$$
\int \frac{dx}{1+e^x} = \ln\frac{e^x}{1+e^x} + C = x - \ln(1 + e^x) + C.
$$

（最後一個等式用到 $\ln(e^x) = x$。）

## 摘要

- **換元積分定理**：若 $\varphi \in C^1[\alpha,\beta]$ 且 $\varphi([\alpha,\beta]) \subseteq [a,b]$，$f$ 在 $[a,b]$ 上連續，則 $\int_\alpha^\beta f(\varphi(t))\,\varphi'(t)\,dt = \int_{\varphi(\alpha)}^{\varphi(\beta)} f(x)\,dx$。
- 證明利用[連鎖律](../../differential/chain_rule/)對 $F(\varphi(t))$ 求導，再對兩端應用[牛頓–萊布尼茲公式](../newton_leibniz_formula/)。
- 對**定積分**，直接變換積分限：$t = \alpha \mapsto x = \varphi(\alpha)$，$t = \beta \mapsto x = \varphi(\beta)$；無需回代。
- 對**不定積分**，計算 $\int f(x)\,dx = F(x) + C$ 後，回代 $x = \varphi(t)$ 以用原始變數表達答案。
- **線性換元** $u = ax + b$ 是最簡單的情形，引入因子 $1/a$。
- **三角換元** $x = a\sin\theta$（或 $a\tan\theta$、$a\sec\theta$）消除二次式的平方根。
- **反向換元**（顯式令 $x = \varphi(t)$）可以有理化複雜的被積函數，例如透過 $u = e^x$ 處理含 $e^x$ 的積分。
