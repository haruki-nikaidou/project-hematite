---
title: 雙曲函數及其反函數（Hyperbolic Functions and Their Inverses）
summary: "由指數函數定義 sinh、cosh 和 tanh，建立其基本恆等式、加法公式與導函數，再以封閉形式的對數表達式推導出反雙曲函數。"
prerequisites:
  - basis/math/analysis/functions/exp
  - basis/math/analysis/functions/log
aliases: []
tags: ["初等函數"]
updated: 2026-05-13
---

正如 $(\cos\theta, \sin\theta)$ 在 $\theta$ 變化時描繪單位圓 $x^2 + y^2 = 1$，**雙曲函數（hyperbolic functions）**參數化了單位雙曲線 $x^2 - y^2 = 1$：點 $(\cosh t, \sinh t)$ 對每個實數 $t$ 都在該雙曲線上。除幾何圖像外，它們自然地作為微分方程 $y'' = y$ 的解出現，描述懸掛纜線的形狀（*懸鏈線（catenary）*），並在狹義相對論的勞侖茲變換（Lorentz boosts）中出現。與三角函數的對應物不同，它們不是週期的——它們直接由[指數函數](../exp/)建構。

## 定義

**雙曲餘弦（hyperbolic cosine）**與**雙曲正弦（hyperbolic sine）**定義為

$$
\cosh x \coloneqq \frac{e^x + e^{-x}}{2}, \qquad \sinh x \coloneqq \frac{e^x - e^{-x}}{2}. \tag{1}
$$

可以把 $\cosh x$ 看作指數的*偶數部分*，$\sinh x$ 看作*奇數部分*，因為 $e^x = \cosh x + \sinh x$ 且 $e^{-x} = \cosh x - \sinh x$。

其餘四個雙曲函數定義為這兩者的比值：

$$
\tanh x \coloneqq \frac{\sinh x}{\cosh x}, \qquad
\operatorname{coth} x \coloneqq \frac{\cosh x}{\sinh x},
$$

$$
\operatorname{sech} x \coloneqq \frac{1}{\cosh x}, \qquad
\operatorname{csch} x \coloneqq \frac{1}{\sinh x}.
$$

注意 $\operatorname{coth} x$ 和 $\operatorname{csch} x$ 在 $x = 0$ 處無定義，因為那裡 $\sinh 0 = 0$。

## 基本恆等式

雙曲函數之間的核心代數關係是

$$
\cosh^2 x - \sinh^2 x = 1.
$$

*推導。* 代入定義 $(1)$：

$$
\cosh^2 x - \sinh^2 x
= \left(\frac{e^x + e^{-x}}{2}\right)^{\!2} - \left(\frac{e^x - e^{-x}}{2}\right)^{\!2}
= \frac{(e^x + e^{-x})^2 - (e^x - e^{-x})^2}{4}.
$$

利用代數恆等式 $(a + b)^2 - (a - b)^2 = 4ab$，令 $a = e^x$，$b = e^{-x}$，分子變為 $4e^x e^{-x} = 4e^0 = 4$。除以 $4$ 得 $1$。$\square$

這與圓的恆等式 $\cos^2\theta + \sin^2\theta = 1$ 相呼應，並確認了 $(\cosh t,\, \sinh t)$ 對所有實數 $t$ 都在單位雙曲線 $x^2 - y^2 = 1$ 上。

## 加法公式

對所有實數 $x$ 和 $y$：

$$
\cosh(x + y) = \cosh x \cosh y + \sinh x \sinh y,
$$

$$
\sinh(x + y) = \sinh x \cosh y + \cosh x \sinh y.
$$

可以代入定義 $(1)$ 展開來驗證。與圓函式的公式 $\cos(x+y) = \cos x\cos y - \sin x\sin y$ 和 $\sin(x+y) = \sin x\cos y + \cos x\sin y$ 相比：$\cosh$ 的加法公式在餘弦公式有 $-$ 號的地方出現了 $+$ 號。這個符號差異直接源於基本恆等式的符號差異（$\cosh^2 - \sinh^2 = 1$ 對比 $\cos^2 + \sin^2 = 1$）。

## 導函數

對定義 $(1)$ 關於 $x$ 逐項求導：

$$
(\cosh x)' = \frac{e^x - e^{-x}}{2} = \sinh x,
\qquad
(\sinh x)' = \frac{e^x + e^{-x}}{2} = \cosh x.
$$

所以 $\sinh$ 和 $\cosh$ 互為對方的導函數——它們互換，而 $\sin$ 和 $\cos$ 每次求導都帶符號變化地交替。

對 $\tanh$，應用商法則（quotient rule）再利用基本恆等式：

