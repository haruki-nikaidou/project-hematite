---
title: LU 分解（LU Decomposition）
summary: "說明如何利用高斯消去法將方陣分解為一個下三角矩陣與一個上三角矩陣的乘積，以及此分解如何使多右端線性方程組的求解速度大幅提升。"
prerequisites: 
  - basis/math/linear_algebra/linear_map
  - basis/math/linear_algebra/gauss_jordan_elimination
aliases: []
tags: ["線性代數"]
updated: 2026-05-19
---

假設你不只需要解一次 $Ax = b$，而是對一百個不同的右端向量 $b$ 都要求解。每次從頭重新執行高斯-喬登消去法會浪費大量計算，因為那些工作只依賴於 $A$，而與 $b$ 無關。**LU 分解（LU decomposition）**將依賴於 $A$ 的工作封裝進兩個三角矩陣，使每個新的右端向量只需進行廉價的三角方程組求解。

## 什麼是 LU 分解

給定方陣 $A$，**LU 分解**是如下分解：

$$
A = LU \tag{1}
$$

其中：

- $L$ 是**下三角（lower-triangular）矩陣**，對角線上全為 $1$（對角線以上的所有元素為 $0$）。
- $U$ 是**上三角（upper-triangular）矩陣**（對角線以下的所有元素為 $0$）。

名稱來自**L**ower 和 **U**pper。以 $3 \times 3$ 矩陣為例，形狀如下：

$$
\underbrace{\begin{pmatrix} 1 & 0 & 0 \\ \ell_{21} & 1 & 0 \\ \ell_{31} & \ell_{32} & 1 \end{pmatrix}}_{L}
\underbrace{\begin{pmatrix} u_{11} & u_{12} & u_{13} \\ 0 & u_{22} & u_{23} \\ 0 & 0 & u_{33} \end{pmatrix}}_{U}
= A.
$$

## 高斯消去法如何產生 LU 分解

你已知道[高斯-喬登消去法](../gauss_jordan_elimination/)的前向掃描利用列替換運算清除每個樞軸以下的元素：$R_i \leftarrow R_i - m_{ij} R_j$，其中 $m_{ij} = a_{ij} / a_{jj}$ 是**乘數（multiplier）**。觀察這對 $A$ 的影響。

每個列替換 $R_i \leftarrow R_i - m_{ij} R_j$ 都可以寫成左乘一個**基本矩陣** $E_{ij}$。完成所有前向掃描運算後，得到

$$
E_k \cdots E_2 E_1 \, A = U,
$$

其中 $U$ 是你得到的列梯形矩陣（不進行縮放步驟——這裡保留樞軸的原始值，而非將其規格化為 $1$）。解出 $A$：

$$
A = E_1^{-1} E_2^{-1} \cdots E_k^{-1} \, U = L \, U.
$$

乘積 $L = E_1^{-1} \cdots E_k^{-1}$ 恰好是對角線上全為 $1$ 的下三角矩陣，原因如下：

- 列替換矩陣 $E_{ij}$（從第 $i$ 列減去 $m_{ij}$ 倍的第 $j$ 列）的逆恰好是對第 $i$ 列加上 $m_{ij}$ 倍的第 $j$ 列的矩陣——仍然是下三角的。
- 當乘數只從後面的列作用到前面的列（這正是前向消去所做的），其乘積也是下三角的。

這個非凡的結論是：**乘數 $m_{ij}$ 就是 $L$ 的對角線以下的元素。**你以消去法的副產品形式同時得到兩個因子，無需額外計算。

## LU 分解演算法

以下是針對 $n \times n$ 矩陣 $A$ 的顯式演算法。它就地（in-place）覆蓋 $A$：上三角部分（含對角線）成為 $U$，嚴格下三角部分儲存構成 $L$ 的乘數。

```
for j = 1 to n-1:          # pivot column
    for i = j+1 to n:      # rows below the pivot
        m = A[i][j] / A[j][j]
        A[i][j] = m        # store multiplier (becomes L)
        for k = j+1 to n:
            A[i][k] -= m * A[j][k]
        # A[i][j+1..n] is now updated (becomes U in that row)
```

完成後，從修改後的 $A$ 的嚴格下三角部分讀取 $L$（對角線插入 $1$），從上三角部分讀取 $U$。

## 計算範例

分解：

$$
A = \begin{pmatrix} 2 & 1 & 1 \\ 4 & 3 & 3 \\ 8 & 7 & 9 \end{pmatrix}.
$$

**步驟 1**——消去第一個樞軸 $a_{11} = 2$ 以下的元素。

乘數：$m_{21} = 4/2 = 2$，$m_{31} = 8/2 = 4$。

$$
R_2 \leftarrow R_2 - 2R_1, \quad R_3 \leftarrow R_3 - 4R_1:
$$

$$
\begin{pmatrix} 2 & 1 & 1 \\ 0 & 1 & 1 \\ 0 & 3 & 5 \end{pmatrix}.
$$

