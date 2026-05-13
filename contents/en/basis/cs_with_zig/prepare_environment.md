---
title: Preparing Zig Environment
summary: "Learn why this course uses Zig to teach computer science fundamentals, and set up Zig on your Unix-like system so you are ready to write and run low-level code."
prerequisites: 
  - elementry/tooling/prepare_environment
  - elementry/tooling/package_manager
aliases: []
tags: ["Zig", "Practice", "Tooling"]
updated: 2026-05-11
---

You're here to learn Rust. So why does this section open with a language you've probably never heard of?

Rust is a language that rewards experience. Its ownership model, its notion of lifetimes, its distinction between stack and heap — these ideas are powerful, but they presuppose a solid understanding of how computers manage memory at the hardware level. Jump into Rust without that background, and the rules feel arbitrary and confusing. Build the foundation first, and Rust's design starts to feel almost inevitable.

**Zig** is the tool you'll use to build that foundation. This checkpoint explains why, then gets you set up.

## Why Zig and not Rust directly?

Rust is built for engineers who already know computer science. It doesn't teach you what memory is — it assumes you do, and then gives you powerful tools to manage it safely. That's perfect for its intended audience, but it's the wrong entry point when you're still building the mental model.

This course takes a different approach. You'll learn the fundamentals — integers, memory layout, pointers, strings — through a language that keeps them visible without burying them under abstractions. Zig is that language.

**Zig is a modern alternative to C.** Like C, it gives you direct access to memory, no garbage collector, and almost no hidden machinery. Unlike C, it has a cleaner syntax, structured error handling, and a build system that doesn't require expert knowledge to operate. It makes the machine visible, which is exactly what you need when the goal is to understand it.

The goal is *not* to become a Zig programmer. Think of Zig the way a physics student thinks about a bicycle when studying mechanics: it's a transparent tool that exposes the principles you're trying to learn. Once you've built intuition about memory and data representation through Zig, Rust's ownership model will snap into place.

## Before you start

This guide assumes you have already completed [Preparing General Developing Environment](/en/cp/elementry/tooling/prepare_environment/). That means you should have:

- A Unix-like environment: Linux, macOS, FreeBSD, or WSL if you're on Windows
- A working shell (`bash` or `zsh`) and a package manager (`apt` or `brew`)
- A code editor installed

If you're on Windows and haven't set up WSL yet, go back to that checkpoint first. Everything in this course — shell commands, file paths, build scripts — follows Unix conventions. Trying to run Zig natively in PowerShell will produce friction that is painful to debug and serves no educational purpose.

## Windows: connect your editor to WSL

If you're on Windows, all your Zig work happens inside the WSL terminal. Writing code entirely in a terminal text editor isn't most people's preference, so it's worth spending a few minutes connecting your Windows editor to your WSL filesystem.

Two editors handle this particularly well:

- **VS Code** has the **[WSL extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)**, part of the *Remote Development* extension pack. Once installed, type `code .` from inside your WSL terminal and VS Code on Windows opens that Linux folder transparently. The built-in terminal, language servers, and file operations all run inside Linux — only the graphical window lives on Windows.

- **Zed** supports remote development over SSH. Since WSL can be reached via SSH, you can configure Zed to edit files inside your WSL environment. See the [Zed remote development documentation](https://zed.dev/docs/remote-development) for the specific steps.

With either setup, your code and tools live in Linux while your editor window stays on Windows.

## Installing Zig

[Referance](https://ziglang.org/learn/getting-started/)

### macOS

On macOS, install Zig with Homebrew:

```sh
brew install zig
```

### Linux and WSL

First, check whether your package manager already has Zig:

```sh
# On Ubuntu, Debian, and WSL
sudo apt update && apt-cache show zig
```

> On Fedora, you use `def`. On Arch Linux, you have other ways. Don't type the command blindly.

If the command returns a package description, you can install it directly:

```sh
sudo apt install zig
```

Before accepting, double-check the version `apt` is about to install — it appears in the output as `Version: x.y.z`. Zig is still pre-1.0 and moves fast; a very old version from your distro's repository may not work with the examples in this course. If the version looks recent enough, go ahead. If it's stale, use the manual method below instead.

#### Manual installation via binary download

If your package manager doesn't have Zig, or the version it offers is too old, download a prebuilt binary from the official [Zig download page](https://ziglang.org/download/). Under **Releases**, find the latest stable version and download the archive that matches your system. For a typical 64-bit Linux machine (including WSL), the filename looks like:

```text
zig-linux-x86_64-VERSION.tar.xz
```

Once downloaded, extract the archive and place the `zig` binary on your `PATH`. The commands below assume the file is in your home directory — replace `VERSION` with the actual version number:

```sh
# Extract the archive
tar -xf ~/zig-linux-x86_64-VERSION.tar.xz

# Move the directory to a stable location
sudo mv ~/zig-linux-x86_64-VERSION /usr/local/lib/zig

# Create a symlink so the zig command is available everywhere
sudo ln -s /usr/local/lib/zig/zig /usr/local/bin/zig
```

### Verify the installation

Confirm that Zig is reachable from your shell:

```sh
zig version
# Expected output: something like 0.14.0
```

If you see a version number, you're ready.

## Your first Zig file

Run a small Zig program to confirm everything works end-to-end. Create a file called `hello.zig` and write the following:

```zig
const std = @import("std");

// The entry point of every Zig program
pub fn main() void {
    std.debug.print("Hello from Zig!\n", .{});
}
```

Run it with:

```sh
zig run hello.zig
# Expected output: Hello from Zig!
```

The `zig run` command compiles the file and immediately executes it — no separate build step needed for small programs. If that line appears in your terminal, your environment is fully working.

## Summary

- **Rust assumes you already understand computer science.** Jumping in without a mental model of memory makes its rules feel arbitrary. This part of the course builds that model first.
- **Zig is a modern alternative to C** — low-level, explicit about memory, and designed to keep the underlying machinery visible. That makes it an ideal vehicle for learning computer science fundamentals.
- **The goal is not to learn Zig deeply.** You're using it as a lens. The destination is still Rust.
- **Windows users** should do all their work in WSL, and connect their editor to WSL: use the WSL extension in VS Code, or SSH-based remote development in Zed.
- **macOS users** can install Zig with `brew install zig`. **Linux and WSL users** should download the binary from [ziglang.org/download](https://ziglang.org/download/) and place it on their `PATH`.
- Verify the setup with `zig version`, then confirm end-to-end with `zig run hello.zig`.

## What's next

With Zig installed and running, you're ready to start exploring how computers represent data. The first stop is [Integer](/en/cp/basis/cs_with_zig/integer/) — what an integer actually is in memory, and how Zig's integer types reflect that reality.
