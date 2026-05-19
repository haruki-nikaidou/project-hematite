---
title: 像とランク
summary: "線型写像の像（image）を写像が生成できるすべての出力ベクトルの集合として定義し、それが余域の部分空間であることを証明し、行列の列空間と同一視し、その次元であるランクを導入する。"
prerequisites: 
  - basis/math/linear_algebra/linear_map
  - basis/math/linear_algebra/linear_subspace
aliases: []
tags: ["Linear Algebra"]
updated: 2026-05-17
---

核が線型写像の「破壊するもの」——ゼロに送る入力——を捉えるのに対して、像は「生み出すもの」を捉える：写像が生成できるすべての出力の集まりだ。像を知れば、どの目標ベクトルに「到達できるか」がわかり、その次元であるランクは写像が余域をどれだけ「埋める」かを測る。

## 定義

線型写像 $T: V \to W$ の**像**（image、**値域**（range）とも）とは、$T$ が生成できるすべての出力の集合だ：

$$\text{im}(T) \coloneqq \{T(v) : v \in V\} = \{w \in W : \exists\, v \in V \text{ で } T(v) = w\}.$$

像は**余域** $W$ の中に住む。$w \in W$ が $\text{im}(T)$ に属することは、方程式 $T(v) = w$ が少なくとも一つの解 $v \in V$ を持つことと同値だ。

## 像は部分空間

**主張**：$\text{im}(T)$ は $W$ の[線型部分空間](../linear_subspace/)だ。

**証明**：$T(\mathbf{0}_V) = \mathbf{0}_W$ より $\mathbf{0}_W \in \text{im}(T)$。$w_1, w_2 \in \text{im}(T)$ と $c, d \in F$ を任意に取る。$T(v_1) = w_1$ かつ $T(v_2) = w_2$ となる $v_1, v_2 \in V$ が存在する。線型性から：

$$c w_1 + d w_2 = c\,T(v_1) + d\,T(v_2) = T(cv_1 + dv_2) \in \text{im}(T).$$

したがって $\text{im}(T)$ は線型結合について閉じており、部分空間だ。$\square$

## 列空間

行列 $A \in M_{m,n}(F)$ について、$A = [a_1 \mid a_2 \mid \cdots \mid a_n]$ と書く（$a_j \in F^m$ が $A$ の列）。対応する写像 $T_A(x) = Ax$ の像は：

$$\text{im}(A) = \{Ax : x \in F^n\}.$$

積 $Ax$ はすべて $A$ の列の線型結合だ：

$$Ax = x_1\,a_1 + x_2\,a_2 + \cdots + x_n\,a_n.$$

したがって $A$ の像はその列のスパンに等しい。$F^m$ のこの部分空間を $A$ の**列空間**（column space）と呼び、しばしば $\text{col}(A)$ と書く：

$$\text{col}(A) = \text{span}(a_1, a_2, \ldots, a_n).$$

$b \in F^m$ が $\text{col}(A)$ に属することは、方程式系 $Ax = b$ が少なくとも一つの解を持つこと——[線型方程式系](../linear_equations/)で議論した無矛盾性の条件——と同値だ。

## 全射性

写像 $T: V \to W$ が**全射**（surjective、onto）であることは $\text{im}(T) = W$——$W$ のすべてのベクトルに到達できる——と同値だ。行列 $A \in M_{m,n}(F)$ に対して、全射性は列空間が $F^m$ 全体を埋めることを意味し、$A$ の RREF がすべての行にピボットを持つ場合にちょうど起こる。

## ランク

線型写像 $T$ の**ランク**（rank）とはその像の次元だ：

$$\text{rank}(T) \coloneqq \dim(\text{im}(T)).$$

行列に対して、$\text{rank}(A)$ は $A$ の RREF のピボット行の数に等しく、これはまた $A$ の線型独立な列の数にも等しい。

重要な定理（その証明は RREF の議論を使う）として、行列のランクは**列空間**の次元と**行空間**の次元の両方に等しい。すなわち：線型独立な列の数は常に線型独立な行の数に等しい。

## 像とランクの計算

$\text{im}(A)$ と $\text{rank}(A)$ を求めるには、$A$ に[ガウス・ジョルダン消去法](../gauss_jordan_elimination/)を適用する：

1. $A$ を RREF に簡約する。
2. ピボットの数を数える——これが $\text{rank}(A)$ だ。
3. $A$（RREF からではなく元の $A$）の**ピボット列**（RREF でピボット位置に対応する列）が $\text{col}(A)$ の基底をなす。

**重要**：行変換は列ベクトルを変えるが、どの列がピボット列かは保存する。したがって、ピボット列はRREF からではなく**元の**行列 $A$ から取らなければならない。

### 計算例

$$A = \begin{pmatrix} 1 & 2 & 1 \\ 2 & 4 & 3 \\ 1 & 2 & 2 \end{pmatrix}.$$

ガウス・ジョルダンを適用する。$R_2 \leftarrow R_2 - 2R_1$、$R_3 \leftarrow R_3 - R_1$：

$$\begin{pmatrix} 1 & 2 & 1 \\ 0 & 0 & 1 \\ 0 & 0 & 1 \end{pmatrix}.$$

$R_3 \leftarrow R_3 - R_2$：

$$\begin{pmatrix} 1 & 2 & 1 \\ 0 & 0 & 1 \\ 0 & 0 & 0 \end{pmatrix}.$$

$R_1 \leftarrow R_1 - R_2$（後退掃引）：

$$\begin{pmatrix} 1 & 2 & 0 \\ 0 & 0 & 1 \\ 0 & 0 & 0 \end{pmatrix}.$$

これが RREF だ。**2 個のピボット**（列 1 と列 3）があるので $\text{rank}(A) = 2$。**元の** $A$ の第 1 列と第 3 列が $\text{col}(A)$ の基底をなす：

$$\text{col}(A) = \text{span}\!\left\{ \begin{pmatrix}1\\2\\1\end{pmatrix},\ \begin{pmatrix}1\\3\\2\end{pmatrix} \right\}.$$

## まとめ

- **像** $\text{im}(T) = \{T(v) : v \in V\}$ は常に余域 $W$ の部分空間だ。
- 行列 $A$ に対して、像は**列空間** $\text{col}(A) = \text{span}(a_1, \ldots, a_n)$ に等しく、$Ax = b$ が無矛盾であることと $b \in \text{col}(A)$ は同値だ。
- $T$ が**全射**であることは $\text{im}(T) = W$（すべての出力に到達できる）と同値だ。
- **ランク** $\text{rank}(T) = \dim(\text{im}(T))$ は $A$ の RREF のピボットの数に等しい。
- ピボット列は**元の**行列から取る必要がある。
- ランクは列空間と行空間の両方の次元に等しい。
