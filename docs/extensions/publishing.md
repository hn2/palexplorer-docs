# Publishing Extensions

Publish your extension to the Palexplorer Marketplace.

## Prerequisites

1. A Palexplorer identity (`pal init`)
2. An API key (`pal api-keys generate`)

## Step 1: Sign Your Extension

Sign with your Ed25519 identity key:

```bash
pal ext sign ./my-extension
```

This creates `extension.sig` — a detached Ed25519 signature over the manifest and entry point.

## Step 2: Publish

```bash
pal ext publish ./my-extension
```

The extension is bundled as `.tar.gz` and uploaded to the Marketplace.

## Monetization

Set the `tier` field in your manifest:

| Tier | Users | Revenue |
|------|-------|---------|
| `free` | All users | No revenue |
| `pro` | Pro subscribers only | 70/30 split (you/Palexplorer) |
| `enterprise` | Enterprise subscribers only | 70/30 split |

### Track Earnings

```bash
pal ext earnings
pal ext my-extensions
```

## Updates

To update a published extension:

1. Bump the `version` in `extension.json`
2. Re-sign: `pal ext sign ./my-extension`
3. Re-publish: `pal ext publish ./my-extension`

## Marketplace Commands

```bash
pal ext search "webhook"           # Search extensions
pal ext install-remote webhook-notifier  # Install from Marketplace
pal ext buy premium-extension      # Purchase paid extension
```
