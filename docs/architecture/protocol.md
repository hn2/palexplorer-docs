# PAL/1.0 Protocol

The PAL/1.0 protocol is the control layer for Palexplorer — handling share negotiation, key exchange, sync, chat, and routing.

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

## Policy Enforcement

Policies are evaluated on `transfer.request`:

- Expiry time
- Max downloads
- Recipient whitelist
- IP restrictions (CIDR)
- Time windows (schedule)
- Bandwidth limit (TURN relay level)
