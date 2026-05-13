---
title: Package Managers
summary: "A beginner-friendly introduction to package managers — what they are, why every developer needs one, and how to use the most common ones on Linux, macOS, and within programming language ecosystems."
prerequisites: 
  - elementry/computer_science/commonly_used_os
aliases: []
tags: ["Tooling"]
updated: 2026-05-13
---

Imagine installing an app on your phone. You don't hunt for a download link, run a shady installer, or click through a "Next → Next → Finish" wizard. You just open the App Store or Play Store, tap "Install," and everything happens automatically. **Package managers** do the exact same thing — but for your terminal. They're one of the most important tools in a developer's daily life, and once you've used one, you'll wonder how you ever managed without.

## What is a package manager?

A **package manager** is a tool that installs, updates, and removes software on your behalf. When you ask it for a program, it:

1. looks up the software in a central list called a **registry** (or **repository**),
2. downloads the correct version for your operating system,
3. handles any other software your program depends on, and
4. keeps a record of what's installed so it can update or remove things later.

The word **package** just means a bundle — everything needed to install one particular program or library, wrapped up together with information about what else it requires.

Without a package manager, setting up a tool typically means: find its website, figure out which download is right for your OS, run an installer, click through prompts, and then redo the whole thing every time an update comes out. With a package manager, the same result looks like this:

```sh
brew install git
```

One command. No clicking.

## Two kinds of package managers

You'll use two broadly different kinds throughout your development career:

- **System package managers** install general-purpose software directly on your operating system — things like compilers, command-line tools, databases, and system libraries. They know your OS and put things in the right places system-wide.
- **Language package managers** install libraries for one specific programming language. They don't care about your OS; they manage packages that live inside a language's own ecosystem.

Both kinds work on the same principle — a registry, a download, a local record of what's installed — but they serve different purposes and are almost always separate programs.

## System package managers

Which system package manager you use depends on which [operating system](/en/cp/elementry/computer_science/commonly_used_os/) you're on.

### apt — Ubuntu and Debian

On Ubuntu and Debian (and on WSL if you're on Windows), the system package manager is `apt`. It's good practice to refresh its list of available packages before installing anything:

```sh
sudo apt update           # fetch the latest list of available packages
sudo apt install git      # install a package called "git"
```

The word `sudo` at the start temporarily grants you administrator-level permission for that single command. You'll need it whenever you're modifying system-wide software, because those changes affect every user on the machine.

### Homebrew — macOS

On macOS, the community standard is **Homebrew**, almost always called `brew`. Because Homebrew installs into your own home directory by default, most commands don't need `sudo`:

```sh
brew install git        # install a package
```

Homebrew isn't built into macOS — you install it once, and after that it manages everything else for you. [Preparing Your Development Environment](/en/cp/elementry/tooling/prepare_environment/) covers that one-time setup step.

### pacman — Arch Linux

On Arch Linux (and derivatives like Manjaro), the package manager is `pacman`. Its flag syntax is a bit different from the others: `-S` stands for "sync," which is how you install. It's a strong convention to update all installed packages before adding new ones:

```sh
sudo pacman -Syu          # update everything that's already installed
sudo pacman -S git        # install a package
```

### dnf — Fedora and Red Hat

Fedora and Red Hat–based systems use `dnf`, the modern replacement for the older `yum`:

```sh
sudo dnf install git      # install a package
```

The syntax is intentionally similar to `apt`, so it feels familiar if you've used Ubuntu before.

### Side-by-side comparison

| Operating system | Package manager | Install command |
|-----------------|-----------------|----------------|
| Ubuntu / Debian / WSL | `apt` | `sudo apt install <name>` |
| macOS | `brew` (Homebrew) | `brew install <name>` |
| Arch Linux | `pacman` | `sudo pacman -S <name>` |
| Fedora / Red Hat | `dnf` | `sudo dnf install <name>` |

The syntax differs between systems, but the idea is identical everywhere: one command, and the software is on your machine.

## Language package managers

Once your system is configured, you'll also encounter package managers that live inside programming languages. These let you pull in libraries that other developers have published so you don't have to build everything yourself.

### npm — JavaScript and Node.js

`npm` (**N**ode **P**ackage **M**anager) ships with Node.js and manages JavaScript libraries. A file called `package.json` in your project folder lists all the libraries your project depends on. Running `npm install` downloads them all:

```sh
npm install                   # download everything listed in package.json
npm install some-library      # add a new library to your project
```

### pip — Python

`pip` is Python's standard package manager. It downloads libraries from a registry called **PyPI** (the Python Package Index):

```sh
pip install requests          # install the "requests" library
```

Python projects commonly include a file called `requirements.txt` that lists the libraries the project needs, so anyone can reproduce the exact setup with a single command.

### cargo — Rust

**Cargo** is Rust's built-in package manager and build system, and it's widely regarded as one of the best-designed tools in any language ecosystem. When you create a Rust project, Cargo does everything: compiling your code, running your tests, and managing libraries — called **crates** in Rust — downloaded from a registry called **crates.io**.

```sh
cargo new my-project          # create a new Rust project with a standard layout
cargo build                   # compile the project
cargo run                     # compile and run it immediately
cargo add serde               # add the "serde" crate as a dependency
```

You'll use Cargo constantly as this curriculum progresses. For now, just know it's there and does a lot of heavy lifting for you.

## Common operations

Every package manager supports the same small set of core operations, just with slightly different syntax. Here's a reference table:

| Operation | `apt` | `brew` | `pacman` | `dnf` | `cargo` |
|-----------|-------|--------|----------|-------|---------|
| Install a package | `apt install <name>` | `brew install <name>` | `pacman -S <name>` | `dnf install <name>` | `cargo add <crate>` |
| Update installed packages | `apt upgrade` | `brew upgrade` | `pacman -Syu` | `dnf upgrade` | `cargo update` |
| Remove a package | `apt remove <name>` | `brew uninstall <name>` | `pacman -R <name>` | `dnf remove <name>` | (edit `Cargo.toml`) |
| Search for a package | `apt search <term>` | `brew search <term>` | `pacman -Ss <term>` | `dnf search <term>` | `cargo search <crate>` |

You don't need to memorize every column right now. Use this table as a reference when you need a reminder.

## Summary

- A **package manager** installs, updates, and removes software automatically, saving you from manual downloads and installers.
- A **package** is a bundle of software. A **registry** is the central list of available packages that your package manager queries.
- There are two kinds: **system package managers** install software on your operating system, while **language package managers** install libraries within a specific language's ecosystem.
- **System package managers by OS**: `apt` on Ubuntu/Debian/WSL, `brew` (Homebrew) on macOS, `pacman` on Arch Linux, `dnf` on Fedora.
- **Language package managers**: `npm` for JavaScript, `pip` for Python, and `cargo` for Rust.
- The core operations — install, update, remove, and search — are supported by every package manager; only the exact commands differ.

## What's next

With a clear picture of what package managers are, [Preparing Your Development Environment](/en/cp/elementry/tooling/prepare_environment/) walks you through using one for the first time — setting up your shell, your package manager, and the other tools you'll need before writing any code.
