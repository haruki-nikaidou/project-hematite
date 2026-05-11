---
title: Programming Languages
summary: "A wide-ranging introduction to programming languages — what they are, why so many exist, and how different languages are built for different jobs, from building websites to powering critical infrastructure."
prerequisites:
  - elementry/computer_science/how_programs_work
aliases: []
tags: ["Introduction"]
updated: 2026-05-08
---

You've seen that programs are just lists of instructions a computer follows. But here's a question that often comes up: _what language are those instructions written in?_ The answer is almost never one single language — and once you understand why, the whole world of software starts to make a lot more sense.

## Why do so many programming languages exist?

Think about spoken languages. English is great for writing scientific papers. Japanese has grammar that makes politeness levels very precise. Arabic flows beautifully in poetry. Each language grew out of the culture and needs of the people who used it. No single spoken language is "the best" — they each fit certain things well.

Programming languages are similar. Over the decades, programmers kept running into situations where existing languages were awkward or slow for the job at hand. So they invented new ones. Each new language made tradeoffs: faster to write, or faster to run? Easy for beginners, or powerful for experts? Safe from bugs, or flexible for performance?

Today there are hundreds of languages in use. But they aren't random — they tend to cluster around the kinds of problems they solve. Let's tour those clusters.

## General-purpose languages — and how communities form around them

Most languages you'll encounter are **general-purpose programming languages** — meaning there's nothing stopping you from using them for almost any task. But in practice, communities, tools, and libraries have grown up around certain use cases, giving each language a home territory.

This distinction matters. The categories below — web, native apps, infrastructure — describe where each language is _commonly_ used, not where it's _exclusively_ used. Java is the dominant language for large-scale server-side web applications, but _Minecraft_ is written in Java. Rust is widely used in operating systems and Cloudflare's global networking infrastructure, but you can absolutely use it to build a web service. Kotlin is the go-to for Android apps, yet it also runs on servers.

Think of it like cuisines: a French chef can cook Thai food, and some do it brilliantly. But if someone asks "what's French cooking known for?", you'd still give a specific answer. The clusters are real and useful — just don't mistake them for walls.

## Languages for building the web

When you open a website, a lot is happening behind the scenes. There's code running in your browser (the **front end**) and code running on a server somewhere (the **back end**). Different languages dominate each side.

### JavaScript — the language of the browser

**JavaScript** is the only programming language that browsers natively understand. If a website has any interactive behavior — a dropdown menu, a live search box, a button that does something — JavaScript is almost certainly behind it.

JavaScript was created in ten days in 1995 and has been at the center of the web ever since. It has some quirks (a polite word for "weird behaviors"), but it's also incredibly powerful and runs everywhere.

**TypeScript** is a newer language built directly on top of JavaScript. It adds a type system — a way of labeling data so the computer can catch errors before your program ever runs. Most serious web projects today use TypeScript instead of raw JavaScript.

### Server-side languages

The server — the computer that stores your data and sends it to your browser — can run almost any language. Some popular choices:

- **Java** is one of the oldest and most widely deployed languages in the world. It's wordy but reliable, and enormous organizations (banks, airlines, Google's backend) trust it with critical systems. The phrase "write once, run anywhere" was Java's original promise: a Java program can run on any computer without being rewritten.

- **Kotlin** is a modern language that runs on the same platform as Java (the **JVM**, or Java Virtual Machine). It fixes many of Java's rough edges and is much more pleasant to write. You can mix Kotlin and Java code in the same project, so companies can adopt Kotlin gradually.

- **PHP** was originally a simple tool for adding dynamic content to web pages, but it grew into a full language powering an enormous chunk of the internet — WordPress, Wikipedia, and Facebook all started on PHP.

- **Ruby** gained popularity through a framework called **Ruby on Rails**, which made it possible to build a fully functional web app in astonishingly little code. It prioritizes developer happiness and readability, though it trades raw speed for that convenience.

- **Elixir** is a newer language built on top of a very old and battle-tested platform called **Erlang** (more on Erlang below). Elixir is designed for building systems that need to handle millions of simultaneous users — live chat apps, real-time notifications, multiplayer games. The Discord platform used Elixir for years to handle millions of concurrent connections.

## Languages for native apps

A **native app** is one that runs directly on a specific device and operating system — as opposed to running inside a browser. Native apps tend to be faster and have better access to device features (camera, GPS, sensors), but they need to be written differently for each platform.

- **Kotlin** (again) is the primary language for building **Android** apps. Google adopted it as the preferred Android language in 2017 and it has steadily replaced Java in that space.

- **Swift** is Apple's language for building apps on **iPhone, iPad, and macOS**. Apple released Swift in 2014 to replace an older language called Objective-C, which had a notoriously strange syntax. Swift is much easier to learn while still being very fast.

- **C#** (pronounced "C sharp") is Microsoft's language and the cornerstone of the **.NET** platform. C# is used to build Windows desktop apps, but also cross-platform apps thanks to frameworks like **MAUI**. It's also the language you use to write scripts in the Unity game engine.

- **C++** is one of the oldest languages still in heavy use. It gives you extremely fine-grained control over the computer's hardware, which makes it a go-to for performance-critical native apps: AAA video games, graphics engines, audio processing software, and applications where every millisecond matters. The tradeoff is that C++ is difficult and easy to get wrong.

- **Dart** is Google's language, designed primarily for **Flutter** — a framework that lets you write one codebase and ship apps on Android, iOS, web, and desktop simultaneously. Dart is relatively new but has grown quickly thanks to Flutter's popularity.

