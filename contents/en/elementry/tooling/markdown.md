---
title: Introduce to Markdown
summary: "Learn what Markdown is, why it is often a better choice than rich text editors like Microsoft Word, and how to write every major piece of Markdown syntax from scratch."
prerequisites: 
  - elementry/tooling/choose_code_editor
aliases: []
tags: ["Introduction"]
updated: 2026-05-11
---

Every developer eventually has to write something — documentation, a README, a blog post, notes to teammates. The moment you open Microsoft Word for that task, something feels off. You click a toolbar button to make text bold, then waste five minutes fighting the indentation system, and end up saving a `.docx` file that nobody can read without Word installed. There is a better way: **Markdown**.

## What Markdown actually is

**Markdown** is a lightweight plain-text format. You write ordinary text in any text editor, add a few simple symbols for formatting, and a renderer turns it into nicely styled output — a webpage, a PDF, a README on GitHub, whatever you need.

Here is a small taste:

```markdown
# My first note

This is a **bold** idea and this is *italic*.

- apples
- oranges
```

That is all there is at the surface level. No toolbar, no mouse, no hidden XML hidden inside a zip file.

Markdown was created by John Gruber in 2004 with a simple goal: make writing for the web feel as natural as writing an email. It succeeded. Today it is the standard format for README files, wikis, documentation sites, static blogs, and chat apps like Slack and Discord.

## Why Markdown beats Word for developer work

Microsoft Word is an excellent tool — for writing a business letter, a thesis, or a book. But developers spend most of their time writing things like documentation, technical notes, and changelogs. For that kind of work, Word has some serious disadvantages.

### The file format problem

A `.docx` file is not text. It is a compressed archive of XML files. That means:

- You cannot read it with `cat` in the terminal.
- You cannot meaningfully `diff` two versions to see what changed.
- **Version control** tools like Git track lines of text; they cannot make sense of a binary blob.

A `.md` file is pure text. Git treats it the same as source code. Every change shows up clearly in a diff, reviewers can leave line comments, and merges work naturally.

### The portability problem

To open a `.docx` file correctly, you need Word (or a compatible app that may render it slightly differently). A Markdown file opens perfectly in any text editor — even `notepad.exe`. Rendered Markdown is HTML under the hood, which means any browser can display it.

### The distraction problem

Word is a **WYSIWYG** (What You See Is What You Get) editor. As you type, it applies formatting on screen. This sounds helpful, but it constantly pulls your attention away from the words. You find yourself adjusting fonts, fixing auto-correct, and tweaking spacing instead of writing.

Markdown keeps formatting *out of your way*. You write first, the renderer formats later. This separation is sometimes called **WYSIWYM** — What You See Is What You *Mean*.

### Where Word still wins

Markdown is not better in every situation. Word is the right tool when you need:

- Complex print layouts with precise page margins.
- Rich embedded objects like embedded Excel charts.
- Track-changes workflows with non-technical reviewers.
- Official documents that must follow a specific corporate or legal template.

For everything else that a developer writes day-to-day, Markdown is lighter, faster, and friendlier to version control.

## Markdown syntax, piece by piece

Now let's go through every important piece of Markdown syntax. All examples below are illustrative snippets.

### Headings

Start a line with one or more `#` characters followed by a space. The number of `#` signs sets the heading level, from `h1` (largest) down to `h6` (smallest).

```markdown
# Level 1 — the page title
## Level 2 — a main section
### Level 3 — a subsection
#### Level 4
##### Level 5
###### Level 6
```

In practice, you will use `##` and `###` most often. Reserve `#` for the document title, and avoid skipping levels (going straight from `##` to `####`) because screen readers and accessibility tools rely on a logical heading hierarchy.

### Paragraphs and line breaks

A **paragraph** is just one or more lines of text separated from the next paragraph by a blank line.

```markdown
This is the first paragraph. It can span
multiple lines in the source file — they
will be joined into one paragraph when rendered.

This is the second paragraph. The blank line
above is what separates them.
```

