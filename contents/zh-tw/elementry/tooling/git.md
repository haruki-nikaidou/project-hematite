---
title: Git 入門
summary: "適合初學者的 Git 介紹——這個每位開發者都依賴的版本控制系統，用來追蹤變更、與他人協作，並透過分支安全地進行實驗。"
prerequisites: 
  - elementry/tooling/prepare_environment
  - elementry/tooling/shell
  - elementry/tooling/ssh
aliases: []
tags: ["介紹", "Git", "版本控制"]
updated: 2026-05-09
---

每個開發者都有過那種心沉的感覺：你改了某個東西，什麼都不能運作了，而你記不住你做了什麼。**Git** 是確保你再也不會有那種感覺的工具。它保留你對程式碼所做每個變更的完整歷史，讓你能自由地實驗而不用擔心，並讓與其他開發者合作變得容易得多。

## 什麼是 Git？

Git 是一個**版本控制系統（version control system）**——一個隨時間記錄你對一組檔案所做每個變更的軟體。把它想成你整個專案的一個非常詳細的「復原歷史」，一個你可以隨時查看、分享和回滾的歷史。

你會一直看到的幾個術語：

- **倉庫（repository）**（或 **repo**）是 Git 正在追蹤的資料夾，加上其完整的變更歷史。
- **提交（commit）**是你專案在某個特定時刻的儲存快照。
- **遠端（remote）**是倉庫儲存在別處的副本——通常在伺服器上——你和你的團隊共享它。

## 第一次設定 Git

在你第一次提交之前，告訴 Git 你是誰。它把你的姓名和電子郵件地址附加到你建立的每個提交上，讓其他人能看到是誰做了每個變更。

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

執行一次，Git 就會在你的機器上記住它們。`--global` 旗標意味著這個設定適用於你使用的每個倉庫，而不只是某個特定的專案。

## 取得倉庫

### 複製現有的倉庫

最常見的起點是**複製（cloning）**——下載一個現有的倉庫，包括其完整歷史，到你的機器上。

```bash
git clone https://github.com/some-user/some-project.git
```

這會建立一個叫做 `some-project/` 的新資料夾，包含所有專案檔案。你複製的 URL 會自動儲存為一個叫做 `origin` 的**遠端**，讓 Git 之後知道要去哪裡發送和接收變更。

### 從頭開始一個新倉庫

如果你從頭開始一個專案，導航到你的專案資料夾並執行：

```bash
git init
```

