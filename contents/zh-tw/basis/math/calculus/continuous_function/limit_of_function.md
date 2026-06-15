---
title: 函數極限（Limit of a Function）
summary: "函數極限描述當 x 趨近某點時 f(x) 所趨近的值。本章介紹 ε–δ 定義與數列刻劃，證明兩者等價，並用來計算典型實函數的極限。"
prerequisites:
  - basis/math/analysis/limit
  - basis/math/analysis/functions/elementary_function
aliases: []
tags:
  - 微積分
  - 極限
updated: 2026-05-20
---

你已經知道[數列如何收斂](../../../analysis/limit/)——數列 $(x_n)$ 收斂至 $L$，表示其項最終任意靠近 $L$。函式（function）則不同：$f(x)$ 對某點附近的*所有*實數 $x$ 都有定義，而非僅對離散的項。**函數極限（limit of a function）**捕捉的是：當 $x$ 連續趨近某目標時，$f(x)$ 趨近的值——不要求 $f$ 在該目標點有定義，也不要求極限值與該點的函數值吻合。

## ε–δ 定義

設 $f$ 是定義在某集合 $D \subseteq \mathbb{R}$ 上的實值函式，$a$ 為 $D$ 的**極限點（limit point）**——即 $a$ 的每個鄰域都包含 $D$ 中除 $a$ 本身以外的其他點。若對每個 $\varepsilon > 0$ 都存在 $\delta > 0$，使得

$$
0 < |x - a| < \delta \text{ 且 } x \in D \implies |f(x) - L| < \varepsilon，
$$

則實數 $L$ 稱為 $f$ 在 $a$ 處的**極限**。

此時寫作

$$
\lim_{x \to a} f(x) = L \qquad \text{或} \qquad f(x) \to L \text{ （當 } x \to a \text{）。}
$$

條件 $0 < |x - a| < \delta$ 表示 $x$ 在距 $a$ 的距離 $\delta$ 以內，但**不等於 $a$**。$f$ 在 $a$ 本身的行為與極限無關——$f$ 甚至可以在那裡無定義。

### ε–δ 的實際含義

給定容忍度 $\varepsilon > 0$，你必須找到半徑 $\delta > 0$，使得每當 $x$ 在 $a$ 的距離 $\delta$ 以內（且 $x \neq a$），輸出 $f(x)$ 就在 $L$ 的距離 $\varepsilon$ 以內。容忍度愈小，半徑可能需要愈緊。只要這個挑戰永遠可以應對，極限就存在。

## 數列刻劃

有一個等價的數列表述，在證明中往往更易使用。

**定理。** $\lim_{x \to a} f(x) = L$ 當且僅當對每個 $D \setminus \{a\}$ 中滿足 $x_n \to a$ 的數列 $(x_n)$，都有 $f(x_n) \to L$。

*證明。*

（$\Rightarrow$）設 ε–δ 條件成立。令 $(x_n)$ 為 $D \setminus \{a\}$ 中任意滿足 $x_n \to a$ 的數列。給定 $\varepsilon > 0$，由 ε–δ 定義取 $\delta$。因為 $x_n \to a$，存在 $N$ 使得對所有 $n \geq N$ 有 $|x_n - a| < \delta$。又因 $x_n \neq a$，ε–δ 條件給出對所有 $n \geq N$ 有 $|f(x_n) - L| < \varepsilon$。故 $f(x_n) \to L$。

（$\Leftarrow$）設 ε–δ 條件不成立。則存在 $\varepsilon > 0$，使得對每個 $\delta > 0$，都存在某 $x \in D \setminus \{a\}$ 滿足 $|x - a| < \delta$ 但 $|f(x) - L| \geq \varepsilon$。在每步取 $\delta = 1/n$，可得 $D \setminus \{a\}$ 中的數列 $(x_n)$ 滿足 $x_n \to a$，但對所有 $n$ 有 $|f(x_n) - L| \geq \varepsilon$，故 $f(x_n) \not\to L$。$\square$

數列形式特別適合用來證明極限*不存在*：找兩條趨近 $a$ 的數列，使 $f$ 沿兩條數列趨向不同的值即可。

## 唯一性

若 $f$ 在 $a$ 處的極限存在，則它是**唯一的**。由數列刻劃立即可得：若 $f(x) \to L$ 且 $f(x) \to L'$，則對任意滿足 $x_n \to a$、$x_n \neq a$ 的數列，同時有 $f(x_n) \to L$ 和 $f(x_n) \to L'$，由數列極限的唯一性得 $L = L'$。

## 單側極限

有時 $f$ 從不同方向趨近時會趨向不同的值。**左極限（left-hand limit）**定義為

$$
\lim_{x \to a^-} f(x) \coloneqq L，
$$

若對每個 $\varepsilon > 0$ 存在 $\delta > 0$ 使得 $-\delta < x - a < 0$ 蘊含 $|f(x) - L| < \varepsilon$。**右極限（right-hand limit）** $\lim_{x \to a^+} f(x)$ 對稱地定義。

雙側極限存在且等於 $L$，當且僅當兩個單側極限都存在且都等於 $L$。

## 計算極限

### 多項式與有理函式

對任意多項式 $p$ 及 $a \in \mathbb{R}$：

$$
\lim_{x \to a} p(x) = p(a).
$$

這由 $\lim_{x \to a} x = a$ 及[極限的局部性質](../local_properties/)中所證的算術法則推得。對於有理函式（rational function） $r = p/q$，若 $q(a) \neq 0$，則商的法則給出 $\lim_{x \to a} r(x) = r(a)$。

當 $q(a) = 0$ 但同時 $p(a) = 0$ 時，或許可以在取極限前消去公因式。

### 一個基本三角極限

$$
\lim_{x \to 0} \frac{\sin x}{x} = 1.
$$

標準幾何證明表明對 $0 < |x| < \pi/2$ 有 $\cos x < \dfrac{\sin x}{x} < 1$。因 $\cos x \to 1$（當 $x \to 0$），由[夾擠定理](../local_properties/)迫使中間的表達式也趨向 $1$。

## 摘要

- **ε–δ 定義**：$\lim_{x \to a} f(x) = L$ 表示對每個 $\varepsilon > 0$ 存在 $\delta > 0$，使得 $0 < |x - a| < \delta$ 蘊含 $|f(x) - L| < \varepsilon$。$f$ 在 $a$ 本身的值（或是否有定義）無關緊要。
- **數列刻劃**：$\lim_{x \to a} f(x) = L$ 當且僅當對每個滿足 $x_n \to a$、$x_n \neq a$ 的數列都有 $f(x_n) \to L$。兩種刻劃等價。
- **雙側極限**存在若且唯若兩個單側極限都存在且相等。
- 多項式與有理函式（分母非零）的極限等於函數在該點的值；夾擠定理可處理許多其他情形。
