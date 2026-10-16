# PAL/3.0 & PAL/2.0 Protocol Architecture (Public Beta)

## PAL/3.0 Post-Quantum Wire Protocol (Current — `0.4.94+`)

PAL/3.0 ([Full Normative Specification](/architecture/pal3-spec) · [Open Spec & Conformance Vectors (`pal-spec`)](https://github.com/hn2/pal-spec)) is Palexplorer's clean-slate, zero-BitTorrent, zero-TCP peer-to-peer protocol over **WebRTC DataChannels** (`pal3/ctl`, `pal3/bulk/0..N`) and **PAL-UDP**:

- **1.5-RTT Hybrid PQC SIGMA-I Handshake:** Mandatory hybrid key establishment (`X25519 + ML-KEM-768`, NIST FIPS 203) and hybrid digital signatures (`Ed25519 + ML-DSA-65`, NIST FIPS 204) with stateless BLAKE2s cookie DoS protection (`RETRY`) and `SEALED_HELLO` identity hiding on untrusted relays.
- **20-Byte Framed Records & Explicit Key Epochs:** Authenticated with `ChaCha20-Poly1305` (RFC 8439) using deterministic 96-bit nonces (`iv_base XOR (channel_id || channel_seq)`) and seamless live `REKEY` epoch rotation.
- **256 KiB BLAKE2b-256 Binary Merkle Trees & FastCDC Delta Sync:** Every transferred block carries a verified Merkle inclusion proof before disk write; directory updates use gear-hash FastCDC (`min=16 KiB, avg=64 KiB, max=256 KiB`) content-defined chunking.
- **Signed Extensions (`PAL-EXT-SIG-V3`):** Protocol and app extensions are signed with hybrid `Ed25519 + ML-DSA-65` and delegated Team-signed Publisher Certificates (`publisherCert`).
- **Built-in Diagnostics:** `pal doctor`, `pal diag [peer]`, `pal ping <peer>`, and `pal trace <peer>`.

---

## PAL/2.0 Legacy Control Layer

The PAL/2.0 protocol is the legacy control layer for Palexplorer — handling share negotiation, key exchange, sync, chat, routing, and streaming. The current spec version is **PAL/2.0-beta.1**.

PAL/2.0 is fully backward-compatible with PAL/1.1 peers — unknown message types are silently ignored. New capabilities are advertised via the `capabilities` field in the envelope.

## Envelope Format

Every message is wrapped in a signed envelope:

```json
{
  "v": 1,
  "type": "share.offer",
  "from": "<sender-public-key-hex>",
  "to": "<recipient-public-key-hex>",
  "id": "<uuid-v4>",
  "ts": "<ISO-8601>",
  "payload": { ... },
  "sig": "<ed25519-detached-signature-hex>"
}
```

**Signature**: `SHA-256(canonical_json(v, type, from, to, id, ts, payload))` signed with Ed25519.

## Capabilities

PAL/2.0 introduces capability negotiation. Capabilities are declared in the envelope and include:

| Capability | Description |
|------------|-------------|
| `share` | Share negotiation (core) |
| `sync` | Manifest-based sync (core) |
| `chat` | Encrypted chat (core) |
| `relay` | TURN relay access (core) |
| `delta-sync` | Block-level delta sync (Pro) |
| `receipts` | Signed transfer receipts (Pro) |
| `presence` | Online presence (core) |
| `stream` | Live media streaming (core) |
| `noise` | Noise_IK encrypted signaling (§3) |
| `ratchet` | Double Ratchet chat (§2) |
| `sender-keys` | Group Sender Keys (§5) |
| `onion` | Onion relay routing (§4) |
| `live-relay` | Tree-based live relay (§9) |
| `meetings` | P2P meetings |
| `diagnostics` | Ping, trace, diagnostic reports |

## Message Types

### Discovery & Identity

| Type | Direction | Description |
|------|-----------|-------------|
| `identity.announce` | → server | Publish identity |
| `identity.resolve` | → server | Request handle resolution |
| `identity.response` | ← server | Resolved public key(s) |
| `heartbeat` | → server | Keepalive (5-min window) |

### Share Negotiation

| Type | Direction | Description |
|------|-----------|-------------|
| `share.offer` | → peer | Share metadata + policy |
| `share.accept` | ← peer | Accept + Curve25519 public key |
| `share.key` | → peer | Magnet + wrapped encryption key |
| `share.revoke` | → peer | Revoke access |
| `share.policy.update` | → peer | Update live policy |

### Transfer Control

| Type | Direction | Description |
|------|-----------|-------------|
| `transfer.request` | → seeder | Request download |
| `transfer.authorize` | ← seeder | Authorize + magnet (policy enforced) |
| `transfer.deny` | ← seeder | Deny (expired/revoked/limit) |
| `transfer.progress` | → seeder | Report progress |
| `transfer.complete` | → seeder | Confirm completion |
| `transfer.receipt` | ← seeder | Signed proof of delivery |

### Sync

| Type | Direction | Description |
|------|-----------|-------------|
| `sync.manifest` | ↔ | Exchange file manifest |
| `sync.diff` | → peer | Computed delta |
| `sync.request` | → peer | Request specific files |
| `sync.conflict` | ↔ | Signal conflict |

### Chat

| Type | Direction | Description |
|------|-----------|-------------|
| `chat.message` | → peer | Encrypted message (crypto_box) |
| `chat.ack` | ← peer | Delivery acknowledgment |
| `chat.typing` | → peer | Typing indicator |

### Routing

| Type | Direction | Description |
|------|-----------|-------------|
| `route.probe` | → peer | Test connectivity |
| `route.probe.response` | ← peer | Latency + reachability |
| `relay.request` | → server | Request TURN allocation |
| `relay.allocated` | ← server | TURN credentials + limits |

### Forward Secrecy — PAL/2.0 §1

| Type | Direction | Description |
|------|-----------|-------------|
| `session.init` | → peer | X25519 ephemeral key + HKDF init |
| `session.accept` | ← peer | Ephemeral key response |
| `session.close` | ↔ | Session teardown |

### Double Ratchet — PAL/2.0 §2

| Type | Direction | Description |
|------|-----------|-------------|
| `ratchet.init` | → peer | Initialize ratchet |
| `ratchet.message` | ↔ | Ratchet-encrypted chat message |

### Onion Routing — PAL/2.0 §4

| Type | Direction | Description |
|------|-----------|-------------|
| `onion.route` | → relay | Layered-encrypted onion packet |
| `onion.ack` | ← relay | Delivery acknowledgment |

### Group Keys — PAL/2.0 §5

| Type | Direction | Description |
|------|-----------|-------------|
| `group.key.init` | → group | Distribute Sender Key to group |
| `group.key.rotate` | → group | Rotate Sender Key |
| `group.key.message` | ↔ | Group-encrypted message |

### Message ACK — PAL/2.0 §6

| Type | Direction | Description |
|------|-----------|-------------|
| `msg.ack` | ← peer | Acknowledge delivery |
| `msg.nack` | ← peer | Negative acknowledgment (retry) |

### Live Streaming — PAL/2.0 §9

| Type | Direction | Description |
|------|-----------|-------------|
| `live.announce` | → peers | Announce stream (core) |
| `live.chunk` | → peers | Stream data chunk (core) |
| `live.chunk.ack` | ← peers | Chunk delivery receipt (core) |
| `live.end` | → peers | End of stream (core) |
| `live.join` | → relay | Join tree relay (`live-relay`) |
| `live.leave` | → relay | Leave tree relay (`live-relay`) |
| `live.tree.*` | ↔ relay | Tree topology management (`live-relay`) |
| `live.quality.switch` | → relay | Request quality change (`live-relay`) |

### Diagnostics

| Type | Direction | Description |
|------|-----------|-------------|
| `diag.ping` | → peer | Ping request |
| `diag.pong` | ← peer | Ping response |
| `diag.trace` | → peer | Traceroute request |
| `diag.trace.hop` | ← peer | Hop response |
| `diag.report` | → peer | Request diagnostic report |
| `diag.report.response` | ← peer | Full diagnostic data |

## Policy Enforcement

Policies are evaluated on `transfer.request`:

- Expiry time
- Max downloads
- Recipient whitelist
- IP restrictions (CIDR) — Pro
- Time windows (schedule) — Pro
- Bandwidth limit (TURN relay level)
- Signed receipts — Pro