Git 會開始追蹤那個資料夾。然後你需要在 GitHub 或 GitLab 等託管平台上建立一個倉庫後，手動添加一個遠端（下面的[Git 提供者](#git-providers-github-and-gitlab)有更多詳細資訊）。

## 向遠端驗證身份

當 Git 與遠端通訊以推送（push）、拉取（pull）或複製私有倉庫時，伺服器需要知道你是誰。有兩種主要的處理方式。

### HTTPS：使用者名稱和令牌

HTTPS URL 看起來像上面 `git clone` 例子中的那個。當你透過 HTTPS 推送或拉取時，Git 會提示輸入使用者名稱和**個人存取令牌（personal access token，PAT）**——一個你在平台設定中產生的長字串。包括 GitHub 和 GitLab 在內的大多數平台多年前已停止直接接受你的帳戶密碼；PAT 是替代方案。

這個方法有效，但很繁瑣。每次推送時輸入或貼上令牌是你會想消除的摩擦。

### SSH：標準方式

**SSH** 是大多數開發者日常使用的方式。它不使用令牌，而是依賴**金鑰對（key pair）**：一個留在你機器上的私鑰和一個你一次性在託管平台上註冊的公鑰。當 Git 連接到遠端時，你的機器使用私鑰自動證明它的身份——不需要輸入任何東西。

產生 SSH 金鑰對並向平台註冊它的步驟在 [SSH 入門](/zh-tw/cp/elementry/tooling/ssh/) 中有說明。完成後，你使用 SSH URL 而不是 HTTPS URL 來複製：

```bash
# HTTPS——有效，但每次推送都提示輸入令牌
git clone https://github.com/some-user/some-project.git

# SSH——一次性金鑰設定後不再有密碼提示
git clone git@github.com:some-user/some-project.git
```

初始設定後，`push` 和 `pull` 就靜靜地工作了。這是你在做嚴肅工作之前想要設定的方式。

## Git 使用的三個區域

理解這三個區域是不對 Git 感到困惑的關鍵。你做的每個變更按順序通過它們：

1. **工作目錄（working tree）**——你在程式碼編輯器中編輯的磁碟上的實際檔案。
2. **暫存區（staging area）**（也叫做*索引*）——你組裝將進入下一個提交的變更的暫存區域。
3. **倉庫（repository）**——所有提交的永久記錄，儲存在隱藏的 `.git` 資料夾中。

你用 `git add` 把變更從工作目錄移到暫存區，然後用 `git commit` 從暫存區移到倉庫。

## 建立提交

### 暫存你的變更

首先，告訴 Git 要在下一個提交中包含哪些變更：

```bash
git add main.rs    # 暫存單一檔案
git add .          # 暫存當前資料夾中所有已變更的檔案
```

暫存讓你能夠深思熟慮：如果你改了三個檔案，但只有其中兩個屬於這個提交，就只暫存那兩個，把第三個留到之後。

### 儲存快照

一旦你對暫存的內容滿意，就建立帶有簡短訊息的提交，描述你做了什麼：

```bash
git commit -m "Add greeting function"
```

好的提交訊息是對變更的簡短、現在式描述：「Fix crash on empty input」、「Add login page」、「Remove unused imports」。清晰的訊息讓之後理解你的專案歷史容易得多。

### 檢查發生了什麼

你在工作時會一直使用的兩個命令：

```bash
git status          # 顯示哪些檔案改變了以及什麼被暫存了
git log --oneline   # 顯示最近提交的緊湊清單
```

典型的 `git log --oneline` 輸出看起來像這樣：

```text
a3f2c1e Add greeting function
b8e0d4a Fix crash on empty input
c12f90b Initial commit
```

每行是一個提交。左邊的短字母數字字串是提交的**雜湊值（hash）**——Git 對那個快照的唯一 ID。右邊的文字是你的訊息。

## 使用遠端

### 推送你的提交

在你本地提交後，用 `git push` 把那些提交發送到遠端：

```bash
git push origin main
```

`origin` 是遠端的名字，`main` 是你正在推送到的**分支（branch）**（分支在下一節說明）。這讓你的工作對任何有訪問倉庫許可權的人可見。

### 拉取變更

當隊友推送提交時，你用 `git pull` 把它們帶入你的本地副本：

```bash
git pull origin main
```

`git pull` 是兩個步驟合二為一：它首先從遠端**取得（fetch）**新提交，然後把它們應用到你的本地分支。

### 取得而不應用

如果你想在應用任何東西之前看看遠端上有什麼改變，使用 `git fetch`：

```bash
git fetch origin
```

這會更新 Git 對遠端狀態的內部認知，而不觸及你的本地檔案。你之後可以檢查到了什麼並決定下一步——當你在做某件事中途，不想讓意外的 `pull` 打斷你的流程時很有用。

## 分支

想像你想添加一個新功能，但不想在實驗時冒著破壞現有程式碼的風險。**分支（branches）**正好解決這個問題：它們是共享共同歷史直到分叉點的獨立開發線。

你的倉庫總是從一個分支開始——通常叫做 `main`。當你建立一個新分支，你得到自己的開發線，你的提交不會影響 `main`，直到你刻意把它們帶回來。

### 建立並切換到一個分支

```bash
git switch -c feature-login   # 一步建立新分支並切換到它
```

或者，如果你喜歡分兩步做：

```bash
git branch feature-login   # 建立分支
git switch feature-login   # 然後切換到它
```

### 列出分支

```bash
git branch
```

旁邊有星號（`*`）的分支是你目前所在的那個。

### 把分支推送到遠端

當你的分支準備好與他人分享時：

```bash
git push origin feature-login
```

## 把分支合在一起

一旦你的功能完成，你需要把那些變更整合回主分支。有兩種常見的方式，大多數專案會一致地使用其中一種。

### 合併（Merge）

**合併（merging）**把一個分支的變更合入另一個分支。切換到你想更新的分支，然後把另一個分支合入：

```bash
git switch main
git merge feature-login
```

Git 建立一個**合併提交（merge commit）**把兩條歷史線連在一起。之後查看提交歷史，你可以清楚地看到兩個分支在哪裡分叉，以及在哪裡重新合并。

### 重定基底（Rebase）

**重定基底（rebasing）**是一種產生更清晰、線性歷史的替代方法。它不是建立合併提交，而是把你的提交重放在目標分支之上，好像你從一開始就在那裡寫的：

```bash
git switch feature-login
git rebase main
```

這樣之後，`feature-login` 的提交會出現在 `main` 最新提交的正後方，中間沒有合並提交。歷史更容易一眼看清，但你失去了分支何時分叉的記錄。

合併和重定基底都不是客觀上更好的——團隊只是選一個慣例並遵循它。當你加入一個專案時，檢查它已經在做什麼並與之保持一致。

## Git 提供者：GitHub 和 GitLab

Git 本身只是一個在你自己電腦上執行的工具。**Git 提供者**是在上面託管遠端倉庫並添加協作功能的網路平台。

### GitHub

**GitHub**（github.com）是開源世界中使用最廣泛的平台。Rust 編譯器、標準函式庫和你在整個課程中會使用的絕大多數公開套件都在 GitHub 上。除了託管程式碼，GitHub 還給你：

- **拉取請求（Pull requests）**——提議變更並讓隊友在合并前審查的方式。
- **議題（Issues）**——一個內建的 bug、功能和討論追蹤器。
- **GitHub Actions**——每當你推送時可以執行你的測試、建置文件或部署你的專案的自動化工作流程。

### GitLab

**GitLab**（gitlab.com）是一個強力的替代方案，對軟體開發生命週期採取全方位的方式。它提供與 GitHub 相同的核心協作功能——合并請求（GitLab 對拉取請求的叫法）、議題和 CI/CD 管道——也可以安裝在你自己的伺服器上執行。這種自託管能力讓它在需要把程式碼保存在自有伺服器而不是第三方服務的公司中很受歡迎。

兩個平台都使用相同的 Git 協定，所以 `clone`、`push`、`pull` 和 `fetch` 的工作方式無論使用哪個都完全相同。差異幾乎完全在網路介面和周邊工具上。

## 摘要

- **Git** 是一個版本控制系統，把你程式碼的每個變更儲存為**倉庫（repository）**中的一系列**提交（commits）**。
- 用 `git config --global user.name` 和 `git config --global user.email` 一次性設定你的身份。
- `git clone <url>` 下載現有倉庫；`git init` 開始一個全新的。
- 變更通過三個區域：**工作目錄（working tree）** → **暫存區（staging area）**（`git add`）→ **倉庫（repository）**（`git commit`）。
- `git status` 顯示什麼改變了以及什麼被暫存了；`git log --oneline` 顯示提交歷史。
- `git push` 把你的提交發送到遠端；`git pull` 一步取得並應用遠端提交。
- `git fetch` 下載遠端變更而不應用它們，讓你可以先檢查。
- 遠端透過 **HTTPS**（個人存取令牌）或 **SSH**（金鑰對）驗證身份。SSH 是標準方式，一次性設定後不需要任何憑證。
- **分支（branches）**讓你在隔離環境中開發功能。用 `git switch -c <名稱>` 建立並切換到一個。
- **合併（merging）**（`git merge`）用合并提交連接分支歷史；**重定基底（rebasing）**（`git rebase`）重放提交以獲得線性歷史。
- **GitHub** 和 **GitLab** 是託管 Git 倉庫和與他人協作最常見的平台。

## 接下來

有了 Git 加上你已經學會的 shell 命令，你有了每個開發者每天工作的基礎。你現在已準備好寫你的第一段真正的程式碼——前往 Basis 系列開始學習 Rust。
