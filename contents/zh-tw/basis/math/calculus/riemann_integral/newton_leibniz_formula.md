---
title: 牛頓-萊布尼茨公式
summary: "微積分基本定理分為兩部分：對 [a, b] 上的連續函數 f，函數 F(x) = ∫_a^x f(t) dt 可微且 F'(x) = f(x)；對 f 的任意原函數 G，有 ∫_a^b f(x) dx = G(b) − G(a)。本節證明兩部分——第一部分用積分均值定理對差商取極限，第二部分用「原函數相差常數」引理——並說明牛頓-萊布尼茨公式如何將計算積分化為求反導函數。"
prerequisites:
  - basis/math/calculus/riemann_integral/primitive
  - basis/math/calculus/riemann_integral/mean_value_theorem
  - basis/math/calculus/riemann_integral/additive
aliases: []
tags:
  - 微積分
  - 積分
updated: 2026-05-22
---

在**牛頓-萊布尼茨公式（Newton-Leibniz formula）**被理解之前，計算定積分 $\int_a^b f(x)\,dx$ 意味著構造黎曼和、取極限，並設法辨認極限等於什麼——每遇到新的被積函數就得從頭來過。這個公式，又稱**微積分基本定理**，一舉突破了這一困境：它說積分與微分是互逆運算，因此計算 $\int_a^b f(x)\,dx$ 只需找到一個導數為 $f$ 的函數，再取其在端點的差值即可。這個觀察將數頁的極限論證化為一行計算。

定理在邏輯上分為兩個獨立部分。第一部分說明帶有變動上限的積分本身是可微的；第二部分說明任何原函數（反導函數）都可以用來計算積分。合在一起，它們構成初等微積分中最深刻的結論。

## 第一部分：變上限積分是原函數

設 $f$ 在 $[a, b]$ 上連續。由於 $f$ 連續，它在每個子區間上均 Riemann 可積，因此

$$
F(x) \coloneqq \int_a^x f(t)\,dt, \qquad x \in [a, b],
$$

是良定義的。我們稱 $F$ 為**變上限積分函數**，命題是：$F$ 在 $[a, b]$ 的每個點處均可微，且 $F'(x) = f(x)$。

### 第一部分的證明

固定 $x \in (a, b)$，取 $h \neq 0$ 足夠小使得 $x + h \in [a, b]$。由[積分的可加性](../additive/)，

$$
F(x + h) - F(x) = \int_a^{x+h} f(t)\,dt - \int_a^x f(t)\,dt = \int_x^{x+h} f(t)\,dt.
$$

除以 $h$，得差商

$$
\frac{F(x+h) - F(x)}{h} = \frac{1}{h}\int_x^{x+h} f(t)\,dt.
$$

由於 $f$ 在 $x$ 與 $x+h$ 之間的區間上連續，[積分均值定理](../mean_value_theorem/)保證存在介於 $x$ 與 $x + h$ 之間的點 $\xi_h$，使得

$$
\int_x^{x+h} f(t)\,dt = f(\xi_h)\cdot h.
$$

代入差商，

$$
\frac{F(x+h) - F(x)}{h} = f(\xi_h).
$$

當 $h \to 0$ 時，$\xi_h$ 被夾在 $x$ 與 $x + h$ 之間，故 $\xi_h \to x$。由 $f$ 的連續性，

$$
f(\xi_h) \to f(x).
$$

因此差商收斂到 $f(x)$，這正是可微性的定義：

$$
F'(x) = f(x). \qquad \square
$$

在端點 $a$ 和 $b$ 處同樣的論證用單側極限給出結論。第一部分告訴我們：每個連續函數都有原函數，且變上限積分函數是一個顯式的原函數。

## 第二部分：利用任意原函數計算定積分

牛頓-萊布尼茨公式的**第二部分**說：若 $G$ 是 $f$ 在 $[a, b]$ 上的*任意*原函數——即對所有 $x \in [a, b]$ 均有 $G'(x) = f(x)$——則

$$
\int_a^b f(x)\,dx = G(b) - G(a).
$$

