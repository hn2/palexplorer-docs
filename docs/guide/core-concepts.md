# Core Concepts

## Identity

Your identity is an **Ed25519 keypair** derived deterministically from a 24-word BIP-39 mnemonic. There's no account, no server registration, and no email required.

```
BIP-39 Mnemonic (24 words, 256-bit entropy)
  └── Ed25519 Seed (32 bytes)
       ├── Ed25519 Keypair (signing, identity)
       └── Curve25519 Keypair (derived, key exchange)
```

Your **public key** is your identity. Your **mnemonic** is your recovery key. The private key is stored in the OS keystore (Keytar on Windows/macOS, encrypted file on Linux).

### Handles

Handles (like `@alice`) are optional — they're provided by the **Discovery** extension. Handles are globally unique and registered on a discovery server via challenge-response authentication.

## Shares

A share is a set of files/folders you make available to others. Each share has:

- **Name** — Human-readable label
- **Visibility** — Who can access it:
  - `private` — Only named recipients (default)
  - `public` — Anyone with the magnet link
  - `global` — Published to discovery, anyone can find it
  - `link-only` — Time-limited share link
- **Encryption key** — Random 32-byte key, wrapped per-recipient
- **Magnet link** — BitTorrent magnet for P2P transfer

## Encryption

All shared content is encrypted with **XChaCha20-Poly1305** in 64KB streaming chunks.

1. A random 32-byte share key is generated
2. For each recipient, the key is wrapped with their Curve25519 public key (`crypto_box_seal`)
3. File contents are encrypted as a secretstream (authenticated, streaming)
4. The filename-to-hash manifest is also encrypted (prevents metadata leakage)

## Permissions

Per-share, per-recipient:

| Permission | Description |
|-----------|-------------|
| `read` | View file contents |
| `write` | Modify files |
| `delete` | Remove files |
| `canShare` | Re-share with others |
| `drillDown` | Browse subdirectories |

## Transfers

Files transfer via **BitTorrent/WebTorrent** protocol:

1. **LAN** (mDNS discovered) — Direct TCP, fastest
2. **Direct** (public IP) — WebRTC or TCP
3. **Relay** (both behind NAT) — TURN server (Pro feature)

Transfers can be paused, resumed, and cancelled. Progress is tracked per-file.

## Pals

Pals are contacts you share with. A pal is identified by their Ed25519 public key. You can:

- Add pals by handle, public key, or QR code
- Discover pals on your LAN via mDNS
- See online/offline status (requires Discovery extension)

## Groups

Groups are named collections of pals. Share with a group to give all members access at once.

## Discovery

Three discovery layers, from local to global:

1. **mDNS** — Automatic LAN discovery (no internet needed)
2. **Discovery Server** — Handle registration, online presence, offline inbox
3. **DHT** — Decentralized peer lookup via BitTorrent Mainline DHT (BEP 44)

## Roles

| Role | Capabilities |
|------|-------------|
| **Owner** | Full access. Manages users, shares, settings. Created on first `pal init`. |
| **User** | Create shares, chat, manage own pals. Cannot manage other users. |
| **Guest** | Read-only. Keys in memory only (wiped on exit). |
