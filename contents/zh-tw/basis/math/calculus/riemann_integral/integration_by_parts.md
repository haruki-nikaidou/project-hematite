---
title: 分部積分法
summary: "將乘積法則 (uv)' = u'v + uv' 在 [a, b] 上積分並應用牛頓–萊布尼茲公式，得到分部積分法（integration by parts）公式 ∫_a^b u(x) v'(x) dx = [u(x) v(x)]_a^b − ∫_a^b u'(x) v(x) dx。本章推導此公式，介紹不定積分形式 ∫ u dv = uv − ∫ v du，並演示典型應用：∫ x e^x dx、∫ ln x dx 以及 ∫ x^n e^x dx 的遞推公式。"
prerequisites:
  - basis/math/calculus/riemann_integral/newton_leibniz_formula
  - basis/math/calculus/differential/basic_roles_of_dif
aliases: []
tags:
  - 微積分
  - 積分
updated: 2026-05-22
---

許多積分涉及兩個函數的乘積——例如 $x e^x$、$x \ln x$ 或 $x^2 \sin x$。換元法對這類積分沒有幫助，因為沒有連鎖律的結構可以利用。**分部積分法（integration by parts）**正是處理乘積的對應技巧：它將一個因子乘以另一個因子的導數的積分，轉化為邊界項加上一個（希望更簡單的）積分。這個公式不過是[乘積法則](../../differential/basic_roles_of_dif/)反向閱讀後積分的結果。

## 由乘積法則推導

設 $u$ 與 $v$ 是 $[a, b]$ 上的可微函數，且其導數 $u'$ 與 $v'$ 連續。乘積法則給出

$$
(u(x)\,v(x))' = u'(x)\,v(x) + u(x)\,v'(x).
$$

整理後隔離 $u(x)\,v'(x)$ 項：

$$
u(x)\,v'(x) = (u(x)\,v(x))' - u'(x)\,v(x).
$$

對兩端在 $[a, b]$ 上積分，並對右端應用[牛頓–萊布尼茲公式](../newton_leibniz_formula/)：

$$
\int_a^b u(x)\,v'(x)\,dx
= \bigl[u(x)\,v(x)\bigr]_a^b - \int_a^b u'(x)\,v(x)\,dx.
$$

這就是定積分的**分部積分公式**。

## 不定積分形式與微分記號

對不定積分，去掉積分限。記 $du = u'(x)\,dx$，$dv = v'(x)\,dx$，公式變為

$$
\int u\,dv = uv - \int v\,du.
$$

這種**微分記號**是最簡潔的形式，也是實際使用時最常採用的形式。策略是將被積函數拆成稱為 $u$（待微分）與稱為 $dv$（待積分）的兩部分。選好拆分後，計算 $du = u'\,dx$ 並對 $dv$ 積分得 $v$，再代入公式。

## 選取 $u$ 與 $dv$：LIATE 啟發法

選哪個因子作為 $u$ 決定了 $\int v\,du$ 比原積分更簡單還是更複雜。一個實用的非正式指引是 **LIATE 順序**：

1. **L**ogarithms（對數，如 $\ln x$、$\log_a x$）
2. **I**nverse trigonometric functions（反三角函數，如 $\arctan x$、$\arcsin x$）
3. **A**lgebraic functions（代數函數，如多項式、冪函數）
4. **T**rigonometric functions（三角函數，如 $\sin x$、$\cos x$）
5. **E**xponentials（指數函數，如 $e^x$、$a^x$）

應優先將出現在此清單*較前位置*的函數指定為 $u$，將出現在*較後位置*的函數指定為 $dv$。其理由在於：對對數或反三角函數微分能大幅簡化它們（將 $\ln x$ 變成 $1/x$），而對指數或三角函數積分並不增加複雜度。這個啟發法不是定理——你始終應驗證所得積分確實更簡單——但在絕大多數標準情形中都能給出正確答案。

## 計算範例

### 範例 1：$\int x e^x\,dx$

由 LIATE，$x$（代數）排在 $e^x$（指數）之前，故令

$$
u = x, \qquad dv = e^x\,dx.
$$

則 $du = dx$，$v = e^x$。套用 $\int u\,dv = uv - \int v\,du$：

$$
\int x e^x\,dx = x e^x - \int e^x\,dx = x e^x - e^x + C = (x - 1)e^x + C.
$$

可驗證：$\bigl((x-1)e^x\bigr)' = e^x + (x-1)e^x = x e^x$。$\checkmark$

