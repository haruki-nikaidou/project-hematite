---
title: ルベーグ測度
summary: "ルベーグ測度は区間の長さから構築された外測度をそのカラテオドリ可測集合に制限したものだ。このチェックポイントでは ℝ 上のルベーグ外測度を構築し、ルベーグ σ-加法族を特定し、開集合・閉集合・零集合・平行移動不変性などの基本的な計算を行う。"
prerequisites:
  - basis/math/measure/measurable_criterion
aliases: []
tags:
  - Measure Theory
updated: 2026-05-20
---

ピースがすべて揃った。[外測度](../outer_measure/)は $\mathbb{R}$ のすべての部分集合に大きさの関数 $\lambda^*$ を与え、[カラテオドリの基準](../measurable_criterion/)は $\lambda^*$ が真の可算加法的測度になる集合を選び出す。これらを組み合わせると**ルベーグ測度**（Lebesgue measure）——$\mathbb{R}$ 上の長さの標準的な概念——が得られる。

## ルベーグ σ-加法族とルベーグ測度

**定義。** **ルベーグ σ-加法族**（Lebesgue σ-algebra）$\mathcal{L}$ は、ルベーグ外測度 $\lambda^*$ に関してカラテオドリ可測なすべての集合 $E \subseteq \mathbb{R}$ の族だ：

$$
\mathcal{L} \;\coloneqq\; \{E \subseteq \mathbb{R} : \lambda^*(A) = \lambda^*(A \cap E) + \lambda^*(A \cap E^c) \text{ がすべての } A \subseteq \mathbb{R} \text{ について成立}\}. \tag{1}
$$

**ルベーグ測度**（Lebesgue measure）は制限

$$
\lambda \;\coloneqq\; \lambda^*\restriction_{\mathcal{L}} \colon \mathcal{L} \to [0, +\infty] \tag{2}
$$

だ。[カラテオドリの定理](../measurable_criterion/)により $\mathcal{L}$ は σ-加法族であり、$\lambda$ は $\mathcal{L}$ 上の完備かつ可算加法的な測度だ。

## すべての開集合はルベーグ可測

最初の課題はルベーグ測度が普通の幾何学を捉えていることを確かめること——すなわちすべての開区間、およびすべての開集合が $\mathcal{L}$ に属すことを検証する。

**主張。** すべての開区間 $(a, b)$ は $\mathcal{L}$ に属す。

*証明。* 任意のテスト集合 $A$ に対して

$$
\lambda^*(A) \geq \lambda^*(A \cap (a,b)) + \lambda^*(A \cap (a,b)^c)
$$

を示す必要がある。$A$ を覆う可算個の開区間の族 $\{I_k\}$ で $\sum_k |I_k| \leq \lambda^*(A) + \varepsilon$ となるものを固定する。各 $k$ について $I_k$ を $I_k \cap (a, b)$ と $I_k \setminus (a, b)$（後者は高々二つの区間）に分割する。これらの分割はそれぞれ $A \cap (a, b)$ と $A \cap (a, b)^c$ の被覆を与え、長さの和は $|I_k|$ になる。$k$ について足し合わせると：

$$
\lambda^*(A \cap (a,b)) + \lambda^*(A \cap (a,b)^c) \leq \sum_k |I_k| \leq \lambda^*(A) + \varepsilon.
$$

$\varepsilon$ は任意なので主張が従う。

$\mathbb{R}$ のすべての開集合は可算個の互いに素な開区間の和として書けるので（実解析の事実）、$\mathcal{L}$ が可算和について閉じていることから**すべての開集合は $\mathcal{L}$ に属す**。補集合を取ればすべての閉集合も $\mathcal{L}$ に属す。

## ボレル集合はルベーグ可測

$\mathcal{L}$ はすべての開集合を含み σ-加法族でもあるので、開集合によって生成された*最小の* σ-加法族——[σ-加法族](../sigma_algebra/)で定義したボレル σ-加法族 $\mathcal{B}(\mathbb{R})$——を含まなければならない：

$$
\mathcal{B}(\mathbb{R}) \;\subseteq\; \mathcal{L}. \tag{3}
$$

この包含は真だ：$\mathcal{L}$ にはボレルでない集合も含まれる（完備性により、ボレル零集合の部分集合は $\mathcal{L}$ に属すが、ボレル集合ではないものもある）。特に、すべてのボレル集合はルベーグ可測だが、ルベーグ σ-加法族は $\mathcal{B}(\mathbb{R})$ より真に大きい。

