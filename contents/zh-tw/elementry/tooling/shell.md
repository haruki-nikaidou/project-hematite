---
title: Shell 命令入門
summary: "適合初學者的基本 Zsh 命令導覽——導航目錄、建立和刪除檔案——以及兩個能幫你省下數千次按鍵的生產力技巧。"
prerequisites: 
  - elementry/tooling/prepare_environment
aliases: []
tags: ["介紹"]
updated: 2026-05-09
---

你將使用的每個工具——Git、Rust 的編譯器、套件管理器——都存在於終端機中。但終端機只有在你知道如何操作它之後才有用。這個關卡教你每天都會用到的命令，以及兩個讓你速度大幅提升的小習慣。

## 提示符：一切的起點

當你開啟終端機，你會看到這樣的東西：

```bash
yamada@machine ~ %
```

這是**提示符（prompt）**——Zsh 說「我準備好了，你想做什麼？」的方式。你輸入的所有東西都出現在 `%` 符號後面。按 Enter，Zsh 就執行你的命令。

你在中間看到的 `~` 是你的**主目錄（home directory）**的縮寫——屬於你的使用者帳戶的資料夾，如 Linux 上的 `/home/yamada` 或 macOS 上的 `/Users/yamada`。你會一直看到它，而且它作為路徑的前綴也能工作：`~/Documents` 意味著你的文件資料夾，不管你在哪台機器上。

## 我在哪裡？（`pwd`）

你的 shell 總是有一個**當前工作目錄（current working directory）**——它把它當作相對檔案操作的起點的資料夾。當你第一次開啟終端機時，那個起點是你的主目錄。

要查看你確切在哪裡，執行 `pwd`（**p**rint **w**orking **d**irectory，列印工作目錄）：

```bash
pwd
# /home/yamada
```

把它想成詢問「我在哪個抽屜裡？」在一個非常高的檔案櫃中。每當你感到迷失方向時，你就會想要查看這個。

## 環顧四周（`ls`）

`ls`（**l**i**s**t，列出）顯示當前目錄中有什麼：

```bash
ls
# Desktop  Documents  Downloads  Music  Pictures  projects
```

添加 `-la` 旗標可以看到更多細節——檔案大小、擁有者、權限和隱藏檔案：

```bash
ls -la
# total 48
# drwxr-xr-x  8 yamada yamada 4096 May  9 10:00 .
# drwxr-xr-x 25 yamada yamada 4096 May  9 09:00 ..
# -rw-r--r--  1 yamada yamada  220 May  9 09:00 .bash_history
# drwxr-xr-x  2 yamada yamada 4096 May  9 09:30 Desktop
# drwxr-xr-x  2 yamada yamada 4096 May  9 09:30 Documents
```

以 `.` 開頭的條目是**隱藏檔案**——應用程式在你的主目錄中藏起來的設定檔。單個 `.` 指的是當前目錄本身，`..` 指的是它的上層目錄（上一層）。`-l` 旗標啟用帶有細節的長格式，`-a` 讓隱藏檔案可見；你可以組合任何你喜歡的旗標。

## 移動（`cd`）

`cd`（**c**hange **d**irectory，更改目錄）把你移動到不同的資料夾——就像打開那個檔案櫃中的一個抽屜。

```bash
cd Documents
pwd
# /home/yamada/Documents
```

要**向上**移動一層到上層目錄，使用特殊的 `..` 縮寫：

```bash
cd ..
pwd
# /home/yamada
```

要從任何地方直接跳回你的主目錄，輸入沒有任何參數的 `cd`：

```bash
cd
pwd
# /home/yamada
```

### 絕對路徑與相對路徑

**路徑（path）**是檔案或目錄的地址。有兩種風格：

- **絕對路徑（absolute path）**從整個檔案系統的根（`/`）開始，無論你目前在哪裡都是明確的。例子：`/home/yamada/Documents/notes.txt`
- **相對路徑（relative path）**從你的當前目錄開始解釋。例子：`Documents/notes.txt`（只有在你已經在 `/home/yamada` 時才有意義）

你可以在 `cd` 中使用任一種風格——以及幾乎所有其他命令：

```bash
cd /home/yamada/Documents   # 絕對路徑：從任何地方都有效
cd Documents                # 相對路徑：只有在你已在 /home/yamada 時有效
cd ~/Documents              # ~ 是你主目錄的縮寫——從任何地方都有效
```

## 建立目錄（`mkdir`）

`mkdir`（**m**a**k**e **dir**ectory，建立目錄）建立一個新資料夾：

```bash
mkdir projects
ls
# Desktop  Documents  Downloads  Music  Pictures  projects
```

要一次建立一個資料夾及所有缺少的上層目錄，添加 `-p` 旗標：

```bash
mkdir -p projects/hematite/notes
```

沒有 `-p`，如果 `projects/hematite` 不存在，`mkdir` 會拒絕建立 `hematite/notes`。有了 `-p`，它建立鏈條中所有缺少的部分。這個旗標值得記住——你會一直用到它。

## 建立檔案（`touch`）

`touch` 建立一個空檔案。如果檔案已經存在，它只是更新它的最後修改時間戳，而不改變其內容。

```bash
touch hello.txt
ls
# Desktop  Documents  Downloads  Music  Pictures  hello.txt  projects
```

你通常會用 `touch` 在開啟編輯器之前快速建立一個檔案存根，或建立一個建置工具期望找到的占位符。

## 讀取檔案內容（`cat`）

`cat`（**con**cate**n**ate，串接）直接在終端機中印出一個檔案的內容。這是在不開啟編輯器的情況下快速查看檔案的最快方式。

```bash
cat hello.txt
# （沒有輸出——檔案是空的）
```

讓我們先添加一些東西：

