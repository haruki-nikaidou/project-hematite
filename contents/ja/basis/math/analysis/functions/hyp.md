---
title: 双曲線関数とその逆関数
summary: "指数関数から sinh、cosh、tanh を定義し、基本恒等式・加法公式・導関数を確立した後、逆双曲線関数を対数による閉じた形の式として導く。"
prerequisites:
  - basis/math/analysis/functions/exp
  - basis/math/analysis/functions/log
aliases: []
tags: ["Elementary Function"]
updated: 2026-05-13
---

$(\cos\theta, \sin\theta)$ が $\theta$ を変化させるにつれて単位円 $x^2 + y^2 = 1$ を描くように、**双曲線関数（hyperbolic functions）**は単位双曲線 $x^2 - y^2 = 1$ をパラメータ表示する：点 $(\cosh t, \sinh t)$ はすべての実数 $t$ に対してその双曲線上にある。幾何学的な描像のほか、これらは微分方程式 $y'' = y$ の解として自然に現れ、垂れ下がるケーブルの形（*カテナリー（catenary）*）を記述し、特殊相対性理論のローレンツ変換にも登場する。三角関数と違って周期をもたない——直接[指数関数](../exp/)から構成されるからだ。

## 定義

**双曲線余弦（hyperbolic cosine）**と**双曲線正弦（hyperbolic sine）**を次で定義する：

$$
\cosh x \coloneqq \frac{e^x + e^{-x}}{2}, \qquad \sinh x \coloneqq \frac{e^x - e^{-x}}{2}. \tag{1}
$$

$\cosh x$ は指数関数の*偶数部*、$\sinh x$ は*奇数部*と考えられる——$e^x = \cosh x + \sinh x$ かつ $e^{-x} = \cosh x - \sinh x$ が成り立つからだ。

残りの4つの双曲線関数はこの2つの比として定義される：

$$
\tanh x \coloneqq \frac{\sinh x}{\cosh x}, \qquad
\operatorname{coth} x \coloneqq \frac{\cosh x}{\sinh x},
$$

$$
\operatorname{sech} x \coloneqq \frac{1}{\cosh x}, \qquad
\operatorname{csch} x \coloneqq \frac{1}{\sinh x}.
$$

$\sinh 0 = 0$ なので、$\operatorname{coth} x$ と $\operatorname{csch} x$ は $x = 0$ で未定義であることに注意。

## 基本恒等式

双曲線関数間の中心的な代数的関係は：

$$
\cosh^2 x - \sinh^2 x = 1.
$$

*導出。* 定義 $(1)$ を代入すると：

$$
\cosh^2 x - \sinh^2 x
= \left(\frac{e^x + e^{-x}}{2}\right)^{\!2} - \left(\frac{e^x - e^{-x}}{2}\right)^{\!2}
= \frac{(e^x + e^{-x})^2 - (e^x - e^{-x})^2}{4}.
$$

代数的恒等式 $(a + b)^2 - (a - b)^2 = 4ab$ を $a = e^x$, $b = e^{-x}$ で使うと分子は $4e^x e^{-x} = 4e^0 = 4$ になる。$4$ で割ると $1$ が得られる。$\square$

これは円の恒等式 $\cos^2\theta + \sin^2\theta = 1$ と対応しており、$(\cosh t,\, \sinh t)$ がすべての実数 $t$ で $x^2 - y^2 = 1$ を満たすことを確認している。

## 加法公式

すべての実数 $x$ と $y$ に対して：

$$
\cosh(x + y) = \cosh x \cosh y + \sinh x \sinh y,
$$

$$
\sinh(x + y) = \sinh x \cosh y + \cosh x \sinh y.
$$

定義 $(1)$ を代入して展開することでこれらを確認できる。円関数の公式 $\cos(x+y) = \cos x\cos y - \sin x\sin y$, $\sin(x+y) = \sin x\cos y + \cos x\sin y$ と比較すると：$\cosh$ の加法公式はコサインの公式に比べて符号が $-$ から $+$ に変わっている。この符号の違いは基本恒等式の符号の差（$\cosh^2 - \sinh^2 = 1$ に対して $\cos^2 + \sin^2 = 1$）の直接の帰結だ。

## 導関数

定義 $(1)$ を $x$ に関して項ごとに微分すると：

$$
(\cosh x)' = \frac{e^x - e^{-x}}{2} = \sinh x,
\qquad
(\sinh x)' = \frac{e^x + e^{-x}}{2} = \cosh x.
$$

$\sinh$ と $\cosh$ は互いの導関数だ——符号の変化を伴って交互になる $\sin$ と $\cos$ と対照的に、こちらは単純に入れ替わる。

$\tanh$ については商の微分法を適用し、基本恒等式を使う：

