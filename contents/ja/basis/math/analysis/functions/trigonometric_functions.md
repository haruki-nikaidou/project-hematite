---
title: 三角関数
summary: "正弦と余弦をべき級数として厳密に定義し、その導関数・ピタゴラスの恒等式・加法定理を導く。余弦の最小正零点として $\\pi$ を解析的に定義し、三角関数の全系とその導関数を紹介する。"
prerequisites:
  - basis/math/analysis/functions/exp
aliases: []
tags: ["Elementary Function"]
updated: 2026-05-13
---

角度・振動・回転はすべて同じ関数のペアを使う——**正弦（sine）**と**余弦（cosine）**だ。basis レベルでは、[指数関数](../exp/)で $\exp$ を定義したのと直接対応する形で、これらをべき級数として最も明確に定義する。このアプローチは幾何学への依存をなくし、すべてを第一原理から出発して——微分・恒等式・さらには $\pi$ の定義まで——正確に導ける。

## べき級数による定義

[指数関数](../exp/)から $\exp(x) = \sum_{k=0}^{\infty} x^k/k!$ がすべての $x \in \mathbb{R}$ で絶対収束することを思い出そう。この級数を偶数番目の項と奇数番目の項に分けて交代する符号をつけることで2つの新しい関数を定義する：

$$
\cos x \;\coloneqq\; \sum_{k=0}^{\infty} \frac{(-1)^k\,x^{2k}}{(2k)!}
= 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \frac{x^6}{6!} + \cdots \tag{1}
$$

$$
\sin x \;\coloneqq\; \sum_{k=0}^{\infty} \frac{(-1)^k\,x^{2k+1}}{(2k+1)!}
= x - \frac{x^3}{3!} + \frac{x^5}{5!} - \frac{x^7}{7!} + \cdots \tag{2}
$$

どちらも $x \in \mathbb{R}$ のすべての値で絶対収束する：比判定法により比 $|x|^2\!/\bigl((2k+1)(2k+2)\bigr) \to 0$（$k \to \infty$）となり、絶対収束かつあらゆる有界区間上で一様収束する。一様収束により級数の項ごとの微分が正当化される。

$x = 0$ のとき：余弦級数の定数項は $1$ でその他の項は消えるから $\cos(0) = 1$。正弦級数は $x$ から始まるから $\sin(0) = 0$。

## 動機：オイラーの公式

なぜこの特定の級数か？指数級数に形式的に $ix$（$i^2 = -1$）を代入してみよう：

$$
\exp(ix) = \sum_{k=0}^{\infty} \frac{(ix)^k}{k!}.
$$

偶数乗と奇数乗を分け、$i^{2m} = (-1)^m$ と $i^{2m+1} = i(-1)^m$ を使うと、実部がちょうど余弦級数 $(1)$、虚部が $i$ 倍した正弦級数 $(2)$ になる。これが**オイラーの公式（Euler's formula）**だ：

$$
\exp(ix) = \cos x + i\sin x. \tag{3}
$$

basis レベルでは $(3)$ を厳密な主張ではなく動機づけとなる洞察として扱おう（完全な処理は $\exp$ の複素数への拡張が必要）。この公式は指数関数と三角関数の結びつきを明確にし、以下で加法定理を1行で導くことを可能にする。

$x = \pi$ の特殊ケースが**オイラーの等式** $\exp(i\pi) + 1 = 0$ を与えるが、まず $\pi$ を定義しなければならない——それはすぐ後で行う。

## 導関数

級数 $(1)$ と $(2)$ を項ごとに微分する：

$$
\frac{d}{dx}\cos x
= \sum_{k=1}^{\infty} \frac{(-1)^k \cdot 2k \cdot x^{2k-1}}{(2k)!}
= -\sum_{j=0}^{\infty} \frac{(-1)^j\,x^{2j+1}}{(2j+1)!}
= -\sin x,
$$

$$
\frac{d}{dx}\sin x
= \sum_{k=0}^{\infty} \frac{(-1)^k(2k+1)x^{2k}}{(2k+1)!}
= \sum_{k=0}^{\infty} \frac{(-1)^k\,x^{2k}}{(2k)!}
= \cos x.
$$

まとめると：

$$
(\cos x)' = -\sin x, \qquad (\sin x)' = \cos x. \tag{4}
$$

$(4)$ を2回適用すると $(\cos x)'' = -\cos x$ および $(\sin x)'' = -\sin x$。どちらの関数も**単振動方程式（simple harmonic oscillator equation）** $y'' + y = 0$ を満たす。

## ピタゴラスの恒等式

**定理。** すべての $x \in \mathbb{R}$ に対して：

