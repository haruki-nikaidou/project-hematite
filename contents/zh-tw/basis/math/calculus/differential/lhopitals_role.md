---
title: 羅必達法則（L'Hôpital's Rule）
summary: "羅必達法則（L'Hôpital's rule）讓你透過將 f/g 替換為 f′/g′，計算 0/0 與 ∞/∞ 型未定式的極限。本章節通過柯西均值定理加以證明，並展示各種未定式如何化歸為這兩種形式。"
prerequisites:
  - basis/math/calculus/differential/cauchys_finite-increment_theorem
aliases: []
tags:
  - 微積分
  - 極限
updated: 2026-05-21
---

當分數的分子與分母同時趨向零——或同時趨向無窮——就無法直接代入求極限。這些被稱為**未定式（indeterminate forms）**，在分析學中隨處可見。羅必達法則（L'Hôpital's rule）提供了一個簡潔的解法：用導數之比取代原分數，再嘗試求極限。

## 未定式

極限 $\lim_{x \to a} \frac{f(x)}{g(x)}$ 在直接代入產生 $\frac{0}{0}$ 或 $\frac{\infty}{\infty}$ 等無意義表達式時，稱為*未定式*。極限的值取決於各部分趨近其極限的速率，而羅必達法則恰好透過導數提取這一資訊。

## 定理陳述

**定理（羅必達法則）。** 設 $f$ 與 $g$ 在 $a$ 的去心鄰域上可微（$a \in \mathbb{R}$ 或 $a = \pm\infty$）。假設

1. $g'(x)$ 在 $a$ 附近不為零，且
2. 極限為 $\tfrac{0}{0}$ 型——即 $\lim_{x \to a} f(x) = \lim_{x \to a} g(x) = 0$——或為 $\tfrac{\infty}{\infty}$ 型——即 $\lim_{x \to a} |g(x)| = \infty$。

若

$$
\lim_{x \to a} \frac{f'(x)}{g'(x)} \;=\; L \quad (L \in \mathbb{R} \cup \{+\infty,\, -\infty\}), \tag{1}
$$

則

$$
\lim_{x \to a} \frac{f(x)}{g(x)} \;=\; L. \tag{2}
$$

此法則同樣適用於單側極限（$x \to a^+$ 或 $x \to a^-$）。

## $\tfrac{0}{0}$ 情形的證明

假設 $\lim_{x \to a} f(x) = \lim_{x \to a} g(x) = 0$。令 $f(a) = g(a) = 0$ 將 $f$ 與 $g$ 延伸至 $a$；在 $a$ 點的連續性仍然成立。

對 $a$ 的去心鄰域中 $x \neq a$ 的點，在以 $a$ 和 $x$ 為端點的閉區間上對 $f$ 和 $g$ 套用[柯西均值定理](../cauchys_finite-increment_theorem/)：

$$
\frac{f(x)}{g(x)} \;=\; \frac{f(x) - f(a)}{g(x) - g(a)} \;=\; \frac{f'(c_x)}{g'(c_x)},
$$

其中 $c_x$ 嚴格介於 $a$ 與 $x$ 之間。當 $x \to a$ 時，中間點 $c_x \to a$（由夾擠 $|c_x - a| < |x - a|$）。因此：

$$
\lim_{x \to a} \frac{f(x)}{g(x)} \;=\; \lim_{x \to a} \frac{f'(c_x)}{g'(c_x)} \;=\; \lim_{c \to a} \frac{f'(c)}{g'(c)} \;=\; L. \quad \square
$$

$\tfrac{\infty}{\infty}$ 情形需要更精細地套用柯西定理——固定一個參考點並控制尾端——但在相同假設下得出相同結論。

## 化歸其他未定式

除 $\tfrac{0}{0}$ 和 $\tfrac{\infty}{\infty}$ 以外的每種未定式，都可以通過代數變形化歸為這兩種情形之一。

### $0 \cdot \infty$

若 $\lim f(x) = 0$，$\lim g(x) = \infty$，寫作

$$
f(x)\,g(x) \;=\; \frac{f(x)}{1/g(x)} \;\;\text{（}\tfrac{0}{0}\text{ 型）} \qquad\text{或}\qquad \frac{g(x)}{1/f(x)} \;\;\text{（}\tfrac{\infty}{\infty}\text{ 型）}.
$$

