# Discovery

## Resolution Chain

When resolving a handle to a public key:

1. **Local cache** — In-memory + config file
2. **Discovery server** — HTTP REST with signed responses
3. **DHT fallback** — BEP 44 mutable lookup

## Discovery Servers

HTTP REST servers that provide:
- `@handle` registration
- Online/offline presence
- Offline message inbox (relay)
- Handle search/directory
- Seeder listing

### Default Servers

Palexplorer ships with two discovery servers in Frankfurt:
- `discovery-1.palexplorer.com`
- `discovery-2.palexplorer.com`

### Server API

| Endpoint | Description |
|----------|-------------|
| `GET /status` | Server health |
| `GET /resolve/:handle` | Resolve handle to public key |
| `GET /devices/:handle` | List devices for handle |
| `POST /register` | Register handle (challenge-response) |
| `POST /messages` | Send offline message |
| `GET /messages` | Fetch offline messages |

### Key Pinning

On first connection, the server's fingerprint (SHA-256 of public key, first 8 chars) is stored. Future connections verify the fingerprint matches — prevents MITM attacks.

### Custom Servers

```bash
pe config set discovery_servers https://my-server.com
pe server add https://my-server.com
```

You can run your own discovery server using [palexplorer-server](https://github.com/hn2/palexplorer-server).

## DHT Discovery

BitTorrent Mainline DHT with BEP 44:

- **Publish**: `dht.put(publicKey, salt="pal:<handle>", value={h, pk, t, cap}, sign=ed25519)`
- **Resolve**: `dht.get(target=sha1(pk+salt))` → verify Ed25519 signature → extract handle info

### Advantages over Server

- Decentralized — no single point of failure
- Censorship-resistant
- Works when discovery servers are down

### Limitations

- Slower than server (DHT lookup takes 5-15s)
- Requires knowing the public key (can't search by handle)
- No offline messaging
- No presence information

## Federation

Multiple discovery servers can federate to share handle registrations:

```bash
pe federation peer
```

Cross-server handle resolution enables a decentralized network of discovery servers.
