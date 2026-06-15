---
title: 黎曼積分的定義
summary: "黎曼積分（Riemann integral）將 [a, b] 上有界函數的積分定義為：當上達布和與下達布和隨分割趨於精細時，二者的公共極限。本章建立分割、上和與下和的概念及黎曼可積性，並證明閉區間上的每個連續函數均可積。"
prerequisites:
  - basis/math/calculus/continuous_function/continuous
  - basis/math/analysis/limit
aliases: []
tags:
  - 微積分
  - 積分
updated: 2026-05-20
---

你已知道如何求簡單圖形的面積——矩形、三角形、圓形。但 $y = x^2$ 的曲線在 $0$ 到 $1$ 之間圍出的面積是多少？沒有幾何公式可以直接套用。**黎曼積分（Riemann integral）**正是解答：它將「曲線下方的面積」定義為愈來愈精細的矩形近似之極限，且嚴謹到足以用來證明定理。

## 分割與達布和

設 $f: [a, b] \to \mathbb{R}$ 為**有界**函數。$[a, b]$ 的一個**分割（partition）**是有限序列

$$
P = \{a = x_0 < x_1 < x_2 < \cdots < x_n = b\}.
$$

在每個子區間 $[x_{i-1}, x_i]$ 上，$f$ 有界，故其上確界與下確界存在：

$$
M_i \coloneqq \sup_{x \in [x_{i-1},\, x_i]} f(x), \qquad m_i \coloneqq \inf_{x \in [x_{i-1},\, x_i]} f(x).
$$

$f$ 關於 $P$ 的**上達布和（upper Darboux sum）**與**下達布和（lower Darboux sum）**定義為：

$$
U(f, P) \coloneqq \sum_{i=1}^{n} M_i\,(x_i - x_{i-1}), \qquad L(f, P) \coloneqq \sum_{i=1}^{n} m_i\,(x_i - x_{i-1}).
$$

幾何上，$U(f,P)$ 是位於圖形*上方*的矩形總面積，$L(f,P)$ 是位於圖形*下方*的矩形總面積。由於對每個 $i$ 均有 $m_i \le M_i$，故恆有 $L(f,P) \le U(f,P)$。

### 加細分割

若 $P \subseteq Q$（$P$ 的每個邊界點也在 $Q$ 中），則稱 $Q$ 是 $P$ 的**加細（refinement）**。加入點只會使上和降低、下和升高：

$$
P \subseteq Q \implies L(f, P) \le L(f, Q) \le U(f, Q) \le U(f, P).
$$

由此可得：任意兩個分割 $P_1$ 與 $P_2$，即使不同，也有 $L(f, P_1) \le U(f, P_2)$。

## 上積分與下積分

由於所有下和組成的集合有上界（任意上和均為上界），其上確界在 $\mathbb{R}$ 中存在。類似地，所有上和的下確界也存在。這兩個值分別定義了 $f$ 的**下積分（lower integral）**與**上積分（upper integral）**：

$$
\underline{\int_a^b} f \;\coloneqq\; \sup_P L(f, P), \qquad \overline{\int_a^b} f \;\coloneqq\; \inf_P U(f, P).
$$

由於每個下和均 $\le$ 每個上和，故恆有 $\underline{\int} f \le \overline{\int} f$。

## 黎曼可積性

若有界函數 $f: [a, b] \to \mathbb{R}$ 的上積分與下積分相等，則稱 $f$ 為**黎曼可積（Riemann integrable）**：

$$
\underline{\int_a^b} f \;=\; \overline{\int_a^b} f.
$$

當二者相等時，其公共值稱為 $f$ 在 $[a, b]$ 上的**黎曼積分**，記作

$$
\int_a^b f(x)\,dx \;=\; \int_a^b f.
$$

### 達布判準

一個實用的等價敘述：$f$ 為黎曼可積若且唯若對任意 $\varepsilon > 0$，存在分割 $P$ 使得

$$
U(f, P) - L(f, P) \;<\; \varepsilon. \tag{1}
$$

這是大多數可積性證明的主要工具。

### 等價的黎曼和定義

