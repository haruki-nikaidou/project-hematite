---
title: 外測度
summary: "外測度は可算個の開区間の被覆に対する全長の下限を取ることで、空間のすべての部分集合に大きさを割り当てる。このチェックポイントでは外測度を定義し、単調性と可算劣加法性を証明し、一般に可算加法性が成り立たない理由——可測集合への制限の動機——を示す。"
prerequisites:
  - basis/math/measure/sigma_algebra
  - basis/math/analysis/supremum_infimum
aliases: []
tags:
  - Measure Theory
updated: 2026-05-20
---

$\mathbb{R}$ のすべての部分集合に「大きさ」を割り当てる関数が欲しい。[σ-加法族](../sigma_algebra/)は最終的に何が可測になるかを教えてくれるが、その制限を行う前に、まず*すべての*部分集合に対して定義される予備的なサイズ関数——**外測度**（outer measure）——を構築する。外測度の長所は常に well-defined であること；短所は可算加法的でなく劣加法的にしかならないことだ。その欠点を修正するのがカラテオドリの仕事で、次のチェックポイントで扱う。

## 定義

考え方は、集合 $E$ の大きさを開区間で外側から覆い、その長さの和の[下限](../analysis/supremum_infimum/)を取ることで*外から*近似するというものだ。

**定義。** 任意の集合 $E \subseteq \mathbb{R}$ に対して、$E$ の**ルベーグ外測度**（Lebesgue outer measure）は

$$
\lambda^*(E) \;\coloneqq\; \inf\!\left\{
  \sum_{k=1}^{\infty} (b_k - a_k)
  \;\middle|\;
  E \subseteq \bigcup_{k=1}^{\infty} (a_k, b_k)
\right\} \tag{1}
$$

と定義される。ここで下限は $E$ を覆うすべての可算個の開区間の族 $(a_k, b_k)$ にわたる。上界が存在しない場合は $\lambda^*(E) = +\infty$ とする。

いくつかの注意点：
- 区間 $(a_k, b_k)$ は重なり合ってもよい；$b_k - a_k$ は $k$ 番目の区間の長さだ。
- 同じ区間を複数回使うことも許される（ただしそれは被覆を無駄に使うだけだ）。
- 有限被覆は可算被覆の特別な場合だ（空の区間で埋めればよい）。

同じ構成は $n$ 次元の箱を使って $\mathbb{R}^n$ でも、また適切な「基本集合」を使って任意の距離空間でも機能するが、ここでは $\mathbb{R}$ 上で作業する。

## 三つの基本的な性質

### (i) 空集合の外測度はゼロ

$$
\lambda^*(\emptyset) = 0. \tag{2}
$$

任意の $\varepsilon > 0$ に対して $\emptyset$ を長さ $\varepsilon$ の一つの区間 $(0, \varepsilon)$ で覆えるので $\lambda^*(\emptyset) \leq \varepsilon$；$\varepsilon \to 0$ とすれば $\lambda^*(\emptyset) \leq 0$；長さは非負なので $\lambda^*(\emptyset) = 0$。

### (ii) 単調性

$A \subseteq B \subseteq \mathbb{R}$ ならば、

$$
\lambda^*(A) \leq \lambda^*(B). \tag{3}
$$

$B$ の可算被覆はすべて $A$ の可算被覆でもある。したがって $B$ の被覆上の下限は $\lambda^*(A)$ 以上の数になる。

### (iii) 可算劣加法性

任意の集合列 $E_1, E_2, E_3, \ldots \subseteq \mathbb{R}$ に対して、

$$
\lambda^*\!\left(\bigcup_{k=1}^{\infty} E_k\right) \;\leq\; \sum_{k=1}^{\infty} \lambda^*(E_k). \tag{4}
$$

*証明の概略。* いずれかの $\lambda^*(E_k) = +\infty$ ならば不等式は自明。そうでない場合、$\varepsilon > 0$ を固定する。各 $k$ について $E_k$ を全長が $\lambda^*(E_k) + \varepsilon/2^k$ 以下の可算個の開区間で覆う。これらすべての区間を合わせると $\bigcup_k E_k$ の可算被覆になり、総長さは

