---
title: 初等函數（Elementary Functions）
summary: "全面介紹初等函數族——多項式、有理函式與代數函式、指數函數、對數函數、三角函數、反三角函數及雙曲函數——並精確定義何謂「初等函數」：透過有限次算術運算與函式複合，從五大函式族中建構而成的函式。"
prerequisites:
  - basis/math/analysis/functions/exp
  - basis/math/analysis/functions/log
  - basis/math/analysis/functions/trigonometric_functions
  - basis/math/analysis/functions/inv_trigonometric_functions
  - basis/math/analysis/functions/hyp
aliases: []
tags: ["初等函數"]
updated: 2026-05-13
---

在前面的各章節中，你已逐一認識了古典分析學的主要函式：多項式、指數函數（exponential function）、對數函數（logarithmic function）、三角函數（trigonometric functions）及其反函式。現在各個片段都已齊備，是時候退一步問：這些函式究竟有什麼共同點？答案由**初等函數（elementary function）**的概念來捕捉——即能夠用上述成分的有限組合以*封閉形式（closed form）*表示的函式。

## 基本構成要素

初等函數建立在五大函式族之上。

### 多項式與有理函式

**多項式（polynomial）** $p(x) = a_n x^n + \cdots + a_0$ 僅使用恆等函式 $x$ 與實數常數的加法和乘法。多項式是最簡單的初等函式；詳見[多項式函數](../polynomial_functions/)。

**有理函式（rational function）**是兩個多項式的比值 $\tfrac{p(x)}{q(x)}$（$q \not\equiv 0$）。在 $q(x) \neq 0$ 的地方它完全有定義，並繼承了多項式的所有代數結構。

### 代數函式

函式 $f$ 是**代數函式（algebraic function）**，若它滿足 $f$ 和 $x$ 的多項式方程且係數為多項式，即存在多項式 $p_0, \ldots, p_n$（不全為零）使得

$$
p_n(x)f(x)^n + p_{n-1}(x)\,f(x)^{n-1} + \cdots + p_0(x) = 0. \tag{1}
$$

每個多項式和每個有理函式都是代數函式（在 $(1)$ 中取 $n = 1$）。更本質地，諸如 $\sqrt{x}$、$\sqrt[3]{x-1}$ 以及巢狀根式 $\sqrt{1 + \sqrt{x}}$ 等 $n$ 次根式都是代數函式——它們滿足形如 $f^n = g(x)$（$g$ 為有理函式）的方程。

**不是**代數函式的函式稱為**超越函式（transcendental function）**。

### 指數函數與對數函數

**指數函數** $\exp(x) = e^x$ 與**自然對數** $\ln x$ 是超越初等函式，分別在[指數函數](../exp/)和[對數函數](../log/)中展開。一般的指數 $b^x = \exp(x \ln b)$ 和對數 $\log_b x = \tfrac{\ln x}{\ln b}$ 也包含在內。

### 三角函數與反三角函數

$\sin$、$\cos$、$\tan$、$\cot$、$\sec$、$\csc$ 及其反函式 $\arcsin$、$\arccos$、$\arctan$、$\text{arccot}$、$\text{arcsec}$、$\text{arccsc}$ 都是超越初等函式，分別在[三角函數](../trigonometric_functions/)和[反三角函數](../inv_trigonometric_functions/)中介紹。

### 雙曲函數與反雙曲函數

$\sinh$、$\cosh$、$\tanh$、$\text{coth}$、$\text{sech}$、$\text{csch}$ 及其反函式 $\text{arsinh}$、$\text{arcosh}$、$\text{artanh}$、$\ldots$ 都是初等函式——如[雙曲函數及其反函數](../hyp/)所示，它們直接由指數函數和對數函數定義。

## 組合構成要素：定義

上述五大族是「原子」。從它們出發，用兩種運算建構所有初等函式：

1. **算術運算：** 給定初等函式 $f$ 和 $g$，函式 $f + g$、$f - g$、$f \cdot g$ 和 $f/g$（$g \neq 0$）都是初等函式。
2. **函式複合（composition）：** 若 $f$ 和 $g$ 是初等函式，且 $g$ 的值域包含在 $f$ 的定義域內，則 $x \mapsto f(g(x))$ 是初等函式。

**定義。** **實初等函式（real elementary function）**是指從實數常數和恆等函式 $x \mapsto x$ 出發，對上述五大族進行有限次算術運算和函式複合所得到的任意函式。

實際上，初等函式就是可以用標準函式符號 $\exp$、$\ln$、$\sin$、$\cos$、$\ldots$ 和代數運算寫成*公式*的函式，允許任意有限深度的巢狀。

