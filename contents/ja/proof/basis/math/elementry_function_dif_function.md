---
title: 初等関数の微分
summary: "すべての初等関数は定義域のどこでも微分可能で、その微分係数は再び初等関数だ。このチェックポイントでは2つの基本極限を出発点として、指数・対数・三角・逆三角・双曲線・逆双曲線の全初等関数の微分係数を証明する。"
prerequisites:
  - basis/math/analysis/functions/elementary_function
  - basis/math/calculus/differential/basic_roles_of_dif
  - basis/math/calculus/differential/chain_rule
  - basis/math/calculus/differential/dif_inv_function
aliases: []
tags:
  - Proof
  - Differentiation
  - Elementary Function
updated: 2026-05-20
---

すべての[初等関数](../../../../basis/math/analysis/functions/elementary_function/)はその定義域内のどこでも微分可能であり、その微分係数は再び初等関数だ。このチェックポイントではその証明を集める：2つの基本的な極限から出発して、指数関数・対数・すべての三角関数と逆三角関数・すべての双曲線関数と逆双曲線関数の微分係数を導出する。

## 2つの基本的な極限

以下の証明はすべて2つの極限に基づく。

**補題1。** $\displaystyle\lim_{h \to 0} \frac{e^h - 1}{h} = 1$。

*証明。* $u = e^h - 1$ と置換すると $h = \ln(1+u)$ であり $h \to 0$ のとき $u \to 0$：

$$
\frac{e^h - 1}{h} \;=\; \frac{u}{\ln(1+u)}.
$$

不等式 $\dfrac{x}{1+x} \leq \ln(1+x) \leq x$（$x > -1$）を $u$ で割ると：

$$
\frac{1}{1+u} \;\leq\; \frac{\ln(1+u)}{u} \;\leq\; 1.
$$

$u \to 0^+$ で左辺は $1$ に収束するので、はさみうちの定理より $\ln(1+u)/u \to 1$。$u \to 0^-$ の場合も対称性から同様。ゆえに $\dfrac{u}{\ln(1+u)} \to 1$。$\square$

**補題2。** $\displaystyle\lim_{h \to 0} \frac{\sin h}{h} = 1$。

*証明。* $0 < h < \pi/2$ に対して単位円内の面積を比較する：

$$
\tfrac{1}{2}\sin h \;\leq\; \tfrac{h}{2} \;\leq\; \tfrac{1}{2}\tan h.
$$

$\tfrac{1}{2}\sin h > 0$ で割って逆数をとると：

$$
\cos h \;\leq\; \frac{\sin h}{h} \;\leq\; 1.
$$

$h \to 0^+$ で $\cos h \to 1$ なので、はさみうちの定理より $\sin h / h \to 1$。$h \to 0^-$ の場合は $\sin(-h)/(-h) = \sin h/h$ から従う。$\square$

補題2から $\displaystyle\lim_{h \to 0}\frac{\cos h - 1}{h} = 0$ も導かれる：

$$
\frac{\cos h - 1}{h} \;=\; -\frac{\sin(h/2)}{h/2} \cdot \sin(h/2) \;\to\; -1 \cdot 0 \;=\; 0.
$$

## 指数関数と対数の微分係数

### 自然指数関数

$$
\frac{d}{dx}(e^x) \;=\; e^x.
$$

*証明。* 補題1より：

$$
\lim_{h\to 0}\frac{e^{x+h}-e^x}{h} \;=\; e^x \lim_{h\to 0}\frac{e^h-1}{h} \;=\; e^x. \;\square
$$

### 一般の指数関数

$a > 0$, $a \neq 1$ のとき $a^x = e^{x\ln a}$ と書き、連鎖律を適用する：

$$
\frac{d}{dx}(a^x) \;=\; e^{x\ln a} \cdot \ln a \;=\; a^x \ln a.
$$

### 自然対数

[逆関数の微分則](../../../../basis/math/calculus/differential/dif_inv_function/)を $e^x$ に適用する：

$$
\frac{d}{dx}(\ln x) \;=\; \frac{1}{e^{\ln x}} \;=\; \frac{1}{x}, \quad x > 0.
$$

### 一般冪 $x^\alpha$

$x > 0$ と $\alpha \in \mathbb{R}$ に対して $x^\alpha = e^{\alpha \ln x}$ と書き、連鎖律を適用する：

$$
\frac{d}{dx}(x^\alpha) \;=\; e^{\alpha\ln x} \cdot \frac{\alpha}{x} \;=\; \alpha x^{\alpha - 1}.
$$

これは整数の冪乗則を実数の指数に拡張する。

### 一般対数

底の変換公式 $\log_a x = \ln x / \ln a$ より：

$$
\frac{d}{dx}(\log_a x) \;=\; \frac{1}{x \ln a}.
$$

## 三角関数の微分係数

### サイン

$$
\frac{d}{dx}(\sin x) \;=\; \cos x.
$$

*証明。* 加法公式 $\sin(x+h) = \sin x \cos h + \cos x \sin h$ を使う：

$$
\frac{\sin(x+h)-\sin x}{h} \;=\; \sin x \cdot \frac{\cos h - 1}{h} + \cos x \cdot \frac{\sin h}{h}.
$$

$h \to 0$ で両補題より $(\cos h - 1)/h \to 0$、$(\sin h)/h \to 1$ なので極限は $\cos x$。$\square$

### コサイン

$$
\frac{d}{dx}(\cos x) \;=\; -\sin x.
$$

*証明。* $\cos(x+h) = \cos x \cos h - \sin x \sin h$ を使う：