If you want a hard line break *inside* a paragraph (like poetry), end the line with two or more spaces before pressing Enter. This is intentionally hard to do by accident.

### Bold and italic

Wrap text in `**double asterisks**` for **bold**, and `*single asterisks*` for *italic*. You can combine them.

```markdown
This word is **bold**.
This word is *italic*.
This word is ***bold and italic***.
You can also use __underscores__ for bold and _underscores_ for italic.
Asterisks are preferred by convention.
```

Use bold for key terms when you first introduce them. Use italics for subtle emphasis, titles, or foreign phrases. Avoid overusing either — if everything is bold, nothing stands out.

### Lists

An **unordered list** uses `-`, `*`, or `+` as bullet markers. A **numbered list** uses digits followed by a period. You can nest lists by indenting with two or four spaces.

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

Note that the actual numbers in an ordered list do not matter to the renderer. You could write `1. 1. 1.` and it would still render as `1. 2. 3.`. Many people write them all as `1.` on purpose so re-ordering items does not require renumbering.

### Links

A **link** is written as `[visible text](URL)`. The text in square brackets is what the reader sees; the URL in parentheses is where they go.

```markdown
Visit [the Rust website](https://www.rust-lang.org).

For relative links inside a site:
[Go to the next chapter](../shell/)

You can also write a bare URL: <https://www.rust-lang.org>
```

### Images

An **image** looks almost identical to a link, but starts with `!`.

```markdown
![A cute ferris the crab](https://rustacean.net/assets/rustacean-orig-noshadow.svg)

![Alt text is important for accessibility](./images/diagram.png)
```

The text inside `[]` is the **alt text** — a description shown when the image cannot load and read aloud by screen readers. Always write meaningful alt text.

### Inline code and code blocks

Wrap a short snippet in **backticks** for inline code: `` `let x = 5;` `` renders as `let x = 5;`. Use this for variable names, file names, commands, and short expressions in the middle of a sentence.

For a multi-line code block, use a fence of three backticks and include a language identifier for syntax highlighting.

````markdown
Here is an inline example: `cargo build`.

Here is a block example:

```rust
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}
```
````

Code blocks preserve whitespace exactly, so indentation in your code stays intact.

### Blockquotes

Prefix a line with `>` to create a **blockquote** — useful for quoting someone else, highlighting a tip, or showing a warning.

```markdown
> The only way to learn a new programming language is by
> writing programs in it.
> — Dennis Ritchie

> **Tip:** You can nest blockquotes by using `>>`.
```

### Horizontal rules

Three or more hyphens, asterisks, or underscores on their own line create a **horizontal rule** — a visual divider.

```markdown
Section one content here.

---

Section two content here.
```

### Tables

A **table** is drawn with pipe characters `|` and hyphens `-` for the header separator. Colons in the separator row control column alignment.

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

Keep tables narrow. If a cell needs several sentences of prose, a table is probably the wrong choice — use a list or a subsection instead.

### Escaping special characters

If you need to write a literal `*` or `#` without triggering formatting, put a backslash in front of it.

```markdown
\*This is not italic.\*
\# This is not a heading.
Use a backslash before: \\ \` \* \_ \{ \} \[ \] \( \) \# \+ \- \. \!
```

## Summary

- Markdown is a plain-text format that uses simple symbols to express formatting.
- Because it is plain text, it works perfectly with version control tools like Git — unlike `.docx` files.
- Markdown is portable: any text editor can open it, and any browser can render it.
- Word is still the right choice for complex print layouts, track-changes workflows, and official documents; Markdown shines for documentation, READMEs, notes, and anything that lives in a code repository.
- The key syntax elements are: **headings** (`#`), **bold** (`**`), **italic** (`*`), **lists** (`-` / `1.`), **links** (`[text](url)`), **images** (`![alt](url)`), **inline code** (`` ` `` ), **code blocks** (` ``` `), **blockquotes** (`>`), **tables** (`|`), and **escape** (`\`).
