---
title: Introduction to Git
summary: "A beginner-friendly introduction to Git — the version control system that every developer relies on to track changes, collaborate with others, and experiment safely using branches."
prerequisites: 
  - elementry/tooling/prepare_environment
  - elementry/tooling/shell
  - elementry/tooling/ssh
aliases: []
tags: ["Introduction", "Git", "Version Control"]
updated: 2026-05-09
---

Every developer has had that sinking feeling: you changed something, nothing works anymore, and you can't remember what you did. **Git** is the tool that makes sure you never feel that way again. It keeps a complete history of every change you make to your code, lets you experiment freely without fear, and makes working with other developers far easier.

## What is Git?

Git is a **version control system** — software that records every change you make to a set of files over time. Think of it as a very detailed "undo history" for your entire project, one you can review, share, and roll back at any time.

A few terms you'll see constantly:

- A **repository** (or **repo**) is the folder Git is tracking, together with its full history of changes.
- A **commit** is a saved snapshot of your project at one specific moment in time.
- The **remote** is a copy of the repository stored somewhere else — usually on a server — that you and your team share.

## Setting up Git for the first time

Before you make your first commit, tell Git who you are. It attaches your name and email address to every commit you create, so others can see who made each change.

```/dev/null/git-config.sh
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

Run these once and Git remembers them on your machine. The `--global` flag means the setting applies to every repository you work with, not just one specific project.

## Getting a repository

### Cloning an existing repo

The most common starting point is **cloning** — downloading an existing repository, including its complete history, onto your machine.

```/dev/null/git-clone.sh
git clone https://github.com/some-user/some-project.git
```

This creates a new folder called `some-project/` containing all the project files. The URL you cloned from is automatically saved as a **remote** named `origin`, so Git knows where to send and receive changes later.

### Starting a fresh repo

If you're beginning a project from scratch, navigate to your project folder and run:

```/dev/null/git-init.sh
git init
```

Git will start tracking that folder. You'll then need to add a remote manually once you've created a repository on a hosting platform like GitHub or GitLab (more on those [below](#git-providers-github-and-gitlab)).

## Authenticating with a remote

When Git communicates with a remote to push, pull, or clone a private repository, the server needs to know who you are. There are two main ways to handle this.

### HTTPS: username and token

HTTPS URLs look like the one in the `git clone` example above. When you push or pull over HTTPS, Git prompts for a username and a **personal access token** (PAT) — a long string you generate in the platform's settings. Most platforms, including GitHub and GitLab, stopped accepting your account password directly years ago; the PAT is the replacement.

This method works, but it gets tedious. Typing or pasting a token every time you push is friction you'll want to eliminate quickly.

### SSH: the standard approach

**SSH** is what most developers use day-to-day. Instead of a token, it relies on a **key pair**: a private key that stays on your machine and a public key that you register once with the hosting platform. When Git connects to the remote, your machine proves its identity using the private key automatically — no typing required.

Generating an SSH key pair and registering it with a platform is covered in [Introduce to SSH](/en/cp/elementry/tooling/ssh/). Once that's done, you clone using the SSH URL rather than the HTTPS one:

```/dev/null/git-clone-ssh.sh
# HTTPS — works, but prompts for your token on every push
git clone https://github.com/some-user/some-project.git

