---
title: ロピタルの定理
summary: "ロピタルの定理（L'Hôpital's rule）は $0/0$ や $\\infty/\\infty$ の不定形の極限を、$f/g$ の代わりに $f'/g'$ の極限に置き換えることで計算できるようにする。このチェックポイントではコーシーの平均値定理を用いてこの定理を証明し、各不定形をその形に帰着させる方法を示す。"
prerequisites:
  - basis/math/calculus/differential/cauchys_finite-increment_theorem
aliases: []
tags:
  - 微積分
  - 極限
updated: 2026-05-21
---

分数の分子と分母がともに零に近づくとき、あるいはともに発散するとき、代入によって極限を読み取ることはできない。これらは**不定形（indeterminate forms）**と呼ばれ、解析学において常に現れる。ロピタルの定理はその解決策を与える：分数を導関数の比に置き換えて再び試みるのだ。

## 不定形

$\lim_{x \to a} \frac{f(x)}{g(x)}$ が*不定形*であるとは、単純な代入によって $\frac{0}{0}$ や $\frac{\infty}{\infty}$ のような無意味な式が生じることをいう。極限の値は各部分が極限値に近づく速さに依存し、ロピタルの定理は導関数を通じてまさにその情報を取り出す。

## 主張

**定理（ロピタルの定理）。** $f$ と $g$ が $a$ の穿孔近傍上で微分可能とする（$a \in \mathbb{R}$ または $a = \pm\infty$）。次の条件を仮定する：

1. $g'(x) \neq 0$（$a$ の近傍で）、かつ
2. 極限が $\tfrac{0}{0}$ の形——$\lim_{x \to a} f(x) = \lim_{x \to a} g(x) = 0$——または $\tfrac{\infty}{\infty}$ の形——$\lim_{x \to a} |g(x)| = \infty$——である。

もし

$$
\lim_{x \to a} \frac{f'(x)}{g'(x)} \;=\; L \quad (L \in \mathbb{R} \cup \{+\infty,\, -\infty\}) \tag{1}
$$

ならば、

$$
\lim_{x \to a} \frac{f(x)}{g(x)} \;=\; L \tag{2}
$$

が成り立つ。この定理は片側極限（$x \to a^+$ または $x \to a^-$）にも同様に適用される。

## $\tfrac{0}{0}$ の場合の証明

$\lim_{x \to a} f(x) = \lim_{x \to a} g(x) = 0$ を仮定する。$f(a) = g(a) = 0$ と定めることで $f$、$g$ を $a$ まで拡張する（$a$ での連続性は保たれる）。

$a$ の穿孔近傍内の $x \neq a$ に対し、[コーシーの平均値定理](../cauchys_finite-increment_theorem/)を $f$、$g$ に $a$ と $x$ を端点とする閉区間上で適用する：

$$
\frac{f(x)}{g(x)} \;=\; \frac{f(x) - f(a)}{g(x) - g(a)} \;=\; \frac{f'(c_x)}{g'(c_x)},
$$

ここで $c_x$ は $a$ と $x$ の間に厳密に存在する。$x \to a$ のとき、中間点 $c_x \to a$ も成り立つ（$|c_x - a| < |x - a|$ による挟み撃ち）。したがって：

$$
\lim_{x \to a} \frac{f(x)}{g(x)} \;=\; \lim_{x \to a} \frac{f'(c_x)}{g'(c_x)} \;=\; \lim_{c \to a} \frac{f'(c)}{g'(c)} \;=\; L. \quad \square
$$

$\tfrac{\infty}{\infty}$ の場合は、基準点を固定してその後の部分を制御するというコーシーの定理のより精密な適用が必要だが、同じ仮定の下で同じ結論に至る。

## 他の不定形への帰着

$\tfrac{0}{0}$ と $\tfrac{\infty}{\infty}$ 以外の不定形は、代数的に変形することでどちらかの形に帰着できる。

### $0 \cdot \infty$

$\lim f(x) = 0$ かつ $\lim g(x) = \infty$ ならば、次のように書き換える：

$$
f(x)\,g(x) \;=\; \frac{f(x)}{1/g(x)} \;\;\text{（}\tfrac{0}{0}\text{ の形）} \qquad\text{または}\qquad \frac{g(x)}{1/f(x)} \;\;\text{（}\tfrac{\infty}{\infty}\text{ の形）}.
$$

