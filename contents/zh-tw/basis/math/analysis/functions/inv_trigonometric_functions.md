---
title: 反三角函數（Inverse Trigonometric Functions）
summary: "透過將各三角函數限制在使其成為單射的區間上，定義六個反三角函數，並利用反函式定理及 arcsin x + arccos x = π/2 等關鍵恆等式推導其導函數。"
prerequisites:
  - basis/math/analysis/functions/trigonometric_functions
aliases: []
tags: ["初等函數"]
updated: 2026-05-13
---

從[三角函數](../trigonometric_functions/)你已知道 $\sin$、$\cos$、$\tan$ 各將一個角度映射到一個比值。自然的反向問題是：給定一個比值，是哪個角度產生了它？回答這個問題需要**反三角函數（inverse trigonometric functions）**——但有一個癥結。由於正弦和餘弦是週期函式，每隔 $2\pi$ 就重複一次，因此在整個 $\mathbb{R}$ 上**不是單射（not injective）**；有重複輸出值的函式無法在全域上求反。標準的補救方法是將每個函式**限制（restrict）**到一個較小的、函式嚴格單調因而是單射的定義域，然後在那裡求反。

## 反正弦（Arcsine）

在區間 $\left[-\dfrac{\pi}{2},\ \dfrac{\pi}{2}\right]$ 上，正弦函式從 $-1$ 嚴格遞增到 $1$——$[-1, 1]$ 中的每個值恰好被取到一次。這個限制是單射的，因此有反函式。

**反正弦（arcsine）**定義為

$$
\arcsin : [-1,\ 1] \to \left[-\frac{\pi}{2},\ \frac{\pi}{2}\right],
$$

其中 $\arcsin x$ 是 $\left[-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right]$ 中滿足 $\sin\theta = x$ 的唯一角度 $\theta$。

反函式關係給出兩個複合恆等式：

$$
\sin(\arcsin x) = x \quad \text{對所有 } x \in [-1,\ 1],
$$

$$
\arcsin(\sin\theta) = \theta \quad \text{對所有 } \theta \in \left[-\frac{\pi}{2},\ \frac{\pi}{2}\right].
$$

第二個恆等式僅在限制區間上成立。在區間之外，$\arcsin(\sin\theta)$ 給出 $\theta$ 在 $\left[-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right]$ 中的代表值，而不是 $\theta$ 本身。

### 反正弦的導函數

令 $\theta = \arcsin x$，所以 $x = \sin\theta$，$\theta \in \left[-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right]$。對 $x$ 求導：

$$
1 = \cos\theta \cdot \frac{d\theta}{dx}.
$$

在 $\left[-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right]$ 上，餘弦為非負，所以 $\cos\theta = \sqrt{1 - \sin^2\theta} = \sqrt{1 - x^2}$。解出 $\dfrac{d\theta}{dx}$：

$$
\arcsin'(x) = \frac{1}{\sqrt{1 - x^2}}, \qquad x \in (-1,\ 1).
$$

導函數在端點 $x = \pm 1$ 處無定義，那裡 $\arcsin$ 的圖形有垂直切線。

## 反餘弦（Arccosine）

在區間 $[0, \pi]$ 上，餘弦函式從 $1$ 嚴格遞減到 $-1$。這個限制是單射的。

**反餘弦（arccosine）**定義為

$$
\arccos : [-1,\ 1] \to [0,\ \pi],
$$

其中 $\arccos x$ 是 $[0, \pi]$ 中滿足 $\cos\theta = x$ 的唯一角度 $\theta$。

### 反餘弦的導函數

令 $\theta = \arccos x$，所以 $x = \cos\theta$。對 $x$ 求導得 $1 = -\sin\theta \cdot \dfrac{d\theta}{dx}$。在 $[0, \pi]$ 上，正弦為非負，所以 $\sin\theta = \sqrt{1 - \cos^2\theta} = \sqrt{1 - x^2}$。解出：

$$
\arccos'(x) = -\frac{1}{\sqrt{1 - x^2}}, \qquad x \in (-1,\ 1).
$$

負號反映了 $\arccos$ 嚴格遞減的事實。

### 反正弦與反餘弦的關係

對所有 $x \in [-1, 1]$：

$$
\arcsin x + \arccos x = \frac{\pi}{2}.
$$

*證明。* 令 $\alpha = \arcsin x$，所以 $\sin\alpha = x$ 且 $\alpha \in \left[-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right]$。於是

$$
\cos\!\left(\frac{\pi}{2} - \alpha\right) = \sin\alpha = x,
$$

且 $\dfrac{\pi}{2} - \alpha \in [0, \pi]$。由 $\arccos$ 定義的唯一性，得 $\arccos x = \dfrac{\pi}{2} - \alpha$，整理即得所要的恆等式。$\square$

這個恆等式讓你無需任何重新計算即可在 $\arcsin$ 與 $\arccos$ 之間轉換，也解釋了為何它們的導函數互為相反數。

## 反正切（Arctangent）

在開區間 $\left(-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right)$ 上，正切函式嚴格遞增且取遍每個實數值恰好一次。（端點被排除，因為 $\tan$ 在那裡無定義。）

**反正切（arctangent）**定義為

