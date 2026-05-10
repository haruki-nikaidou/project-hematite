---
title: シェルコマンド入門
summary: "Zsh の必須コマンド — ディレクトリの移動、ファイルの作成と削除 — を初心者向けに解説し、何千ものキーストロークを節約できる二つの生産性テクニックも紹介する。"
prerequisites: 
  - elementry/tooling/prepare_environment
aliases: []
tags: ["Introduction"]
updated: 2026-05-09
---

開発者として使うすべてのツール — Git、Rust のコンパイラー、パッケージマネージャー — はターミナルの中に存在する。でもターミナルが役立つのは実際にそこで操作できるようになってからだ。このチェックポイントでは毎日必ず使うコマンドと、ほぼゼロの努力で劇的に速くなる二つの習慣を教える。

## プロンプト：すべてが始まる場所

ターミナルを開くと、こんな感じのものが見える：

```/dev/null/prompt-example.sh
yamada@machine ~ %
```

これが**プロンプト**（prompt）— Zsh の「準備できた、何をしたい？」というメッセージだ。入力するものはすべて `%` の後に現れる。Enter を押すと Zsh がコマンドを実行する。

真ん中の `~` は**ホームディレクトリ**（home directory）の略記 — 自分のユーザーアカウントに属するフォルダで、Linux なら `/home/yamada`、macOS なら `/Users/yamada` のようなものだ。これを頻繁に目にするし、パスのプレフィックスとしても使える：`~/Documents` はどのマシンでも自分の Documents フォルダを意味する。

## 今どこにいる？（`pwd`）

シェルには常に**現在の作業ディレクトリ**（current working directory）がある — 相対的なファイル操作の出発点として扱うフォルダだ。ターミナルを最初に開いたとき、その出発点はホームディレクトリだ。

正確にどこにいるかを知るには `pwd`（**p**rint **w**orking **d**irectory）を実行する：

```/dev/null/pwd-example.sh
pwd
# /home/yamada
```

非常に高い棚の引き出しの中で「今どの引き出しにいる？」と聞くようなものだと思えばいい。迷ったときはいつでもチェックしたくなる。

## 周りを見回す（`ls`）

`ls`（**l**i**s**t）は現在のディレクトリの中を表示する：

```/dev/null/ls-example.sh
ls
# Desktop  Documents  Downloads  Music  Pictures  projects
```

`-la` フラグを追加すると、ファイルサイズ、所有者、パーミッション、隠しファイルなど詳細が表示される：

```/dev/null/ls-la-example.sh
ls -la
# total 48
# drwxr-xr-x  8 yamada yamada 4096 May  9 10:00 .
# drwxr-xr-x 25 yamada yamada 4096 May  9 09:00 ..
# -rw-r--r--  1 yamada yamada  220 May  9 09:00 .bash_history
# drwxr-xr-x  2 yamada yamada 4096 May  9 09:30 Desktop
# drwxr-xr-x  2 yamada yamada 4096 May  9 09:30 Documents
```

`.` で始まるエントリが**隠しファイル**（hidden files）だ — アプリケーションがホームディレクトリに tucked away する設定ファイル。単一の `.` は現在のディレクトリ自体を指し、`..` はその親（一段上）を指す。`-l` フラグは詳細付きのロング形式を有効にして、`-a` は隠しファイルを表示する。好みのフラグを組み合わせられる。

## 移動する（`cd`）

`cd`（**c**hange **d**irectory）は別のフォルダに移動する — キャビネットの別の引き出しを開けるように。

```/dev/null/cd-example.sh
cd Documents
pwd
# /home/yamada/Documents
```

親ディレクトリ（一段上）に**戻る**には、特別な略記 `..` を使う：

```/dev/null/cd-up-example.sh
cd ..
pwd
# /home/yamada
```

どこからでもホームディレクトリに一気に戻るには、引数なしで `cd` を入力するだけだ：

```/dev/null/cd-home-example.sh
cd
pwd
# /home/yamada
```

### 絶対パスと相対パス

**パス**（path）はファイルやディレクトリのアドレスだ。二つのスタイルがある：

