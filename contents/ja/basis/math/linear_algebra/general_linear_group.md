---
title: 一般線型群
summary: "正則な $n \times n$ 行列が乗法のもとで群をなすことを示し、$GL(n, F)$ とその座標非依存版 $GL(V)$ を導入し、特殊線型群 $SL(n, F)$ を含む重要な部分構造を探る。"
prerequisites: 
  - basis/math/linear_algebra/invertiable_matrix
  - basis/math/linear_algebra/linear_map
  - basis/math/linear_algebra/dimension
  - basis/math/abstract_algebra/group
aliases: []
tags: ["Linear Algebra", "Abstract Algebra"]
updated: 2026-05-19
---

正則行列とは何か、そしてどう扱うかはすでにわかった。次の自然な問いは：すべての正則行列が一緒にどんな構造をなすか？答えは[群](../../abstract_algebra/group/)だ——**一般線型群**（general linear group）。これはすべての正則線型変換の代数的な住処であり、対称性と可逆性が役割を果たすあらゆる場所で数学全体に現れる。

## 正則行列が群をなす理由

[正則行列](../invertiable_matrix/)から、体 $F$ 上の正則な $n \times n$ 行列についての四つの重要な事実がわかる：

1. 二つの正則行列の積は正則だ：$(AB)^{-1} = B^{-1}A^{-1}$。
2. 単位行列 $I_n$ は正則だ。
3. 行列の乗法は結合的だ。
4. すべての正則行列 $A$ は逆行列 $A^{-1}$ を持ち、それもまた正則だ。

これらはちょうど四つの群の公理——閉性、単位元、結合性、逆元——だ。したがって正則な $n \times n$ 行列全体の集合は群をなす。

## 定義

> **定義.** **一般線型群** $\text{GL}(n, F)$ は、$F$ 上の正則な $n \times n$ 行列全体の集合であり、群演算として行列の乗法を持つ：
>
> $$\text{GL}(n, F) \coloneqq \{ A \in M_{n,n}(F) \mid A \text{ は正則} \}.$$

公理を明示的に検証しよう：

| 公理 | 検証 |
|------|------|
| 閉性 | $A, B$ が正則 $\Rightarrow$ $(AB)^{-1} = B^{-1}A^{-1}$ が存在するので $AB \in \text{GL}(n,F)$ |
| 結合性 | 行列の乗法は結合的 |
| 単位元 | $I_n \cdot I_n = I_n$ なので $I_n \in \text{GL}(n, F)$ |
| 逆元 | すべての $A \in \text{GL}(n,F)$ に対して行列 $A^{-1}$ が存在し $\text{GL}(n,F)$ にも属する |

## $n \geq 2$ では非可換

整数の加法と異なり、$n \geq 2$ のとき $\text{GL}(n, F)$ は**非可換**（non-abelian）だ：行列の乗法は一般に可換でない。$\mathbb{R}$ 上の具体的な反例：

$$
A = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}, \qquad B = \begin{pmatrix} 1 & 0 \\ 1 & 1 \end{pmatrix}.
$$

$$
AB = \begin{pmatrix} 2 & 1 \\ 1 & 1 \end{pmatrix}, \qquad BA = \begin{pmatrix} 1 & 1 \\ 1 & 2 \end{pmatrix}.
$$

$AB \ne BA$ なので群は非可換だ。この非可換性は、二つの変換を異なる順序で適用すると一般に異なる結果が生まれるという事実を反映する。

例外は $n = 1$：$\text{GL}(1, F) = \{(c) \mid c \ne 0\} \cong F^\times$（$F$ の非ゼロスカラーの乗法群）は可換だ。

## 座標非依存版：GL(V)

$\text{GL}(n, F)$ の定義は $F^n$ の基底の選択（座標）に依存する。基底に依存しない版がある。体 $F$ 上の任意の有限次元ベクトル空間 $V$ に対して：

$$
\text{GL}(V) \coloneqq \{ T: V \to V \mid T \text{ は全単射な線型写像} \},
$$

