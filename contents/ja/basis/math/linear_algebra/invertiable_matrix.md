---
title: 正則行列
summary: "正則行列（invertible matrix）を線型変換を元に戻せる行列として定義し、ガウス・ジョルダン消去法による正則性の判定基準を特徴付け、拡大行列を用いた逆行列の計算法を示す。"
prerequisites: 
  - basis/math/linear_algebra/linear_map
  - basis/math/linear_algebra/gauss_jordan_elimination
aliases: []
tags: ["Linear Algebra"]
updated: 2026-05-19
---

行列 $A$ がエンコードする線型写像 $T_A$ はすべてのベクトル $x$ を $Ax$ に変換する。常に元に戻せるだろうか？**正則行列**（invertible matrix）とはまさにその答えが「はい」の場合——変換を完全に元に戻せる場合だ。

## 定義

体 $F$ 上の $n \times n$ 正方行列 $A$ が**正則**（invertible、*非特異*（non-singular）とも）であるとは、$n \times n$ 行列 $B$ が存在して：

$$
AB = I_n \qquad \text{かつ} \qquad BA = I_n \tag{1}
$$

が成り立つことをいう（$I_n$ は $n \times n$ 単位行列）。行列 $B$ を $A$ の**逆行列**（inverse）と呼び $A^{-1}$ と書く。

正則でない行列を**特異行列**（singular matrix）という。

正方行列だけが正則になれる：$m \ne n$ の非正方 $m \times n$ 行列は異なる次元の空間の間の写像を表し、同じ型の両側逆行列を持てない。

## 逆行列の一意性

$B$ と $C$ がともに (1) を満たすとする。すると：

$$
B = B I_n = B(AC) = (BA)C = I_n C = C.
$$

したがって $B = C$——すべての正則行列はちょうど一つの逆行列を持つ。記法 $A^{-1}$ は曖昧でない。

## 正則性と線型写像

[線型写像と行列の乗法](../linear_map/)から、$n \times n$ 行列 $A$ は線型写像 $T_A: F^n \to F^n$ を表すことがわかる。$AB = BA = I_n$ という条件は $T_B$ が $T_A$ の（関数としての）左・右逆写像であることを言う。したがって：

> $A$ が正則であることと $T_A: F^n \to F^n$ が全単射であることは同値だ。

$T_A$ が全単射なら、その逆関数 $T_A^{-1}$ もまた線型であり、その行列が $A^{-1}$ だ。

## ガウス・ジョルダンによる正則性の判定

[ガウス・ジョルダン消去法](../gauss_jordan_elimination/)から、行列の行簡約は $n$ 個のピボット列（一列につき一つ）を生成するか、少なくとも一つの自由列を残すかのどちらかだ。正方 $n \times n$ 行列では、この二つの結果は相互に排他的で網羅的だ——中間はない。これにより完全な判定基準が得られる：

$F$ 上の $n \times n$ 行列 $A$ に対して、次の主張はすべて同値だ：

1. $A$ は正則だ。
2. $A$ の RREF は $I_n$ だ。
3. $A$ は $n$ 個のピボット列を持つ。
4. $Ax = \mathbf{0}$ の唯一の解は $x = \mathbf{0}$ だ。
5. すべての $b \in F^n$ に対して方程式系 $Ax = b$ はちょうど一つの解を持つ。
6. $A$ の列は線型独立だ。

**特異行列の例.** $B = \begin{pmatrix} 1 & 2 \\ 2 & 4 \end{pmatrix}$：$R_2 \leftarrow R_2 - 2R_1$ を適用すると $\begin{pmatrix} 1 & 2 \\ 0 & 0 \end{pmatrix}$。第 2 列にピボットがないので $B$ は特異だ。写像 $T_B$ は平面全体を直線に潰す——元に戻すことはできない。

## ガウス・ジョルダン消去法による逆行列の計算

$A$ が正則なら、$A$ に単位行列を付け加えてブロック全体を行簡約することで $A^{-1}$ を計算できる：

$$
[A \mid I_n] \xrightarrow{\text{RREF}} [I_n \mid A^{-1}]. \tag{2}
$$

