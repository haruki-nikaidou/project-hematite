---
title: 三角函數（Trigonometric Functions）
summary: "將正弦與餘弦嚴格定義為冪級數，推導其導函數、畢達哥拉斯恆等式與加法公式，以解析方式定義 π，並介紹完整的三角函數族及其導函數。"
prerequisites:
  - basis/math/analysis/functions/exp
aliases: []
tags: ["初等函數"]
updated: 2026-05-13
---

角度、振動與旋轉都涉及同一對函式——**正弦（sine）**與**餘弦（cosine）**。在本基礎階段，最清晰的定義方式是將它們視為特定的冪級數，直接對應[指數函數](../exp/)中 $\exp$ 的定義方式。這個方法無需訴諸幾何，讓你能從第一原理精確推導出導函數、恆等式，乃至 $\pi$ 的定義。

## 冪級數定義

回顧[指數函數](../exp/)，$\exp(x) = \sum_{k=0}^{\infty} x^k/k!$ 對所有 $x \in \mathbb{R}$ 絕對收斂。將此級數按偶數項與奇數項分開，並各加交替符號，定義兩個新函式：

$$
\cos x \;\coloneqq\; \sum_{k=0}^{\infty} \frac{(-1)^k\,x^{2k}}{(2k)!}
= 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \frac{x^6}{6!} + \cdots \tag{1}
$$

$$
\sin x \;\coloneqq\; \sum_{k=0}^{\infty} \frac{(-1)^k\,x^{2k+1}}{(2k+1)!}
= x - \frac{x^3}{3!} + \frac{x^5}{5!} - \frac{x^7}{7!} + \cdots \tag{2}
$$

兩個級數對所有 $x \in \mathbb{R}$ 絕對收斂：比值審斂法（ratio test）給出比值 $|x|^2\!/\bigl((2k+1)(2k+2)\bigr) \to 0$（$k \to \infty$），因此在每個有界區間上絕對且一致收斂。一致收斂保證了可對級數逐項微分。

在 $x = 0$：餘弦級數的常數項為 $1$，其餘各項均消失，得 $\cos(0) = 1$。正弦級數以 $x$ 項開頭，所以 $\sin(0) = 0$。

## 動機：歐拉公式

為何是這些特定的級數？在指數級數中代入 $ix$（其中 $i^2 = -1$）：

$$
\exp(ix) = \sum_{k=0}^{\infty} \frac{(ix)^k}{k!}.
$$

分離偶次冪與奇次冪，利用 $i^{2m} = (-1)^m$ 和 $i^{2m+1} = i(-1)^m$，實部恰好是餘弦級數 $(1)$，虛部是 $i$ 乘以正弦級數 $(2)$。這給出了**歐拉公式（Euler's formula）**：

$$
\exp(ix) = \cos x + i\sin x. \tag{3}
$$

在本基礎階段，將 $(3)$ 視為一個啟發性洞見而非完全嚴格的陳述（完整處理需要將 $\exp$ 延伸到複數域）。這個公式使指數函數與三角函數之間的聯繫生動直觀，並讓你在下文中用一行推導出加法公式。

$x = \pi$ 的特殊情形給出**歐拉恆等式（Euler's identity）** $\exp(i\pi) + 1 = 0$——一旦 $\pi$ 被定義之後，下文即將給出定義。

## 導函數

對級數 $(1)$ 和 $(2)$ 逐項求導：

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

總結：

$$
(\cos x)' = -\sin x, \qquad (\sin x)' = \cos x. \tag{4}
$$

對 $(4)$ 求兩次導：$(\cos x)'' = -\cos x$ 且 $(\sin x)'' = -\sin x$。因此兩個函式都滿足**簡諧振盪方程（simple harmonic oscillator equation）** $y'' + y = 0$。

## 畢達哥拉斯恆等式

**定理。** 對所有 $x \in \mathbb{R}$：

$$
\cos^2 x + \sin^2 x = 1. \tag{5}
$$

*證明。* 令 $f(x) \coloneqq \cos^2 x + \sin^2 x$。利用 $(4)$ 求導：

