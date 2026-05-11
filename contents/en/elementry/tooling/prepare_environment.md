---
title: Preparing General Developing Environment
summary: "Set up a productive development environment on Windows (via WSL) or macOS (via Homebrew), including a modern shell, a package manager, Git, and a code editor."
prerequisites: 
  - elementry/computer_science/commonly_used_os
aliases: []
tags: ["Practice"]
updated: 2026-05-09
---

Writing code requires more than just a text editor. You need a terminal that works predictably, tools that install without drama, and a workflow you can rely on every day. This checkpoint walks you through building that foundation — one step at a time — so that every future tool you install and every command you run actually makes sense.

## Which OS are you on?

This guide covers **Windows** and **macOS**. If you're already on Linux, you have a Unix-like environment natively and can skip ahead to [Getting a comfortable shell](#getting-a-comfortable-shell).

### Windows: ditch PowerShell, use WSL

Windows comes with two built-in shells: **Command Prompt** and **PowerShell**. While PowerShell is capable, the developer ecosystem — open-source tools, tutorials, Rust's own toolchain — overwhelmingly assumes a Unix-like environment. Adapting everything to work on PowerShell is a constant uphill battle, and it's one you don't need to fight.

**WSL** (**Windows Subsystem for Linux**) is Microsoft's official solution: a real Linux environment running directly inside Windows, with no virtual machine and no dual-boot required. Once WSL is set up, you get the same shell, the same commands, and the same tools that the rest of this guide uses.

**How to install WSL:**

1. Open **PowerShell** or **Command Prompt** as Administrator (right-click the app → *Run as administrator*).
2. Run the following command:

```powershell
wsl --install
```

3. Restart your computer when prompted.
4. After restart, **Ubuntu** will finish setting up and ask you to create a Linux username and password. These are separate from your Windows credentials — pick anything you like and remember the password, since you'll need it when running administrative commands.

From this point on, open your Linux terminal by searching for **Ubuntu** in the Start menu. All commands in this guide are meant to be run there, not in PowerShell.

> **Why Ubuntu?** `wsl --install` defaults to Ubuntu, a popular, beginner-friendly Linux distribution. It has a massive community, excellent documentation, and well-maintained packages — a solid default for anyone starting out.

### macOS: install Homebrew

macOS is built on Unix, so your terminal and shell are already in good shape. What macOS is missing is a general-purpose **package manager** — a tool for installing developer software from the command line.

**Homebrew** fills that gap. It's the de-facto standard package manager for macOS, used by the vast majority of developers on the platform.

**How to install Homebrew:**

1. Open **Terminal**. You can find it at `Applications → Utilities → Terminal`, or press `Cmd + Space`, type *Terminal*, and press Enter.
2. Paste this command and press Enter:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

3. Follow the on-screen instructions. You'll likely be asked for your macOS password.
4. If the installer prints a message about adding Homebrew to your `PATH`, follow those instructions too (it will show you the exact commands to run).

Verify the installation worked:

```bash
brew --version
# Expected output: Homebrew 4.x.x
```

If you see a version number, Homebrew is ready to use.

## Getting a comfortable shell

A **shell** is the program that reads the commands you type and executes them. Think of it as the interpreter between you and your computer.

Most systems default to **Bash**. It's reliable, but **Zsh** (pronounced "Z shell") is a better daily driver: it has smarter tab-completion, better history search, and a lively plugin ecosystem. On macOS, Zsh is already the default. On WSL/Ubuntu, Bash is the default — but switching takes only two commands.

### Switch to Zsh (WSL/Ubuntu only)

First, install Zsh:

```bash
sudo apt update && sudo apt install zsh -y
```

Then make it your default shell:

```bash
chsh -s $(which zsh)
```

Close and reopen your terminal. You're now running Zsh.

### Install oh-my-zsh

**oh-my-zsh** is a configuration framework for Zsh. It bundles hundreds of plugins, themes, and quality-of-life shortcuts that would take hours to configure by hand.

Install it with:

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

After installation, reopen your terminal and you'll notice a cleaner, more informative prompt. You're now set up with a shell that's genuinely pleasant to work in.

> Your shell is the tool you'll use more than any other. Ten minutes spent setting it up properly will pay dividends every single day.

## Using your package manager

A **package manager** automates the job of finding, downloading, and installing software. Instead of hunting for an installer on a website, you just type one command.

Here's a quick reference:

| Environment | Package manager | Install a package |
|-------------|----------------|-------------------|
| WSL (Ubuntu) | `apt` | `sudo apt install <package-name>` |
| macOS | `brew` | `brew install <package-name>` |

On **WSL/Ubuntu**, it's good practice to update your local package list before installing anything new:

```bash
sudo apt update
sudo apt install <package-name>
```

On **macOS**:

```bash
brew install <package-name>
```

You'll be using these commands constantly throughout this series. They're worth memorising.

## Installing Git

**Git** is the version control system used by virtually every software project in the world. You'll need it installed before anything else.

On **WSL/Ubuntu**:

```bash
sudo apt install git -y
```

On **macOS**:

```bash
brew install git
```

Confirm it's installed:

```bash
git --version
# Expected output: git version 2.x.x
```

You'll learn how to actually *use* Git — committing code, branching, collaborating — in [Introduce to Git](/en/cp/elementry/tooling/git/).

## Choosing a code editor

Your **code editor** or **IDE** is where you'll spend most of your time as a developer. The right choice is personal — different editors suit different people and workflows.

[Choose Your Code Editor/IDE](/en/cp/elementry/tooling/choose_code_editor/) covers the main options in detail. If you want a recommendation to get started right now, **Visual Studio Code** (VS Code) is free, runs on all platforms, and has first-class support for Rust through extensions.

Whatever you choose, install it now so you're ready to write code in the next checkpoint.

## Summary

- **Windows**: install WSL with `wsl --install` and do all your development work inside the Ubuntu terminal. PowerShell is not the right tool for this journey.
- **macOS**: install Homebrew so you have a proper package manager for installing developer tools.
- **Shell**: switch to Zsh and install oh-my-zsh for a more productive, enjoyable command-line experience.
- **Package manager**: use `apt` on WSL/Ubuntu and `brew` on macOS to install packages with a single command.
- **Git**: install it now with your package manager. You'll learn to use it in [Introduce to Git](/en/cp/elementry/tooling/git/).
- **Code editor**: pick one you're comfortable with. See [Choose Your Code Editor/IDE](/en/cp/elementry/tooling/choose_code_editor/) for guidance.

## What's next

With your environment ready, it's time to learn your way around it. [Introduce to Shell Commands](/en/cp/elementry/tooling/shell/) covers the essential commands — `ls`, `cd`, `touch`, and more — that you'll reach for every single day.
