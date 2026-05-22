---
title: 広義積分の収束
summary: "広義積分の収束テストは無限級数のテストに相似する。このチェックポイントは比較テスト、極限比較テスト、コーシー収束判定法、および ∫_1^∞ (sin x) / x dx のような振動積分に対するアーベル—ディリクレテストを展開し、絶対対条件付き収束を定義する。"
prerequisites:
  - basis/math/calculus/riemann_integral/improper_integrals
  - basis/math/calculus/riemann_integral/second_mean_value_theorem_integral
aliases: []
tags:
  - 解析学
  - 積分
  - 広義積分
updated: 2026-05-22
---

<!-- TODO: 翻訳中 / Translation in progress -->

[広義積分](../improper_integrals/)では、固有積分の極限として $\int_a^\infty f$ を定義し、それを収束または発散として分類することを学んだ。多くの関数では、極限を直接計算するのは困難、あるいは不可能である。必要なのはテスト — 極限を明示的に評価することなく収束を決定できる基準である。これは無限級数の代わりに比較テストを使うのと同じ方法である。このチェックポイントはそれらのテストを展開し、最も簡単（比較）から最も微妙（振動被積分関数に対するアーベル—ディリクレ）まで組織する。

## コーシー収束判定法

基礎的な判定法は数列に対するコーシー判定法の直接類似である。

**定理（コーシー判定法）。** 広義積分 $\int_a^\infty f(x)\,dx$ が収束することと、すべての $\varepsilon > 0$ に対して $A \ge a$ が存在して、すべての $B > A$ に対して

$$
\left|\int_A^B f(x)\,dx\right| < \varepsilon.
$$

が成り立つことは同値である。

*証明スケッチ。* $F(t) = \int_a^t f(x)\,dx$ と定義する。積分が収束することと $\lim_{t \to \infty} F(t)$ が存在することは同値で、$F$ が極限の収束に対するコーシー条件を満たすことは同値である。$F(B) - F(A)| < \varepsilon$ （大きい $A, B$ に対して）。しかし $F(B) - F(A) = \int_A^B f$ であるから、これはまさに述べられた条件である。$\square$

コーシー判定法は特に振動積分に有用で、極限値を知らなくても、尾が小さいことを示す必要がある。

## 比較テスト

$f$ が非負のとき、積分の単調性は直接的な比較を可能にする。

**定理（比較テスト）。** すべての $x \ge a$ に対して $0 \le f(x) \le g(x)$ とする。

- $\int_a^\infty g(x)\,dx$ が収束するなら、$\int_a^\infty f(x)\,dx$ も収束して $\int_a^\infty f \le \int_a^\infty g$。
- $\int_a^\infty f(x)\,dx$ が発散するなら、$\int_a^\infty g(x)\,dx$ も発散する。

*証明。* $f \ge 0$ であるから、関数 $F(t) = \int_a^t f$ は増加している。$\int g$ が収束するなら、$F(t) \le \int_a^t g \le \int_a^\infty g < \infty$ （すべての $t$）。増加有界関数は有限の極限を持つから、$\int f$ は収束する。発散方向は対偶から従う。$\square$

**例。** $x \ge 1$ に対して、不等式 $e^{-x^2} \le e^{-x}$ が成り立つ （$x^2 \ge x$ であるから）。$\int_1^\infty e^{-x}\,dx = e^{-1}$ が収束するから、比較テストは $\int_1^\infty e^{-x^2}\,dx < \infty$ を与える。

## 極限比較テスト

時々、$f$ を単純な関数で直接制限することはできないが、その漸近的なサイズを比較できる。

**定理（極限比較テスト）。** $f(x), g(x) > 0$ （$x \ge a$）とし、

$$
\lim_{x \to \infty} \frac{f(x)}{g(x)} = L, \quad 0 < L < \infty.
$$

と仮定する。

そうするなら $\int_a^\infty f$ が収束することと $\int_a^\infty g$ が収束することは同値である。

*証明。* $f/g \to L$ であるから、ある $A$ が存在して $x \ge A$ に対して

$$
\frac{L}{2} \le \frac{f(x)}{g(x)} \le 2L,
$$

つまり、$\frac{L}{2}\,g(x) \le f(x) \le 2L\,g(x)$。$[A, \infty)$ に適用された通常の比較テストはそうするなら同値性を与える。$\square$

**例。** $f(x) = \frac{1}{x^2 + 1}$ を $g(x) = x^{-2}$ と比較する。そうするなら $f(x)/g(x) = x^2/(x^2+1) \to 1$。$\int_1^\infty x^{-2}\,dx$ は収束するから（$p = 2 > 1$ の $p$-積分），積分 $\int_1^\infty \frac{dx}{x^2+1}$ も収束する。

**境界ケース $L = 0$ または $L = \infty$。** $L = 0$ なら $f = o(g)$：$\int g$ の収束は $\int f$ の収束を含む，しかし逆は成り立たない。$L = \infty$ なら役割は反転する。

## 絶対対条件付き収束

**定義。** 積分 $\int_a^\infty f(x)\,dx$ が**絶対収束**であるとは、$\int_a^\infty |f(x)|\,dx$ が収束することである。これが**条件付き収束**であるとは，$\int_a^\infty f$ は収束するが $\int_a^\infty |f|$ は発散することである。

**命題。** 絶対収束は収束を含む。

*証明。* コーシー判定法と三角不等式から：

$$
\left|\int_A^B f\right| \le \int_A^B |f|.
$$

$\int |f|$ が収束するなら、$\int_A^B |f|$ を大きい $A$ に対して任意に小さくでき，同じ範囲は $|\int_A^B f|$ に適用される。$\square$