**なぜ機能するか.** すべての基本行変換は可逆な基本行列による左乗算だ。$A$ を $I_n$ に簡約する操作の列が左乗算 $E$ に対応するなら $EA = I_n$ よりつまり $E = A^{-1}$ だ。同じ操作を $I_n$ に適用すると $E I_n = E = A^{-1}$ が得られる。

左辺にゼロ行が現れたら $A$ は特異であり逆行列を持たない。

**例.** $A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}$ の逆行列を計算する：

$$
\left(\begin{array}{cc|cc} 1 & 2 & 1 & 0 \\ 3 & 4 & 0 & 1 \end{array}\right)
\xrightarrow{R_2 \leftarrow R_2 - 3R_1}
\left(\begin{array}{cc|cc} 1 & 2 & 1 & 0 \\ 0 & -2 & -3 & 1 \end{array}\right)
$$

$$
\xrightarrow{R_2 \leftarrow -\frac{1}{2}R_2}
\left(\begin{array}{cc|cc} 1 & 2 & 1 & 0 \\ 0 & 1 & \tfrac{3}{2} & -\tfrac{1}{2} \end{array}\right)
\xrightarrow{R_1 \leftarrow R_1 - 2R_2}
\left(\begin{array}{cc|cc} 1 & 0 & -2 & 1 \\ 0 & 1 & \tfrac{3}{2} & -\tfrac{1}{2} \end{array}\right)
$$

したがって $A^{-1} = \begin{pmatrix} -2 & 1 \\ \tfrac{3}{2} & -\tfrac{1}{2} \end{pmatrix}$。検証：$AA^{-1} = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}\begin{pmatrix} -2 & 1 \\ \tfrac{3}{2} & -\tfrac{1}{2} \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$。

### 2×2 の公式

$\mathbb{R}$ 上の $A = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$ に対して、公式は簡略化される：

$$
A^{-1} = \frac{1}{ad - bc}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}, \tag{3}
$$

ただし $ad - bc \ne 0$ のとき。量 $ad - bc$ は**行列式** $\det(A)$ であり、$A$ が正則なとき非ゼロだ。$3 \times 3$ 以上ではガウス・ジョルダン消去法が系統的なアプローチだ（一般論は[行列式](../determinant/)を参照）。

## 逆行列の性質

次の等式はすべて定義 $AA^{-1} = A^{-1}A = I_n$ から直接従う：

| 等式 | 説明 |
|------|------|
| $(A^{-1})^{-1} = A$ | $A$ は $A^{-1}$ の逆行列 |
| $(AB)^{-1} = B^{-1}A^{-1}$ | 合成を元に戻すと順序が逆になる |
| $(A^T)^{-1} = (A^{-1})^T$ | 転置と逆行列は可換 |
| $(cA)^{-1} = c^{-1}A^{-1}$（$c \ne 0$） | スケーリングは逆数で元に戻す |

積の規則 $(AB)^{-1} = B^{-1}A^{-1}$ は日常的な可逆性を反映する：靴下をはいてから靴をはいた場合、元に戻すには靴を先に脱がなければならない。

## まとめ

- $n \times n$ 行列 $A$ が**正則**であるとは、$AB = BA = I_n$ を満たす $B$ が存在することであり；この $B$ は一意で $A^{-1}$ と書く。
- 正則性は次と同値だ：$A$ の RREF が $I_n$ である；$A$ が $n$ 個のピボット列を持つ；$Ax = \mathbf{0}$ の解が自明解のみ；すべての $b$ に対し $Ax = b$ が唯一解を持つ。
- $A^{-1}$ の計算：$[A \mid I_n]$ を $[I_n \mid A^{-1}]$ にガウス・ジョルダン行簡約する。
- 主要等式：$(A^{-1})^{-1} = A$、$(AB)^{-1} = B^{-1}A^{-1}$、$(A^T)^{-1} = (A^{-1})^T$。
- $2 \times 2$ 行列では：$\det(A) = ad - bc \ne 0$ のとき $A^{-1} = \frac{1}{\det(A)}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$。