$$
f'(x) = 2\cos x \cdot (-\sin x) + 2\sin x \cdot \cos x = 0.
$$

所以 $f$ 在 $\mathbb{R}$ 上為常數。在 $x = 0$ 處求值：

$$
f(0) = \cos^2(0) + \sin^2(0) = 1^2 + 0^2 = 1.
$$

因此 $f(x) = 1$ 對所有 $x$ 成立。$\square$

**畢達哥拉斯恆等式（Pythagorean identity）** $(5)$ 是幾乎所有三角恆等式推導的源泉。一個直接推論：$|\cos x| \leq 1$ 且 $|\sin x| \leq 1$ 對所有 $x$ 成立。

## 加法公式

**定理。** 對所有 $x, y \in \mathbb{R}$：

$$
\cos(x + y) = \cos x \cos y - \sin x \sin y, \tag{6}
$$

$$
\sin(x + y) = \sin x \cos y + \cos x \sin y. \tag{7}
$$

*利用歐拉公式的證明。* 將兩個複指數相乘：

$$
\exp(i(x + y)) = \exp(ix)\exp(iy) = (\cos x + i\sin x)(\cos y + i\sin y).
$$

展開右側：

$$
= (\cos x\cos y - \sin x\sin y) + i(\sin x\cos y + \cos x\sin y).
$$

左側由 $(3)$ 等於 $\cos(x+y) + i\sin(x+y)$。比較實部與虛部即得 $(6)$ 和 $(7)$。$\square$

在 $(6)$ 中令 $y = x$ 得**倍角公式（double-angle formula）** $\cos(2x) = \cos^2 x - \sin^2 x$。結合畢達哥拉斯恆等式 $(5)$，還得 $\cos(2x) = 2\cos^2 x - 1 = 1 - 2\sin^2 x$。

## $\pi$ 的定義

餘弦級數 $(1)$ 給出 $\cos(0) = 1 > 0$。可以驗證 $\cos(2) < 0$：對交替的部分和分組，可以看出從第二項起，每個部分和在 $x = 2$ 時均為負，仔細估計給出 $\cos(2) < -\tfrac{1}{3}$。

由於 $\cos$ 是連續函式（其級數一致收斂），**中間值定理（Intermediate Value Theorem）**保證 $\cos$ 在區間 $(0, 2)$ 內至少有一個零點。

**定義。** $\boldsymbol{\pi}$ 定義為 $\cos$ 最小正零點的兩倍：

$$
\pi \;\coloneqq\; 2\cdot\min\{\,x > 0 \mid \cos x = 0\,\}. \tag{8}
$$

由此定義，$\cos(\pi/2) = 0$。在 $x = \pi/2$ 處對畢達哥拉斯恆等式 $(5)$ 求值，得 $\sin^2(\pi/2) = 1$。由於 $\sin$ 在 $(0,\,\pi/2)$ 上為正——其導函數在那裡等於 $\cos > 0$，且 $\sin(0) = 0$——故 $\sin(\pi/2) = 1$。

利用加法公式 $(6)$ 和 $(7)$，令 $y = \pi/2$：

$$
\cos\!\left(x + \frac{\pi}{2}\right) = -\sin x, \qquad
\sin\!\left(x + \frac{\pi}{2}\right) = \cos x.
$$

再次應用此位移得 $\cos(x + \pi) = -\cos x$ 且 $\sin(x + \pi) = -\sin x$，再應用一次則得週期性。

## 週期性

**定理。** 對所有 $x \in \mathbb{R}$：

$$
\cos(x + 2\pi) = \cos x, \qquad \sin(x + 2\pi) = \sin x. \tag{9}
$$

*證明。* 對 $\cos(x + \pi) = -\cos x$ 應用兩次：

$$
\cos(x + 2\pi) = \cos\bigl((x+\pi)+\pi\bigr) = -\cos(x+\pi) = -(-\cos x) = \cos x,
$$

$\sin$ 的情況類似。$\square$

事實上 $2\pi$ 是兩個函式的**最小週期**，但證明此事需要確認 $\cos$ 在 $\pi/2$ 以下沒有正零點。

## 特殊角度的值

以上推導確定了標準角度的值：