$$
(\tanh x)'
= \frac{(\sinh x)'\cosh x - \sinh x\,(\cosh x)'}{\cosh^2 x}
= \frac{\cosh^2 x - \sinh^2 x}{\cosh^2 x}
= \frac{1}{\cosh^2 x}
= \operatorname{sech}^2 x.
$$

基本恒等式を再度使うと $\operatorname{sech}^2 x = 1 - \tanh^2 x$ という別形が得られるので：

$$
(\tanh x)' = \operatorname{sech}^2 x = 1 - \tanh^2 x.
$$

残り3つの関数の導関数は商の微分法と連鎖律から従う：

$$
(\operatorname{coth} x)' = -\operatorname{csch}^2 x, \qquad
(\operatorname{sech} x)' = -\operatorname{sech} x\tanh x, \qquad
(\operatorname{csch} x)' = -\operatorname{csch} x\operatorname{coth} x.
$$

## $\cosh$ と $\sinh$ の性質

- $\cosh$ は**偶関数（even）**：$\cosh(-x) = \cosh x$。AM–GM 不等式より $e^x + e^{-x} \geq 2\sqrt{e^x \cdot e^{-x}} = 2$ なので、すべての $x \in \mathbb{R}$ で $\cosh x \geq 1$ であり、等号は $x = 0$ のときだけ成立する。$y = \cosh x$ のグラフは*カテナリー*——重力の下で垂れ下がる一様な柔軟なチェーンの形だ。
- $\sinh$ は**奇関数（odd）**：$\sinh(-x) = -\sinh x$。$(\sinh x)' = \cosh x \geq 1 > 0$ なので $\mathbb{R}$ 全体で狭義単調増加であり、値域は $\mathbb{R}$ だ。
- $\tanh$ は奇関数かつ狭義単調増加で、$\mathbb{R}$ から開区間 $(-1, 1)$ への全射だ。$x \to \pm\infty$ のとき $e^{-|x|} \to 0$ なので $\tanh x \to \pm 1$ となり、$y = \pm 1$ が水平漸近線になる。

## 逆双曲線関数

$\sinh$ は $\mathbb{R}$ 上で狭義単調増加だから大域的な逆関数をもつ。$\cosh$ は $[0, \infty)$ に制限するとそこで狭義単調増加になる。$\tanh$ は自然な定義域が $\mathbb{R}$ で値域が $(-1, 1)$ だ。

注目すべき特徴は、3つの逆関数すべてが[対数](../log/)を使った**閉じた形の式（closed-form expression）**をもつことだ。

### arsinh

$y = \sinh x = \dfrac{e^x - e^{-x}}{2}$ と置き $x$ について解く。両辺に $2e^x$ を掛けると：

$$
e^{2x} - 2y\,e^x - 1 = 0.
$$

これは $e^x$ についての2次方程式だ。2次方程式の公式より $e^x = y \pm \sqrt{y^2 + 1}$。$e^x > 0$ かつ $\sqrt{y^2+1} > |y|$ なので正の根だけが有効だ。対数をとると：

$$
\operatorname{arsinh} x \coloneqq \ln\!\left(x + \sqrt{x^2 + 1}\right), \qquad x \in \mathbb{R}.
$$

### arcosh

$y = \cosh x = \dfrac{e^x + e^{-x}}{2}$（$x \geq 0$）と置き解く。$2e^x$ を掛けると：

$$
e^{2x} - 2y\,e^x + 1 = 0,
$$

よって $e^x = y \pm \sqrt{y^2 - 1}$。これは $y \geq 1$ を要求する。$x \geq 0$ に対応するのは大きい方の根なので $+$ 符号を選ぶ。対数をとると：

$$
\operatorname{arcosh} x \coloneqq \ln\!\left(x + \sqrt{x^2 - 1}\right), \qquad x \geq 1.
$$

### artanh

$y = \tanh x = \dfrac{e^x - e^{-x}}{e^x + e^{-x}}$ と置き解く。$u = e^{2x}$ と書くと：

$$
y = \frac{u - 1}{u + 1}
\quad\Longrightarrow\quad
y(u + 1) = u - 1
\quad\Longrightarrow\quad
u = \frac{1 + y}{1 - y}.
$$

$u = e^{2x}$ なので対数をとると $2x = \ln\!\dfrac{1+y}{1-y}$、したがって：

$$
\operatorname{artanh} x \coloneqq \frac{1}{2}\ln\frac{1 + x}{1 - x}, \qquad |x| < 1.
$$

制限 $|x| < 1$ は $\tanh$ の値域と一致し、対数の中の $1 + x$ と $1 - x$ を両方正に保つ。

## 逆双曲線関数の導関数

対数表示を直接微分するか逆関数定理を使うかで求められる。両方の方法を以下に示す。

