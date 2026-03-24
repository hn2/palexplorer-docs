# Configuration

## Config Commands

```bash
pe config list              # Show all custom settings
pe config get <key>         # Get specific value
pe config set <key> <value> # Set value
pe config reset [key]       # Reset to default(s)
```

## Configuration Keys

### Display

| Key | Default | Description |
|-----|---------|-------------|
| `logLevel` | `info` | Log level: `debug`, `info`, `warn`, `error`, `silent` |
| `theme` | `dark` | UI theme: `light`, `dark` |

### Network

| Key | Default | Description |
|-----|---------|-------------|
| `port` | auto | Local seeder port |
| `max_connections` | `100` | Maximum P2P connections |
| `bandwidth_cap` | `0` | Upload cap in KB/s (0 = unlimited) |
| `bandwidth_up` | — | Upload limit |
| `bandwidth_down` | — | Download limit |
| `discovery_servers` | `https://discovery.palexplorer.com` | Discovery server URLs (comma-separated) |
| `announce_interval` | `3600` | DHT announce interval (seconds) |
| `dht_bootstrap` | Mainline defaults | Bootstrap DHT nodes |
| `stunServers` | `stun:stun.l.google.com:19302` | STUN server list |
| `turn_servers` | — | TURN relay servers |

### Storage

| Key | Default | Description |
|-----|---------|-------------|
| `downloadDir` | `~/Downloads/Palexplorer` | Download folder |

### Security

| Key | Default | Description |
|-----|---------|-------------|
| `extensionRequireSignature` | `true` | Require Ed25519 signatures on extensions |
| `autoUpdate` | `true` | Check for updates on startup |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PAL_DATA_DIR` | Override data directory |
| `PAL_DISCOVERY_URL` | Override discovery server |
| `PAL_LOG_LEVEL` | Override log level |
| `PAL_EXT_SIGNING_KEY` | Override extension signing key |
| `NODE_ENV` | Set to `production` for stricter security |

## Precedence

1. CLI flags (highest)
2. Environment variables (`PAL_*`)
3. Config store (JSON)
4. Hardcoded defaults (lowest)

## Config File Location

- **Linux**: `~/.config/palexplorer-cli/config.json`
- **macOS**: `~/Library/Application Support/palexplorer-cli/config.json`
- **Windows**: `%APPDATA%/palexplorer-cli/config.json`