$$
\cos^2 x + \sin^2 x = 1. \tag{5}
$$

*証明。* $f(x) \coloneqq \cos^2 x + \sin^2 x$ と置き、$(4)$ を使って微分する：

$$
f'(x) = 2\cos x \cdot (-\sin x) + 2\sin x \cdot \cos x = 0.
$$

よって $f$ は $\mathbb{R}$ 上定数だ。$x = 0$ で評価すると：

$$
f(0) = \cos^2(0) + \sin^2(0) = 1^2 + 0^2 = 1.
$$

したがってすべての $x$ に対して $f(x) = 1$。$\square$

**ピタゴラスの恒等式（Pythagorean identity）** $(5)$ は、これから出会うほぼすべての三角関数の変形の出発点になる。直接の帰結として $|\cos x| \leq 1$ かつ $|\sin x| \leq 1$（すべての $x$ に対して）が得られる。

## 加法定理

**定理。** すべての $x, y \in \mathbb{R}$ に対して：

$$
\cos(x + y) = \cos x \cos y - \sin x \sin y, \tag{6}
$$

$$
\sin(x + y) = \sin x \cos y + \cos x \sin y. \tag{7}
$$

*オイラーの公式を使った証明。* 2つの複素指数関数を掛け合わせる：

$$
\exp(i(x + y)) = \exp(ix)\exp(iy) = (\cos x + i\sin x)(\cos y + i\sin y).
$$

右辺を展開すると：

$$
= (\cos x\cos y - \sin x\sin y) + i(\sin x\cos y + \cos x\sin y).
$$

左辺は $(3)$ より $\cos(x+y) + i\sin(x+y)$ に等しい。実部と虚部を比較すると $(6)$ と $(7)$ が得られる。$\square$

$(6)$ で $y = x$ と置くと**2倍角公式** $\cos(2x) = \cos^2 x - \sin^2 x$ が得られる。ピタゴラスの恒等式 $(5)$ と組み合わせると $\cos(2x) = 2\cos^2 x - 1 = 1 - 2\sin^2 x$ も得られる。

## $\pi$ の定義

余弦級数 $(1)$ より $\cos(0) = 1 > 0$ がわかる。交代する部分和を調べると $\cos(2) < 0$ を示せる：連続する2項をまとめると第2項以降の部分和が $x = 2$ では負になることがわかり、注意深い評価により $\cos(2) < -\tfrac{1}{3}$ が得られる。

$\cos$ は連続（べき級数として一様収束するから）なので、**中間値定理（Intermediate Value Theorem）**により区間 $(0, 2)$ に $\cos$ の零点が少なくとも1つ存在することが保証される。

**定義。** $\boldsymbol{\pi}$ を $\cos$ の最小正の零点の2倍として定義する：

$$
\pi \;\coloneqq\; 2\cdot\min\{\,x > 0 \mid \cos x = 0\,\}. \tag{8}
$$

この定義から $\cos(\pi/2) = 0$ が成り立つ。$x = \pi/2$ でピタゴラスの恒等式 $(5)$ を適用すると $\sin^2(\pi/2) = 1$ が強制される。正弦は $(0,\,\pi/2)$ 上で正——その導関数は $\cos > 0$ に等しく、$\sin(0) = 0$ だから——なので $\sin(\pi/2) = 1$ が得られる。

加法定理 $(6)$, $(7)$ で $y = \pi/2$ とすると：

$$
\cos\!\left(x + \frac{\pi}{2}\right) = -\sin x, \qquad
\sin\!\left(x + \frac{\pi}{2}\right) = \cos x.
$$

このシフトを2回適用すると $\cos(x + \pi) = -\cos x$、$\sin(x + \pi) = -\sin x$ が得られ、もう1回適用すると周期性が従う。

## 周期性

**定理。** すべての $x \in \mathbb{R}$ に対して：

$$
\cos(x + 2\pi) = \cos x, \qquad \sin(x + 2\pi) = \sin x. \tag{9}
$$

*証明。* $\cos(x + \pi) = -\cos x$ を2回適用する：

$$
\cos(x + 2\pi) = \cos\bigl((x+\pi)+\pi\bigr) = -\cos(x+\pi) = -(-\cos x) = \cos x,
$$

$\sin$ についても同様。$\square$

実は $2\pi$ はどちらの関数の最小周期でもあるが、それを証明するには $\cos$ が $\pi/2$ より小さい正の零点をもたないことの確認が必要になる。

## 特殊角での値

これまでに導いた定義と恒等式から標準的な角度での値が確定する：

