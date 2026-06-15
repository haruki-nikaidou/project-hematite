---
title: 連續函數（Continuous Function）
summary: "若函式在某點的極限等於該點的函數值，則稱函式在該點連續。本章定義一點處與集合上的連續性，證明連續函式的代數封閉性，並說明所有初等函式在其定義域上均連續。"
prerequisites:
  - basis/math/calculus/continuous_function/limit_of_function
  - basis/math/calculus/continuous_function/local_properties
aliases: []
tags:
  - 微積分
  - 連續性
updated: 2026-05-20
---

[函數極限](../limit_of_function/)告訴你函式在某點*趨近*的值。連續性則追問函式是否*抵達*——極限是否等於實際的函數值。直觀上，若輸入的微小改變只帶來輸出的微小改變，沒有突然的跳躍或缺口，則函式是連續的。

## 在某點連續

**定義。** 函式 $f : D \to \mathbb{R}$ 在 **$a \in D$ 處連續（continuous at $a$）**，若

$$
\lim_{x \to a} f(x) = f(a).
$$

這將三個條件打包成一個：(1) $f(a)$ 有定義，(2) $\lim_{x \to a} f(x)$ 存在，(3) 極限等於 $f(a)$。

用 ε–δ 語言表述：$f$ 在 $a$ 連續，若且唯若對每個 $\varepsilon > 0$，存在 $\delta > 0$ 使得

$$
x \in D \text{ 且 } |x - a| < \delta \implies |f(x) - f(a)| < \varepsilon.
$$

注意與極限定義不同：此處 $x$ 可以等於 $a$——在該點條件顯然成立。

若 $a$ 是 $D$ 的**孤立點（isolated point）**——$a$ 的某個鄰域不包含 $D$ 中的其他點——則 $f$ 在 $a$ 處自動連續，因為極限條件被空洞地滿足。

## 在集合上連續

**定義。** 若 $f$ 在 $S$ 的每個點都連續，則稱 $f$ 在 **$S \subseteq D$ 上連續（continuous on $S$）**。當 $S = D$ 時，簡稱 $f$ 是**連續的**。

對於定義在閉區間 $[a, b]$ 上的函式，端點處的連續性以單側方式解釋：$\lim_{x \to a^+} f(x) = f(a)$ 且 $\lim_{x \to b^-} f(x) = f(b)$。

## 連續函式的代數封閉性

[極限的算術法則](../local_properties/)可以直接沿用。

**定理。** 若 $f$ 和 $g$ 在 $a$ 處連續，則下列函式也在 $a$ 處連續：
- $f + g$、$f - g$、$f \cdot g$
- $f / g$，前提是 $g(a) \neq 0$
- $c \cdot f$，其中 $c$ 為任意常數

*證明。* 以 $f + g$ 為例：因 $\lim_{x \to a} f(x) = f(a)$ 且 $\lim_{x \to a} g(x) = g(a)$，極限的和法則給出 $\lim_{x \to a}(f + g)(x) = f(a) + g(a) = (f + g)(a)$。其餘情形類似地由對應的極限法則推得。$\square$

### 複合函式

**定理。** 若 $g$ 在 $a$ 處連續，$f$ 在 $g(a)$ 處連續，則 $f \circ g$ 在 $a$ 處連續。

*證明。* 設 $\varepsilon > 0$。$f$ 在 $g(a)$ 的連續性給出 $\eta > 0$，使得 $|y - g(a)| < \eta$ 蘊含 $|f(y) - f(g(a))| < \varepsilon$。$g$ 在 $a$ 的連續性給出 $\delta > 0$，使得 $|x - a| < \delta$ 蘊含 $|g(x) - g(a)| < \eta$。合併：$|x - a| < \delta$ 蘊含 $|f(g(x)) - f(g(a))| < \varepsilon$。$\square$

## 初等函式均連續

每個[初等函式（elementary function）](../../../analysis/functions/elementary_function/)在其自然定義域上連續。

| 函式 | 連續的定義域 |
|------|-------------|
| 多項式 | $\mathbb{R}$ |
| 有理式 $p/q$ | $\{x : q(x) \neq 0\}$ |
| $e^x$ | $\mathbb{R}$ |
| $\ln x$ | $(0, \infty)$ |
| $\sin x$、$\cos x$ | $\mathbb{R}$ |
| $\tan x$ | $\{x : \cos x \neq 0\}$ |

多項式之所以連續，是因為 $\lim_{x \to a} x = a$，而[極限算術](../local_properties/)將此延伸至所有單項式，再延伸至所有多項式。其他初等函式的連續性則各自依據其定義或級數展開加以證明；複合函式由上述定理保持連續性。

這意味著，只要函式在該點有定義，你可以直接代入該點的值來計算初等表達式的極限。

## 不連續性

當 $f$ 在 $a$ 處不連續時，可按*實際發生的情況*對不連續性分類：

| 類型 | 行為 |
|------|------|
| 可去不連續（Removable） | $\lim_{x \to a} f(x)$ 存在但 $\neq f(a)$，或 $f(a)$ 無定義 |
| 跳躍不連續（Jump） | 兩個單側極限均存在但不相等：$\lim_{x \to a^-} f(x) \neq \lim_{x \to a^+} f(x)$ |
| 本質不連續（Essential） | 至少一個單側極限不存在（或為 $\pm\infty$） |

可去不連續可以藉由重新定義 $f(a) \coloneqq \lim_{x \to a} f(x)$ 來修復。跳躍不連續與本質不連續無法用這種方式補救。

## 摘要

- $f$ 在 **$a$ 處連續**若 $\lim_{x \to a} f(x) = f(a)$——極限存在且與函數值吻合。
- **在集合上連續**指在該集合每個點都連續。
- 連續函式的和、差、積、商（分母非零）及**複合**均連續。
- 每個初等函式在其**自然定義域上連續**；初等表達式的極限可直接代入計算。
- 不連續性分為可去、跳躍或本質三種——只有可去不連續可以藉由重新定義函數值來修復。
