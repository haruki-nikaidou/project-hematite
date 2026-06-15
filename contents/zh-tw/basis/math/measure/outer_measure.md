---
title: 外測度
summary: "外測度（outer measure）藉由對可數開覆蓋的總長度取下確界，對空間的每個子集賦予大小。本章節定義外測度，證明其單調性和可數次可加性，並說明為何可數可加性在一般情況下會失敗——從而引出限制到可測集的必要性。"
prerequisites:
  - basis/math/measure/sigma_algebra
  - basis/math/analysis/supremum_infimum
aliases: []
tags:
  - 測度論
updated: 2026-05-20
---

你希望有一個函式能對 $\mathbb{R}$ 的每個子集賦予「大小」。[σ 代數](../sigma_algebra/)告訴你*哪些*集合最終將是可測的，但在限制到這些集合之前，你先建構一個初步的大小函式——**外測度（outer measure）**——它定義在*所有*子集上。它的關鍵優點是始終有定義良好；它的關鍵缺陷是只有次可加性，而非完全可加性。修正這個缺陷正是下一章節卡拉泰奧多里（Carathéodory）的工作。

## 定義

基本想法是從*外部*用開區間覆蓋集合 $E$ 並加總其長度，以此近似 $E$ 的大小。對所有可數覆蓋取[下確界（infimum）](../analysis/supremum_infimum/)，即得覆蓋 $E$ 所需的最小可能總長度。

**定義。** 對任意集合 $E \subseteq \mathbb{R}$，$E$ 的**勒貝格外測度（Lebesgue outer measure）**為

$$
\lambda^*(E) \;\coloneqq\; \inf\!\left\{
  \sum_{k=1}^{\infty} (b_k - a_k)
  \;\middle|\;
  E \subseteq \bigcup_{k=1}^{\infty} (a_k, b_k)
\right\}, \tag{1}
$$

其中下確界取遍覆蓋 $E$ 的所有可數開區間族 $(a_k, b_k)$。若不存在有限上界，令 $\lambda^*(E) = +\infty$。

幾點符號說明：
- 區間 $(a_k, b_k)$ 可以重疊；$b_k - a_k$ 是第 $k$ 個區間的長度。
- 允許多次使用同一個區間（但這樣做只是浪費覆蓋空間）。
- 有限覆蓋是可數覆蓋的特例（用空區間補足即可）。

同樣的構造可在 $\mathbb{R}^n$ 上用 $n$ 維長方體進行，或在任意度量空間上用適當的「基本集」進行，但現在我們在 $\mathbb{R}$ 上工作。

## 三個基本性質

### （一）空集的外測度為零

$$
\lambda^*(\emptyset) = 0. \tag{2}
$$

對任意 $\varepsilon > 0$，用長度為 $\varepsilon$ 的單一區間 $(0, \varepsilon)$ 覆蓋 $\emptyset$。令 $\varepsilon \to 0$ 得 $\lambda^*(\emptyset) \leq 0$；由於長度非負，故 $\lambda^*(\emptyset) = 0$。

### （二）單調性

若 $A \subseteq B \subseteq \mathbb{R}$，則

$$
\lambda^*(A) \leq \lambda^*(B). \tag{3}
$$

$B$ 的每個可數覆蓋也是 $A$ 的可數覆蓋。對 $B$ 的覆蓋取下確界，所得數值已不小於 $\lambda^*(A)$。

### （三）可數次可加性

對任意集合序列 $E_1, E_2, E_3, \ldots \subseteq \mathbb{R}$，

$$
\lambda^*\!\left(\bigcup_{k=1}^{\infty} E_k\right) \;\leq\; \sum_{k=1}^{\infty} \lambda^*(E_k). \tag{4}
$$

*證明概要。* 若某個 $\lambda^*(E_k) = +\infty$，不等式平凡成立。否則，固定 $\varepsilon > 0$。對每個 $k$，選取 $E_k$ 的可數開區間覆蓋，使總長度至多為 $\lambda^*(E_k) + \varepsilon/2^k$。將所有這些區間合在一起，構成 $\bigcup_k E_k$ 的一個可數覆蓋，總長度至多為

