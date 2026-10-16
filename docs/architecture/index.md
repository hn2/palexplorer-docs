# Architecture

## System Layers

```
┌─────────────────────────────────────────────────┐
│                 EXTENSIONS                       │
│  discovery · sync · chat · vfs · streaming · sso │
├─────────────────────────────────────────────────┤
│                 PAL/2.0 PROTOCOL                 │
│  envelope · messages · policy · negotiation      │
│  routing · sync · handler · ratchet · sessions   │
├─────────────────────────────────────────────────┤
│                 CORE P2P ENGINE                  │
│  identity · shares · pals · groups · permissions │
│  encryption · transfers · sync · audit           │
├─────────────────────────────────────────────────┤
│               TRANSPORT LAYER                    │
│  BitTorrent · DHT · BEP44 · mDNS · WebRTC      │
└─────────────────────────────────────────────────┘
```

## Core Modules

| Module | Responsibility |
|--------|---------------|
| `identity` | Ed25519 keypair, BIP-39, keytar storage, guest login |
| `shares` | Share registry, visibility, encryption key storage |
| `permissions` | Per-share ACL, audit log, role enforcement |
| `transfers` | Download/upload tracking, pause/resume, history |
| `syncEngine` | SHA-256 manifest building, 3-way diff, conflict detection |
| `users` | Multi-user profiles, roles (Owner/User/Guest) |
| `extensions` | Extension loader, hooks, context API, sandbox |
| `discoveryClient` | Discovery server HTTP client, key pinning |
| `dhtDiscovery` | BitTorrent DHT BEP 44, Ed25519 verification |
| `resolver` | Handle resolution chain (cache → server → DHT) |
| `connectionManager` | Connect/disconnect, offline queue replay |
| `signalingServer` | P2P signaling on port 7474, PAL envelope handling |
| `mdnsService` | LAN discovery via mDNS/Bonjour |
| `vfs` | WebDAV virtual filesystem |
| `billing` | Lemon Squeezy license management |

## Learn More

- [P2P Stack](/architecture/p2p) — BitTorrent, DHT, mDNS, WebRTC
- [PAL/2.0 Protocol](/architecture/protocol) — Message types, envelope format, capabilities
- [Discovery](/architecture/discovery) — Handle resolution, server federation
