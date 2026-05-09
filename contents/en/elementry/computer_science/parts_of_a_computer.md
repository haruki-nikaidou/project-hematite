---
title: Parts of a Computer
summary: "A beginner-friendly tour of the core hardware inside every computer — CPU, memory, storage, and I/O devices — and what role each one plays, whether you're using a tower PC, a laptop, or a tablet."
prerequisites: []
aliases: []
tags: ["Introduction"]
updated: 2026-05-09
---

## Why does any of this matter?

You use a computer every day, but what's actually happening inside it? Whether you're on a Windows laptop, a MacBook, or a Microsoft Surface tablet, every computer is built from the same handful of core components. Once you know what those parts are — and what each one actually *does* — you'll stop thinking of a computer as a mysterious black box and start seeing it as a machine you can reason about.

That mental model is the foundation for everything else in computer science. Let's build it.

## The CPU — the brain that does the work

The **CPU** (Central Processing Unit) is the component that actually runs your programs. Every calculation, every decision, every animation on screen — all of it is the CPU executing instructions, one after another, billions of times per second.

Think of the CPU as a very fast worker at a desk. It picks up a task, does the math or comparison required, puts the result down, and immediately picks up the next task. It does this so fast that it *feels* like everything is happening simultaneously, even though it's really just blazing through tasks one at a time (or a few at a time — more on that in a moment).

In a desktop tower PC, the CPU is a flat, square chip roughly the size of a playing card, usually hidden under a large fan or a water-cooling block. In a laptop, it's a similar chip, just engineered to use less power and produce less heat. In a Surface tablet, the CPU is even more compact — sometimes the CPU, graphics, and other chips are packed into a single small package called a **SoC** (System on a Chip) to keep the device thin and light.

The chip looks different. The package looks different. But the job is identical.

### Cores and clock speed

You've probably seen specs like "3.2 GHz, 10-core processor." Here's what those mean:

- **Clock speed** — measured in **gigahertz (GHz)**, this is roughly how many basic operations the CPU can complete per second. At 3.2 GHz, it's doing about 3.2 *billion* basic operations every second.
- **Cores** — a modern CPU contains multiple independent processing units called **cores**. An 8-core CPU is like having eight workers at eight desks, each able to handle a different task at the same time. That's why you can play music, have a browser open, and download a file all at once without everything grinding to a halt.

For now, the key takeaway is simple: **the CPU is what executes your code**. Every other part of the machine exists to support it.

## RAM — the CPU's fast, temporary workspace

The CPU can only work on data that it can reach *instantly*. Your storage drive (more on that next) is too slow — reading from it would make the CPU wait millions of times longer than if the data were closer. So computers use a second type of memory, much faster and much closer to the CPU, called **RAM** (Random Access Memory).

When you open an app, the operating system loads its code and data from storage into RAM. The CPU then reads from and writes to RAM at extremely high speed as it runs the program.

A helpful analogy: RAM is like the surface of a workbench. Everything you're actively working on is spread out there — it's fast to reach, easy to rearrange, and right in front of you. Storage is the filing cabinet across the room. You go to the filing cabinet to fetch a document, bring it to the workbench, and work on it there.

There's a crucial catch: **RAM is volatile**. When the power goes off — when you shut down your laptop or the Surface's battery dies — everything in RAM disappears instantly. This is why your apps close when you restart, and why "unsaved changes" are really "changes that haven't been written to storage yet."

A typical laptop today ships with 16-32 GB of RAM. A tablet often has 8 GB or 16 GB, and on many thin devices it's **soldered directly onto the circuit board** — you can't swap it out the way you could on an older desktop. The physical arrangement is different, but the role is the same: fast, temporary workspace for whatever is currently running.

## Storage — where your files live permanently

Storage is the filing cabinet in that analogy above. It holds everything that needs to survive a power-off: your operating system, installed apps, photos, videos, documents, music, game saves — all of it.

Unlike RAM, **storage is non-volatile**: its contents remain intact when power is removed. When you save a document and close your laptop, the file is on the storage drive. When you open the laptop a week later, it's still there.

There are two main types of storage you'll encounter:

