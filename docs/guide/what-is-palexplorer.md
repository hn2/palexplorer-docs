# What is Palexplorer?

Palexplorer is an **encrypted peer-to-peer file sharing** application. Files travel directly between devices — no cloud servers, no middlemen, no tracking.

## Core Principles

- **Anonymous by default** — Your identity is an Ed25519 keypair. No email, no phone, no sign-up required.
- **P2P first** — Everything in the core works without servers. Discovery servers, handles, and cloud features are optional extensions.
- **Encrypted always** — All shared content is encrypted with XChaCha20-Poly1305. Keys are wrapped per-recipient using ECIES.
- **Extensible** — The core is minimal. Features like discovery servers, sync, chat, VFS, and analytics are all extensions.

## Architecture

```
┌─────────────────────────────────────────────────┐
│                 EXTENSIONS                       │
│  discovery · sync · chat · vfs · streaming · sso │
├─────────────────────────────────────────────────┤
│                 PAL/1.0 PROTOCOL                 │
│  envelope · messages · policy · negotiation      │
├─────────────────────────────────────────────────┤
│                 CORE P2P ENGINE                  │
│  identity · shares · pals · groups · permissions │
│  encryption · transfers · audit                  │
├─────────────────────────────────────────────────┤
│               TRANSPORT LAYER                    │
│  BitTorrent · DHT · BEP44 · mDNS · WebRTC      │
└─────────────────────────────────────────────────┘
```

## Platforms

| Platform | Type | Status |
|----------|------|--------|
| Windows | Desktop (Electron) + CLI | Stable |
| macOS | Desktop (Electron) + CLI | Stable |
| Linux | Desktop (Electron) + CLI | Stable |
| Web | Dashboard | Stable |
| Android | Mobile (React Native) | Beta |
| iOS | Mobile (React Native) | Beta |

## Pricing

| Plan | Cost | Includes |
|------|------|----------|
| **Free** | $0 forever | Unlimited P2P, 10+ free extensions, LAN & WAN sharing |
| **Pro** | $9/mo | VFS, streaming, analytics, TURN relay, extended policies |
| **Team** | $12/seat/mo | SSO, SCIM, RBAC, compliance modules, admin dashboard |
| **Enterprise** | Custom | SLA, self-hosted discovery, dedicated support |

See [Pricing](/pricing) for full details.

## Next Steps

- [Getting Started](/guide/getting-started) — Install and share your first file
- [CLI Reference](/cli/) — Full command reference
- [Build an Extension](/extensions/build-your-own) — Extend Palexplorer