$$
\frac{\cos(x+h)-\cos x}{h} \;=\; \cos x \cdot \frac{\cos h-1}{h} - \sin x \cdot \frac{\sin h}{h} \;\to\; -\sin x. \;\square
$$

### タンジェントとコタンジェント

$\tan x = \sin x / \cos x$ と $\cot x = \cos x / \sin x$ に商の微分法則を適用する：

$$
\frac{d}{dx}(\tan x) \;=\; \frac{\cos^2 x + \sin^2 x}{\cos^2 x} \;=\; \sec^2 x, \qquad x \neq \tfrac{\pi}{2}+n\pi,
$$

$$
\frac{d}{dx}(\cot x) \;=\; -\csc^2 x, \qquad x \neq n\pi.
$$

## 逆三角関数の微分係数

4つすべてが[逆関数の微分則](../../../../basis/math/calculus/differential/dif_inv_function/)とピタゴラス恒等式から従う。

| 関数 | 定義域 | 微分係数 |
|---|---|---|
| $\arcsin x$ | $(-1,1)$ | $\dfrac{1}{\sqrt{1-x^2}}$ |
| $\arccos x$ | $(-1,1)$ | $\dfrac{-1}{\sqrt{1-x^2}}$ |
| $\arctan x$ | $\mathbb{R}$ | $\dfrac{1}{1+x^2}$ |
| $\text{arccot}\, x$ | $\mathbb{R}$ | $\dfrac{-1}{1+x^2}$ |

最後の項：$(\cot x)' = -\csc^2 x = -(1+\cot^2 x)$ なので $x = \cot t$ で逆関数の微分則を使えば $(\text{arccot}\, x)' = -1/(1+x^2)$。

## 双曲線関数の微分係数

$\sinh x = \dfrac{e^x-e^{-x}}{2}$、$\cosh x = \dfrac{e^x+e^{-x}}{2}$ を $(e^x)' = e^x$、$(e^{-x})' = -e^{-x}$ を使って項ごとに微分する：

$$
\frac{d}{dx}(\sinh x) \;=\; \cosh x, \qquad \frac{d}{dx}(\cosh x) \;=\; \sinh x.
$$

$\tanh x = \sinh x / \cosh x$ に商の微分法則を適用する：

$$
\frac{d}{dx}(\tanh x) \;=\; \frac{\cosh^2 x - \sinh^2 x}{\cosh^2 x} \;=\; \text{sech}^2 x.
$$

同様に $(\text{coth}\, x)' = -\text{csch}^2 x$（$x \neq 0$）。

## 逆双曲線関数の微分係数

逆双曲線関数の対数表現を使えば微分係数が容易に計算できる。

**arsinh。** $\text{arsinh}\, x = \ln(x+\sqrt{x^2+1})$ なので：

$$
(\text{arsinh}\, x)' \;=\; \frac{1+\tfrac{x}{\sqrt{x^2+1}}}{x+\sqrt{x^2+1}} \;=\; \frac{\sqrt{x^2+1}+x}{(x+\sqrt{x^2+1})\sqrt{x^2+1}} \;=\; \frac{1}{\sqrt{x^2+1}}.
$$

**arcosh。** $x > 1$ で $\text{arcosh}\, x = \ln(x+\sqrt{x^2-1})$ なので：

$$
(\text{arcosh}\, x)' \;=\; \frac{1+\tfrac{x}{\sqrt{x^2-1}}}{x+\sqrt{x^2-1}} \;=\; \frac{1}{\sqrt{x^2-1}}.
$$

**artanh。** $|x| < 1$ で $\text{artanh}\, x = \tfrac{1}{2}\ln\tfrac{1+x}{1-x}$ なので：

$$
(\text{artanh}\, x)' \;=\; \tfrac{1}{2}\left(\frac{1}{1+x}+\frac{1}{1-x}\right) \;=\; \frac{1}{1-x^2}.
$$

## まとめ

| 関数 | 微分係数 | 定義域 |
|---|---|---|
| $e^x$ | $e^x$ | $\mathbb{R}$ |
| $a^x$ | $a^x \ln a$ | $\mathbb{R}$ |
| $\ln x$ | $1/x$ | $x>0$ |
| $\log_a x$ | $1/(x\ln a)$ | $x>0$ |
| $x^\alpha$ | $\alpha x^{\alpha-1}$ | $x>0$ |
| $\sin x$ | $\cos x$ | $\mathbb{R}$ |
| $\cos x$ | $-\sin x$ | $\mathbb{R}$ |
| $\tan x$ | $\sec^2 x$ | $x\neq\pi/2+n\pi$ |
| $\cot x$ | $-\csc^2 x$ | $x\neq n\pi$ |
| $\arcsin x$ | $1/\sqrt{1-x^2}$ | $(-1,1)$ |
| $\arccos x$ | $-1/\sqrt{1-x^2}$ | $(-1,1)$ |
| $\arctan x$ | $1/(1+x^2)$ | $\mathbb{R}$ |
| $\text{arccot}\, x$ | $-1/(1+x^2)$ | $\mathbb{R}$ |
| $\sinh x$ | $\cosh x$ | $\mathbb{R}$ |
| $\cosh x$ | $\sinh x$ | $\mathbb{R}$ |
| $\tanh x$ | $\text{sech}^2 x$ | $\mathbb{R}$ |
| $\text{coth}\, x$ | $-\text{csch}^2 x$ | $x\neq 0$ |
| $\text{arsinh}\, x$ | $1/\sqrt{x^2+1}$ | $\mathbb{R}$ |
| $\text{arcosh}\, x$ | $1/\sqrt{x^2-1}$ | $x>1$ |
| $\text{artanh}\, x$ | $1/(1-x^2)$ | $\lvert x\rvert<1$ |