$$
\sum_{k=1}^{\infty}\!\left(\lambda^*(E_k) + \frac{\varepsilon}{2^k}\right)
= \sum_{k=1}^{\infty} \lambda^*(E_k) + \varepsilon
$$

以下だ。$\varepsilon$ は任意なので $(4)$ が従う。

これら三つの性質——正規化 $(2)$、単調性 $(3)$、可算劣加法性 $(4)$——が抽象的な意味での**外測度**（outer measure）の定義公理だ。集合 $X$ 上でこれらを満たす任意の関数 $\mu^* \colon 2^X \to [0, +\infty]$ を $X$ 上の外測度という。

## 外測度は区間の長さと一致する

基本的な整合性確認として：有界閉区間 $[a, b]$ に対して

$$
\lambda^*([a, b]) = b - a. \tag{5}
$$

**上界。** $[a, b]$ を一つの区間 $(a - \varepsilon, b + \varepsilon)$ で覆えば $\lambda^*([a,b]) \leq b - a + 2\varepsilon$；$\varepsilon \to 0$。

**下界。** $[a, b]$ の任意の開被覆は*有限*部分被覆を持つ（ハイネ・ボレルの定理）。有限被覆の長さの和は $b - a$ 以上だ（区間の重なりに関する帰納法による標準的な議論）。可算被覆はすべてそのような有限部分被覆を含むので、下限も $b - a$ 以上だ。

合わせて $\lambda^*([a,b]) = b - a$。同様の議論で開区間や半開区間についても $\lambda^*((a,b)) = \lambda^*([a,b)) = b - a$ が成り立つ。

## 可算加法性が成り立たない理由

外測度は劣加法性 $(4)$ を満たすが、すべての部分集合に対して可算加法性を**満たさない**。[測度入門](../introduce_to_measure/)のヴィタリ集合 $V$ がその証人だ：平行移動 $V_q \coloneqq V + q$（$q \in \mathbb{Q} \cap [-1, 1]$）は互いに素であり、

$$
[0,1] \;\subseteq\; \bigcup_{q \in \mathbb{Q} \cap [-1,1]} V_q \;\subseteq\; [-1, 2].
$$

単調性より $1 \leq \lambda^*\!\left(\bigcup_q V_q\right) \leq 3$。すべての $V_q$ は $V$ の平行移動なので同じ外測度を持つ。もし可算加法性が成り立てば、和は $0$（$\lambda^*(V) = 0$ のとき）か $+\infty$（$\lambda^*(V) > 0$ のとき）になるが、どちらも $[1, 3]$ に属さない。矛盾。

結論：外測度は $\mathbb{R}$ の*すべての*部分集合上で可能な最善だ。真の加法性を得るには、適切な部分族——[カラテオドリの基準](../measurable_criterion/)が特定する可測集合——に制限しなければならない。

## まとめ

- **ルベーグ外測度** $\lambda^*(E)$ は式 $(1)$ で $E$ の可算開被覆の全長の下限として定義される。
- 満たす性質：$\lambda^*(\emptyset) = 0$（式 $(2)$）、**単調性**（式 $(3)$）、**可算劣加法性**（式 $(4)$）。
- これら三つの性質が外測度の抽象的定義であり、$\lambda^*$ は $\mathbb{R}$ 上の外測度だ。
- 区間上では $\lambda^*$ は普通の長さと一致する——式 $(5)$。
- すべての部分集合に対する可算加法性は成り立たない：ヴィタリ集合は $2^{\mathbb{R}}$ 上に一貫した平行移動不変かつ可算加法的な測度が存在しないことを示す。
- 解決策は[カラテオドリの基準](../measurable_criterion/)だ：すべてのテスト集合を加法的に分割する集合を特定し、それらに $\lambda^*$ を制限する。