## Languages for infrastructure

"Infrastructure" is a broad word that covers everything making the rest of software _possible_: operating systems, databases, networking tools, cloud services, compilers, and more. These systems need to be extremely fast, extremely reliable, and often run on hardware with limited resources. A different class of language dominates here.

- **C** is the grandfather of modern programming languages. Most operating systems — Windows, macOS, Linux — are written largely in C. Microcontrollers inside your microwave, your car, your router — many of them run C. It gives you direct access to memory and hardware, which is both its superpower and its danger: C doesn't protect you from mistakes, and those mistakes can cause serious bugs.

- **C++** appears here too, because it's essentially C with object-oriented features added. Browsers (Chrome, Firefox), database engines (MySQL, PostgreSQL), and game engines are all commonly written in C++.

- **Go** (sometimes called Golang) was created at Google in 2009. It was designed to be easy to learn, fast to compile, and excellent at handling many tasks at once. Go has become the backbone of modern cloud infrastructure — tools like Docker, Kubernetes, and Terraform are all written in Go.

- **Rust** is a newer language (first stable release in 2015) with a bold ambition: to be as fast as C and C++, but safe. Rust has a system that catches an entire class of bugs — the kind that crash programs or create security holes — at compile time, before the program even runs. It's the language you'll eventually be learning in this course, and it's increasingly being adopted in Linux, Windows, web browsers, and embedded systems.

- **Erlang** was built in the 1980s by Ericsson, a telecommunications company, to run telephone switches — systems that _cannot go down_, ever. Erlang has extraordinary tools for handling failures gracefully and running millions of lightweight processes simultaneously. WhatsApp's backend ran on Erlang and famously handled billions of messages a day with a tiny engineering team.

- **COBOL** (Common Business-Oriented Language) was designed in 1959, and it's still quietly running much of the world's financial infrastructure. Your bank's core transaction processing, the systems behind Social Security payments, airline reservations — enormous amounts of COBOL code sit at the foundation of global finance. It has a reputation for being clunky, and programmers who know it well are increasingly rare, which is actually a significant economic problem.

## Not every "language" is a general-purpose programming language

Everything above — JavaScript, Java, Rust, Go, Swift, and the rest — shares one key property: they're general-purpose. Each one can, in principle, be bent toward a wide variety of problems. But some "languages" in computing are something different entirely. They're built to do exactly one job, and they deliberately give up the ability to do anything else. These are called **domain-specific languages**, or **DSLs**.

### SQL — the language of databases

**SQL** (Structured Query Language, usually pronounced "sequel" or spelled out "S-Q-L") is used to talk to **databases** — organized stores of data like all the users on a platform, all the products in a store, or all the transactions in a bank.

You don't "write a program" in SQL the way you'd write a program in Java or Rust. Instead, you ask questions:

```sql
-- "Give me the names of all users who signed up after January 1st, 2024"
SELECT name
FROM users
WHERE signup_date > '2024-01-01';
```

SQL is not Turing-complete in everyday use (meaning it can't express any arbitrary computation the way a general-purpose language can), and you'd never use it to build an app on its own. But almost every application that stores data uses SQL behind the scenes — the app is written in Python or Ruby or Java, and that code then sends SQL queries to the database.

### CSS — the language of visual style

**CSS** (Cascading Style Sheets) describes how things should _look_ on a web page: colors, fonts, sizes, spacing, layout. It works alongside HTML (which describes the _structure_ of a page) and JavaScript (which adds _behavior_).

CSS is not a programming language in the traditional sense — it has no variables in its basic form, no loops, no conditions. You're not giving instructions _to execute_; you're declaring _rules to apply_. If a paragraph has the class `warning`, make its text red. If the screen is narrower than 600 pixels, stack these columns vertically instead of side by side.

These "languages" are absolutely essential parts of software, even though they're not used for general programming. Programs are written _in_ JavaScript or Python, but those programs generate or consume SQL and CSS constantly. Understanding that distinction — **language for programming** vs. **language for describing something** — is a useful mental model as you dig deeper into tech.

## A world of tradeoffs

There's no single "best" programming language, and experienced developers use several throughout their careers. Every language is a set of choices: what to make easy, what to make possible, what to make impossible. Rust prevents entire classes of memory bugs. Python makes it easy to write data analysis code. SQL makes it elegant to ask questions about structured data.

What you'll find is that learning your second language is much easier than learning your first, and your third easier than your second. The concepts — loops, conditions, functions, data structures — appear in all of them. The syntax changes; the ideas stay.

## Summary

- A **programming language** is a formal language for writing instructions a computer can execute. There are hundreds in use today, each with different strengths.
- **Web front-end**: JavaScript (and TypeScript) are the only languages browsers run natively.
- **Web back-end**: Many languages are used on servers — Java, Kotlin, PHP, Ruby, and Elixir are common choices.
- **Native apps**: Kotlin for Android, Swift for Apple platforms, C# for Windows/.NET, C++ for high-performance software, Dart for cross-platform apps.
- **Infrastructure**: C and C++ for operating systems and engines; Go for cloud tooling; Rust for safe systems programming; Erlang for fault-tolerant distributed systems; COBOL for legacy financial infrastructure.
- **Domain-specific languages (DSLs)** like SQL and CSS are not general-purpose programming languages. They describe or query something specific and are used _within_ or _alongside_ programs, not as standalone programs themselves.
- No language is "the best." Each one is a tradeoff, and the best developers know several.
