---
title: 指數函數（Exponential Functions）
summary: "透過絕對收斂的冪級數 ∑ xᵏ/k! 定義指數函數 exp(x)，利用 Cauchy 乘積證明函數方程 exp(x+y) = exp(x)exp(y)，並建立 exp 恆正、嚴格遞增、為自身導函數，且值域為 (0, ∞) 等性質；同時定義一般指數 bˣ，說明為何 e 是最自然的底數。"
prerequisites:
  - basis/math/analysis/functions/polynomial_functions
  - basis/math/analysis/e
  - basis/math/analysis/limit
aliases: []
tags: ["初等函數"]
updated: 2026-05-13
---

你已經知道當 $n$ 是正整數時 $a^n$ 的含義：把 $a$ 自乘 $n$ 次。這個定義可以延伸到負整數（$a^{-n} = 1/a^n$）和有理指數（$a^{p/q} = \sqrt[q]{a^p}$）。但 $2^{\sqrt{2}}$ 或 $e^{\pi}$ 應該是什麼意思呢？無理指數無法「一次乘法一次乘法地」來定義，因此需要一種根本不同的方法。**指數函數（exponential function）**提供了這樣的方法：一個明確收斂的級數，對每個實數 $x$ 都給出精確的 $a^x$ 值。

## 從整數冪到所有實數指數

對固定底數 $a > 0$，整數冪是明確的，有理冪 $a^{p/q} \coloneqq (\sqrt[q]{a})^p$ 滿足熟悉的法則 $a^{r+s} = a^r a^s$ 和 $(a^r)^s = a^{rs}$。

將定義延伸到**無理數** $x$ 則更為微妙。由於 $\mathbb{Q}$ 在 $\mathbb{R}$ 中稠密（在[實數](../../real_number_a/)中已建立），每個無理數都是某個有理數列的極限，因此可以嘗試對任意有理數列 $r_n \to x$ 定義 $a^x \coloneqq \lim_{n \to \infty} a^{r_n}$。但這個方法只有在證明極限存在且與所選有理數列無關之後才能成立——而這反過來需要 $t \mapsto a^t$ 的連續性，這一事實尚未建立。

下面的冪級數定義完全繞開了這個循環論證。它給出了一個對所有 $x \in \mathbb{R}$ 從一開始就有效的明確、自足的公式。

## 冪級數定義

**定義。** **指數函數** $\exp \colon \mathbb{R} \to \mathbb{R}$ 由冪級數定義：

$$
\exp(x) \coloneqq \sum_{k=0}^{\infty} \frac{x^k}{k!} = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots \tag{1}
$$

$(1)$ 的部分和是 $x$ 的多項式（如[多項式函數](../polynomial_functions/)中所研究的），因此 $\exp$ 在精確意義上是多項式的無窮序列的極限。

### 絕對收斂

在使用 $(1)$ 之前，必須驗證它對每個實數 $x$ 都收斂。應用**比值審斂法（ratio test）**：相鄰兩項的絕對比值為

$$
\left\lvert\frac{x^{k+1}/(k+1)!}{x^k/k!}\right\rvert = \frac{|x|}{k+1}
$$

對任意固定的 $x \in \mathbb{R}$，當 $k \to \infty$ 時，此比值趨向 $0$（分母無界增長）。由於 $0 < 1$，比值審斂法保證了對所有 $x \in \mathbb{R}$ 的**絕對收斂**。

絕對收斂不只是技術性細節：它允許自由地重排和重組級數的項——這個許可在下一節中直接使用。

## 與 $e$ 的吻合

兩個最簡單的代入值確認 $\exp$ 與[e](../../e/)中引入的常數 $e$ 相符：

- **在 $x = 0$：** $\;\exp(0) = \displaystyle\sum_{k=0}^{\infty} \frac{0^k}{k!} = 1$（使用約定 $0^0 \coloneqq 1$）。
- **在 $x = 1$：** $\;\exp(1) = \displaystyle\sum_{k=0}^{\infty} \frac{1}{k!} = \frac{1}{0!} + \frac{1}{1!} + \frac{1}{2!} + \cdots = e$，