**步驟 2**——消去第二個樞軸 $a_{22} = 1$ 以下的元素。

乘數：$m_{32} = 3/1 = 3$。

$$
R_3 \leftarrow R_3 - 3R_2:
$$

$$
\begin{pmatrix} 2 & 1 & 1 \\ 0 & 1 & 1 \\ 0 & 0 & 2 \end{pmatrix} = U.
$$

將乘數收集到 $L$ 中：

$$
L = \begin{pmatrix} 1 & 0 & 0 \\ 2 & 1 & 0 \\ 4 & 3 & 1 \end{pmatrix}, \qquad U = \begin{pmatrix} 2 & 1 & 1 \\ 0 & 1 & 1 \\ 0 & 0 & 2 \end{pmatrix}.
$$

可以驗證：$LU = A$。

## 利用 LU 求解 $Ax = b$

一旦得到 $A = LU$，求解 $Ax = b$ 就轉化為依序求解兩個**三角方程組**。

$$
Ax = b \;\Longleftrightarrow\; L\underbrace{(Ux)}_{\displaystyle y} = b \;\Longleftrightarrow\; \begin{cases} Ly = b \\ Ux = y \end{cases}
$$

**前向代入（forward substitution）**——解 $Ly = b$ 求 $y$。

由於 $L$ 是對角線全為 $1$ 的下三角矩陣，可以從上到下逐列求解：

$$
y_i = b_i - \sum_{j=1}^{i-1} \ell_{ij}\, y_j, \quad i = 1, \ldots, n.
$$

**回代（back substitution）**——解 $Ux = y$ 求 $x$。

由於 $U$ 是上三角矩陣，從最後一列向上逐列求解：

$$
x_i = \frac{1}{u_{ii}}\!\left(y_i - \sum_{j=i+1}^{n} u_{ij}\, x_j\right), \quad i = n, \ldots, 1.
$$

每次三角方程組求解的時間複雜度為 $O(n^2)$，初始分解的時間複雜度為 $O(n^3)$。若需對 $k$ 個不同的右端向量求解 $Ax = b$，總代價為 $O(n^3 + kn^2)$，而非 $O(kn^3)$——當 $k$ 較大時節省巨大。

### 接續範例

利用上述 $L$ 和 $U$，求解 $Ax = b$，其中 $b = (4, 10, 26)^T$。

**前向代入**（$Ly = b$）：

$$
y_1 = 4,
$$
$$
y_2 = 10 - 2 \cdot 4 = 2,
$$
$$
y_3 = 26 - 4 \cdot 4 - 3 \cdot 2 = 4.
$$

**回代**（$Ux = y$）：

$$
x_3 = 4/2 = 2,
$$
$$
x_2 = (2 - 1 \cdot 2)/1 = 0,
$$
$$
x_1 = (4 - 1 \cdot 0 - 1 \cdot 2)/2 = 1.
$$

故 $x = (1, 0, 2)^T$。驗算：$Ax = (2+0+2,\; 4+0+6,\; 8+0+18)^T = (4, 10, 26)^T$。✓

## LU 分解存在的條件

（不進行列交換的）LU 分解存在且唯一，當且唯當 $A$ 的所有**首主子矩陣（leading principal submatrices）**非奇異——等價地，消去過程中遇到的每個樞軸都非零。形式上，對 $k = 1, \ldots, n-1$，$A$ 必須滿足 $\det(A_{k}) \ne 0$，其中 $A_k$ 是左上角的 $k \times k$ 子矩陣。

當在過程結束前遇到零樞軸時，需要交換列以將非零元素移到樞軸位置。這導出 **PLU 分解（PLU decomposition）**：

$$
PA = LU, \tag{2}
$$

其中 $P$ 是**置換矩陣（permutation matrix）**（其橫列是單位矩陣各列的一種重新排列）。每個非奇異矩陣都有 PLU 分解。在實際應用中，即使沒有遇到零樞軸，選擇最大可用元素作為樞軸（**部分樞軸選取（partial pivoting）**）也能改善數值穩定性，因此實際實作中總是計算 $PA = LU$。

## 摘要

- **LU 分解**將方陣分解為 $A = LU$，其中 $L$ 是對角線全為 $1$ 的下三角矩陣，$U$ 是上三角矩陣。
- 此分解是高斯消去法的副產品：$U$ 是前向掃描得到的列梯形矩陣，而**乘數**填入 $L$ 的對角線以下部分。
- 求解 $Ax = b$ 時，代入 $A = LU$ 後分別求解兩個三角方程組：先以**前向代入**解 $Ly = b$，再以**回代**解 $Ux = y$，各自的時間複雜度為 $O(n^2)$。
- 前期 $O(n^3)$ 的分解代價在同一個 $A$ 被多個右端向量複用時得到回報。
- 不帶列交換的 LU 分解要求所有首主子矩陣非奇異；一般情況下，**PLU 分解**可處理任意非奇異矩陣，且在實際應用中因數值穩定性而被優先採用。
