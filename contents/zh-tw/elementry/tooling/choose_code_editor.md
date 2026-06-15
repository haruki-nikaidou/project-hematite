---
title: 選擇你的程式碼編輯器/IDE
summary: "適合初學者的指南：介紹最受歡迎的程式碼編輯器和 IDE，比較它們的優缺點，讓你能選出最適合自己旅程的工具。"
prerequisites: 
  - elementry/tooling/prepare_environment
aliases: []
tags: ["實踐", "工具"]
updated: 2026-05-11
---

在你寫下第一行程式碼之前，你需要一個地方來寫它。那個地方就是你的**程式碼編輯器（code editor）**或 **IDE**（整合開發環境，Integrated Development Environment）。選對工具會奠定你整個開發體驗的基調，所以花幾分鐘了解你的選項是值得的。

## 編輯器和 IDE 的差別是什麼？

**程式碼編輯器**是一種為程式碼而生的文字編輯器。它處理語法突顯（syntax highlighting）（給關鍵字上色讓它們更顯眼）等功能，並可以透過外掛擴充以做更多事。輕量的編輯器啟動快速，不會礙事。

**IDE** 把所有東西打包在一起：編輯器、除錯器（debugger）、建置工具、重構輔助工具等。它深度了解你的語言，可以提供更智慧的協助。代價是 IDE 更重，啟動需要更長時間。

兩者之間的界線已經模糊了。現代編輯器如 **VS Code** 一旦安裝足夠多的擴充功能，感覺就像完整的 IDE。標籤比找到適合你工作流程的工具不那麼重要。

## VS Code——合理的預設選擇