選擇導數更簡單的那種寫法。

### $\infty - \infty$

若 $\lim f(x) = \lim g(x) = \infty$，通分化為單一分式。結果為 $\tfrac{0}{0}$ 或 $\tfrac{\infty}{\infty}$ 型。

### $0^0$、$\infty^0$、$1^\infty$

若極限 $\lim h(x)^{k(x)}$ 屬於以上形式之一，取自然對數：

$$
\ln\!\bigl(h(x)^{k(x)}\bigr) \;=\; k(x)\ln h(x).
$$

這是 $0 \cdot \infty$ 型，可進一步化歸。一旦求出 $\lim k(x)\ln h(x) = M$，原極限即為 $e^M$。

## 例題

**例 1（$\tfrac{0}{0}$ 型）。** $\displaystyle\lim_{x \to 0} \dfrac{\sin x}{x}$。

分子與分母在 $0$ 處均為零。套用羅必達法則：

$$
\lim_{x \to 0} \frac{\sin x}{x} \;=\; \lim_{x \to 0} \frac{\cos x}{1} \;=\; 1.
$$

**例 2（$\tfrac{\infty}{\infty}$ 型，反覆套用）。** 固定 $n \in \mathbb{N}$，$\displaystyle\lim_{x \to \infty} \dfrac{x^n}{e^x}$。

套用羅必達法則 $n$ 次。每次套用使分子的冪次減一：

$$
\lim_{x \to \infty} \frac{x^n}{e^x} \;=\; \lim_{x \to \infty} \frac{n\,x^{n-1}}{e^x} \;=\; \cdots \;=\; \lim_{x \to \infty} \frac{n!}{e^x} \;=\; 0.
$$

任何多項式最終都被指數函式所主導。

**例 3（$1^\infty$ 型）。** $\displaystyle\lim_{x \to \infty} \!\left(1 + \dfrac{1}{x}\right)^{\!x}$。

設 $L$ 為此極限。取對數將其化為 $0 \cdot \infty$ 型：

$$
\ln L \;=\; \lim_{x \to \infty} x\ln\!\!\left(1 + \frac{1}{x}\right) \;=\; \lim_{x \to \infty} \frac{\ln(1 + 1/x)}{1/x} \quad \left(\text{form } \frac{0}{0}\right).
$$

對 $x$ 求導，套用羅必達法則：

$$
\lim_{x \to \infty} \frac{\dfrac{-1/x^2}{1 + 1/x}}{-1/x^2} \;=\; \lim_{x \to \infty} \frac{1}{1 + 1/x} \;=\; 1,
$$

故 $\ln L = 1$，$L = e$。

## 法則不適用的情形

羅必達法則**要求** $\lim f'(x)/g'(x)$ 存在。若 $f'/g'$ 振盪而不收斂，法則無法提供關於 $f/g$ 的任何資訊——而 $f/g$ 本身可能仍有良好的極限。一個標準例子是

$$
\lim_{x \to \infty} \frac{x + \sin x}{x}：
$$

$f'/g' = 1 + \cos x$ 在 $0$ 與 $2$ 之間振盪，然而 $f/g = 1 + (\sin x)/x \to 1$。

## 摘要

- **羅必達法則**：若 $f/g$ 在 $a$ 處為 $\tfrac{0}{0}$ 或 $\tfrac{\infty}{\infty}$ 型未定式，且 $\lim f'/g'$ 存在，則 $\lim f/g = \lim f'/g'$。
- **證明**（$\tfrac{0}{0}$ 情形）：柯西均值定理給出 $f(x)/g(x) = f'(c_x)/g'(c_x)$，其中 $c_x$ 被夾在 $a$ 與 $x$ 之間；當 $x \to a$ 時 $c_x$ 也趨向 $a$。
- **其他未定式**可代數化歸：$0\cdot\infty$ 化為單一分式；$\infty - \infty$ 通分；$0^0$、$\infty^0$、$1^\infty$ 取對數。
- 若 $\lim f'/g'$ 不存在，法則無法提供資訊；缺乏該極限並不意味著 $\lim f/g$ 不存在。
