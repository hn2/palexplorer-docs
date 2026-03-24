# Getting Started

## Installation

### Desktop App

Download the installer for your platform from [palexplorer.com/download](https://palexplorer.com/download):

- **Windows**: `.exe` installer (NSIS)
- **macOS**: `.dmg` package
- **Linux**: `.AppImage` or `.deb`

The app auto-updates when new versions are available.

### CLI Only

If you only need the command-line tool:

```bash
npm install -g pal-explorer-cli
```

Requires Node.js 20+.

## First Launch

### Create Your Identity

On first launch, the setup wizard offers three options:

1. **Create new identity** — Generates an Ed25519 keypair and a 24-word BIP-39 recovery phrase
2. **Recover identity** — Restore from your 24-word recovery phrase
3. **Guest mode** — Limited features, keys in memory only (wiped on exit)

::: warning
Write down your 24-word recovery phrase and keep it safe. It's the **only way** to recover your identity if you lose your device.
:::

**Via CLI:**

```bash
pe init "YourName"
```

This outputs your recovery phrase. Then optionally register a handle:

```bash
pe register myhandle
```

### Check Your Identity

```bash
pe whoami
```

Shows your public key, handle (if registered), and device info.

## Share Your First File

### Desktop App

1. Drag and drop files onto the app window, or click **Create Share**
2. Name the share, choose visibility (private/public)
3. Optionally add pals or groups as recipients
4. Files are encrypted automatically with XChaCha20-Poly1305

### CLI

```bash
# Share a folder
pe share ./my-folder --name "Project Files"

# Share with specific pals
pe share ./photo.jpg --name "Vacation" --with alice,bob

# List your shares
pe list
```

## Download Files

```bash
# Download by magnet link or share link
pe download <magnet-or-link>

# List active transfers
pe transfers

# Pause / resume
pe transfers pause <id>
pe transfers resume <id>
```

## Add Pals

```bash
# Add by handle
pe pal add alice

# Discover on LAN
pe nearby

# List all pals
pe pal list
```

## Connect to Discovery Network

```bash
pe connect
pe status
```

This connects to discovery servers for handle resolution, online presence, and offline messaging.

## Next Steps

- [Core Concepts](/guide/core-concepts) — Identity, shares, permissions, encryption
- [CLI Reference](/cli/) — All 100+ commands
- [Configuration](/config/) — Customize behavior