を群演算として関数合成を持つ群として定義する。$V$ から自身への全単射な線型写像を $V$ の**線型自己同型**（linear automorphism）という。

$V$ の基底を固定すると、すべての線型自己同型は正則行列で表され、群同型が得られる：

$$
\text{GL}(V) \cong \text{GL}(n, F), \qquad n = \dim V.
$$

異なる基底は異なる同型を与えるが、構造として同等だ。したがって $\text{GL}(n, F)$ は $V$ の抽象的な対称群の具体的・座標的な記述だ：$V$ の線型構造を保ちながら全単射に並べ替えるすべての方法を捉えている。

## 特別な場合

**$\text{GL}(n, \mathbb{R})$**：正則実行列の群。幾何学的には、元は $\mathbb{R}^n$ の正則線型変換——「体積が非ゼロで」$\mathbb{R}^n$ を低次元部分空間に潰さないもの——だ。

**$\text{GL}(n, \mathbb{C})$**：複素数版。$\mathbb{C}$ は代数的閉体なので、この群は実数版よりさらに豊かな構造を持ち、表現論の中心的役割を果たす。

**有限体 $\mathbb{F}_q$（$q$ 個の元を持つ）上の $\text{GL}(n, \mathbb{F}_q)$**：$\text{GL}(n, \mathbb{F}_q)$ は*有限*群だ。正則行列の数を数えることは $\mathbb{F}_q^n$ の順序付き基底の数を数えることと同じだ：

$$
|\text{GL}(n, \mathbb{F}_q)| = \prod_{k=0}^{n-1}(q^n - q^k). \tag{1}
$$

因子 $(q^n - q^k)$ は $(k+1)$ 番目の列の選択肢の数を数える：前の $k$ 本の列のスパン（大きさ $q^k$ の $k$ 次元部分空間）の外にあるものでなければならない。

## 重要な部分群：SL(n, F)

$\text{GL}(n, F)$ の中に重要な部分群が座っている。**特殊線型群**（special linear group）は：

$$
\text{SL}(n, F) \coloneqq \{ A \in \text{GL}(n, F) \mid \det(A) = 1 \}.
$$

行列式は乗法的——$\det(AB) = \det(A)\det(B)$——であり $\det(I_n) = 1$、$\det(A^{-1}) = \det(A)^{-1}$ なので、$\text{SL}(n, F)$ は乗法と逆行列について閉じ、単位元を含む。したがって $\text{SL}(n, F)$ は $\text{GL}(n, F)$ の部分群だ。

$\mathbb{R}$ 上では：$\text{SL}(n, \mathbb{R})$ の元はちょうど符号付き $n$ 次元体積を保存する正則変換だ。$\mathbb{R}^2$ と $\mathbb{R}^3$ の回転がその例：向きと体積を保存するので $\det = 1$ だ。

全体の群 $\text{GL}(n, F)$ は任意の非ゼロの行列式を許す；$\text{SL}(n, F)$ はその中の「体積保存」の部分だ。

## まとめ

- **一般線型群** $\text{GL}(n, F)$ は $F$ 上の正則な $n \times n$ 行列全体の群であり、行列の乗法を演算とする。
- 四つの群の公理はすべて成り立つ：$(AB)^{-1} = B^{-1}A^{-1}$ からの閉性；単位元 $I_n$；行列の乗法の結合性；逆元は逆行列。
- $n \geq 2$ のとき $\text{GL}(n, F)$ は**非可換**；$n = 1$ のとき乗法群 $F^\times$ に帰着する。
- 座標非依存版 $\text{GL}(V)$ は $V$ の線型自己同型の群；基底の選択で $\text{GL}(V) \cong \text{GL}(\dim V, F)$ が得られる。
- $q$ 個の元を持つ有限体上では $|\text{GL}(n, \mathbb{F}_q)| = \prod_{k=0}^{n-1}(q^n - q^k)$。
- **特殊線型群** $\text{SL}(n, F) = \{A \in \text{GL}(n,F) \mid \det(A) = 1\}$ は $\text{GL}(n,F)$ の部分群であり、体積保存変換からなる。
