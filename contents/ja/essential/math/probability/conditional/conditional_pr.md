---
title: 条件付き確率
summary: "B のもとでの A の条件付き確率は P(A | B) = P(A ∩ B) / P(B)（P(B) > 0 のとき定義される）。このチェックポイントでは定義を制限された標本空間 B 上の再規格化確率として動機付け、乗法定理 P(A ∩ B) = P(A | B) P(B) を導出し、Ω の分割を通じて全確率の法則を証明する。"
prerequisites:
  - essential/math/probability/pr_axioms
aliases: []
tags:
  - Probability
  - Conditional Probability
updated: 2026-05-22
---

無作為に選んだ患者が喫煙者であるとわかった場合、その人が肺がんを発症する確率は母集団全体の基準値から大きく上昇する。**条件付き確率**（conditional probability）は、ある結果が起きたという部分的な情報を受け取ったとき、確率を更新するための数学的道具だ。

## 定義

確率空間 $(\Omega, \mathcal{F}, P)$ と $P(B) > 0$ を満たす事象 $B \in \mathcal{F}$ を考える。**$A$ の $B$ による条件付き確率**を次で定義する：

$$
P(A \mid B) \coloneqq \frac{P(A \cap B)}{P(B)}.
$$

直観：$B$ を条件とすることで、標本空間を $\Omega$ から $B$ に制限する。$B$ の中では、$A$ に関する適切な確率は $B$ の質量のうち $A$ に落ちる割合を再規格化したものであり、$P(B \mid B) = 1$ が成立する。

## 再規格化の解釈

$P(B) > 0$ を満たす固定した $B$ に対して、$Q(A) \coloneqq P(A \mid B)$ は $(\Omega, \mathcal{F})$ 上の確率測度を定める：

- **非負性。** $P(A \cap B) \geq 0$ かつ $P(B) > 0$ なので $Q(A) \geq 0$。
- **正規化。** $Q(\Omega) = P(\Omega \cap B) / P(B) = 1$。
- **$\sigma$-加法性。** $P$ の $\sigma$-加法性から直接従う。

つまり、同じ条件事象 $B$ をもつ条件付き確率には確率測度についてのすべての定理がそのまま適用できる——もとの測度を $B$ 上に集中した新たな測度で置き換えただけだからだ。

## 乗法定理

定義を整理すると直ちに**乗法定理**（multiplication rule）が得られる：

$$
P(A \cap B) = P(A \mid B) \, P(B). \tag{1}
$$

これは事象の連鎖にも拡張できる。$P(A_1 \cap \cdots \cap A_{n-1}) > 0$ を満たす事象 $A_1, A_2, \ldots, A_n$ に対して：

$$
P(A_1 \cap \cdots \cap A_n) = P(A_1) \, P(A_2 \mid A_1) \, P(A_3 \mid A_1 \cap A_2) \cdots P(A_n \mid A_1 \cap \cdots \cap A_{n-1}). \tag{2}
$$

*証明。* $P(A_1 \cap \cdots \cap A_n) = P(A_n \mid A_1 \cap \cdots \cap A_{n-1}) \cdot P(A_1 \cap \cdots \cap A_{n-1})$ と乗法定理を繰り返し適用する。

**例。** 標準的な52枚のデッキから非復元抽出する。最初の2枚がどちらもエースである確率は

$$
P(\text{エース}_1 \cap \text{エース}_2) = P(\text{エース}_1) \cdot P(\text{エース}_2 \mid \text{エース}_1) = \frac{4}{52} \cdot \frac{3}{51} = \frac{1}{221}.
$$

## 全確率の法則

$\Omega$ の**分割**（partition）とは、互いに素な事象の族 $\{B_i\}_{i \in I}$ で $\bigcup_{i \in I} B_i = \Omega$ を満たすものだ。各 $P(B_i) > 0$ を満たす可算分割 $\{B_1, B_2, \ldots\}$ があるとき、任意の事象 $A$ に対して：

$$
P(A) = \sum_{i} P(A \mid B_i) \, P(B_i). \tag{3}
$$

*証明。* $A = \bigcup_i (A \cap B_i)$ と互いに素に分解し、$\sigma$-加法性と乗法定理を適用する：

$$
P(A) = \sum_i P(A \cap B_i) = \sum_i P(A \mid B_i) \, P(B_i).
$$

全確率の法則は「難しい」無条件確率を計算するための道具だ。$P(A \mid B_i)$ が計算しやすい分割を選び、事前の重み $P(B_i)$ で組み合わせる。

**例。** ある工場に機械が2台ある。機械1は全出力の60%を製造し不良率2%、機械2は40%を製造し不良率5%だ。$D$ を不良品の事象、$M_1$、$M_2$ をそれぞれの機械からの製品の事象とすると

$$
P(D) = P(D \mid M_1) \, P(M_1) + P(D \mid M_2) \, P(M_2) = 0.02 \times 0.6 + 0.05 \times 0.4 = 0.032.
$$

製品全体の3.2%が不良品だ。

## まとめ

- **条件付き確率**：$P(A \mid B) = P(A \cap B) / P(B)$（$P(B) > 0$）；制限された標本空間 $B$ 上の再規格化確率であり、コルモゴロフの3公理を満たす。
- **乗法定理**：$P(A \cap B) = P(A \mid B) P(B)$。事象の連鎖では $P(A_1 \cap \cdots \cap A_n) = P(A_1) P(A_2 \mid A_1) \cdots P(A_n \mid A_1 \cap \cdots \cap A_{n-1})$ に拡張される。
- **全確率の法則**：各 $P(B_i) > 0$ を満たす $\Omega$ の可算分割 $\{B_i\}$ に対して $P(A) = \sum_i P(A \mid B_i) P(B_i)$。
