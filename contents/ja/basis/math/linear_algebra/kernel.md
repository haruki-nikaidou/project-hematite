---
title: 核（カーネル）
summary: "線型写像の核（kernel）をゼロに写されるすべての入力の集合として定義し、それが部分空間であることを証明し、単射性・同次線型方程式系との関係を示し、零化次元（nullity）を導入する。"
prerequisites: 
  - basis/math/linear_algebra/linear_map
  - basis/math/linear_algebra/linear_subspace
aliases: []
tags: ["Linear Algebra"]
updated: 2026-05-17
---

線型写像がベクトルをゼロに送るとき、それは実質的にそのベクトルを消している——何もない点に押しつぶしている。**核**（kernel）はそのようなベクトルをすべて集め、写像がどれだけの「情報」を破壊するかを正確に示す。核を理解すると写像が可逆かどうかがわかり、線型方程式系の解集合の構造が得られる。

## 定義

線型写像 $T: V \to W$ の**核**（核空間（null space）とも）とは、$T$ がゼロに送るすべての入力の集合だ：

$$\ker(T) \coloneqq \{v \in V : T(v) = \mathbf{0}_W\}.$$

核は**定義域** $V$ の中に住む。$T(\mathbf{0}_V) = \mathbf{0}_W$ が線型性から常に成り立つため、いかなる場合も $\mathbf{0}_V \in \ker(T)$ となり、核は常に空でない。

## 核は部分空間

**主張**：$\ker(T)$ は $V$ の[線型部分空間](../linear_subspace/)だ。

**証明**：$\mathbf{0}_V \in \ker(T)$ はすでに知っているので $\ker(T)$ は空でない。$u, v \in \ker(T)$ と $c, d \in F$ を任意に取る。$T$ の線型性から：

$$T(cu + dv) = c\,T(u) + d\,T(v) = c \cdot \mathbf{0}_W + d \cdot \mathbf{0}_W = \mathbf{0}_W.$$

したがって $cu + dv \in \ker(T)$。部分空間判定基準により、$\ker(T)$ は部分空間だ。$\square$

## 行列の核

行列 $A \in M_{m,n}(F)$ に対応する線型写像は $T_A(x) = Ax$（[線型写像](../linear_map/)で定義）だ。その核は：

$$\ker(A) \coloneqq \{x \in F^n : Ax = \mathbf{0}\},$$

これはちょうど[線型方程式系](../linear_equations/)で導入した同次方程式系 $Ax = \mathbf{0}$ の解集合だ。

## 核の計算

$\ker(A)$ を求めるには、$A$ 自体に[ガウス・ジョルダン消去法](../gauss_jordan_elimination/)を適用する（拡大行列ではなく——右辺は $\mathbf{0}$ なので変換全体を通じて $\mathbf{0}$ のままだ）。$A$ の RREF において：

- **ピボット列**に対応する変数が基本変数；自由変数を選べばその値が決まる。
- **自由列**に対応する変数が自由変数；各変数にパラメータ（$t_1, t_2, \ldots$）を割り当てる。

一般解をベクトルの線型結合（自由変数ごとに一つ）として書く。それらのベクトルが $\ker(A)$ の**基底**をなす。

### 計算例

次の行列の $\ker(A)$ を求める：

$$A = \begin{pmatrix} 1 & 2 & 3 \\ 2 & 4 & 6 \end{pmatrix}.$$

ガウス・ジョルダン：$R_2 \leftarrow R_2 - 2R_1$ で：

$$\begin{pmatrix} 1 & 2 & 3 \\ 0 & 0 & 0 \end{pmatrix}.$$

これがすでに RREF だ。列 1 が唯一のピボット列；列 2 と 3 が自由列。$x_2 = s$、$x_3 = t$ を自由に設定する。すると $x_1 = -2s - 3t$。一般解は：

$$x = s \begin{pmatrix} -2 \\ 1 \\ 0 \end{pmatrix} + t \begin{pmatrix} -3 \\ 0 \\ 1 \end{pmatrix}, \qquad s, t \in F.$$

したがって $\ker(A) = \text{span}\!\left\{ (-2, 1, 0)^\top,\, (-3, 0, 1)^\top \right\}$、$F^3$ の二次元の部分空間だ。

## 単射性

核はちょうど $T$ が単射（一対一）でない場合を特徴付ける。

**定理**：$T: V \to W$ が単射 $\iff$ $\ker(T) = \{\mathbf{0}_V\}$。

**証明**：（$\Rightarrow$）$T$ が単射で $T(v) = \mathbf{0}_W = T(\mathbf{0}_V)$ ならば $v = \mathbf{0}_V$。（$\Leftarrow$）$\ker(T) = \{\mathbf{0}_V\}$ と仮定して $T(u) = T(v)$ とする。$T(u - v) = T(u) - T(v) = \mathbf{0}_W$ より $u - v \in \ker(T) = \{\mathbf{0}_V\}$、したがって $u = v$。$\square$

直観的に：写像が単射であることはちょうどゼロで（どこでも）「衝突」がない場合だ。核が $\{\mathbf{0}_V\}$ より大きければ、複数の異なる入力が同じ出力に写り、$T$ は可逆でない。

正方行列 $A \in M_{n,n}(F)$ に対して、単射性は同次方程式系 $Ax = \mathbf{0}$ が自明解しか持たないことと等価だ——すなわち RREF において $A$ のすべての列がピボット列であることと等価だ。

## 零化次元（nullity）

$T$ の**零化次元**（nullity）とは核の次元だ：

$$\text{nullity}(T) \coloneqq \dim(\ker(T)).$$

上の例では $\text{nullity}(A) = 2$ だ。零化次元は核の中にある「自由度の次元数」——$T$ によって零に押しつぶされる線型独立な方向の数——を数える。

零化次元と $T$ の**ランク**（像の次元）の関係は[次元定理](../rank_nullity_theorem/)で精密に述べられる。

## まとめ

- $T: V \to W$ の**核**は $\ker(T) = \{v \in V : T(v) = \mathbf{0}_W\}$ であり、常に $V$ の部分空間だ。
- 行列 $A$ に対して、核は同次方程式系 $Ax = \mathbf{0}$ の解集合だ。
- **$\ker(A)$ の計算**：$A$ を RREF に簡約し、自由変数にパラメータを割り当て、解を基底ベクトルの線型結合として書く。
- $T$ が**単射**であることは $\ker(T) = \{\mathbf{0}_V\}$ と同値だ。
- **零化次元**は $\dim(\ker(T))$ であり、ゼロに押しつぶされる次元の数を数える。
