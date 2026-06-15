---
title: 微積分總結
summary: "單變數微積分的回顧：極限、導數與黎曼積分三大支柱如何透過牛頓–萊布尼茲公式相互扣合，以及微分與積分兩側的均值定理族如何驅動所有具體的計算。本章綜覽從極限與連續性，歷經微分與泰勒展開，直至定積分、不定積分與廣義積分的路徑，並指出各支柱下一步的推廣方向——凸性推廣至凸分析，黎曼積分推廣至勒貝格積分。"
prerequisites:
  - basis/math/calculus/differential/tylors_formula
  - basis/math/calculus/differential/lhopitals_role
  - basis/math/calculus/differential/conditions_of_function_be_convex
  - basis/math/calculus/differential/jensons_inequality
  - basis/math/calculus/differential/dif_inv_function
  - basis/math/calculus/riemann_integral/improper_integral_convergence
  - basis/math/calculus/riemann_integral/change_var_in_integral
  - basis/math/calculus/riemann_integral/riemann_integrable_functions
aliases: []
tags:
  - 微積分
updated: 2026-05-22
---

單變數微積分建立在三大支柱上——**極限**、**導數**與**黎曼積分**——一旦你看清它們如何相互扣合，整個學科就會變得清晰。本章退後一步，不再停留於個別定理，而是繪製出全貌：哪些概念依賴哪些，兩側之間的連結是什麼，以及離開本課程後各支柱將如何進一步延伸。

## 三大支柱

### 極限與連續性

微積分中的每個其他概念都被定義為某種極限。導數是差商的極限；黎曼積分是黎曼和的極限；廣義積分的收斂是正常積分的極限。因此，極限是基礎層，其上所有概念都默默依賴它。

**連續性（continuity）**是極限讓你表達的第一個結構性質：$f$ 在 $x_0$ 連續，當且僅當 $\lim_{x \to x_0} f(x) = f(x_0)$。閉有界區間上的連續函式具有強力性質——它們能取到最大值與最小值（極值定理）和取到中間所有值（中間值定理）。這兩個事實在整個學科的各類證明中被反覆引用。

### 導數

**導數（derivative）** $f'(x_0)$ 是 $f$ 在 $x_0$ 處切線的斜率，定義為極限

$$
f'(x_0) \;\coloneqq\; \lim_{x \to x_0} \frac{f(x) - f(x_0)}{x - x_0}.
$$

可微性蘊含連續性，但比連續性更強。微分的運算法則——和、積、商、鏈式法則——將任何初等函式都化為有限個已知導數的反覆組合。[反函式的導數](./differential/dif_inv_function/)法則 $(f^{-1})'(y) = 1/f'(f^{-1}(y))$ 將此表格延伸至對數與反三角函式。

高階導數 $f^{(n)}$ 描述曲率、凸性與振盪，是[泰勒公式](./differential/tylors_formula/)的輸入。

### 黎曼積分

**黎曼積分（Riemann integral）** $\int_a^b f(x)\,dx$ 由閉區間上有界函式透過上下達布和定義：當上和的下確界等於下和的上確界時，$f$ 可積。兩大類函式是[黎曼可積的](./riemann_integral/riemann_integrable_functions/)：單調函式，以及至多有有限個不連續點的函式。連續函式一定可積；狄利克雷函式（有理數／無理數指示函式）是不可積的典型反例。

## 支柱的扣合：基本定理

初等微積分中最深刻的結果是**牛頓–萊布尼茲公式（Newton–Leibniz formula）**：

$$
\int_a^b f(x)\,dx \;=\; G(b) - G(a)，
$$

其中 $G$ 是 $f$ 的任意原函式（反導數），即 $G' = f$。這個公式在邏輯上分為兩個獨立的部分：

1. **微積分基本定理第一部分（FTC1）**：若 $f$ 在 $[a,b]$ 上連續，則 $F(x) \coloneqq \int_a^x f(t)\,dt$ 可微，且 $F'(x) = f(x)$。
2. **微積分基本定理第二部分（FTC2）**：若 $G$ 是 $f$ 的任意原函式，則 $\int_a^b f = G(b) - G(a)$。

FTC1 說明微分與積分是互逆運算。FTC2 將計算定積分——和的極限——的問題轉化為求原函式的代數任務。沒有這座橋樑，兩大支柱就是孤立的；有了它，一側的技能立即轉移到另一側。

## 均值定理族

一個核心思想——將函式與割線斜率比較——貫穿微分一側幾乎所有非平凡定理。

**羅爾定理（Rolle's Theorem）**是基礎情形：若 $f$ 在 $[a,b]$ 連續，在 $(a,b)$ 可微，且 $f(a) = f(b)$，則存在 $c \in (a,b)$ 使得 $f'(c) = 0$。

**拉格朗日均值定理（Lagrange's MVT）**是其推廣：存在 $c \in (a,b)$ 使得 $f(b) - f(a) = f'(c)(b-a)$。這用來證明單調性判準（正導數蘊含遞增）、「常數函式導數為零」的方向，以及——在泰勒公式核心——拉格朗日餘項。

