---
title: 積分に関する平均値定理
summary: "f が [a, b] で連続なら、ある ξ ∈ [a, b] が存在して ∫_a^b f(x) dx = f(ξ) (b − a) — 積分は中間のある点での値に区間の長さを掛けたものに等しい。このチェックポイントはダルボー和の単調性の範囲と中間値定理を組み合わせることで定理を証明し、加重形式 ∫ f g = f(ξ) ∫ g を提示する。"
prerequisites:
  - basis/math/calculus/riemann_integral/monotonicity_of_integral
  - basis/math/calculus/continuous_function/intermediate_value_theorem
aliases: []
tags:
  - 解析学
  - 積分
  - 平均値定理
updated: 2026-05-22
---

<!-- TODO: 翻訳中 / Translation in progress -->

2時間運転して120 kmをカバーした場合、平均速度は60 km/hであった。その瞬間のある瞬間に正確にその平均を移動していたはずだ。この事実の積分版は次の通りである。連続関数の平均値は、実は区間のどこかの点で達成される。これが**積分に関する平均値定理**で、変数上限関数が微分可能であることを証明する重要な成分である。

## 陳述

**定理（積分に関する平均値定理）。** $f : [a, b] \to \mathbb{R}$ を[連続](../../continuous_function/continuous/)とする。そうするとある $\xi \in [a, b]$ が存在して

$$
\int_a^b f(x)\,dx \;=\; f(\xi)\,(b - a).
$$

が成り立つ。

同等に、$[a, b]$ 上の $f$ の**平均値** $\dfrac{1}{b-a}\displaystyle\int_a^b f(x)\,dx$ は、ある内部点で $f$ によって達成される。

## 証明

$f$ が閉有界区間 $[a, b]$ で連続であるから、その最小値 $m \coloneqq \min_{[a,b]} f$ と最大値 $M \coloneqq \max_{[a,b]} f$ を達成する（極値定理）。[積分の単調性](../monotonicity_of_integral/)により、$f$ を定数関数 $m$ と $M$ と比較することで

$$
m(b - a) \;\leq\; \int_a^b f(x)\,dx \;\leq\; M(b - a).
$$

$b - a > 0$ で割ると：

$$
m \;\leq\; \frac{1}{b-a}\int_a^b f(x)\,dx \;\leq\; M.
$$

量 $\mu \coloneqq \dfrac{1}{b-a}\displaystyle\int_a^b f(x)\,dx$ は $[a, b]$ 上の $f$ の最小値と最大値の間にある。$f$ が $[a, b]$ で連続であるから、[中間値定理](../../continuous_function/intermediate_value_theorem/)はある $\xi \in [a, b]$ の存在を保証して $f(\xi) = \mu$ である。両方を $(b - a)$ で掛けると結果を得る。$\square$

## 加重版

より一般的な形式は、長さ $b - a$ を非負の加重関数に置き換える。

**定理（加重積分に関する平均値定理）。** $f : [a, b] \to \mathbb{R}$ を連続とし、$g : [a, b] \to \mathbb{R}$ を積分可能で、すべての $x \in [a, b]$ で $g(x) \geq 0$ とする。そうするとある $\xi \in [a, b]$ が存在して

$$
\int_a^b f(x)\,g(x)\,dx \;=\; f(\xi)\int_a^b g(x)\,dx.
$$

**証明。** 再び $m = \min_{[a,b]} f$ と $M = \max_{[a,b]} f$ とする。$g \geq 0$ と $m \leq f \leq M$ から、単調性により

$$
m \int_a^b g(x)\,dx \;\leq\; \int_a^b f(x)\,g(x)\,dx \;\leq\; M \int_a^b g(x)\,dx.
$$

**ケース1：** $\int_a^b g = 0$。次に左積分も 0（$0 \leq \int fg \leq 0$ から）であるから、任意の $\xi$ に対して方程式 $\int fg = f(\xi) \cdot 0$ は成り立つ。$\xi = a$ としよう。

**ケース2：** $\int_a^b g > 0$。不等式を $\int_a^b g$ で割ると

$$
m \;\leq\; \frac{\displaystyle\int_a^b f(x)\,g(x)\,dx}{\displaystyle\int_a^b g(x)\,dx} \;\leq\; M.
$$

IVT（前と同じ議論）により、ある $\xi \in [a, b]$ が存在して $f(\xi)$ がその比に等しい。$\square$

非加重定理は特別な場合 $g \equiv 1$ である。

## 幾何学的解釈：平均値

$[a, b]$ 上 $f$ の**平均値**を定義する

$$
\langle f \rangle \;\coloneqq\; \frac{1}{b - a}\int_a^b f(x)\,dx.
$$

幾何学的には、$\langle f \rangle$ は底辺 $[a, b]$ で面積が $\int_a^b f$ に等しい矩形の高さである。平均値定理は、この矩形が曲線下の領域と同じ面積を持つと述べる。異なる方法で述べると、連続関数はその平均を通す必要がある。

この解釈は**推定**に有用である。$f$ が $[a, b]$ で $m$ と $M$ の間に有界であると知っているなら、

$$
m \;\leq\; \langle f \rangle \;\leq\; M,
$$

正確に計算することなく積分を制限する。

## 計算例

**問題。** $\displaystyle\int_0^1 e^{-x^2}\,dx \in \bigl(e^{-1},\, 1\bigr)$ であることを示す。

**解答。** 関数 $f(x) = e^{-x^2}$ は連続で $[0,1]$ 上で厳密に減少し、$f(0) = 1$ と $f(1) = e^{-1}$ である。積分の単調性により、

$$
e^{-1} \cdot 1 \;\leq\; \int_0^1 e^{-x^2}\,dx \;\leq\; 1 \cdot 1,
$$

したがって積分は $[e^{-1}, 1]$ に属する。$f$ は厳密に減少し、定数ではないから、不等式は厳密である：

$$
\int_0^1 e^{-x^2}\,dx \;\in\; \bigl(e^{-1},\, 1\bigr).
$$

平均値定理は、ある $\xi \in (0, 1)$ に対して $e^{-\xi^2} = \int_0^1 e^{-x^2}\,dx$ であることを保証する — 閉じた形で見つけることはできなくても、その性質を満たす特定の $x$ 値がある。

**数値チェック。** 積分は約 0.7468 で、実際に $(e^{-1}, 1) \approx (0.368, 1)$ に属する。

## まとめ

- **積分に関する平均値定理**：$f$ が $[a, b]$ で連続なら、$\displaystyle\int_a^b f(x)\,dx = f(\xi)(b-a)$ がある $\xi \in [a, b]$ に対して成り立つ。
- **証明**：単調性からの限度 $m(b-a) \leq \int f \leq M(b-a)$、連続関数の IVT と組み合わせ、平均値が達成されることを保証する。
- **加重版**：$g \geq 0$ が積分可能なら、ある $\xi \in [a, b]$ に対して $\int fg = f(\xi)\int g$。
- **平均値**：$\langle f \rangle = \frac{1}{b-a}\int_a^b f$ は同じ面積の矩形の高さ；定理は $\xi$ 上で $f(\xi) = \langle f \rangle$。
- 定理は、変数上限関数の差分商を制限するために、ニュートン—ライプニッツの公式の証明で直接使われる。
