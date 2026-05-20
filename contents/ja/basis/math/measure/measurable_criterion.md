---
title: カラテオドリの可測性基準
summary: "カラテオドリの基準は、外測度が真の（可算加法的な）測度になる集合を選び出す：$E$ がすべてのテスト集合を加法的に分割するとき可測だ。このチェックポイントでは基準を述べ、可測集合が σ-加法族をなすことを証明し、制限された外測度が完備測度になることを示す。"
prerequisites:
  - basis/math/measure/outer_measure
aliases: []
tags:
  - Measure Theory
updated: 2026-05-20
---

[外測度](../outer_measure/)は $\mathbb{R}$ のすべての部分集合に大きさを与えるが、劣加法的にしかならない。問題は「悪い」集合が境界をまたいで測度を漏らし、加法性を破綻させることにある。コンスタンティン・カラテオドリ（Constantin Carathéodory）の洞察（1914年）は「良い」集合——可測なもの——を一つの幾何学的条件で特徴づけることだった：集合 $E$ が可測であるのは、それがすべてのテスト集合 $A$ を**ぴったりと分割**するときだ。

## 基準

$\mu^*$ を集合 $X$ 上の外測度とする（抽象的定義は[外測度](../outer_measure/)を参照）。集合 $E \subseteq X$ が $\mu^*$ に関して**カラテオドリ可測**（Carathéodory-measurable、単に*可測*）であるとは、

$$
\mu^*(A) = \mu^*(A \cap E) + \mu^*(A \cap E^c) \qquad \text{すべての } A \subseteq X \text{ に対して} \tag{1}
$$

が成り立つことをいう。式 $(1)$ の $A$ を**テスト集合**（test set）という。問いは：$E$ は $A$ を、外測度が正確に $\mu^*(A)$ になるように二つの部分に分割するか？

$A = (A \cap E) \cup (A \cap E^c)$ であり二つの部分が互いに素なので、劣加法性から常に

$$
\mu^*(A) \leq \mu^*(A \cap E) + \mu^*(A \cap E^c)
$$

が成り立つ。したがって基準 $(1)$ の実質的な中身は逆向きの不等式だ：

