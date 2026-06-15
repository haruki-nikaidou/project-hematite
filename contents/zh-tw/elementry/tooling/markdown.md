---
title: Markdown 入門
summary: "學習什麼是 Markdown、為什麼它通常比 Microsoft Word 等富文字編輯器更好，以及如何從頭開始撰寫每個主要的 Markdown 語法。"
prerequisites: 
  - elementry/tooling/choose_code_editor
aliases: []
tags: ["介紹"]
updated: 2026-05-11
---

每個開發者最終都必須寫一些東西——文件、README、部落格文章、給隊友的筆記。當你為那個任務開啟 Microsoft Word 時，感覺有什麼不對勁。你點擊工具列按鈕把文字加粗，然後花五分鐘與縮排系統格鬥，最後儲存一個沒有安裝 Word 就沒有人能閱讀的 `.docx` 檔案。有一個更好的方式：**Markdown**。

## Markdown 到底是什麼

**Markdown** 是一種輕量的純文字格式。你在任何文字編輯器中寫普通文字，添加幾個簡單的符號來表示格式，渲染器（renderer）就會把它轉換成漂亮的輸出——網頁、PDF、GitHub 上的 README，或任何你需要的東西。

這裡有一個小小的嘗試：

```markdown
# My first note

This is a **bold** idea and this is *italic*.

- apples
- oranges
```

在表面層次上就是這樣。沒有工具列，沒有滑鼠，沒有藏在壓縮檔裡的隱藏 XML。

Markdown 由 John Gruber 在 2004 年建立，目標很簡單：讓為網路寫作感覺像寫電子郵件一樣自然。它成功了。今天它是 README 檔案、維基、文件網站、靜態部落格和 Slack、Discord 等聊天應用程式的標準格式。

## 為什麼 Markdown 在開發者工作中勝過 Word

Microsoft Word 是一個很棒的工具——用於寫商業信函、論文或書籍。但開發者大部分時間是在寫文件、技術筆記和變更日誌這類東西。對於那種工作，Word 有一些嚴重的缺點。

### 檔案格式問題

`.docx` 檔案不是文字。它是一個 XML 檔案的壓縮封存。這意味著：

- 你不能在終端機用 `cat` 讀它。
- 你不能有意義地用 `diff` 比較兩個版本來看什麼改變了。
- **版本控制（version control）**工具如 Git 追蹤文字行；它們無法理解一個二進位的blob（binary blob）。

`.md` 檔案是純文字。Git 像對待原始程式碼一樣對待它。每個變更在 diff 中清楚顯示，審查者可以留下行級留言，合並也能自然地工作。

### 可攜性問題

要正確開啟 `.docx` 檔案，你需要 Word（或可能呈現方式略有不同的相容應用程式）。Markdown 檔案可以在任何文字編輯器中完美開啟——即使是 `notepad.exe`。渲染後的 Markdown 底層是 HTML，這意味著任何瀏覽器都能顯示它。

### 分心問題

Word 是一個 **WYSIWYG**（What You See Is What You Get，所見即所得）編輯器。當你輸入時，它在螢幕上應用格式。這聽起來很有幫助，但它不斷把你的注意力從文字上拉走。你發現自己在調整字型、修正自動更正和微調間距，而不是在寫作。

Markdown 讓格式*遠離你的視線*。你先寫，渲染器之後再格式化。這種分離有時被稱為 **WYSIWYM**——What You See Is What You *Mean*（所見即所意）。

### Word 仍然勝出的地方

Markdown 在每種情況下都不是更好的。Word 在以下情況仍是正確的工具：
- 具有精確頁邊距的複雜列印版面。
- 含有嵌入式 Excel 圖表等豐富嵌入物件的文件。
- 與非技術審查者進行的追蹤修訂工作流程。
- 必須遵循特定公司或法律範本的官方文件。

對於開發者每天寫的其他一切，Markdown 更輕量、更快速，且對版本控制更友善。

## Markdown 語法，逐一解說

現在讓我們逐一介紹每個重要的 Markdown 語法。下面所有例子都是說明性的程式碼片段。

### 標題

在一行開頭用一個或多個 `#` 字元，後面跟一個空格。`#` 的數量設定標題層級，從 `h1`（最大）到 `h6`（最小）。

```markdown
# Level 1 — the page title
## Level 2 — a main section
### Level 3 — a subsection
#### Level 4
##### Level 5
###### Level 6
```

實際上，你最常用 `##` 和 `###`。把 `#` 留給文件標題，避免跳過層級（直接從 `##` 到 `####`），因為螢幕閱讀器和無障礙工具依賴邏輯的標題層次結構。

### 段落和換行

