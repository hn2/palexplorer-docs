# Transfers

## Downloading

```bash
# Download by magnet link
pe download <magnet>

# Download multiple
pe download <magnet1> <magnet2>
```

Files transfer via BitTorrent/WebTorrent protocol with automatic decryption.

## Managing Transfers

```bash
# List active transfers
pe transfers
pe transfers --active

# Pause / resume
pe transfers pause <magnet>
pe transfers resume <magnet>

# Cancel
pe cancel <magnet>

# View history
pe transfers --history

# Transfer statistics
pe transfers stats
```

## Transfer Routing

Palexplorer automatically selects the best path:

| Priority | Path | When |
|----------|------|------|
| 1 | **LAN** | Both devices on same network (mDNS) |
| 2 | **Direct** | Public IP reachable (WebRTC/TCP) |
| 3 | **Relay** | Both behind NAT (TURN server, Pro) |

Route probing (`route.probe`) tests connectivity before large transfers.

## Seeding

Keep your shares available for download:

```bash
# Start seeding all shares
pe serve

# Serve with web dashboard
pe serve --web --port 7474
```
