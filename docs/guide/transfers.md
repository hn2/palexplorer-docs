# Transfers

## Downloading

```bash
# Download by magnet link
pal download <magnet>

# Download multiple
pal download <magnet1> <magnet2>
```

Files transfer via BitTorrent/WebTorrent protocol with automatic decryption.

## Managing Transfers

```bash
# List active transfers
pal transfers
pal transfers --active

# Pause / resume
pal transfers pause <magnet>
pal transfers resume <magnet>

# Cancel
pal cancel <magnet>

# View history
pal transfers --history

# Transfer statistics
pal transfers stats
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
pal serve

# Serve with web dashboard
pal serve --web --port 7474
```
