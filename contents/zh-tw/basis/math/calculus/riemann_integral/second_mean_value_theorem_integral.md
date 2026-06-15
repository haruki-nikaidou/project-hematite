---
title: 第二積分均值定理
summary: "若 g 在 [a, b] 上單調，f 可積，則存在 ξ ∈ [a, b] 使得 ∫_a^b f(x) g(x) dx = g(a) ∫_a^ξ f(x) dx + g(b) ∫_ξ^b f(x) dx——這是第二積分均值定理（second mean value theorem for integrals）的 Bonnet 形式。本節以 Abel 求和法論證（與分部積分自然配對）推導此定理，給出 g 非負單調的特例，並用它證明振盪積分 ∫_1^∞ (sin x) / x dx 的收斂性。"
prerequisites:
  - basis/math/calculus/riemann_integral/mean_value_theorem
  - basis/math/calculus/riemann_integral/integration_by_parts
aliases: []
tags:
  - 微積分
  - 積分
  - 均值定理
updated: 2026-05-22
---

[第一積分均值定理](../mean_value_theorem/)說：若 $f$ 在 $[a, b]$ 上連續，則存在點 $\xi$ 使得 $\int_a^b f = f(\xi)(b - a)$。但若你想對乘積 $f(x) g(x)$ 積分，且 $g$ 只是**單調**的而非連續的，該怎麼辦？第二積分均值定理——以 **Bonnet 定理**這一名稱廣為人知——恰好處理這種情形。它不是將 $g$ 提取為單一數值，而是給出一個分拆公式：積分等於 $g(a)$ 乘以 $[a, \xi]$ 上的積分，加上 $g(b)$ 乘以 $[\xi, b]$ 上的積分。證明的思路是連續版的 Abel 求和，結合分部積分。

## 定理陳述：Bonnet 形式

**定理（第二積分均值定理）。** 設 $g$ 在 $[a, b]$ 上單調遞減，$f$ 在 $[a, b]$ 上 Riemann 可積。則存在 $\xi \in [a, b]$ 使得

$$
\int_a^b f(x)\,g(x)\,dx \;=\; g(a) \int_a^\xi f(x)\,dx \;+\; g(b) \int_\xi^b f(x)\,dx.
$$

單調**遞增** $g$ 的情形由以 $-g$ 替換 $g$ 得出。

## 動機：離散類比（Abel 求和）

在證明連續情形之前，先看看離散版本是有益的，這稱為 **Abel 求和法（Abel summation）**（又稱 Abel 求和公式）。給定數列 $(a_k)$ 和 $(b_k)$，前者的部分和 $A_k = \sum_{j=1}^k a_j$，則

$$
\sum_{k=1}^n a_k b_k \;=\; A_n b_n \;-\; \sum_{k=1}^{n-1} A_k (b_{k+1} - b_k).
$$

這是分部積分的離散類比：將 $a_k$ 「積分」為累加和 $A_k$，再將 $b_k$ 「微分」為差分。若 $b_k$ 遞減，則差分 $b_{k+1} - b_k \le 0$ 有確定的符號，從而可以用 $A_k$ 的極值來估計求和。完全相同的結構在連續情形中也適用。

## 證明

**第一步：分部積分。** 定義 $G(x) \coloneqq \int_a^x f(t)\,dt$，即從 $a$ 出發的 $f$ 的反導函數。分部積分給出

$$
\int_a^b f(x)\,g(x)\,dx = \int_a^b G'(x)\,g(x)\,dx = \bigl[G(x)\,g(x)\bigr]_a^b - \int_a^b G(x)\,g'(x)\,dx.
$$

由 $G(a) = 0$，邊界項化簡為 $G(b)\,g(b)$。用 $G(b) = \int_a^b f$ 改寫：

$$
\int_a^b f(x)\,g(x)\,dx = g(b)\int_a^b f(x)\,dx - \int_a^b G(x)\,g'(x)\,dx. \tag{$*$}
$$

**第二步：對 $-\int G\,g'$ 施用第一均值定理。** 因為 $g$ 遞減且可微（暫時假設），$g'(x) \le 0$，故 $-g'(x) \ge 0$。函數 $-g'$ 是非負的可積權函數。由第一均值定理的帶權形式（見[積分均值定理](../mean_value_theorem/)），存在 $\xi \in [a, b]$ 使得

$$
-\int_a^b G(x)\,g'(x)\,dx = G(\xi) \cdot \left(-\int_a^b g'(x)\,dx\right) = G(\xi)\,\bigl(g(a) - g(b)\bigr).
$$

