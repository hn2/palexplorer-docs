# Identity Commands

## pe init

Create a new identity with an Ed25519 keypair.

```bash
pe init "Alice"
```

Generates a 24-word BIP-39 recovery phrase. Write it down — it's the only way to recover your identity.

## pe whoami

Show your current identity.

```bash
pe whoami
```

Output: public key, handle (if registered), device name, role.

## pe register

Register a handle on the discovery server.

```bash
pe register alice
```

Uses challenge-response authentication with your Ed25519 key. Handles are globally unique.

## pe recover

Recover identity from a 24-word mnemonic.

```bash
pe recover "word1 word2 word3 ... word24"
```

## pe auth

OAuth authentication (Google, GitHub).

```bash
pe auth google
pe auth github
```

Links a social identity to your cryptographic keypair.

## pe web-login

Web-based device login flow for discovery server registration.

```bash
pe web-login
```

## pe user

Multi-user management.

```bash
pe user list                  # List all users
pe user add "Bob"             # Create new user
pe user remove "Bob"          # Remove user
pe user promote "Bob"         # Promote to owner
```

## pe su

Switch active user (admin only).

```bash
pe su Bob
```

## pe login

Guest login (temporary, in-memory keys).

```bash
pe login alice
```

## pe device

Manage devices.

```bash
pe device list                # List registered devices
pe device rename "Work PC"    # Rename current device
```
