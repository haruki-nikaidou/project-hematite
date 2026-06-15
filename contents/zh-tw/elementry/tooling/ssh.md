---
title: SSH 入門
summary: "適合初學者的 SSH 介紹：學習它是什麼、公鑰驗證如何運作，以及如何產生 SSH 金鑰對並向 GitHub、GitLab 或遠端伺服器註冊，從此安全連線而不需要輸入密碼。"
prerequisites: 
  - elementry/tooling/shell
aliases: []
tags: ["介紹", "資安", "網路"]
updated: 2026-05-09
---

每次你向 GitHub 推送程式碼、登入遠端伺服器或自動化部署時，有一項技術正在默默地做繁重的工作：**SSH**。一次性設定好它，對你整個開發者生涯都有回報。

## 什麼是 SSH

**SSH** 代表 *Secure Shell*（安全外殼）。它是一個讓你在遠端機器上開啟命令列工作階段的網路協定，就好像你就坐在它面前一樣——只是連線的每個位元組都是加密的。

在 SSH 出現之前，`telnet` 等工具把所有東西——包括密碼——以明文在網路上傳送。任何監視流量的人都可以讀取它。SSH 用強密碼學取代了那個，讓即使有人攔截你的資料，他們也無法讀取或篡改它。

當你開啟一個 SSH 連線時，兩件事自動發生：

1. 連線是**加密的**，所以在網路上竊聽的人看不到你發送或接收的內容。
2. 雙方**驗證彼此的身份**，所以你不會意外地連線到一個假扮伺服器的冒充者。

## 密碼與 SSH 金鑰

最熟悉的證明你是誰的方式是**密碼**。SSH 確實支援密碼，但它們有真正的缺點：

- 每次連線時你都必須輸入一個。
- 暴露在網際網路上的伺服器受到持續的自動攻擊，每小時嘗試數千個常見密碼。
- 密碼的強度只與選擇它的人一樣強。

一個更好的替代方案是**公鑰驗證（public-key authentication）**。它是 GitHub、GitLab 和大多數專業伺服器使用的標準方法——一次性設定後，完全不需要輸入任何東西。

## SSH 金鑰如何運作

公鑰驗證建立在一對叫做**金鑰對（key pair）**的連結檔案上。

| 檔案 | 角色 | 誰看到它 |
|------|------|-------------|
| **私鑰（private key）** | 證明你的身份 | 只有你。永遠不要分享這個檔案。 |
| **公鑰（public key）** | 讓伺服器認出你 | 可以安全分享。放到每個你想訪問的伺服器上。 |

把它想成一把掛鎖和一把鑰匙。你把掛鎖（公鑰）的副本分發給任何需要為你鎖住東西的人。你自己保管鑰匙（私鑰）。伺服器用你的掛鎖鎖住一個挑戰；只有你的私鑰能打開它。私鑰永遠不會在網路上傳送——這個證明在私鑰不離開你的機器的情況下就能工作。

## 產生你的 SSH 金鑰對

開啟你的終端機並執行：

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

- `-t ed25519` 選擇 **Ed25519** 演算法——這是新金鑰的現代、推薦選擇。
- `-C "your_email@example.com"` 向公鑰添加一個留言，讓你記住哪個金鑰屬於哪個身份。把這裡換成你自己的電子郵件地址。

命令會問你幾件事：

```text
Generating public/private ed25519 key pair.
Enter file in which to save the key (/home/you/.ssh/id_ed25519):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/you/.ssh/id_ed25519
Your public key has been saved in /home/you/.ssh/id_ed25519.pub
```

**檔案位置**——按 Enter 接受預設路徑（`~/.ssh/id_ed25519`）。那是標準位置，無需任何進一步配置就能工作。

**通行短語（passphrase）**——這是一個加密*磁碟上*私鑰的可選密碼。如果有人偷了你的筆電，他們沒有通行短語仍然無法使用你的金鑰。強烈建議設定一個，而且大多數作業系統在你每次工作階段輸入一次後會記住它。

你現在有兩個新檔案：

```bash
~/.ssh/id_ed25519      # 你的私鑰——小心保管它
~/.ssh/id_ed25519.pub  # 你的公鑰——可以安全分享
```

你可以隨時印出你的公鑰：

```bash
cat ~/.ssh/id_ed25519.pub
# 印出一行很長的東西，如：
# ssh-ed25519 AAAA...很多字元... your_email@example.com
```

## 把你的公鑰添加到 GitHub 或 GitLab

