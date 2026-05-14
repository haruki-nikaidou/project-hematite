---
title: 導来集合
summary: "位相空間の部分集合の導来集合（すべての集積点の集まり）を導入し、閉集合の特徴づけと閉包作用素への橋渡しを示す。"
prerequisites:
  - basis/math/topology/accumulation_point
aliases: []
tags: ["Topology"]
updated: 2026-05-11
---

集合の[集積点](../accumulation_point/)が何かはもう知っている：開近傍のどれもがその集合の別の点と交わるような点だ。$A$ のすべての集積点を一つの集合にまとめたものが**導来集合**（derived set）であり、$A$ の「極限的な振る舞い」をコンパクトにまとめたパッケージだ。閉性を特徴づけ、閉包を構築するためのまさに正しい道具であることがわかる。

## 定義

$(X, \tau)$ を[位相空間](../topology_space/)とし、$A \subseteq X$ とする。$A$ の**導来集合**（derived set）$A'$ とは、$A$ のすべての集積点の集合のことだ：

$$
A' \coloneqq \{ x \in X : \forall\, U \in \tau,\ x \in U \implies (U \setminus \{x\}) \cap A \neq \varnothing \}. \tag{1}
$$

導来集合は $X$ の部分集合だが、$A$ の部分集合である必要はなく、$A$ が $A'$ の部分集合である必要もない。

## 例

### 標準位相の下での $\mathbb{R}$

- $A = (0, 1)$ とする。$A' = [0, 1]$：$[0,1]$ のすべての点は、端点 $0$ や $1$ も含め、すべての開近傍で $(0,1)$ と交わる。
- $A = \{1/n : n \in \mathbb{N}^+\}$ とする。$A' = \{0\}$：唯一の集積点は $0$ であり、$0 \notin A$。
- $A = \mathbb{Q}$ とする。$A' = \mathbb{R}$：すべての実数は有理数で近似できる。
- $A = \mathbb{Z}$ とする。$A' = \varnothing$：すべての整数は孤立している（他の整数を含まない近傍を持つ）。

### 離散位相

離散位相では、すべての一点集合が開集合なので、いかなる集合の集積点にも成り得ない。よって任意の $A \subseteq X$ について $A' = \varnothing$。

### $\mathbb{R}$ 上の有限補位相（ザリスキー的）

**有限補位相**（finite-complement topology）— 補集合が有限のとき、かつそのときに限り開集合 — では、開集合は大きい。任意の無限集合 $A$ と任意の $x \in \mathbb{R}$ について、$x$ を含む任意の開集合 $U$ は有限の補集合を持つため $\mathbb{R}$ のほぼすべての点を含み、$(U \setminus \{x\}) \cap A$ は無限大になる。よってすべての無限集合 $A$ に対して $A' = \mathbb{R}$。

## 性質

$(X, \tau)$ を位相空間とし、$A, B \subseteq X$ とする。

- **単調性**（monotone）：$A \subseteq B$ ならば $A' \subseteq B'$。（$B$ の点が多い分、開近傍を埋めるのに有利になる。）
- **合併**：$(A \cup B)' = A' \cup B'$。$A \cup B$ の集積点は $A$ または $B$ の集積点（あるいは両方）だ。
- **共通部分**：$(A \cap B)' \subseteq A' \cap B'$、ただし等号は一般に成立しない。
- **導来集合の導来集合**：$A'' \subseteq A \cup A'$（ただし $A'' = (A')'$ は導来集合の導来集合）。この包含関係は、$A$ の集積点の集積点自体が $A$ に属するか $A$ の集積点であることを意味する。
- **$A'$ は閉集合**（後述）。

### 導来集合が閉集合であることの証明

$A'$ が常に閉集合であることを示すには、その補集合 $X \setminus A'$ が開集合であることを示せばよい。

任意の点 $y \notin A'$ を取る。$y$ は $A$ の集積点でないので、$(V \setminus \{y\}) \cap A = \varnothing$ — つまり $V \cap A \subseteq \{y\}$ — となる開集合 $V \ni y$ が存在する。

