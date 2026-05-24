---
title: 確率変数の独立性
summary: "2 つの確率変数 X と Y が独立であるとは、同時分布が周辺分布の積に分解される場合——F(x, y) = F_X(x) F_Y(y)、あるいは同値として同時密度（または PMF）が積に分解される——をいう。このチェックポイントでは定義を与え、独立な可積分確率変数に対する積の期待値の分解 E[XY] = E[X] E[Y] を証明し、3 つ以上の変数における対ごとの独立性と相互独立性の違いを説明する。"
prerequisites:
  - essential/math/probability/2d_random_variables/jointly_distributed
aliases: []
tags:
  - Probability
  - Random Variables
  - Independence
updated: 2026-05-22
---

独立性は 2 つの確率変数の間で最も単純な関係だ：一方の値を知っても他方について何も分からない。形式的な定義はこの直観を[同時分布](../jointly_distributed/)の積分解条件に翻訳し、そこから独立な和・積の期待値・分散の加法性の理論が全て導かれる。

## 定義

2 つの確率変数 $X$ と $Y$ が**独立**（independent）であるとは、すべてのボレル集合 $B_1, B_2 \in \mathcal{B}(\mathbb{R})$ に対して

$$
P(X \in B_1,\, Y \in B_2) = P(X \in B_1) \cdot P(Y \in B_2)
$$

が成立する場合をいう。同値な言い方をすれば、同時分布 $P_{(X,Y)}$ が積測度 $P_X \otimes P_Y$ に等しい：

$$
P_{(X,Y)}(B_1 \times B_2) = P_X(B_1) \cdot P_Y(B_2) \quad \text{すべての } B_1, B_2 \in \mathcal{B}(\mathbb{R}).
$$

$\mathcal{B}(\mathbb{R}^2)$ は長方形 $B_1 \times B_2$ によって生成されるので、長方形上の積測度条件が同時分布全体を決定する。

### CDF による特徴付け

同値な特徴付け：$X$ と $Y$ が独立であることは、

$$
F_{X,Y}(x, y) = F_X(x) \cdot F_Y(y) \quad \text{すべての } (x, y) \in \mathbb{R}^2 \tag{1}
$$

が成立することと同値だ。確認に最も便利な形式だ。

### 離散の場合

同時離散な $(X, Y)$ に対して、独立性は**同時 PMF の積分解**と同値だ：

$$
p_{X,Y}(x, y) = p_X(x) \cdot p_Y(y) \quad \text{すべての } (x, y).
$$

### 絶対連続の場合

同時絶対連続な $(X, Y)$ に対して、独立性は**同時 PDF の積分解**と同値だ：

$$
f_{X,Y}(x, y) = f_X(x) \cdot f_Y(y) \quad \text{ほとんどすべての } (x, y). \tag{2}
$$

**例。** 単位正方形上の一様分布は $[0,1]^2$ 上で $f_{X,Y}(x,y) = 1$ であり、周辺分布はいずれも $f_X(x) = 1$、$f_Y(y) = 1$（$[0,1]$ 上）だ。$1 = 1 \cdot 1$ と積分解するので $X, Y$ は独立だ。

これと対比して単位円板 $\{x^2 + y^2 \leq 1\}$ 上の一様分布を考える。密度は円板内で $1/\pi$、外で $0$ だ。$X$ の周辺密度は $f_X(x) = \frac{2}{\pi}\sqrt{1-x^2}$（$x \in [-1,1]$）となって定数でなく、同時密度は積分解しないので $X, Y$ は独立でない。

## 独立性は期待値の積分解を含意する

**定理。** $X$ と $Y$ が独立で、$g, h : \mathbb{R} \to \mathbb{R}$ が有界可測ならば、

$$
E[g(X)\, h(Y)] = E[g(X)] \cdot E[h(Y)]. \tag{3}
$$

*証明。* $P_{(X,Y)} = P_X \otimes P_Y$ なので、フビニ–トネリの定理により：

$$
E[g(X) h(Y)] = \iint g(x)\, h(y)\, d(P_X \otimes P_Y)(x, y) = \int g(x)\, dP_X(x) \cdot \int h(y)\, dP_Y(y) = E[g(X)] \cdot E[h(Y)].
$$

$g = h = \operatorname{id}$ を代入すると、実用上最もよく使われる特殊ケースが得られる：

$$
E[XY] = E[X] \cdot E[Y] \quad \text{（$X, Y$ が独立かつ可積分のとき）.} \tag{4}
$$

この等式は[共分散と相関](../cov/)に登場し、独立な変数に対して $\operatorname{Cov}(X, Y) = 0$ であることをすぐに含意する。

## 関数の独立性

$X$ と $Y$ が独立で $g, h : \mathbb{R} \to \mathbb{R}$ が可測ならば、$g(X)$ と $h(Y)$ も独立だ。鍵となる観察は $\{g(X) \in B_1\} = \{X \in g^{-1}(B_1)\}$ であり、$X$ と $Y$ の原像に対する独立性が $g(X)$ と $h(Y)$ に引き継がれる。

## 対ごとの独立性と相互独立性

3 つ以上の確率変数 $X_1, X_2, \ldots, X_n$ の族に対しては、2 つの異なる概念がある：

- **対ごとの独立性**（pairwise independence）：$i \neq j$ なるすべての対 $X_i, X_j$ が独立。
- **相互独立性**（mutual independence）：すべての空でない部分集合 $I \subseteq \{1, \ldots, n\}$ とボレル集合の族 $(B_i)_{i \in I}$ に対して

$$
P\!\left(\bigcap_{i \in I} \{X_i \in B_i\}\right) = \prod_{i \in I} P(X_i \in B_i).
$$

対ごとの独立性は相互独立性を**含意しない**。

**反例。** $X_1, X_2$ を独立な $\operatorname{Bernoulli}(\tfrac{1}{2})$ 変数とし、$X_3 = X_1 \oplus X_2$（$\mathbb{Z}/2\mathbb{Z}$ での加算、すなわち XOR）と定める。各対は対ごとに独立だ：例えば $P(X_1 = a, X_3 = b) = \tfrac{1}{4}$（すべての $a, b \in \{0,1\}$）で $\tfrac{1}{2} \cdot \tfrac{1}{2}$ と一致する。しかし $X_1$ と $X_2$ を両方知れば $X_3$ が完全に決まるので、3 つ組は相互独立でない：

$$
P(X_1 = 0,\, X_2 = 0,\, X_3 = 0) = \tfrac{1}{4} \neq \tfrac{1}{2} \cdot \tfrac{1}{2} \cdot \tfrac{1}{2} = \tfrac{1}{8}.
$$

$n \geq 3$ 変数について「独立」と述べるとき、特に断らない限り相互独立性を意味する。

## まとめ

- $X$ と $Y$ が**独立**とは $P_{(X,Y)} = P_X \otimes P_Y$、同値として $F_{X,Y}(x,y) = F_X(x)\, F_Y(y)$。
- 離散変数：同時 PMF が積分解する、$p_{X,Y}(x,y) = p_X(x)\, p_Y(y)$。
- 絶対連続変数：同時 PDF がほぼいたるところ積分解する、$f_{X,Y}(x,y) = f_X(x)\, f_Y(y)$。
- 独立性は有界可測な $g, h$ に対して $E[g(X)\,h(Y)] = E[g(X)]\,E[h(Y)]$ を含意し、特に $E[XY] = E[X]\,E[Y]$。
- $X$ と $Y$ が独立ならば $g(X)$ と $h(Y)$ も独立。
- **対ごとの独立性**は**相互独立性**を含意しない：XOR の反例がこのギャップを示している。
