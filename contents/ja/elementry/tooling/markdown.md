---
title: Markdown 入門
summary: "Markdown とは何か、Microsoft Word のようなリッチテキストエディターよりも優れている理由、そしてすべての主要な Markdown 構文をゼロから書く方法を学ぶ。"
prerequisites: 
  - elementry/tooling/choose_code_editor
aliases: []
tags: ["Introduction"]
updated: 2026-05-11
---

開発者はいつか何か書く必要に迫られる — ドキュメント、README、ブログ記事、チームへのメモ。そのときに Microsoft Word を開くと、何かがしっくりこない感じがする。ツールバーのボタンをクリックして太字にして、インデントのシステムと格闘して5分無駄にして、Word なしでは誰も読めない `.docx` ファイルを保存してしまう。もっと良い方法がある：**Markdown**（マークダウン）だ。

## Markdown とは実際に何か

**Markdown** は軽量なプレーンテキストのフォーマットだ。任意のテキストエディターで普通のテキストを書いて、フォーマット用のシンプルな記号を少し追加すれば、レンダラーがウェブページ、PDF、GitHub 上の README など、必要なものへと変換してくれる。

ちょっとした味見：

```markdown
# My first note

This is a **bold** idea and this is *italic*.

- apples
- oranges
```

表面的にはこれだけだ。ツールバーも、マウスも、zip ファイルの中に隠れた XML もない。

Markdown は2004年に John Gruber が「ウェブ向けの文章をメールを書くのと同じくらい自然に感じられるようにする」というシンプルな目標で作った。それは成功した。今日では README ファイル、ウィキ、ドキュメントサイト、静的ブログ、Slack や Discord のようなチャットアプリの標準フォーマットだ。

## なぜ開発者の作業で Markdown は Word に勝るか

Microsoft Word は優れたツールだ — ビジネスレター、論文、本を書くには。でも開発者はほとんどの時間をドキュメント、技術的なメモ、変更履歴のようなものを書くことに費やす。そういった作業では Word には深刻な欠点がある。

### ファイル形式の問題

`.docx` ファイルはテキストではない。XML ファイルの圧縮アーカイブだ。つまり：

- ターミナルで `cat` で読めない。
- 二つのバージョンを `diff` して何が変わったか意味のある比較ができない。
- Git のような**バージョン管理**ツールはテキストの行を追跡する。バイナリの塊は理解できない。

`.md` ファイルは純粋なテキストだ。Git はそれをソースコードと同様に扱う。すべての変更が差分に明確に表示され、レビュアーは行コメントを付けられ、マージは自然に機能する。

### 互換性の問題

`.docx` ファイルを正しく開くには Word（または若干異なる表示になるかもしれない互換アプリ）が必要だ。Markdown ファイルは任意のテキストエディターで完璧に開ける — `notepad.exe` でも。レンダリングされた Markdown は内部的に HTML なので、どのブラウザでも表示できる。

### 気の散る問題

Word は **WYSIWYG**（What You See Is What You Get、見たままが得られるもの）エディターだ。入力しながら画面上でフォーマットが適用される。これは助けになりそうだが、常に言葉から注意をそらす。フォントを調整して、オートコレクトを直して、スペースを微調整することに時間を使ってしまい、本来書くべき内容が後回しになる。

Markdown はフォーマットを*邪魔にならない場所*に置く。まず書いて、後でレンダラーがフォーマットする。この分離を **WYSIWYM** — What You See Is What You *Mean*（見えるのは意図したもの）と呼ぶことがある。

### Word がまだ勝つ場面

Markdown がすべての状況で優れているわけではない。Word が適切なツールになるのは：

- 正確なページマージンを持つ複雑な印刷レイアウト。
- 埋め込み Excel グラフのようなリッチな埋め込みオブジェクト。
- 技術的でないレビュアーとの変更追跡のワークフロー。
- 特定の会社や法律のテンプレートに従わなければならない公式文書。

開発者が日常的に書くそれ以外のすべてに対して、Markdown は軽量で、速く、バージョン管理に優しい。

## Markdown の構文を一つひとつ

では重要な Markdown 構文をすべて見ていこう。以下の例はすべて説明のためのスニペットだ。

### 見出し

一行を一つ以上の `#` 文字とスペースで始める。`#` の数が見出しレベルを設定する。`h1`（最大）から `h6`（最小）まで。

```markdown
# Level 1 — the page title
## Level 2 — a main section
### Level 3 — a subsection
#### Level 4
##### Level 5
###### Level 6
```

実際には `##` と `###` を最もよく使う。`#` はドキュメントタイトルのために取っておき、レベルを飛ばすこと（`##` から `####` に直接行く）は避けよう。スクリーンリーダーとアクセシビリティツールは論理的な見出し階層に依存している。

### 段落と改行

**段落**とは、次の段落と空白行で区切られた一行以上のテキストだ。

```markdown
This is the first paragraph. It can span
multiple lines in the source file — they
will be joined into one paragraph when rendered.

This is the second paragraph. The blank line
above is what separates them.
```

段落の*中で*強制改行したい場合（詩のような）、Enter の前に二つ以上のスペースで行を終える。これは意図せずやってしまうのが難しくなっている。