導関数がよりシンプルになる方の書き換えを選ぶ。

### $\infty - \infty$

$\lim f(x) = \lim g(x) = \infty$ ならば、式に応じた共通分母を使って一つの分数にまとめる。結果は $\tfrac{0}{0}$ または $\tfrac{\infty}{\infty}$ の形になる。

### $0^0$、$\infty^0$、$1^\infty$

$\lim h(x)^{k(x)}$ がこれらの形の一つをとるならば、自然対数をとる：

$$
\ln\!\bigl(h(x)^{k(x)}\bigr) \;=\; k(x)\ln h(x).
$$

これは $0 \cdot \infty$ の形になり、さらに帰着できる。$\lim k(x)\ln h(x) = M$ が分かれば、元の極限は $e^M$ だ。

## 例

**例 1（$\tfrac{0}{0}$）。** $\displaystyle\lim_{x \to 0} \dfrac{\sin x}{x}$。

分子・分母ともに $0$ で消える。ロピタルの定理を適用する：

$$
\lim_{x \to 0} \frac{\sin x}{x} \;=\; \lim_{x \to 0} \frac{\cos x}{1} \;=\; 1.
$$

**例 2（$\tfrac{\infty}{\infty}$、繰り返し適用）。** 固定した $n \in \mathbb{N}$ に対して $\displaystyle\lim_{x \to \infty} \dfrac{x^n}{e^x}$。

ロピタルの定理を $n$ 回適用する。毎回の適用で分子の冪が一つ減る：

$$
\lim_{x \to \infty} \frac{x^n}{e^x} \;=\; \lim_{x \to \infty} \frac{n\,x^{n-1}}{e^x} \;=\; \cdots \;=\; \lim_{x \to \infty} \frac{n!}{e^x} \;=\; 0.
$$

どんな多項式も最終的には指数関数に支配される。

**例 3（$1^\infty$）。** $\displaystyle\lim_{x \to \infty} \!\left(1 + \dfrac{1}{x}\right)^{\!x}$。

$L$ をこの極限とする。対数をとると $0 \cdot \infty$ の形に変換される：

$$
\ln L \;=\; \lim_{x \to \infty} x\ln\!\!\left(1 + \frac{1}{x}\right) \;=\; \lim_{x \to \infty} \frac{\ln(1 + 1/x)}{1/x} \quad \left(\text{}\frac{0}{0}\text{ の形}\right).
$$

ロピタルの定理を適用する（分子・分母をそれぞれ $x$ で微分）：

$$
\lim_{x \to \infty} \frac{\dfrac{-1/x^2}{1 + 1/x}}{-1/x^2} \;=\; \lim_{x \to \infty} \frac{1}{1 + 1/x} \;=\; 1,
$$

よって $\ln L = 1$ かつ $L = e$。

## 定理が適用できない場合

ロピタルの定理は $\lim f'(x)/g'(x)$ が存在することを**必要とする**。$f'/g'$ が収束せずに振動する場合、定理は $f/g$ について何も言えない——$f/g$ はそれでも十分に良い極限を持つかもしれない。標準的な例は

$$
\lim_{x \to \infty} \frac{x + \sin x}{x}
$$

だ：$f'/g' = 1 + \cos x$ は $0$ と $2$ の間で振動するが、$f/g = 1 + (\sin x)/x \to 1$ だ。

## まとめ

- **ロピタルの定理**：$f/g$ が $a$ において $\tfrac{0}{0}$ または $\tfrac{\infty}{\infty}$ の不定形であり、$\lim f'/g'$ が存在するならば、$\lim f/g = \lim f'/g'$。
- **証明**（$\tfrac{0}{0}$ の場合）：コーシーの平均値定理により $f(x)/g(x) = f'(c_x)/g'(c_x)$（$c_x$ は $a$ と $x$ の間に挟まれる）が成り立ち、$x \to a$ のとき $c_x \to a$ となる。
- **その他の不定形**の帰着：$0\cdot\infty$ は一つの分数に変形；$\infty - \infty$ は共通分母で；$0^0$、$\infty^0$、$1^\infty$ は対数をとる。
- $\lim f'/g'$ が存在しない場合、定理は何も言えない；その極限が存在しないことは $\lim f/g$ が失敗することを意味しない。
