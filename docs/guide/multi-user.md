# Multi-User

Palexplorer supports multiple users on a single device.

## Roles

| Role | Capabilities |
|------|-------------|
| **Owner** | Full access. Manage users, shares, all settings. Created on first `pal init`. |
| **User** | Create shares, chat, manage own pals. Cannot manage other users. |
| **Guest** | Read-only. Keys in memory only (wiped on exit). |

## Managing Users

```bash
# List all users
pal user list

# Create a new user
pal user add "Bob"

# Switch to another user
pal su Bob

# Promote to owner (irreversible)
pal user promote Bob

# Remove a user
pal user remove Bob
```

## Guest Login

```bash
pal login <handle>
```

Guest mode creates a temporary in-memory identity — no keystore persistence. Keys are securely wiped with `sodium_memzero()` on logout.

## Data Isolation

Each user's data is namespaced by their public key (`userdata.<publicKey>.*`). Users cannot access each other's shares, pals, or messages.
