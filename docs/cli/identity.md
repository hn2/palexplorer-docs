# Identity Commands

## pal init

Create a new identity with an Ed25519 keypair.

```bash
pal init "Alice"
```

Generates a 24-word BIP-39 recovery phrase. Write it down — it's the only way to recover your identity.

## pal whoami

Show your current identity.

```bash
pal whoami
```

Output: public key, handle (if registered), device name, role.

## pal register

Register a handle on the discovery server.

```bash
pal register alice
```

Uses challenge-response authentication with your Ed25519 key. Handles are globally unique.

## pal recover

Recover identity from a 24-word mnemonic.

```bash
pal recover "word1 word2 word3 ... word24"
```

## pal auth

OAuth authentication (Google, GitHub).

```bash
pal auth google
pal auth github
```

Links a social identity to your cryptographic keypair.

## pal web-login

Web-based device login flow for discovery server registration.

```bash
pal web-login
```

## pal user

Multi-user management.

```bash
pal user list                  # List all users
pal user add "Bob"             # Create new user
pal user remove "Bob"          # Remove user
pal user promote "Bob"         # Promote to owner
```

## pal su

Switch active user (admin only).

```bash
pal su Bob
```

## pal login

Guest login (temporary, in-memory keys).

```bash
pal login alice
```

## pal device

Manage devices.

```bash
pal device list                # List registered devices
pal device rename "Work PC"    # Rename current device
```