$$
\sum_{k=1}^{\infty}\!\left(\lambda^*(E_k) + \frac{\varepsilon}{2^k}\right)
= \sum_{k=1}^{\infty} \lambda^*(E_k) + \varepsilon.
$$

由於 $\varepsilon$ 是任意的，$(4)$ 得證。

這三個性質——正規化 $(2)$、單調性 $(3)$ 和可數次可加性 $(4)$——是抽象意義上**外測度**的定義公理。集合 $X$ 上滿足這三條性質的任意函式 $\mu^* \colon 2^X \to [0, +\infty]$ 稱為 $X$ 上的外測度。

## 外測度與區間長度吻合

一個基本合理性驗證：對有界閉區間 $[a, b]$，

$$
\lambda^*([a, b]) = b - a. \tag{5}
$$

**上界。** 用單一區間 $(a - \varepsilon, b + \varepsilon)$ 覆蓋 $[a, b]$，得 $\lambda^*([a,b]) \leq b - a + 2\varepsilon$；令 $\varepsilon \to 0$。

**下界。** $[a, b]$ 的任何開覆蓋都有*有限*子覆蓋（海涅–博雷爾定理，Heine–Borel）。對 $[a, b]$ 的有限覆蓋的長度求和，結果至少為 $b - a$（對重疊區間的數目用歸納法得出的標準論證）。由於每個可數覆蓋都包含這樣一個有限子覆蓋，下確界至少為 $b - a$。

綜合得 $\lambda^*([a,b]) = b - a$。同樣的論證給出 $\lambda^*((a,b)) = \lambda^*([a,b)) = b - a$，對開區間和半開區間均成立。

## 可數可加性為何會失敗

外測度滿足次可加性 $(4)$，但它對所有子集**不**滿足可數可加性。來自[測度論導論](../introduce_to_measure/)的維塔利集 $V$ 是反例：平移集合 $V_q \coloneqq V + q$（其中 $q \in \mathbb{Q} \cap [-1, 1]$）兩兩不相交，且

$$
[0,1] \;\subseteq\; \bigcup_{q \in \mathbb{Q} \cap [-1,1]} V_q \;\subseteq\; [-1, 2].
$$

單調性給出 $1 \leq \lambda^*\!\left(\bigcup_q V_q\right) \leq 3$。由於所有 $V_q$ 都是 $V$ 的平移，它們有相同的外測度。若可數可加性成立，總和要麼是 $0$（若 $\lambda^*(V) = 0$）要麼是 $+\infty$（若 $\lambda^*(V) > 0$）——兩者都不在 $[1, 3]$ 內。矛盾。

結論：外測度是你對 $\mathbb{R}$ 的*所有*子集所能做到的最佳結果。要獲得真正的可加性，你必須限制到一個適當的子族——即由[卡拉泰奧多里準則](../measurable_criterion/)所識別的可測集。

## 摘要

- **勒貝格外測度** $\lambda^*(E)$ 由式 $(1)$ 定義，是覆蓋 $E$ 的可數開區間族的總長度的下確界。
- 它滿足：$\lambda^*(\emptyset) = 0$（式 $(2)$）、**單調性**（式 $(3)$）、**可數次可加性**（式 $(4)$）。
- 這三個性質是外測度的抽象定義；$\lambda^*$ 是 $\mathbb{R}$ 上的外測度。
- 在區間上，$\lambda^*$ 與普通長度吻合——式 $(5)$。
- 可數可加性在所有子集上失敗：維塔利集表明，在 $2^{\mathbb{R}}$ 上不存在一致的、平移不變的、可數可加的測度。
- 解決方案是[卡拉泰奧多里準則](../measurable_criterion/)：識別出哪些集合對每個測試集都有可加分割，並將 $\lambda^*$ 限制到這些集合上。
