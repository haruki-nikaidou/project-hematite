---
title: 逆三角関数
summary: "各三角関数を単調になる区間に制限することで6つの逆三角関数を定義し、逆関数定理と $\\arcsin x + \\arccos x = \\pi/2$ などの恒等式を用いてそれらの導関数を導く。"
prerequisites:
  - basis/math/analysis/functions/trigonometric_functions
aliases: []
tags: ["Elementary Function"]
updated: 2026-05-13
---

[三角関数](../trigonometric_functions/)から $\sin$, $\cos$, $\tan$ がそれぞれ角度を比へと対応させることはわかっている。自然な逆の問いは：比が与えられたとき、どの角度がそれを生み出したか？その答えが**逆三角関数（inverse trigonometric functions）**だ——ただし一つ問題がある。正弦と余弦は $2\pi$ ごとに繰り返す周期関数なので $\mathbb{R}$ 全体では**単射でない**；繰り返す出力をもつ関数は大域的に逆を取れない。標準的な解決策は各関数を厳密に単調になる小さい定義域に**制限**し、そこで逆関数を定義することだ。

## 逆正弦（arcsine）

区間 $\left[-\dfrac{\pi}{2},\ \dfrac{\pi}{2}\right]$ 上で正弦関数は $-1$ から $1$ まで狭義単調増加だ——$[-1, 1]$ のすべての値がちょうど1回現れる。この制限は単射なので逆関数をもつ。

**逆正弦（arcsine）**を次で定義する：

$$
\arcsin : [-1,\ 1] \to \left[-\frac{\pi}{2},\ \frac{\pi}{2}\right],
$$

$\arcsin x$ は $\sin\theta = x$ を満たす唯一の角度 $\theta \in \left[-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right]$ だ。

逆関係から2つの合成の恒等式が得られる：

$$
\sin(\arcsin x) = x \quad \text{すべての } x \in [-1,\ 1] \text{ に対して，}
$$

$$
\arcsin(\sin\theta) = \theta \quad \text{すべての } \theta \in \left[-\frac{\pi}{2},\ \frac{\pi}{2}\right] \text{ に対して．}
$$

2番目の恒等式は制限された区間上でのみ成立する。その外では $\arcsin(\sin\theta)$ は $\theta$ 自身ではなく、$\left[-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right]$ 内での代表元を返す。

### 逆正弦の導関数

$\theta = \arcsin x$ と置く——すなわち $x = \sin\theta$（$\theta \in \left[-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right]$）。$x$ に関して両辺を微分すると：

$$
1 = \cos\theta \cdot \frac{d\theta}{dx}.
$$

$\left[-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right]$ 上で余弦は非負なので $\cos\theta = \sqrt{1 - \sin^2\theta} = \sqrt{1 - x^2}$。$\dfrac{d\theta}{dx}$ について解くと：

$$
\arcsin'(x) = \frac{1}{\sqrt{1 - x^2}}, \qquad x \in (-1,\ 1).
$$

端点 $x = \pm 1$ では導関数が未定義になる——$\arcsin$ のグラフがそこで垂直な接線をもつ。

## 逆余弦（arccosine）

区間 $[0, \pi]$ 上で余弦関数は $1$ から $-1$ まで狭義単調減少だ。この制限は単射だ。

**逆余弦（arccosine）**を次で定義する：

$$
\arccos : [-1,\ 1] \to [0,\ \pi],
$$

$\arccos x$ は $\cos\theta = x$ を満たす唯一の角度 $\theta \in [0, \pi]$ だ。

### 逆余弦の導関数

$\theta = \arccos x$ と置くと $x = \cos\theta$。$x$ に関して微分すると $1 = -\sin\theta \cdot \dfrac{d\theta}{dx}$。$[0, \pi]$ 上で正弦は非負なので $\sin\theta = \sqrt{1 - \cos^2\theta} = \sqrt{1 - x^2}$。解くと：

$$
\arccos'(x) = -\frac{1}{\sqrt{1 - x^2}}, \qquad x \in (-1,\ 1).
$$

負号は $\arccos$ が狭義単調減少であることを反映している。

### arcsin–arccos の恒等式

すべての $x \in [-1, 1]$ に対して：

$$
\arcsin x + \arccos x = \frac{\pi}{2}.
$$

*証明。* $\alpha = \arcsin x$ と置く——すなわち $\sin\alpha = x$、$\alpha \in \left[-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right]$。すると

$$
\cos\!\left(\frac{\pi}{2} - \alpha\right) = \sin\alpha = x,
$$

かつ $\dfrac{\pi}{2} - \alpha \in [0, \pi]$。$\arccos$ の定義の一意性より $\arccos x = \dfrac{\pi}{2} - \alpha$ が従い、整理すると主張の恒等式になる。$\square$

この恒等式により再計算なしに $\arcsin$ と $\arccos$ を相互変換できる。また両者の導関数が互いに符号違いである理由も説明している。

## 逆正接（arctangent）

開区間 $\left(-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right)$ 上で正接関数は狭義単調増加で、すべての実数値をちょうど1回とる（端点では $\tan$ が未定義なので除外する）。

**逆正接（arctangent）**を次で定義する：

