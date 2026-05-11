---
title: How Programs Work
summary: "A beginner-friendly look at what programs actually are, from the apps you tap every day to invisible background services and programs-within-programs."
prerequisites: 
  - elementry/computer_science/commonly_used_os
aliases: []
tags: ["Introduction"]
updated: 2026-05-08
---

## So What Even Is a Program?

In the last article you learned that an operating system manages hardware and runs apps. But what *is* an app, really? What's the OS actually running?

At its core, a **program** is just a list of instructions that a computer follows — one after another, very fast. Think of it like a recipe. A recipe tells a cook: *first do this, then do that, if this condition is met do this other thing.* A program does the same thing, but for a computer.

You've been using programs your whole life without thinking much about them. Spotify is a program. TikTok is a program. Even the calculator on your phone is a program. When you tap an app icon, you're telling the OS: "hey, start following those instructions."

But here's the interesting part — not all programs look and behave the same way. Programs come in very different shapes, and understanding those shapes will help you make a lot more sense of how computers work.

## Type 1: Apps You Can See and Click — GUI Applications

The most familiar kind of program is one you can *see*. It has a window, buttons, text boxes, images — stuff you can look at and interact with using a mouse or touchscreen. These are called **GUI applications**, where GUI (pronounced *"gooey"*) stands for **Graphical User Interface**.

Basically: if it has a visible window, it's a GUI app.

Some examples you almost certainly use:

- **Chrome / Safari / Firefox** — web browsers
- **Spotify / Apple Music** — music players
- **Discord / WhatsApp Desktop** — messaging apps
- **Minecraft / Roblox** — games
- **Microsoft Word / Google Docs** — document editors

When you open a GUI app, the OS loads it up and hands it a chunk of screen space. The app then draws its own interface — the buttons, the menus, the content — into that space. When you click a button, the app receives that click as input and reacts accordingly.

This "input → process → output" loop is happening constantly while a GUI app is open. You click something (input), the app figures out what to do (process), and something changes on screen (output). Even when you're just scrolling, that's input being processed.

### Apps on Your Phone Are GUI Apps Too

Mobile apps are GUI applications as well — they just have a touch-based interface instead of a mouse-based one. Swiping, tapping, pinching to zoom: all of that is input going into the app, which responds by updating what you see on screen.

## Type 2: The Invisible Workers — Background Services

Here's something that might surprise you: not all programs have a visible window. In fact, right now, while you're reading this, your computer is quietly running *dozens* of programs you can't see at all.

These are called **background services** (or just *services*), and they do their jobs silently without showing you any kind of interface. They start when your computer boots up and keep running until it shuts down.

What are they actually doing? All kinds of things:

- **Antivirus software** is quietly scanning every file you open, checking for threats — without you doing anything.
- **Sync services** like iCloud, Google Drive, or OneDrive are watching your folders and uploading changes to the cloud in real time.
- **System update services** are periodically checking whether new software updates are available.
- **Audio services** are constantly managing your speakers and microphone so that any app can use them at any time.
- **Network services** are maintaining your internet connection and handling Wi-Fi in the background.

You'd never know any of this was happening — until it stops working. Ever wondered why your antivirus showed a notification even though you weren't doing anything suspicious? That's a background service noticing something and deciding it needed to tell you.

### How Do You Even Know They're Running?

On Windows, you can open **Task Manager** (Ctrl+Shift+Esc) and click the "Processes" or "Services" tab — you'll see a huge list of things running that you never opened. On macOS, you can open **Activity Monitor** to see the same thing. It's actually a bit wild to look at for the first time.

Background services are one of the reasons why, even on a freshly booted computer, the CPU and memory are already being used a little. The OS itself is a collection of services, and they all start the moment your computer wakes up.

## Type 3: Programs Without Windows — The CLI

You've seen the terminal briefly mentioned when we talked about Linux. It's time to actually explain what it is.

Some programs have *no* graphical interface at all — no buttons, no icons, no windows. Instead, they communicate with you entirely through text. You type a command, hit Enter, and the program responds with text. This is called the **command-line interface**, or **CLI**.

Here's what it looks like in practice. Say you want to see a list of files in a folder. In a GUI, you'd open File Explorer or Finder and look around with your eyes. In the CLI, you'd type something like:

```bash
ls
```

...and the program would print out the file names as plain text, right in the terminal window.

