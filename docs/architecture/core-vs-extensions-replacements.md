# Thin Core vs. Extensions & Legacy Services Replaced

Palexplorer is designed around a **Thin Core + Chrome-Sandboxed Extensions** architecture so a single platform can serve **Individuals/Students**, **Small Businesses**, and **Self-Hosted Corporate Sovereign (BYO-Infrastructure)** deployments.

## 1. Core Protocol vs. Extension Layer

| Capability | Layer | Why |
|---|---|---|
| **PAL/3 Post-Quantum Handshake (`X25519 + ML-KEM-768`, `Ed25519 + ML-DSA-65`)** | **Thin Core** | Mandatory zero-trust security baseline for every peer connection. |
| **1 MiB Piece Manifest (`file.manifest`), Range Read, `.palpart` Resume & Multi-Peer Swarm (`downloadPal3Swarm`)** | **Thin Core** | Every user (including enterprise LANs) benefits from fast, resumable, piece-verified multi-peer transfers. |
| **Encrypted Message Envelope (`msg.deliver`)** | **Thin Core** | Low-level store-and-forward cryptographic envelope transport. |
| **Public Swarm Keyword/Hash Search (`pal swarm` / `public-swarm`)** | **Extension** | Replaces eMule & BitTorrent for individuals; automatically disabled when Corporate Sovereign `isolatedNetwork: true` is active. |
| **P2P Mail + Unlimited Attachments + OCI SMTP Bridge (`pal mail` / `pal-mail`)** | **Extension** | Replaces SMTP/IMAP & WeTransfer with `@handle` mail and 0-copy PAL/3 attachments while bridging to external `user@domain.com` addresses. |
| **PalFlow Scripting DSL & AI Workflow Compiler (`pal workflow` / `workflow-automation`)** | **Extension** | Compiles natural language or JSON pipelines into `search -> download -> verify_hash -> share -> mail -> audit` steps. |
| **EU Regulatory Auditing & Corporate Sovereign Pack (`advanced-audit`, `compliance-gdpr`, `compliance-dora`, `compliance-iso27001`, `org-policy`)** | **Extension** | Enforces GDPR Art. 15/17/25/30, EU AI Act Art. 12, NIS2/DORA hash-chained audit trails, and self-hosted BYO-Infrastructure isolation. |

## 2. What Palexplorer Replaces (8-in-1 Consolidation)

1. **BitTorrent & eMule** → Replaced by **PAL/3 Multi-Peer Piece Swarm + `pal swarm` Public Search** (post-quantum encrypted, 1 MiB piece SHA-256 verification, no `.torrent` files needed).
2. **Email Attachments & WeTransfer** → Replaced by **`pal mail` (`@palexplorer/pal-mail`)** (signed `@handle` messages with unlimited-size zero-copy PAL/3 attachments + OCI Email Delivery SMTP bridge).
3. **FTP / SFTP / SCP / rsync** → Replaced by **PAL/3 Direct + `@palexplorer/sftp-bridge`** (NAT-traversing `@handle` transfers with `.palpart` resume).
4. **SMB / NFS / WebDAV Network Drives** → Replaced by **`@palexplorer/vfs`** (mount remote shares as drive `P:`).
5. **Dropbox / Google Drive / Resilio Sync** → Replaced by **`@palexplorer/sync`** (zero-cloud device-to-device delta sync).
6. **Plex / Jellyfin** → Replaced by **PAL/3 Byte-Range Media Streaming & Lightbox Preview**.
7. **Cloud Backup (Backblaze / Time Machine Cloud)** → Replaced by **`pal backup`** (encrypted P2P backup to your own secondary machines).
8. **Cron / Bash File Scripts** → Replaced by **`PalFlow` (`pal workflow`)** (AI-compiled, hash-verified, and audit-logged workflows).
