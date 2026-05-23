---
title: Network Introduction
summary: "A beginner-friendly introduction to computer networks — how WiFi, wired Ethernet, Bluetooth, and cellular connections let devices talk to each other, and what 'the internet' really means."
prerequisites: 
  - elementry/computer_science/parts_of_a_computer
aliases: []
tags: ["Introduction"]
updated: 2026-05-23
---

## Why does any of this matter?

Your laptop can send an email to someone on the other side of the world in under a second. Your phone can stream a video while you're sitting on a bus, far from home. How?

The answer is **networks** — systems that let computers talk to each other. Once you understand what a network is and how the common connection types work, the internet goes from feeling like magic to something you can actually reason about.

## What is a network?

At its simplest, a **network** is two or more devices connected so they can exchange information.

That could be two computers in the same room sharing files. It could be a printer talking to your laptop. It could be your phone fetching a web page from a server in another country. The scale changes dramatically, but the idea is always the same: devices sending data back and forth.

## Ways devices connect

There are several ways to join a network. Some use physical cables; others use invisible radio waves. Each has trade-offs.

### Wired connection (Ethernet)

The most straightforward way to connect two devices is a cable. The standard cable used for this is an **Ethernet** cable — the flat rectangular plug that looks a bit like a wide phone jack.

Plug one end into your laptop and the other into your router (the box your internet provider gave you), and your laptop is on the network. The signal travels as electrical pulses down the copper wires inside the cable.

Wired connections have three big advantages:
- **Fast** — modern Ethernet can move data at 1 gigabit per second or more.
- **Stable** — a cable doesn't suffer from interference or signal drop-off.
- **Secure** — someone has to physically plug in to eavesdrop.

The obvious downside: you're tethered. Move more than a metre or two and the cable yanks out.

### WiFi

**WiFi** is what most people use most of the time, because you can move around freely. Instead of a cable, WiFi sends data as radio waves — the same basic idea as a radio station, but in a different frequency range and a much shorter range.

A **router** (or access point) broadcasts the WiFi signal. Devices nearby — your phone, laptop, tablet — pick up the signal with their wireless antenna and send data back. Everything flows through that central router.

WiFi is remarkably convenient, but it comes with trade-offs:
- **Range is limited.** A typical home router covers maybe 20–30 metres indoors before the signal weakens. Walls and floors reduce that further.
- **Speed varies.** The further you are from the router, the slower and less reliable the connection gets.
- **Interference.** Microwave ovens, neighbouring WiFi networks, and other devices can disrupt the signal.

You've probably noticed that your internet feels faster when you sit close to the router — now you know why.

### Bluetooth

**Bluetooth** is also a radio-wave technology, but it's designed for something quite different: short-range connections between devices that are *right next to each other*.

When you pair wireless earbuds to your phone, they're connected over Bluetooth. When you connect a wireless mouse to your laptop, or sync your fitness tracker to your phone, that's Bluetooth too.

Bluetooth trades range and speed for low power consumption. It's perfect for small, battery-powered accessories that need to stay connected a couple of metres away. You wouldn't use Bluetooth to browse the internet — it's too slow and its range is too small — but you absolutely would use it to listen to music from your phone while it sits on the desk beside you.

Key characteristics of Bluetooth:
- **Very short range** — typically 5–10 metres, sometimes more with modern versions.
- **Low power** — designed for small devices like earbuds or fitness trackers.
- **Peer-to-peer** — two devices connect directly to each other, with no router in the middle.

### Cellular network

WiFi requires you to be near a router. But what happens when you step outside, get in a car, or board a train? Your phone switches to the **cellular network**.

Mobile carriers build towers across cities, towns, and highways. Each tower covers a geographic area called a **cell** — which is where "cellular" comes from. When your phone connects, it sends and receives radio signals with the nearest tower. As you move, your phone hands off to the next tower seamlessly — you usually don't notice the switch.

The cellular network is what lets you check your messages in the middle of nowhere, far from any WiFi router. The trade-offs:
- **Wide coverage** — carriers invest enormously to cover large areas.
- **Costs money** — unlike WiFi, cellular data comes from a paid plan.
- **Speed varies** — older generations (3G, 4G) are slower; newer 5G networks can rival or beat home WiFi in speed.

The "G" in 3G, 4G, and 5G stands for **generation**. Each generation brought faster speeds and more capacity.

## Your home network

In your home, all of these pieces likely coexist.

Your **router** connects to the internet via a cable that your ISP (internet service provider) runs to your home. It then shares that connection with every device that joins your network — over WiFi for most things, or over Ethernet if you've plugged in a cable.

Your phone might be on WiFi when you're home, and automatically switch to cellular when you walk out the front door. Your wireless keyboard uses Bluetooth and doesn't touch the internet at all. These are all different types of connections, serving different needs, all running at the same time.

## The internet vs. a network

The words "network" and "internet" are often used interchangeably, but they mean different things.

A **network** can be entirely private. The computers in an office building sharing files with each other form a network — called a **local area network** (LAN). No outsiders can get in.

The **internet** is the world's largest *public* network — a network of networks, connecting billions of devices across every country. When your home router connects to your ISP, and your ISP connects to other networks, and those connect to others, you eventually reach everything.

So: every internet connection uses a network, but not every network is the internet.

## Summary

- A **network** is two or more devices connected to exchange data.
- **Wired (Ethernet)** connections use physical cables. They're fast, stable, and secure, but limit movement.
- **WiFi** uses radio waves to connect devices wirelessly to a nearby router. Convenient, but limited by range and interference.
- **Bluetooth** is short-range, low-power radio technology designed for accessories like earbuds and keyboards — not for internet browsing.
- **Cellular** networks use towers spread across large areas, letting phones stay connected anywhere with coverage. Each generation (3G, 4G, 5G) is faster than the last.
- Your **home network** typically combines all of these: Ethernet or WiFi for internet access, Bluetooth for peripherals.
- A **LAN** (local area network) is a private network. The **internet** is the global public network that connects them all.
