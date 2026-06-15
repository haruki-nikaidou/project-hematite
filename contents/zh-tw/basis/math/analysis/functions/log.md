---
title: 對數函數（Logarithms）
summary: "將自然對數定義為指數函數的反函數，推導其主要性質——乘積法則、冪次法則與導函數——再將框架延伸至任意底數的對數與指數。"
prerequisites:
  - basis/math/analysis/functions/exp
  - basis/math/analysis/e
aliases: []
tags: ["初等函數"]
updated: 2026-05-13
---

[指數函數](../exp/)一文說明了 $\exp : \mathbb{R} \to (0, \infty)$ 是嚴格遞增且映射到 $(0, \infty)$ 上的滿射。嚴格遞增的函式必然是單射，所以 $\exp$ 是雙射——它有唯一的反函式。這個反函式是分析學中最有用的函式之一。

## 自然對數

**定義。** **自然對數（natural logarithm）** $\ln : (0, \infty) \to \mathbb{R}$ 是 $\exp$ 的反函式。即：

$$
\ln(\exp(x)) = x \qquad \text{對所有 } x \in \mathbb{R}, \tag{1}
$$

$$
\exp(\ln(y)) = y \qquad \text{對所有 } y > 0. \tag{2}
$$

直觀上，$\ln(y)$ 回答了「$e$ 需要乘方幾次才能得到 $y$？」這個問題。由於 $\exp$ 雙射地將 $\mathbb{R}$ 映射到 $(0, \infty)$，這個問題始終有唯一的答案。

### 立即可得的值

由定義及已知的 $\exp$ 性質：

- $\ln(1) = 0$，因為 $\exp(0) = 1$。
- $\ln(e) = 1$，因為 $\exp(1) = e$。
- 對所有 $n \in \mathbb{Z}$，$\ln(e^n) = n$，因為 $\exp(n) = e^n$。

這三個錨點值得熟記；它們讓你無需計算機便能快速推算 $\ln$ 的值。

## 對數的乘積法則

**定理（乘積法則）。** 對所有 $x, y > 0$：

$$
\ln(xy) = \ln x + \ln y. \tag{3}
$$

*證明。* 令 $a \coloneqq \ln x$ 且 $b \coloneqq \ln y$，所以 $\exp(a) = x$ 且 $\exp(b) = y$。利用指數的**函數方程** $\exp(a + b) = \exp(a)\exp(b)$：

$$
xy = \exp(a) \cdot \exp(b) = \exp(a + b).
$$

對兩側取 $\ln$ 並使用等式 $(1)$：

$$
\ln(xy) = \ln(\exp(a + b)) = a + b = \ln x + \ln y. \qquad \square
$$

直觀上，$\ln$ 將乘法轉化為加法——這正是在計算機出現之前對數表（logarithm tables）對算術不可或缺的性質。

$(3)$ 有兩個直接推論。令 $y = 1/x$ 得 $\ln(1/x) = -\ln x$；令 $y = x$ 得 $\ln(x^2) = 2\ln x$。事實上，對所有實數指數都有完整的冪次法則。

## 對數的冪次法則

**定理（冪次法則）。** 對所有 $x > 0$ 及 $r \in \mathbb{R}$：

$$
\ln(x^r) = r\ln x. \tag{4}
$$

*證明概要。* 對 $r = n \in \mathbb{N}$，反覆應用乘積法則 $(3)$：

$$
\ln(x^n) = \ln(\underbrace{x \cdot x \cdots x}_{n\text{ 個}})
= \underbrace{\ln x + \ln x + \cdots + \ln x}_{n\text{ 個}} = n\ln x.
$$

對有理數 $r = p/q$（$q \in \mathbb{N}^+$），注意 $q \cdot \ln(x^{p/q}) = \ln((x^{p/q})^q) = \ln(x^p) = p\ln x$，所以 $\ln(x^{p/q}) = \tfrac{p}{q}\ln x$。對任意實數 $r$，等式由 $\ln$ 的連續性延伸成立。$\square$

冪次法則 $(4)$ 將乘冪化為乘法，就像 $(3)$ 將乘法化為加法一樣。

## $\ln$ 的導函數

**定理。** 對所有 $x > 0$：

$$
\frac{d}{dx}\ln x = \frac{1}{x}. \tag{5}
$$

*證明。* 令 $y = \ln x$，使得 $x = \exp(y)$。利用**反函式定理（inverse function theorem）**對 $x$ 求導：

$$
1 = \frac{d}{dx}\exp(y) = \exp(y) \cdot \frac{dy}{dx} = x \cdot \frac{dy}{dx}.
$$

解出 $\frac{dy}{dx}$：

$$
\frac{dy}{dx} = \frac{1}{x}. \qquad \square
$$

這是一個引人注目的結果：$\ln$ 的圖形在點 $x$ 處的斜率恰好是 $1/x$，沒有任何乘法常數或額外函式。

## 單調性與邊界行為

由於 $(\ln x)' = 1/x > 0$ 對所有 $x > 0$ 成立，$\ln$ 在其整個定義域 $(0, \infty)$ 上**嚴格遞增**。