**段落**只是一行或多行文字，與下一段之間用空行分隔。

```markdown
This is the first paragraph. It can span
multiple lines in the source file — they
will be joined into one paragraph when rendered.

This is the second paragraph. The blank line
above is what separates them.
```

如果你想在段落*內部*強制換行（如詩歌），在按 Enter 之前在行尾加兩個或更多空格。這被刻意設計得難以意外觸發。

### 粗體和斜體

用 `**雙星號**` 包裹文字表示**粗體**，用 `*單星號*` 表示*斜體*。你可以把它們組合起來。

```markdown
This word is **bold**.
This word is *italic*.
This word is ***bold and italic***.
You can also use __underscores__ for bold and _underscores_ for italic.
Asterisks are preferred by convention.
```

在你第一次介紹關鍵術語時使用粗體。把斜體用於細微的強調、標題或外來語詞。避免過度使用——如果什麼都加粗，什麼都不突出。

### 清單

**無序清單**用 `-`、`*` 或 `+` 作為項目符號。**有序清單**用數字後跟一個句號。你可以用兩個或四個空格的縮排來嵌套清單。

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

注意有序清單中的實際數字對渲染器來說不重要。你可以把它們都寫成 `1. 1. 1.`，它仍然會渲染成 `1. 2. 3.`。許多人刻意把它們都寫成 `1.`，這樣重新排列項目時不需要重新編號。

### 連結

**連結**寫作 `[可見文字](URL)`。方括號中的文字是讀者看到的；括號中的 URL 是他們去的地方。

```markdown
Visit [the Rust website](https://www.rust-lang.org).

For relative links inside a site:
[Go to the next chapter](../shell/)

You can also write a bare URL: <https://www.rust-lang.org>
```

### 圖片

**圖片**看起來幾乎與連結相同，但以 `!` 開頭。

```markdown
![A cute ferris the crab](https://rustacean.net/assets/rustacean-orig-noshadow.svg)

![Alt text is important for accessibility](./images/diagram.png)
```

`[]` 中的文字是**替代文字（alt text）**——當圖片無法載入時顯示的描述，也會被螢幕閱讀器大聲朗讀。始終寫有意義的替代文字。

### 行內程式碼和程式碼區塊

用**反引號**包裹短片段作為行內程式碼：`` `let x = 5;` `` 渲染為 `let x = 5;`。在句子中間用於變數名稱、檔案名稱、命令和短表達式。

對於多行程式碼區塊，使用三個反引號的圍欄，並包含語言識別符以進行語法突顯。

````markdown
Here is an inline example: `cargo build`.

Here is a block example:

```rust
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}
```
````

程式碼區塊精確地保留空白，所以你程式碼中的縮排保持不變。

### 區塊引用

在行前加 `>` 建立一個**區塊引用（blockquote）**——對於引用他人的話、突顯提示或顯示警告很有用。

```markdown
> The only way to learn a new programming language is by
> writing programs in it.
> — Dennis Ritchie

> **Tip:** You can nest blockquotes by using `>>`.
```

### 水平線

一行中三個或更多連字號、星號或底線建立一條**水平線**——一個視覺分隔符。

```markdown
Section one content here.

---

Section two content here.
```

### 表格

**表格**用管道字元 `|` 和連字號 `-` 作為標題分隔符繪製。分隔符列中的冒號控制欄位對齊。

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

讓表格保持窄小。如果一個儲存格需要幾個句子的文字，表格可能不是正確的選擇——改用清單或子章節。

### 跳脫特殊字元

如果你需要寫一個字面的 `*` 或 `#` 而不觸發格式化，在它前面加一個反斜線。

```markdown
\*This is not italic.\*
\# This is not a heading.
Use a backslash before: \\ \` \* \_ \{ \} \[ \] \( \) \# \+ \- \. \!
```

## 摘要

- Markdown 是一種純文字格式，使用簡單的符號來表示格式。
- 因為它是純文字，它與 Git 等版本控制工具完美配合——不像 `.docx` 檔案。
- Markdown 具有可攜性：任何文字編輯器都能開啟它，任何瀏覽器都能渲染它。
- Word 仍然是複雜列印版面、追蹤修訂工作流程和官方文件的正確選擇；Markdown 在文件、README、筆記和任何存放在程式碼倉庫中的東西上大放異彩。
- 關鍵語法元素：**標題**（`#`）、**粗體**（`**`）、**斜體**（`*`）、**清單**（`-` / `1.`）、**連結**（`[文字](url)`）、**圖片**（`![替代文字](url)`）、**行內程式碼**（`` ` ``）、**程式碼區塊**（` ``` `）、**區塊引用**（`>`）、**表格**（`|`）和**跳脫**（`\`）。