**第三步：整合。** 代入 $(*)$：

$$
\int_a^b f(x)\,g(x)\,dx = g(b)\int_a^b f(x)\,dx + G(\xi)\,\bigl(g(a) - g(b)\bigr).
$$

利用 $\int_a^b f = \int_a^\xi f + \int_\xi^b f$ 以及 $G(\xi) = \int_a^\xi f$ 改寫：

$$
= g(b)\left(\int_a^\xi f + \int_\xi^b f\right) + \int_a^\xi f\,(g(a) - g(b))
= g(a)\int_a^\xi f(x)\,dx + g(b)\int_\xi^b f(x)\,dx. \quad \square
$$

*備注。* 以上證明假設 $g$ 可微。對僅單調的 $g$，論證可用 Riemann-Stieltjes 分部積分或以光滑單調函數逼近 $g$ 來補全；結論相同。

## 特例：非負遞減權函數

若 $g \ge 0$ 且遞減，則 $g(b) \ge 0$，公式可以簡化。

**推論。** 若 $g \ge 0$ 在 $[a, b]$ 上遞減，$f$ 可積，則存在 $\xi \in [a, b]$ 使得

$$
\int_a^b f(x)\,g(x)\,dx \;=\; g(a)\int_a^\xi f(x)\,dx.
$$

*證明。* 在完整的 Bonnet 公式中，$g(b) \ge 0$，$\int_\xi^b f$ 有界。當 $g(b) = 0$ 時，第二項消失。一般的非負遞減情形，對 $h = g - g(b) \ge 0$（滿足 $h(b) = 0$）施用 Bonnet 定理，並吸收 $g(b)\int_a^b f$ 的餘項即得。$\square$

這個推論有時在教科書中被稱為第二均值定理；Bonnet 形式是保留了 $g(b)$ 項的更精確版本。

## 應用：$\int_1^\infty \frac{\sin x}{x}\,dx$ 的收斂性

積分 $\int_1^\infty \frac{\sin x}{x}\,dx$ 並非絕對收斂（這將在[反常積分收斂性](../improper_integral_convergence/)節中說明），但它確實收斂。Bonnet 定理是關鍵工具。

**命題。** 對所有 $1 \le A < B$，

$$
\left|\int_A^B \frac{\sin x}{x}\,dx\right| \;\le\; \frac{4}{A}.
$$

**證明。** 在 $[A, B]$ 上取 $f(x) = \sin x$，$g(x) = 1/x$（正且遞減），施用 Bonnet 定理。存在 $\xi \in [A, B]$ 使得

$$
\int_A^B \frac{\sin x}{x}\,dx = \frac{1}{A}\int_A^\xi \sin x\,dx + \frac{1}{B}\int_\xi^B \sin x\,dx.
$$

對任意區間 $[u, v]$，$|\int_u^v \sin x\,dx| = |\cos u - \cos v| \le 2$。因此

$$
\left|\int_A^B \frac{\sin x}{x}\,dx\right| \;\le\; \frac{1}{A} \cdot 2 + \frac{1}{B} \cdot 2 \;\le\; \frac{2}{A} + \frac{2}{A} = \frac{4}{A}.
$$

由於右側當 $A \to \infty$ 時趨於 $0$，反常積分的 **Cauchy 判則**（在下一節中給出）確認了收斂性。$\square$

這是一個典型論證：每當 $g$ 單調趨於 $0$ 且「振盪部分」$f$ 的反導函數有界時，Bonnet 定理提供關鍵估計。

## 摘要

- **第二積分均值定理（Bonnet 形式）**：若 $g$ 在 $[a, b]$ 上單調遞減，$f$ 可積，則存在 $\xi \in [a, b]$ 使得 $\int_a^b fg = g(a)\int_a^\xi f + g(b)\int_\xi^b f$。
- 證明對 $\int fg$ 做分部積分，令 $F(x) = \int_a^x f$，再對所得積分 $-\int F g'$（具有非負權 $-g' \ge 0$）施用第一均值定理。
- 若 $g \ge 0$ 且遞減，公式簡化為對某個 $\xi$ 有 $\int_a^b fg = g(a)\int_a^\xi f$。
- Bonnet 定理是證明振盪積分（如 $\int_1^\infty \frac{\sin x}{x}\,dx$）收斂性的關鍵工具：絕對收斂性不成立，但 $1/x$ 的單調衰減抑制了振盪。