It sounds old-fashioned — and honestly, it kind of is. The CLI has been around since before graphical interfaces existed. But it never went away, because it's *extremely* powerful once you learn it.

### Why Does the CLI Still Exist?

A few reasons:

- **Speed** — for someone who knows what they're doing, typing a command is often faster than clicking through menus.
- **Automation** — you can write a list of commands in a file (called a *script*) and the computer will run them one by one automatically. Imagine telling your computer: "every morning at 8am, download the latest news headlines and save them to a file." You can do that with the CLI.
- **Remote control** — when engineers manage servers (those powerful computers that run websites), they usually can't physically touch the machine. They connect over the internet and control it entirely through the CLI.
- **Precision** — some tasks just don't have a GUI. The CLI lets you do things that no button was ever built for.

You'll find the CLI in every OS:
- **Windows** has **Command Prompt** and **PowerShell**
- **macOS** has **Terminal**
- **Linux** has various terminal apps depending on the distribution

Most regular users never need to touch the CLI. But if you ever go into tech, you'll use it constantly — and it's less scary than it looks.

## Type 4: Programs Inside Programs

Now here's where it gets really interesting.

Some programs don't run directly on top of the OS — instead, they run *inside another program*. A bigger host program creates a kind of mini-environment, and smaller programs live and run within it.

### Websites in a Browser

The most common example of this is the **website**.

When you open a website, your browser (Chrome, Safari, Firefox) downloads a bunch of files from the internet. Some of those files contain a programming language called **JavaScript**. The browser reads those files and *executes* the code — it runs the program for you.

So in a sense, every interactive website is a program running *inside* your browser. The browser is the host, and the website is a guest program living inside it.

This is why websites can do so much nowadays: Google Docs can edit documents, Figma can do design work, games can run in a browser tab. These aren't simple pages of text — they're full programs, just hosted inside the browser rather than installed on your computer.

And it's also why your browser is one of the most resource-heavy apps on your computer. It's not just displaying pages — it's running *dozens* of programs at once, one for each tab.

### Extensions and Plug-ins

Another form of "program inside a program" is the **extension** or **plug-in**.

Browser extensions (like an ad blocker, or a password manager) are small programs that load inside your browser and modify its behavior. They can change how pages look, add buttons to the toolbar, block content, or interact with the sites you visit.

Other apps do this too. Video editors have plug-ins that add new effects. Music production software has plug-ins for synthesizers and audio effects. Minecraft has mods. Google Sheets lets you install add-ons.

In every case, the pattern is the same: a host program creates a defined space where third-party programs can plug in and run.

### Why Not Just Install Everything Directly on the OS?

Running inside a host gives some important benefits:

- **Sandboxing** — the host can control what the guest program is allowed to do. A website running in your browser can't access your files (unless you give it permission), because the browser limits what it's allowed to touch. This is a huge security win.
- **Portability** — a website works the same on Windows, macOS, Linux, and mobile, because the browser handles the differences. The website doesn't need to worry about what OS is underneath.
- **Easy distribution** — you don't need to "install" a website. You just visit a URL.

## Putting It All Together

So when you think about "programs," it's not one single thing. It's a whole family:

| Type | Has a visible window? | Who starts it? | Examples |
|---|---|---|---|
| **GUI Application** | Yes | You | Spotify, Chrome, Minecraft |
| **Background Service** | No | OS (automatically) | Antivirus, sync services, system drivers |
| **CLI Program** | No (text only) | You, via terminal | File tools, automation scripts, server software |
| **Program-in-a-Program** | Depends on the host | The host program | Websites, browser extensions, game mods |

All of these are just instructions the computer follows. They differ in *where* they run, *how* they get input, and *how* they show output — but at the end of the day, every program is doing the same fundamental thing: taking in some information, processing it, and producing some result.

## Summary

- A **program** is a set of instructions the computer follows.
- **GUI applications** are programs with visible windows and interactive interfaces — the apps you open and use directly.
- **Background services** are programs that run silently without any visible window, doing important work behind the scenes.
- The **CLI** is a text-based way to run programs by typing commands — no windows, just text in and text out.
- Some programs run **inside other programs** — websites run inside browsers, extensions run inside apps — often for security and portability reasons.

Next time you open your laptop or phone, you're not just launching one program — you're stepping into a whole ecosystem of programs, each doing their part, most of them totally invisible to you.