## 基本的な計算

### 区間

端点が $a \leq b$ の任意の有界区間 $I$ に対して、

$$
\lambda(I) = b - a, \tag{4}
$$

端点を含むかどうかによらず成り立つ。これは[外測度](../outer_measure/)の式 (5) を $\mathcal{L}$ の要素に適用したものだ。

$\lambda(\{a\}) = 0$ について：一点集合 $\{a\}$ は任意の $\varepsilon > 0$ に対して $(a - \varepsilon, a + \varepsilon)$ で覆えるので $\lambda^*(\{a\}) \leq 2\varepsilon$；したがって $\lambda(\{a\}) = 0$。開区間と閉区間の測度の公式はここから可算加法性を使って従う。

### 可算集合は零集合

$\lambda(N) = 0$ を満たす集合 $N$ を**零集合**（null set、または*測度零集合*）という。任意の可算集合は零集合だ：

$$
\lambda\!\left(\{x_1, x_2, x_3, \ldots\}\right) = \sum_{k=1}^{\infty} \lambda(\{x_k\}) = \sum_{k=1}^{\infty} 0 = 0. \tag{5}
$$

これは[測度入門](../introduce_to_measure/)の直観を確認する：$\lambda(\mathbb{Q} \cap [0,1]) = 0$、有理数が $[0,1]$ において稠密であるにもかかわらず。

### $[0,1]$ 内の開集合と閉集合

開集合の測度はきれいに分解する。$[0,1]$ 内のすべての開集合 $U$ は $U = \bigsqcup_k (a_k, b_k)$ と可算個の互いに素な開区間の和として書けるので、

$$
\lambda(U) = \sum_{k} (b_k - a_k). \tag{6}
$$

閉補集合 $F = [0,1] \setminus U$ については、$[0,1] = F \sqcup U$ の互いに素な分解での $\lambda$ の可算加法性より $\lambda(F) = 1 - \lambda(U)$ だ。

**カントール集合**（Cantor set）は印象的な例だ。$[0,1]$ から始めて、各ステップで残った各区間の開いた中央三分の一を取り除く。可算回のステップの後に残るのは閉集合 $C$ であり、$\lambda(C) = 0$ だ（取り除いた区間の総長さが $1/3 + 2/9 + 4/27 + \cdots = 1$ になるから）。しかし $C$ は非可算だ——$\mathbb{R}$ と同じ濃度を持つ。

## 平行移動不変性

**定理。** 任意の $E \in \mathcal{L}$ と $t \in \mathbb{R}$ に対して、平行移動 $E + t \coloneqq \{x + t : x \in E\}$ は $E + t \in \mathcal{L}$ を満たし、

$$
\lambda(E + t) = \lambda(E). \tag{7}
$$

*理由。* $E$ の開区間被覆を $t$ だけ平行移動すると $E + t$ の同じ総長さの被覆が得られる。よって $\lambda^*(E + t) = \lambda^*(E)$。$E + t$ のカラテオドリ可測性も同様に従う。

平行移動不変性 $(7)$ は長さの定義的な幾何学的性質だ：集合の大きさは直線上のどこに位置するかに依存しない。可算加法性と正規化 $\lambda([0,1]) = 1$ と合わせると、これは有界集合上有限な $\mathcal{B}(\mathbb{R})$ 上のすべての測度の中でルベーグ測度を一意に特徴づける。

## まとめ

- **ルベーグ σ-加法族** $\mathcal{L}$（式 $(1)$）は $\lambda^*$ に関するカラテオドリ可測集合の族；**ルベーグ測度** $\lambda$（式 $(2)$）は $\mathcal{L}$ への $\lambda^*$ の制限だ。
- $\lambda$ はカラテオドリの定理により**完備**かつ**可算加法的**な測度だ。
- すべての開集合、したがってすべてのボレル集合は $\mathcal{L}$ に属す——包含関係 $(3)$。ルベーグ σ-加法族は $\mathcal{B}(\mathbb{R})$ より真に大きい。
- 区間上では $\lambda$ は長さと一致する：$\lambda(I) = b - a$——式 $(4)$。
- **可算集合は零集合**——式 $(5)$；特に $\lambda(\mathbb{Q} \cap [0,1]) = 0$。
- カントール集合は閉じた非可算な零集合だ：測度ゼロの微妙さを示す印象的な例。
- **平行移動不変性** $\lambda(E + t) = \lambda(E)$——式 $(7)$——は長さが集合の位置ではなく幾何学的性質であることを反映している。
