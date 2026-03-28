# P2P Stack

## Transport Protocols

| Protocol | Use Case |
|----------|----------|
| **BitTorrent/WebTorrent** | File transfer (data plane) |
| **DHT Kademlia** | Decentralized peer discovery |
| **BEP 44** | Signed mutable DHT data (handle→key mapping) |
| **mDNS/Bonjour** | LAN auto-discovery |
| **WebRTC** | Direct peer connections (NAT traversal) |
| **PAL/1.0** | Control plane (messaging, policy, key exchange) |

## Transfer Routing

Palexplorer selects the best path automatically:

| Priority | Path | Condition |
|----------|------|-----------|
| 1 | **LAN** | Same network (mDNS discovered) → Direct TCP |
| 2 | **Direct** | Public IP reachable → WebRTC or TCP |
| 3 | **Relay** | Both behind NAT → TURN server (Pro) |

Route probing (`route.probe` message) tests connectivity before large transfers.

## mDNS Discovery

- Service type: `_palexplorer._tcp`
- TXT records: `pk` (public key), `h` (handle), `n` (name), `tp` (torrent port), `wp` (web port)
- Verification: Challenge with `type: status` before caching (prevents spoofing)
- Caching: By public key only (handles are spoofable)

```bash
pal nearby    # List LAN peers
```

## DHT (Mainline)

BitTorrent Mainline DHT with BEP 44 mutable items for handle registration:

- **Salt**: `"pal:<handle>"`
- **Value**: `{h: handle, pk: publicKeyHex, t: timestamp, cap: "sScr"}`
- **Signed**: Ed25519 (verified by DHT nodes)
- **Lookup**: `SHA-1(publicKey + salt)` → target hash

## Signaling Server

Local TCP server on port 7474:
- Receives PAL/1.0 envelopes from peers
- Handles share negotiation, sync handshake, policy updates
- Not HTTP — native socket transport

## WebRTC

Used for direct peer connections when both peers are behind NAT:

- STUN: `stun:stun.l.google.com:19302` (default)
- TURN: Credential provisioning via discovery server (Pro)
- Data channels for file transfer
- Media channels for streaming (Pro)

## Resilience

| Scenario | Behavior |
|----------|----------|
| Discovery server down | DHT + LAN still work |
| No internet | LAN sharing works |
| No peers online | Transfer queued, auto-resume |
| TURN server unavailable | Falls back to DHT relay |
