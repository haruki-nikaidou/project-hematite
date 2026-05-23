---
title: 連立一次方程式の解の構造
summary: "ランクを用いて Ax = b の解集合を分類する。rank(A) ≠ rank([A|b]) のとき解なし、両ランクが未知数の個数と等しいとき唯一解、それ以外は解のアフィン部分空間が存在する。ガウス・ジョルダン消去法とランク・零化域定理を結びつけて完全な全体像を与える。"
prerequisites:
  - basis/math/linear_algebra/linear_equations
  - basis/math/linear_algebra/gauss_jordan_elimination
  - basis/math/linear_algebra/rank_nullity_theorem
  - basis/math/linear_algebra/dimension
aliases: []
tags:
  - Linear Algebra
updated: 2026-05-20
---

[ガウス・ジョルダン消去法](../gauss_jordan_elimination/)はピボットと自由列を通じて $Ax = b$ の解を分類する。ランク（rank）はたった一つの数で同じ情報をより簡潔に表す。$\text{rank}(A)$ と $\text{rank}([A \mid b])$ を比較すれば解の存在が分かり、$\text{rank}(A)$ と $n$ を比較すれば解がただ一つかどうかが分かる。解が存在するとき、その全体は**アフィン部分空間（affine subspace）**——$\ker(A)$ を特殊解だけ平行移動した集合——を形成し、その次元は[ランク・零化域定理](../rank_nullity_theorem/)が正確に定める。

## 拡大係数行列のランク

拡大係数行列 $[A \mid b]$ は $A$ と同じ $m$ 行を持ち、列が一つ多い。行簡約すると、$[A \mid b]$ の RREF は $A$ の RREF よりピボットが最大一つ多く、それは追加した最後の列にピボットが現れる場合に限る。したがって

$$\text{rank}([A \mid b]) = \begin{cases} \text{rank}(A) & \text{if } b \in \text{col}(A), \\ \text{rank}(A) + 1 & \text{if } b \notin \text{col}(A). \end{cases}$$

条件 $b \in \text{col}(A)$ は $Ax = b$ が解を持つための条件そのものであり、上の観察は偶然ではない。

## 整合性の判定条件

**定理**: 連立方程式 $Ax = b$ が整合（少なくとも一つの解を持つ）であるための必要十分条件は

$$\text{rank}(A) = \text{rank}([A \mid b])$$

が成り立つことである。

**証明**: $[A \mid b]$ を RREF に簡約して $[R \mid c]$ を得る。方程式が非整合であるのは、$[R \mid c]$ のある行が $(0\; 0\; \cdots\; 0 \mid 1)$ という形、すなわち最後の列にピボットが現れる形になる場合に限る。そのような行は $A$ に由来しないピボットを $[A \mid b]$ に加えるから $\text{rank}([A \mid b]) = \text{rank}(A) + 1$ となる。逆にそのような行が現れなければ $[A \mid b]$ の RREF は $A$ の RREF と全く同じピボットを持つから $\text{rank}([A \mid b]) = \text{rank}(A)$ となり、方程式は整合である。$\square$

## 一意性の判定条件

方程式が整合、すなわち $\text{rank}(A) = \text{rank}([A \mid b]) = r$ であると仮定する。$A$ の RREF は $r$ 個のピボット列と $n - r$ 個の自由列を持つ。各自由列が一つの自由変数を生み、各自由変数が解集合の自由度を一次元増やす。したがって

- $\text{rank}(A) = n$ のとき: 自由変数がなく、解は**唯一**。
- $\text{rank}(A) < n$ のとき: $n - \text{rank}(A) > 0$ 個の自由変数があり、解は**無限に多く**存在する。

## 完全な分類

| 条件 | 結果 |
|-----------|---------|
| $\text{rank}(A) < \text{rank}([A \mid b])$ | 解なし |
| $\text{rank}(A) = \text{rank}([A \mid b]) = n$ | 唯一解 |
| $\text{rank}(A) = \text{rank}([A \mid b]) < n$ | 無限に多くの解 |

この三つの場合は網羅的であり、すべての連立方程式はそのうち正確に一つに当てはまる。

## アフィン部分空間の構造

$Ax = b$ が整合なとき、解全体は幾何学的に整った形をなす。

**定理**: $x_p$ を $Ax = b$ の任意の特殊解とする。解全体の集合は

$$\{x \in F^n : Ax = b\} = x_p + \ker(A) \coloneqq \{x_p + h : h \in \ker(A)\}$$

である。

