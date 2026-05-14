---
title: 閉包（位相）
summary: "位相空間における集合の閉包を、それを含む最小の閉集合として定義し、導来集合と閉集合の交叉による等価な特徴づけを確立し、その主要な性質を検討する。"
prerequisites: 
  - basis/math/topology/derived_set
  - basis/math/topology/interior
aliases: []
tags: ["Topology"]
updated: 2026-05-11
---

開区間 $(0, 1)$ を出発点として「それを含む最小の閉集合は何か？」と問えば、答えはすぐに $[0, 1]$ だ — 欠けている二つの端点を加えればよい。**閉包**（closure）はこの「封じ込める」操作を、任意の位相空間の任意の部分集合に一般化する。距離空間の直感である「極限点を加える」とは異なり、位相的な定義は距離を必要としない：開集合だけで動作する。

## 三つの等価な定義

$(X, \tau)$ を[位相空間](../topology_space/)とし、$A \subseteq X$ とする。$A$ の閉包を $\overline{A}$（または $\operatorname{cl}(A)$）と書き、次の三つの等価な方法で定義できる。

### 定義 1：$A$ を含む最小の閉集合

$$
\overline{A} \coloneqq \bigcap \{ C \subseteq X : C \text{ は閉集合かつ } A \subseteq C \}. \tag{1}
$$

$A$ を含むすべての閉集合の交叉だ。閉集合の任意の交叉（無限個でも）は閉集合だ。$A$ を含む閉集合の族は空でない（$X$ 自身が常に閉集合なので）。よって $\overline{A}$ は確定した閉集合であり、$A$ を含む最小の閉集合だ（$A$ の閉包集合がすべて交叉に現れるため）。

### 定義 2：導来集合との合併

$$
\overline{A} = A \cup A', \tag{2}
$$

ここで $A'$ は $A$ の[導来集合](../derived_set/)（$A$ のすべての[集積点](../accumulation_point/)の集合）だ。$A$ に「外側から近づいてくる」点を正確に付け加える。導来集合のチェックポイントで確立されたように、$A \cup A'$ は閉集合であり $A \subseteq A \cup A'$ が成り立ち、$A$ のすべての閉包集合は $A'$ も含む。

### 定義 3：近傍による特徴づけ

点 $x \in X$ が $\overline{A}$ に属することと、$x$ を含むすべての開集合 $U$ について

$$
U \cap A \neq \varnothing \tag{3}
$$

が成り立つことは同値だ。

集積点との違いに注目してほしい：ここでは $x$ 自身が $A$ に属することを許す（交叉が $x$ と異なる $A$ の点を証人にする必要はない）。つまり $x \in \overline{A}$ であることと $x \in A$ または $x$ が $A$ の集積点であることは同値 — ちょうど $A \cup A'$ だ。

三つの定義はすべて同じ集合を与える。議論に応じて最も便利なものを使えばよい。

## 例

### $\mathbb{R}$ の標準位相

- $\overline{(0, 1)} = [0, 1]$。$(0,1)$ を含む最小の閉集合は閉区間；等価に $0$ と $1$ が $(0,1)$ の集積点であり、他の実数は集積点でない。
- $\overline{\mathbb{Q}} = \mathbb{R}$。すべての実数が $\mathbb{Q}$ の集積点だ（有理数は $\mathbb{R}$ で稠密（dense））。
- $\overline{\{1/n : n \geq 1\}} = \{1/n : n \geq 1\} \cup \{0\}$。唯一の集積点は $0$。
- $\overline{\mathbb{Z}} = \mathbb{Z}$。すべての整数は孤立しており（集積点なし）、集合はすでに閉集合だ。
- $\overline{\varnothing} = \varnothing$ かつ $\overline{X} = X$ は常に成り立つ。

### 離散位相

$X$ のすべての部分集合が開集合なので、補集合も開集合であり、すべての部分集合が閉集合でもある。よってすべての $A$ について $\overline{A} = A$ だ。閉包は何も加えない — 付け加えるべき集積点が存在しない。