逆は失敗する。積分 $\int_1^\infty \frac{\sin x}{x}\,dx$ は条件付き収束である：それは収束するが，$\int_1^\infty \frac{|\sin x|}{x}\,dx = \infty$ （これは下で示される）。

## アーベル—ディリクレテスト

絶対収束が失敗する振動積分に対して，二つのテストが最も一般的な状況を扱う。どちらも級数に対応するテストの連続アナログである。

### ディリクレのテスト

**定理（ディリクレのテスト）。** 次を仮定する：
1. $F(x) \coloneqq \int_a^x f(t)\,dt$ は**有界**：ある $M$ が存在して $|F(x)| \le M$ （すべての $x \ge a$）。
2. $g$ は**単調減少**して $0$ に：$g(x) \to 0$ （$x \to \infty$）。

そうするなら $\int_a^\infty f(x)\,g(x)\,dx$ は収束する。

*証明。* $[A, B]$ にボンネの定理（[第二平均値定理](../second_mean_value_theorem_integral/)）を適用する。そうするとある $\xi \in [A, B]$ が存在して

$$
\int_A^B f(x)\,g(x)\,dx = g(A)\int_A^\xi f(x)\,dx + g(B)\int_\xi^B f(x)\,dx.
$$

が成り立つ。

$\int_A^\xi f = F(\xi) - F(A)$ であるから，$|\int_A^\xi f| \le 2M$。同様に $|\int_\xi^B f| \le 2M$。したがって

$$
\left|\int_A^B f(x)\,g(x)\,dx\right| \le 2M\,g(A) + 2M\,g(B) \le 4M\,g(A).
$$

$g(A) \to 0$ （$A \to \infty$）であるから，コーシー判定法は満たされる。$\square$

### アーベルのテスト

**定理（アーベルのテスト）。** 次を仮定する：
1. $\int_a^\infty f(x)\,dx$ は**収束**。
2. $g$ は $[a, \infty)$ で**単調**で**有界**。

そうするなら $\int_a^\infty f(x)\,g(x)\,dx$ は収束する。

*証明。* $g$ は単調で有界であるから，有限の極限 $L = \lim_{x \to \infty} g(x)$ を持つ。$g = (g - L) + L$ と書く。関数 $g - L$ は単調で 0 に向かい，$L$ は定数。したがって

$$
\int_a^\infty f g = L \int_a^\infty f + \int_a^\infty f\,(g - L).
$$

最初の積分は仮説により収束する。二番目は $g - L$ にディリクレのテストを適用して収束する （その原始関数 $F(x) = \int_a^x f$ は有界である。$\int_a^\infty f$ が収束するから，コーシー判定法で）。$\square$

## 計算例

### $\int_1^\infty \frac{\sin x}{x}\,dx$ は収束（ディリクレ）

$f(x) = \sin x$ と $g(x) = 1/x$ と設定する。その原始関数 $F(x) = -\cos x + \cos 1$ は $|F(x)| \le 2$ （すべての $x$）を満たし、$g(x) = 1/x \searrow 0$。ディリクレのテストにより，$\int_1^\infty \frac{\sin x}{x}\,dx$ は収束する。

### $\int_1^\infty \frac{\sin x}{x^2}\,dx$ は絶対収束

すべての $x$ に対して，$\left|\frac{\sin x}{x^2}\right| \le \frac{1}{x^2}$。$\int_1^\infty x^{-2}\,dx$ は収束するから（$p = 2 > 1$），比較テストは絶対収束を与える。

### $\int_1^\infty \frac{dx}{x}$ は発散

これは[広義積分](../improper_integrals/)からのタイプ1の $p = 1$ ケースである。$\ln b \to \infty$ であるから，積分は発散する。

### $\int_1^\infty \frac{|\sin x|}{x}\,dx$ は発散

各区間 $[k\pi, (k+1)\pi]$ 上で，$|\sin x| \ge 0$ で $\int_{k\pi}^{(k+1)\pi} |\sin x|\,dx = 2$。この区間上で $\frac{1}{x} \ge \frac{1}{(k+1)\pi}$ であるから，

$$
\int_{k\pi}^{(k+1)\pi} \frac{|\sin x|}{x}\,dx \ge \frac{2}{(k+1)\pi}.
$$

右側は発散級数 $\sum 1/(k+1)$ の一般項であるから，比較テストにより積分は発散する。これは $\int_1^\infty \frac{\sin x}{x}\,dx$ が条件付きだが絶対収束ではないことを確認する。

## まとめ

- **コーシー判定法**：$\int_a^\infty f$ が収束することと $|\int_A^B f|$ が大きい $A$ に対して任意に小さくできることは同値。
- **比較テスト**：$0 \le f \le g$ に対して，$\int g$ の収束は $\int f$ の収束を含む；$\int f$ の発散は $\int g$ の発散を含む。
- **極限比較テスト**：$f, g > 0$ で $f/g \to L \in (0, \infty)$ なら，$\int f$ と $\int g$ は共に収束または共に発散。
- **絶対収束**（$\int |f| < \infty$）は収束を含む；逆は失敗。
- **ディリクレのテスト**：有界な $F(x) = \int_a^x f$ プラス $g \searrow 0$ は $\int fg$ の収束を保証。
- **アーベルのテスト**：収束した $\int f$ プラス単調有界な $g$ は $\int fg$ の収束を保証。
- $\int_1^\infty \frac{\sin x}{x}\,dx$ は条件付き収束（ディリクレ）；$\int_1^\infty \frac{\sin x}{x^2}\,dx$ は絶対収束（比較）；$\int_1^\infty \frac{dx}{x}$ と $\int_1^\infty \frac{|\sin x|}{x}\,dx$ は両方とも発散。