一旦你在託管平台上註冊了你的公鑰，你就可以 `clone`、`push` 和 `pull` 而不需要輸入密碼。

1. 印出你的公鑰並把整個輸出複製到剪貼簿：

   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```

2. 在 **GitHub** 上：前往**設定 → SSH 和 GPG 金鑰 → 新增 SSH 金鑰**。  
   在 **GitLab** 上：前往**偏好設定 → SSH 金鑰 → 添加新金鑰**。

3. 把你的公鑰貼到「金鑰」欄位，給它一個可識別的標題（例如「個人筆電」），然後儲存。

就這樣。平台儲存了你的公鑰。當你用 SSH URL 連線時，你的機器使用匹配的私鑰在背景靜靜地證明你的身份。

要確認一切正常：

```bash
ssh -T git@github.com
# 預期回應：
# Hi your-username! You've successfully authenticated, but GitHub does not provide shell access.
```

```bash
ssh -T git@gitlab.com
# 預期回應：
# Welcome to GitLab, @your-username!
```

任一條訊息都確認你的金鑰被正確識別了。

## 把你的公鑰添加到遠端 Linux 伺服器

如果你有一個 Linux 伺服器的密碼訪問權限，並想切換到金鑰驗證，使用 `ssh-copy-id`：

```bash
ssh-copy-id user@hostname
# 把 user 換成你在伺服器上的使用者名稱
# 把 hostname 換成伺服器的 IP 地址或網域名稱
```

這個命令最後一次用你的密碼連線，並把你的公鑰附加到遠端機器的 `~/.ssh/authorized_keys`。之後，SSH 自動使用你的金鑰，密碼提示就消失了。

如果你的系統上沒有 `ssh-copy-id`，你可以手動做同樣的事。首先，在本地印出你的公鑰，然後把它添加到伺服器：

```bash
# 在遠端伺服器上，如果目錄和檔案不存在就建立它們：
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# 把你的公鑰貼到 authorized_keys 的新行上：
echo "ssh-ed25519 AAAA...你的完整公鑰..." >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

`chmod` 命令很重要：如果金鑰檔案的權限太開放，SSH 拒絕使用它們。

## 連線到遠端機器

金鑰就位後，連線只需一個命令：

```bash
ssh user@hostname
# 例如：ssh alice@203.0.113.42
# 或用網域名稱：ssh alice@dev.example.com
```

如果你在產生金鑰時設定了通行短語，SSH 問一次。之後你就有了遠端機器上的 shell。你輸入的所有東西都在那裡執行，而不是在你自己的電腦上。

要結束工作階段，輸入 `exit` 或按 **Ctrl+D**。

## 用設定檔讓連線更容易

每次輸入 `ssh alice@203.0.113.42` 很快就會感到乏味。你可以把連線細節儲存在 `~/.ssh/config` 中，改用一個短暱稱：

```text
Host myserver
    HostName 203.0.113.42
    User alice
    IdentityFile ~/.ssh/id_ed25519
```

現在只需 `ssh myserver` 就夠了。你可以添加任意多個 `Host` 區塊，每個伺服器或服務一個。

## 摘要

- **SSH**（Secure Shell，安全外殼）是一個在遠端機器上開啟加密、已驗證命令列工作階段的協定。
- **公鑰驗證（public-key authentication）**用金鑰對取代密碼：**私鑰**（你獨有，永不分享）和**公鑰**（放在你想訪問的每個伺服器上）。
- 用 `ssh-keygen -t ed25519 -C "your_email@example.com"` 產生金鑰對。接受預設路徑並設定通行短語。
- 你的私鑰在 `~/.ssh/id_ed25519`；你的公鑰在 `~/.ssh/id_ed25519.pub`。
- 透過其 SSH 金鑰設定頁面在 **GitHub** 或 **GitLab** 上註冊你的公鑰。用 `ssh -T git@github.com`（或 `git@gitlab.com`）驗證。
- 用 `ssh-copy-id user@hostname` 把你的公鑰添加到 Linux 伺服器，或手動把它附加到 `~/.ssh/authorized_keys`。
- 用 `ssh user@hostname` 連線到任何伺服器。使用 `~/.ssh/config` 為你經常訪問的機器儲存捷徑。

## 接下來

配置好 SSH，你就準備好無摩擦地與遠端程式碼倉庫互動了。下一個關卡 [Git 入門](/zh-tw/cp/elementry/tooling/git/) 將告訴你 Git 如何使用 SSH 來推送和拉取程式碼，以及你追蹤變更和與他人協作所需的一切。
