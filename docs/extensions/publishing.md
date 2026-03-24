# Publishing Extensions

Publish your extension to the Palexplorer Marketplace.

## Prerequisites

1. A Palexplorer identity (`pe init`)
2. An API key (`pe api-keys generate`)

## Step 1: Sign Your Extension

Sign with your Ed25519 identity key:

```bash
pe ext sign ./my-extension
```

This creates `extension.sig` — a detached Ed25519 signature over the manifest and entry point.

## Step 2: Publish

```bash
pe ext publish ./my-extension
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
pe ext earnings
pe ext my-extensions
```

## Updates

To update a published extension:

1. Bump the `version` in `extension.json`
2. Re-sign: `pe ext sign ./my-extension`
3. Re-publish: `pe ext publish ./my-extension`

## Marketplace Commands

```bash
pe ext search "webhook"           # Search extensions
pe ext install-remote webhook-notifier  # Install from Marketplace
pe ext buy premium-extension      # Purchase paid extension
```