- **絶対パス**（absolute path）はファイルシステム全体のルート（`/`）から始まり、今どこにいても明確だ。例：`/home/yamada/Documents/notes.txt`
- **相対パス**（relative path）は現在のディレクトリから解釈される。例：`Documents/notes.txt`（`/home/yamada` にいるときのみ意味を持つ）

どちらのスタイルも `cd` と — ほぼすべての他のコマンドで — 使える：

```/dev/null/path-examples.sh
cd /home/yamada/Documents   # 絶対パス：どこからでも動作する
cd Documents                # 相対パス：すでに /home/yamada にいるときのみ動作する
cd ~/Documents              # ~ はホームディレクトリの略記 — どこからでも動作する
```

## ディレクトリを作る（`mkdir`）

`mkdir`（**m**a**k**e **dir**ectory）は新しいフォルダを作る：

```/dev/null/mkdir-example.sh
mkdir projects
ls
# Desktop  Documents  Downloads  Music  Pictures  projects
```

フォルダとすべての存在しない親を一発で作るには `-p` フラグを追加する：

```/dev/null/mkdir-p-example.sh
mkdir -p projects/hematite/notes
```

`-p` なしでは、`projects/hematite` が存在しない場合 `mkdir` は `hematite/notes` の作成を拒否する。`-p` があれば、チェーンの欠けている部分をすべて作る。このフラグは覚えておく価値がある — よく使う。

## ファイルを作る（`touch`）

`touch` は空のファイルを作る。ファイルがすでに存在する場合は、内容を変えずに最終更新タイムスタンプを更新するだけだ。

```/dev/null/touch-example.sh
touch hello.txt
ls
# Desktop  Documents  Downloads  Music  Pictures  hello.txt  projects
```

`touch` は通常、エディターで開く前にファイルを素早く作ったり、ビルドツールが見つけることを期待するプレースホルダーを作るために使う。

## ファイルの内容を読む（`cat`）

`cat`（**con**cate**n**ate）はファイルの内容をターミナルに直接表示する。エディターを開かずにファイルをサッと確認する最速の方法だ。

```/dev/null/cat-empty-example.sh
cat hello.txt
# （出力なし — ファイルが空）
```

まず何かを追加してみよう：

```/dev/null/echo-redirect-example.sh
echo "Hello, world!" > hello.txt
cat hello.txt
# Hello, world!
```

`echo` はテキストをターミナルに表示する。`>` 記号はその出力を画面に表示する代わりにファイルに**リダイレクト**する。今すぐリダイレクトをマスターする必要はない — `cat` が小さなファイルをすぐ読む定番コマンドだということだけ知っておこう。

## ファイルをコピーする（`cp`）

`cp`（**c**o**p**y）はファイルをある場所から別の場所にコピーする：

```/dev/null/cp-example.sh
cp hello.txt hello-backup.txt
ls
# Desktop  Documents  ... hello.txt  hello-backup.txt  projects
```

ディレクトリ全体 — その中のすべてを含む — をコピーするには `-r` フラグ（**r**ecursive、再帰的）を追加する：

```/dev/null/cp-r-example.sh
cp -r projects projects-backup
```

`-r` なしでは、`cp` はディレクトリのコピーを拒否する。

## 移動とリネーム（`mv`）

`mv`（**m**o**v**e）は二つの仕事を同時にする：ファイルを新しい場所に移動し、リネームする。シェルには別のリネームコマンドはない。

ファイルをディレクトリに移動する：

```/dev/null/mv-into-dir-example.sh
mv hello.txt projects/
```

同じディレクトリ内で新しい名前に「移動」してリネームする：

```/dev/null/mv-rename-example.sh
mv hello-backup.txt goodbye.txt
```

## ファイルとディレクトリを削除する（`rm`）

`rm`（**r**e**m**ove）はファイルを削除する。**ゴミ箱はない** — `rm` で削除したファイルは完全に消える。

```/dev/null/rm-example.sh
rm goodbye.txt
```

ディレクトリ全体とその中のすべてを削除するには `-rf`（**r**ecursive、**f**orce）を使う：

```/dev/null/rm-rf-example.sh
rm -rf projects-backup
```