兩個邊界點的行為直接由與 $\exp$ 的關係得出：

$$
\lim_{x \to \infty} \ln x = +\infty, \qquad \lim_{x \to 0^+} \ln x = -\infty.
$$

第一個極限成立，因為 $\exp(t) \to +\infty$（$t \to +\infty$），所以其反函式也必然無界增長。第二個極限成立，因為 $\exp(t) \to 0$（$t \to -\infty$）。合在一起，這些確認了 $\ln$ 是從 $(0, \infty)$ 到整個 $\mathbb{R}$ 的雙射，與 $\exp$ 從 $\mathbb{R}$ 雙射到 $(0, \infty)$ 互為鏡像。

## 自然對數作為積分

有第二種推導 $\ln$ 的方式，使導函數公式 $(5)$ 從一開始就顯而易見。定義：

$$
L(x) \coloneqq \int_1^x \frac{1}{t}\,dt \qquad (x > 0). \tag{6}
$$

由微積分基本定理（Fundamental Theorem of Calculus），$L'(x) = 1/x$ 且 $L(1) = 0$。可以驗證 $L$ 滿足與 $\ln$ 相同的乘積法則（在積分中換元），且由於兩者都是在 $x = 1$ 處相等且有相同導函數的連續函式，它們完全相同：

$$
\ln x = \int_1^x \frac{1}{t}\,dt.
$$

這個積分表示有時被取作 $\ln$ 的**定義**，[歐拉數](../../e/) $e$ 則被恢復為滿足 $\int_1^e \frac{1}{t}\,dt = 1$ 的唯一正數。

## 利用對數定義一般指數

有了 $\ln$，現在可以對任意底數 $b > 0$ 和任意**實數**指數 $x \in \mathbb{R}$（包括無理數）定義 $b^x$。

**定義。** 對 $b > 0$：

$$
b^x \;\coloneqq\; \exp(x \ln b). \tag{7}
$$

當 $x$ 是有理數 $p/q$ 時，這與 $b^{p/q}$ 的通常算術含義一致（可使用冪次法則 $(4)$ 驗證）。定義 $(7)$ 將其無縫延伸至所有實數指數。

**導函數。** 對 $(7)$ 用鏈式法則（chain rule）求導：

$$
\frac{d}{dx}\,b^x = \exp(x \ln b) \cdot \ln b = (\ln b)\,b^x.
$$

額外的因子 $\ln b$ 是 $b^x$ 與 $e^x$ 的區別所在：當 $b = e$ 時，$\ln e = 1$，因子消失——這正是 $e$ 是「自然」底數的原因。

## 任意底數的對數

**定義。** 對 $b > 0$ 且 $b \neq 1$，**以 $b$ 為底的對數（logarithm to base $b$）**為：

$$
\log_b(x) \;\coloneqq\; \frac{\ln x}{\ln b} \qquad (x > 0). \tag{8}
$$

由此定義，$\log_b(x) = y$ 若且唯若 $b^y = x$（代入 $(7)$ 可驗證），與中學代數中熟悉的含義一致。

### 換底公式

由定義 $(8)$，對任意兩個有效底數 $a$ 和 $b$：

$$
\log_a(x) = \frac{\ln x}{\ln a}
= \frac{\ln x}{\ln b} \cdot \frac{\ln b}{\ln a}
= \log_b(x) \cdot \frac{1}{\log_b(a)}.
$$

等價地：

$$
\log_a(x) = \frac{\log_b(x)}{\log_b(a)}.
$$

實際上，科學計算機提供 $\log_{10}$（常用對數）和 $\ln$；**換底公式（change-of-base formula）**讓你透過其中任一個達到任何其他底數。

## 摘要

- **自然對數** $\ln : (0, \infty) \to \mathbb{R}$ 是 $\exp$ 的反函式：$\ln(\exp(x)) = x$ 且 $\exp(\ln y) = y$。
- 關鍵值：$\ln 1 = 0$，$\ln e = 1$，$\ln(e^n) = n$（對所有 $n \in \mathbb{Z}$）。
- **乘積法則：** $\ln(xy) = \ln x + \ln y$，由函數方程 $\exp(a+b) = \exp(a)\exp(b)$ 導出。
- **冪次法則：** $\ln(x^r) = r\ln x$（對所有 $r \in \mathbb{R}$ 及 $x > 0$）。
- **導函數：** $(\ln x)' = 1/x$，由反函式定理證明。
- $\ln$ 在 $(0, \infty)$ 上嚴格遞增；$x \to \infty$ 時 $\ln x \to +\infty$，$x \to 0^+$ 時 $\ln x \to -\infty$。
- **積分表示：** $\ln x = \int_1^x \frac{1}{t}\,dt$，這是另一種使導函數公式顯而易見的定義。
- **一般指數：** $b^x \coloneqq \exp(x \ln b)$，其導函數為 $(\ln b)\,b^x$。
- **以 $b$ 為底的對數：** $\log_b(x) \coloneqq \frac{\ln x}{\ln b}$；**換底公式**為 $\log_a(x) = \frac{\log_b(x)}{\log_b(a)}$。