| $x$ | $\cos x$ | $\sin x$ |
|-----|----------|----------|
| $0$ | $1$ | $0$ |
| $\pi/6$ | $\sqrt{3}/2$ | $1/2$ |
| $\pi/4$ | $1/\sqrt{2}$ | $1/\sqrt{2}$ |
| $\pi/3$ | $1/2$ | $\sqrt{3}/2$ |
| $\pi/2$ | $0$ | $1$ |
| $\pi$ | $-1$ | $0$ |

對於 $\pi/4$：在 $x = y = \pi/4$ 時應用加法公式，結合 $\cos(\pi/2) = 0$ 得 $\cos^2(\pi/4) = \sin^2(\pi/4)$；再結合 $(5)$，兩者均等於 $1/\sqrt{2}$。

對於 $\pi/3$：倍角公式給出 $\cos(2\pi/3) = 2\cos^2(\pi/3) - 1$。由於 $\cos(2\pi/3) = \cos(\pi - \pi/3) = -\cos(\pi/3)$（由 $\cos(x+\pi) = -\cos x$ 得），解方程 $-\cos(\pi/3) = 2\cos^2(\pi/3) - 1$ 得 $\cos(\pi/3) = 1/2$，再由 $(5)$ 得 $\sin(\pi/3) = \sqrt{3}/2$。

## 其他三角函數

另外四個函式由正弦與餘弦的比值和倒數定義。

**正切（Tangent）：**

$$
\tan x \;\coloneqq\; \frac{\sin x}{\cos x}, \qquad \cos x \neq 0.
$$

$\tan$ 的定義域為 $\mathbb{R} \setminus \{\pi/2 + k\pi \mid k \in \mathbb{Z}\}$，最小週期為 $\pi$。

**餘切（Cotangent）：**

$$
\cot x \;\coloneqq\; \frac{\cos x}{\sin x}, \qquad \sin x \neq 0.
$$

**正割（Secant）**與**餘割（Cosecant）**是倒數：

$$
\sec x \;\coloneqq\; \frac{1}{\cos x}, \qquad \csc x \;\coloneqq\; \frac{1}{\sin x}.
$$

### $\tan$ 與 $\cot$ 的導函數

應用商法則（quotient rule），再利用畢達哥拉斯恆等式 $(5)$：

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

反三角函數——$\arcsin$、$\arccos$、$\arctan$——的定義與研究見[反三角函數](../inv_trigonometric_functions/)。

## 摘要

- **餘弦**與**正弦**由絕對收斂的冪級數 $(1)$ 和 $(2)$ 定義；在 $x = 0$：$\cos(0) = 1$ 且 $\sin(0) = 0$。
- **歐拉公式** $\exp(ix) = \cos x + i\sin x$ 由在指數級數中代入 $ix$ 後分離實部與虛部得出。
- **導函數：** $(\cos x)' = -\sin x$ 且 $(\sin x)' = \cos x$；兩個函式都滿足 $y'' + y = 0$。
- **畢達哥拉斯恆等式：** $\cos^2 x + \sin^2 x = 1$，透過證明左側導函數為 $0$ 並在 $x = 0$ 處求值得出。
- **加法公式** $(6)$ 和 $(7)$ 由展開 $\exp(ix)\exp(iy) = \exp(i(x+y))$ 導出。
- **$\pi$** 定義為 $\cos$ 最小正零點的兩倍；其存在性由中間值定理對連續函式 $\cos$ 的應用保證。
- **週期性：** $\cos$ 和 $\sin$ 的週期均為 $2\pi$。
- **關鍵值：** $\cos(\pi/2) = 0$，$\sin(\pi/2) = 1$，$\cos(\pi) = -1$，$\sin(\pi) = 0$，$\cos(\pi/4) = \sin(\pi/4) = 1/\sqrt{2}$，$\cos(\pi/3) = 1/2$，$\sin(\pi/3) = \sqrt{3}/2$。
- $\tan x = \sin x/\cos x$，$(\tan x)' = \sec^2 x$；$\cot x = \cos x/\sin x$，$(\cot x)' = -\csc^2 x$。