**柯西均值定理（Cauchy's MVT）**是比值版本：存在 $c$ 使得 $\frac{f(b)-f(a)}{g(b)-g(a)} = \frac{f'(c)}{g'(c)}$。它是證明 $0/0$ 不定式的[羅必達法則](./differential/lhopitals_role/)的關鍵步驟。

在積分一側，**積分均值定理（mean value theorem for integrals）**說存在 $\xi \in [a,b]$ 使得 $\int_a^b f = f(\xi)(b-a)$。這是 FTC1 用來辨識 $F(x) = \int_a^x f$ 的差商極限的依據。

因此，微分均值定理族與積分均值定理族並非平行發展；它們是使牛頓–萊布尼茲公式得以被證明的主力工具。

## 微分深探：凸性與泰勒展開

### 凸性

一個函式在某區間上**凸（convex）**，是指每條弦都在圖形上方或與之重合。[微分刻劃](./differential/conditions_of_function_be_convex/)將此幾何條件化為分析條件：$f$ 凸若且唯若 $f'$ 單調不減，等價地（對二次可微的 $f$）若且唯若 $f'' \geq 0$ 處處成立。凸性因此不需要二階導數的知識；它直接與 $f'$ 的單調性相連，而這已由拉格朗日均值定理掌控。

[詹森不等式（Jensen's inequality）](./differential/jensons_inequality/)是有限點的推廣：對凸函式 $f$ 和非負且和為 $1$ 的權重 $\lambda_i$，

$$
f\!\left(\sum_i \lambda_i x_i\right) \;\leq\; \sum_i \lambda_i f(x_i).
$$

這一個不等式蘊含了幾十個經典不等式（AM-GM、赫爾德……）。在機器學習中，它出現在 EM 演算法的推導以及變分界中。

### 泰勒公式

[泰勒公式（Taylor's formula）](./differential/tylors_formula/)說，一個 $(n+1)$ 次可微的函式等於其 $n$ 次泰勒多項式加上一個顯式餘項：

$$
f(x) \;=\; \sum_{k=0}^{n} \frac{f^{(k)}(x_0)}{k!}(x-x_0)^k \;+\; \frac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_0)^{n+1}.
$$

餘項的拉格朗日形式來自對輔助函式應用羅爾定理，因此泰勒公式是均值定理族的直接後裔。它的兩個主要用途是：帶誤差界的多項式近似，以及對不定式極限的機械求值（作為反覆應用羅必達法則的更整潔替代）。

## 積分深探：計算與推廣

### 定積分及換元法與分部積分法

兩種積分技巧將定積分轉化為可解的形式。[換元法（change of variables）](./riemann_integral/change_var_in_integral/)

$$
\int_\alpha^\beta f(\varphi(t))\,\varphi'(t)\,dt \;=\; \int_{\varphi(\alpha)}^{\varphi(\beta)} f(x)\,dx
$$

由對複合原函式用鏈式法則求導、再應用牛頓–萊布尼茲公式推得。分部積分法

$$
\int_a^b u\,v'\,dx \;=\; \bigl[uv\bigr]_a^b - \int_a^b u'\,v\,dx，
$$

以同樣方式從乘積法則推得。因此兩者都是 FTC2 應用於巧妙選取的原函式後的推論。

### 廣義積分

當區間無界或被積函式在某端點發散時，$\int_a^b f$ 被定義為正常積分的極限。廣義積分的[收斂性判準](./riemann_integral/improper_integral_convergence/)與數列收斂性判準相仿：比較判準、極限比較判準，以及針對振盪被積函式的阿貝爾–狄利克雷判準（Abel–Dirichlet criterion）。阿貝爾–狄利克雷判準用積分第二均值定理來控制振盪部分。

## 各支柱的後續推廣

單變數微積分是基礎，而非終點。

**凸性 → 凸分析。** 詹森不等式與微分凸性判準是凸分析的入口，凸分析研究凸集合與凸函式上的最佳化。次微分（subdifferential）取代了非光滑凸函式的導數；對偶理論推廣了凸性的切線刻劃。

**黎曼積分 → 勒貝格積分（Lebesgue integral）。** 黎曼積分有其局限：它要求不連續點集合「很小」（勒貝格意義下測度為零），且與函式的逐點極限互動不佳。勒貝格積分以水平切片而非垂直切片度量面積，允許遠更廣泛的可積函式類，且有更整潔的極限定理（單調收斂定理、控制收斂定理）。黎曼積分是計算的正確工具；勒貝格積分是分析的正確工具。

## 摘要

- **極限**是共同語言：導數、積分、連續性與廣義積分都被定義為極限。
- **$[a,b]$ 上的連續性**給出極值定理（取到最小值與最大值）和中間值定理（取到中間所有值）；兩者在整個學科中被默默引用。
- **導數**由差商極限定義；微分法則（積、鏈、反函式）將任何初等函式化為已知表格。
- **黎曼積分**是上下達布和的公共極限；單調函式與分段連續函式可積；狄利克雷函式不可積。
- **牛頓–萊布尼茲公式**（基本定理）橋接兩側：$F(x) = \int_a^x f$ 是可積函式時 $F'(x) = f(x)$；$\int_a^b f = G(b) - G(a)$ 對任意原函式 $G$ 成立。
- **均值定理族**（羅爾 → 拉格朗日 → 柯西 → 泰勒；積分均值定理）驅動兩側幾乎所有非平凡證明。
- **泰勒公式**以 $n$ 次多項式近似 $f$，餘項由 $f^{(n+1)}$ 控制；$e^x$、$\sin x$、$\cos x$、$\ln(1+x)$ 的標準級數由令 $n \to \infty$ 得出。
- **凸性**以 $f'' \geq 0$ 刻劃；**詹森不等式**推廣至有限加權和，開啟凸分析的大門。
- **[換元法](./riemann_integral/change_var_in_integral/)**與**分部積分法**都是 FTC2 應用於複合或乘積原函式的推論。
- **[廣義積分](./riemann_integral/improper_integral_convergence/)**是正常積分的極限；收斂性判準與數列判準相仿，阿貝爾–狄利克雷判準藉助積分第二均值定理處理振盪情形。
- 自然的推廣方向是**凸分析**（源自凸性與詹森不等式）以及**勒貝格積分**（源自黎曼積分），後者是嚴格機率論與泛函分析所必需。