```bash
echo "Hello, world!" > hello.txt
cat hello.txt
# Hello, world!
```

`echo` 把文字印到終端機。`>` 符號把那個輸出**重定向**到一個檔案而不是印到螢幕上。你現在不需要掌握重定向——只需知道 `cat` 是你快速讀取小檔案的首選。

## 複製檔案（`cp`）

`cp`（**c**o**p**y，複製）把一個檔案從一個位置複製到另一個位置：

```bash
cp hello.txt hello-backup.txt
ls
# Desktop  Documents  ... hello.txt  hello-backup.txt  projects
```

要複製整個目錄——包括裡面的所有東西——添加 `-r` 旗標（**r**ecursive，遞迴）：

```bash
cp -r projects projects-backup
```

沒有 `-r`，`cp` 完全拒絕複製一個目錄。

## 移動和重命名（`mv`）

`mv`（**m**o**v**e，移動）同時做兩件事：它把檔案移動到一個新位置，也重命名它們。在 shell 中沒有單獨的重命名命令。

把一個檔案移到一個目錄：

```bash
mv hello.txt projects/
```

透過把檔案「移動」到同一目錄中的新名稱來重命名它：

```bash
mv hello-backup.txt goodbye.txt
```

## 刪除檔案和目錄（`rm`）

`rm`（**r**e**m**ove，移除）刪除檔案。**沒有資源回收筒**——用 `rm` 刪除的檔案永遠消失了。

```bash
rm goodbye.txt
```

要刪除整個目錄及其內部的所有東西，使用 `-rf`（**r**ecursive，**f**orce，遞迴強制）：

```bash
rm -rf projects-backup
```

> **使用 `rm -rf` 要小心。** 它會靜靜地刪除你指向的所有東西，沒有撤銷功能。在按 Enter 之前務必仔細確認路徑。

要刪除空目錄而不使用 `rm`，你也可以使用 `rmdir`。它拒絕刪除仍有內容的目錄，當你知道資料夾應該是空的時，這是一個更安全的選項：

```bash
rmdir some-empty-folder
```

## 兩個幫你省下數千次按鍵的技巧

你現在知道了核心命令。在去練習它們之前，學習這兩個習慣——它們以幾乎為零的努力帶來極大的回報。

### Tab：讓 Zsh 替你輸入

當你在輸入命令或路徑時，按 **Tab** 鍵，Zsh 就會為你自動補全它。

假設你有一個叫做 `my-long-project-name` 的目錄。不用把它全部打出來，只需輸入 `my-` 然後按 Tab：

```bash
cd my-<TAB>
# Zsh 補全為：cd my-long-project-name/
```

如果有超過一個匹配，按 Tab **兩次**查看所有可能性的清單。Zsh 甚至會讓你用重複按 Tab 或方向鍵在它們之間循環，這樣你就可以在不再輸入一個字元的情況下選擇一個。

Tab 補全適用於：

- **命令**——輸入 `git ` 然後按 Tab 查看所有 `git` 子命令
- **檔案和目錄路徑**——輸入部分名稱讓 Zsh 找到其餘部分
- **旗標**——輸入 `ls -` 然後按 Tab 查看可用旗標

這種更智慧的、上下文感知的補全是本指南讓你使用 Zsh 而不是預設 Bash 的主要原因之一。

### 向上箭頭：重用歷史中的命令

你執行的每個命令都儲存在你的 **shell 歷史（shell history）**中。按 **↑（向上箭頭）**鍵，一個接一個地向後滾動之前的命令，按 **↓（向下箭頭）**向前滾動。

在一個長命令中打錯字了？按 ↑ 把它帶回來，用 ← → 箭頭移到錯誤處，修正它，然後按 Enter。不需要重新輸入。

當你需要找一個特定的舊命令時，按 **Ctrl + R** 並開始輸入它的任何一部分。Zsh 會在你的歷史中搜尋並顯示最近的匹配：

```bash
# 按 Ctrl+R，然後輸入「install」
# Zsh 顯示類似這樣的東西：
# (reverse-i-search)`install': sudo apt install git -y
```

再次按 Ctrl + R 可以循環到更舊的匹配。按 Enter 執行找到的命令，或按 Esc 取消搜尋並把結果保留在提示符中以便編輯。

有了 Tab 和向上箭頭，你會發現終端機工作中的大部分輸入都消失了。

## 摘要

- **`pwd`**——列印你的當前目錄，讓你知道你在哪裡。
- **`ls`**——列出當前目錄中的檔案。使用 `ls -la` 查看細節和隱藏檔案。
- **`cd <路徑>`**——移動到一個目錄。`cd ..` 向上一層；沒有參數的 `cd` 回主目錄；`~` 總是展開到你的主目錄。
- **`mkdir <名稱>`**——建立一個新目錄。使用 `-p` 一次建立巢狀目錄。
- **`touch <名稱>`**——建立一個空檔案。
- **`cat <檔案>`**——直接在終端機中印出檔案的內容。
- **`cp <來源> <目標>`**——複製一個檔案。使用 `-r` 遞迴複製目錄。
- **`mv <來源> <目標>`**——移動或重命名一個檔案或目錄。
- **`rm <檔案>`**——永久刪除一個檔案。對目錄使用 `-rf`——要小心。
- **Tab**——自動補全任何命令或路徑。按兩次查看所有匹配。
- **↑ / ↓**——循環瀏覽你的命令歷史。**Ctrl + R** 可以互動式搜尋它。

## 接下來

掌握了這些命令，你準備好開始追蹤你的工作了。[Git 入門](/zh-tw/cp/elementry/tooling/git/) 告訴你版本控制如何運作，以及如何從你剛學會導航的同一個終端機使用 Git。