$$
(\tanh x)'
= \frac{(\sinh x)'\cosh x - \sinh x\,(\cosh x)'}{\cosh^2 x}
= \frac{\cosh^2 x - \sinh^2 x}{\cosh^2 x}
= \frac{1}{\cosh^2 x}
= \operatorname{sech}^2 x.
$$

再次應用基本恆等式得另一種形式 $\operatorname{sech}^2 x = 1 - \tanh^2 x$，所以

$$
(\tanh x)' = \operatorname{sech}^2 x = 1 - \tanh^2 x.
$$

其餘三個函式的導函數由商法則和鏈式法則（chain rule）得出：

$$
(\operatorname{coth} x)' = -\operatorname{csch}^2 x, \qquad
(\operatorname{sech} x)' = -\operatorname{sech} x\tanh x, \qquad
(\operatorname{csch} x)' = -\operatorname{csch} x\operatorname{coth} x.
$$

## cosh 和 sinh 的性質

- $\cosh$ 是**偶函式（even）**：$\cosh(-x) = \cosh x$。由 AM-GM 不等式，$e^x + e^{-x} \geq 2\sqrt{e^x \cdot e^{-x}} = 2$，所以對所有 $x \in \mathbb{R}$，$\cosh x \geq 1$，等號僅在 $x = 0$ 處成立。$y = \cosh x$ 的圖形是*懸鏈線（catenary）*——均勻柔索在重力作用下懸掛所呈現的形狀。
- $\sinh$ 是**奇函式（odd）**：$\sinh(-x) = -\sinh x$。它在整個 $\mathbb{R}$ 上嚴格遞增（因為 $(\sinh x)' = \cosh x \geq 1 > 0$），值域為 $\mathbb{R}$。
- $\tanh$ 是奇函式且嚴格遞增，將 $\mathbb{R}$ 映射到開區間 $(-1, 1)$。當 $x \to \pm\infty$ 時，$e^{-|x|} \to 0$ 迫使 $\tanh x \to \pm 1$，所以 $y = \pm 1$ 是水平漸近線。

## 反雙曲函數

由於 $\sinh$ 在 $\mathbb{R}$ 上嚴格遞增，它有全局反函式。對於 $\cosh$，必須限制在 $[0, \infty)$ 上，那裡它嚴格遞增。$\tanh$ 的自然定義域是 $\mathbb{R}$，值域為 $(-1, 1)$。

值得注意的是，三個反函式都有關於[對數](../log/)的**封閉形式（closed-form）**表達式。

### 反雙曲正弦（Arsinh）

令 $y = \sinh x = \dfrac{e^x - e^{-x}}{2}$，解出 $x$。兩側乘以 $2e^x$：

$$
e^{2x} - 2y\,e^x - 1 = 0.
$$

這是關於 $e^x$ 的二次方程。二次公式給出 $e^x = y \pm \sqrt{y^2 + 1}$。由於 $e^x > 0$ 且 $\sqrt{y^2+1} > |y|$，只有正根合法。取對數：

$$
\operatorname{arsinh} x \coloneqq \ln\!\left(x + \sqrt{x^2 + 1}\right), \qquad x \in \mathbb{R}.
$$

### 反雙曲餘弦（Arcosh）

令 $y = \cosh x = \dfrac{e^x + e^{-x}}{2}$（$x \geq 0$），解出。兩側乘以 $2e^x$：

$$
e^{2x} - 2y\,e^x + 1 = 0,
$$

所以 $e^x = y \pm \sqrt{y^2 - 1}$。這要求 $y \geq 1$。對 $x \geq 0$，較大的根對應 $x \geq 0$，故選 $+$ 號。取對數：

$$
\operatorname{arcosh} x \coloneqq \ln\!\left(x + \sqrt{x^2 - 1}\right), \qquad x \geq 1.
$$

### 反雙曲正切（Artanh）

令 $y = \tanh x = \dfrac{e^x - e^{-x}}{e^x + e^{-x}}$，解出。令 $u = e^{2x}$：

$$
y = \frac{u - 1}{u + 1}
\quad\Longrightarrow\quad
y(u + 1) = u - 1
\quad\Longrightarrow\quad
u = \frac{1 + y}{1 - y}.
$$

由於 $u = e^{2x}$，取對數得 $2x = \ln\!\dfrac{1+y}{1-y}$，因此：

$$
\operatorname{artanh} x \coloneqq \frac{1}{2}\ln\frac{1 + x}{1 - x}, \qquad |x| < 1.
$$

限制 $|x| < 1$ 與 $\tanh$ 的值域一致，並確保對數內的 $1 + x$ 和 $1 - x$ 均嚴格為正。

## 反雙曲函數的導函數

可以直接對對數表達式微分，也可以應用反函式定理，兩種方法如下所示。

### 反雙曲正弦的導函數