其中最後的等號正是[e](../../e/)中建立的 $e$ 的級數表示。

所以 $\exp$ 將 $0 \mapsto 1$ 且 $1 \mapsto e$，把 $e^x$ 作為 $\exp(x)$ 的替代記號與 $e$ 的所有整數次冪保持一致。

## 函數方程

$\exp$ 最重要的代數性質是：

$$
\exp(x + y) = \exp(x)\exp(y) \quad \text{對所有 } x, y \in \mathbb{R}. \tag{2}
$$

*證明。* 利用 **Cauchy 乘積（Cauchy product）**將兩個絕對收斂的級數相乘：

$$
\exp(x)\,\exp(y) = \left(\sum_{j=0}^{\infty}\frac{x^j}{j!}\right)\!\left(\sum_{k=0}^{\infty}\frac{y^k}{k!}\right) = \sum_{n=0}^{\infty}\sum_{j=0}^{n}\frac{x^j}{j!}\cdot\frac{y^{n-j}}{(n-j)!}.
$$

從內層求和中提取 $\tfrac{1}{n!}$ 並應用**二項式定理（binomial theorem）**：

$$
\sum_{j=0}^{n}\frac{x^j\,y^{n-j}}{j!\,(n-j)!} = \frac{1}{n!}\sum_{j=0}^{n}\binom{n}{j}x^j y^{n-j} = \frac{(x+y)^n}{n!}
$$

因此 $\exp(x)\,\exp(y) = \displaystyle\sum_{n=0}^{\infty}\dfrac{(x+y)^n}{n!} = \exp(x+y)$。

方程 $(2)$ 說明 $\exp$ 將加法轉化為乘法——這正是你對任何指數函數所期望的行為。代入 $y = 0$ 得 $\exp(x) \cdot 1 = \exp(x)$，代入 $y = -x$ 得下面要用到的一個關鍵推論。

## 恆正性

**命題。** $\exp(x) > 0$ 對所有 $x \in \mathbb{R}$ 成立。

*證明。* 在 $(2)$ 中令 $y = -x$：$\exp(x)\,\exp(-x) = \exp(0) = 1$。所以 $\exp(x)$ 和 $\exp(-x)$ 互為正的倒數——特別地，兩者均不為零。由於 $\exp(0) = 1 > 0$ 且 $\exp$ 連續（由收斂的冪級數給出），中間值定理迫使它在所有地方保持正值。

## 導函數

**定理。** $\dfrac{d}{dx}\exp(x) = \exp(x)$。

*證明。* 對 $(1)$ 逐項微分——由於級數在整個 $\mathbb{R}$ 上絕對收斂，這是合法的：

$$
\frac{d}{dx}\exp(x) = \sum_{k=1}^{\infty}\frac{k\,x^{k-1}}{k!} = \sum_{k=1}^{\infty}\frac{x^{k-1}}{(k-1)!} = \sum_{j=0}^{\infty}\frac{x^j}{j!} = \exp(x),
$$

其中最後一步使用了重新指標 $j = k - 1$。

函數 $\exp$ 因此是自身的導函數。這是它的定義性動態性質：$\exp$ 的增長速率恰好與其當前值成正比，比例常數為 $1$。

## 嚴格單調性

由於 $\exp(x) > 0$ 對所有 $x$ 成立，導函數 $(\exp)'(x) = \exp(x)$ 始終為正。在整個 $\mathbb{R}$ 上導函數嚴格為正的函式是**嚴格遞增的**：對 $x_1 < x_2$，有 $\exp(x_1) < \exp(x_2)$。

## 值域與極限行為

$\exp$ 的值域是開區間 $(0, \infty)$。