### 第二部分的證明

由第一部分已知 $F(x) = \int_a^x f(t)\,dt$ 是 $f$ 的一個原函數。由於 $G$ 也是 $f$ 的原函數，差函數 $G - F$ 滿足

$$
(G - F)'(x) = G'(x) - F'(x) = f(x) - f(x) = 0
$$

對所有 $x \in [a, b]$ 成立。由[原函數相差常數定理](../primitive/)（由拉格朗日均值定理推出），在區間上導數為零的函數是常數。故存在 $C \in \mathbb{R}$ 使得

$$
G(x) = F(x) + C \quad \text{對所有 } x \in [a, b].
$$

在兩端點代入。在 $x = a$ 處：

$$
G(a) = F(a) + C = \int_a^a f(t)\,dt + C = 0 + C = C.
$$

在 $x = b$ 處：

$$
G(b) = F(b) + C = \int_a^b f(t)\,dt + C.
$$

兩式相減：

$$
G(b) - G(a) = \int_a^b f(t)\,dt. \qquad \square
$$

## 方括號記號

慣例上記作

$$
\bigl[G(x)\bigr]_a^b \coloneqq G(b) - G(a).
$$

這個記號簡潔，並減少符號錯誤的風險。有了它，牛頓-萊布尼茨公式寫成

$$
\int_a^b f(x)\,dx = \bigl[G(x)\bigr]_a^b,
$$

其中 $G$ 是 $f$ 的任意原函數。可以在 $G$ 上加任意常數而不影響結果，因為常數在 $G(b) - G(a)$ 中相消；這就是為何原函數的選取不影響結果。

## 例題

### 例一：$\int_0^1 x^2\,dx$

$f(x) = x^2$ 的原函數是 $G(x) = \dfrac{x^3}{3}$。套用牛頓-萊布尼茨公式：

$$
\int_0^1 x^2\,dx = \left[\frac{x^3}{3}\right]_0^1 = \frac{1^3}{3} - \frac{0^3}{3} = \frac{1}{3}.
$$

### 例二：$\int_0^\pi \sin x\,dx$

$\sin x$ 的原函數是 $-\cos x$。因此

$$
\int_0^\pi \sin x\,dx = \bigl[-\cos x\bigr]_0^\pi = (-\cos\pi) - (-\cos 0) = 1 + 1 = 2.
$$

幾何上，結果 $2$ 是正弦曲線一個弓形在 $x$ 軸以上的面積，這個驗算令人滿意。

### 例三：$\int_1^e \frac{1}{x}\,dx$

$\dfrac{1}{x}$ 在 $(0, \infty)$ 上的原函數是 $\ln x$。因此

$$
\int_1^e \frac{1}{x}\,dx = \bigl[\ln x\bigr]_1^e = \ln e - \ln 1 = 1 - 0 = 1.
$$

這確認了 $e$ 的幾何意義：$e$ 恰好是使 $y = 1/x$ 從 $1$ 到 $e$ 的面積等於 $1$ 的那個數。

## 摘要

- **第一部分（FTC1）**：若 $f$ 在 $[a, b]$ 上連續，則 $F(x) \coloneqq \int_a^x f(t)\,dt$ 可微且 $F'(x) = f(x)$。特別地，每個連續函數都有原函數。
- **第二部分（FTC2）**：若 $G$ 是 $f$ 在 $[a, b]$ 上的任意原函數，則 $\int_a^b f(x)\,dx = G(b) - G(a) = \bigl[G(x)\bigr]_a^b$。
- 第一部分的證明用[積分均值定理](../mean_value_theorem/)將差商的極限辨認為 $f(x)$。
- 第二部分的證明用同一函數的兩個原函數相差常數這一事實（來自[原函數節](../primitive/)），再代入 $x = a$ 確定該常數。
- **方括號記號** $\bigl[G(x)\bigr]_a^b = G(b) - G(a)$ 是代入步驟的簡潔縮寫。
- 該公式完全解耦了最初看似不可分的兩個問題：計算面積（定積分）和求反導函數（原函數）。要積分，只需反向微分。
