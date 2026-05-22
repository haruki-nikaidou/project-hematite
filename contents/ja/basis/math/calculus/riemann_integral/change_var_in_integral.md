---
title: 積分の変数変換
summary: "φ が [α, β] で連続微分可能で φ([α, β]) ⊆ [a, b]、f が [a, b] で連続のとき、∫_α^β f(φ(t)) φ'(t) dt = ∫_{φ(α)}^{φ(β)} f(x) dx が成り立つ。このチェックポイントはチェーンルール プラス ニュートン—ライプニッツから置換ルールを導出し、定義積分形式と不定積分形式の両方を扱う。"
prerequisites:
  - basis/math/calculus/riemann_integral/newton_leibniz_formula
  - basis/math/calculus/differential/chain_rule
aliases: []
tags:
  - 解析学
  - 積分
updated: 2026-05-22
---

<!-- TODO: 翻訳中 / Translation in progress -->

$\int_0^1 2x(x^2+1)^3\,dx$ を計算したいとしよう。$(x^2+1)^3$ を展開して項ごとに積分することは可能だが面倒である。重要な観察は $2x$ が正確に $x^2+1$ の導関数であるから、被積分関数は $\varphi(t) = t^2 + 1$ と $f(x) = x^3$ で $f(\varphi(t))\,\varphi'(t)$ の形を持つ。**変数変換**（置換）ルールは、積分の変数を置き換えることができることを述べる。$\int_1^2 x^3\,dx$ を得られる。これは直接的である。このチェックポイントはその操作を正確にしてそれを証明する。

## 形式的陳述

$\varphi: [\alpha, \beta] \to \mathbb{R}$ を連続微分可能（つまり $\varphi \in C^1[\alpha,\beta]$）で、$\varphi([\alpha,\beta]) \subseteq [a,b]$ であるとする。$f: [a,b] \to \mathbb{R}$ を連続とする。そうするなら

$$
\int_\alpha^\beta f(\varphi(t))\,\varphi'(t)\,dt = \int_{\varphi(\alpha)}^{\varphi(\beta)} f(x)\,dx.
$$

が成り立つ。

右での限度は $\varphi(\alpha)$ と $\varphi(\beta)$ であり、必ずしも $a$ と $b$ ではないことに注意。$\varphi$ は単射である必要がない。唯一の要件は、$\varphi$ が $[\alpha, \beta]$ を $[a, b]$ に写し、$\varphi$ が $C^1$ で、$f$ が連続であることである。

## チェーンルール経由の証明

$f$ は $[a, b]$ で連続であるから、[ニュートン—ライプニッツの公式](../newton_leibniz_formula/)により、$F'(x) = f(x)$ をすべての $x \in [a, b]$ で満たすような原始関数 $F$ が存在する。

合成関数 $H(t) \coloneqq F(\varphi(t))$ を考える。[チェーンルール](../../differential/chain_rule/)により、

$$
H'(t) = F'(\varphi(t))\,\varphi'(t) = f(\varphi(t))\,\varphi'(t).
$$

$\varphi$ は $C^1$ で $f$ は連続であるから、積 $f(\varphi(t))\,\varphi'(t)$ は $[\alpha, \beta]$ で連続であるから、$H$ は $[\alpha, \beta]$ 上で $f(\varphi(t))\,\varphi'(t)$ の原始関数である。左辺にニュートン—ライプニッツを適用する：

$$
\int_\alpha^\beta f(\varphi(t))\,\varphi'(t)\,dt = H(\beta) - H(\alpha) = F(\varphi(\beta)) - F(\varphi(\alpha)).
$$

右辺にニュートン—ライプニッツを適用する：

$$
\int_{\varphi(\alpha)}^{\varphi(\beta)} f(x)\,dx = F(\varphi(\beta)) - F(\varphi(\alpha)).
$$

両辺は等しい。$\square$

ニュートン—ライプニッツとチェーンルールを持つと、証明は驚くほど短い。置換ルールの全体の内容は、原始関数を含む合成に適用されたチェーンルールそのものである。

## 不定積分形式と「戻す」ステップ

不定積分については、変数変換ルールは形式をとる

$$
\int f(\varphi(t))\,\varphi'(t)\,dt = \int f(x)\,dx\bigg|_{x = \varphi(t)} = F(\varphi(t)) + C,
$$

ここで $F$ は $f$ の原始関数である。実際には、置換 $x = \varphi(t)$、$dx = \varphi'(t)\,dt$ を実行し、新しい変数で $\int f(x)\,dx$ を評価して $F(x) + C$ を得て、次に$x = \varphi(t)$ で元の変数で答えを表現するために**戻す**。

定義積分の場合、戻す必要がない。限度は直接変換されるから。$t = \alpha$ は下限 $x = \varphi(\alpha)$ を与え、$t = \beta$ は上限 $x = \varphi(\beta)$ を与える。

## 置換パターン

### 線形置換

$ax + b$ を含む積分については、$x = \varphi(t) = at + b$ と設定するから、$\varphi'(t) = a$ で $dx = a\,dt$ である。これは

$$
\int f(ax + b)\,dx = \frac{1}{a}\int f(u)\,du\bigg|_{u = ax+b}.
$$

を与える。