$$
\arctan : \mathbb{R} \to \left(-\frac{\pi}{2},\ \frac{\pi}{2}\right),
$$

其中 $\arctan x$ 是 $\left(-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right)$ 中滿足 $\tan\theta = x$ 的唯一角度 $\theta$。

與 $\arcsin$ 和 $\arccos$ 不同，$\arctan$ 的定義域是整個 $\mathbb{R}$。但值域有界，因此函式有兩條水平漸近線：

$$
\lim_{x \to +\infty} \arctan x = \frac{\pi}{2}, \qquad \lim_{x \to -\infty} \arctan x = -\frac{\pi}{2}.
$$

### 反正切的導函數

令 $\theta = \arctan x$，所以 $\tan\theta = x$。對 $x$ 求導：

$$
\sec^2\!\theta \cdot \frac{d\theta}{dx} = 1.
$$

利用畢達哥拉斯恆等式 $\sec^2\theta = 1 + \tan^2\theta = 1 + x^2$：

$$
\arctan'(x) = \frac{1}{1 + x^2}, \qquad x \in \mathbb{R}.
$$

這對所有實數 $x$ 都有定義，且恆為正，確認了 $\arctan$ 在整個定義域上嚴格遞增。

## 其他反三角函數

其餘三個反三角函數由將 $\cot$、$\sec$、$\csc$ 限制在標準的單射區間上再求反得到。

**反餘切（Arccotangent）**是 $\cot$ 限制在 $(0, \pi)$ 上的反函式：

$$
\operatorname{arccot} : \mathbb{R} \to (0,\ \pi).
$$

**反正割（Arcsecant）**是 $\sec$ 限制在 $[0, \pi] \setminus \left\{\dfrac{\pi}{2}\right\}$ 上的反函式：

$$
\operatorname{arcsec} : (-\infty, -1] \cup [1, +\infty) \to [0,\ \pi] \setminus \left\{\frac{\pi}{2}\right\}.
$$

**反餘割（Arccosecant）**是 $\csc$ 限制在 $\left[-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right] \setminus \{0\}$ 上的反函式：

$$
\operatorname{arccsc} : (-\infty, -1] \cup [1, +\infty) \to \left[-\frac{\pi}{2},\ \frac{\pi}{2}\right] \setminus \{0\}.
$$

這三個函式在實際應用中出現較少。遇到時，通常可以改寫成 $\arcsin$、$\arccos$ 或 $\arctan$ 的形式。

## 導函數總覽

六個反三角函數的導函數，彙整供參考：

| 函式 | 導函數 | 導函數的定義域 |
|---|---|---|
| $\arcsin x$ | $\dfrac{1}{\sqrt{1-x^2}}$ | $(-1,\ 1)$ |
| $\arccos x$ | $-\dfrac{1}{\sqrt{1-x^2}}$ | $(-1,\ 1)$ |
| $\arctan x$ | $\dfrac{1}{1+x^2}$ | $\mathbb{R}$ |
| $\operatorname{arccot} x$ | $-\dfrac{1}{1+x^2}$ | $\mathbb{R}$ |
| $\operatorname{arcsec} x$ | $\dfrac{1}{\lvert x \rvert\sqrt{x^2-1}}$ | $\lvert x\rvert > 1$ |
| $\operatorname{arccsc} x$ | $-\dfrac{1}{\lvert x \rvert \sqrt{x^2-1}}$ | $\lvert x\rvert > 1$ |

注意規律：$\arcsin$ 與 $\arccos$、$\arctan$ 與 $\operatorname{arccot}$、$\operatorname{arcsec}$ 與 $\operatorname{arccsc}$ 各對的導函數互為相反數。這反映了互補恆等式 $\arcsin x + \arccos x = \dfrac{\pi}{2}$ 和 $\arctan x + \operatorname{arccot} x = \dfrac{\pi}{2}$。

## 摘要

- 由於 $\sin$、$\cos$、$\tan$ 在整個 $\mathbb{R}$ 上不是單射，它們的反函式需要**限制**到精心選取的嚴格單調區間上。
- **反正弦**：$\arcsin : [-1, 1] \to \left[-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right]$，在 $(-1, 1)$ 上的導函數為 $\dfrac{1}{\sqrt{1-x^2}}$。
- **反餘弦**：$\arccos : [-1, 1] \to [0, \pi]$，在 $(-1, 1)$ 上的導函數為 $-\dfrac{1}{\sqrt{1-x^2}}$；滿足恆等式 $\arcsin x + \arccos x = \dfrac{\pi}{2}$。
- **反正切**：$\arctan : \mathbb{R} \to \left(-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right)$，在 $\mathbb{R}$ 上的導函數為 $\dfrac{1}{1+x^2}$；有水平漸近線 $\pm\dfrac{\pi}{2}$。
- 另外三個反函式 $\operatorname{arccot}$、$\operatorname{arcsec}$、$\operatorname{arccsc}$ 遵循相同的模式，有類似的限制定義域。
- 所有六個導函數都透過**反函式定理**（對定義恆等式 $f(\theta) = x$ 關於 $x$ 求導）推導，最終得到代數表達式——儘管原來的三角函數是超越函式。