$$
\mu^*(A) \geq \mu^*(A \cap E) + \mu^*(A \cap E^c). \tag{1'}
$$

言葉にすると：$E$ が $A$ を二分するときに「余分な測度を生み出さない」ということだ。

**注意。** 基準は $E$ と $E^c$ について対称だ：$E$ が $(1)$ を満たすならば $E^c$ も満たす（役割を入れ替えるだけ）。したがって可測性は補集合を取っても保たれる。

## 可測集合は σ-加法族をなす

$\mathcal{M}$ をすべての $\mu^*$-可測集合の族とする。$\mathcal{M}$ が σ-加法族の三つの公理を満たすことを確かめる。

**公理 1：$X \in \mathcal{M}$。**
任意のテスト集合 $A$ に対して：$A \cap X = A$ かつ $A \cap X^c = \emptyset$ なので $\mu^*(A \cap X) + \mu^*(A \cap X^c) = \mu^*(A) + 0 = \mu^*(A)$。✓

**公理 2：補集合について閉じている。**
すでに上で見た通り、基準 $(1)$ は $E$ と $E^c$ について対称だ。✓

**公理 3：可算和について閉じている。**
これが議論の核心だ。

*まず有限和について。* $E, F \in \mathcal{M}$ とする。$E \cup F \in \mathcal{M}$ を示したい。任意のテスト集合 $A$ に対して、テスト集合 $A$ で $E$ の可測性を使い、次にテスト集合 $A \cap E^c$ で $F$ の可測性を使う：

$$
\mu^*(A) = \mu^*(A \cap E) + \mu^*(A \cap E^c)
$$
$$
\mu^*(A \cap E^c) = \mu^*(A \cap E^c \cap F) + \mu^*(A \cap E^c \cap F^c).
$$

$E^c \cap F^c = (E \cup F)^c$ に注意すると：

$$
\mu^*(A) = \mu^*(A \cap E) + \mu^*(A \cap E^c \cap F) + \mu^*(A \cap (E \cup F)^c). \tag{2}
$$

$A \cap (E \cup F) = (A \cap E) \cup (A \cap E^c \cap F)$（互いに素）なので劣加法性より $\mu^*(A \cap (E \cup F)) \leq \mu^*(A \cap E) + \mu^*(A \cap E^c \cap F)$。式 $(2)$ に代入すると：

$$
\mu^*(A) \geq \mu^*(A \cap (E \cup F)) + \mu^*(A \cap (E \cup F)^c),
$$

これは（劣加法性と合わせて）$E \cup F \in \mathcal{M}$ を証明する。帰納法により $\mathcal{M}$ は有限和について閉じている。

*可算和について。* $E_1, E_2, \ldots \in \mathcal{M}$ を互いに素とする（一般の場合は $\tilde{E}_k = E_k \setminus (E_1 \cup \cdots \cup E_{k-1})$ と置くことで帰着できる；すでに確立した閉性により $\tilde{E}_k \in \mathcal{M}$ のまま）。$S_n \coloneqq \bigsqcup_{k=1}^n E_k \in \mathcal{M}$ と置く。任意のテスト集合 $A$ と各 $n$ に対して：

$$
\mu^*(A \cap S_n) = \sum_{k=1}^{n} \mu^*(A \cap E_k). \tag{3}
$$

式 $(3)$ はテスト集合 $A \cap S_n$ で $E_n$ の可測性を使う帰納法で従う。$S \coloneqq \bigcup_k E_k$ とする。$S_n \subseteq S$ なので単調性と $(3)$ より：

$$
\mu^*(A \cap S) \geq \mu^*(A \cap S_n) = \sum_{k=1}^{n} \mu^*(A \cap E_k).
$$

$n \to \infty$ とすれば $\mu^*(A \cap S) \geq \sum_{k=1}^{\infty} \mu^*(A \cap E_k)$；劣加法性と合わせて：

$$
\mu^*(A \cap S) = \sum_{k=1}^{\infty} \mu^*(A \cap E_k). \tag{4}
$$

また $S^c \subseteq S_n^c$ なので $\mu^*(A \cap S^c) \leq \mu^*(A \cap S_n^c)$。$S_n$ の可測性を使うと：

$$
\mu^*(A \cap S_n) + \mu^*(A \cap S_n^c) = \mu^*(A),
$$

したがって $\mu^*(A \cap S^c) \leq \mu^*(A) - \sum_{k=1}^n \mu^*(A \cap E_k)$ がすべての $n$ について成り立つ。式 $(4)$ と合わせると：

$$
\mu^*(A) \geq \mu^*(A \cap S) + \mu^*(A \cap S^c),
$$

よって $S \in \mathcal{M}$。**結論：** $\mathcal{M}$ は σ-加法族だ。✓

## $\mathcal{M}$ 上での可算加法性

上の議論の真の収穫は、式 $(4)$ に $A = X$ を代入することで得られる：

$$
\mu^*\!\left(\bigsqcup_{k=1}^{\infty} E_k\right) = \sum_{k=1}^{\infty} \mu^*(E_k) \qquad \text{互いに素な } E_k \in \mathcal{M} \text{ に対して。} \tag{5}
$$

これが**可算加法性**（countable additivity）——真の測度の定義的性質だ。制限 $\mu^* \restriction_{\mathcal{M}}$ は外測度を σ-加法族 $\mathcal{M}$ 上の真の測度に変える。

## 完備性

測度空間 $(X, \mathcal{M}, \mu^*)$ が**完備**（complete）であるとは、零集合のすべての部分集合が可測であることをいう。カラテオドリの構成は自動的に完備性を与える。

**命題。** $\mu^*(N) = 0$ かつ $A \subseteq N$ ならば $A \in \mathcal{M}$。

*証明。* 任意のテスト集合 $T$ に対して：$T \cap A \subseteq N$ なので $\mu^*(T \cap A) \leq \mu^*(N) = 0$。また $T \supseteq T \cap A^c$ なので単調性より $\mu^*(T \cap A^c) \leq \mu^*(T)$。したがって $\mu^*(T \cap A) + \mu^*(T \cap A^c) \leq 0 + \mu^*(T) = \mu^*(T)$；逆の不等式は劣加法性から成り立つ。よって $A \in \mathcal{M}$。

この完備性は実践的に重要だ：測度ゼロの集合の部分集合が σ-加法族の「外に出る」心配をする必要がない。

## まとめ

- **カラテオドリの基準** $(1)$ は、$E$ がすべてのテスト集合 $A$ を加法的に分割するとき $E$ が可測だという；非自明な中身は逆不等式 $(1')$ だ。
- すべての可測集合の族 $\mathcal{M}$ は **σ-加法族**だ：$X$ を含み、補集合について閉じ（基準の対称性）、可算和について閉じている（有限和の議論を上の極限操作で拡張）。
- 互いに素な可測集合上で外測度は**可算加法的**——式 $(5)$。これにより $\mu^*\restriction_{\mathcal{M}}$ は真の測度になる。
- 得られる測度空間は**完備**：零集合のすべての部分集合は可測だ。
- 次：[ルベーグ測度](../lebesgue_measure/)でこの枠組みを $\mu^* = \lambda^*$（$\mathbb{R}$ 上のルベーグ外測度）に適用し、標準的な長さの概念を生み出す。
