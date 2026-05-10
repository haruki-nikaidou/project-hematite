---
title: 開発環境の準備
summary: "Windows（WSL 経由）または macOS（Homebrew 経由）で生産的な開発環境をセットアップする — モダンなシェル、パッケージマネージャー、Git、コードエディターを含む。"
prerequisites: 
  - elementry/computer_science/commonly_used_os
aliases: []
tags: ["Practice"]
updated: 2026-05-09
---

コードを書くのにテキストエディターだけでは足りない。予測どおりに動くターミナル、手間なくインストールできるツール、毎日頼りにできるワークフローが必要だ。このチェックポイントでは、その基盤を一歩ずつ作っていく。そうすることで、今後インストールするすべてのツールと実行するすべてのコマンドが本当に意味を持つようになる。

## 使っている OS は？

このガイドは **Windows** と **macOS** をカバーする。すでに Linux を使っているなら、Unix ライクな環境がネイティブにあるため、[快適なシェルを手に入れる](#getting-a-comfortable-shell) までスキップできる。

### Windows：PowerShell を捨てて WSL を使う

Windows には **コマンドプロンプト**（Command Prompt）と **PowerShell** という二つのビルトインシェルがある。PowerShell は有能だが、開発者エコシステム — オープンソースツール、チュートリアル、Rust のツールチェーン — は圧倒的に Unix ライクな環境を前提としている。PowerShell で動かすためにあらゆるものを適応させるのは常に上り坂の戦いであり、戦う必要のない戦いだ。

**WSL**（**Windows Subsystem for Linux**）は Microsoft の公式解決策だ — 仮想マシンもデュアルブートも不要で、Windows 内部で直接動く本物の Linux 環境だ。WSL をセットアップすると、このガイドの残りで使うものと同じシェル、同じコマンド、同じツールが使える。

**WSL のインストール方法：**

1. **PowerShell** または **コマンドプロンプト** を管理者として開く（アプリを右クリック → *管理者として実行*）。
2. 次のコマンドを実行する：

```/dev/null/wsl-install.ps1
wsl --install
```

3. 求められたらコンピューターを再起動する。
4. 再起動後、**Ubuntu** が設定を完了して Linux のユーザー名とパスワードを作るよう求める。これらは Windows の認証情報とは別だ — 好きなものを選んで覚えておこう。管理コマンドを実行するときに必要になる。

この時点から、スタートメニューで **Ubuntu** を検索してLinux ターミナルを開く。このガイドのすべてのコマンドはそこで実行するためのもので、PowerShell ではない。

> **なぜ Ubuntu？** `wsl --install` はデフォルトで Ubuntu をインストールする。Ubuntu は人気で初心者に優しい Linux ディストリビューションだ。コミュニティが大きく、ドキュメントが充実しており、パッケージのメンテナンスも良い — 始める人には堅実なデフォルトだ。

### macOS：Homebrew をインストールする

macOS は Unix の上に作られているため、ターミナルとシェルはすでに良い状態にある。macOS に欠けているのは汎用**パッケージマネージャー**（package manager）— コマンドラインから開発者ソフトウェアをインストールするためのツールだ。

**Homebrew**（ホームブリュー）がそのギャップを埋める。macOS のプラットフォームで事実上標準のパッケージマネージャーで、大多数の開発者が使っている。

**Homebrew のインストール方法：**

1. **ターミナル**を開く。`アプリケーション → ユーティリティ → ターミナル` にあるか、`Cmd + Space` を押して*ターミナル*と入力して Enter を押す。
2. このコマンドをペーストして Enter を押す：

```/dev/null/brew-install.sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

3. 画面の指示に従う。macOS のパスワードを求められる可能性がある。
4. インストーラーが Homebrew を `PATH` に追加することについてのメッセージを表示したら、その指示にも従う（実行する正確なコマンドが表示される）。

インストールが成功したか確認する：

```/dev/null/brew-verify.sh
brew --version
# 期待する出力：Homebrew 4.x.x
```

バージョン番号が表示されれば、Homebrew は準備完了だ。

## 快適なシェルを手に入れる {#getting-a-comfortable-shell}

**シェル**（shell）は入力したコマンドを読んで実行するプログラムだ。自分とコンピューターの間の通訳者として考えるといい。

ほとんどのシステムのデフォルトは **Bash** だ。信頼性は高いが、**Zsh**（「Z シェル」と読む）の方が日常使いに向いている — スマートなタブ補完、より優れた履歴検索、活発なプラグインエコシステムがある。macOS ではすでに Zsh がデフォルトだ。WSL/Ubuntu では Bash がデフォルトだが、切り替えはたった二つのコマンドでできる。

### Zsh に切り替える（WSL/Ubuntu のみ）

まず Zsh をインストールする：

```/dev/null/install-zsh.sh
sudo apt update && sudo apt install zsh -y
```

次にデフォルトシェルにする：

```/dev/null/chsh-zsh.sh
chsh -s $(which zsh)
```

ターミナルを閉じて再度開く。これで Zsh が動いている。

### oh-my-zsh をインストールする

**oh-my-zsh** は Zsh の設定フレームワークだ。手動で設定すると何時間もかかる何百ものプラグイン、テーマ、使い心地のショートカットをバンドルしている。

次のコマンドでインストールする：

```/dev/null/install-omz.sh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

インストール後、ターミナルを再度開くと、よりクリーンで情報量の多いプロンプトが見える。これで本当に気持ちよく作業できるシェルがセットアップされた。

> シェルは他のどのツールよりも多く使うものだ。正しくセットアップするための10分間は毎日大きなリターンをもたらす。

## パッケージマネージャーを使う

**パッケージマネージャー**（package manager）はソフトウェアを見つけ、ダウンロードして、インストールする仕事を自動化する。ウェブサイトでインストーラーを探す代わりに、コマンドを一つ入力するだけだ。

クイックリファレンス：

| 環境 | パッケージマネージャー | パッケージのインストール |
|-------------|----------------|-------------------|
| WSL（Ubuntu）| `apt` | `sudo apt install <package-name>` |
| macOS | `brew` | `brew install <package-name>` |

**WSL/Ubuntu** では、新しいものをインストールする前にローカルのパッケージリストを更新するのが良い習慣だ：

```/dev/null/apt-install.sh
sudo apt update
sudo apt install <package-name>
```

**macOS** では：

```/dev/null/brew-install-package.sh
brew install <package-name>
```

このシリーズを通じてこれらのコマンドを常に使うことになる。覚える価値がある。

## Git をインストールする

**Git** は世界中の事実上すべてのソフトウェアプロジェクトで使われているバージョン管理システムだ。他の何よりも先にインストールする必要がある。

**WSL/Ubuntu** では：

```/dev/null/install-git-apt.sh
sudo apt install git -y
```

**macOS** では：

```/dev/null/install-git-brew.sh
brew install git
```

インストールされたか確認する：

```/dev/null/git-verify.sh
git --version
# 期待する出力：git version 2.x.x
```

Git を実際に*使う*方法 — コードのコミット、ブランチング、コラボレーション — は [Git 入門](/en/cp/elementry/tooling/git/) で学ぶ。

## コードエディターを選ぶ

**コードエディター**または **IDE** は開発者として最も多くの時間を過ごす場所だ。正しい選択は個人的なもの — エディターは人によって、ワークフローによって向き不向きがある。

[コードエディター/IDE を選ぶ](/en/cp/elementry/tooling/choose_code_editor/) で主要な選択肢を詳しく説明している。今すぐ始めるためのおすすめが欲しければ、**Visual Studio Code**（VS Code）は無料、全プラットフォームで動き、拡張機能を通じて Rust の一流サポートがある。

何を選んでも、今インストールしておこう。次のチェックポイントでコードを書く準備ができるように。

## まとめ

- **Windows**：`wsl --install` で WSL をインストールして、すべての開発作業を Ubuntu ターミナルの中でやる。PowerShell はこの旅に適したツールではない。
- **macOS**：Homebrew をインストールして、開発者ツールをインストールするための適切なパッケージマネージャーを手に入れる。
- **シェル**：Zsh に切り替えて oh-my-zsh をインストールする。より生産的で楽しいコマンドライン体験のために。
- **パッケージマネージャー**：WSL/Ubuntu では `apt`、macOS では `brew` を使ってコマンド一つでパッケージをインストールする。
- **Git**：今すぐパッケージマネージャーでインストールする。使い方は [Git 入門](/en/cp/elementry/tooling/git/) で学ぶ。
- **コードエディター**：使い心地の良いものを一つ選ぶ。詳しくは [コードエディター/IDE を選ぶ](/en/cp/elementry/tooling/choose_code_editor/) を参照。

## 次のステップ

環境が整ったら、その中で操作することを学ぼう。[シェルコマンド入門](/en/cp/elementry/tooling/shell/) では毎日必ず使うコマンド — `ls`、`cd`、`touch` など — を解説する。