次に、$V$ 内の点 $z \in V$ で $z \neq y$ であるものを取る。$z \notin A'$、すなわち $z$ が $A$ の集積点でないことを示したい。開集合 $V$ は $z$ の近傍であり（$V$ は開かつ $z \in V$）、$(V \setminus \{z\}) \cap A \subseteq (V \cap A) \setminus \{z\} \subseteq \{y\} \setminus \{z\} = \varnothing$（$z \neq y$ なので）。よって $z \notin A'$。

これにより、$A'$ に属さない任意の点 $y$ が $X \setminus A'$ に含まれる開近傍 $V \ni y$ を持つことが分かり、$X \setminus A'$ は開集合、$A'$ は閉集合だ。$\square$

## 導来集合と閉性

導来集合は閉集合の明快な特徴づけを与える — おそらく最も重要な応用だ：

> **定理.** 集合 $A \subseteq X$ が閉集合であることと、$A' \subseteq A$ であることは同値だ。

*証明の概略.*（$\Rightarrow$）$A$ が閉集合とすると $X \setminus A$ は開集合。$x \notin A$ ならば $X \setminus A$ は $x$ を含む開集合であって $(X \setminus A) \cap A = \varnothing$ だから $x$ は $A$ の集積点でない。よって $A' \subseteq A$。

（$\Leftarrow$）$A' \subseteq A$ と仮定する。任意の $y \notin A$ を取ると $y \notin A'$ なので、$U \cap A \subseteq \{y\}$ となる開集合 $U \ni y$ が存在する。$y \notin A$ なので $U \cap A = \varnothing$、つまり $U \subseteq X \setminus A$。$X \setminus A$ のすべての点が $X \setminus A$ 内に開近傍を持つので、$X \setminus A$ は開集合、$A$ は閉集合だ。$\square$

平易な言葉で言えば：$A$ が閉集合であることと、$A$ が「自身の極限的な振る舞いをすべて含む」こと — $A$ が集積する点がすでに $A$ に属すること — とは同値だ。

## 導来集合から閉包へ

導来集合は **[閉包](../closure/)** $\overline{A}$ の公式の核心的な構成要素だ：

$$
\overline{A} = A \cup A'. \tag{2}
$$

閉包 $\overline{A}$ は $A$ を含む最小の閉集合だ。公式 $(2)$ は、$A$ 自身に $A$ が集積する外部の点を加えることで得られると言っている。上の定理を使って $A \cup A'$ が閉集合であることも確認できる：$(A \cup A')' = A' \cup A'' \subseteq A' \cup (A \cup A') = A \cup A'$ なので、$A \cup A'$ は自身の導来集合を含む。

## 導来集合の反復（カントール–ベンディクソン）

カントール（Cantor）がまさにこの導来集合を導入したのは、*繰り返し適用する*と構造が見えるからだ。$A$ から出発して $A' = A^{(1)}$、次に $A'' = A^{(2)}$、と続ける。$\mathbb{R}$ の部分集合については、この列は（空集合になることもあるが）可算回のステップで安定する。**カントール–ベンディクソンの定理**（Cantor–Bendixson theorem）はこれを使って任意の閉集合を完全集合と可算集合に分解し、記述的集合論（descriptive set theory）に深い結果をもたらす。

## まとめ

- **導来集合** $A'$ は $A$ のすべての集積点の集まりだ。
- $A'$ は $A$ の部分集合である必要はなく、$A$ が $A'$ の部分集合である必要もない。
- $A'$ は常に**閉集合**だ。
- $A$ が閉集合であることと $A' \subseteq A$ であることは同値だ。
- **閉包**は $\overline{A} = A \cup A'$ で表される：導来集合を加えることで集合を「閉じる」。
- 導来集合は単調で合併に関して分配し、反復すると深い構造的情報が現れる（カントール–ベンディクソン）。