例えば、$\int e^{2x+3}\,dx = \dfrac{1}{2}e^{2x+3} + C$。

### 三角置換

被積分関数が $\sqrt{a^2 - x^2}$ を含むとき、$x = a\sin\theta$ （$\theta \in [-\pi/2, \pi/2]$）と設定する。次に

$$
\sqrt{a^2 - x^2} = \sqrt{a^2 - a^2\sin^2\theta} = a\cos\theta \quad (\cos\theta \geq 0 \text{ だから}),
$$

そして $dx = a\cos\theta\,d\theta$。根号は完全に除去される。

同様に、$\sqrt{a^2 + x^2}$ については $x = a\tan\theta$ を使用し、$\sqrt{x^2 - a^2}$ については $x = a/\cos\theta = a\sec\theta$ を使用する。

### 逆置換（$t$-置換）

時々、新しい変数の明示的な関数として $x = \varphi(t)$ を設定するのがより自然である — 例えば、式を有理化したり有理被積分関数を扱ったりするため。$\varphi$ が $C^1$ で範囲条件が満たされる限り、同じ公式は役割が入れ替わった状態で適用される。$t$ の積分を計算して、必要に応じて $t = \varphi^{-1}(x)$ で戻す。

## 計算例

### 例1：$\int_0^1 2x(x^2+1)^3\,dx$

$u = x^2 + 1$ と設定するから、$du = 2x\,dx$。$x = 0$ のときは $u = 1$；$x = 1$ のときは $u = 2$。積分は

$$
\int_0^1 2x(x^2+1)^3\,dx = \int_1^2 u^3\,du = \left[\frac{u^4}{4}\right]_1^2 = \frac{16}{4} - \frac{1}{4} = \frac{15}{4}.
$$

に変換される。

### 例2：$\int_0^1 \sqrt{1 - x^2}\,dx$

これは単位円の四分の一の面積であり、これが $\pi/4$ であることを既に知っている。三角置換を使ってこれを確認しよう。$x = \sin\theta$ と設定するから、$dx = \cos\theta\,d\theta$ で $\sqrt{1-x^2} = \cos\theta$。$x = 0$ のときは $\theta = 0$；$x = 1$ のときは $\theta = \pi/2$。積分は

$$
\int_0^{\pi/2} \cos\theta \cdot \cos\theta\,d\theta = \int_0^{\pi/2} \cos^2\theta\,d\theta.
$$

となる。

二倍角恒等式 $\cos^2\theta = \dfrac{1 + \cos 2\theta}{2}$ を使用すると：

$$
\int_0^{\pi/2} \frac{1 + \cos 2\theta}{2}\,d\theta
= \left[\frac{\theta}{2} + \frac{\sin 2\theta}{4}\right]_0^{\pi/2}
= \frac{\pi/2}{2} + \frac{\sin\pi}{4} - 0
= \frac{\pi}{4}.
$$

### 例3：$\int \dfrac{dx}{1 + e^x}$

$u = e^x$ と設定するから、$du = e^x\,dx = u\,dx$、したがって $dx = \dfrac{du}{u}$。代入すると：

$$
\int \frac{dx}{1 + e^x} = \int \frac{1}{1 + u}\cdot\frac{du}{u} = \int \frac{du}{u(1+u)}.
$$

部分分数：$\dfrac{1}{u(1+u)} = \dfrac{1}{u} - \dfrac{1}{1+u}$。積分すると：

$$
\int \left(\frac{1}{u} - \frac{1}{1+u}\right)du = \ln u - \ln(1+u) + C = \ln\frac{u}{1+u} + C.
$$

$u = e^x$ に戻すと：

$$
\int \frac{dx}{1+e^x} = \ln\frac{e^x}{1+e^x} + C = x - \ln(1 + e^x) + C.
$$

（最後の等式は $\ln(e^x) = x$ を使用。）

## まとめ

- **変数変換定理**：$\varphi \in C^1[\alpha,\beta]$ で $\varphi([\alpha,\beta]) \subseteq [a,b]$ で $f$ が $[a,b]$ で連続なら、$\int_\alpha^\beta f(\varphi(t))\,\varphi'(t)\,dt = \int_{\varphi(\alpha)}^{\varphi(\beta)} f(x)\,dx$。
- 証明は、[チェーンルール](../../differential/chain_rule/)を使用して $F(\varphi(t))$ を微分し、次に両辺に[ニュートン—ライプニッツの公式](../newton_leibniz_formula/)を適用する。
- **定義積分**については、限度を直接変換する。$t = \alpha \mapsto x = \varphi(\alpha)$、$t = \beta \mapsto x = \varphi(\beta)$；戻す必要がない。
- **不定積分**については、$\int f(x)\,dx = F(x) + C$ を評価した後、元の変数で答えを表現するために $x = \varphi(t)$ で戻す。
- **線形置換** $u = ax + b$ は最も簡単なケースで、$1/a$ の因子を導入する。
- **三角置換** $x = a\sin\theta$ （または $a\tan\theta$、$a\sec\theta$）は二次式の平方根を除去する。
- **逆置換**（$x = \varphi(t)$ を明示的に設定）は、複雑な被積分関数（$e^x$ を介して $u = e^x$ を含むもの）を有理化できる。
