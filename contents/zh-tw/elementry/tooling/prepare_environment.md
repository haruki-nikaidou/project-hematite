---
title: 準備一般開發環境
summary: "在 Windows（透過 WSL）或 macOS（透過 Homebrew）上設定一個高效的開發環境，包括現代 shell、套件管理器、Git 和程式碼編輯器。"
prerequisites: 
  - elementry/computer_science/commonly_used_os
aliases: []
tags: ["實踐"]
updated: 2026-05-09
---

寫程式碼需要的不只是一個文字編輯器。你需要一個可預期運作的終端機、能無驚喜安裝的工具，以及每天都能依賴的工作流程。這個關卡帶你一步一步地建立那個基礎——讓你安裝的每個未來工具和你執行的每個命令都能真正有意義。

## 你用的是哪個 OS？

這個指南涵蓋 **Windows** 和 **macOS**。如果你已經在用 Linux，你原生就有一個類 Unix 環境，可以直接跳到[取得一個舒適的 shell](#getting-a-comfortable-shell)。

### Windows：拋棄 PowerShell，使用 WSL

Windows 附帶兩個內建 shell：**命令提示字元（Command Prompt）**和 **PowerShell**。雖然 PowerShell 有能力，但開發者生態系——開源工具、教程、Rust 自己的工具鏈——幾乎全部假設是類 Unix 環境。讓一切在 PowerShell 上運作是一場持續的逆水行舟之戰，而這場戰你不需要打。

**WSL**（**Windows Subsystem for Linux**，Windows Linux 子系統）是 Microsoft 的官方解決方案：直接在 Windows 內部執行的真實 Linux 環境，不需要虛擬機器，也不需要雙重開機。一旦 WSL 設定好，你就能獲得和本指南其餘部分使用的相同的 shell、相同的命令和相同的工具。

**如何安裝 WSL：**

1. 以管理員身份開啟 **PowerShell** 或**命令提示字元**（右鍵點擊應用程式 → *以系統管理員身分執行*）。
2. 執行以下命令：

```powershell
wsl --install
```

3. 按提示重新啟動電腦。
4. 重新啟動後，**Ubuntu** 將完成設定並要求你建立一個 Linux 使用者名稱和密碼。這些與你的 Windows 憑證是分開的——選任何你喜歡的並記住密碼，因為在執行管理命令時你會需要它。

從這時起，在開始功能表中搜尋 **Ubuntu** 來開啟你的 Linux 終端機。本指南中的所有命令都應在那裡執行，而不是在 PowerShell 中。

> **為什麼選 Ubuntu？** `wsl --install` 預設安裝 Ubuntu，這是一個流行的、對初學者友善的 Linux 發行版。它有龐大的社群、出色的文件和維護良好的套件——對任何剛起步的人來說都是一個穩固的預設選擇。

### macOS：安裝 Homebrew

macOS 建立在 Unix 上，所以你的終端機和 shell 已經準備好了。macOS 缺少的是一個通用的**套件管理器**——一個從命令列安裝開發者軟體的工具。

**Homebrew** 填補了這個空缺。它是 macOS 上的事實標準套件管理器，被平台上絕大多數開發者使用。

**如何安裝 Homebrew：**

1. 開啟**終端機**。你可以在 `應用程式 → 工具程式 → 終端機` 找到它，或按 `Cmd + 空白鍵`，輸入*終端機*，然後按 Enter。
2. 貼上這個命令並按 Enter：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

3. 按照螢幕上的說明操作。你可能會被要求輸入你的 macOS 密碼。
4. 如果安裝程式印出關於把 Homebrew 添加到你的 `PATH` 的訊息，也按照那些說明操作（它會顯示你需要執行的確切命令）。

確認安裝成功：

```bash
brew --version
# 預期輸出：Homebrew 4.x.x
```

如果你看到版本號，Homebrew 就準備好使用了。

## 取得一個舒適的 shell

**Shell** 是讀取你輸入的命令並執行它們的程式。把它想成你和電腦之間的解譯器。

大多數系統預設是 **Bash**。它可靠，但 **Zsh**（發音為「Z shell」）是一個更好的日常使用工具：它有更智慧的 Tab 補全、更好的歷史搜尋和活躍的外掛生態系。在 macOS 上，Zsh 已經是預設的。在 WSL/Ubuntu 上，Bash 是預設的——但切換只需要兩個命令。

### 切換到 Zsh（僅限 WSL/Ubuntu）

首先，安裝 Zsh：

```bash
sudo apt update && sudo apt install zsh -y
```

然後把它設為你的預設 shell：

```bash
chsh -s $(which zsh)
```

關閉並重新開啟你的終端機。你現在在執行 Zsh 了。

### 安裝 oh-my-zsh

**oh-my-zsh** 是 Zsh 的配置框架。它捆綁了數百個外掛、主題和品質提升捷徑，手動配置需要花好幾個小時。

用以下方式安裝：

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

安裝後，重新開啟終端機，你會注意到一個更簡潔、資訊更豐富的提示符。你現在設定好了一個真正讓人愉快使用的 shell。

> 你的 shell 是你使用得比任何其他工具都多的工具。花十分鐘正確設定它，每天都會有回報。

## 使用你的套件管理器

**套件管理器**自動完成查找、下載和安裝軟體的工作。你不用在網站上尋找安裝程式，只需輸入一個命令。

這裡有一個快速參考：

| 環境 | 套件管理器 | 安裝套件 |
|-------------|----------------|-------------------|
| WSL（Ubuntu） | `apt` | `sudo apt install <套件名稱>` |
| macOS | `brew` | `brew install <套件名稱>` |

在 **WSL/Ubuntu** 上，在安裝任何新東西之前更新本地套件清單是好習慣：

```bash
sudo apt update
sudo apt install <套件名稱>
```

在 **macOS** 上：

```bash
brew install <套件名稱>
```

在整個系列中你會一直使用這些命令。值得記住。

## 安裝 Git

**Git** 是世界上幾乎每個軟體專案都使用的版本控制系統。你需要在任何其他東西之前先安裝它。

在 **WSL/Ubuntu** 上：

```bash
sudo apt install git -y
```

在 **macOS** 上：

```bash
brew install git
```

確認它已安裝：

```bash
git --version
# 預期輸出：git version 2.x.x
```

你將在 [Git 入門](/zh-tw/cp/elementry/tooling/git/) 中學習如何實際*使用* Git——提交程式碼、分支、協作。

## 選擇一個程式碼編輯器

你的**程式碼編輯器**或 **IDE** 是你作為開發者大部分時間所在的地方。正確的選擇是個人的——不同的編輯器適合不同的人和工作流程。

[選擇你的程式碼編輯器/IDE](/zh-tw/cp/elementry/tooling/choose_code_editor/) 詳細介紹了主要選項。如果你現在就想要一個建議，**Visual Studio Code**（VS Code）是免費的、在所有平台上執行，且透過擴充功能對 Rust 有一流的支援。

不管你選什麼，現在就安裝它，這樣你就準備好在下一個關卡中寫程式碼了。

## 摘要

- **Windows**：用 `wsl --install` 安裝 WSL，並在 Ubuntu 終端機內進行所有開發工作。PowerShell 不是這段旅程的正確工具。
- **macOS**：安裝 Homebrew，讓你有一個適當的套件管理器來安裝開發者工具。
- **Shell**：切換到 Zsh 並安裝 oh-my-zsh，獲得更有生產力、更愉快的命令列體驗。
- **套件管理器**：在 WSL/Ubuntu 上用 `apt`，在 macOS 上用 `brew`，用一個命令安裝套件。
- **Git**：現在用你的套件管理器安裝它。你將在 [Git 入門](/zh-tw/cp/elementry/tooling/git/) 中學習如何使用它。
- **程式碼編輯器**：選一個你用起來舒服的。參見[選擇你的程式碼編輯器/IDE](/zh-tw/cp/elementry/tooling/choose_code_editor/)獲取指導。

## 接下來

環境準備好後，是時候學習如何在其中操作了。[Shell 命令入門](/zh-tw/cp/elementry/tooling/shell/) 涵蓋了你每天都會用到的基本命令——`ls`、`cd`、`touch` 等等。