> **`rm -rf` には注意。** 指定したすべてのものを何の警告もなく削除する。取り消しはできない。Enter を押す前に必ずパスを再確認しよう。

内容のない空のディレクトリを `rm` なしで削除するには `rmdir` も使える。中にまだ内容がある場合は削除を拒否するため、フォルダが空であるべきことがわかっている場合は安全な選択肢だ：

```/dev/null/rmdir-example.sh
rmdir some-empty-folder
```

## 何千ものキーストロークを節約する二つのテクニック

基本的なコマンドを知った。練習する前に、この二つの習慣を身につけよう — ほぼゼロの努力で大きな効果がある。

### Tab：Zsh に入力してもらう

コマンドやパスを入力しているとき、**Tab** を押すと Zsh が自動補完する。

`my-long-project-name` というディレクトリがあるとする。全部入力する代わりに、`my-` と入力して Tab を押す：

```/dev/null/tab-completion-example.sh
cd my-<TAB>
# Zsh が補完：cd my-long-project-name/
```

複数の候補がある場合は、**Tab を二回**押して可能性の一覧を見る。Zsh は Tab を繰り返し押すか矢印キーで候補を循環させるため、一文字も追加タイプせずに選べる。

Tab 補完が機能する場面：

- **コマンド** — `git ` と入力して Tab を押すとすべての `git` サブコマンドが見える
- **ファイルとディレクトリパス** — 部分的な名前を入力して Zsh に残りを見つけてもらう
- **フラグ** — `ls -` と入力して Tab を押すと使えるフラグが見える

このスマートでコンテキストを意識した補完が、このガイドでデフォルトの Bash の代わりに Zsh を使う主な理由の一つだ。

### 上矢印：履歴からコマンドを再利用する

実行したすべてのコマンドが**シェル履歴**（shell history）に保存される。**↑（上矢印）**キーを押すと前のコマンドを一つずつ遡れて、**↓（下矢印）**で前に進む。

長いコマンドにタイプミスがあった場合は ↑ を押して戻し、← → 矢印でミスまで移動して修正して Enter を押す。再入力不要だ。

特定の古いコマンドを見つけるには **Ctrl + R** を押してその一部を入力する。Zsh が履歴を検索して直近の一致を表示する：

```/dev/null/history-search-example.sh
# Ctrl+R を押して "install" と入力
# Zsh は次のようなものを表示：
# (reverse-i-search)`install': sudo apt install git -y
```

古い一致を循環させるには Ctrl + R をもう一度押す。見つかったコマンドを実行するには Enter を押し、検索をキャンセルしてプロンプトに結果を保つには Esc を押す。

Tab と上矢印があれば、ターミナルセッションのほとんどの入力が完全に消えるのがわかる。

## まとめ

- **`pwd`** — 今どこにいるか表示する。
- **`ls`** — 現在のディレクトリのファイルを一覧表示する。詳細と隠しファイルを見るには `ls -la` を使う。
- **`cd <path>`** — ディレクトリに移動する。`cd ..` は一段上へ。引数なしの `cd` はホームへ。`~` は常にホームディレクトリに展開される。
- **`mkdir <name>`** — 新しいディレクトリを作る。入れ子になったディレクトリを一度に作るには `-p` を使う。
- **`touch <name>`** — 空のファイルを作る。
- **`cat <file>`** — ファイルの内容を直接ターミナルに表示する。
- **`cp <src> <dest>`** — ファイルをコピーする。ディレクトリを再帰的にコピーするには `-r` を使う。
- **`mv <src> <dest>`** — ファイルやディレクトリを移動またはリネームする。
- **`rm <file>`** — ファイルを完全に削除する。ディレクトリには `-rf` を使う — 慎重に。
- **Tab** — コマンドやパスを自動補完する。一覧を見るには二回押す。
- **↑ / ↓** — コマンド履歴を遡る。**Ctrl + R** でインタラクティブに検索する。

## 次のステップ

これらのコマンドがあれば、作業を追跡する準備ができている。[Git 入門](/en/cp/elementry/tooling/git/) でバージョン管理の仕組みと、今学んだターミナルから Git を使う方法を学ぼう。
