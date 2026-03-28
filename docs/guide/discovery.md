# Discovery & Networking

## Discovery Layers

Palexplorer uses three discovery mechanisms, from local to global:

### 1. mDNS (LAN)

Automatic peer discovery on your local network. No internet required.

```bash
pal nearby
```

- Service type: `_palexplorer._tcp`
- Publishes: public key, handle, name, ports
- Peers verified via challenge before caching (prevents spoofing)

### 2. Discovery Server (WAN)

Optional servers that provide handles, presence, and offline messaging:

```bash
pal connect
pal status
pal server list
```

Default: `discovery.palexplorer.com` (two servers in Frankfurt).

Features:
- `@handle` registration (challenge-response auth)
- Online/offline presence
- Offline message inbox
- Handle search/directory

### 3. DHT (Decentralized)

BitTorrent Mainline DHT with BEP 44 mutable items:

- Salt: `"pal:<handle>"`
- Value: `{h: handle, pk: publicKeyHex, t: timestamp, cap: "sScr"}`
- Signed with Ed25519
- Lookup by `SHA-1(publicKey + salt)`

## Handle Resolution Chain

When resolving a handle:

1. **Local cache** — In-memory + config file
2. **Discovery server** — HTTP REST with signed responses
3. **DHT fallback** — BEP 44 mutable lookup

## Connection Manager

```
disconnected → connect() → connecting → connected → disconnect() → disconnected
```

On connect:
1. Fetch server list
2. Health check servers
3. Start heartbeat (5-min interval)
4. Publish to DHT
5. Replay offline message queue

## Custom Discovery Servers

```bash
pal config set discovery_servers https://my-server.com
pal server add https://my-server.com
pal server remove https://my-server.com
```

Server fingerprints are verified on first connection (key pinning).

## Network Resilience

| Scenario | Behavior |
|----------|----------|
| Discovery server down | DHT + LAN still work, offline queue buffers |
| No internet | LAN sharing works |
| No peers online | Transfer queued, auto-resume when peers appear |

## Private Networks (Enterprise)

```bash
pal network create "Acme Corp"
pal network invite <network-id> alice
pal network join <invite-code>
pal network list
```

Isolated overlay networks for organizations.