| $x$ | $\cos x$ | $\sin x$ |
|-----|----------|----------|
| $0$ | $1$ | $0$ |
| $\pi/6$ | $\sqrt{3}/2$ | $1/2$ |
| $\pi/4$ | $1/\sqrt{2}$ | $1/\sqrt{2}$ |
| $\pi/3$ | $1/2$ | $\sqrt{3}/2$ |
| $\pi/2$ | $0$ | $1$ |
| $\pi$ | $-1$ | $0$ |

$\pi/4$ の場合：$x = y = \pi/4$ の加法定理と $\cos(\pi/2) = 0$ から $\cos^2(\pi/4) = \sin^2(\pi/4)$ が得られ、$(5)$ と合わせると両者が $1/\sqrt{2}$ に等しいことがわかる。

$\pi/3$ の場合：2倍角公式が $\cos(2\pi/3) = 2\cos^2(\pi/3) - 1$ を与える。$\cos(x+\pi) = -\cos x$ の帰結として $\cos(2\pi/3) = -\cos(\pi/3)$ だから、$-\cos(\pi/3) = 2\cos^2(\pi/3) - 1$ を解くと $\cos(\pi/3) = 1/2$ が得られ、$(5)$ から $\sin(\pi/3) = \sqrt{3}/2$ が続く。

## その他の三角関数

正弦と余弦の比と逆数として4つの関数を定義する。

**正接（tangent）：**

$$
\tan x \;\coloneqq\; \frac{\sin x}{\cos x}, \qquad \cos x \neq 0.
$$

$\tan$ の定義域は $\mathbb{R} \setminus \{\pi/2 + k\pi \mid k \in \mathbb{Z}\}$ であり、最小周期は $\pi$ だ。

**余接（cotangent）：**

$$
\cot x \;\coloneqq\; \frac{\cos x}{\sin x}, \qquad \sin x \neq 0.
$$

**正割（secant）**と**余割（cosecant）**は逆数だ：

$$
\sec x \;\coloneqq\; \frac{1}{\cos x}, \qquad \csc x \;\coloneqq\; \frac{1}{\sin x}.
$$

### $\tan$ と $\cot$ の導関数

商の微分法を適用し、ピタゴラスの恒等式 $(5)$ を使う：

$$
(\tan x)' = \frac{\cos x \cdot \cos x - \sin x \cdot (-\sin x)}{\cos^2 x}
= \frac{\cos^2 x + \sin^2 x}{\cos^2 x}
= \frac{1}{\cos^2 x} = \sec^2 x. \tag{10}
$$

$$
(\cot x)' = \frac{-\sin x \cdot \sin x - \cos x \cdot \cos x}{\sin^2 x}
= -\frac{\cos^2 x + \sin^2 x}{\sin^2 x}
= -\frac{1}{\sin^2 x} = -\csc^2 x. \tag{11}
$$

逆三角関数 $\arcsin$, $\arccos$, $\arctan$ の定義と考察は[逆三角関数](../inv_trigonometric_functions/)を参照。

## まとめ

- **余弦**と**正弦**は絶対収束するべき級数 $(1)$, $(2)$ で定義される；$x = 0$ で $\cos(0) = 1$、$\sin(0) = 0$。
- **オイラーの公式** $\exp(ix) = \cos x + i\sin x$ は、$ix$ を代入した指数級数の実部と虚部を分離することで得られる。
- **導関数：** $(\cos x)' = -\sin x$、$(\sin x)' = \cos x$；どちらも $y'' + y = 0$ を満たす。
- **ピタゴラスの恒等式：** $\cos^2 x + \sin^2 x = 1$（左辺の導関数が $0$ であることと $x = 0$ での評価で証明）。
- **加法定理** $(6)$, $(7)$ は $\exp(ix)\exp(iy) = \exp(i(x+y))$ を展開することで導かれる。
- **$\pi$** は $\cos$ の最小正の零点の2倍として定義され、その存在は連続関数 $\cos$ に中間値定理を適用することで保証される。
- **周期性：** $\cos$ と $\sin$ はともに周期 $2\pi$ をもつ。
- **主要な値：** $\cos(\pi/2) = 0$、$\sin(\pi/2) = 1$、$\cos(\pi) = -1$、$\sin(\pi) = 0$、$\cos(\pi/4) = \sin(\pi/4) = 1/\sqrt{2}$、$\cos(\pi/3) = 1/2$、$\sin(\pi/3) = \sqrt{3}/2$。
- $\tan x = \sin x/\cos x$ で $(\tan x)' = \sec^2 x$；$\cot x = \cos x/\sin x$ で $(\cot x)' = -\csc^2 x$。