**[Visual Studio Code](https://code.visualstudio.com/)**（通常稱為 **VS Code** 或 **VSC**）是大多數開發者最先選擇的編輯器，這是有道理的。

> **VS Code 不是 Visual Studio。** 它們共享一個名字和一家公司（Microsoft），但它們是完全不同的產品。VS Code 是一個輕量的跨平台編輯器。Visual Studio 是一個重量級的 Windows IDE。如果你搜尋其中一個而找到另一個，你找錯了。

**VS Code 的優點：**

- **擴充功能（extensions）**——VS Code 市集有數萬個擴充功能。不管你需要什麼語言、框架或工作流程，幾乎肯定有相應的擴充功能。例如，Rust Analyzer 擴充功能可以為你的編輯器帶來完整的 Rust 語言支援。
- **友善的 UI**——介面簡潔直觀。側欄、終端機和設定都很容易找到，不需要閱讀手冊。
- **AI 驅動的分支版本**——基於 VS Code 開源核心建立的一系列編輯器（如 **[Cursor](https://www.cursor.com/)** 和 **[Windsurf](https://windsurf.com/)**）添加了 AI 配對程式設計功能。如果 AI 輔助對你很重要，這些分支版本值得探索，因為它們可以直接取代 VS Code。

**VS Code 的不足：**

- **效能**——VS Code 是在 Electron（一個在你的應用程式中封裝網頁瀏覽器的框架）上建立的。它的記憶體和 CPU 使用量明顯多於原生替代方案，在較舊的硬體或非常大的專案上可能感覺遲鈍。

*建議：* 如果你剛入門，VS Code 是阻力最小的路徑。社群龐大，教程通常假設你在使用它，且它處理幾乎所有語言都很好。

## Zed——速度快的新秀

**[Zed](https://zed.dev/)** 是一個用 Rust 從頭建立的較新編輯器，設計時首要考量就是速度。在 VS Code 可能在複雜檔案上拖延的地方，Zed 保持靈敏，因為它是原生的——沒有底層的瀏覽器引擎。

**Zed 的突出之處：**

- **速度**——開啟檔案、滾動、搜尋：Zed 做這一切都比 VS Code 快。如果你曾感覺 VS Code 有些拖延，Zed 就像一陣清新的空氣。
- **開箱即用的不錯語言支援**——Zed 使用與 VS Code 相同的語言伺服器協定，內建支援許多流行語言。例如，Rust 支援不需要安裝任何額外東西就能正常工作。
- **協同編輯**——Zed 內建了即時多人編輯功能，這對通用編輯器來說是不尋常的。

**Zed 的不足：**

- **擴充功能較少**——Zed 的擴充功能生態系遠小於 VS Code 的。如果你依賴某個特定的 VS Code 擴充功能，Zed 可能還沒有等效的。

*建議：* 如果 VS Code 的效能困擾你，而你願意用一些擴充功能覆蓋率換取速度，Zed 是一個很好的選擇。它特別適合 Rust 開發。

## JetBrains IDEs——專業工具箱

**[JetBrains](https://www.jetbrains.com/)** 製造了一系列 IDE，每個都專注於特定的語言或平台：**[IntelliJ IDEA](https://www.jetbrains.com/idea/)** 用於 Java/Kotlin，**[PyCharm](https://www.jetbrains.com/pycharm/)** 用於 Python，**[WebStorm](https://www.jetbrains.com/webstorm/)** 用於 JavaScript，**[RustRover](https://www.jetbrains.com/rust/)** 用於 Rust，等等。

**JetBrains IDEs 的突出之處：**

- **深度的語言理解**——JetBrains 工具不只是突顯你的程式碼；它們理解它。例如，**RustRover** 可以在 Rust 巨集（macros）*內部*突顯和自動補全程式碼——VS Code 和 Zed 沒有辦法做到這一點，因為巨集在編譯時展開，對編輯器來說出了名地難以分析。
- **豐富的內建功能**——重構、資料庫工具、git 整合和除錯器都預先安裝好並協同工作，不需要四處尋找外掛。

**JetBrains IDEs 的不足：**

- **它們不免費**——JetBrains 產品在商業使用時需要付費訂閱。有免費的學習和開源專案方案，但一旦你開始專業工作，你就需要授權。對於剛探索的初學者來說這還好，但在把你的工作流程建立在它上面之前，值得了解這個模式。
- **重**——它們使用的資源比 VS Code 多，更不用說 Zed 了。

*建議：* 如果你在 JetBrains 支援的語言中做嚴肅的工作，且費用不是障礙，他們的工具確實很出色。對於 Rust 來說，RustRover 對巨集的支援本身就能節省數小時的挫折。

## Vim / Neovim——給堅定的極簡主義者

**[Vim](https://www.vim.org/)** 是一個 1991 年的終端機編輯器。它的後繼者 **[Neovim](https://neovim.io/)** 在保持相同基本模式的同時將其現代化：你通過鍵盤命令控制一切，不需要滑鼠。

**為什麼一些開發者對它深信不疑：**

- **Vim 鍵盤綁定**——Vim 的編輯模式（在「普通」模式下導航和「插入」模式下輸入之間切換）聽起來很奇怪，直到你把它內化，此時許多開發者發現它對編輯文字的速度大幅提升。你可以移動、刪除、複製和轉換程式碼，而不需要把手從鍵盤上抬起來。
- **立即啟動**——即使是重度配置的 Neovim 也能在毫秒內開啟。在慢速機器上，這很重要。
- **透過 SSH 工作**——如果你在終端機中編輯遠端伺服器上的檔案，Vim 已經在那裡了。你不需要設定圖形編輯器或透過網路轉發 GUI。

**為什麼初學者應謹慎對待：**

Vim 的學習曲線很陡。「如何退出 Vim」是最多人搜尋的程式設計問題之一，這個笑話的存在是因為 Vim 的模態設計對習慣普通文字編輯器的人來說確實很陌生。許多開發者在 VS Code 或 Zed 中安裝 **Vim 模式擴充功能**來兩全其美——你獲得了你喜愛的鍵盤綁定，而不必放棄其餘的編輯器生態系。

*建議：* 除非你有特定的理由（SSH 工作、極端的資源限制，或對 Vim 模式的真正好奇心），否則從 VS Code 或 Zed 開始。如果你之後對 Vim 鍵盤綁定感到好奇，先在你現有的編輯器中嘗試一個 Vim 外掛。

## Visual Studio——適用於 Windows 原生和遊戲開發

**[Visual Studio](https://visualstudio.microsoft.com/)**（不是 VS Code——參見上面的注意）是 Microsoft 為 Windows 設計的全功能 IDE。它是以下方面的黃金標準：

- **C# 和 .NET 開發**
- **Windows 的 C++**（特別是使用 DirectX 或 Windows API）
- **使用 Unity 的遊戲開發**（Unity 的工具與 Visual Studio 緊密整合）

除了這些特定的利基市場，Visual Studio 就是殺雞用牛刀了。它只能在 Windows 上使用，安裝需要幾個 GB，且與 Microsoft 生態系緊密耦合。

*建議：* 只有在你建立 Windows 原生應用程式、使用 Unity 或專業地編寫 C# 時才選擇 Visual Studio。對於一般程式設計——包括 Rust——堅持使用 VS Code、Zed 或 JetBrains。

## Xcode——適用於 Apple 平台開發

**[Xcode](https://developer.apple.com/xcode/)** 是 Apple 的 IDE，只能在 macOS 上使用。它是以下方面的必要工具：

- **iOS 和 iPadOS 應用程式開發**
- **macOS 應用程式開發**
- **watchOS 和 tvOS 開發**

如果你不在為 Apple 平台建立軟體，Xcode 提供不了任何比更好的通用編輯器所沒有的東西。

*建議：* 只有在你的目標是在 Apple 平台上發布應用程式時才安裝 Xcode。對於其他一切，從上面的其他編輯器中選一個。

## 摘要

這裡有一個快速比較，幫助你做決定：

| 編輯器 / IDE | 最適合 | 主要缺點 |
|---|---|---|
| **[VS Code](https://code.visualstudio.com/)** | 大多數初學者；任何語言 | 較高的記憶體和 CPU 使用量 |
| **[Zed](https://zed.dev/)** | 注重速度的開發者；Rust | 較小的擴充功能生態系 |
| **[JetBrains IDEs](https://www.jetbrains.com/)** | 深度的語言特定工作 | 付費授權；資源密集 |
| **[Vim](https://www.vim.org/) / [Neovim](https://neovim.io/)** | SSH 工作；以鍵盤為中心的工作流程 | 陡峭的學習曲線 |
| **[Visual Studio](https://visualstudio.microsoft.com/)** | C#、Unity、Windows 原生 C++ | 僅限 Windows；對大多數任務過於強大 |
| **[Xcode](https://developer.apple.com/xcode/)** | Apple 平台開發 | 僅限 macOS；在 Apple 開發之外無關緊要 |

**主要結論：**

- 如果你剛入門，**VS Code** 是安全且支援良好的選擇。
- 如果效能是優先考量，且你能接受較少的擴充功能，**Zed** 是一個引人注目的替代方案。
- 當你需要深度 IDE 功能並在支援的語言中做專業工作時，**JetBrains** 工具是值得的。
- 在你投入 Vim 本身之前，先在你的主要編輯器中透過擴充功能學習 **Vim 鍵盤綁定**。
- **Visual Studio** 和 **Xcode** 是專業工具——只有在其目標平台需要時才使用它們。

選一個，安裝它，然後開始寫程式碼。你之後總是可以切換；你建立的技能大多是可以遷移的。
