---
title: 廣義積分的收斂判別法
summary: "廣義積分的收斂判別法與無窮級數的判別法相互對應。本章發展比較判別法、極限比較判別法、柯西收斂判準，以及針對振盪積分（如 ∫_1^∞ (sin x) / x dx）的 Abel–Dirichlet 判別法；定義絕對收斂與條件收斂；並利用積分第二中值定理處理較棘手的振盪情形。"
prerequisites:
  - basis/math/calculus/riemann_integral/improper_integrals
  - basis/math/calculus/riemann_integral/second_mean_value_theorem_integral
aliases: []
tags:
  - 微積分
  - 積分
  - 廣義積分
updated: 2026-05-22
---

在[廣義積分](../improper_integrals/)中，你學到了如何將 $\int_a^\infty f$ 定義為適當積分的極限，並將其分類為收斂（convergence）或發散。對許多函數而言，直接計算這個極限十分困難甚至不可能。你需要的是判別法——讓你無需顯式求極限便能判斷收斂性的準則，就像對無窮級數使用比較判別法而非逐項求和一樣。本章依由簡至繁的順序發展這些判別法，從最基本的比較法到最精妙的振盪被積函數 Abel–Dirichlet 判別法。

## 柯西收斂判準

最基本的判準是數列柯西條件的直接類比。

**定理（柯西收斂判準）。** 廣義積分 $\int_a^\infty f(x)\,dx$ 收斂若且唯若對任意 $\varepsilon > 0$，存在 $A \ge a$ 使得對所有 $B > A$，

$$
\left|\int_A^B f(x)\,dx\right| < \varepsilon.
$$

*證明提要。* 定義 $F(t) = \int_a^t f(x)\,dx$。積分收斂若且唯若 $\lim_{t \to \infty} F(t)$ 存在，若且唯若 $F$ 滿足極限收斂的柯西條件：對充分大的 $A$、$B$ 有 $|F(B) - F(A)| < \varepsilon$。而 $F(B) - F(A) = \int_A^B f$，故這恰好是所述條件。$\square$

對於振盪積分，柯西判準特別有用——你需要說明尾部很小，但不必知道極限值。

## 比較判別法

當 $f$ 非負時，積分的單調性使得直接比較成為可能。

**定理（比較判別法）。** 設對所有 $x \ge a$ 均有 $0 \le f(x) \le g(x)$。

- 若 $\int_a^\infty g(x)\,dx$ 收斂，則 $\int_a^\infty f(x)\,dx$ 收斂且 $\int_a^\infty f \le \int_a^\infty g$。
- 若 $\int_a^\infty f(x)\,dx$ 發散，則 $\int_a^\infty g(x)\,dx$ 發散。

*證明。* 由 $f \ge 0$，函數 $F(t) = \int_a^t f$ 是遞增的。若 $\int g$ 收斂，則對所有 $t$ 有 $F(t) \le \int_a^t g \le \int_a^\infty g < \infty$。有界的遞增函數有有限的極限，故 $\int f$ 收斂。發散方向由逆否命題得到。$\square$

**範例。** 對 $x \ge 1$，不等式 $e^{-x^2} \le e^{-x}$ 成立（因 $x^2 \ge x$）。由於 $\int_1^\infty e^{-x}\,dx = e^{-1}$ 收斂，比較判別法給出 $\int_1^\infty e^{-x^2}\,dx < \infty$。

## 極限比較判別法

有時無法直接用一個更簡單的函數界定 $f$，但可以比較它們的漸近大小。

**定理（極限比較判別法）。** 設對 $x \ge a$ 均有 $f(x), g(x) > 0$，且

$$
\lim_{x \to \infty} \frac{f(x)}{g(x)} = L, \quad 0 < L < \infty.
$$

則 $\int_a^\infty f$ 收斂若且唯若 $\int_a^\infty g$ 收斂。

*證明。* 由 $f/g \to L$，存在 $A$ 使得對 $x \ge A$ 有

$$
\frac{L}{2} \le \frac{f(x)}{g(x)} \le 2L,
$$

即 $\frac{L}{2}\,g(x) \le f(x) \le 2L\,g(x)$。在 $[A, \infty)$ 上應用普通比較判別法即得等價性。$\square$

**範例。** 比較 $f(x) = \frac{1}{x^2 + 1}$ 與 $g(x) = x^{-2}$。則 $f(x)/g(x) = x^2/(x^2+1) \to 1$。由於 $\int_1^\infty x^{-2}\,dx$ 收斂（$p = 2 > 1$ 的 $p$ 積分），積分 $\int_1^\infty \frac{dx}{x^2+1}$ 也收斂。

**邊界情形 $L = 0$ 或 $L = \infty$。** 若 $L = 0$，則 $f = o(g)$：$\int g$ 收斂蘊含 $\int f$ 收斂，但逆命題未必成立。若 $L = \infty$，則角色互換。

## 絕對收斂與條件收斂

**定義。** 若 $\int_a^\infty |f(x)|\,dx$ 收斂，則稱積分 $\int_a^\infty f(x)\,dx$ **絕對收斂（absolutely convergent）**。若 $\int_a^\infty f$ 收斂但 $\int_a^\infty |f|$ 發散，則稱其**條件收斂（conditionally convergent）**。

**命題。** 絕對收斂蘊含收斂。

*證明。* 由柯西判準與三角不等式：

$$
\left|\int_A^B f\right| \le \int_A^B |f|.
$$

若 $\int |f|$ 收斂，則對充分大的 $A$，$\int_A^B |f|$ 可以任意小，同樣的界限適用於 $|\int_A^B f|$。$\square$

