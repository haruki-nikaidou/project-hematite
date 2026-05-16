---
title: 対数
summary: "自然対数を指数関数の逆関数として定義し、積の法則・べきの法則・導関数という主要な性質を導く。さらに任意の底への指数関数と対数への枠組みに拡張する。"
prerequisites:
  - basis/math/analysis/functions/exp
  - basis/math/analysis/e
aliases: []
tags: ["Elementary Function"]
updated: 2026-05-13
---

[指数関数](../exp/)では $\exp : \mathbb{R} \to (0, \infty)$ が狭義単調増加かつ $(0, \infty)$ への全射であることを示した。狭義単調増加な関数は自動的に単射だから、$\exp$ は全単射（bijection）になる——つまり一意な逆関数をもつ。その逆関数が解析学全体を通じて最も有用な関数の一つだ。

## 自然対数

**定義。** **自然対数（natural logarithm）** $\ln : (0, \infty) \to \mathbb{R}$ を $\exp$ の逆関数として定義する。すなわち：

$$
\ln(\exp(x)) = x \qquad \text{すべての } x \in \mathbb{R} \text{ に対して，} \tag{1}
$$

$$
\exp(\ln(y)) = y \qquad \text{すべての } y > 0 \text{ に対して．} \tag{2}
$$

直感的には、$\ln(y)$ は「$e$ を何乗すれば $y$ が得られるか？」という問いに答える。$\exp$ が $\mathbb{R}$ を $(0, \infty)$ に全単射させるから、この問いは常に一意な答えをもつ。

### すぐわかる値

定義と $\exp$ について知っていることから：

- $\ln(1) = 0$（$\exp(0) = 1$ より）。
- $\ln(e) = 1$（$\exp(1) = e$ より）。
- 任意の $n \in \mathbb{Z}$ に対して $\ln(e^n) = n$（$\exp(n) = e^n$ より）。

これら3点は暗記する価値がある——電卓なしに $\ln$ について素早く推論できるようになる。

## 対数の積の法則

**定理（積の法則）。** すべての $x, y > 0$ に対して：

$$
\ln(xy) = \ln x + \ln y. \tag{3}
$$

*証明。* $a \coloneqq \ln x$、$b \coloneqq \ln y$ と置く——すなわち $\exp(a) = x$、$\exp(b) = y$。指数関数の**加法公式** $\exp(a + b) = \exp(a)\exp(b)$ より：

$$
xy = \exp(a) \cdot \exp(b) = \exp(a + b).
$$

両辺に $\ln$ を適用し恒等式 $(1)$ を使うと：

$$
\ln(xy) = \ln(\exp(a + b)) = a + b = \ln x + \ln y. \qquad \square
$$

直感的には $\ln$ は乗算を加算に変換する——電卓が登場するずっと前に対数表を算術に欠かせないものにした、まさにその性質だ。

$(3)$ から2つの系が直ちに得られる。$y = 1/x$ と置けば $\ln(1/x) = -\ln x$。$y = x$ と置けば $\ln(x^2) = 2\ln x$。実はすべての実数指数に対して完全なべきの法則が成立する。

## 対数のべきの法則

**定理（べきの法則）。** すべての $x > 0$ と $r \in \mathbb{R}$ に対して：

$$
\ln(x^r) = r\ln x. \tag{4}
$$

*証明の概略。* $r = n \in \mathbb{N}$ の場合、積の法則 $(3)$ を繰り返し適用する：

$$
\ln(x^n) = \ln(\underbrace{x \cdot x \cdots x}_{n\text{ 個}})
= \underbrace{\ln x + \ln x + \cdots + \ln x}_{n\text{ 個}} = n\ln x.
$$

$r = p/q$（$q \in \mathbb{N}^+$）の有理数の場合、$q \cdot \ln(x^{p/q}) = \ln((x^{p/q})^q) = \ln(x^p) = p\ln x$ より $\ln(x^{p/q}) = \tfrac{p}{q}\ln x$。任意の実数 $r$ への拡張は $\ln$ の連続性による。$\square$

べきの法則 $(4)$ は指数計算を乗算に変換する——$(3)$ が乗算を加算に変換したのと同様に。

## $\ln$ の導関数

**定理。** すべての $x > 0$ に対して：

$$
\frac{d}{dx}\ln x = \frac{1}{x}. \tag{5}
$$

*証明。* $y = \ln x$ と置く——すなわち $x = \exp(y)$。$x$ に関して両辺を**逆関数定理（inverse function theorem）**を使って微分する：

$$
1 = \frac{d}{dx}\exp(y) = \exp(y) \cdot \frac{dy}{dx} = x \cdot \frac{dy}{dx}.
$$

$\frac{dy}{dx}$ について解くと：

$$
\frac{dy}{dx} = \frac{1}{x}. \qquad \square
$$

これは印象的な結果だ：$\ln$ のグラフの点 $x$ での傾きは単純に $1/x$ であり、余分な乗数も関数もない。

## 単調性と境界での振る舞い

$(\ln x)' = 1/x > 0$（$x > 0$ のとき）だから、$\ln$ は定義域 $(0, \infty)$ 全体で**狭義単調増加**だ。

