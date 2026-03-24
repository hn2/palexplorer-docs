# Multi-User

Palexplorer supports multiple users on a single device.

## Roles

| Role | Capabilities |
|------|-------------|
| **Owner** | Full access. Manage users, shares, all settings. Created on first `pe init`. |
| **User** | Create shares, chat, manage own pals. Cannot manage other users. |
| **Guest** | Read-only. Keys in memory only (wiped on exit). |

## Managing Users

```bash
# List all users
pe user list

# Create a new user
pe user add "Bob"

# Switch to another user
pe su Bob

# Promote to owner (irreversible)
pe user promote Bob

# Remove a user
pe user remove Bob
```

## Guest Login

```bash
pe login <handle>
```

Guest mode creates a temporary in-memory identity — no keystore persistence. Keys are securely wiped with `sodium_memzero()` on logout.

## Data Isolation

Each user's data is namespaced by their public key (`userdata.<publicKey>.*`). Users cannot access each other's shares, pals, or messages.
