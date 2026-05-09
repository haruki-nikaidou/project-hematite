---
title: Introduction to SSH
summary: "A beginner-friendly introduction to SSH: learn what it is, how public-key authentication works, and how to generate an SSH key pair and register it with GitHub, GitLab, or a remote server so you can connect securely without ever typing a password."
prerequisites: 
  - elementry/tooling/shell
aliases: []
tags: ["Introduction", "Security", "Networking"]
updated: 2026-05-09
---

Every time you push code to GitHub, log into a remote server, or automate a deployment, one technology is quietly doing the heavy lifting: **SSH**. Getting it set up once pays dividends for the rest of your career as a developer.

## What SSH is

**SSH** stands for *Secure Shell*. It is a network protocol that lets you open a command-line session on a remote machine as if you were sitting right in front of it — except every byte of the connection is encrypted.

Before SSH existed, tools like `telnet` sent everything — including passwords — as plain text over the network. Anyone watching the traffic could read it. SSH replaced that with strong cryptography so that even if someone intercepts your data, they cannot read or tamper with it.

When you open an SSH connection, two things happen automatically:

1. The connection is **encrypted**, so nobody eavesdropping on the network can see what you send or receive.
2. Both sides **verify each other's identity**, so you cannot accidentally connect to an impostor pretending to be the server.

## Passwords versus SSH keys

The most familiar way to prove who you are is a **password**. SSH does support passwords, but they come with real drawbacks:

- You have to type one every single time you connect.
- Servers exposed to the internet are under constant automated attack, trying thousands of common passwords per hour.
- A password is only as strong as the person who chose it.

A far better alternative is **public-key authentication**. It is the standard method used by GitHub, GitLab, and most professional servers — and after a one-time setup, it requires no typing at all.

## How SSH keys work

Public-key authentication is built on a pair of linked files called a **key pair**.

| File | Role | Who sees it |
|------|------|-------------|
| **Private key** | Proves your identity | Only you. Never share this file. |
| **Public key** | Lets servers recognise you | Safe to share. Put it on every server you want to reach. |

Think of it like a padlock and a key. You hand out copies of the padlock (public key) to anyone who needs to secure something for you. You keep the key (private key) to yourself. The server locks a challenge with your padlock; only your private key can open it. The private key never travels over the network — the proof works without it ever leaving your machine.

## Generating your SSH key pair

Open your terminal and run:

```/dev/null/ssh-keygen.sh
ssh-keygen -t ed25519 -C "your_email@example.com"
```

- `-t ed25519` selects the **Ed25519** algorithm — the modern, recommended choice for new keys.
- `-C "your_email@example.com"` adds a comment to the public key so you remember which key belongs to which identity. Replace this with your own email address.

The command will ask you a few things:

```/dev/null/ssh-keygen-session.txt
Generating public/private ed25519 key pair.
Enter file in which to save the key (/home/you/.ssh/id_ed25519):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/you/.ssh/id_ed25519
Your public key has been saved in /home/you/.ssh/id_ed25519.pub
```

**File location** — press Enter to accept the default path (`~/.ssh/id_ed25519`). That is the standard location and works without any further configuration.

**Passphrase** — this is an optional password that encrypts the private key *on disk*. If someone steals your laptop, they still cannot use your key without the passphrase. Setting one is strongly recommended, and most operating systems will remember it for you after you type it once per session.

You now have two new files:

```/dev/null/ls-ssh.sh
~/.ssh/id_ed25519      # your private key — guard this carefully
~/.ssh/id_ed25519.pub  # your public key — safe to share
```

You can print your public key at any time:

```/dev/null/cat-pubkey.sh
cat ~/.ssh/id_ed25519.pub
# prints a single long line like:
# ssh-ed25519 AAAA...many characters... your_email@example.com
```

## Adding your public key to GitHub or GitLab

Once you register your public key with a hosting platform, you can `clone`, `push`, and `pull` without ever entering a password.

