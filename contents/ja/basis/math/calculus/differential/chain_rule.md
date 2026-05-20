---
title: 連鎖律
summary: "連鎖律は合成の微分を表す：$(f \\circ g)'(x) = f'(g(x)) \\cdot g'(x)$。このチェックポイントでは微分の定義からこの法則を証明し、$g'(x) = 0$ の微妙なケースを扱い、任意の微分可能関数の合成を微分できることを示す。"
prerequisites:
  - basis/math/calculus/differential/differentiable_function
  - basis/math/calculus/differential/basic_roles_of_dif
aliases: []
tags:
  - Calculus
  - Differentiation
updated: 2026-05-20
---

[基本法則](./basic_roles_of_dif/)は関数の算術的な組み合わせを扱うが、$(x^3+1)^{100}$ や $\sin(x^2)$ のような**合成（composition）**の微分は教えてくれない。**連鎖律（chain rule）**がその空白を埋める：$f \circ g$ の微分を $f$ と $g$ それぞれの微分で表すのだ。

## 定理

**定理（連鎖律）。** $g$ が $x$ で微分可能で $f$ が $g(x)$ で微分可能とする。このとき合成 $h \coloneqq f \circ g$ は $x$ で微分可能で

$$
h'(x) \;=\; f'(g(x)) \cdot g'(x). \tag{1}
$$

ライプニッツ記法で $u = g(x)$、$y = f(u)$ とおくと：

$$
\frac{dy}{dx} \;=\; \frac{dy}{du} \cdot \frac{du}{dx}.
$$

## 証明

素朴な消去 $\dfrac{f(g(x+k))-f(g(x))}{k} = \dfrac{f(g(x+k))-f(g(x))}{g(x+k)-g(x)} \cdot \dfrac{g(x+k)-g(x)}{k}$ は、$g(x+k) = g(x)$ となるゼロでない $k$ が存在するときに破綻する（第一因子が $0/0$ になる）。次の**補助関数の議論**がこのケースを解決する。

**証明。** 補助関数 $\phi$ を次で定義する：

$$
\phi(u) \;=\; \begin{cases} \dfrac{f(u) - f(g(x))}{u - g(x)} & u \neq g(x), \\[6pt] f'(g(x)) & u = g(x). \end{cases}
$$

$f$ は $g(x)$ で微分可能なので $\phi$ は $g(x)$ で連続だ。

任意の $k \neq 0$ に対して $u = g(x+k)$ とおくと：

$$
f(g(x+k)) - f(g(x)) \;=\; \phi(g(x+k)) \cdot \bigl(g(x+k) - g(x)\bigr),
$$

これは $g(x+k) = g(x)$ のときも成り立つ（両辺が $0$ になる）。$k$ で割ると：

$$
\frac{f(g(x+k)) - f(g(x))}{k} \;=\; \phi(g(x+k)) \cdot \frac{g(x+k) - g(x)}{k}.
$$

$k \to 0$ のとき：右の因子は $g'(x)$ に収束し、$g$ は $x$ で連続なので $g(x+k) \to g(x)$ となり $\phi(g(x+k)) \to \phi(g(x)) = f'(g(x))$ が成り立つ。ゆえに $(f \circ g)'(x) = f'(g(x)) \cdot g'(x)$。$\square$

## 例

### 多項式の冪

$$
\bigl((x^3+1)^5\bigr)' \;=\; 5(x^3+1)^4 \cdot 3x^2 \;=\; 15x^2(x^3+1)^4.
$$

### 1次式の合成

$$
\bigl((2x+1)^{100}\bigr)' \;=\; 100(2x+1)^{99} \cdot 2 \;=\; 200(2x+1)^{99}.
$$

### 抽象的な合成

$f$ が微分可能で $g(x) = f(x^2 + 3x)$ のとき、$g'(x) = f'(x^2+3x)\cdot(2x+3)$。

## まとめ

- **連鎖律**：$(f \circ g)'(x) = f'(g(x)) \cdot g'(x)$。
- 証明では補助関数 $\phi$ を使い、$g(x+k) = g(x)$ となる場合のゼロ除算を回避する。
- ライプニッツ記法：$\dfrac{dy}{dx} = \dfrac{dy}{du} \cdot \dfrac{du}{dx}$。
