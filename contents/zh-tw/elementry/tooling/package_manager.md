---
title: 套件管理器
summary: "適合初學者的套件管理器介紹——它們是什麼、為什麼每個開發者都需要一個，以及如何在 Linux、macOS 和各程式語言生態系中使用最常見的那些。"
prerequisites: 
  - elementry/computer_science/commonly_used_os
aliases: []
tags: ["工具"]
updated: 2026-05-13
---

想像在你的手機上安裝一個應用程式。你不用尋找下載連結，不用執行可疑的安裝程式，也不用一路點「下一步→下一步→完成」的精靈。你只需開啟 App Store 或 Play Store，點擊「安裝」，一切自動完成。**套件管理器（package managers）**做的是完全相同的事——但是在你的終端機中。它們是開發者日常生活中最重要的工具之一，一旦你用過，你就會想知道以前沒有它你是怎麼過的。

## 什麼是套件管理器？

**套件管理器（package manager）**是一個代你安裝、更新和移除軟體的工具。當你向它要求一個程式時，它：

1. 在一個叫做**登錄表（registry）**（或**倉庫（repository）**）的中央清單中查找軟體，
2. 下載適合你作業系統的正確版本，
3. 處理你的程式所依賴的任何其他軟體，並且
4. 保留一份已安裝的記錄，以便之後可以更新或移除。

**套件（package）**這個詞只是指一個捆包——安裝某個特定程式或函式庫所需的一切，加上關於它還需要什麼的資訊，打包在一起。

沒有套件管理器，設定一個工具通常意味著：找到它的網站、弄清楚哪個下載適合你的 OS、執行安裝程式、點擊提示，然後每次出現更新時重做整件事。有了套件管理器，同樣的結果看起來像這樣：

```sh
brew install git
```

一個命令。不需要點擊。

## 兩種套件管理器

在你的開發生涯中，你會使用兩種廣泛不同的套件管理器：

- **系統套件管理器**直接在你的作業系統上安裝通用軟體——編譯器、命令列工具、資料庫、系統函式庫等。它們了解你的 OS，並把東西放在整個系統的正確位置。
- **語言套件管理器**為某一特定程式語言安裝函式庫。它們不關心你的 OS；它們管理住在語言自己生態系中的套件。

兩種都遵循相同的原理——登錄表、下載、已安裝的本地記錄——但它們服務於不同的目的，幾乎總是不同的程式。

## 系統套件管理器

你使用哪種系統套件管理器取決於你在哪個[作業系統](/zh-tw/cp/elementry/computer_science/commonly_used_os/)上。

### apt——Ubuntu 和 Debian

在 Ubuntu 和 Debian（以及如果你在 Windows 上使用 WSL 的情況）上，系統套件管理器是 `apt`。在安裝任何東西之前，最好先刷新它的可用套件清單：

```sh
sudo apt update           # 取得最新的可用套件清單
sudo apt install git      # 安裝一個叫做「git」的套件
```

開頭的 `sudo` 暫時為那一個命令授予你管理員級別的權限。每當你在修改全系統的軟體時就需要它，因為那些變更會影響機器上的每個使用者。

### Homebrew——macOS

在 macOS 上，社群標準是 **Homebrew**，通常簡稱 `brew`。因為 Homebrew 預設安裝到你自己的主目錄，大多數命令不需要 `sudo`：

```sh
brew install git        # 安裝一個套件
```

Homebrew 不是 macOS 內建的——你安裝一次，之後它為你管理其他一切。[準備你的開發環境](/zh-tw/cp/elementry/tooling/prepare_environment/)涵蓋了那個一次性的設定步驟。

### pacman——Arch Linux

在 Arch Linux（以及 Manjaro 等衍生版）上，套件管理器是 `pacman`。它的旗標語法與其他的有點不同：`-S` 代表「同步（sync）」，這就是你安裝的方式。在添加新東西之前，先更新所有已安裝的套件是一個強烈的慣例：

```sh
sudo pacman -Syu          # 更新所有已安裝的套件
sudo pacman -S git        # 安裝一個套件
```

### dnf——Fedora 和 Red Hat

Fedora 和 Red Hat 系統使用 `dnf`，這是較舊的 `yum` 的現代替代品：

```sh
sudo dnf install git      # 安裝一個套件
```

語法刻意與 `apt` 類似，所以如果你以前用過 Ubuntu，感覺會很熟悉。

### 並排比較