### 太字と斜体

`**二重アスタリスク**` でテキストを**太字**に、`*一重アスタリスク*` で*斜体*にする。組み合わせることもできる。

```markdown
This word is **bold**.
This word is *italic*.
This word is ***bold and italic***.
You can also use __underscores__ for bold and _underscores_ for italic.
Asterisks are preferred by convention.
```

キータームを最初に紹介するときに太字を使おう。斜体は微妙な強調、タイトル、外来語に使う。どちらも使いすぎは避けよう — すべてが太字なら、何も目立たない。

### リスト

**箇条書きリスト**は `-`、`*`、`+` を箇条マーカーとして使う。**番号付きリスト**は数字の後にピリオドを使う。二つまたは四つのスペースでインデントしてリストを入れ子にできる。

```markdown
## Unordered list

- Apples
- Oranges
- Bananas
  - Cavendish
  - Plantain

## Ordered list

1. Install Rust
2. Write your first program
3. Run it

## You can mix them

1. Choose a project
   - backend
   - frontend
2. Set up the repository
```

番号付きリストの実際の番号はレンダラーには関係ないことに注意。`1. 1. 1.` と書いても `1. 2. 3.` とレンダリングされる。並べ替えのたびに番号を振り直さなくて済むよう、意図的にすべて `1.` と書く人も多い。

### リンク

**リンク**は `[表示テキスト](URL)` と書く。角括弧内のテキストが読者に見える部分で、丸括弧内の URL が移動先だ。

```markdown
Visit [the Rust website](https://www.rust-lang.org).

For relative links inside a site:
[Go to the next chapter](../shell/)

You can also write a bare URL: <https://www.rust-lang.org>
```

### 画像

**画像**はリンクとほぼ同じで、`!` で始まる。

```markdown
![A cute ferris the crab](https://rustacean.net/assets/rustacean-orig-noshadow.svg)

![Alt text is important for accessibility](./images/diagram.png)
```

`[]` の中のテキストは**代替テキスト**（alt text）— 画像が読み込めないときに表示され、スクリーンリーダーが読み上げる説明だ。意味のある代替テキストを必ず書こう。

### インラインコードとコードブロック

短いスニペットを**バッククォート**で囲むとインラインコードになる：`` `let x = 5;` `` は `let x = 5;` とレンダリングされる。文の途中にある変数名、ファイル名、コマンド、短い式に使う。

複数行のコードブロックには、三つのバッククォートのフェンスを使って、シンタックスハイライトのための言語識別子を含める。

````markdown
Here is an inline example: `cargo build`.

Here is a block example:

```rust
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}
```
````

コードブロックはホワイトスペースをそのまま保持するため、コード内のインデントが intact に保たれる。

### 引用ブロック

行の前に `>` を付けると**引用ブロック**（blockquote）になる — 誰かを引用したり、ヒントを強調したり、警告を示すのに便利だ。

```markdown
> The only way to learn a new programming language is by
> writing programs in it.
> — Dennis Ritchie

> **Tip:** You can nest blockquotes by using `>>`.
```

### 水平線

三つ以上のハイフン、アスタリスク、またはアンダースコアを一行に書くと**水平線**（horizontal rule）— 視覚的な区切り線 — になる。

```markdown
Section one content here.

---

Section two content here.
```

### テーブル

**テーブル**はパイプ文字 `|` とヘッダー区切りのハイフン `-` で描く。区切り行のコロンが列の配置を制御する。

```markdown
| Language | Year | Creator        |
|----------|------|----------------|
| C        | 1972 | Dennis Ritchie |
| Python   | 1991 | Guido van Rossum |
| Rust     | 2010 | Graydon Hoare  |

| Left | Center | Right |
|:-----|:------:|------:|
| aaa  |  bbb   |   ccc |
```

テーブルは狭くすること。セルに長い散文を入れる必要があるなら、テーブルはおそらく間違った選択だ — リストかサブセクションを使おう。

### 特殊文字のエスケープ

フォーマットをトリガーせずに文字通りの `*` や `#` を書く必要があれば、前にバックスラッシュを置く。

```markdown
\*This is not italic.\*
\# This is not a heading.
Use a backslash before: \\ \` \* \_ \{ \} \[ \] \( \) \# \+ \- \. \!
```

## まとめ

- Markdown はシンプルな記号を使ってフォーマットを表現するプレーンテキストのフォーマットだ。
- プレーンテキストなので `.docx` ファイルと違い、Git のようなバージョン管理ツールと完璧に機能する。
- Markdown は可搬性が高い：どのテキストエディターでも開けて、どのブラウザでもレンダリングできる。
- Word は複雑な印刷レイアウト、変更追跡のワークフロー、公式文書では依然として正しい選択だ。Markdown はドキュメント、README、メモ、コードリポジトリに存在するものすべてに輝く。
- 主要な構文要素：**見出し**（`#`）、**太字**（`**`）、**斜体**（`*`）、**リスト**（`-` / `1.`）、**リンク**（`[text](url)`）、**画像**（`![alt](url)`）、**インラインコード**（`` ` ``）、**コードブロック**（` ``` `）、**引用ブロック**（`>`）、**テーブル**（`|`）、**エスケープ**（`\`）。