### 密着位相

$\varnothing$ と $X$ だけが閉集合だ。$A \subsetneq X$ を空でない真部分集合とすると、$A$ を含む閉集合は $X$ しかないので $\overline{A} = X$。

## 閉包の性質

$(X, \tau)$ を位相空間とし、$A, B \subseteq X$ とする。

- **$\overline{A}$ は閉集合**であり $A \subseteq \overline{A}$。（定義 $(1)$ より。）
- **$A$ が閉集合であることと $A = \overline{A}$ であることは同値。** $A$ が閉であれば交叉 $(1)$ に現れるので $\overline{A} \subseteq A$；常に $A \subseteq \overline{A}$ だから等号が従う。
- **べき等性**（idempotent）：$\overline{\overline{A}} = \overline{A}$。$\overline{A}$ はすでに閉集合なので、その閉包は自身だ。
- **単調性**（monotone）：$A \subseteq B$ ならば $\overline{A} \subseteq \overline{B}$。
- **合併**：$\overline{A \cup B} = \overline{A} \cup \overline{B}$。ある点が $A \cup B$ に近いことと、$A$ または $B$ に近いことは同値だ。
- **共通部分（一方向のみ）**：$\overline{A \cap B} \subseteq \overline{A} \cap \overline{B}$。等号は一般に成立しない。$\mathbb{R}$ では $\overline{(0,1) \cap (1,2)} = \overline{\varnothing} = \varnothing$ だが、$\overline{(0,1)} \cap \overline{(1,2)} = [0,1] \cap [1,2] = \{1\}$。

## 内部との双対性

閉包と[内部](../interior/)は補集合を通じて双対だ。任意の $A \subseteq X$ に対して：

$$
\overline{A} = X \setminus \operatorname{int}(X \setminus A), \tag{4}
$$

$$
\operatorname{int}(A) = X \setminus \overline{X \setminus A}. \tag{5}
$$

$(4)$ は「$A$ の閉包は補集合の内部に属さない点の全体」と読める。$A$ の「縁」にある点は $A$ の内部にも $X \setminus A$ の内部にも属さないため、内部ではなく閉包に入る — これがまさに[境界](../boundary/)だ。

この双対公式によって、閉包に関するすべての定理は補集合を取ることで内部に関する定理に変換できる（逆も同様）。この対称性は位相幾何学全体を貫く。

## 稠密性

集合 $A$ が $\overline{A} = X$ を満たすとき、$A$ は $X$ において**稠密**（dense）という：$X$ のすべての点は $A$ に属するか、$A$ から近づかれる。$\mathbb{Q}$ は $\mathbb{R}$ において稠密だ。

より一般に、$B \subseteq \overline{A}$ のとき $A$ は $B$ において稠密という。稠密性は解析学と位相幾何学の中心的な概念だ：「よい」集合（$\mathbb{Q}$ や多項式など）がより大きな空間において稠密であることがわかれば、任意の元をよい元で近似できる。

## まとめ

- **閉包** $\overline{A}$ は $A$ を含む最小の閉集合であり、すべての閉包集合の交叉として得られる。
- 等価に $\overline{A} = A \cup A'$：導来集合を加えてすべての集積点を取り込む。
- 等価に点による特徴づけ：$x \in \overline{A}$ であることと $x$ のすべての開近傍が $A$ と交わることは同値。
- $A$ が閉集合であることと $A = \overline{A}$ であることは同値；閉包はべき等・単調であり、有限合併に分配される。
- 閉包と内部は**双対**：$\overline{A} = X \setminus \operatorname{int}(X \setminus A)$。
- $\overline{A} = X$ のとき $A$ は $X$ において**稠密**という。
- 閉包と内部の差 — $\overline{A} \setminus \operatorname{int}(A)$ — が $A$ の**[境界](../boundary/)**だ。
