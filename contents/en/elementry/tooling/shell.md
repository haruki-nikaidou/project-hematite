---
title: Introduce to Shell Commands
summary: "A beginner-friendly tour of the essential Zsh commands — navigating directories, creating and deleting files — plus two productivity tricks that will save you thousands of keystrokes."
prerequisites: 
  - elementry/tooling/prepare_environment
aliases: []
tags: ["Introduction"]
updated: 2026-05-09
---

Every tool you'll use as a developer — Git, Rust's compiler, package managers — lives in the terminal. But the terminal is only useful once you know how to actually navigate it. This checkpoint teaches you the commands you'll reach for every single day, plus two small habits that will make you dramatically faster.

## The prompt: where everything starts

When you open your terminal, you see something like this:

```bash
yamada@machine ~ %
```

This is the **prompt** — Zsh's way of saying "I'm ready, what do you want to do?" Everything you type appears after the `%` symbol. Press Enter, and Zsh runs your command.

The `~` you see in the middle is a shorthand for your **home directory** — the folder that belongs to your user account, like `/home/yamada` on Linux or `/Users/yamada` on macOS. You'll see it constantly, and it works as a prefix in paths too: `~/Documents` means your Documents folder, regardless of which machine you're on.

## Where am I? (`pwd`)

Your shell always has a **current working directory** — a folder it treats as its starting point for relative file operations. When you first open the terminal, that starting point is your home directory.

To see exactly where you are, run `pwd` (**p**rint **w**orking **d**irectory):

```bash
pwd
# /home/yamada
```

Think of it as asking "which drawer am I in?" inside a very tall filing cabinet. You'll want to check this whenever you feel disoriented.

## Looking around (`ls`)

`ls` (**l**i**s**t) shows you what's inside the current directory:

```bash
ls
# Desktop  Documents  Downloads  Music  Pictures  projects
```

Add the `-la` flags to see much more detail — file sizes, owners, permissions, and hidden files:

```bash
ls -la
# total 48
# drwxr-xr-x  8 yamada yamada 4096 May  9 10:00 .
# drwxr-xr-x 25 yamada yamada 4096 May  9 09:00 ..
# -rw-r--r--  1 yamada yamada  220 May  9 09:00 .bash_history
# drwxr-xr-x  2 yamada yamada 4096 May  9 09:30 Desktop
# drwxr-xr-x  2 yamada yamada 4096 May  9 09:30 Documents
```

The entries that start with `.` are **hidden files** — configuration files that applications tuck away in your home directory. The single `.` refers to the current directory itself, and `..` refers to its parent (one level up). The `-l` flag enables the long format with details, and `-a` makes hidden files visible; you can combine any flags you like.

## Moving around (`cd`)

`cd` (**c**hange **d**irectory) moves you into a different folder — like opening a drawer in that cabinet.

```bash
cd Documents
pwd
# /home/yamada/Documents
```

To go **up** one level to the parent directory, use the special `..` shorthand:

```bash
cd ..
pwd
# /home/yamada
```

To jump straight back to your home directory from anywhere, type `cd` with no argument at all:

```bash
cd
pwd
# /home/yamada
```

### Absolute vs. relative paths

A **path** is the address of a file or directory. There are two styles:

- An **absolute path** starts from the root of the entire file system (`/`) and is unambiguous no matter where you currently are. Example: `/home/yamada/Documents/notes.txt`
- A **relative path** is interpreted starting from your current directory. Example: `Documents/notes.txt` (only makes sense if you're already in `/home/yamada`)

You can use either style with `cd` — and with almost every other command:

```bash
cd /home/yamada/Documents   # Absolute: works from anywhere
cd Documents                # Relative: only works if you're already in /home/yamada
cd ~/Documents              # ~ is shorthand for your home directory — works from anywhere
```

## Creating directories (`mkdir`)

`mkdir` (**m**a**k**e **dir**ectory) creates a new folder:

```bash
mkdir projects
ls
# Desktop  Documents  Downloads  Music  Pictures  projects
```

To create a folder and all its missing parents in one shot, add the `-p` flag:

```bash
mkdir -p projects/hematite/notes
```

Without `-p`, `mkdir` refuses to create `hematite/notes` if `projects/hematite` doesn't exist yet. With `-p`, it creates every missing piece of the chain. This flag is worth remembering — you'll use it a lot.

## Creating files (`touch`)

`touch` creates an empty file. If the file already exists, it just updates its last-modified timestamp without changing its contents.

```bash
touch hello.txt
ls
# Desktop  Documents  Downloads  Music  Pictures  hello.txt  projects
```

You'll usually use `touch` to quickly stub out a file before opening it in your editor, or to create a placeholder that a build tool expects to find.

## Reading file contents (`cat`)

`cat` (**con**cate**n**ate) prints a file's contents directly in the terminal. It's the quickest way to peek at a file without opening an editor.

```bash
cat hello.txt
# (no output — the file is empty)
```

Let's add something to it first:

```bash
echo "Hello, world!" > hello.txt
cat hello.txt
# Hello, world!
```

`echo` prints text to the terminal. The `>` symbol **redirects** that output into a file instead of printing it on screen. You don't need to master redirects right now — just know that `cat` is your go-to for reading small files quickly.

## Copying files (`cp`)

`cp` (**c**o**p**y) copies a file from one location to another:

```bash
cp hello.txt hello-backup.txt
ls
# Desktop  Documents  ... hello.txt  hello-backup.txt  projects
```

To copy an entire directory — including everything inside it — add the `-r` flag (**r**ecursive):

```bash
cp -r projects projects-backup
```

Without `-r`, `cp` will refuse to copy a directory at all.

## Moving and renaming (`mv`)

`mv` (**m**o**v**e) does two jobs at once: it moves files to a new location, and it renames them. There is no separate rename command in the shell.

Move a file into a directory:

```bash
mv hello.txt projects/
```

Rename a file by "moving" it to a new name in the same directory:

```bash
mv hello-backup.txt goodbye.txt
```

## Deleting files and directories (`rm`)

`rm` (**r**e**m**ove) deletes files. **There is no trash can** — files deleted with `rm` are gone for good.

```bash
rm goodbye.txt
```

To delete an entire directory and everything inside it, use `-rf` (**r**ecursive, **f**orce):

```bash
rm -rf projects-backup
```

> **Be careful with `rm -rf`.** It will silently delete everything you point it at, with no undo. Always double-check the path before pressing Enter.

To delete an empty directory without using `rm`, you can also use `rmdir`. It refuses to delete a directory that still has contents, which makes it a safer option when you know the folder should be empty:

```bash
rmdir some-empty-folder
```

## Two tricks that will save you thousands of keystrokes

You know the core commands now. Before you go and practice them, learn these two habits — they have an outsized payoff for almost zero effort.

### Tab: let Zsh type for you

When you're typing a command or a path, press **Tab** and Zsh will autocomplete it for you.

Suppose you have a directory called `my-long-project-name`. Instead of typing it out, type `my-` and press Tab:

```bash
cd my-<TAB>
# Zsh completes it to: cd my-long-project-name/
```

If there's more than one match, press Tab **twice** to see a list of all possibilities. Zsh will even let you cycle through them with repeated Tab presses or the arrow keys, so you can pick one without typing another character.

Tab completion works for:

- **Commands** — type `git ` then Tab to see all `git` sub-commands
- **File and directory paths** — type a partial name and let Zsh find the rest
- **Flags** — type `ls -` then Tab to see available flags

This smarter, context-aware completion is one of the main reasons this guide has you use Zsh over the default Bash.

### Up arrow: reuse commands from your history

Every command you run is saved in your **shell history**. Press the **↑ (up arrow)** key to scroll back through previous commands one by one, and **↓ (down arrow)** to scroll forward again.

Made a typo in a long command? Press ↑ to bring it back, use the ← → arrows to move to the mistake, fix it, and press Enter. No retyping required.

When you need to find a specific old command, press **Ctrl + R** and start typing any part of it. Zsh will search through your history and show the most recent match:

```bash
# Press Ctrl+R, then type "install"
# Zsh shows something like:
# (reverse-i-search)`install': sudo apt install git -y
```

Press Ctrl + R again to cycle through older matches. Press Enter to run the found command, or press Esc to cancel the search and keep the result in your prompt for editing.

Between Tab and the up arrow, you'll find that most of the typing in your terminal sessions disappears entirely.

## Summary

- **`pwd`** — print your current directory so you know where you are.
- **`ls`** — list files in the current directory. Use `ls -la` to see details and hidden files.
- **`cd <path>`** — move to a directory. `cd ..` goes up one level; `cd` with no argument goes home; `~` always expands to your home directory.
- **`mkdir <name>`** — create a new directory. Use `-p` to create nested directories all at once.
- **`touch <name>`** — create an empty file.
- **`cat <file>`** — print a file's contents directly in the terminal.
- **`cp <src> <dest>`** — copy a file. Use `-r` to copy directories recursively.
- **`mv <src> <dest>`** — move or rename a file or directory.
- **`rm <file>`** — permanently delete a file. Use `-rf` for directories — with care.
- **Tab** — autocomplete any command or path. Press twice to see all matches.
- **↑ / ↓** — cycle through your command history. **Ctrl + R** to search it interactively.

## What's next

With these commands in hand, you're ready to start tracking your work. [Introduce to Git](/en/cp/elementry/tooling/git/) shows you how version control works and how to use Git from the same terminal you've just learned to navigate.
