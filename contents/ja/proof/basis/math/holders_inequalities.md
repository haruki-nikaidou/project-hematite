---
title: ヘルダーの不等式
summary: "共役指数 $1/p + 1/q = 1$（$p, q > 1$）に対するヘルダーの不等式 |∑ aᵢbᵢ| ≤ (∑ |aᵢ|ᵖ)^{1/p} (∑ |bᵢ|ᵍ)^{1/q} を、二つの数列を正規化してヤングの不等式を各項に適用することで証明する。"
prerequisites:
  - proof/basis/math/youngs_inequalities
aliases: []
tags:
  - 証明
  - 不等式
updated: 2026-05-20
---

ヘルダーの不等式は、二つの数列を組にして扱うときの主力となる評価だ。積の和 $\sum a_i b_i$ を、二つの数列それぞれの「大きさ」——共役な $\ell^p$ ノルムと $\ell^q$ ノルムで測ったもの——で抑える。$p = q = 2$ とすればコーシー・シュワルツの不等式が得られ、一般の場合は[ミンコフスキーの不等式](../minkowskis_inequalities/)（$\ell^p$ の三角不等式）を証明可能にするものだ。すべては[ヤングの不等式](../youngs_inequalities/)を一項ずつ適用することに帰着する。

## 定理

**定理（ヘルダーの不等式）.** $p, q > 1$ を共役指数 $\dfrac{1}{p} + \dfrac{1}{q} = 1$ とし、$a_1, \ldots, a_n$ と $b_1, \ldots, b_n$ を実数（または複素数）とする。このとき

$$
\sum_{i=1}^{n} |a_i b_i| \;\leq\; \left(\sum_{i=1}^{n} |a_i|^{p}\right)^{1/p} \left(\sum_{i=1}^{n} |b_i|^{q}\right)^{1/q}. \tag{1}
$$

$\big|\sum_i a_i b_i\big| \leq \sum_i |a_i b_i|$ だから、同じ評価が内積の絶対値も抑える。

## 着想：正規化してから各項にヤングを適用する

[ヤングの不等式](../youngs_inequalities/)は一つの積 $ab$ を $a^p/p + b^q/q$ で抑える。これを $i$ について和をとれば $\sum |a_i b_i| \leq \tfrac{1}{p}\sum|a_i|^p + \tfrac{1}{q}\sum|b_i|^q$ が得られる——惜しいが、右辺は二つのノルムの*積*ではなく*和*になっている。これを直すには、まず各数列を単位ノルムになるよう拡大縮小する。そこではべき乗の和が $1$ に潰れるので、最後にその拡大縮小を元に戻せばよい。

## 証明

次のようにおく。

$$
A \coloneqq \left(\sum_{i=1}^{n} |a_i|^{p}\right)^{1/p}, \qquad
B \coloneqq \left(\sum_{i=1}^{n} |b_i|^{q}\right)^{1/q}.
$$

**退化した場合.** $A = 0$ ならばすべての $a_i = 0$ だから $(1)$ の左辺は $0$ となり、不等式は自明に成り立つ。$B = 0$ の場合も同様だ。以下では $A, B > 0$ とする。

**正規化.** 拡大縮小した量を

$$
\alpha_i \coloneqq \frac{|a_i|}{A}, \qquad \beta_i \coloneqq \frac{|b_i|}{B}
$$

と定義する。構成からこれらは単位 $p$-ノルム・$q$-ノルムをもつ。

$$
\sum_{i=1}^{n} \alpha_i^{p} \;=\; \frac{1}{A^{p}}\sum_{i=1}^{n} |a_i|^{p} \;=\; 1,
\qquad
\sum_{i=1}^{n} \beta_i^{q} \;=\; \frac{1}{B^{q}}\sum_{i=1}^{n} |b_i|^{q} \;=\; 1. \tag{2}
$$

**各項にヤングを適用.** 各 $i$ について、非負の数 $\alpha_i, \beta_i$ にヤングの不等式を適用すると

$$
\alpha_i \beta_i \;\leq\; \frac{\alpha_i^{p}}{p} + \frac{\beta_i^{q}}{q}.
$$

$i = 1, \ldots, n$ について和をとり、$(2)$ を使うと

$$
\sum_{i=1}^{n} \alpha_i \beta_i
\;\leq\; \frac{1}{p}\sum_{i=1}^{n}\alpha_i^{p} + \frac{1}{q}\sum_{i=1}^{n}\beta_i^{q}
\;=\; \frac{1}{p} + \frac{1}{q}
\;=\; 1.
$$

**拡大縮小を元に戻す.** 左辺は $\dfrac{1}{AB}\sum_i |a_i b_i|$ だから、全体に $AB$ を掛けると

$$
\sum_{i=1}^{n} |a_i b_i| \;\leq\; AB \;=\; \left(\sum_{i=1}^{n} |a_i|^{p}\right)^{1/p}\left(\sum_{i=1}^{n} |b_i|^{q}\right)^{1/q}
$$

が得られる。$\square$

## 特別な場合としてのコーシー・シュワルツ

$p = q = 2$（$\tfrac{1}{2} + \tfrac{1}{2} = 1$ だから共役だ）とおくと、$(1)$ は

$$
\sum_{i=1}^{n} |a_i b_i| \;\leq\; \left(\sum_{i=1}^{n} a_i^{2}\right)^{1/2}\left(\sum_{i=1}^{n} b_i^{2}\right)^{1/2}
$$

となり、コーシー・シュワルツの不等式になる。つまりヘルダーはその一パラメータ一般化だ。

## まとめ

- **ヘルダーの不等式**：共役な $p, q$ に対して $\sum_i |a_i b_i| \leq \big(\sum_i |a_i|^p\big)^{1/p}\big(\sum_i |b_i|^q\big)^{1/q}$。
- **三つの手順による証明**：各数列を単位ノルムに正規化し、[ヤングの不等式](../youngs_inequalities/)を各項に適用し、最後に拡大縮小の係数を掛け戻す。
- **正規化が効く理由**：単位ノルムではべき乗の和が $1/p$ と $1/q$ になり、これらの和がちょうど $1$ になる。
- **コーシー・シュワルツ**は $p = q = 2$ の場合だ。
- ヘルダーは[ミンコフスキーの不等式](../minkowskis_inequalities/)の証明における鍵となる材料だ。
