---
title: 積分的單調性
summary: "若 f、g 在 [a, b] 上可積且 f ≤ g 逐點成立，則 ∫_a^b f ≤ ∫_a^b g。本節從 Darboux 和的定義出發證明單調性，推導標準估計 |∫_a^b f| ≤ ∫_a^b |f|，並得出對任意界 m ≤ f ≤ M 的估計 m(b − a) ≤ ∫_a^b f ≤ M(b − a)——這正是積分均值定理的基礎。"
prerequisites:
  - basis/math/calculus/riemann_integral/def
aliases: []
tags:
  - 微積分
  - 積分
updated: 2026-05-22
---

一旦將積分定義為 Darboux 和的極限，接下來最重要的事就是理解它究竟有哪些性質。其中最直觀、也最實用的一條是：若某函數處處不低於另一個函數，則其積分也不小。這個性質——**積分單調性（monotonicity of integrals）**——幾乎是所有涉及積分的估計的根源。

## 單調性

**定理。** 設 $f, g: [a,b] \to \mathbb{R}$ 均為 Riemann 可積函數。若對所有 $x \in [a,b]$ 均有 $f(x) \le g(x)$，則

$$
\int_a^b f(x)\,dx \;\le\; \int_a^b g(x)\,dx.
$$

**證明。** 對任意分割 $P$，每個上 Darboux 和均滿足 $U(f, P) \le U(g, P)$，因為 $\sup_{[x_{i-1},x_i]} f \le \sup_{[x_{i-1},x_i]} g$。對所有分割取下確界，得 $\int_a^b f \le \overline{\int_a^b} g = \int_a^b g$。（以下 Darboux 和作同樣論證亦可。）$\square$

## 積分的線性

作為單調性的配套性質，積分具有**線性**：若 $f$ 和 $g$ 均可積，且 $\alpha, \beta \in \mathbb{R}$，則 $\alpha f + \beta g$ 也可積，且

$$
\int_a^b (\alpha f + \beta g) = \alpha \int_a^b f + \beta \int_a^b g.
$$

這由定義直接得出：和的線性在取上/下確界的過程中傳遞到積分。

## 絕對值估計

**推論。** 若 $f$ 在 $[a,b]$ 上可積，則 $|f|$ 也可積，且

$$
\left|\int_a^b f(x)\,dx\right| \;\le\; \int_a^b |f(x)|\,dx.
$$

**證明。** 由 $-|f(x)| \le f(x) \le |f(x)|$，對單調性各施用一次：

$$
-\int_a^b |f| \;\le\; \int_a^b f \;\le\; \int_a^b |f|.
$$

這等價於 $|\int_a^b f| \le \int_a^b |f|$。（$|f|$ 的可積性來自：$|f|$ 在任意子區間上的振盪不超過 $f$ 的振盪，故 Darboux 判準仍成立。）$\square$

這個估計是求和三角不等式 $|\sum a_i| \le \sum |a_i|$ 的積分版本。

## 逐點界給出的估計

**推論。** 若 $f$ 可積且對所有 $x \in [a,b]$ 均有 $m \le f(x) \le M$，則

$$
m(b-a) \;\le\; \int_a^b f(x)\,dx \;\le\; M(b-a). \tag{1}
$$

**證明。** 對 $m \le f \le M$ 施用單調性：常數函數 $m$ 在 $[a,b]$ 上的積分為 $m(b-a)$，$M$ 同理。$\square$

估計 $(1)$ 是[積分均值定理](../mean_value_theorem/)的關鍵成分：將 $\int f / (b-a)$ 夾在 $m$ 和 $M$ 之間，再施用中間值定理。

## 估計範例

$\int_0^1 e^{-x^2}\,dx$ 最大可以多大？在 $[0,1]$ 上被積函數滿足 $e^{-1} \le e^{-x^2} \le 1$（因為 $0 \le x^2 \le 1$），故由 $(1)$ 立即得到：

$$
e^{-1} \;\le\; \int_0^1 e^{-x^2}\,dx \;\le\; 1.
$$

精確值（$\frac{\sqrt\pi}{2}\,\mathrm{erf}(1) \approx 0.747$）需要更多工作，但這個界由單調性免費得到。

## 摘要

- **單調性**：$f \le g$ 逐點成立蘊含 $\int f \le \int g$。
- **線性**：$\int (\alpha f + \beta g) = \alpha \int f + \beta \int g$。
- **絕對值估計**：$|\int_a^b f| \le \int_a^b |f|$——積分版三角不等式。
- **界**：若 $m \le f \le M$ 處處成立，則 $m(b-a) \le \int_a^b f \le M(b-a)$。
- 這些性質組合在一起，給出分析中所有標準積分估計的來源。
