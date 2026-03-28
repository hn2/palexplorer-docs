# Extension Manifest

Every extension requires an `extension.json` manifest file.

## Full Schema

```json
{
  "name": "my-extension",
  "version": "1.0.0",
  "description": "What your extension does (max 500 chars)",
  "author": "Your Name",
  "license": "MIT",
  "main": "index.js",
  "hooks": [
    "on:app:ready",
    "after:share:create",
    "after:download:complete"
  ],
  "permissions": [
    "config:read",
    "config:write",
    "shares:read",
    "notifications"
  ],
  "config": {
    "webhookUrl": {
      "type": "string",
      "default": "",
      "description": "Webhook URL for notifications"
    },
    "enabled": {
      "type": "boolean",
      "default": true,
      "description": "Enable notifications"
    }
  },
  "tier": "free",
  "minAppVersion": "0.5.0"
}
```

## Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | 1-50 chars, alphanumeric with `.`, `-`, `_` |
| `version` | string | Semver (e.g., `1.0.0`) |
| `description` | string | Max 500 characters |
| `author` | string | Author name |
| `license` | string | License identifier (e.g., `MIT`) |
| `main` | string | Entry point file (must be `.js`, no path traversal) |

## Optional Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `hooks` | string[] | `[]` | Events to subscribe to (max 20) |
| `permissions` | string[] | `[]` | Required permissions (max 10) |
| `config` | object | `{}` | User-configurable settings |
| `tier` | string | `"free"` | `"free"`, `"pro"`, or `"enterprise"` |
| `minAppVersion` | string | — | Minimum Palexplorer version |
| `signerPublicKey` | string | — | Ed25519 public key of the signer |

## Config Schema

Each config key supports:

| Property | Type | Description |
|----------|------|-------------|
| `type` | string | `"boolean"`, `"string"`, `"number"`, `"array"` |
| `default` | any | Default value |
| `description` | string | User-visible description |

Users configure values with:

```bash
pal ext config my-extension webhookUrl "https://..."
```

## Validation Rules

- `name`: 1-50 chars, pattern: `/^[a-zA-Z0-9._-]+$/`
- `version`: Valid semver
- `main`: Must end in `.js`, no `..` or `/` traversal
- `permissions`: Max 10, must be from [valid set](/extensions/permissions)
- `hooks`: Max 20, must be from [valid set](/extensions/hooks)
- `description`: Max 500 characters
