---
title: 數列的極限
summary: "定義度量空間中數列的極限，證明極限的唯一性，並探討等價的鄰域刻畫。"
prerequisites: 
  - elementry/math/metric_space
  - basis/math/analysis/neighbourhood
aliases: []
tags: ["分析學"]
updated: 2026-05-11
---

度量空間中的數列是一個無窮點列，它可能——也可能不——趨向某個目標。**收斂（convergence）**利用度量將「趨向目標」的直觀概念精確化。

## 度量空間中的數列

設 $(X, d)$ 是一個度量空間。$X$ 中的一個**數列（sequence）**是一個函式 $\mathbb{N} \to X$，記作 $(x_n)_{n \in \mathbb{N}}$ 或簡記為 $(x_n)$。每個 $x_n \in X$ 是數列的第 $n$ 個**項（term）**。

當 $X = \mathbb{R}$ 配上 $d(x, y) = |x - y|$ 時，這就是我們熟悉的實數數列。但同樣的定義在 $\mathbb{R}^k$、函數空間或任何其他度量空間中都同樣適用——距離 $d$ 承擔了所有工作。

## 收斂的定義

$(X, d)$ 中的數列 $(x_n)$ **收斂**到點 $L \in X$，若對每個 $\varepsilon > 0$ 都存在 $N \in \mathbb{N}$ 使得

$$
n \geq N \implies d(x_n,\, L) < \varepsilon. \tag{1}
$$

當此條件成立時，$L$ 是數列的**極限（limit）**，記作

$$
\lim_{n \to \infty} x_n = L \qquad \text{or} \qquad x_n \to L \text{ as } n \to \infty.
$$

解讀條件 $(1)$：你以任意小的容忍度 $\varepsilon > 0$ 挑戰數列。數列必須最終進入開球 $B(L, \varepsilon)$ 並*停留在那裡*——即從某個下標 $N$ 開始，之後的每一項 $x_n$ 都在 $L$ 的距離 $\varepsilon$ 之內。若數列對每個 $\varepsilon$ 都通過這個測試，它就收斂到 $L$。

收斂到某個極限的數列稱為**收斂數列**；否則稱為**發散數列**。

## 鄰域刻畫

條件 $(1)$ 可以用[鄰域](../neighbourhood/)重新簡潔地表述：

> 數列 $(x_n)$ 收斂到 $L$，若且唯若 $L$ 的每個[鄰域](../neighbourhood/)都包含數列除有限項以外的所有項。

*兩者等價的原因。* 若 $N$ 是 $L$ 的鄰域，它包含某個開球 $B(L, \varepsilon)$。由 $(1)$，每個 $n \geq N$ 的項 $x_n$ 都在 $B(L, \varepsilon) \subseteq \mathcal{N}$ 中，所以至多前 $N - 1$ 項可能在 $\mathcal{N}$ 之外——有限多項。反之，給定任意 $\varepsilon > 0$，球 $B(L, \varepsilon)$ 本身就是 $L$ 的鄰域，故由假設它包含除有限項以外的所有項；將最大的被排除下標記為 $N - 1$ 就恢復了條件 $(1)$。

鄰域形式在抽象證明中往往更方便，因為你不需要給出明確的 $\varepsilon$。

## 極限的唯一性

**定理。** 若度量空間中的數列 $(x_n)$ 收斂，其極限唯一。

*證明。* 假設 $x_n \to L$ 且 $x_n \to L'$。固定任意 $\varepsilon > 0$。選取 $N_1$ 使得對所有 $n \geq N_1$ 有 $d(x_n, L) < \varepsilon / 2$，選取 $N_2$ 使得對所有 $n \geq N_2$ 有 $d(x_n, L') < \varepsilon / 2$。對任意 $n \geq \max(N_1, N_2)$，三角不等式給出

$$
d(L, L') \leq d(L, x_n) + d(x_n, L') < \frac{\varepsilon}{2} + \frac{\varepsilon}{2} = \varepsilon.
$$

由於 $\varepsilon > 0$ 是任意的且 $d(L, L') \geq 0$，我們得出 $d(L, L') = 0$，從而 $L = L'$。$\square$

唯一性正是寫 $\lim_{n \to \infty} x_n = L$ 的依據——將極限視為*那個*極限，而非*某個*極限。

## 例子

**常數數列。** 若對所有 $n$ 有 $x_n = c$，則對每個 $n$ 和每個 $\varepsilon > 0$ 都有 $d(x_n, c) = 0 < \varepsilon$，故 $x_n \to c$。

**$\mathbb{R}^2$ 中的數列。** 設 $x_n = (1/n,\, 1/n^2) \in \mathbb{R}^2$ 配上歐氏距離。則

$$
d\!\left(x_n,\, (0,0)\right) = \sqrt{\frac{1}{n^2} + \frac{1}{n^4}} \leq \frac{1}{n} + \frac{1}{n^2}.
$$

右端趨向 $0$，故 $x_n \to (0, 0)$。

**離散度量。** 在配有離散度量的空間中，$d(x_n, L) < \varepsilon$（$\varepsilon \leq 1$）迫使 $x_n = L$。因此數列收斂到 $L$ 若且唯若它*最終常數為* $L$——即對所有足夠大的 $n$，$x_n = L$。

最後這個例子說明，即使是相同的底層集合，「收斂」在不同度量下的面貌可以截然不同。

## 摘要

- 數列 $(x_n)$ 在 $(X, d)$ 中**收斂到 $L$**，若對每個 $\varepsilon > 0$，除有限項外所有項都在球 $B(L, \varepsilon)$ 內。
- 等價地，$L$ 的每個[鄰域](../neighbourhood/)都包含數列除有限項以外的所有項。
- 極限存在時是**唯一的**——由三角不等式證明。
- 此定義在任意度量空間中都成立；它並非 $\mathbb{R}$ 所特有。