對 $\operatorname{arsinh} x = \ln\!\left(x + \sqrt{x^2+1}\right)$ 求導：

$$
(\operatorname{arsinh} x)'
= \frac{1}{x + \sqrt{x^2+1}} \cdot \left(1 + \frac{x}{\sqrt{x^2+1}}\right)
= \frac{1}{x + \sqrt{x^2+1}} \cdot \frac{x + \sqrt{x^2+1}}{\sqrt{x^2+1}}
= \frac{1}{\sqrt{x^2+1}}.
$$

$$
\operatorname{arsinh}'(x) = \frac{1}{\sqrt{x^2 + 1}}, \qquad x \in \mathbb{R}.
$$

### 反雙曲餘弦的導函數

對 $\operatorname{arcosh} x = \ln\!\left(x + \sqrt{x^2-1}\right)$（$x > 1$）求導：

$$
(\operatorname{arcosh} x)'
= \frac{1}{x + \sqrt{x^2-1}} \cdot \left(1 + \frac{x}{\sqrt{x^2-1}}\right)
= \frac{1}{x + \sqrt{x^2-1}} \cdot \frac{x + \sqrt{x^2-1}}{\sqrt{x^2-1}}
= \frac{1}{\sqrt{x^2-1}}.
$$

$$
\operatorname{arcosh}'(x) = \frac{1}{\sqrt{x^2 - 1}}, \qquad x > 1.
$$

### 反雙曲正切的導函數

改寫 $\operatorname{artanh} x = \dfrac{1}{2}\ln(1+x) - \dfrac{1}{2}\ln(1-x)$ 並對 $|x| < 1$ 求導：

$$
(\operatorname{artanh} x)'
= \frac{1}{2} \cdot \frac{1}{1+x} + \frac{1}{2} \cdot \frac{1}{1-x}
= \frac{1}{2} \cdot \frac{(1-x) + (1+x)}{(1+x)(1-x)}
= \frac{1}{1 - x^2}.
$$

$$
\operatorname{artanh}'(x) = \frac{1}{1 - x^2}, \qquad |x| < 1.
$$

與[反三角函數](../inv_trigonometric_functions/)中的 $\arctan'(x) = \dfrac{1}{1+x^2}$ 相比：兩者唯一的差別是分母中的符號，這反映了 $\cosh^2 - \sinh^2 = 1$ 與 $\cos^2 + \sin^2 = 1$ 的符號差異。

## 導函數彙整

六個雙曲函數的導函數，彙整供參考：

| 函式 | 導函數 |
|---|---|
| $\sinh x$ | $\cosh x$ |
| $\cosh x$ | $\sinh x$ |
| $\tanh x$ | $\operatorname{sech}^2 x$ |
| $\operatorname{coth} x$ | $-\operatorname{csch}^2 x$ |
| $\operatorname{sech} x$ | $-\operatorname{sech} x\tanh x$ |
| $\operatorname{csch} x$ | $-\operatorname{csch} x\operatorname{coth} x$ |

## 摘要

- **雙曲函數**由指數函數定義：$\cosh x \coloneqq \dfrac{e^x+e^{-x}}{2}$，$\sinh x \coloneqq \dfrac{e^x-e^{-x}}{2}$，$\tanh x \coloneqq \dfrac{\sinh x}{\cosh x}$。
- **基本恆等式** $\cosh^2 x - \sinh^2 x = 1$ 與畢達哥拉斯恆等式相呼應，說明 $(\cosh t, \sinh t)$ 在單位雙曲線上。
- **導函數**：$(\sinh x)' = \cosh x$，$(\cosh x)' = \sinh x$，$(\tanh x)' = \operatorname{sech}^2 x$。
- $\cosh$ 是**偶函式**且 $\cosh x \geq 1$；$\sinh$ 是**奇函式**且嚴格遞增，值域為 $\mathbb{R}$；$\tanh$ 將 $\mathbb{R}$ 映射到 $(-1, 1)$。
- **反雙曲函數**有封閉形式的對數表達式，由代數求解得出：
  - $\operatorname{arsinh} x = \ln\!\left(x + \sqrt{x^2+1}\right)$，定義在 $\mathbb{R}$ 上。
  - $\operatorname{arcosh} x = \ln\!\left(x + \sqrt{x^2-1}\right)$，定義在 $[1, \infty)$ 上。
  - $\operatorname{artanh} x = \dfrac{1}{2}\ln\dfrac{1+x}{1-x}$，定義在 $(-1, 1)$ 上。
- 其導函數——$\dfrac{1}{\sqrt{x^2+1}}$、$\dfrac{1}{\sqrt{x^2-1}}$、$\dfrac{1}{1-x^2}$——與反三角函數的導函數密切對應，差別僅在根號下及分母中的符號。