- **HDD** (Hard Disk Drive) — stores data on spinning magnetic platters, read by a tiny arm that moves back and forth. HDDs are inexpensive for large capacities but are relatively slow and can be damaged by drops or vibration (those platters are spinning at thousands of RPM). You'll find them mostly in older desktops and budget desktop computers.
- **SSD** (Solid-State Drive) — stores data on flash memory chips with no moving parts at all. SSDs are dramatically faster than HDDs, silent, and far more durable. Every modern laptop, Surface tablet, and most desktops now use SSDs. Your Surface almost certainly has an SSD soldered directly onto its board.

The difference in speed is enormous: loading an operating system from an HDD might take 30–60 seconds; the same task from an SSD often takes under 15. When an app launches almost instantly on a modern computer, the SSD deserves most of the credit.

## Input and output devices

The CPU, RAM, and storage are all tucked inside the machine, invisible to you. To actually *use* a computer, you need ways to communicate with it. These are called **I/O devices** — **input** devices send information *into* the computer, and **output** devices deliver information *out* of it.

Common **input devices**:
- Keyboard
- Mouse or trackpad
- **Touchscreen** — the primary input method on a tablet or smartphone; the screen literally becomes the keyboard and the mouse simultaneously
- Microphone
- Camera or webcam
- Fingerprint reader or Face ID sensor

Common **output devices**:
- Display (your screen)
- Speakers
- Printer

Many devices are both input *and* output. A touchscreen displays visuals (output) and detects your touches (input). A USB or Thunderbolt port can transfer data in both directions. A pair of headphones with a built-in microphone does both at once.

Notice how none of this is unique to a desktop tower. Your laptop has a keyboard, trackpad, screen, speakers, and camera all built into one slab. A tablet consolidates them even further: the screen *is* the touchscreen, the Type Cover *is* the keyboard, the back camera *is* the webcam. The form factor keeps shrinking, but the categories — input and output — never change.

## How everything connects

These components don't float around independently — they all need to communicate with each other. They connect through a **motherboard** (also called a logic board or system board): the large circuit board that everything plugs into or is soldered onto.

The motherboard provides the electrical pathways — called **buses** — through which data flows between the CPU, RAM, storage, and I/O devices. When you press a key, that signal travels from the keyboard through the bus to the CPU. When you save a file, data flows from RAM through the bus to the storage drive.

In a desktop tower, the motherboard is a large, easily visible board you can see if you open the case. In a laptop, it's a compact board squeezed into the chassis. In a tablet, it's a tiny logic board packed tightly with everything else — but it's still there, still doing the same job.

No matter what the device looks like on the outside, the same four components are always present, all wired together by that central board:

| Component | Holds data? | Fast? | Survives power-off? |
|-----------|-------------|-------|---------------------|
| CPU | No (tiny registers only) | Extremely fast | N/A — it's a processor |
| RAM | Yes | Very fast | No (volatile) |
| Storage (SSD/HDD) | Yes | Slower | Yes (non-volatile) |
| I/O devices | Varies | Varies | Varies |

## Summary

- The **CPU** (Central Processing Unit) executes your programs. It's the part that does the actual thinking — performing calculations and making decisions billions of times per second.
- **RAM** is fast, temporary memory that holds the data and code the CPU is actively using. It's cleared completely when the power goes off.
- **Storage** (SSD or HDD) holds data permanently, surviving power cycles. SSDs dominate modern laptops and tablets because they're fast and durable.
- **I/O devices** connect the computer to the outside world. Input devices (keyboards, touchscreens, microphones) send data in; output devices (displays, speakers) send data out. Many devices, like a touchscreen, do both.
- All of these components connect through the **motherboard**, which provides the electrical buses they use to pass data around.
- Whether it's a tower PC, a laptop, or a Surface tablet, every computer has all four types of components — just packaged differently.

## What's next

Now that you can name the parts and know what each one does, the natural question is: how do they work *together* to actually run a program? That's exactly what [Von Neumann Architecture](../von_neumann_architecture/) covers — the fundamental model that describes how the CPU, RAM, and storage collaborate to execute code, and why almost every computer built in the last 75 years follows the same basic design.
