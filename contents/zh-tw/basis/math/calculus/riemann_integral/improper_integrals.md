---
title: 廣義積分
summary: "黎曼積分定義在有界區間上的有界函數；廣義積分（improper integral）透過取適當積分的極限，將其推廣至無界區間（∫_a^∞ f）以及在端點附近無界的函數（∫_a^b f，f 在 b 處爆炸）。本章定義兩類廣義積分，區分收斂（convergence）與發散（divergence），並計算典型範例：∫_1^∞ x^(−p) dx、∫_0^1 x^(−p) dx 以及 Gamma 積分 ∫_0^∞ e^(−x) x^(s−1) dx。"
prerequisites:
  - basis/math/calculus/riemann_integral/additive
  - basis/math/calculus/continuous_function/limit_of_function
aliases: []
tags:
  - 微積分
  - 積分
  - 廣義積分
updated: 2026-05-22
---

你所定義的黎曼積分要求積分域與函數均有界。然而分析中最重要的積分——總概率、傅立葉變換、拉普拉斯變換、物理中的位能井——幾乎總是涉及無限區間或在某處爆炸的函數。**廣義積分（improper integral）**提供了嚴格處理這兩類情況的方法：將它們化為適當黎曼積分的極限。當極限存在且有限時，積分**收斂（convergence）**；否則**發散（divergence）**。

## 為何需要推廣積分？

幾個典型問題說明了這種需求。

**總概率。** 標準常態密度 $\frac{1}{\sqrt{2\pi}} e^{-x^2/2}$ 定義在整個 $\mathbb{R}$ 上。「總概率等於 $1$」意味著

$$
\frac{1}{\sqrt{2\pi}} \int_{-\infty}^{\infty} e^{-x^2/2}\,dx = 1,
$$

這需要在無界域上積分。

**傅立葉變換。** 傅立葉變換 $\hat{f}(\xi) = \int_{-\infty}^{\infty} f(x) e^{-2\pi i \xi x}\,dx$ 是訊號處理與偏微分方程理論的骨幹，它定義在 $\mathbb{R}$ 上。

**冪次奇異性。** 函數 $x^{-1/2}$ 在 $(0, 1]$ 上無界，然而按任何合理的計算方式，其從 $0$ 到 $1$ 的積分都應等於 $2$。讓「合理的計算方式」變得精確，正是第二類廣義積分所做的事。

## 第一類：無界區間

**定義。** 設 $f$ 在 $[a, b]$ 上對每個 $b > a$ 均為黎曼可積。$[a, \infty)$ 上的**廣義積分**定義為

$$
\int_a^{\infty} f(x)\,dx \;\coloneqq\; \lim_{b \to \infty} \int_a^b f(x)\,dx.
$$

若此極限存在且有限，積分**收斂**至該值；否則**發散**。

類似地，向 $-\infty$ 延伸的積分定義為：

$$
\int_{-\infty}^{b} f(x)\,dx \;\coloneqq\; \lim_{a \to -\infty} \int_a^b f(x)\,dx.
$$

對雙向無限積分，選取任意便利的中間點 $c$ 定義：

$$
\int_{-\infty}^{\infty} f(x)\,dx \;\coloneqq\; \int_{-\infty}^c f(x)\,dx \;+\; \int_c^{\infty} f(x)\,dx,
$$

要求**兩個**部分**分別獨立收斂**。（若允許兩個極限同時趨近，得到的是**柯西主值（Cauchy principal value）**，這是一個較弱的概念，本章不使用。）

### 計算範例：$[1, \infty)$ 上的 $p$ 積分

考慮 $\int_1^{\infty} x^{-p}\,dx$，其中 $p$ 為實數參數。

**情形 $p \neq 1$。** 對 $b > 1$，

$$
\int_1^b x^{-p}\,dx = \left[\frac{x^{1-p}}{1-p}\right]_1^b = \frac{b^{1-p} - 1}{1-p}.
$$

當 $b \to \infty$ 時：

- 若 $p > 1$ 則 $1 - p < 0$，故 $b^{1-p} \to 0$，極限為 $\dfrac{0 - 1}{1-p} = \dfrac{1}{p-1}$。
- 若 $p < 1$ 則 $1 - p > 0$，故 $b^{1-p} \to \infty$：積分發散。

**情形 $p = 1$。** $\int_1^b x^{-1}\,dx = \ln b \to \infty$：發散。

**結論。**

$$
\int_1^{\infty} x^{-p}\,dx \;=\; \frac{1}{p-1} \quad (p > 1), \qquad \text{發散} \quad (p \le 1).
$$

這一族積分已可解釋為何調和級數發散而 $\sum n^{-2}$ 收斂——積分判別法正好以這個閾值為關鍵。

## 第二類：被積函數無界

**定義。** 設 $f$ 在每個 $[a, b - \varepsilon]$（$\varepsilon \in (0, b - a)$）上均為黎曼可積，但在 $b$ 附近無界（或無定義）。定義

$$
\int_a^b f(x)\,dx \;\coloneqq\; \lim_{\varepsilon \to 0^+} \int_a^{b-\varepsilon} f(x)\,dx.
$$

若極限存在且有限，積分收斂；否則發散。

若 $f$ 在左端點 $a$ 處爆炸，則定義：

$$
\int_a^b f(x)\,dx \;\coloneqq\; \lim_{\varepsilon \to 0^+} \int_{a+\varepsilon}^b f(x)\,dx.
$$

若奇異點在內部點 $c \in (a, b)$，則切分：

$$
\int_a^b f(x)\,dx \;\coloneqq\; \int_a^c f(x)\,dx + \int_c^b f(x)\,dx,
$$

要求兩段均收斂。

