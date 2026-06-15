---
title: 列空間與行空間（Row and Column Spaces）
summary: "將矩陣的列空間和行空間定義為其各列和各行的張成，說明列化簡如何給出兩者的基底，證明兩者的維度永遠相等，並以此共同值介紹秩。"
prerequisites: 
  - basis/math/linear_algebra/matrix
  - basis/math/linear_algebra/linear_span
aliases: []
tags: ["線性代數"]
updated: 2026-05-19
---

每個矩陣都儲存著兩組自然的向量族：它的各列和各行。各列的張成和各行的張成都是重要的子空間，它們編碼了哪些線性方程組有解以及矩陣有多大的「觸及範圍」。令人驚奇的事實——乍看不明顯——是這兩個張成，存在於完全不同的空間中，永遠有相同的維度。

## 列空間與行空間

對於體 $F$ 上的 $m \times n$ 矩陣 $A$，設 $r_1, \ldots, r_m \in F^n$ 為其各列向量，$c_1, \ldots, c_n \in F^m$ 為其各行向量。

- $A$ 的**列空間（row space）**是 $\text{row}(A) \coloneqq \text{span}(r_1, \ldots, r_m) \subseteq F^n$。
- $A$ 的**行空間（column space）**是 $\text{col}(A) \coloneqq \text{span}(c_1, \ldots, c_n) \subseteq F^m$。

兩者都是各自所在空間的[線性子空間](../linear_subspace/)，因為任意向量集合的張成永遠是子空間。注意它們的「住所」不同：列空間存在於 $F^n$（與行數一樣多的座標），而行空間存在於 $F^m$（與列數一樣多的座標）。

## 行空間告訴你什麼

乘積 $Ax$ 是 $A$ 的各行的線性組合：

$$Ax = x_1\,c_1 + x_2\,c_2 + \cdots + x_n\,c_n.$$

所以當 $x$ 遍歷整個 $F^n$ 時，$Ax$ 遍歷整個 $\text{col}(A)$。這給出一個清晰的可解性判準：

$$Ax = b \text{ 有解} \iff b \in \text{col}(A).$$

若 $b$ 在行空間之外，方程組無解——各行的任何組合都無法產生 $b$。

## 列運算保持列空間

計算列空間和行空間的關鍵工具是高斯-喬登消去法。以下是它與每個空間的交互方式。

每個基本列運算（交換兩列；以非零純量乘以一列；將一列的倍數加到另一列）都以一組新的列替換原有的列，而新舊列的張成是相同的。原因何在？因為每個運算都是可逆的，且產生的列是舊列的線性組合——而舊列也可以作為新列的線性組合來恢復。由於張成只取決於哪些線性組合可以達成，張成不會改變。

**推論**：列空間在列運算下是不變的。特別地，$A$ 的簡化列梯形式（RREF）的非零列構成 $\text{row}(A)$ 的基底——它們張成相同的空間，且顯然線性獨立（每個都在其他非零列為 $0$ 的行中有一個前導 $1$）。

## 列運算不保持行空間

列運算確實改變了行向量（column vectors）。將第 $i$ 列的 $c$ 倍加到第 $j$ 列會改變第 $j$ 列的所有元素，從而同時改變每一行。所以你不能從 RREF 的行中讀出 $\text{col}(A)$ 的基底。

列運算保持的是行之間的**線性相依關係**：若一行在化簡前是其他行的線性組合，化簡後同樣的關係成立，反之亦然。這意味著樞軸行的**位置**是可靠的——$A$ 的樞軸行是 $\text{col}(A)$ 的基底——但你必須從**原始**矩陣 $A$ 中取這些行，而不是從 RREF 中取。

## 計算例子

求

$$A = \begin{pmatrix} 1 & 2 & 3 \\ 2 & 4 & 6 \\ 1 & 1 & 2 \end{pmatrix}$$

的列空間和行空間的基底。

應用高斯-喬登消去法。$R_2 \leftarrow R_2 - 2R_1$，$R_3 \leftarrow R_3 - R_1$：

$$\begin{pmatrix} 1 & 2 & 3 \\ 0 & 0 & 0 \\ 0 & -1 & -1 \end{pmatrix}.$$

交換 $R_2$ 和 $R_3$，然後 $R_2 \leftarrow -R_2$：

$$\begin{pmatrix} 1 & 2 & 3 \\ 0 & 1 & 1 \\ 0 & 0 & 0 \end{pmatrix}.$$

回代：$R_1 \leftarrow R_1 - 2R_2$：

$$\begin{pmatrix} 1 & 0 & 1 \\ 0 & 1 & 1 \\ 0 & 0 & 0 \end{pmatrix}.$$

**列空間**：RREF 的非零列是 $(1, 0, 1)$ 和 $(0, 1, 1)$。這兩個向量構成 $\text{row}(A) \subseteq F^3$ 的基底。

**行空間**：樞軸行是第 1 和第 2 行（前導 $1$ 所在的位置）。從**原始** $A$ 中取這些行：

$$\text{col}(A) = \text{span}\!\left\{\begin{pmatrix}1\\2\\1\end{pmatrix},\ \begin{pmatrix}2\\4\\1\end{pmatrix}\right\} \subseteq F^3.$$

## 列秩等於行秩

在例子中，列空間和行空間的維度都是 $2$。這不是巧合。

**定理**：對任意矩陣 $A$，$\dim(\text{row}(A)) = \dim(\text{col}(A))$。

**證明**：在 $A$ 的 RREF 中，每個主元對應一個非零列（對列空間有貢獻）和一個樞軸行（對行空間有貢獻）。在兩種情況下主元的數目是相同的。由於 RREF 的非零列是 $\text{row}(A)$ 的基底，而 $A$ 的樞軸行是 $\text{col}(A)$ 的基底，兩個維度都等於主元的數目。$\square$

## 秩

這個共同的維度是 $A$ 的**秩（rank）**：

$$\text{rank}(A) \coloneqq \dim(\text{row}(A)) = \dim(\text{col}(A)) = \text{（$A$ 的 RREF 中主元的數目）}. \tag{1}$$

秩衡量矩陣有多少真正獨立的部分——$A$ 有多少個線性獨立的列（等價地，行）。對於 $m \times n$ 矩陣，$\text{rank}(A) \le \min(m, n)$，因為列空間（維度 $\le m$）和行空間（維度 $\le n$）都不能超過各自所在的空間。

秩、零化度和解結構之間的關係在[秩-零化度定理](../rank_nullity_theorem/)中精確闡述。

## 摘要

- **列空間** $\text{row}(A) = \text{span}(r_1, \ldots, r_m) \subseteq F^n$ 和**行空間** $\text{col}(A) = \text{span}(c_1, \ldots, c_n) \subseteq F^m$ 都是線性子空間。
- 方程組 $Ax = b$ 有解當且唯當 $b \in \text{col}(A)$。
- 列運算**保持列空間**：基底由 RREF 的非零列給出。
- 列運算**不保持行空間**：基底使用**原始**矩陣 $A$ 的樞軸行。
- **列秩等於行秩**：$\dim(\text{row}(A)) = \dim(\text{col}(A))$。
- **秩** $\text{rank}(A)$ 是這個共同的值，等於 RREF 中主元的數目。