**証明**:
- （$\supseteq$）任意の $h \in \ker(A)$ に対して $A(x_p + h) = Ax_p + Ah = b + \mathbf{0} = b$ が成り立つので、$x_p + h$ は解である。
- （$\subseteq$）任意の解 $x$ に対して $A(x - x_p) = Ax - Ax_p = b - b = \mathbf{0}$ が成り立つから $x - x_p \in \ker(A)$、よって $x = x_p + (x - x_p) \in x_p + \ker(A)$。$\square$

集合 $x_p + \ker(A)$ は $F^n$ の**アフィン部分空間**と呼ばれ、線形部分空間 $\ker(A)$ を特殊解 $x_p$ だけ平行移動したものである。これ自体が線形部分空間になるのは $x_p = \mathbf{0}$、すなわち $b = \mathbf{0}$ のときに限る。

### 解集合の次元

ランク・零化域定理より $\text{nullity}(A) = n - \text{rank}(A)$。$x_p + \ker(A)$ は $\ker(A)$ の平行移動であるから、$\ker(A)$ と同じ次元 $n - \text{rank}(A)$ を持つ。

| $\text{rank}(A)$ | $\text{nullity}(A)$ | 解集合の形 |
|---|---|---|
| $n$ | $0$ | 一点 |
| $n - 1$ | $1$ | $x_p$ を通る直線 |
| $n - k$ | $k$ | $x_p$ を通る $k$ 次元アフィン平坦 |

## 計算例

$Ax = b$ を解く。ただし

$$A = \begin{pmatrix} 1 & 2 & -1 \\ 2 & 4 & -2 \end{pmatrix}, \qquad b = \begin{pmatrix} 3 \\ 6 \end{pmatrix}.$$

**ステップ 1: 整合性を確認する。** 拡大係数行列を行簡約する。

$$\begin{pmatrix} 1 & 2 & -1 & 3 \\ 2 & 4 & -2 & 6 \end{pmatrix} \xrightarrow{R_2 \leftarrow R_2 - 2R_1} \begin{pmatrix} 1 & 2 & -1 & 3 \\ 0 & 0 & 0 & 0 \end{pmatrix}.$$

これが RREF である。ピボットは第 1 列の一つだけなので $\text{rank}(A) = 1$、$\text{rank}([A \mid b]) = 1$。等しいので方程式は整合である。

**ステップ 2: 自由変数の個数を数える。** $n = 3$、$\text{rank}(A) = 1$ より自由変数は $3 - 1 = 2$ 個（$x_2$ と $x_3$）。解集合は 2 次元のアフィン部分空間である。

**ステップ 3: 特殊解を求める。** 自由変数をゼロに設定する: $x_2 = 0$、$x_3 = 0$。すると $x_1 = 3$ となり

$$x_p = \begin{pmatrix} 3 \\ 0 \\ 0 \end{pmatrix}.$$

**ステップ 4: $\ker(A)$ の基底を求める。** RREF から $x_1 = -2x_2 + x_3$。パラメータ $x_2 = s$、$x_3 = t$ を割り当てると

$$\ker(A) = \text{span}\!\left\{ \begin{pmatrix} -2 \\ 1 \\ 0 \end{pmatrix},\; \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix} \right\}.$$

**ステップ 5: 解全体を記述する。** アフィン部分空間定理より

$$x = \begin{pmatrix} 3 \\ 0 \\ 0 \end{pmatrix} + s\begin{pmatrix} -2 \\ 1 \\ 0 \end{pmatrix} + t\begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix}, \qquad s, t \in F.$$

これは $x_p$ を通る $F^3$ 内の 2 次元アフィン平面である。

**$b = (3, 7)^\top$ の場合はどうなるか？** $R_2 \leftarrow R_2 - 2R_1$ を適用すると $(0, 0, 0 \mid 1)$ という行が現れ、最後の列にピボットが生じる。$\text{rank}([A \mid b]) = 2 \ne 1 = \text{rank}(A)$ となり、方程式は解を持たない。

## まとめ

- **整合性の判定条件**: $Ax = b$ が整合であるのは $\text{rank}(A) = \text{rank}([A \mid b])$ のときかつそのときに限る。
- **一意性の判定条件**: 整合な方程式が唯一解を持つのは $\text{rank}(A) = n$ のときかつそのときに限る。
- **三つの場合**: $\text{rank}(A) < \text{rank}([A \mid b])$ は解なし、$\text{rank}(A) = n$ は唯一解、整合かつ $\text{rank}(A) < n$ は無限に多くの解。
- **アフィン部分空間定理**: 整合な方程式の解全体は、任意の特殊解 $x_p$ に対して $x_p + \ker(A)$ ——核の平行移動——である。
- **次元**: 解集合の次元はランク・零化域定理により $\text{nullity}(A) = n - \text{rank}(A)$ である。