1. Print your public key and copy the entire output to your clipboard:

   ```/dev/null/print-pubkey.sh
   cat ~/.ssh/id_ed25519.pub
   ```

2. On **GitHub**: go to **Settings → SSH and GPG keys → New SSH key**.  
   On **GitLab**: go to **Preferences → SSH Keys → Add new key**.

3. Paste your public key into the *Key* field, give it a recognisable title (for example, "personal laptop"), and save.

That is all. The platform stores your public key. When you connect using an SSH URL, your machine uses the matching private key to prove your identity silently in the background.

To verify that everything is working:

```/dev/null/ssh-test-github.sh
ssh -T git@github.com
# Expected response:
# Hi your-username! You've successfully authenticated, but GitHub does not provide shell access.
```

```/dev/null/ssh-test-gitlab.sh
ssh -T git@gitlab.com
# Expected response:
# Welcome to GitLab, @your-username!
```

Either message confirms that your key is recognised correctly.

## Adding your public key to a remote Linux server

If you have password-based access to a Linux server and want to switch to key-based authentication, use `ssh-copy-id`:

```/dev/null/ssh-copy-id.sh
ssh-copy-id user@hostname
# replace user with your username on the server
# replace hostname with the server's IP address or domain name
```

This command connects using your password one last time and appends your public key to `~/.ssh/authorized_keys` on the remote machine. After that, SSH uses your key automatically and the password prompt disappears.

If `ssh-copy-id` is not available on your system, you can do the same thing manually. First, print your public key locally, then add it to the server:

```/dev/null/manual-authorized-keys.sh
# On the remote server, create the directory and file if they do not exist:
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Paste your public key onto a new line in authorized_keys:
echo "ssh-ed25519 AAAA...your full public key..." >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

The `chmod` commands matter: SSH refuses to use key files if their permissions are too open.

## Connecting to a remote machine

With your key in place, connecting is a single command:

```/dev/null/ssh-connect.sh
ssh user@hostname
# for example: ssh alice@203.0.113.42
# or with a domain name: ssh alice@dev.example.com
```

If you set a passphrase when generating the key, SSH asks for it once. After that you have a shell on the remote machine. Everything you type runs there, not on your own computer.

To end the session, type `exit` or press **Ctrl+D**.

## Making connections easier with a config file

Typing `ssh alice@203.0.113.42` every time gets old quickly. You can save connection details in `~/.ssh/config` and use a short nickname instead:

```/dev/null/ssh-config
Host myserver
    HostName 203.0.113.42
    User alice
    IdentityFile ~/.ssh/id_ed25519
```

Now `ssh myserver` is all you need. You can add as many `Host` blocks as you like, one per server or service.

## Summary

- **SSH** (Secure Shell) is a protocol that opens an encrypted, authenticated command-line session on a remote machine.
- **Public-key authentication** replaces passwords with a key pair: a **private key** (yours alone, never shared) and a **public key** (placed on every server you want to access).
- Generate a key pair with `ssh-keygen -t ed25519 -C "your_email@example.com"`. Accept the default path and set a passphrase.
- Your private key lives at `~/.ssh/id_ed25519`; your public key is at `~/.ssh/id_ed25519.pub`.
- Register your public key on **GitHub** or **GitLab** via their SSH key settings pages. Verify with `ssh -T git@github.com` (or `git@gitlab.com`).
- Add your public key to a Linux server with `ssh-copy-id user@hostname`, or manually by appending it to `~/.ssh/authorized_keys`.
- Connect to any server with `ssh user@hostname`. Use `~/.ssh/config` to save shortcuts for machines you access regularly.

## What's next

With SSH configured, you are ready to interact with remote code repositories without friction. The next checkpoint, [Introduction to Git](/en/cp/elementry/tooling/git/), will show you how Git uses SSH to push and pull code, along with everything else you need to track changes and collaborate with others.