### 計算範例：$[0, 1]$ 上的 $p$ 積分

考慮 $\int_0^1 x^{-p}\,dx$（$p > 0$，奇異點在 $x = 0$）。

**情形 $p \neq 1$。** 對 $\varepsilon > 0$，

$$
\int_\varepsilon^1 x^{-p}\,dx = \left[\frac{x^{1-p}}{1-p}\right]_\varepsilon^1 = \frac{1 - \varepsilon^{1-p}}{1-p}.
$$

當 $\varepsilon \to 0^+$ 時：

- 若 $p < 1$ 則 $1 - p > 0$，故 $\varepsilon^{1-p} \to 0$，極限為 $\dfrac{1}{1-p}$。
- 若 $p > 1$ 則 $1 - p < 0$，故 $\varepsilon^{1-p} \to \infty$：發散。

**情形 $p = 1$。** $\int_\varepsilon^1 x^{-1}\,dx = -\ln \varepsilon \to \infty$：發散。

**結論。**

$$
\int_0^1 x^{-p}\,dx \;=\; \frac{1}{1-p} \quad (0 < p < 1), \qquad \text{發散} \quad (p \ge 1).
$$

注意與第一類結果的完全互補性：閾值從 $p > 1$ 翻轉為 $p < 1$。

## 混合類型：兩類奇異性同時出現

有時一個積分既有無界的被積函數，又有無界的積分域。這時在方便的內部點切分，分別處理各段。例如，定義 $\int_0^\infty x^{-p}\,dx$ 時，寫成

$$
\int_0^\infty x^{-p}\,dx = \int_0^1 x^{-p}\,dx + \int_1^\infty x^{-p}\,dx.
$$

第一段在 $p < 1$ 時收斂，第二段在 $p > 1$ 時收斂，但沒有任何 $p$ 能使兩段同時收斂——因此 $\int_0^\infty x^{-p}\,dx$ 對每個 $p$ 均發散。這是一個簡單但重要的情形：即便每一半分別有其良好的參數範圍，兩個範圍也可能不重疊。

## Gamma 函數

分析中最重要的廣義積分是 **Gamma 函數**：

$$
\Gamma(s) \;\coloneqq\; \int_0^{\infty} e^{-x} x^{s-1}\,dx, \quad s > 0.
$$

這是混合類型積分：在 $x = 0$ 附近，因子 $x^{s-1}$ 在 $s < 1$ 時可能爆炸，且上限為 $\infty$。在 $x = 1$ 處切分後，兩段分別由上述估計與 $e^{-x}$ 的快速衰減來處理。

**在 $0$ 附近的收斂性。** 對小 $x > 0$，$e^{-x} \le 1$，故 $e^{-x} x^{s-1} \le x^{s-1}$。由上述結果，$\int_0^1 x^{s-1}\,dx$ 在 $s > 0$ 時收斂，故左段絕對收斂。

**在 $\infty$ 處的收斂性。** 對大 $x$，指數衰減支配任意冪次：$e^{-x} x^{s-1} \le C_s e^{-x/2}$（$C_s$ 是依賴 $s$ 的常數）。由於 $\int_1^\infty e^{-x/2}\,dx$ 收斂，右段亦收斂。

### 函數方程

Gamma 函數滿足**函數方程（functional equation）**

$$
\Gamma(s+1) = s\,\Gamma(s), \quad s > 0.
$$

**證明。** 對 $\int_0^\infty e^{-x} x^s\,dx$ 進行分部積分，令 $u = x^s$，$dv = e^{-x}\,dx$：

$$
\Gamma(s+1) = \int_0^\infty e^{-x} x^s\,dx = \left[-e^{-x} x^s\right]_0^\infty + s \int_0^\infty e^{-x} x^{s-1}\,dx.
$$

邊界項消失：在 $x = 0$ 時 $x^s = 0$，在 $x \to \infty$ 時指數衰減使 $e^{-x} x^s \to 0$。剩餘的積分恰好是 $\Gamma(s)$，故得 $\Gamma(s+1) = s\,\Gamma(s)$。$\square$

**初始值。** $\Gamma(1) = \int_0^\infty e^{-x}\,dx = 1$。由函數方程，$\Gamma(2) = 1 \cdot \Gamma(1) = 1$，$\Gamma(3) = 2$，由歸納法得對每個非負整數 $n$ 均有 $\Gamma(n+1) = n!$。Gamma 函數是階乘對正實數的唯一（在適當正則性意義下的）延拓。

## 摘要

- **第一類廣義積分**：$\int_a^\infty f \coloneqq \lim_{b \to \infty} \int_a^b f$。當極限存在且有限時收斂。
- **第二類廣義積分**：$\int_a^b f \coloneqq \lim_{\varepsilon \to 0^+} \int_a^{b-\varepsilon} f$（$f$ 在 $b$ 處爆炸）。在 $a$ 或內部點處爆炸的情形可類比定義。
- $p$ 積分 $\int_1^\infty x^{-p}\,dx$ 收斂若且唯若 $p > 1$，值為 $\frac{1}{p-1}$。
- $p$ 積分 $\int_0^1 x^{-p}\,dx$ 收斂若且唯若 $p < 1$，值為 $\frac{1}{1-p}$。
- 對雙向無限積分 $\int_{-\infty}^\infty f$，兩個半段必須分別獨立收斂。
- 混合類型積分切分為各段；收斂要求每段均收斂。
- **Gamma 函數** $\Gamma(s) = \int_0^\infty e^{-x} x^{s-1}\,dx$ 對所有 $s > 0$ 均收斂，滿足 $\Gamma(s+1) = s\,\Gamma(s)$，是階乘的延拓。