## 範例集錦

以下函式都是初等函式：

| 函式 | 類型 |
|---|---|
| $3x^4 - 2x + 7$ | 多項式 |
| $\dfrac{x^2 - 1}{x^3 + x}$ | 有理函式 |
| $\sqrt{x^2 + 1}$ | 代數函式（滿足 $f^2 = x^2+1$） |
| $e^{x^2}$ | 超越——多項式的指數 |
| $\ln(\sin x)$ | 超越——對數與正弦的複合 |
| $\arctan(e^x)$ | 超越——反三角函式與指數的複合 |
| $\cosh(\sqrt{x})$ | 超越——代數函式的雙曲函數 |
| $x^x = e^{x \ln x}$ | 超越——指數與對數的複合 |
| $\sin^2 x + \cos^2 x$ | 初等函式（等於常數 $1$，但形式上仍是初等函式） |

注意 $x^x$ 是初等函式，儘管它既不是冪函式（固定指數）也不是指數函式（固定底數）：公式 $x^x = \exp(x \ln x)$ 將它明確地歸入初等函式的類別。

## 代數函式與超越函式

上述表格使兩大廣泛類別變得具體。

**代數函式**在 $\mathbb{R}(x)$ 上滿足多項式方程 $(1)$。在代數封閉域上，代數函式恰好是係數為有理函式的多項式的根。任何代數函式的複合或算術組合仍是代數函式。

**超越函式**是初等但非代數的函式。指數 $e^x$、對數 $\ln x$ 以及所有三角函數和雙曲函數都是超越的：對它們而言，形如 $(1)$ 的多項式關係都不成立。（嚴格證明超越性需要 Liouville 定理或更高深的代數工具，超出目前的先備知識範圍。）

## 初等函式的微分

每個初等函式在其有定義之處都是可微的，且其導函數仍是初等函式。這由鏈式法則（chain rule）、乘積法則（product rule）、商法則（quotient rule）以及各構成要素已知的導函數得出：

| 函式 | 導函數 |
|---|---|
| $x^n$ | $n x^{n-1}$ |
| $e^x$ | $e^x$ |
| $\ln x$ | $1/x$ |
| $\sin x$ | $\cos x$ |
| $\cos x$ | $-\sin x$ |
| $\arctan x$ | $1/(1+x^2)$ |
| $\sinh x$ | $\cosh x$ |
| $\text{arsinh}\, x$ | $1/\sqrt{x^2+1}$ |

將這些與鏈式法則和乘積法則結合，可以用有限次、機械性的步驟對**任何**初等函式求導。導函數始終是初等函式。

## 非初等函式

並非分析學中遇到的所有函式都是初等函式。一些重要的函式作為積分或微分方程的解出現，且可以證明它們沒有初等封閉形式：

- **誤差函式（error function）** $\operatorname{erf}(x) = \dfrac{2}{\sqrt{\pi}}\displaystyle\int_0^x e^{-t^2}\,dt$——高斯函式的積分。其被積函式 $e^{-t^2}$ 是初等函式，但不存在初等的反導函數。
- **Gamma 函式** $\Gamma(x) = \displaystyle\int_0^{\infty} t^{x-1}e^{-t}\,dt$——階乘 $n! = \Gamma(n+1)$ 的連續延伸。
- **指數積分（exponential integral）** $\operatorname{Ei}(x) = \displaystyle\int_{-\infty}^x \dfrac{e^t}{t}\,dt$ 及相關的對數積分。
- **Bessel 函式** $J_n(x)$，Bessel 微分方程的解，在物理學中凡有柱對稱性的問題中就會出現。

判定積分何時有初等反導函數的精確判準由**Liouville 定理**（微分代數）給出，該定理陳述了關於被積函式代數結構的條件。這屬於進階層級的內容。

## 摘要

- **初等函式**由實數常數、恆等函式以及五大族——多項式、代數函式、指數函數、對數函數、三角函數與反三角函數、雙曲函數與反雙曲函數——透過**有限次**算術運算和函式複合建構而成。
- **代數函式**在 $f$ 和 $x$ 上滿足多項式方程 $(1)$；包括多項式、有理函式和 $n$ 次根式。
- **超越初等函式**——$e^x$、$\ln x$、$\sin x$、$\cos x$ 及其親屬——是初等函式，但不滿足任何此類多項式方程。
- 每個初等函式在有定義之處都是**可微的**，且其導函數仍是初等函式。
- 重要的函式如 $\operatorname{erf}(x)$、$\Gamma(x)$ 和 Bessel 函式**不是初等函式**：由 Liouville 定理保證，它們無法表示為由五大族建構的有限公式。