逆命題不成立。積分 $\int_1^\infty \frac{\sin x}{x}\,dx$ 是條件收斂的：它收斂（見下文），但 $\int_1^\infty \frac{|\sin x|}{x}\,dx = \infty$（見本章末尾）。

## Abel–Dirichlet 判別法

對絕對收斂不成立的振盪積分，下面兩個判別法處理最常見的情況，均是對應級數判別法的連續類比。

### Dirichlet 判別法

**定理（Dirichlet 判別法）。** 設：
1. $F(x) \coloneqq \int_a^x f(t)\,dt$ **有界**：存在 $M$ 使得對所有 $x \ge a$ 均有 $|F(x)| \le M$。
2. $g$ **單調遞減趨於 $0$**：$g(x) \to 0$（$x \to \infty$）。

則 $\int_a^\infty f(x)\,g(x)\,dx$ 收斂。

*證明。* 在 $[A, B]$ 上應用 Bonnet 定理（[積分第二中值定理](../second_mean_value_theorem_integral/)）：存在 $\xi \in [A, B]$ 使得

$$
\int_A^B f(x)\,g(x)\,dx = g(A)\int_A^\xi f(x)\,dx + g(B)\int_\xi^B f(x)\,dx.
$$

由 $\int_A^\xi f = F(\xi) - F(A)$，得 $|\int_A^\xi f| \le 2M$，類似地 $|\int_\xi^B f| \le 2M$。因此

$$
\left|\int_A^B f(x)\,g(x)\,dx\right| \le 2M\,g(A) + 2M\,g(B) \le 4M\,g(A).
$$

由於 $g(A) \to 0$（$A \to \infty$），柯西判準成立。$\square$

### Abel 判別法

**定理（Abel 判別法）。** 設：
1. $\int_a^\infty f(x)\,dx$ **收斂**。
2. $g$ 在 $[a, \infty)$ 上**單調且有界**。

則 $\int_a^\infty f(x)\,g(x)\,dx$ 收斂。

*證明。* 由 $g$ 單調有界，其有有限極限 $L = \lim_{x \to \infty} g(x)$。寫成 $g = (g - L) + L$。函數 $g - L$ 單調趨於 $0$，$L$ 為常數。因此

$$
\int_a^\infty f g = L \int_a^\infty f + \int_a^\infty f\,(g - L).
$$

第一個積分由假設收斂。第二個積分由 Dirichlet 判別法對 $f$ 與 $g - L$ 收斂（$F(x) = \int_a^x f$ 有界，因為 $\int_a^\infty f$ 收斂，由柯西判準得）。$\square$

## 計算範例

### $\int_1^\infty \frac{\sin x}{x}\,dx$ 收斂（Dirichlet 判別法）

令 $f(x) = \sin x$，$g(x) = 1/x$。原函數 $F(x) = -\cos x + \cos 1$ 對所有 $x$ 滿足 $|F(x)| \le 2$，且 $g(x) = 1/x \searrow 0$。由 Dirichlet 判別法，$\int_1^\infty \frac{\sin x}{x}\,dx$ 收斂。

### $\int_1^\infty \frac{\sin x}{x^2}\,dx$ 絕對收斂

對所有 $x$，$\left|\frac{\sin x}{x^2}\right| \le \frac{1}{x^2}$。由於 $\int_1^\infty x^{-2}\,dx$ 收斂（$p = 2 > 1$），比較判別法給出絕對收斂。

### $\int_1^\infty \frac{dx}{x}$ 發散

這是[廣義積分](../improper_integrals/)中第一類 $p$ 積分的 $p = 1$ 情形。由於 $\ln b \to \infty$，積分發散。

### $\int_1^\infty \frac{|\sin x|}{x}\,dx$ 發散

在每個區間 $[k\pi, (k+1)\pi]$ 上，$|\sin x| \ge 0$ 且 $\int_{k\pi}^{(k+1)\pi} |\sin x|\,dx = 2$。由於在該區間上 $\frac{1}{x} \ge \frac{1}{(k+1)\pi}$，

$$
\int_{k\pi}^{(k+1)\pi} \frac{|\sin x|}{x}\,dx \ge \frac{2}{(k+1)\pi}.
$$

右端是發散級數（$\sum 1/(k+1)$ 發散）的通項，故由比較判別法，積分發散。這確認了 $\int_1^\infty \frac{\sin x}{x}\,dx$ 是條件收斂但非絕對收斂的。

## 摘要

- **柯西判準**：$\int_a^\infty f$ 收斂若且唯若對充分大的 $A$，$|\int_A^B f|$ 對所有 $B > A$ 均可任意小。
- **比較判別法**：對 $0 \le f \le g$，$\int g$ 收斂蘊含 $\int f$ 收斂；$\int f$ 發散蘊含 $\int g$ 發散。
- **極限比較判別法**：若 $f, g > 0$ 且 $f/g \to L \in (0, \infty)$，則 $\int f$ 與 $\int g$ 同時收斂或同時發散。
- **絕對收斂**（$\int |f| < \infty$）蘊含收斂；逆命題不成立。
- **Dirichlet 判別法**：$F(x) = \int_a^x f$ 有界加上 $g \searrow 0$，保證 $\int fg$ 收斂。
- **Abel 判別法**：$\int f$ 收斂加上 $g$ 單調有界，保證 $\int fg$ 收斂。
- $\int_1^\infty \frac{\sin x}{x}\,dx$ 條件收斂（Dirichlet）；$\int_1^\infty \frac{\sin x}{x^2}\,dx$ 絕對收斂（比較）；$\int_1^\infty \frac{dx}{x}$ 與 $\int_1^\infty \frac{|\sin x|}{x}\,dx$ 均發散。