2つの境界点での振る舞いは $\exp$ との関係から直接従う：

$$
\lim_{x \to \infty} \ln x = +\infty, \qquad \lim_{x \to 0^+} \ln x = -\infty.
$$

最初の極限は $t \to +\infty$ のとき $\exp(t) \to +\infty$ だからその逆関数も限りなく増大することによる。2番目は $t \to -\infty$ のとき $\exp(t) \to 0$ による。合わせて $\ln$ が $(0, \infty)$ から $\mathbb{R}$ 全体への全単射であることが確認できる——これは $\exp$ が $\mathbb{R}$ を $(0, \infty)$ に全単射させるという事実の鏡像だ。

## 積分としての自然対数

$\ln$ に到達する第2の方法があり、こちらは導関数の公式 $(5)$ を最初から透明にしてくれる。次を定義する：

$$
L(x) \coloneqq \int_1^x \frac{1}{t}\,dt \qquad (x > 0). \tag{6}
$$

微積分学の基本定理より $L'(x) = 1/x$ かつ $L(1) = 0$。$L$ が $\ln$ と同じ積の法則を満たすことを検証でき（積分の変数変換による）、2つの連続関数が $x = 1$ で一致し同じ導関数をもつから、両者は同一だ：

$$
\ln x = \int_1^x \frac{1}{t}\,dt.
$$

この積分表示を $\ln$ の*定義*として採用し、$\int_1^e \frac{1}{t}\,dt = 1$ を満たす唯一の $e > 0$ として[ネイピア数](../../e/)を回収する流儀もある。

## 対数を通じた一般の指数関数

$\ln$ が使えるようになれば、任意の底 $b > 0$ と*任意の*実数指数 $x \in \mathbb{R}$（無理数を含む）に対して $b^x$ を定義できる。

**定義。** $b > 0$ に対して：

$$
b^x \;\coloneqq\; \exp(x \ln b). \tag{7}
$$

$x$ が有理数 $p/q$ のとき、これは $b^{p/q}$ の通常の算術的な意味と一致する（べきの法則 $(4)$ を使って確認できる）。定義 $(7)$ はこれをすべての実数指数にシームレスに拡張する。

**導関数。** 連鎖律で $(7)$ を微分すると：

$$
\frac{d}{dx}\,b^x = \exp(x \ln b) \cdot \ln b = (\ln b)\,b^x.
$$

余分な因子 $\ln b$ が $b^x$ と $e^x$ を区別するものだ：$b = e$ のとき $\ln e = 1$ となって因子が消える——これがまさに $e$ が「自然な」底である理由だ。

## 任意の底への対数

**定義。** $b > 0$、$b \neq 1$ として、**底 $b$ の対数**を：

$$
\log_b(x) \;\coloneqq\; \frac{\ln x}{\ln b} \qquad (x > 0) \tag{8}
$$

で定義する。

この定義により $\log_b(x) = y$ は $b^y = x$ と同値だ（$(7)$ を代入して確認できる）——学校代数で慣れ親しんだ意味と一致する。

### 底の変換公式

定義 $(8)$ より、任意の2つの有効な底 $a$ と $b$ に対して：

$$
\log_a(x) = \frac{\ln x}{\ln a}
= \frac{\ln x}{\ln b} \cdot \frac{\ln b}{\ln a}
= \log_b(x) \cdot \frac{1}{\log_b(a)}.
$$

同値な表し方をすると：

$$
\log_a(x) = \frac{\log_b(x)}{\log_b(a)}.
$$

実用的には、科学用電卓は $\log_{10}$（常用対数）と $\ln$ を提供している。**底の変換公式（change-of-base formula）**を使えばどちらか一方から任意の他の底の対数に到達できる。

## まとめ

- **自然対数** $\ln : (0, \infty) \to \mathbb{R}$ は $\exp$ の逆関数：$\ln(\exp(x)) = x$ かつ $\exp(\ln y) = y$。
- 主要な値：$\ln 1 = 0$、$\ln e = 1$、すべての $n \in \mathbb{Z}$ に対して $\ln(e^n) = n$。
- **積の法則：** $\ln(xy) = \ln x + \ln y$（加法公式 $\exp(a+b) = \exp(a)\exp(b)$ から導かれる）。
- **べきの法則：** $\ln(x^r) = r\ln x$（すべての $r \in \mathbb{R}$ と $x > 0$ に対して）。
- **導関数：** $(\ln x)' = 1/x$（逆関数定理で証明）。
- $\ln$ は $(0, \infty)$ 上で狭義単調増加；$x \to \infty$ のとき $\ln x \to +\infty$、$x \to 0^+$ のとき $\ln x \to -\infty$。
- **積分表示：** $\ln x = \int_1^x \frac{1}{t}\,dt$（導関数の公式を出発点とする別の定義）。
- **一般の指数関数：** $b^x \coloneqq \exp(x \ln b)$、導関数は $(\ln b)\,b^x$。
- **底 $b$ の対数：** $\log_b(x) \coloneqq \frac{\ln x}{\ln b}$；**底の変換公式**は $\log_a(x) = \frac{\log_b(x)}{\log_b(a)}$。