- **當 $x \to +\infty$：** 僅 $k = 1$ 項就給出 $\exp(x) \geq x$（對所有 $x \geq 0$），所以 $\exp(x) \to +\infty$。
- **當 $x \to -\infty$：** 由 $\exp(x)\,\exp(-x) = 1$ 得 $\exp(x) = 1/\exp(-x)$。因為 $-x \to +\infty$，$\exp(-x) \to +\infty$，所以 $\exp(x) \to 0^+$。

恆正性與這兩個極限合在一起說明 $\exp$ 的值域覆蓋 $(0, \infty)$：對任意 $y > 0$，對連續且嚴格遞增的 $\exp$ 應用中間值定理，保證存在**唯一**的 $x$ 使 $\exp(x) = y$。這個唯一的 $x$ 就是**自然對數（natural logarithm）** $\ln y$，其性質在[對數函數](../log/)中展開。

## 一般指數

有了 $\ln$，可以對任意正底數給出精確、統一的指數定義。對 $b > 0$，$b \neq 1$，令

$$
b^x \;\coloneqq\; \exp(x \ln b). \tag{3}
$$

利用函數方程 $(2)$，熟悉的指數法則立即得出：$b^{x+y} = \exp((x+y)\ln b) = \exp(x\ln b)\,\exp(y\ln b) = b^x b^y$，以及 $(b^x)^y = b^{xy}$。

定義 $(3)$ 也追溯性地確定了無理指數的值：$2^{\sqrt{2}} = \exp(\sqrt{2}\ln 2)$，這是由級數 $(1)$ 給出的完全確定的實數。

$\ln$ 的構造與對數函數的完整理論留待[對數函數](../log/)中說明。

## 為什麼 $e$ 是自然底數

對 $(3)$ 應用鏈式法則（chain rule）求導：

$$
\frac{d}{dx}b^x = \frac{d}{dx}\exp(x \ln b) = \ln b \cdot \exp(x \ln b) = \ln b \cdot b^x.
$$

$b^x$ 的導函數等於 $b^x$ 乘以常數 $\ln b$。使這個常數等於 $1$ 的**唯一**底數是 $b = e$，因為 $\ln e = 1$。對每個 $b \neq e$，微分都會引入不可避免的乘法因子 $\ln b \neq 1$。

這就是 $e$ 是**自然底數**的原因：它是唯一一個使指數函數成為自身導函數且沒有額外常數的底數。任何涉及 $b \neq e$ 時的 $b^x$ 都可以改寫為 $\exp(x \ln b)$，使 $\ln b$ 的角色顯式化，從而確認 $e$ 是真正基本的選擇。

## 摘要

- **指數函數**由 $\exp(x) \coloneqq \displaystyle\sum_{k=0}^{\infty} \dfrac{x^k}{k!}$ 定義，由比值審斂法（相鄰兩項之比為 $|x|/(k+1) \to 0$）對所有 $x \in \mathbb{R}$ **絕對收斂**。
- $\exp(0) = 1$ 且 $\exp(1) = e$，與 $e$ 的級數定義一致。
- **函數方程**：對所有 $x, y \in \mathbb{R}$，$\exp(x+y) = \exp(x)\exp(y)$，由 Cauchy 乘積與二項式定理證明。
- $\exp(x) > 0$ 對所有 $x$ 成立（因為 $\exp(x)\exp(-x) = 1$ 排除了任何零點）。
- $(\exp)'(x) = \exp(x)$：函數是**自身的導函數**，因此在各處**嚴格遞增**。
- $\exp$ 的**值域**是 $(0, \infty)$；$x \to +\infty$ 時 $\exp(x) \to +\infty$，$x \to -\infty$ 時 $\exp(x) \to 0$。
- **一般指數**由 $b^x \coloneqq \exp(x \ln b)$（$b > 0$，$b \neq 1$）定義；其導函數為 $(b^x)' = \ln b \cdot b^x$。
- **自然底數** $e$ 是唯一使 $(b^x)' = b^x$ 成立且沒有額外常數的底數。
