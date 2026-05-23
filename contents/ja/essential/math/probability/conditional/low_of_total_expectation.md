---
title: 全期待値の法則
summary: "全期待値の法則は E[X] = E[E[X | Y]] を述べる——条件付き期待値を条件変数について平均すると無条件期待値が回復される。このチェックポイントでは離散・絶対連続の両ケースでこの恒等式を証明し、類似の全分散の法則 Var(X) = E[Var(X | Y)] + Var(E[X | Y]) を提示し、問題を単純化する補助変数に条件付けることで期待値を計算する手法に応用する。"
prerequisites:
  - essential/math/probability/conditional/conditional_exp
aliases: []
tags:
  - Probability
  - Conditional Probability
  - Expectation
updated: 2026-05-22
---

[全確率の法則](../conditional_pr/)は $P(A) = \sum_i P(A \mid B_i) P(B_i)$ を述べる。**全期待値の法則**（law of total expectation）はこれの期待値版だ：条件付き期待値を条件変数について平均すると無条件期待値が回復される。

## 定理と証明

**定理（全期待値の法則）。** 可積分な確率変数 $X$ と確率変数 $Y$ に対して：

$$
E[X] = E\!\left[E[X \mid Y]\right]. \tag{1}
$$

### 離散の場合の証明

$Y$ が値 $y_1, y_2, \ldots$ を $P(Y = y_i) = p_i$ の確率で取るとする。$E[X \mid Y]$ は事象 $\{Y = y_i\}$ 上で $E[X \mid Y = y_i]$ の値を取る確率変数だから：

$$
E\!\left[E[X \mid Y]\right] = \sum_i E[X \mid Y = y_i] \, p_i = \sum_i \sum_k x_k \, P(X = x_k \mid Y = y_i) \, p_i.
$$

$P(X = x_k \mid Y = y_i) \cdot p_i = P(X = x_k, Y = y_i)$ を使うと：

$$
= \sum_k x_k \sum_i P(X = x_k, Y = y_i) = \sum_k x_k \, P(X = x_k) = E[X]. \qquad \square
$$

### 絶対連続の場合の証明

$(X, Y)$ が結合密度 $f_{X,Y}$ と周辺密度 $f_X$、$f_Y$ を持つとする。$f_{X \mid Y}(x \mid y) f_Y(y) = f_{X,Y}(x,y)$ とフビニの定理（Fubini's theorem）を用いると：

$$
E\!\left[E[X \mid Y]\right] = \int_{-\infty}^{+\infty} E[X \mid Y = y] \, f_Y(y) \, dy = \int_{-\infty}^{+\infty} \!\!\left(\int_{-\infty}^{+\infty} x \, f_{X \mid Y}(x \mid y) \, dx\right) f_Y(y) \, dy
$$

$$
= \int_{-\infty}^{+\infty} x \left(\int_{-\infty}^{+\infty} f_{X,Y}(x,y) \, dy\right) dx = \int_{-\infty}^{+\infty} x \, f_X(x) \, dx = E[X]. \qquad \square
$$

## 計算の道具としての条件付け

$(1)$ の戦略的価値は条件変数 $Y$ の選び方にある：$E[X \mid Y = y]$ が簡単に計算できる $Y$ を選び、$Y$ の分布で組み合わせる。

**例。** 製品をバッチ単位で製造する工場を考える。バッチサイズ $N$ はパラメータ $p = 0.5$ の幾何分布（$E[N] = 1/p = 2$）に従う。バッチサイズ $n$ が与えられたとき、各製品は独立に確率 $q = 0.1$ で不良品だ。$D$ を不良品の総数とする。

$N$ で条件付けると、$D \mid N = n$ は $\operatorname{Binomial}(n, q)$ で平均 $nq$ だから

$$
E[D \mid N] = Nq.
$$

全期待値の法則から：

$$
E[D] = E[E[D \mid N]] = E[Nq] = q \, E[N] = 0.1 \times 2 = 0.2.
$$

## 全分散の法則

対応する恒等式が分散を2つの解釈しやすい成分に分解する：

$$
\operatorname{Var}(X) = E[\operatorname{Var}(X \mid Y)] + \operatorname{Var}(E[X \mid Y]). \tag{2}
$$

第1項 $E[\operatorname{Var}(X \mid Y)]$ は**群内分散**（within-group variance）——$Y$ の各水準での $X$ の平均的な変動性。第2項 $\operatorname{Var}(E[X \mid Y])$ は**群間分散**（between-group variance）——条件付き平均 $E[X \mid Y = y]$ が $Y$ の水準間でどれだけ変動するか。

*証明。* $\operatorname{Var}(Z) = E[Z^2] - (E[Z])^2$ と全期待値の法則を使う：

$$
E[X^2] = E\!\left[E[X^2 \mid Y]\right] = E\!\left[\operatorname{Var}(X \mid Y) + (E[X \mid Y])^2\right].
$$

$(E[X])^2 = (E[E[X \mid Y]])^2$ を引くと：

$$
\operatorname{Var}(X) = E[\operatorname{Var}(X \mid Y)] + E[(E[X \mid Y])^2] - (E[E[X \mid Y]])^2 = E[\operatorname{Var}(X \mid Y)] + \operatorname{Var}(E[X \mid Y]).
$$

**例（続き）。** 上の $D$ と $N$ の設定で、$\operatorname{Var}(D \mid N = n) = nq(1-q)$ なので $\operatorname{Var}(D \mid N) = Nq(1-q)$、$E[D \mid N] = Nq$。

幾何分布$(p=0.5)$ では $\operatorname{Var}(N) = (1-p)/p^2 = 2$。

- 群内分散：$E[\operatorname{Var}(D \mid N)] = E[Nq(1-q)] = q(1-q) E[N] = 0.1 \times 0.9 \times 2 = 0.18$。
- 群間分散：$\operatorname{Var}(E[D \mid N]) = \operatorname{Var}(Nq) = q^2 \operatorname{Var}(N) = 0.01 \times 2 = 0.02$。

よって $\operatorname{Var}(D) = 0.18 + 0.02 = 0.20$。

## まとめ

- **全期待値の法則**：$E[X] = E[E[X \mid Y]]$——条件付き期待値を条件変数について平均すると無条件期待値が回復される。
- **戦略的な使い方**：$E[X \mid Y = y]$ が簡単な閉じた形を持つような $Y$ を選び、$Y$ の分布で組み合わせる。
- **全分散の法則**：$\operatorname{Var}(X) = E[\operatorname{Var}(X \mid Y)] + \operatorname{Var}(E[X \mid Y])$——全分散 = 群内分散 + 群間分散。