### arsinh の導関数

$\operatorname{arsinh} x = \ln\!\left(x + \sqrt{x^2+1}\right)$ を微分すると：

$$
(\operatorname{arsinh} x)'
= \frac{1}{x + \sqrt{x^2+1}} \cdot \left(1 + \frac{x}{\sqrt{x^2+1}}\right)
= \frac{1}{x + \sqrt{x^2+1}} \cdot \frac{x + \sqrt{x^2+1}}{\sqrt{x^2+1}}
= \frac{1}{\sqrt{x^2+1}}.
$$

$$
\operatorname{arsinh}'(x) = \frac{1}{\sqrt{x^2 + 1}}, \qquad x \in \mathbb{R}.
$$

### arcosh の導関数

$x > 1$ で $\operatorname{arcosh} x = \ln\!\left(x + \sqrt{x^2-1}\right)$ を微分すると：

$$
(\operatorname{arcosh} x)'
= \frac{1}{x + \sqrt{x^2-1}} \cdot \left(1 + \frac{x}{\sqrt{x^2-1}}\right)
= \frac{1}{x + \sqrt{x^2-1}} \cdot \frac{x + \sqrt{x^2-1}}{\sqrt{x^2-1}}
= \frac{1}{\sqrt{x^2-1}}.
$$

$$
\operatorname{arcosh}'(x) = \frac{1}{\sqrt{x^2 - 1}}, \qquad x > 1.
$$

### artanh の導関数

$|x| < 1$ で $\operatorname{artanh} x = \dfrac{1}{2}\ln(1+x) - \dfrac{1}{2}\ln(1-x)$ と書いて微分すると：

$$
(\operatorname{artanh} x)'
= \frac{1}{2} \cdot \frac{1}{1+x} + \frac{1}{2} \cdot \frac{1}{1-x}
= \frac{1}{2} \cdot \frac{(1-x) + (1+x)}{(1+x)(1-x)}
= \frac{1}{1 - x^2}.
$$

$$
\operatorname{artanh}'(x) = \frac{1}{1 - x^2}, \qquad |x| < 1.
$$

[逆三角関数](../inv_trigonometric_functions/)の $\arctan'(x) = \dfrac{1}{1+x^2}$ と比較すると違いは分母の符号だけだ——これは $\cosh^2 - \sinh^2 = 1$ と $\cos^2 + \sin^2 = 1$ の符号の違いを反映している。

## 導関数の一覧

6つの双曲線関数の導関数をまとめておく：

| 関数 | 導関数 |
|---|---|
| $\sinh x$ | $\cosh x$ |
| $\cosh x$ | $\sinh x$ |
| $\tanh x$ | $\operatorname{sech}^2 x$ |
| $\operatorname{coth} x$ | $-\operatorname{csch}^2 x$ |
| $\operatorname{sech} x$ | $-\operatorname{sech} x\tanh x$ |
| $\operatorname{csch} x$ | $-\operatorname{csch} x\operatorname{coth} x$ |

## まとめ

- **双曲線関数**は指数関数を通じて定義される：$\cosh x \coloneqq \dfrac{e^x+e^{-x}}{2}$、$\sinh x \coloneqq \dfrac{e^x-e^{-x}}{2}$、$\tanh x \coloneqq \dfrac{\sinh x}{\cosh x}$。
- **基本恒等式** $\cosh^2 x - \sinh^2 x = 1$ はピタゴラスの恒等式と対応し、$(\cosh t, \sinh t)$ が単位双曲線上にあることを示す。
- **導関数**：$(\sinh x)' = \cosh x$、$(\cosh x)' = \sinh x$、$(\tanh x)' = \operatorname{sech}^2 x$。
- $\cosh$ は**偶関数**で $\cosh x \geq 1$；$\sinh$ は**奇関数**で値域が $\mathbb{R}$ の狭義単調増加；$\tanh$ は $\mathbb{R}$ から $(-1, 1)$ への全射。
- **逆双曲線関数**は対数を使った閉じた形で代数的に導かれる：
  - $\operatorname{arsinh} x = \ln\!\left(x + \sqrt{x^2+1}\right)$（$\mathbb{R}$ 上で定義）。
  - $\operatorname{arcosh} x = \ln\!\left(x + \sqrt{x^2-1}\right)$（$[1, \infty)$ 上で定義）。
  - $\operatorname{artanh} x = \dfrac{1}{2}\ln\dfrac{1+x}{1-x}$（$(-1, 1)$ 上で定義）。
- その導関数 $\dfrac{1}{\sqrt{x^2+1}}$、$\dfrac{1}{\sqrt{x^2-1}}$、$\dfrac{1}{1-x^2}$ は逆三角関数の導関数と密接に対応しており、違いは平方根の中と分母の符号だけだ。