### 範例 2：$\int \ln x\,dx$

這裡只有一個因子，但可以寫成 $\ln x = \ln x \cdot 1$ 再使用分部積分。令

$$
u = \ln x, \qquad dv = dx.
$$

則 $du = \dfrac{1}{x}\,dx$，$v = x$。套用公式：

$$
\int \ln x\,dx = x \ln x - \int x \cdot \frac{1}{x}\,dx = x \ln x - \int 1\,dx = x \ln x - x + C.
$$

這是處理含對數積分的關鍵技巧：令 $u = \ln x$，微分後對數消失。

### 範例 3：$\int x^2 e^x\,dx$——重複應用

當代數因子的次數大於 $1$ 時，需反覆應用分部積分。令 $u = x^2$，$dv = e^x\,dx$，則 $du = 2x\,dx$，$v = e^x$：

$$
\int x^2 e^x\,dx = x^2 e^x - 2\int x e^x\,dx.
$$

剩餘的積分 $\int x e^x\,dx$ 恰好是範例 1，故

$$
\int x^2 e^x\,dx = x^2 e^x - 2(x - 1)e^x + C = (x^2 - 2x + 2)e^x + C.
$$

### 範例 4：$\int e^x \sin x\,dx$——自我參照技巧

$e^x$ 與 $\sin x$ 在微分或積分後均不變得更簡單，重複應用似乎會無限循環。而這種循環正是解題的關鍵。令

$$
u = e^x, \qquad dv = \sin x\,dx,
$$

則 $du = e^x\,dx$，$v = -\cos x$：

$$
\int e^x \sin x\,dx = -e^x \cos x + \int e^x \cos x\,dx. \tag{1}
$$

對 $\int e^x \cos x\,dx$ 再次應用分部積分，令 $u = e^x$，$dv = \cos x\,dx$，$v = \sin x$：

$$
\int e^x \cos x\,dx = e^x \sin x - \int e^x \sin x\,dx. \tag{2}
$$

將 (2) 代入 (1)：

$$
\int e^x \sin x\,dx = -e^x \cos x + e^x \sin x - \int e^x \sin x\,dx.
$$

原積分出現在兩端。記之為 $I$，求解：

$$
2I = e^x(\sin x - \cos x), \qquad \therefore\quad I = \frac{e^x(\sin x - \cos x)}{2} + C.
$$

關鍵規則是：在每一步均做*相同的選擇*決定哪個因子是 $u$；若第二步改變選擇，將撤銷第一步的工作。

## $I_n = \int x^n e^x\,dx$ 的遞推公式

範例 3 中的重複應用模式可推廣到任意正整數冪 $n \geq 1$。令 $u = x^n$，$dv = e^x\,dx$：

$$
\int x^n e^x\,dx = x^n e^x - n \int x^{n-1} e^x\,dx.
$$

記 $I_n = \int x^n e^x\,dx$，得**遞推公式**

$$
I_n = x^n e^x - n\, I_{n-1}.
$$

結合初始值 $I_0 = \int e^x\,dx = e^x + C$，這個遞推關係可計算任意非負整數 $n$ 的 $I_n$。對 $n = 1, 2$ 應用：

$$
I_1 = x e^x - I_0 = (x - 1)e^x + C,
$$

$$
I_2 = x^2 e^x - 2 I_1 = x^2 e^x - 2(x-1)e^x + C = (x^2 - 2x + 2)e^x + C,
$$

與範例 3 的直接計算結果一致。

## 摘要

- **分部積分法**是乘積法則的積分形式：$\int u\,dv = uv - \int v\,du$，或定積分形式 $\int_a^b u\,v'\,dx = \bigl[uv\bigr]_a^b - \int_a^b u'\,v\,dx$。
- 公式由乘積法則 $(uv)' = u'v + uv'$ 整理後應用[牛頓–萊布尼茲公式](../newton_leibniz_formula/)推導而來。
- **LIATE 啟發法**（對數、反三角、代數、三角、指數）指導 $u$ 的選擇：優先選取清單中靠前的因子。
- **對數**與**反三角函數**始終選為 $u$，使微分後它們消失。
- 當代數因子的次數為 $n$ 時，重複應用得到**遞推公式** $I_n = x^n e^x - n\,I_{n-1}$。
- 當兩個因子均不能被化簡（如 $e^x$ 與 $\sin x$）時，每步保持相同的 $u$ 選擇，應用兩次分部積分後得到關於原積分的方程，從而代數求解。