$$
\arctan : \mathbb{R} \to \left(-\frac{\pi}{2},\ \frac{\pi}{2}\right),
$$

$\arctan x$ は $\tan\theta = x$ を満たす唯一の角度 $\theta \in \left(-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right)$ だ。

$\arcsin$ や $\arccos$ と違い、$\arctan$ の定義域は $\mathbb{R}$ 全体だ。ただし出力は有界なので、この関数は2本の水平漸近線をもつ：

$$
\lim_{x \to +\infty} \arctan x = \frac{\pi}{2}, \qquad \lim_{x \to -\infty} \arctan x = -\frac{\pi}{2}.
$$

### 逆正接の導関数

$\theta = \arctan x$ と置くと $\tan\theta = x$。$x$ に関して微分すると：

$$
\sec^2\!\theta \cdot \frac{d\theta}{dx} = 1.
$$

ピタゴラスの恒等式 $\sec^2\theta = 1 + \tan^2\theta = 1 + x^2$ を使うと：

$$
\arctan'(x) = \frac{1}{1 + x^2}, \qquad x \in \mathbb{R}.
$$

これはすべての実数 $x$ で定義され常に正なので、$\arctan$ は定義域全体で狭義単調増加であることが確認できる。

## その他の逆三角関数

残りの3つの逆三角関数は、$\cot$, $\sec$, $\csc$ を単射となる標準区間に制限することで得られる。

**逆余接（arccotangent）**は $(0, \pi)$ に制限した $\cot$ の逆関数だ：

$$
\operatorname{arccot} : \mathbb{R} \to (0,\ \pi).
$$

**逆正割（arcsecant）**は $[0, \pi] \setminus \left\{\dfrac{\pi}{2}\right\}$ に制限した $\sec$ の逆関数だ：

$$
\operatorname{arcsec} : (-\infty, -1] \cup [1, +\infty) \to [0,\ \pi] \setminus \left\{\frac{\pi}{2}\right\}.
$$

**逆余割（arccosecant）**は $\left[-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right] \setminus \{0\}$ に制限した $\csc$ の逆関数だ：

$$
\operatorname{arccsc} : (-\infty, -1] \cup [1, +\infty) \to \left[-\frac{\pi}{2},\ \frac{\pi}{2}\right] \setminus \{0\}.
$$

これら3つは実用上それほど頻繁には現れない。出てきたときはたいてい $\arcsin$, $\arccos$, $\arctan$ を使って書き直せる。

## 導関数の一覧

6つの逆三角関数の導関数をまとめておく：

| 関数 | 導関数 | 導関数の定義域 |
|---|---|---|
| $\arcsin x$ | $\dfrac{1}{\sqrt{1-x^2}}$ | $(-1,\ 1)$ |
| $\arccos x$ | $-\dfrac{1}{\sqrt{1-x^2}}$ | $(-1,\ 1)$ |
| $\arctan x$ | $\dfrac{1}{1+x^2}$ | $\mathbb{R}$ |
| $\operatorname{arccot} x$ | $-\dfrac{1}{1+x^2}$ | $\mathbb{R}$ |
| $\operatorname{arcsec} x$ | $\dfrac{1}{\lvert x \rvert\sqrt{x^2-1}}$ | $\lvert x\rvert > 1$ |
| $\operatorname{arccsc} x$ | $-\dfrac{1}{\lvert x \rvert \sqrt{x^2-1}}$ | $\lvert x\rvert > 1$ |

各ペアのパターンに注目：$\arcsin$ と $\arccos$、$\arctan$ と $\operatorname{arccot}$、$\operatorname{arcsec}$ と $\operatorname{arccsc}$ で導関数は互いに符号違いだ。これは補角の恒等式 $\arcsin x + \arccos x = \dfrac{\pi}{2}$ および $\arctan x + \operatorname{arccot} x = \dfrac{\pi}{2}$ を反映している。

## まとめ

- $\sin$, $\cos$, $\tan$ は $\mathbb{R}$ 全体では単射でないため、逆関数には狭義単調な区間への**制限**が必要だ。
- **逆正弦（arcsine）**：$\arcsin : [-1, 1] \to \left[-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right]$、$(-1, 1)$ 上の導関数は $\dfrac{1}{\sqrt{1-x^2}}$。
- **逆余弦（arccosine）**：$\arccos : [-1, 1] \to [0, \pi]$、$(-1, 1)$ 上の導関数は $-\dfrac{1}{\sqrt{1-x^2}}$；恒等式 $\arcsin x + \arccos x = \dfrac{\pi}{2}$ を満たす。
- **逆正接（arctangent）**：$\arctan : \mathbb{R} \to \left(-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right)$、$\mathbb{R}$ 上の導関数は $\dfrac{1}{1+x^2}$；水平漸近線 $\pm\dfrac{\pi}{2}$ をもつ。
- 追加の3つの逆関数 $\operatorname{arccot}$, $\operatorname{arcsec}$, $\operatorname{arccsc}$ も同様のパターンに従い、類似した制限定義域をもつ。
- 6つの導関数すべては**逆関数定理**（定義の恒等式 $f(\theta) = x$ を $x$ に関して微分する）を通じて導かれ、元の三角関数が超越的であるにもかかわらず代数的な式になる。