| 作業系統 | 套件管理器 | 安裝命令 |
|-----------------|-----------------|----------------|
| Ubuntu / Debian / WSL | `apt` | `sudo apt install <名稱>` |
| macOS | `brew`（Homebrew） | `brew install <名稱>` |
| Arch Linux | `pacman` | `sudo pacman -S <名稱>` |
| Fedora / Red Hat | `dnf` | `sudo dnf install <名稱>` |

不同系統的語法不同，但概念到處都一樣：一個命令，軟體就在你的機器上。

## 語言套件管理器

一旦你的系統配置好，你還會遇到住在程式語言內部的套件管理器。這些讓你能引入其他開發者發布的函式庫，讓你不必自己從頭建立一切。

### npm——JavaScript 和 Node.js

`npm`（**N**ode **P**ackage **M**anager，Node 套件管理器）隨 Node.js 一起提供，並管理 JavaScript 函式庫。你專案資料夾中一個叫做 `package.json` 的檔案列出你的專案依賴的所有函式庫。執行 `npm install` 會下載它們全部：

```sh
npm install                   # 下載 package.json 中列出的所有東西
npm install some-library      # 向你的專案添加一個新函式庫
```

### pip——Python

`pip` 是 Python 的標準套件管理器。它從一個叫做 **PyPI**（Python Package Index，Python 套件索引）的登錄表下載函式庫：

```sh
pip install requests          # 安裝「requests」函式庫
```

Python 專案通常包含一個叫做 `requirements.txt` 的檔案，列出專案需要的函式庫，讓任何人都能用一個命令重現確切的設定。

### cargo——Rust

**Cargo** 是 Rust 的內建套件管理器和建置系統，被廣泛認為是任何語言生態系中設計最好的工具之一。當你建立一個 Rust 專案，Cargo 做所有的事：編譯你的程式碼、執行你的測試，以及管理函式庫——在 Rust 中叫做**套件箱（crates）**——從叫做 **crates.io** 的登錄表下載。

```sh
cargo new my-project          # 用標準版面建立一個新的 Rust 專案
cargo build                   # 編譯專案
cargo run                     # 立即編譯並執行
cargo add serde               # 添加「serde」套件箱作為依賴
```

隨著本課程推進，你會不斷地使用 Cargo。現在只需知道它在那裡，為你做了很多繁重的工作。

## 常見操作

每個套件管理器都支援同一小組核心操作，只是語法略有不同。這裡有一個參考表：

| 操作 | `apt` | `brew` | `pacman` | `dnf` | `cargo` |
|-----------|-------|--------|----------|-------|---------|
| 安裝套件 | `apt install <名稱>` | `brew install <名稱>` | `pacman -S <名稱>` | `dnf install <名稱>` | `cargo add <套件箱>` |
| 更新已安裝套件 | `apt upgrade` | `brew upgrade` | `pacman -Syu` | `dnf upgrade` | `cargo update` |
| 移除套件 | `apt remove <名稱>` | `brew uninstall <名稱>` | `pacman -R <名稱>` | `dnf remove <名稱>` | （編輯 `Cargo.toml`） |
| 搜尋套件 | `apt search <詞>` | `brew search <詞>` | `pacman -Ss <詞>` | `dnf search <詞>` | `cargo search <套件箱>` |

你現在不需要記住每一欄。在需要提醒時用這個表格作參考。

## 摘要

- **套件管理器（package manager）**自動安裝、更新和移除軟體，讓你不必手動下載和安裝。
- **套件（package）**是一個軟體捆包。**登錄表（registry）**是你的套件管理器查詢的可用套件中央清單。
- 有兩種：**系統套件管理器**在你的作業系統上安裝軟體，而**語言套件管理器**在特定語言的生態系中安裝函式庫。
- **各 OS 的系統套件管理器**：Ubuntu/Debian/WSL 用 `apt`，macOS 用 `brew`（Homebrew），Arch Linux 用 `pacman`，Fedora 用 `dnf`。
- **語言套件管理器**：JavaScript 用 `npm`，Python 用 `pip`，Rust 用 `cargo`。
- 核心操作——安裝、更新、移除和搜尋——每個套件管理器都支援；只是確切的命令不同。

## 接下來

對套件管理器是什麼有了清楚的認識後，[準備你的開發環境](/zh-tw/cp/elementry/tooling/prepare_environment/)將帶你第一次使用一個——設定你的 shell、你的套件管理器，以及你在寫任何程式碼之前需要的其他工具。