也可以直接用**黎曼和（Riemann sum）**來定義積分。對分割 $P$ 與**樣本點（sample points）**的選取 $\xi_i \in [x_{i-1}, x_i]$，黎曼和為

$$
S(f, P, \boldsymbol\xi) \;\coloneqq\; \sum_{i=1}^n f(\xi_i)\,(x_i - x_{i-1}).
$$

$P$ 的**網格寬（mesh）**定義為 $\|P\| \coloneqq \max_i(x_i - x_{i-1})$。則 $f$ 為黎曼可積且積分值為 $I$ 若且唯若：對任意 $\varepsilon > 0$，存在 $\delta > 0$，使得 $\|P\| < \delta$ 時，對*任意*樣本點選取均有 $|S(f,P,\boldsymbol\xi) - I| < \varepsilon$。

達布方法與黎曼和方法等價；達布方法在證明中通常更為簡潔。

## 連續函數均可積

**定理。** 若 $f: [a, b] \to \mathbb{R}$ 為連續函數，則 $f$ 為黎曼可積。

**證明。** 閉有界區間上的連續函數為**一致連續（uniformly continuous）**：對任意 $\varepsilon > 0$，存在 $\delta > 0$，使得 $|x - y| < \delta \Rightarrow |f(x) - f(y)| < \varepsilon/(b-a)$。

給定 $\varepsilon > 0$，如上選取 $\delta$，並令 $P$ 為任意網格寬 $\|P\| < \delta$ 的分割。對每個子區間 $[x_{i-1}, x_i]$，由於其中任意兩點距離均小於 $\delta$，振盪量滿足

$$
M_i - m_i \;\le\; \frac{\varepsilon}{b-a}.
$$

因此

$$
U(f,P) - L(f,P) \;=\; \sum_{i=1}^n (M_i - m_i)(x_i - x_{i-1}) \;\le\; \frac{\varepsilon}{b-a} \cdot (b-a) \;=\; \varepsilon.
$$

由達布判準 $(1)$，$f$ 可積。$\square$

## 計算範例：$\int_0^1 x^2\,dx$

取 $f(x) = x^2$，均勻分割 $P_n = \{0, \tfrac{1}{n}, \tfrac{2}{n}, \ldots, 1\}$。由於 $f$ 在 $[0,1]$ 上遞增：

$$
M_i = \left(\frac{i}{n}\right)^2, \qquad m_i = \left(\frac{i-1}{n}\right)^2, \qquad \Delta x_i = \frac{1}{n}.
$$

上和與下和分別為：

$$
U(f, P_n) = \frac{1}{n} \sum_{i=1}^n \frac{i^2}{n^2} = \frac{1}{n^3} \cdot \frac{n(n+1)(2n+1)}{6} = \frac{(n+1)(2n+1)}{6n^2},
$$

$$
L(f, P_n) = \frac{1}{n} \sum_{i=0}^{n-1} \frac{i^2}{n^2} = \frac{(n-1)(2n-1)}{6n^2}.
$$

二者之差為 $U - L = \frac{(n+1)(2n+1) - (n-1)(2n-1)}{6n^2} = \frac{6n}{6n^2} = \frac{1}{n} \to 0$。故達布判準成立，兩個和均收斂至 $\frac{1}{3}$，確認了

$$
\int_0^1 x^2\,dx \;=\; \frac{1}{3}.
$$

## 摘要

- $[a,b]$ 的**分割**將其切分為子區間；**達布和** $L(f,P)$ 與 $U(f,P)$ 分別從下方與上方界定「$f$ 下方的面積」。
- **下積分** $\underline{\int} f$ 與**上積分** $\overline{\int} f$ 分別是所有下和與上和的上確界與下確界。
- 當 $\underline{\int} f = \overline{\int} f$ 時，$f$ 為**黎曼可積**；公共值即為 $\int_a^b f$。
- **達布判準**：$f$ 可積若且唯若對任意 $\varepsilon > 0$，某個分割能使 $U(f,P) - L(f,P) < \varepsilon$。
- $[a,b]$ 上的每個**連續**函數均可積，這源於一致連續性。