# SSH — no password prompts after the one-time key setup
git clone git@github.com:some-user/some-project.git
```

After the initial setup, `push` and `pull` just work silently. This is the approach you'll want to set up before doing serious work.

## The three areas Git uses

Understanding these three areas is the key to not being confused by Git. Every change you make passes through them in order:

1. **Working tree** — the actual files on your disk that you edit in your code editor.
2. **Staging area** (also called the *index*) — a holding area where you assemble the changes that will go into your next commit.
3. **Repository** — the permanent record of all commits, stored inside the hidden `.git` folder.

You move changes from the working tree into the staging area with `git add`, and then from the staging area into the repository with `git commit`.

## Making a commit

### Stage your changes

First, tell Git which changes to include in the next commit:

```/dev/null/git-add.sh
git add main.rs    # stage a single file
git add .          # stage all changed files in the current folder
```

Staging lets you be deliberate: if you changed three files but only two of them belong in this commit, stage just those two and leave the third for later.

### Save the snapshot

Once you're happy with what's staged, create the commit with a short message describing what you did:

```/dev/null/git-commit.sh
git commit -m "Add greeting function"
```

A good commit message is a brief, present-tense description of the change: "Fix crash on empty input", "Add login page", "Remove unused imports". Clear messages make it much easier to understand your project's history later.

### Checking what's going on

Two commands you'll use constantly while working:

```/dev/null/git-status-log.sh
git status          # shows which files changed and what's staged
git log --oneline   # shows a compact list of recent commits
```

A typical `git log --oneline` output looks like this:

```/dev/null/git-log-output.txt
a3f2c1e Add greeting function
b8e0d4a Fix crash on empty input
c12f90b Initial commit
```

Each line is one commit. The short string of letters and numbers on the left is the commit's **hash** — Git's unique ID for that snapshot. The text on the right is your message.

## Working with remotes

### Pushing your commits

After you commit locally, you send those commits to the remote with `git push`:

```/dev/null/git-push.sh
git push origin main
```

`origin` is the remote's name and `main` is the **branch** you're pushing to (branches are explained in the next section). This makes your work visible to anyone else who has access to the repository.

### Pulling changes

When a teammate pushes commits, you bring them into your local copy with `git pull`:

```/dev/null/git-pull.sh
git pull origin main
```

`git pull` is two steps rolled into one: it first **fetches** the new commits from the remote, then applies them to your local branch.

### Fetching without applying

If you want to see what changed on the remote *before* applying anything, use `git fetch`:

```/dev/null/git-fetch.sh
git fetch origin
```

This updates Git's internal knowledge of the remote's state without touching your local files. You can then inspect what arrived and decide what to do next — useful when you're in the middle of something and don't want an unexpected `pull` to interrupt your flow.

## Branches

Imagine you want to add a new feature but don't want to risk breaking the working code while you experiment. **Branches** solve exactly this problem: they're independent lines of development that share a common history up to the point where they split off.

Your repository always starts with one branch — typically named `main`. When you create a new branch, you get your own line of development where your commits don't affect `main` until you deliberately bring them back together.

### Creating and switching to a branch

```/dev/null/git-switch-create.sh
git switch -c feature-login   # create a new branch and switch to it in one step
```

Or, if you prefer doing it in two steps:

```/dev/null/git-branch-two-steps.sh
git branch feature-login   # create the branch
git switch feature-login   # then switch to it
```

### Listing branches

```/dev/null/git-branch-list.sh
git branch
```

The branch with an asterisk (`*`) beside it is the one you're currently on.

### Pushing a branch to the remote

When your branch is ready to share with others:

```/dev/null/git-push-branch.sh
git push origin feature-login
```

## Bringing branches back together

Once your feature is finished, you need to integrate those changes back into the main branch. There are two common approaches, and most projects use one or the other consistently.

### Merge

**Merging** takes the changes from one branch and combines them into another. Switch to the branch you want to update, then merge the other branch in:

```/dev/null/git-merge.sh
git switch main
git merge feature-login
```

Git creates a **merge commit** that ties the two lines of history together. Looking at the commit history afterwards, you can clearly see where the two branches diverged and where they came back together.

### Rebase

**Rebasing** is an alternative that produces a cleaner, linear history. Instead of creating a merge commit, it replays your commits on top of the target branch as if you had written them there from the start:

```/dev/null/git-rebase.sh
git switch feature-login
git rebase main
```

After this, `feature-login`'s commits appear immediately after the latest commit on `main`, with no merge commit in between. The history is easier to read at a glance, but you lose the record of when the branches diverged.

Neither merge nor rebase is objectively better — teams simply pick one convention and follow it. When you join a project, check what it already does and match it.

## Git providers: GitHub and GitLab

Git itself is just a tool that runs on your own computer. **Git providers** are web platforms that host remote repositories and layer collaboration features on top.

### GitHub

**GitHub** (github.com) is the most widely used platform in the open-source world. The Rust compiler, the standard library, and the vast majority of public packages you'll use throughout this curriculum live on GitHub. Beyond hosting code, GitHub gives you:

- **Pull requests** — a way to propose changes and have teammates review them before merging.
- **Issues** — a built-in tracker for bugs, features, and discussion.
- **GitHub Actions** — automated workflows that can run your tests, build documentation, or deploy your project whenever you push.

### GitLab

**GitLab** (gitlab.com) is a strong alternative that takes an all-in-one approach to the software development lifecycle. It offers the same core collaboration features as GitHub — merge requests (GitLab's name for pull requests), issues, and CI/CD pipelines — and can also be installed and run on your own server. That self-hosting capability makes it popular with companies that need to keep their code on-premise rather than on a third-party service.

Both platforms speak the same Git protocol, so `clone`, `push`, `pull`, and `fetch` work identically regardless of which one you use. The differences are almost entirely in the web interface and the surrounding tooling.

## Summary

- **Git** is a version control system that saves every change to your code as a series of **commits** in a **repository**.
- Set your identity once with `git config --global user.name` and `git config --global user.email`.
- `git clone <url>` downloads an existing repository; `git init` starts a fresh one.
- Changes pass through three areas: **working tree** → **staging area** (`git add`) → **repository** (`git commit`).
- `git status` shows what has changed and what's staged; `git log --oneline` shows the commit history.
- `git push` sends your commits to the remote; `git pull` fetches and applies remote commits in one step.
- `git fetch` downloads remote changes without applying them, so you can inspect them first.
- Remotes authenticate via **HTTPS** (personal access token) or **SSH** (key pair). SSH is the standard approach and requires no credentials after the one-time setup.
- **Branches** let you develop features in isolation. Create and switch to one with `git switch -c <name>`.
- **Merging** (`git merge`) joins branch histories with a merge commit; **rebasing** (`git rebase`) replays commits for a linear history.
- **GitHub** and **GitLab** are the most common platforms for hosting Git repositories and collaborating with others.

## What's next

With Git in your toolkit alongside the shell commands you've already learned, you have the foundation that every developer works from day to day. You're now ready to write your first real code — head to the Basis series to begin learning Rust.
